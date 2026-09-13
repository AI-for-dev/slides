<script setup lang="ts">
defineProps<{ n: string | number; title: string; tag?: string }>()
</script>

<template>
  <div class="act">
    <div class="act-n">{{ n }}</div>
    <div class="act-body">
      <div class="act-title">{{ title }}</div>
      <div class="act-desc"><slot /></div>
    </div>
    <div v-if="tag" class="tag">{{ tag }}</div>
  </div>
</template>
