<script setup lang="ts">
defineProps<{ section?: string }>()
</script>

<template>
  <div class="slidev-layout qte">
    <slot />
    <SlideFoot :section="section" />
    <div class="slide-progress">
      <i :style="{ width: (100 * $slidev.nav.currentPage / $slidev.nav.total) + '%' }" />
    </div>
  </div>
</template>
