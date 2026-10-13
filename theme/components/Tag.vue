<script setup lang="ts">
defineProps<{ tone?: 'teal' | 'plain'; code?: boolean | 'true'; href?: string }>()
</script>

<template>
  <a v-if="href" class="tag is-link" :class="[tone ? 'is-' + tone : '', { 'is-code': code }]" :href="href" target="_blank"><slot /></a>
  <span v-else class="tag" :class="[tone ? 'is-' + tone : '', { 'is-code': code }]"><slot /></span>
</template>
