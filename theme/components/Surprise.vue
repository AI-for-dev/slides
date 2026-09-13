<script setup lang="ts">
/** Ce qui surprend dans Pi, et l'extension qui y répond. */
defineProps<{ q: string }>()
</script>

<template>
  <div class="surprise">
    <div class="s-left">{{ q }}</div>
    <div class="s-arrow">→</div>
    <div class="s-right"><slot /></div>
  </div>
</template>
