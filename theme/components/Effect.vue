<script setup lang="ts">
/**
 * Écart en points avec son intervalle à 95 %, sur une échelle de -max à +max.
 * Le point est plein quand l'intervalle exclut zéro, creux sinon.
 */
const p = withDefaults(defineProps<{
  v: number | string
  lo: number | string
  hi: number | string
  max?: number | string
}>(), { max: 60 })

const x = (n: number | string) =>
  50 + (50 * Math.max(-Number(p.max), Math.min(Number(p.max), Number(n)))) / Number(p.max)
const settled = () => Number(p.lo) > 0 || Number(p.hi) < 0
const sign = (n: number | string) => (Number(n) > 0 ? '+' : Number(n) < 0 ? '−' : '') + Math.abs(Number(n))
</script>

<template>
  <span class="effect" :class="{ 'is-settled': settled(), 'is-neg': Number(v) < 0 }"
        :title="`${sign(v)} [${sign(lo)}, ${sign(hi)}]`">
    <span class="effect-axis">
      <i class="effect-zero" />
      <i class="effect-ci" :style="{ left: x(lo) + '%', width: x(hi) - x(lo) + '%' }" />
      <i class="effect-dot" :style="{ left: x(v) + '%' }" />
    </span>
    <span class="effect-v">{{ sign(v) }}</span>
  </span>
</template>
