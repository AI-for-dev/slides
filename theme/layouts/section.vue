<script setup lang="ts">
import { computed } from 'vue'

const p = defineProps<{ index?: string }>()

// « Partie 2 / 5 » → 2 : pilote le numéro dessiné et l'angle de la bascule.
const n = computed(() => Number(p.index?.match(/\d+/)?.[0] ?? 0) || undefined)
</script>

<template>
  <div class="slidev-layout sect">
    <Bascule class="sect-art" :step="n" :y="0.86" :pivot="0.5" :amp="150" />
    <PencilNumeral v-if="n" class="sect-numeral" :value="String(n).padStart(2, '0')" />
    <div class="sect-inner">
      <slot />
    </div>
    <div class="sect-index">{{ index || '' }}</div>
  </div>
</template>
