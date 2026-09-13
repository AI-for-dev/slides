<script setup lang="ts">
/** Grille. `cols` accepte un nombre de colonnes égales ou un template CSS. */
const p = withDefaults(defineProps<{
  cols?: number | string
  gap?: number | string
  align?: 'start' | 'center' | 'stretch'
  content?: 'start' | 'center'
  fill?: boolean
}>(), { cols: 2, gap: 6, align: 'stretch' })

const template = () =>
  /^\d+$/.test(String(p.cols))
    ? `repeat(${p.cols}, minmax(0, 1fr))`
    : String(p.cols)
</script>

<template>
  <div
    class="cols"
    :class="{ 'is-fill': fill }"
    :style="{
      gridTemplateColumns: template(),
      gap: Number(gap) * 0.25 + 'rem',
      alignItems: align,
      alignContent: content,
    }"
  >
    <slot />
  </div>
</template>
