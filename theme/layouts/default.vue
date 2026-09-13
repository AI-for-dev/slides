<script setup lang="ts">
defineProps<{ section?: string }>()
</script>

<template>
  <div class="slidev-layout dflt">
    <div class="slide-body"><slot /></div>
    <footer class="slide-foot">
      <span class="foot-left">{{ section || 'IA4Dev 2026 · ANF jour 1' }}</span>
      <span class="foot-right">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </footer>
    <div class="slide-progress">
      <i :style="{ width: (100 * $slidev.nav.currentPage / $slidev.nav.total) + '%' }" />
    </div>
  </div>
</template>
