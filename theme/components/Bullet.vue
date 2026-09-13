<script setup lang="ts">
/** Ligne encadrée précédée d'une pastille ou d'une étiquette. */
withDefaults(defineProps<{
  k?: string
  badge?: 'num' | 'tag'
  accent?: boolean
}>(), { badge: 'num' })
</script>

<template>
  <div class="bullet">
    <span v-if="k" :class="badge === 'tag' ? 'tag is-plain' : ['num', accent ? 'is-accent' : 'is-ghost']">{{ k }}</span>
    <div class="bullet-body"><slot /></div>
  </div>
</template>
