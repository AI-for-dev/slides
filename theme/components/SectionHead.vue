<script setup lang="ts">
/**
 * Bloc de gauche d'une slide de section : sur-titre, titre, précision.
 * `num` est dessiné en grand par le gabarit section. Un sur-titre qui ne fait
 * que répéter ce rang (« Partie 2 », « Acte 1 ») est omis ; un sur-titre qui
 * situe la slide (« Partie 1 · Premier pas avec Pi ») est gardé.
 */
import { computed, inject, watchEffect } from 'vue'
import type { Ref } from 'vue'

const p = defineProps<{ eyebrow?: string; num?: string; detail?: string }>()

const slot = inject<Ref<string | undefined> | null>('section-num', null)
watchEffect(() => { if (slot) slot.value = p.num })

const showEyebrow = computed(() => !!p.eyebrow && !/^(partie|acte|module)\s+[\dIVX.]+$/i.test(p.eyebrow.trim()))
</script>

<template>
  <div class="sect-head">
    <div v-if="showEyebrow" class="eyebrow">{{ eyebrow }}</div>
    <slot />
    <h2 v-if="detail">{{ detail }}</h2>
  </div>
</template>
