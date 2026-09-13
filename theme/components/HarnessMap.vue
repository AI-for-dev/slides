<script setup lang="ts">
// Radial map of the 7 building blocks of a harness.
// Fixed 900x400 viewBox so the geometry stays pixel-exact at any projection size.
const CARD_W = 268
const CARD_H = 78
const HUB = { x: 450, y: 150, rx: 88, ry: 47 }

const bricks = [
  { n: '1', x: 0,   y: 0,   hue: '#1f6f8b', title: 'GESTION DU CONTEXTE', lines: ['Sélectionner, ordonner', 'et compacter'] },
  { n: '2', x: 0,   y: 118, hue: '#2f7a4f', title: 'OUTILS',              lines: ['Donner des capacités', 'd\u2019action si c\u2019est utile'] },
  { n: '3', x: 0,   y: 236, hue: '#6b4a8f', title: 'DÉLÉGATION',          lines: ['Sous-tâches à des agents pour', 'alléger le fil principal'] },
  { n: '7', x: 632, y: 0,   hue: '#8a6d1f', title: 'VÉRIFICATION & ÉVAL.', lines: ['Tester, évaluer et boucler', 'sur la qualité et le coût'] },
  { n: '6', x: 632, y: 118, hue: '#b03a3a', title: 'SÛRETÉ',              lines: ['Borner les permissions', 'et isoler l\u2019exécution'] },
  { n: '5', x: 632, y: 236, hue: '#0f7a6f', title: 'MÉMOIRE',             lines: ['Persister décisions, règles', 'et état entre les sessions'] },
  { n: '4', x: 316, y: 322, hue: '#b5651d', title: 'ORCHESTRATION',       lines: ['Coordonner agents, plans, exécution', 'et tâches de longue durée'] },
]

// Anchor on each card pointing back at the hub.
function anchor(b: typeof bricks[number]) {
  if (b.y === 322) return { x: b.x + CARD_W / 2, y: b.y }
  return b.x === 0
    ? { x: CARD_W, y: b.y + CARD_H / 2 }
    : { x: b.x, y: b.y + CARD_H / 2 }
}

function tint(hex: string) {
  return hex + '12'
}
</script>

<template>
  <svg class="harness-map" viewBox="0 0 900 400" preserveAspectRatio="xMidYMid meet" role="img"
       aria-label="Les sept briques d'un harnais organisées autour d'un centre">
    <!-- connectors -->
    <g stroke="var(--line-2)" stroke-width="1.25">
      <line v-for="b in bricks" :key="'l' + b.n"
            :x1="HUB.x" :y1="HUB.y" :x2="anchor(b).x" :y2="anchor(b).y" />
    </g>
    <g fill="var(--line-2)">
      <circle v-for="b in bricks" :key="'d' + b.n" :cx="anchor(b).x" :cy="anchor(b).y" r="3" />
    </g>

    <!-- hub -->
    <ellipse :cx="HUB.x" :cy="HUB.y" :rx="HUB.rx" :ry="HUB.ry"
             fill="var(--ink)" stroke="var(--ink)" stroke-width="1" />
    <text :x="HUB.x" :y="HUB.y + 2" text-anchor="middle" class="hub-label">HARNAIS</text>
    <text :x="HUB.x" :y="HUB.y + 21" text-anchor="middle" class="hub-sub">7 briques</text>

    <!-- cards -->
    <g v-for="b in bricks" :key="b.n">
      <rect :x="b.x" :y="b.y" :width="CARD_W" :height="CARD_H" rx="12"
            :fill="tint(b.hue)" :stroke="b.hue" stroke-opacity="0.28" stroke-width="1" />
      <rect :x="b.x + 14" :y="b.y + 16" width="3" :height="CARD_H - 32" rx="1.5" :fill="b.hue" />
      <text :x="b.x + 27" :y="b.y + 27" class="brick-title">
        <tspan :fill="b.hue" class="brick-num">{{ b.n }}</tspan>
        <tspan dx="8">{{ b.title }}</tspan>
      </text>
      <text v-for="(l, i) in b.lines" :key="i" :x="b.x + 27" :y="b.y + 46 + i * 15" class="brick-desc">{{ l }}</text>
    </g>
  </svg>
</template>

<style>
.harness-map { width: 100%; height: 100%; display: block; }
.harness-map .hub-label {
  font-family: var(--font-sans);
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 0.04em;
  fill: var(--paper);
}
.harness-map .hub-sub {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  fill: rgba(253, 251, 247, 0.5);
}
.harness-map .brick-title {
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  fill: var(--ink);
}
.harness-map .brick-num {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
}
.harness-map .brick-desc {
  font-family: var(--font-sans);
  font-size: 11.5px;
  fill: var(--muted);
}
</style>
