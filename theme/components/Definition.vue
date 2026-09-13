<script setup lang="ts">
defineProps<{ source?: string }>()
</script>

<template>
  <div>
    <div class="definition"><slot /></div>
    <div v-if="source" class="definition-src">{{ source }}</div>
  </div>
</template>
