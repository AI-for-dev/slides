<script setup lang="ts">
defineProps<{ source?: string; href?: string }>()
</script>

<template>
  <div>
    <div class="definition"><slot /></div>
    <div v-if="source" class="definition-src">
      <a v-if="href" :href="href" target="_blank">{{ source }}</a>
      <template v-else>{{ source }}</template>
    </div>
  </div>
</template>
