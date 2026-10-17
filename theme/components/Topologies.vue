<script setup lang="ts">
// Délégation, workflow, essaim : qui parle à qui, et qui en décide.
// Même vocabulaire que Motifs : chaque schéma tient dans un viewBox de 180x100.
const W = 34
const H = 22

interface Box { x: number; y: number; hi?: boolean; label?: string }
interface Topo {
  name: string
  desc: string
  who: string
  accent?: boolean
  boxes: Box[]
  edges: string[]
  both?: string[]
  dashed?: string[]
  labels?: { x: number; y: number; t: string; accent?: boolean }[]
  board?: boolean
}

const c = (b: Box) => ({ l: b.x, r: b.x + W, t: b.y, b: b.y + H, my: b.y + H / 2, mx: b.x + W / 2 })

const del: Box[] = [{ x: 8, y: 39, hi: true, label: 'vous' }, { x: 138, y: 39 }]
const wf: Box[] = [{ x: 8, y: 39 }, { x: 73, y: 39 }, { x: 138, y: 39 }]
const sw: Box[] = [{ x: 8, y: 8 }, { x: 8, y: 70 }, { x: 138, y: 39 }]
// le tableau, au centre de l'essaim
const B = { x: 76, y: 24, w: 30, h: 52 }

const topos: Topo[] = [
  {
    name: 'délégation',
    desc: 'Un sous-agent part d’un contexte vide, travaille seul et ne renvoie que sa conclusion.',
    who: 'vous',
    boxes: del,
    edges: [`M ${c(del[0]).r} ${c(del[0]).t + 6} C 75 18, 105 18, ${c(del[1]).l - 3} ${c(del[1]).t + 6}`],
    dashed: [`M ${c(del[1]).l} ${c(del[1]).b - 6} C 105 82, 75 82, ${c(del[0]).r + 3} ${c(del[0]).b - 6}`],
    labels: [
      { x: 90, y: 16, t: 'une tâche' },
      { x: 90, y: 92, t: 'sa conclusion', accent: true },
    ],
  },
  {
    name: 'workflow',
    desc: 'Les sous-agents s’enchaînent selon le graphe écrit à l’avance : personne ne répond à celui qui l’a précédé.',
    who: 'le fichier du flow',
    boxes: wf,
    edges: [
      `M ${c(wf[0]).r} ${c(wf[0]).my} H ${c(wf[1]).l - 3}`,
      `M ${c(wf[1]).r} ${c(wf[1]).my} H ${c(wf[2]).l - 3}`,
    ],
  },
  {
    name: 'essaim',
    desc: 'Les membres travaillent en même temps, se lisent sur un tableau commun et décident seuls de ce qu’ils répondent.',
    who: 'personne, chacun lit le tableau',
    accent: true,
    boxes: sw,
    board: true,
    both: [
      `M ${c(sw[0]).r + 3} ${c(sw[0]).my} C 58 ${c(sw[0]).my}, 64 34, ${B.x - 3} 34`,
      `M ${c(sw[1]).r + 3} ${c(sw[1]).my} C 58 ${c(sw[1]).my}, 64 66, ${B.x - 3} 66`,
      `M ${B.x + B.w + 3} 50 H ${c(sw[2]).l - 3}`,
    ],
  },
]
</script>

<template>
  <div class="topos">
    <div v-for="t in topos" :key="t.name" class="topo" :class="{ 'is-accent': t.accent }">
      <div class="topo-name">{{ t.name }}</div>
      <svg class="topo-svg" viewBox="0 0 180 100" role="img" :aria-label="'schéma : ' + t.name">
        <defs>
          <marker :id="'th-' + t.name" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1.5 L9 5 L1 8.5" fill="none" stroke="var(--muted)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </marker>
          <marker :id="'tha-' + t.name" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1.5 L9 5 L1 8.5" fill="none" stroke="var(--accent)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </marker>
        </defs>
        <path v-for="(d, i) in t.edges" :key="'e' + i" :d="d" fill="none" stroke="var(--muted)" stroke-width="1.3" :marker-end="`url(#th-${t.name})`" />
        <path v-for="(d, i) in t.dashed || []" :key="'d' + i" :d="d" fill="none" stroke="var(--accent)" stroke-width="1.3" stroke-dasharray="3 3" :marker-end="`url(#tha-${t.name})`" />
        <path v-for="(d, i) in t.both || []" :key="'b' + i" :d="d" fill="none" stroke="var(--accent)" stroke-width="1.3"
              :marker-start="`url(#tha-${t.name})`" :marker-end="`url(#tha-${t.name})`" />
        <g v-if="t.board" class="topo-board">
          <rect :x="B.x" :y="B.y" :width="B.w" :height="B.h" rx="4" />
          <line v-for="k in 5" :key="k" :x1="B.x + 6" :x2="B.x + B.w - (k % 2 ? 6 : 11)" :y1="B.y + 4 + k * 7.5" :y2="B.y + 4 + k * 7.5" />
          <text :x="B.x + B.w / 2" :y="B.y + B.h + 13" text-anchor="middle" class="topo-lbl is-accent">board</text>
        </g>
        <text v-for="(l, i) in t.labels || []" :key="'l' + i" :x="l.x" :y="l.y" text-anchor="middle"
              :class="l.accent ? 'topo-lbl is-accent' : 'topo-lbl'">{{ l.t }}</text>
        <template v-for="(b, i) in t.boxes" :key="'r' + i">
          <rect :x="b.x" :y="b.y" :width="W" :height="H" rx="6" :class="b.hi ? 'topo-box is-hi' : 'topo-box'" />
          <text v-if="b.label" :x="b.x + W / 2" :y="b.y + H / 2 + 3.4" text-anchor="middle" class="topo-in">{{ b.label }}</text>
        </template>
      </svg>
      <div class="topo-desc">{{ t.desc }}</div>
      <div class="topo-who"><span>qui parle après qui</span>{{ t.who }}</div>
    </div>
  </div>
</template>

<style>
.topos {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}
.topo {
  display: flex;
  flex-direction: column;
  padding: 0.95rem 1.05rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--white);
}
.topo.is-accent { border-color: var(--accent-line); }
.topo-name {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ink-soft);
}
.topo.is-accent .topo-name { color: var(--accent-deep); }
.topo-svg { width: 100%; height: 6.6rem; margin: 0.4rem 0 0.5rem; display: block; }
.topo-box { fill: var(--surface); stroke: var(--line-2); stroke-width: 1.1; }
.topo-box.is-hi { fill: var(--accent-soft); stroke: var(--accent); }
.topo-in { font-family: var(--font-mono); font-size: 8.5px; fill: var(--accent-deep); }
.topo-board rect { fill: var(--white); stroke: var(--accent); stroke-width: 1.2; }
.topo-board line { stroke: var(--teal); stroke-width: 1.6; stroke-linecap: round; }
.topo-lbl { font-family: var(--font-mono); font-size: 9px; fill: var(--muted); }
.topo-lbl.is-accent { fill: var(--accent-deep); }
.topo-desc { font-size: 0.8rem; line-height: 1.45; color: var(--ink-soft); flex: 1; }
.topo-who {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.75rem;
  padding-top: 0.55rem;
  border-top: 1px solid var(--line);
  font-size: 0.8rem;
  color: var(--ink);
}
.topo-who span {
  font-family: var(--font-mono);
  font-size: 0.56rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--quiet);
}
</style>
