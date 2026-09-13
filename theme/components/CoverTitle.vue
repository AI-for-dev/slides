<script setup lang="ts">
/** Bloc central de la couverture : titre + accroche. */
defineProps<{ sub?: string }>()
</script>

<template>
  <div class="cover-title">
    <slot />
    <h2 v-if="sub">{{ sub }}</h2>
  </div>
</template>
