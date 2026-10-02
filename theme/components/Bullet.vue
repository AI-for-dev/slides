<script setup lang="ts">
/** Ligne encadrée précédée d'une pastille ou d'une étiquette. `size` réduit le texte. */
withDefaults(defineProps<{
  k?: string
  badge?: 'num' | 'tag'
  accent?: boolean
  size?: 'sm' | 'md'
}>(), { badge: 'num', size: 'md' })
</script>

<template>
  <div class="bullet" :class="{ 'is-sm': size === 'sm' }">
    <span v-if="k" :class="badge === 'tag' ? 'tag is-plain' : ['num', accent ? 'is-accent' : 'is-ghost']">{{ k }}</span>
    <div class="bullet-body"><slot /></div>
  </div>
</template>
