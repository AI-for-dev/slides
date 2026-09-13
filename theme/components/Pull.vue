<script setup lang="ts">
/** Citation mise en exergue, composée dans le serif du thème. */
withDefaults(defineProps<{ size?: 'md' | 'lg' }>(), { size: 'md' })
</script>

<template>
  <div class="pull" :class="'is-' + size"><slot /></div>
</template>
