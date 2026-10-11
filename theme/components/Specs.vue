<script setup lang="ts">
/**
 * Liste markdown clé/valeur : le **gras** de tête devient la clé.
 * `w` aligne les valeurs sur une colonne de cette largeur (retrait suspendu),
 * `raw` garde la casse de la clé (commandes, chemins, identifiants).
 */
defineProps<{ w?: string; raw?: boolean }>()
</script>

<template>
  <div class="specs" :class="{ 'is-raw': raw, 'is-hang': !!w }" :style="w ? { '--specs-k': w } : undefined">
    <slot />
  </div>
</template>
