<script setup lang="ts">
/** Sommaire d'une section : une liste markdown, numérotée automatiquement. */
withDefaults(defineProps<{ numbering?: 'decimal' | 'roman' }>(), { numbering: 'decimal' })
</script>

<template>
  <div class="agenda" :class="'is-' + numbering"><slot /></div>
</template>
