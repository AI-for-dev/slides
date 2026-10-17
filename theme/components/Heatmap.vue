<script setup lang="ts">
/**
 * Grilles de comptes « v / of », une par groupe (un modèle, par exemple),
 * côte à côte. Lignes et colonnes ont deux niveaux : `rowGroups` × `rowLabels`
 * et `colGroups` × `colLabels`, avec un espace entre deux blocs. La teinte
 * donne l'ordre de grandeur, le chiffre la valeur. `notes` ajoute une ligne
 * sous le nom de chaque groupe.
 */
const p = withDefaults(defineProps<{
  groups: string[]
  notes?: string[]
  rowGroups: string[]
  rowLabels: string[]
  colGroups: string[]
  colLabels: string[]
  values: number[][][]
  of?: number
}>(), { of: 20 })

const nr = p.rowLabels.length
const nc = p.colLabels.length

// Cinq classes : la couleur sert à voir les motifs (une colonne qui s'éteint,
// une ligne qui s'allume), le chiffre reste lisible dans la case.
const level = (v: number) => Math.min(4, Math.floor((5 * v) / (p.of + 0.01)))

const CELL = 'minmax(2.1rem, 1fr)'
const block = (n: number, size: string, gap: string) =>
  Array.from({ length: n }, () => size).join(' ') + ' ' + gap
const colTracks = (() => {
  const one = p.colGroups.map((_, i) =>
    block(nc, CELL, i < p.colGroups.length - 1 ? '5px' : '')).join(' ')
  return 'auto auto ' + p.groups.map((_, i) => one + (i < p.groups.length - 1 ? ' 1.4rem' : '')).join(' ')
})()

const width = p.colGroups.length * nc + p.colGroups.length - 1
const colOf = (g: number, cg: number, c: number) => 3 + g * (width + 1) + cg * (nc + 1) + c
const rowOf = (rg: number, r: number) => 4 + rg * (nr + 1) + r
const rowTracks = 'auto auto auto ' + p.rowGroups.map((_, i) =>
  block(nr, '1.75rem', i < p.rowGroups.length - 1 ? '5px' : '')).join(' ')
</script>

<template>
  <div class="heatmap" :style="{ gridTemplateColumns: colTracks, gridTemplateRows: rowTracks }">
    <template v-for="(g, gi) in groups" :key="g">
      <div class="hm-group" :style="{ gridColumn: `${colOf(gi, 0, 0)} / span ${width}`, gridRow: 1 }">
        <span class="hm-name">{{ g }}</span>
        <span v-if="notes?.[gi]" class="hm-note">{{ notes[gi] }}</span>
      </div>
      <template v-for="(cg, cgi) in colGroups" :key="cg">
        <div class="hm-cg" :style="{ gridColumn: `${colOf(gi, cgi, 0)} / span ${nc}`, gridRow: 2 }">{{ cg }}</div>
        <div v-for="(cl, ci) in colLabels" :key="cl" class="hm-cl"
             :style="{ gridColumn: colOf(gi, cgi, ci), gridRow: 3 }">{{ cl }}</div>
        <template v-for="(rg, rgi) in rowGroups" :key="rg">
          <template v-for="(_, ri) in rowLabels" :key="ri">
            <div v-for="(__, ci) in colLabels" :key="ci" class="hm-cell"
                 :class="'is-l' + level(values[gi][rgi * nr + ri][cgi * nc + ci])"
                 :style="{ gridColumn: colOf(gi, cgi, ci), gridRow: rowOf(rgi, ri) }">
              {{ values[gi][rgi * nr + ri][cgi * nc + ci] }}
            </div>
          </template>
        </template>
      </template>
    </template>
    <template v-for="(rg, rgi) in rowGroups" :key="rg">
      <div class="hm-rg" :style="{ gridColumn: 1, gridRow: `${rowOf(rgi, 0)} / span ${nr}` }">{{ rg }}</div>
      <div v-for="(rl, ri) in rowLabels" :key="rl" class="hm-rl"
           :style="{ gridColumn: 2, gridRow: rowOf(rgi, ri) }">{{ rl }}</div>
    </template>
  </div>
</template>
