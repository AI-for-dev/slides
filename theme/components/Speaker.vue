<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  org: string
  /** nom de fichier dans public/images, sans extension */
  avatar: string
  tone?: 'blue' | 'red'
}>(), { tone: 'blue' })
</script>

<template>
  <div class="speaker" :class="{ 'is-max': tone === 'red' }">
    <div class="speaker-head">
      <img class="avatar" :src="`/images/${avatar}.png`" :alt="name" />
      <div>
        <div class="speaker-name">{{ name }}</div>
        <div class="speaker-org">{{ org }}</div>
      </div>
    </div>
    <div class="speaker-body"><slot /></div>
  </div>
</template>
