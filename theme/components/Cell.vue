<script setup lang="ts">
/** Cellule de `Cols` qui déborde sur plusieurs colonnes ou occupe toute la hauteur. */
defineProps<{ span?: number | string; fill?: boolean }>()
</script>

<template>
  <div
    class="cell"
    :style="{
      gridColumn: span ? `span ${span} / span ${span}` : undefined,
      height: fill ? '100%' : undefined,
    }"
  >
    <slot />
  </div>
</template>
