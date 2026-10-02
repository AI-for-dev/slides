<script setup lang="ts">
// La boucle explorer → planner → coder → reviewer du module sur la
// délégation, telle qu'on la tient à la main. Rectangles : les sous-agents.
// Pilules en pointillés : les gestes que l'on fait soi-même.
// viewBox fixe 960x250 pour une géométrie exacte à toute taille.
type Kind = 'end' | 'agent' | 'human' | 'decision'
interface Node { id: string; kind: Kind; w: number; title: string; sub?: string }

const Y = 62
const H = 58
const GAP = 17

const spec: Node[] = [
  { id: 'ticket', kind: 'end', w: 72, title: 'ticket #2' },
  { id: 'explorer', kind: 'agent', w: 88, title: 'explorer', sub: 'note d’impact' },
  { id: 'read', kind: 'human', w: 92, title: 'vous relisez', sub: 'la note' },
  { id: 'planner', kind: 'agent', w: 88, title: 'planner', sub: 'plan en pas' },
  { id: 'coder', kind: 'agent', w: 88, title: 'coder', sub: 'diff d’un pas' },
  { id: 'test', kind: 'human', w: 92, title: 'vous lancez', sub: 'npm test' },
  { id: 'reviewer', kind: 'agent', w: 88, title: 'reviewer', sub: 'verdict motivé' },
  { id: 'verdict', kind: 'decision', w: 70, title: 'verdict' },
  { id: 'done', kind: 'end', w: 78, title: 'ticket livré' },
]

// Positions : un rang, de gauche à droite ; l'écart avant « livré » est plus
// large pour porter son étiquette.
let x = 4
const nodes = spec.map((n, i) => {
  if (i === spec.length - 1) x += 46
  const node = { ...n, x, cx: x + n.w / 2 }
  x += n.w + GAP
  return node
})
const by = Object.fromEntries(nodes.map(n => [n.id, n]))

const forward = nodes.slice(0, -1).map((n, i) => ({
  x1: n.x + n.w,
  x2: nodes[i + 1].x - 3,
}))

const BOTTOM = Y + H
const v = by.verdict
const returns = [
  { to: by.coder, y: BOTTOM + 46, label: 'APPROVED, pas suivant · refus, le code est en cause' },
  { to: by.planner, y: BOTTOM + 96, label: 'refus, le pas est en cause' },
]
function path(r: typeof returns[number]) {
  return `M ${v.cx} ${Y + H / 2 + 31} V ${r.y} H ${r.to.cx} V ${BOTTOM + 4}`
}
</script>

<template>
  <svg class="loop-map" viewBox="0 0 960 250" preserveAspectRatio="xMidYMid meet" role="img"
       aria-label="La boucle explorer, planner, coder, reviewer, et les retours selon le verdict">
    <defs>
      <marker id="lm-head" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M1 1.5 L9 5 L1 8.5" fill="none" stroke="var(--line-2)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      </marker>
      <marker id="lm-head-a" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M1 1.5 L9 5 L1 8.5" fill="none" stroke="var(--accent)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      </marker>
    </defs>

    <!-- flèches vers l'avant -->
    <g stroke="var(--line-2)" stroke-width="1.4" fill="none">
      <line v-for="(f, i) in forward" :key="'f' + i" :x1="f.x1" :y1="Y + H / 2" :x2="f.x2" :y2="Y + H / 2" marker-end="url(#lm-head)" />
    </g>
    <text :x="(by.verdict.x + by.verdict.w + by.done.x) / 2" :y="Y + H / 2 - 8" text-anchor="middle" class="lm-edge">dernier pas</text>

    <!-- retours -->
    <g v-for="(r, i) in returns" :key="'r' + i">
      <path :d="path(r)" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="4 3" marker-end="url(#lm-head-a)" />
      <text :x="(v.cx + r.to.cx) / 2" :y="r.y - 7" text-anchor="middle" class="lm-edge is-accent">{{ r.label }}</text>
    </g>

    <!-- nœuds -->
    <g v-for="n in nodes" :key="n.id">
      <template v-if="n.kind === 'decision'">
        <polygon :points="`${n.cx},${Y + H / 2 - 31} ${n.cx + n.w / 2},${Y + H / 2} ${n.cx},${Y + H / 2 + 31} ${n.cx - n.w / 2},${Y + H / 2}`"
                 fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="1.2" />
        <text :x="n.cx" :y="Y + H / 2 + 4" text-anchor="middle" class="lm-dec">{{ n.title }}</text>
      </template>
      <template v-else>
        <rect :x="n.x" :y="Y" :width="n.w" :height="H" :rx="n.kind === 'agent' ? 10 : 29"
              :class="'lm-' + n.kind" />
        <text :x="n.cx" :y="n.sub ? Y + 25 : Y + H / 2 + 4" text-anchor="middle" class="lm-title" :class="'is-' + n.kind">{{ n.title }}</text>
        <text v-if="n.sub" :x="n.cx" :y="Y + 42" text-anchor="middle" class="lm-sub" :class="'is-' + n.kind">{{ n.sub }}</text>
      </template>
    </g>

    <!-- légende -->
    <g class="lm-legend">
      <rect x="4" y="8" width="22" height="14" rx="4" class="lm-agent" />
      <text x="33" y="19">sous-agent lancé par /step</text>
      <rect x="214" y="8" width="22" height="14" rx="7" class="lm-human" />
      <text x="243" y="19">geste que vous faites vous-même</text>
    </g>
  </svg>
</template>

<style>
.loop-map { width: 100%; height: 100%; display: block; overflow: visible; }
.loop-map .lm-agent { fill: var(--white); stroke: var(--line-2); stroke-width: 1.2; }
.loop-map .lm-human { fill: var(--accent-soft); stroke: var(--accent); stroke-width: 1.1; stroke-dasharray: 4 3; }
.loop-map .lm-end { fill: var(--surface); stroke: var(--line); stroke-width: 1; }
.loop-map .lm-title {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  fill: var(--ink);
}
.loop-map .lm-title.is-human { fill: var(--accent-deep); font-weight: 500; font-size: 13px; }
.loop-map .lm-title.is-end { fill: var(--ink-soft); font-weight: 500; font-size: 13px; }
.loop-map .lm-sub {
  font-family: var(--font-sans);
  font-size: 10.5px;
  fill: var(--muted);
}
.loop-map .lm-sub.is-human { fill: var(--accent-deep); }
.loop-map .lm-dec {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  fill: var(--teal-deep);
}
.loop-map .lm-edge {
  font-family: var(--font-sans);
  font-size: 10.5px;
  fill: var(--muted);
}
.loop-map .lm-edge.is-accent { fill: var(--accent-deep); }
.loop-map .lm-legend text {
  font-family: var(--font-mono);
  font-size: 10.5px;
  fill: var(--muted);
}
</style>
