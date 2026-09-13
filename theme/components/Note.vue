<script setup lang="ts">
/** Ligne de commentaire discrète, avec une étiquette optionnelle à gauche. */
withDefaults(defineProps<{
  tag?: string
  tone?: 'muted' | 'quiet'
  /** colle la note au titre qui la précède */
  tight?: boolean
}>(), { tone: 'muted' })
</script>

<template>
  <div class="note-line" :class="[tone, { 'is-tight': tight }]">
    <span v-if="tag" class="tag is-plain">{{ tag }}</span>
    <span class="note-body"><slot /></span>
  </div>
</template>
