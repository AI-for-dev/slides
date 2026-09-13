<script setup lang="ts">
/** Un des filtres « quels modèles puis-je utiliser ». `n` fixe aussi la teinte. */
defineProps<{ n: string | number; title: string }>()
</script>

<template>
  <div class="criterion" :class="'criterion-' + n">
    <div class="criterion-k">{{ String(n).padStart(2, '0') }}</div>
    <div class="criterion-t">{{ title }}</div>
    <div class="criterion-d"><slot /></div>
  </div>
</template>
