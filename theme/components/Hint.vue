<script setup lang="ts">
/** Note alignée à droite du titre de slide. À placer à la fin du `#`. */
defineProps<{ prefix?: string; href?: string }>()
</script>

<template>
  <span class="title-hint">
    <template v-if="prefix">{{ prefix + ' ' }}</template>
    <a v-if="href" :href="href" target="_blank"><slot /></a>
    <slot v-else />
  </span>
</template>
