<script setup lang="ts">
defineProps<{ n: string | number; title: string }>()
</script>

<template>
  <div class="step">
    <span class="step-n">{{ n }}</span>
    <div class="step-t">{{ title }}</div>
    <div class="step-d"><slot /></div>
  </div>
</template>
