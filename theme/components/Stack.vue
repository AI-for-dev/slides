<script setup lang="ts">
/** Pile verticale. `fill` prend la hauteur restante, `center` centre le contenu. */
withDefaults(defineProps<{
  gap?: number | string
  fill?: boolean
  center?: boolean
}>(), { gap: 4 })
</script>

<template>
  <div
    class="stack"
    :class="{ 'is-fill': fill }"
    :style="{ gap: Number(gap) * 0.25 + 'rem', justifyContent: center ? 'center' : undefined }"
  >
    <slot />
  </div>
</template>
