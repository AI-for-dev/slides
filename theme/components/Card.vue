<script setup lang="ts">
withDefaults(defineProps<{
  /** plain (blanc) · soft (sable) · accent (braise) · teal (sarcelle) */
  variant?: 'plain' | 'soft' | 'accent' | 'teal'
  eyebrow?: string
  /** pastille et titre en tête de carte */
  badge?: string
  badgeTone?: 'accent' | 'teal' | 'ghost'
  title?: string
  /** teinte du sur-titre */
  tone?: 'accent' | 'teal'
  /** centre verticalement le contenu quand la carte est étirée */
  center?: boolean
  fill?: boolean
  /** taille du texte courant de la carte */
  size?: 'xs' | 'sm' | 'md' | 'lg'
}>(), { variant: 'plain', tone: 'accent', size: 'md', badgeTone: 'accent' })

const CLASS = {
  plain: 'card',
  soft: 'card-soft',
  accent: 'card-accent',
  teal: 'card-teal',
} as const
</script>

<template>
  <div
    :class="[CLASS[variant], 'is-' + size, { 'v-center': center }]"
    :style="{ flex: fill ? '1' : undefined }"
  >
    <div v-if="eyebrow" class="eyebrow" :class="{ 'is-teal': tone === 'teal' }">{{ eyebrow }}</div>
    <div v-if="badge || title" class="card-head">
      <span v-if="badge" class="num" :class="'is-' + badgeTone">{{ badge }}</span>
      <span v-if="title" class="card-title">{{ title }}</span>
    </div>
    <slot />
  </div>
</template>
