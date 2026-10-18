<script setup lang="ts">
import { asset } from '../lib/asset'
import { t } from '../lib/i18n'

/**
 * Un deck sur la page d'accueil : toute la carte est le lien. `note` s'affiche
 * à droite du lien, par exemple pour signaler un deck pas encore traduit.
 */
defineProps<{ href: string; title: string; note?: string }>()

const open = t({ fr: 'Ouvrir les slides', en: 'Open the slides' })
</script>

<template>
  <a class="card deck" :href="asset(href)">
    <span class="deck-title">{{ title }}</span>
    <span class="deck-desc"><slot /></span>
    <span class="deck-go">
      {{ open }}
      <svg viewBox="0 0 24 12" aria-hidden="true"><path d="M1 6.2 C 8 5.6, 15 6.4, 21.5 6 M17 1.8 L 22 6 L 16.6 10.4" /></svg>
      <span v-if="note" class="deck-note">{{ note }}</span>
    </span>
  </a>
</template>
