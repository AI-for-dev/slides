<script setup lang="ts">
// Diagramme de séquence d'une requête qui déclenche une lecture de fichier :
// utilisateur, Pi, LLM et outils. Trois phases colorées : la question part au
// LLM (encre), l'outil s'exécute (braise), le résultat revient au LLM (sarcelle).
// viewBox fixe 760x400 pour une géométrie exacte à toute taille.
const X = { user: 75, pi: 285, llm: 495, tools: 685 }
const actors = [
  { id: 'user', label: 'Utilisateur', glyph: '●' },
  { id: 'pi', label: 'Assistant IA (Pi)', glyph: '◆' },
  { id: 'llm', label: 'LLM', glyph: '◎' },
  { id: 'tools', label: 'Tools', glyph: '⚒' },
] as const

type Phase = 1 | 2 | 3
interface Msg { from: keyof typeof X; to: keyof typeof X; y: number; phase: Phase; label: string; pre?: string; italic?: boolean }

const msgs: Msg[] = [
  { from: 'user', to: 'pi', y: 72, phase: 1, label: 'Saisie de la question / commande' },
  { from: 'pi', to: 'llm', y: 132, phase: 1, label: 'HTTPS POST (messages JSON)' },
  { from: 'llm', to: 'pi', y: 192, phase: 1, label: 'Réponse du LLM (tool call : read)' },
  { from: 'pi', to: 'tools', y: 226, phase: 2, label: 'execute(« read », { path })' },
  { from: 'tools', to: 'pi', y: 270, phase: 2, label: '{ success, data: contenu }', pre: 'Le harnais exécute réellement l’outil.' },
  { from: 'pi', to: 'llm', y: 304, phase: 3, label: 'Nouvel appel LLM (+ résultat outil)' },
  { from: 'llm', to: 'pi', y: 356, phase: 3, label: 'Réponse du LLM (texte)' },
  { from: 'pi', to: 'user', y: 388, phase: 3, label: 'Affichage de la réponse' },
]

const activations = [
  { x: X.llm, y1: 132, y2: 192, phase: 1 as Phase },
  { x: X.tools, y1: 226, y2: 270, phase: 2 as Phase },
  { x: X.llm, y1: 304, y2: 356, phase: 3 as Phase },
]

const notes = [
  { y: 148, phase: 1 as Phase, lines: ['Traitement par le LLM', '(génération du tool call)'] },
  { y: 318, phase: 3 as Phase, lines: ['Le LLM génère maintenant', 'la réponse finale.'] },
]

function arrow(m: Msg) {
  const dir = X[m.to] > X[m.from] ? 1 : -1
  const x1 = X[m.from] + dir * 6
  const x2 = X[m.to] - dir * 9
  return { x1, x2, mid: (X[m.from] + X[m.to]) / 2 }
}
</script>

