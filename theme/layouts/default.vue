<script setup lang="ts">
/** `deeper: true` marque une slide « pour aller plus loin », sautée en salle. */
defineProps<{ section?: string; deeper?: boolean }>()
</script>

<template>
  <div class="slidev-layout dflt">
    <div class="slide-body"><slot /></div>
    <SlideFoot :section="section" :deeper="deeper" />
    <div class="slide-progress">
      <i :style="{ width: (100 * $slidev.nav.currentPage / $slidev.nav.total) + '%' }" />
    </div>
  </div>
</template>
