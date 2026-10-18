<script setup lang="ts">
/**
 * Bouton de langue dans la barre de navigation de Slidev. `themeConfig.translation`
 * donne le chemin du même deck dans l'autre langue, relatif à celui-ci
 * (`../en/jour1/`). Le hash garde le numéro de slide : les deux versions
 * ont les mêmes slides dans le même ordre (vérifié par
 * `scripts/check-translations.mjs`).
 */
import { configs } from '@slidev/client'
import { lang, t } from './lib/i18n'

const target: string | undefined = configs.themeConfig?.translation
const other = lang === 'fr' ? 'EN' : 'FR'
const title = t({ fr: 'Read in English', en: 'Lire en français' })

function open() {
  const base = new URL(import.meta.env.BASE_URL, window.location.origin)
  window.location.assign(new URL(target!, base).pathname + window.location.hash)
}
</script>

<template>
  <button v-if="target" class="slidev-icon-btn lang-switch" :title="title" @click="open">
    <span class="sr-only">{{ title }}</span>
    <span aria-hidden="true">{{ other }}</span>
  </button>
</template>

<style>
.lang-switch {
  aspect-ratio: auto;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
}
</style>