<template>
  <svg class="pi-seq" viewBox="0 0 760 400" preserveAspectRatio="xMidYMid meet" role="img"
       aria-label="Séquence d'une requête impliquant une lecture de fichier">
    <defs>
      <marker v-for="p in [1, 2, 3]" :id="'ps-h' + p" :key="p" viewBox="0 0 10 10" refX="8.5" refY="5"
              markerWidth="7" markerHeight="7" orient="auto">
        <path d="M1 1.5 L9 5 L1 8.5" fill="none" :class="'ps-stroke-' + p" stroke-width="1.7"
              stroke-linecap="round" stroke-linejoin="round" />
      </marker>
    </defs>

    <!-- acteurs et lignes de vie -->
    <g v-for="a in actors" :key="a.id">
      <line :x1="X[a.id]" y1="40" :x2="X[a.id]" y2="398" class="ps-life" />
      <rect :x="X[a.id] - 66" y="6" width="132" height="32" rx="8" class="ps-actor" />
      <text :x="X[a.id]" y="27" text-anchor="middle" class="ps-actor-t">
        <tspan class="ps-glyph">{{ a.glyph }}</tspan><tspan dx="7">{{ a.label }}</tspan>
      </text>
    </g>

    <!-- construction du message, côté Pi -->
    <text :x="(X.pi + X.llm) / 2" y="94" text-anchor="middle" class="ps-label">Construction du message</text>
    <text :x="(X.pi + X.llm) / 2" y="108" text-anchor="middle" class="ps-label is-muted">(system prompt + historique + tools + …)</text>

    <!-- activations -->
    <rect v-for="(a, i) in activations" :key="'a' + i" :x="a.x - 6" :y="a.y1" width="12" :height="a.y2 - a.y1"
          rx="2" :class="'ps-act is-' + a.phase" />

    <!-- notes -->
    <g v-for="(n, i) in notes" :key="'n' + i">
      <rect :x="X.llm + 16" :y="n.y" width="160" height="38" rx="6" :class="'ps-note is-' + n.phase" />
      <text v-for="(l, j) in n.lines" :key="j" :x="X.llm + 26" :y="n.y + 16 + j * 13" class="ps-note-t">{{ l }}</text>
    </g>

    <!-- messages -->
    <g v-for="(m, i) in msgs" :key="'m' + i">
      <line :x1="arrow(m).x1" :y1="m.y" :x2="arrow(m).x2" :y2="m.y" :class="'ps-stroke-' + m.phase"
            stroke-width="1.4" :marker-end="`url(#ps-h${m.phase})`" />
      <text v-if="m.pre" :x="arrow(m).mid" :y="m.y - 20" text-anchor="middle" :class="'ps-label is-pre ps-fill-' + m.phase">{{ m.pre }}</text>
      <text :x="arrow(m).mid" :y="m.y - 6" text-anchor="middle" :class="'ps-label ps-fill-' + m.phase">{{ m.label }}</text>
    </g>
  </svg>
</template>

<style>
.pi-seq { width: 100%; height: 100%; display: block; }
.pi-seq .ps-life { stroke: var(--line-2); stroke-width: 1; stroke-dasharray: 3 4; }
.pi-seq .ps-actor { fill: var(--white); stroke: var(--line-2); stroke-width: 1.1; }
.pi-seq .ps-actor-t { font-family: var(--font-sans); font-size: 12.5px; font-weight: 600; fill: var(--ink); }
.pi-seq .ps-glyph { font-size: 11px; fill: var(--muted); }
.pi-seq .ps-label { font-family: var(--font-sans); font-size: 11px; fill: var(--ink-soft); }
.pi-seq .ps-label.is-muted { fill: var(--muted); font-size: 10.5px; }
.pi-seq .ps-label.is-pre { font-style: italic; }
.pi-seq .ps-stroke-1 { stroke: var(--ink-soft); }
.pi-seq .ps-stroke-2 { stroke: var(--accent); }
.pi-seq .ps-stroke-3 { stroke: var(--teal); }
.pi-seq .ps-fill-1 { fill: var(--ink-soft); }
.pi-seq .ps-fill-2 { fill: var(--accent-deep); }
.pi-seq .ps-fill-3 { fill: var(--teal-deep); }
.pi-seq .ps-act { stroke-width: 1; }
.pi-seq .ps-act.is-1 { fill: var(--surface); stroke: var(--line-2); }
.pi-seq .ps-act.is-2 { fill: var(--accent-soft); stroke: var(--accent-line); }
.pi-seq .ps-act.is-3 { fill: var(--teal-soft); stroke: var(--teal-line); }
.pi-seq .ps-note { stroke-width: 1; }
.pi-seq .ps-note.is-1 { fill: var(--white); stroke: var(--line-2); }
.pi-seq .ps-note.is-3 { fill: var(--teal-soft); stroke: var(--teal-line); }
.pi-seq .ps-note-t { font-family: var(--font-sans); font-size: 10.5px; fill: var(--ink-soft); }
</style>
