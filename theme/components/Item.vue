<script setup lang="ts">
/** Ligne « pastille + titre + précision », déclinée selon le contexte. */
withDefaults(defineProps<{
  variant?: 'goal' | 'role' | 'adv'
  n?: string | number
  ghost?: boolean
}>(), { variant: 'goal' })
</script>

<template>
  <div :class="variant">
    <span class="num" :class="ghost ? 'is-ghost' : 'is-accent'">{{ n }}</span>
    <div class="item-body"><slot /></div>
  </div>
</template>
