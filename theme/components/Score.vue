<script setup lang="ts">
/** Taux de réussite « v / of » avec une jauge. `hi` le met en avant. */
const p = withDefaults(defineProps<{
  v: number | string
  of?: number | string
  hi?: boolean
}>(), { of: 20 })

const pct = () => Math.max(0, Math.min(100, (100 * Number(p.v)) / Number(p.of)))
</script>

<template>
  <span class="score" :class="{ 'is-hi': hi, 'is-zero': Number(v) === 0 }">
    <span class="score-bar"><i :style="{ width: pct() + '%' }" /></span>
    <span class="score-v">{{ v }}/{{ of }}</span>
  </span>
</template>
