<script setup lang="ts">
// Une vue intermédiaire entre la boucle conceptuelle et le diagramme détaillé
// du jour 2 : on distingue l’utilisateur, le harnais, le modèle et l’outil,
// tout en gardant une seule lecture verticale de la séquence.
// viewBox fixe 900 × 320 : la géométrie reste exacte à toutes les tailles.
import { useId } from 'vue'
import { arrowHead, graphiteFilter, line, rect, rng } from '../lib/pencil'
import type { Pt, Stroke } from '../lib/pencil'

const X = { user: 68, harness: 310, model: 590, tool: 832 }
const actors = [
  { id: 'user', label: 'utilisateur', role: 'demande', w: 142, tone: 'quiet' },
  { id: 'harness', label: 'le harnais', role: 'orchestre', w: 174, tone: 'accent' },
  { id: 'model', label: 'le modèle', role: 'décide', w: 154, tone: 'plain' },
  { id: 'tool', label: 'l’outil', role: 'agit', w: 142, tone: 'blue' },
] as const

type Actor = keyof typeof X
type Tone = 'plain' | 'accent' | 'blue'
interface Message {
  from: Actor
  to: Actor
  y: number
  n: string
  label: string
  detail?: string
  tone: Tone
}

const messages: Message[] = [
  { from: 'user', to: 'harness', y: 78, n: '1', label: 'question', tone: 'plain' },
  { from: 'harness', to: 'model', y: 118, n: '2', label: 'messages + outils disponibles', detail: 'instructions · historique · schémas', tone: 'plain' },
  { from: 'model', to: 'harness', y: 158, n: '3', label: 'appel d’outil structuré', detail: 'read({ path: « game/neon.js » })', tone: 'accent' },
  { from: 'harness', to: 'tool', y: 201, n: '4', label: 'permission, puis exécution', detail: 'execute(« read », { path })', tone: 'accent' },
  { from: 'tool', to: 'harness', y: 244, n: '5', label: 'résultat de l’outil', detail: '{ success, data: contenu }', tone: 'blue' },
  { from: 'harness', to: 'model', y: 284, n: '6', label: 'résultat ajouté au contexte', tone: 'blue' },
]

const fid = `g${useId().replace(/[^a-zA-Z0-9]/g, '')}`
const frames = Object.fromEntries(actors.map((a) => [
  a.id,
  rect(X[a.id] - a.w / 2, 5, a.w, 43, rng(`tool-loop-frame-${a.id}`), { over: 3, bow: 0.8, wobble: 0.35 }),
])) as Record<Actor, Stroke[]>

function arrow(m: Message): Stroke[] {
  const r = rng(`tool-loop-arrow-${m.n}`)
  const dir = X[m.to] > X[m.from] ? 1 : -1
  const a: Pt = [X[m.from] + dir * 9, m.y]
  const b: Pt = [X[m.to] - dir * 11, m.y]
  return [
    ...line(a, b, r, { wobble: 0.35, bow: 0.8, over: 0, passes: 2 }),
    ...arrowHead(a, b, 10, r),
  ]
}

function mid(m: Message) {
  return (X[m.from] + X[m.to]) / 2
}

const activations = [
  { actor: 'harness' as Actor, y: 77, h: 213, tone: 'accent' },
  { actor: 'model' as Actor, y: 117, h: 43, tone: 'plain' },
  { actor: 'tool' as Actor, y: 200, h: 46, tone: 'blue' },
  { actor: 'model' as Actor, y: 283, h: 29, tone: 'blue' },
]
</script>

