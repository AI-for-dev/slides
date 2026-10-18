<script setup lang="ts">
/**
 * Pied de page commun aux slides ordinaires et aux citations : partie à
 * gauche ; auteurs, licence et `n / total` à droite. Auteurs et licence
 * viennent de `themeConfig` (`authors`, `license`, `licenseUrl`).
 */
import { t } from '../lib/i18n'

defineProps<{ section?: string; deeper?: boolean }>()

const deeperLabel = t({ fr: 'Pour aller plus loin', en: 'Going further' })
</script>

<template>
  <footer class="slide-foot">
    <span class="foot-left">
      {{ section || $slidev.themeConfigs.footer || 'IA4Dev 2026' }}
      <span v-if="deeper" class="foot-tag">{{ deeperLabel }}</span>
    </span>
    <span class="foot-right">
      <span v-if="$slidev.themeConfigs.authors || $slidev.themeConfigs.license" class="foot-credits">
        <span v-if="$slidev.themeConfigs.authors">{{ $slidev.themeConfigs.authors }}</span>
        <span v-if="$slidev.themeConfigs.authors && $slidev.themeConfigs.license" aria-hidden="true">·</span>
        <a
          v-if="$slidev.themeConfigs.license"
          class="foot-license"
          :href="$slidev.themeConfigs.licenseUrl"
          target="_blank"
          rel="license noopener"
        >{{ $slidev.themeConfigs.license }}</a>
      </span>
      <span class="foot-page">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </span>
  </footer>
</template>
