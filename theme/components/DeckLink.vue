<script setup lang="ts">
import { asset } from '../lib/asset'

/** Un deck sur la page d'accueil : toute la carte est le lien. */
defineProps<{ href: string; title: string }>()
</script>

<template>
  <a class="card deck" :href="asset(href)">
    <span class="deck-title">{{ title }}</span>
    <span class="deck-desc"><slot /></span>
    <span class="deck-go">
      Ouvrir les slides
      <svg viewBox="0 0 24 12" aria-hidden="true"><path d="M1 6.2 C 8 5.6, 15 6.4, 21.5 6 M17 1.8 L 22 6 L 16.6 10.4" /></svg>
    </span>
  </a>
</template>
