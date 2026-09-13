<script setup lang="ts">
defineProps<{ index?: string }>()
</script>

<template>
  <div class="slidev-layout sect">
    <div class="sect-inner">
      <slot />
      <div class="sect-index">{{ index || '' }}</div>
    </div>
  </div>
</template>
