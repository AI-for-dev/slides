<script setup lang="ts">
/** Filet horizontal. */
defineProps<{ width?: string }>()
</script>

<template>
  <span class="rule-line" :style="{ width }" />
</template>
