<script setup lang="ts">
defineProps<{ tone?: 'teal' | 'plain'; code?: boolean | 'true' }>()
</script>

<template>
  <span class="tag" :class="[tone ? 'is-' + tone : '', { 'is-code': code }]"><slot /></span>
</template>
