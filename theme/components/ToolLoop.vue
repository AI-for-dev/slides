<script setup lang="ts">
// La boucle d'appel d'outils, vue d'en haut : le modèle et le harnais face à
// face. La demande part par l'arc du haut, le résultat revient par l'arc du
// bas ; les étapes 2 et 4 se lisent dans les blocs. On lit 1 → 2 → 3 → 4 en
// tournant dans le sens des aiguilles d'une montre.
// viewBox fixe 900 × 320 : la géométrie reste exacte à toutes les tailles.
import { useId } from 'vue'
import { arrowHead, graphiteFilter, polyline, rect, rng } from '../lib/pencil'
import type { Pt, Stroke } from '../lib/pencil'

const NODE = { w: 230, h: 124, y: 98 }
const MODEL = { x: 14 }
const HARNESS = { x: 900 - 14 - NODE.w }

const fid = `g${useId().replace(/[^a-zA-Z0-9]/g, '')}`
const r = rng('tool-loop')

function quad(a: Pt, c: Pt, b: Pt, n = 26): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n
    const u = 1 - t
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]] as Pt
  })
}

function arc(a: Pt, c: Pt, b: Pt): Stroke[] {
  const pts = quad(a, c, b)
  return [
    ...polyline(pts, r, { wobble: 0.5, passes: 2 }),
    ...arrowHead(pts[pts.length - 3], pts[pts.length - 1], 14, r),
  ]
}

const top = NODE.y - 6
const bottom = NODE.y + NODE.h + 6
const out: Stroke[] = arc([MODEL.x + NODE.w * 0.72, top], [450, -14], [HARNESS.x + NODE.w * 0.28, top])
const back: Stroke[] = arc([HARNESS.x + NODE.w * 0.28, bottom], [450, 334], [MODEL.x + NODE.w * 0.72, bottom])

const frames = {
  model: rect(MODEL.x, NODE.y, NODE.w, NODE.h, r, { over: 4, bow: 1.2, wobble: 0.4 }),
  harness: rect(HARNESS.x, NODE.y, NODE.w, NODE.h, r, { over: 4, bow: 1.2, wobble: 0.4 }),
}

const nodes = [
  { key: 'model', x: MODEL.x, who: 'le modèle', n: '4', title: 'reprend', lines: ['nouvel appel d’outil', 'ou réponse finale'] },
  { key: 'harness', x: HARNESS.x, who: 'le harnais', n: '2', title: 'exécute', lines: ['si la permission', 'l’autorise'] },
] as const
</script>

<template>
  <svg class="tl" viewBox="0 0 900 320" preserveAspectRatio="xMidYMid meet" role="img"
       aria-label="La boucle d'appel d'outils : le modèle demande, le harnais exécute, le résultat revient, le modèle reprend">
    <defs v-html="graphiteFilter(fid, 9)" />

    <g fill="none" stroke-linecap="round" :filter="`url(#${fid})`">
      <path v-for="(s, i) in out" :key="'o' + i" :d="s.d" class="tl-out" :stroke-width="2 * s.w" :stroke-opacity="s.o" />
      <path v-for="(s, i) in back" :key="'b' + i" :d="s.d" class="tl-back" :stroke-width="2 * s.w" :stroke-opacity="s.o" />
      <path v-for="(s, i) in frames.model" :key="'m' + i" :d="s.d" class="tl-frame" :stroke-opacity="s.o" />
      <path v-for="(s, i) in frames.harness" :key="'h' + i" :d="s.d" class="tl-frame tl-harness" :stroke-opacity="s.o" />
    </g>

    <!-- 1 : la demande, sous l'arc du haut -->
    <text x="450" y="104" text-anchor="middle" class="tl-step"><tspan class="tl-n">1</tspan> le modèle demande</text>
    <text x="450" y="130" text-anchor="middle" class="tl-sub">« lire <tspan class="tl-code">game/neon.js</tspan> », sous forme structurée</text>

    <!-- 3 : le résultat, au-dessus de l'arc du bas -->
    <text x="450" y="204" text-anchor="middle" class="tl-step"><tspan class="tl-n tl-blue">3</tspan> le résultat revient</text>
    <text x="450" y="230" text-anchor="middle" class="tl-sub">dans le contexte du modèle</text>

    <!-- 2 et 4 : dans les blocs -->
    <g v-for="nd in nodes" :key="nd.key">
      <text :x="nd.x + 22" :y="NODE.y + 30" class="tl-who" :class="{ 'tl-who-h': nd.key === 'harness' }">{{ nd.who }}</text>
      <text :x="nd.x + 22" :y="NODE.y + 60" class="tl-step"><tspan class="tl-n">{{ nd.n }}</tspan> {{ nd.title }}</text>
      <text v-for="(l, i) in nd.lines" :key="i" :x="nd.x + 22" :y="NODE.y + 84 + i * 21" class="tl-sub">{{ l }}</text>
    </g>
  </svg>
</template>

<style>
.tl { width: 100%; height: 100%; display: block; overflow: visible; }
.tl .tl-out     { stroke: var(--graphite); }
.tl .tl-back    { stroke: var(--blue); }
.tl .tl-frame   { stroke: var(--graphite); stroke-width: 1.4; }
.tl .tl-harness { stroke: var(--accent); stroke-width: 1.8; }

.tl text { fill: var(--ink); }
.tl .tl-who {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  fill: var(--muted);
}
.tl .tl-who-h { fill: var(--accent-deep); }
.tl .tl-step {
  font-family: var(--font-title);
  font-size: 21px;
  font-weight: 640;
  letter-spacing: -0.01em;
}
.tl .tl-n { font-family: var(--font-mono); font-weight: 500; fill: var(--accent); }
.tl .tl-blue { fill: var(--blue); }
.tl .tl-sub { font-family: var(--font-text); font-size: 15.5px; fill: var(--muted); }
.tl .tl-code { font-family: var(--font-mono); font-size: 14px; fill: var(--ink-soft); }
</style>
