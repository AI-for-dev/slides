<script setup lang="ts">
// La fenêtre de contexte vue comme une bande de tokens, et au-dessus la
// courbe en U de « Lost in the Middle » (Liu et al., 2023) : une information
// placée au début ou à la fin est bien exploitée, au milieu elle l'est mal.
// La courbe est qualitative, sans valeurs : elle montre la forme, pas une mesure.
// viewBox fixe 900 × 300 : la géométrie reste exacte à toutes les tailles.
import { useId } from 'vue'
import { graphiteFilter, line, polyline, rect, rng } from '../lib/pencil'
import type { Pt, Stroke } from '../lib/pencil'

const X0 = 40
const X1 = 860
const BAND = { y: 196, h: 40 }
const CELLS = 24

const fid = `g${useId().replace(/[^a-zA-Z0-9]/g, '')}`
const r = rng('lost-in-middle')

const band: Stroke[] = rect(X0, BAND.y, X1 - X0, BAND.h, r, { over: 5, bow: 1.2, wobble: 0.4 })
const ticks: Stroke[] = Array.from({ length: CELLS - 1 }, (_, i) => {
  const x = X0 + ((i + 1) * (X1 - X0)) / CELLS
  return line([x, BAND.y + 6], [x, BAND.y + BAND.h - 6], r, { wobble: 0.3, bow: 0.4, over: 0, passes: 1 })
}).flat()

// Le U : haut aux deux bords, creux au milieu, un peu plus haut au début qu'à la fin.
const curvePts: Pt[] = Array.from({ length: 33 }, (_, i) => {
  const t = i / 32
  const x = X0 + t * (X1 - X0)
  const u = Math.pow(2 * t - 1, 2)
  const y = 140 - 100 * u + 12 * t
  return [x, y] as Pt
})
const curve: Stroke[] = polyline(curvePts, r, { wobble: 0.6, passes: 2 })

// La zone du milieu, mal exploitée, cernée à la sanguine sur la bande.
const MID = { x0: X0 + (X1 - X0) * 0.3, x1: X0 + (X1 - X0) * 0.7 }
const mid: Stroke[] = rect(MID.x0, BAND.y - 4, MID.x1 - MID.x0, BAND.h + 8, r, { over: 4, bow: 1, wobble: 0.5 })
</script>

<template>
  <svg class="lim" viewBox="0 0 900 300" preserveAspectRatio="xMidYMid meet" role="img"
       aria-label="La fenêtre de contexte : une information au début ou à la fin est bien exploitée, au milieu elle l'est mal">
    <defs v-html="graphiteFilter(fid, 9)" />

    <text :x="X0" y="22" class="lim-axis">exploitation de l’information selon sa place</text>

    <g fill="none" stroke-linecap="round" :filter="`url(#${fid})`">
      <path v-for="(s, i) in curve" :key="'c' + i" :d="s.d" class="lim-curve" :stroke-width="2.4 * s.w" :stroke-opacity="s.o" />
      <path v-for="(s, i) in ticks" :key="'t' + i" :d="s.d" class="lim-tick" />
      <path v-for="(s, i) in band" :key="'b' + i" :d="s.d" class="lim-band" :stroke-opacity="s.o" />
      <path v-for="(s, i) in mid" :key="'m' + i" :d="s.d" class="lim-mid" :stroke-opacity="s.o" />
    </g>

    <text :x="X0" :y="BAND.y + BAND.h + 34" class="lim-label">début</text>
    <text :x="X0" :y="BAND.y + BAND.h + 56" class="lim-sub">bien exploité</text>

    <text :x="(MID.x0 + MID.x1) / 2" :y="BAND.y + BAND.h + 34" text-anchor="middle" class="lim-label lim-hot">milieu</text>
    <text :x="(MID.x0 + MID.x1) / 2" :y="BAND.y + BAND.h + 56" text-anchor="middle" class="lim-sub lim-hot">mal exploité</text>

    <text :x="X1" :y="BAND.y + BAND.h + 34" text-anchor="end" class="lim-label">fin</text>
    <text :x="X1" :y="BAND.y + BAND.h + 56" text-anchor="end" class="lim-sub">bien exploitée</text>

    <text :x="X0" :y="BAND.y - 16" class="lim-size">taille maximale : <tspan class="lim-strong">plus d’1 M de tokens</tspan> sur certains modèles</text>
  </svg>
</template>

<style>
.lim { width: 100%; height: 100%; display: block; overflow: visible; }
.lim .lim-curve { stroke: var(--blue); }
.lim .lim-tick  { stroke: var(--graphite-2); stroke-width: 1; stroke-opacity: 0.55; }
.lim .lim-band  { stroke: var(--graphite); stroke-width: 1.5; }
.lim .lim-mid   { stroke: var(--accent); stroke-width: 2; }

.lim text { fill: var(--ink); }
.lim .lim-axis {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  fill: var(--blue-deep);
}
.lim .lim-size { font-family: var(--font-text); font-size: 17px; fill: var(--muted); }
.lim .lim-strong { font-weight: 650; fill: var(--ink); }
.lim .lim-label {
  font-family: var(--font-title);
  font-size: 20px;
  font-weight: 640;
  letter-spacing: -0.01em;
}
.lim .lim-sub { font-family: var(--font-text); font-size: 15px; fill: var(--muted); }
.lim .lim-hot { fill: var(--accent-deep); }
</style>
