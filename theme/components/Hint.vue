<script setup lang="ts">
/**
 * Note alignée à droite du titre de slide. À placer à la fin du `#`.
 * `href` ouvre un site dans un nouvel onglet ; `to` mène à une slide du deck,
 * par son numéro ou son `routeAlias`.
 */
defineProps<{ prefix?: string; href?: string; to?: string }>()
</script>

<template>
  <span class="title-hint">
    <template v-if="prefix">{{ prefix + ' ' }}</template>
    <Link v-if="to" :to="to"><slot /></Link>
    <a v-else-if="href" :href="href" target="_blank"><slot /></a>
    <slot v-else />
  </span>
</template>
