<script setup lang="ts">
/**
 * Page d'accueil des supports : le diagramme de bifurcation court sous les
 * trois decks, du trait unique (les fondations) au nuage (plusieurs agents).
 */
</script>

<template>
  <div class="slidev-layout home">
    <Bascule class="home-art" :y="0.875" :pivot="0.36" :amp="64" />
    <div class="home-inner">
      <slot />
    </div>
  </div>
</template>
