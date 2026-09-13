<script setup lang="ts">
/** Liste markdown rendue en pastilles sur deux colonnes. */
withDefaults(defineProps<{ cols?: number | string }>(), { cols: 2 })
</script>

<template>
  <div
    class="chips"
    :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }"
  >
    <slot />
  </div>
</template>
