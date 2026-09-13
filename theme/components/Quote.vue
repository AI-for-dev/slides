<script setup lang="ts">
/** Corps d'une slide `layout: quote`. */
defineProps<{
  eyebrow?: string
  cite?: string
  href?: string
  hrefLabel?: string
  note?: string
  small?: boolean
}>()
</script>

<template>
  <div class="quote-body">
    <div v-if="eyebrow" class="eyebrow">{{ eyebrow }}</div>
    <div class="qte-mark">“</div>
    <div class="qte-text" :class="{ 'is-small': small }"><slot /></div>
    <div v-if="cite || note" class="qte-cite">
      <span class="bar" />
      <span v-if="cite">
        {{ cite }}
        <template v-if="href"> · <a :href="href" target="_blank">{{ hrefLabel || href }}</a></template>
      </span>
      <span v-if="note" class="quiet">{{ note }}</span>
    </div>
  </div>
</template>
