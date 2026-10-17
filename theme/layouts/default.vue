<script setup lang="ts">
/** `deeper: true` marque une slide « pour aller plus loin », sautée en salle. */
defineProps<{ section?: string; deeper?: boolean }>()
</script>

<template>
  <div class="slidev-layout dflt">
    <div class="slide-body"><slot /></div>
    <footer class="slide-foot">
      <span class="foot-left">
        {{ section || $slidev.themeConfigs.footer || 'IA4Dev 2026' }}
        <span v-if="deeper" class="foot-tag">Pour aller plus loin</span>
      </span>
      <span class="foot-right">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </footer>
    <div class="slide-progress">
      <i :style="{ width: (100 * $slidev.nav.currentPage / $slidev.nav.total) + '%' }" />
    </div>
  </div>
</template>
