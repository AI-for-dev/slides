<script setup lang="ts">
/** Bandeau final : `flow` est écrit avec des flèches, ex. « dépôt > issue > diff ». */
defineProps<{ label: string; flow: string; note?: string }>()
</script>

<template>
  <div class="pipeline">
    <span class="pipeline-k">{{ label }}</span>
    <span class="pipeline-flow">
      <template v-for="(part, i) in flow.split('>')" :key="i">
        <i v-if="i > 0">→</i>{{ part.trim() }}
      </template>
    </span>
    <span v-if="note" class="pipeline-note">{{ note }}</span>
  </div>
</template>
