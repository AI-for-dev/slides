<script setup lang="ts">
/** Verdict inline : oui (sarcelle), non (braise), partiel (gris). */
withDefaults(defineProps<{ v?: 'yes' | 'no' | 'part' }>(), { v: 'yes' })

const GLYPH = { yes: '✓', no: '✗', part: '~' } as const
</script>

<template>
  <span class="mark" :class="'is-' + v">
    <span class="mark-g">{{ GLYPH[v] }}</span>
    <span class="mark-t"><slot /></span>
  </span>
</template>
