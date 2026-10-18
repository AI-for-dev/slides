<script setup lang="ts">
/**
 * Bouton de langue dans la barre de navigation de Slidev. `themeConfig.translation`
 * donne le chemin du même deck dans l'autre langue, relatif à celui-ci
 * (`../en/jour1/`). Le hash garde le numéro de slide : les deux versions
 * ont les mêmes slides dans le même ordre (vérifié par
 * `scripts/check-translations.mjs`).
 *
 * Le serveur de dev ne sert qu'un deck et ramène toute adresse vers lui : le
 * bouton y est inerte et renvoie vers `npm run preview`, qui sert le site entier.
 */
import { configs } from '@slidev/client'
import { lang, t } from './lib/i18n'

const target: string | undefined = configs.themeConfig?.translation
const live = !import.meta.env.DEV
const other = lang === 'fr' ? 'EN' : 'FR'
const title = live
  ? t({ fr: 'Read in English', en: 'Lire en français' })
  : t({
      fr: 'Version anglaise : visible avec npm run preview, pas avec le serveur de dev',
      en: 'French version: use npm run preview, the dev server serves a single deck',
    })

function open() {
  if (!live) return
  const base = new URL(import.meta.env.BASE_URL, window.location.origin)
  window.location.assign(new URL(target!, base).pathname + window.location.hash)
}
</script>

<template>
  <button
    v-if="target"
    class="slidev-icon-btn lang-switch"
    :class="{ 'is-dev': !live }"
    :title="title"
    :aria-disabled="!live || undefined"
    @click="open"
  >
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
.lang-switch.is-dev {
  opacity: 0.35;
  cursor: help;
  text-decoration: line-through;
}
</style>
