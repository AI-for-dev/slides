<script setup lang="ts">
/** Tableau « ce qui surprend dans Pi » : en-tête + lignes `Surprise`. */
defineProps<{ left: string; right: string }>()
</script>

<template>
  <div class="surprises">
    <div class="surprises-head">
      <span class="eyebrow">{{ left }}</span>
      <span class="eyebrow is-teal">{{ right }}</span>
    </div>
    <div class="surprises-body"><slot /></div>
  </div>
</template>
