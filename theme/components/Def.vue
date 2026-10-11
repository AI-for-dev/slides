<script setup lang="ts">
/** Une ligne de `Definition`. `hero` met la ligne en avant. */
defineProps<{ term: string; hero?: boolean | 'true' }>()
</script>

<template>
  <div class="def-row" :class="{ 'is-hero': hero }">
    <div class="def-k">{{ term }}</div>
    <div class="def-v"><slot /></div>
  </div>
</template>
