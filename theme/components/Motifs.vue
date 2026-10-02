<script setup lang="ts">
// Les cinq motifs d'un flux de travail, chacun avec un mini-schéma, son
// exemple dans la boucle du ticket #2 et la façon de l'écrire dans un flow.
// Chaque schéma tient dans un viewBox fixe de 180x100.
const W = 34
const H = 22

interface Box { x: number; y: number; hi?: boolean }
interface Motif {
  name: string
  desc: string
  flow: string
  boxes: Box[]
  edges: string[]
  dashed?: string[]
  extra?: 'list' | 'max'
}

const c = (b: Box) => ({ l: b.x, r: b.x + W, t: b.y, b: b.y + H, my: b.y + H / 2, mx: b.x + W / 2 })

const chain: Box[] = [{ x: 8, y: 39 }, { x: 73, y: 39 }, { x: 138, y: 39 }]
const fan: Box[] = [{ x: 8, y: 39 }, { x: 128, y: 12 }, { x: 128, y: 66 }]
const orch: Box[] = [{ x: 8, y: 39, hi: true }, { x: 138, y: 39 }]
const loop: Box[] = [{ x: 38, y: 32 }, { x: 108, y: 32 }]
const red: Box[] = [{ x: 8, y: 6 }, { x: 8, y: 39 }, { x: 8, y: 72 }, { x: 138, y: 39, hi: true }]

const motifs: Motif[] = [
  {
    name: 'chain',
    desc: 'Le planner reçoit la note de l’explorer, le coder reçoit le plan.',
    flow: 'nœuds à la suite',
    boxes: chain,
    edges: [
      `M ${c(chain[0]).r} ${c(chain[0]).my} H ${c(chain[1]).l - 3}`,
      `M ${c(chain[1]).r} ${c(chain[1]).my} H ${c(chain[2]).l - 3}`,
    ],
  },
  {
    name: 'fan-out',
    desc: 'L’explorer et le tester lisent le ticket en même temps : aucun n’écrit.',
    flow: 'parallel',
    boxes: fan,
    edges: [
      `M ${c(fan[0]).r} ${c(fan[0]).my} C 80 50, 90 ${c(fan[1]).my}, ${c(fan[1]).l - 3} ${c(fan[1]).my}`,
      `M ${c(fan[0]).r} ${c(fan[0]).my} C 80 50, 90 ${c(fan[2]).my}, ${c(fan[2]).l - 3} ${c(fan[2]).my}`,
    ],
  },
  {
    name: 'orchestrate',
    desc: 'Le planner décide combien de pas il faut, puis chaque pas part au coder.',
    flow: 'map-from',
    boxes: orch,
    edges: [
      `M ${c(orch[0]).r} ${c(orch[0]).my} H 70`,
      `M 108 ${c(orch[1]).my} H ${c(orch[1]).l - 3}`,
    ],
    extra: 'list',
  },
  {
    name: 'loop',
    desc: 'Le coder et le reviewer recommencent tant que le pas n’est pas validé.',
    flow: 'loop + max',
    boxes: loop,
    edges: [`M ${c(loop[0]).r} ${c(loop[0]).my} H ${c(loop[1]).l - 3}`],
    dashed: [`M ${c(loop[1]).mx} ${c(loop[1]).b} V 78 H ${c(loop[0]).mx} V ${c(loop[0]).b + 3}`],
    extra: 'max',
  },
  {
    name: 'reduce',
    desc: 'Un agent relit plusieurs branches et en tire une réponse : l’auditeur.',
    flow: 'reads: [a, b, c]',
    boxes: red,
    edges: red.slice(0, 3).map(b =>
      `M ${c(b).r} ${c(b).my} C 95 ${c(b).my}, 95 50, ${c(red[3]).l - 3} 50`),
  },
]
</script>

<template>
  <div class="motifs">
    <div v-for="m in motifs" :key="m.name" class="motif">
      <div class="motif-name">{{ m.name }}</div>
      <svg class="motif-svg" viewBox="0 0 180 100" role="img" :aria-label="'motif ' + m.name">
        <defs>
          <marker :id="'mh-' + m.name" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M1 1.5 L9 5 L1 8.5" fill="none" stroke="var(--muted)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </marker>
          <marker :id="'mha-' + m.name" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M1 1.5 L9 5 L1 8.5" fill="none" stroke="var(--accent)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </marker>
        </defs>
        <path v-for="(d, i) in m.edges" :key="'e' + i" :d="d" fill="none" stroke="var(--muted)" stroke-width="1.3" :marker-end="`url(#mh-${m.name})`" />
        <path v-for="(d, i) in m.dashed || []" :key="'d' + i" :d="d" fill="none" stroke="var(--accent)" stroke-width="1.3" stroke-dasharray="3 3" :marker-end="`url(#mha-${m.name})`" />
        <g v-if="m.extra === 'list'" class="motif-list">
          <rect x="74" y="34" width="30" height="32" rx="5" />
          <line x1="80" y1="43" x2="98" y2="43" />
          <line x1="80" y1="50" x2="98" y2="50" />
          <line x1="80" y1="57" x2="93" y2="57" />
        </g>
        <text v-if="m.extra === 'list'" x="155" y="80" text-anchor="middle" class="motif-lbl">× n pas</text>
        <text v-if="m.extra === 'max'" x="90" y="94" text-anchor="middle" class="motif-lbl is-accent">jusqu’à max</text>
        <rect v-for="(b, i) in m.boxes" :key="'b' + i" :x="b.x" :y="b.y" :width="W" :height="H" rx="6"
              :class="b.hi ? 'motif-box is-hi' : 'motif-box'" />
      </svg>
      <div class="motif-desc">{{ m.desc }}</div>
      <div class="motif-flow"><span>dans un flow</span><code>{{ m.flow }}</code></div>
    </div>
  </div>
</template>

<style>
.motifs {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;
}
.motif {
  display: flex;
  flex-direction: column;
  padding: 0.85rem 0.9rem 0.8rem;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--white);
}
.motif-name {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent-deep);
}
.motif-svg { width: 100%; height: auto; margin: 0.6rem 0 0.55rem; display: block; }
.motif-box { fill: var(--surface); stroke: var(--line-2); stroke-width: 1.1; }
.motif-box.is-hi { fill: var(--accent-soft); stroke: var(--accent); }
.motif-list rect { fill: var(--white); stroke: var(--line-2); stroke-width: 1.1; }
.motif-list line { stroke: var(--teal); stroke-width: 1.6; stroke-linecap: round; }
.motif-lbl { font-family: var(--font-mono); font-size: 9.5px; fill: var(--muted); }
.motif-lbl.is-accent { fill: var(--accent-deep); }
.motif-desc { font-size: 0.76rem; line-height: 1.45; color: var(--ink-soft); flex: 1; }
.motif-flow {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.7rem;
  padding-top: 0.55rem;
  border-top: 1px solid var(--line);
}
.motif-flow span {
  font-family: var(--font-mono);
  font-size: 0.56rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--quiet);
}
.motif-flow code { width: fit-content; font-size: 0.7rem; }
</style>
