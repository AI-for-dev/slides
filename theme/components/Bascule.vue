<script setup lang="ts">
/**
 * Le motif du thème : le diagramme de bifurcation de x ↦ r·x(1−x), dessiné
 * au crayon. À gauche, un trait tiré à la règle : un seul état stable, la
 * façon dont on développait jusqu'ici. Au point de bascule (r = 3), le trait
 * se dédouble, puis se dédouble encore, et finit dans le chaos.
 *
 * Les valeurs sont calculées, pas inventées : chaque branche et chaque point
 * du nuage chaotique sont de vrais états de la suite logistique.
 *
 * `step` (1 à 5) suit les parties : la partie déjà parcourue est appuyée, la
 * suite est seulement esquissée, et un trait de sanguine marque où l'on en
 * est. Toutes les parties montrent le chaos qui vient. Sans `step` (la
 * couverture), le diagramme est entier.
 */
import { computed, useId } from 'vue'
import { graphiteFilter, line, rng, smooth } from '../lib/pencil'
import type { Pt } from '../lib/pencil'

const p = withDefaults(defineProps<{
  step?: number
  /** hauteur de la règle, en fraction de la hauteur de la slide */
  y?: number
  /** abscisse du point de bascule (r = 3), en fraction de la largeur */
  pivot?: number
  /** amplitude verticale du diagramme, en px */
  amp?: number
}>(), { y: 0.72, pivot: 0.4, amp: 220 })

const W = 980
const H = 552
const R_END = 4
const R_CHAOS = 3.5699
const STOPS = [3.25, 3.5, 3.62, 3.78, 3.95]
const id = `g${useId().replace(/[^a-zA-Z0-9]/g, '')}`

/** Les états visités par la suite pour ce r, une fois le transitoire passé. */
function attractor(r: number, keep: number, warm: number) {
  let v = 0.5
  for (let i = 0; i < warm; i++) v = r * v * (1 - v)
  const out: number[] = []
  for (let i = 0; i < keep; i++) {
    v = r * v * (1 - v)
    out.push(v)
  }
  return out
}
/** Les états du cycle stable pour ce r (triés, sans doublons). */
function cycle(r: number) {
  const vals = attractor(r, 64, 4000).sort((a, b) => a - b)
  const uniq: number[] = []
  for (const v of vals) if (!uniq.length || v - uniq[uniq.length - 1] > 2e-3) uniq.push(v)
  return uniq
}

const geo = computed(() => {
  const rnd = rng(`bifurcation-${p.step ?? 0}`)
  const y0 = H * p.y
  const x0 = W * p.pivot
  const rNow = p.step ? STOPS[p.step - 1] : R_END
  const X = (r: number) => x0 + ((r - 3) / (R_END - 3)) * (W + 6 - x0)
  const Y = (v: number) => y0 - (2 / 3 - v) * p.amp
  const jit = (a: number) => (rnd() - 0.5) * 2 * a

  // ── Branches périodiques, de r = 3 jusqu'au chaos ──────────────────────
  const branches: Pt[][] = []
  let open: Pt[][] = []
  for (let r = 3.0005; r < R_CHAOS; r += 0.0035) {
    const c = cycle(r)
    if (c.length !== open.length) {
      // dédoublement : chaque nouvelle branche part de sa branche mère
      const parents = open.map(b => b[b.length - 1])
      open = c.map((_, j) => {
        const b: Pt[] = [parents[Math.floor(j / 2)] ?? [X(3), Y(2 / 3)]]
        branches.push(b)
        return b
      })
    }
    c.forEach((v, j) => open[j]?.push([X(r), Y(v)]))
  }

  // Trait au crayon le long d'une branche, coupé en deux au point actuel.
  const strokes: { d: string; w: number; o: number }[] = []
  for (const b of branches) {
    const cut = b.findIndex(q => q[0] > X(rNow))
    const parts: [Pt[], boolean][] = cut === -1
      ? [[b, true]]
      : cut <= 1 ? [[b, false]] : [[b.slice(0, cut + 1), true], [b.slice(cut), false]]
    for (const [pts, past] of parts) {
      if (pts.length < 2) continue
      for (let k = 0; k < (past ? 2 : 1); k++) {
        const wob = past ? 0.45 : 0.6
        const shaky = pts.filter((_, i) => i % 3 === 0 || i === pts.length - 1)
          .map(([x, y], i) => [x + (i ? jit(wob) : 0), y + (i ? jit(wob) : 0) + (k ? 0.7 : 0)] as Pt)
        strokes.push({ d: smooth(shaky), w: k ? 0.8 : 1.5, o: past ? (k ? 0.45 : 0.9) : 0.3 })
      }
    }
  }

  // ── Le chaos : un nuage de points, comme un grisé au crayon ───────────
  const dots = { past: ['', '', ''], ahead: '' }
  for (let x = X(R_CHAOS); x <= W; x += 1.5) {
    const r = 3 + ((x - x0) / (W + 6 - x0)) * (R_END - 3)
    const past = r <= rNow
    for (const v of attractor(r, past ? 46 : 26, 400)) {
      const a = rnd() * Math.PI
      const seg = `M${(x + jit(0.6)).toFixed(1)} ${(Y(v) + jit(0.6)).toFixed(1)}`
        + `l${(Math.cos(a) * 0.9).toFixed(1)} ${(Math.sin(a) * 0.9).toFixed(1)}`
      if (past) dots.past[Math.floor(rnd() * 3)] += seg
      else dots.ahead += seg
    }
  }

  // ── Où l'on en est ────────────────────────────────────────────────────
  const span = attractor(Math.min(rNow, 3.999), 400, 600).map(Y)
  const mark = p.step
    ? line([X(rNow), Math.min(...span) - 14], [X(rNow) + jit(1.5), Math.max(...span) + 14], rnd, { wobble: 0.4, bow: 1.5, over: 2, passes: 2 })
    : line([X(3), y0 - 9], [X(3), y0 + 9], rnd, { wobble: 0.2, bow: 0.4, over: 1, passes: 2 })

  return { x0: X(3), y0, strokes, dots, mark }
})
</script>

<template>
  <svg class="bascule" :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="none" aria-hidden="true">
    <defs v-html="graphiteFilter(id, (step ?? 0) + 11, 0.9, 0.6)" />
    <!-- avant : un seul état, tiré à la règle -->
    <line x1="0" :y1="geo.y0" :x2="geo.x0" :y2="geo.y0" class="b-ruled" />
    <!-- après : les dédoublements, puis le chaos -->
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path :d="geo.dots.ahead" class="b-dot" stroke-width="1.1" stroke-opacity=".22" />
      <path v-for="(d, i) in geo.dots.past" :key="'c' + i" :d="d" class="b-dot" stroke-width="1.2" stroke-opacity=".42" />
      <g :filter="`url(#${id})`">
        <path v-for="(s, i) in geo.strokes" :key="'b' + i" :d="s.d" class="b-try" :stroke-width="s.w" :stroke-opacity="s.o" />
        <path v-for="(s, i) in geo.mark" :key="'m' + i" :d="s.d" class="b-main" :stroke-width="2 * s.w" :stroke-opacity="s.o" />
      </g>
    </g>
  </svg>
</template>
