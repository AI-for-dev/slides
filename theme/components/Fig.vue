<script setup lang="ts">
import { asset } from '../lib/asset'

withDefaults(defineProps<{
  src: string
  caption?: string
  href?: string
  /** 'paper' = light card, 'screen' = dark chrome for terminal captures, 'bare' = no frame */
  frame?: 'paper' | 'screen' | 'bare'
  /** object-fit behaviour inside a fixed-height parent */
  contain?: boolean
  /** hauteur fixe de la figure (CSS), l'image s'y ajuste */
  h?: string
}>(), { frame: 'paper', contain: false })
</script>

<template>
  <figure class="fig" :class="['fig-' + frame, { 'is-contain': contain || !!h }]" :style="h ? { height: h } : undefined">
    <div class="fig-media">
      <img :src="asset(src)" alt="" />
    </div>
    <figcaption v-if="caption" class="fig-cap">
      <span class="fig-cap-mark" />
      <span>
        <template v-if="href"><a :href="href" target="_blank">{{ caption }}</a></template>
        <template v-else>{{ caption }}</template>
      </span>
    </figcaption>
  </figure>
</template>

<style>
.fig {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.fig-media {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.fig img { display: block; max-width: 100%; }
.fig.is-contain .fig-media img { max-height: 100%; width: auto; object-fit: contain; }
.fig:not(.is-contain) .fig-media img { width: 100%; height: auto; }

.fig-paper .fig-media {
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-md);
  padding: 0.55rem;
}
.fig-paper .fig-media img { border-radius: 6px; }

.fig-screen .fig-media {
  background: #1b1b25;
  border: 1px solid #2c2c3a;
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.fig-bare .fig-media { background: transparent; }

.fig-cap {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.02em;
  color: var(--muted);
}
.fig-cap-mark {
  width: 14px;
  height: 2px;
  border-radius: 2px;
  background: var(--line-2);
  flex: none;
}
.fig-cap a { border-bottom-color: var(--line-2); }
</style>
