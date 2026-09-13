<script setup lang="ts">
defineProps<{ k: string; title: string; hero?: boolean }>()
</script>

<template>
  <div class="choice" :class="{ 'is-hero': hero }">
    <div class="choice-k">{{ k }}</div>
    <div class="choice-body">
      <div class="card-title">{{ title }}</div>
      <slot />
    </div>
  </div>
</template>
