<script setup lang="ts">
/** Bloc de gauche d'une slide de section : sur-titre, numéro ajouré, titre. */
defineProps<{ eyebrow?: string; num?: string; detail?: string }>()
</script>

<template>
  <div class="sect-head">
    <div v-if="eyebrow" class="eyebrow">{{ eyebrow }}</div>
    <div v-if="num" class="sect-num">{{ num }}</div>
    <slot />
    <h2 v-if="detail">{{ detail }}</h2>
  </div>
</template>
