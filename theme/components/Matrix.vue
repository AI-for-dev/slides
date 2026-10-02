<script setup lang="ts">
/**
 * Enveloppe d'un tableau markdown de mesures : lignes serrées, colonnes
 * centrées après la première. `size` règle la taille du texte, `first` la
 * largeur de la première colonne.
 */
withDefaults(defineProps<{ size?: 'xs' | 'sm' | 'md'; first?: string; left?: boolean }>(), { size: 'sm' })
</script>

<template>
  <div class="matrix" :class="['is-' + size, { 'is-left': left }]" :style="{ '--matrix-first': first }">
    <slot />
  </div>
</template>
