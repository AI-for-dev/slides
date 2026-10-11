<script setup lang="ts">
import { computed, provide, ref } from 'vue'

const p = defineProps<{ index?: string }>()

// Avancement dans le deck, lu dans « … 2 / 5 » ou « Module 3 / 4 » : il règle
// où en est la bifurcation (1 à 5), quel que soit le nombre de parties.
const step = computed(() => {
  const m = p.index?.match(/(\d+)\s*\/\s*(\d+)/)
  if (!m) return undefined
  const [x, total] = [Number(m[1]), Number(m[2])]
  return Math.min(5, Math.max(1, Math.ceil((5 * x) / total)))
})

// Le grand numéro dessiné est celui que la slide donne à SectionHead (`num`),
// sinon le rang lu dans `index`.
const num = ref<string>()
provide('section-num', num)
const label = computed(() => num.value ?? (step.value ? String(p.index?.match(/(\d+)\s*\//)?.[1]).padStart(2, '0') : undefined))
</script>

<template>
  <div class="slidev-layout sect">
    <Bascule class="sect-art" :step="step" :y="0.86" :pivot="0.5" :amp="150" />
    <PencilNumeral v-if="label" class="sect-numeral" :value="label" />
    <div class="sect-inner">
      <slot />
    </div>
    <div class="sect-index">{{ index || '' }}</div>
  </div>
</template>
