<script setup lang="ts">
/** Sur-titre : petit label mono en capitales, précédé d'un tiret coloré. */
defineProps<{ tone?: 'teal' | 'quiet' }>()
</script>

<template>
  <span class="eyebrow" :class="tone ? 'is-' + tone : ''"><slot /></span>
</template>
