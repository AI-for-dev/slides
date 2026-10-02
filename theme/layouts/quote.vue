<script setup lang="ts">
defineProps<{ section?: string }>()
</script>

<template>
  <div class="slidev-layout qte">
    <slot />
    <footer class="slide-foot">
      <span class="foot-left">{{ section || $slidev.themeConfigs.footer || 'IA4Dev 2026' }}</span>
      <span class="foot-right">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </footer>
    <div class="slide-progress">
      <i :style="{ width: (100 * $slidev.nav.currentPage / $slidev.nav.total) + '%' }" />
    </div>
  </div>
</template>
