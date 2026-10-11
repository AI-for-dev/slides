<script setup lang="ts">
// Radial map of the 7 building blocks of a harness.
// Fixed 900x400 viewBox so the geometry stays pixel-exact at any projection size.
// Cartes, liens et moyeu sont tracés au crayon (lib/pencil.ts).
import { useId } from 'vue'
import { ellipse, graphiteFilter, line, rect, rng } from '../lib/pencil'
import type { Stroke } from '../lib/pencil'

const CARD_W = 268
const CARD_H = 78
const HUB = { x: 450, y: 150, rx: 88, ry: 47 }

const bricks = [
  { n: '1', x: 0,   y: 0,   title: 'GESTION DU CONTEXTE', lines: ['Sélectionner, ordonner', 'et compacter'] },
  { n: '2', x: 0,   y: 118, title: 'OUTILS',              lines: ['Donner des capacités', 'd\u2019action si c\u2019est utile'] },
  { n: '3', x: 0,   y: 236, title: 'DÉLÉGATION',          lines: ['Sous-tâches à des agents pour', 'alléger le fil principal'] },
  { n: '7', x: 632, y: 0,   title: 'VÉRIFICATION & ÉVAL.', lines: ['Tester, évaluer et boucler', 'sur la qualité et le coût'] },
  { n: '6', x: 632, y: 118, title: 'SÛRETÉ',              lines: ['Borner les permissions', 'et isoler l\u2019exécution'] },
  { n: '5', x: 632, y: 236, title: 'MÉMOIRE',             lines: ['Persister décisions, règles', 'et état entre les sessions'] },
  { n: '4', x: 316, y: 322, title: 'ORCHESTRATION',       lines: ['Coordonner agents, plans, exécution', 'et tâches de longue durée'] },
]

// Anchor on each card pointing back at the hub.
function anchor(b: typeof bricks[number]) {
  if (b.y === 322) return { x: b.x + CARD_W / 2, y: b.y }
  return b.x === 0
    ? { x: CARD_W, y: b.y + CARD_H / 2 }
    : { x: b.x, y: b.y + CARD_H / 2 }
}

const fid = `g${useId().replace(/[^a-zA-Z0-9]/g, '')}`
const r = rng('harness-map')
const frames: Stroke[][] = bricks.map(b => rect(b.x + 2, b.y + 2, CARD_W - 4, CARD_H - 4, r, { over: 4, bow: 1.2, wobble: 0.4 }))
const links: Stroke[] = bricks.flatMap(b => {
  const a = anchor(b)
  const dx = a.x - HUB.x
  const dy = a.y - HUB.y
  // le lien part du bord du moyeu, pas de son centre
  const k = 1.08 / Math.hypot(dx / HUB.rx, dy / HUB.ry)
  return line([HUB.x + dx * k, HUB.y + dy * k], [a.x, a.y], r, { wobble: 0.5, bow: 2.5, over: 1, passes: 1 })
})
const hub: Stroke[] = ellipse(HUB.x, HUB.y, HUB.rx, HUB.ry, r, { passes: 3, wobble: 0.025 })
</script>

<template>
  <svg class="harness-map" viewBox="0 0 900 400" preserveAspectRatio="xMidYMid meet" role="img"
       aria-label="Les sept briques d'un harnais organisées autour d'un centre">
    <defs v-html="graphiteFilter(fid, 9)" />

    <g fill="none" stroke-linecap="round" :filter="`url(#${fid})`">
      <path v-for="(s, i) in links" :key="'l' + i" :d="s.d" class="hm-link" :stroke-opacity="s.o" />
      <template v-for="(f, j) in frames" :key="'f' + j">
        <path v-for="(s, i) in f" :key="i" :d="s.d" class="hm-frame" />
      </template>
      <path v-for="(s, i) in hub" :key="'h' + i" :d="s.d" class="hm-hub" :stroke-width="1.8 * s.w" :stroke-opacity="s.o" />
    </g>

    <!-- hub -->
    <text :x="HUB.x" :y="HUB.y + 4" text-anchor="middle" class="hub-label">HARNAIS</text>
    <text :x="HUB.x" :y="HUB.y + 23" text-anchor="middle" class="hub-sub">7 briques</text>

    <!-- cards -->
    <g v-for="b in bricks" :key="b.n">
      <text :x="b.x + 18" :y="b.y + 30" class="brick-num">{{ b.n }}</text>
      <text :x="b.x + 46" :y="b.y + 28" class="brick-title">{{ b.title }}</text>
      <text v-for="(l, i) in b.lines" :key="i" :x="b.x + 46" :y="b.y + 47 + i * 15" class="brick-desc">{{ l }}</text>
    </g>
  </svg>
</template>

<style>
.harness-map { width: 100%; height: 100%; display: block; overflow: visible; }
.harness-map .hm-link  { stroke: var(--graphite-2); stroke-width: 1.2; }
.harness-map .hm-frame { stroke: var(--graphite); stroke-width: 1.3; stroke-opacity: 0.75; }
.harness-map .hm-hub   { stroke: var(--accent); }
.harness-map .hub-label {
  font-family: var(--font-title);
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 0.06em;
  fill: var(--ink);
}
.harness-map .hub-sub {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  fill: var(--muted);
}
.harness-map .brick-title {
  font-family: var(--font-title);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  fill: var(--ink);
}
.harness-map .brick-num {
  font-family: var(--font-title);
  font-size: 30px;
  font-weight: 300;
  fill: var(--accent);
}
.harness-map .brick-desc {
  font-family: var(--font-text);
  font-size: 11.5px;
  fill: var(--muted);
}
</style>
