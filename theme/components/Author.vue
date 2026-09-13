<script setup lang="ts">
defineProps<{ name: string; org: string }>()
</script>

<template>
  <div class="author">
    <span class="who">{{ name }}</span>
    <span class="where">{{ org }}</span>
  </div>
</template>
