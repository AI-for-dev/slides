<script setup lang="ts">
/**
 * Grand numéro de partie dessiné au crayon : contour repassé, hachures à
 * l'intérieur, et derrière une première version gommée, un peu décalée.
 */
import { computed, useId } from 'vue'
import { graphiteFilter, hatch, rng } from '../lib/pencil'

const p = withDefaults(defineProps<{
  value: string
  /** cadrage du dessin, pour les glyphes qui n'occupent qu'une partie du cadre */
  box?: string
  /** ligne de base du glyphe dans le cadre de 420 × 300 */
  base?: number
}>(), { box: '0 0 420 300', base: 262 })

const W = 420
const H = 300
const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
const ids = { g: `g${uid}`, c: `c${uid}`, d: `d${uid}` }

const hatches = computed(() => hatch(0, 0, W, H, -58, 5.2, rng(`num-${p.value}`)))
</script>

<template>
  <svg class="pencil-num" :viewBox="box" aria-hidden="true">
    <defs>
      <g v-html="graphiteFilter(ids.g, 5, 1.2)" />
      <filter :id="ids.d" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="w" />
        <feDisplacementMap in="SourceGraphic" in2="w" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <clipPath :id="ids.c">
        <text :x="W / 2" :y="base" text-anchor="middle" class="pn-glyph">{{ value }}</text>
      </clipPath>
    </defs>

    <!-- la version gommée -->
    <text :x="W / 2 - 14" :y="base + 6" text-anchor="middle" class="pn-glyph pn-erased"
          transform="rotate(-3 210 150)" :filter="`url(#${ids.d})`">{{ value }}</text>

    <g :clip-path="`url(#${ids.c})`" :filter="`url(#${ids.g})`" fill="none" stroke-linecap="round">
      <path v-for="(s, i) in hatches" :key="i" :d="s.d" class="pn-hatch" :stroke-opacity="s.o" />
    </g>
    <g :filter="`url(#${ids.d})`">
      <text :x="W / 2" :y="base" text-anchor="middle" class="pn-glyph pn-line">{{ value }}</text>
      <text :x="W / 2 + 1.4" :y="base - 0.8" text-anchor="middle" class="pn-glyph pn-line pn-line-2">{{ value }}</text>
    </g>
  </svg>
</template>
