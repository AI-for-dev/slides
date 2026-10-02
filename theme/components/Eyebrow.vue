<script setup lang="ts">
/**
 * Sur-titre : petit label mono en capitales, précédé d'un tiret coloré.
 * `code` garde la casse, pour un nom de fichier ou un chemin.
 */
defineProps<{ tone?: 'teal' | 'quiet'; code?: boolean }>()
</script>

<template>
  <span class="eyebrow" :class="[tone ? 'is-' + tone : '', { 'is-code': code }]"><slot /></span>
</template>
