<script setup lang="ts">
/** Les trois logos institutionnels, toujours sur leur plaque blanche. */
withDefaults(defineProps<{ size?: number | string; dark?: boolean }>(), { size: 46 })

const LOGOS = [
  { file: 'logo-devlog', alt: 'Réseau DevLog', scale: 1 },
  { file: 'logo-groupe-calcul', alt: 'Groupe Calcul', scale: 1 },
  { file: 'logo-uga', alt: 'Université Grenoble Alpes', scale: 1.09 },
]
</script>

<template>
  <div class="logo-bar" :class="{ 'on-dark': dark }">
    <img
      v-for="l in LOGOS"
      :key="l.file"
      :src="`/images/${l.file}.png`"
      :alt="l.alt"
      :style="{ height: Number(size) * l.scale + 'px' }"
    />
  </div>
</template>