<template>
  <svg class="tl" viewBox="0 0 900 320" preserveAspectRatio="xMidYMid meet" role="img"
       aria-label="Séquence d’un appel d’outil entre l’utilisateur, le harnais, le modèle et l’outil">
    <defs v-html="graphiteFilter(fid, 9)" />

    <!-- Acteurs et lignes de vie -->
    <g v-for="a in actors" :key="a.id">
      <line :x1="X[a.id]" y1="51" :x2="X[a.id]" y2="316" class="tl-life" />
      <g fill="none" stroke-linecap="round" :filter="`url(#${fid})`">
        <path v-for="(s, i) in frames[a.id]" :key="i" :d="s.d" class="tl-frame" :class="`is-${a.tone}`"
              :stroke-width="1.35 * s.w" :stroke-opacity="s.o" />
      </g>
      <text :x="X[a.id]" y="23" text-anchor="middle" class="tl-actor" :class="`is-${a.tone}`">{{ a.label }}</text>
      <text :x="X[a.id]" y="39" text-anchor="middle" class="tl-role">{{ a.role }}</text>
    </g>

    <!-- Le temps passé dans chaque système -->
    <rect v-for="(a, i) in activations" :key="'act' + i" :x="X[a.actor] - 6" :y="a.y" width="12" :height="a.h"
          rx="2" class="tl-activation" :class="`is-${a.tone}`" />

    <!-- Messages -->
    <g v-for="m in messages" :key="m.n">
      <g fill="none" stroke-linecap="round" stroke-linejoin="round" :filter="`url(#${fid})`">
        <path v-for="(s, i) in arrow(m)" :key="i" :d="s.d" class="tl-arrow" :class="`is-${m.tone}`"
              :stroke-width="1.55 * s.w" :stroke-opacity="s.o" />
      </g>
      <text :x="mid(m)" :y="m.y - (m.detail ? 17 : 7)" text-anchor="middle" class="tl-message">
        <tspan class="tl-number" :class="`is-${m.tone}`">{{ m.n }}</tspan><tspan dx="6">{{ m.label }}</tspan>
      </text>
      <text v-if="m.detail" :x="mid(m)" :y="m.y - 5" text-anchor="middle" class="tl-detail" :class="{ 'is-code': m.n === '3' || m.n === '4' || m.n === '5' }">{{ m.detail }}</text>
    </g>

    <text :x="X.model + 18" y="311" class="tl-next"><tspan class="tl-hook">↳</tspan> réponse finale… ou nouvel appel d’outil</text>
  </svg>
</template>

<style>
.tl { width: 100%; height: 100%; display: block; overflow: visible; }
.tl .tl-life { stroke: var(--line-2); stroke-width: 1; stroke-dasharray: 3 5; }
.tl .tl-frame { stroke: var(--graphite); }
.tl .tl-frame.is-accent { stroke: var(--accent); stroke-width: 1.5; }
.tl .tl-frame.is-blue { stroke: var(--blue); }

.tl text { fill: var(--ink); }
.tl .tl-actor {
  font-family: var(--font-title);
  font-size: 16px;
  font-weight: 650;
  letter-spacing: -0.01em;
}
.tl .tl-actor.is-accent { fill: var(--accent-deep); }
.tl .tl-actor.is-blue { fill: var(--blue-deep); }
.tl .tl-actor.is-quiet { fill: var(--ink-soft); }
.tl .tl-role {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  fill: var(--muted);
}

.tl .tl-activation { stroke-width: 1; }
.tl .tl-activation.is-plain { fill: var(--surface); stroke: var(--line-2); }
.tl .tl-activation.is-accent { fill: var(--accent-soft); stroke: var(--accent-line); }
.tl .tl-activation.is-blue { fill: var(--blue-soft); stroke: var(--blue-line); }

.tl .tl-arrow { stroke: var(--graphite); }
.tl .tl-arrow.is-accent { stroke: var(--accent); }
.tl .tl-arrow.is-blue { stroke: var(--blue); }
.tl .tl-message { font-family: var(--font-text); font-size: 13px; font-weight: 620; }
.tl .tl-number { font-family: var(--font-mono); font-weight: 600; fill: var(--ink-soft); }
.tl .tl-number.is-accent { fill: var(--accent-deep); }
.tl .tl-number.is-blue { fill: var(--blue-deep); }
.tl .tl-detail { font-family: var(--font-text); font-size: 10.5px; fill: var(--muted); }
.tl .tl-detail.is-code { font-family: var(--font-mono); font-size: 10px; fill: var(--ink-soft); }
.tl .tl-next { font-family: var(--font-text); font-size: 11px; font-style: italic; fill: var(--muted); }
.tl .tl-hook { font-family: var(--font-mono); font-style: normal; fill: var(--blue); }
</style>
