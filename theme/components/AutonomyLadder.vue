<script setup lang="ts">
// Levels 0 → 5 of "how much of the code does the model write".
// Intensity of the bullet grows with the level: the visual reads as a ramp.
const levels = [
  { n: '0', title: 'Suggestion « améliorée »',        desc: 'Ou copier-coller d’extraits de code depuis ChatGPT.' },
  { n: '1', title: 'Le stagiaire en programmation',   desc: 'Génération de code sans importance, soumise à une révision humaine complète.' },
  { n: '2', title: 'Le développeur junior',           desc: 'Programmation en binôme avec le modèle, en continuant de vérifier chaque ligne.' },
  { n: '3', title: 'Le développeur',                  desc: 'La majeure partie du code est générée par l’IA ; vous devenez réviseur de code à temps plein.' },
  { n: '4', title: 'L’orchestrateur',            desc: 'Vous cadrez les besoins et faites évoluer votre harnais pour qu’il devienne plus efficace.' },
  { n: '5', title: 'L’usine logicielle « obscure »', desc: 'Personne ne relit le code : le système fonctionne en autonomie totale.' },
]
</script>

<template>
  <div class="ladder">
    <div class="ladder-rail" />
    <div v-for="(l, i) in levels" :key="l.n" class="ladder-row" :style="{ '--i': i }">
      <div class="ladder-num">{{ l.n }}</div>
      <div class="ladder-bar">
        <div class="ladder-title">{{ l.title }}</div>
        <div class="ladder-desc">{{ l.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style>
.ladder {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-left: 2.7rem;
}

/* Le rail : un seul trait vertical, du gris vers la sanguine. */
.ladder-rail {
  position: absolute;
  left: 0.92rem;
  top: 0.9rem;
  bottom: 0.9rem;
  width: 2px;
  background: linear-gradient(180deg, var(--graphite-2), var(--accent));
  opacity: 0.7;
}

.ladder-row {
  flex: 1;
  position: relative;
  display: flex;
  align-items: stretch;
}

.ladder-num {
  position: absolute;
  left: -2.7rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.85rem;
  height: 1.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 500;
  color: var(--ink);
  background: var(--paper);
  border-radius: 50%;
  --c: color-mix(in srgb, var(--accent) calc(var(--i) * 20%), var(--graphite-2));
}
.ladder-num::before {
  content: '';
  position: absolute;
  inset: -0.18rem;
  background: var(--c);
  -webkit-mask: var(--pc-circle-2) center / 100% 100% no-repeat;
          mask: var(--pc-circle-2) center / 100% 100% no-repeat;
}
.ladder-row:nth-child(odd) .ladder-num::before {
  -webkit-mask-image: var(--pc-circle-3);
          mask-image: var(--pc-circle-3);
}
.ladder-row:nth-child(6) .ladder-num,
.ladder-row:nth-child(7) .ladder-num { color: var(--accent-deep); }

.ladder-bar {
  position: relative;
  flex: 1;
  display: grid;
  grid-template-columns: 16.5rem 1fr;
  align-items: center;
  gap: 1.2rem;
  padding: 0.45rem 1.2rem;
}
/* Un filet au crayon sous chaque niveau, de plus en plus appuyé. */
.ladder-bar::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 8px;
  background: color-mix(in srgb, var(--accent) calc(var(--i) * 18%), var(--graphite-2));
  opacity: calc(0.35 + var(--i) * 0.1);
  -webkit-mask: var(--pc-rule-2) center / 100% 100% no-repeat;
          mask: var(--pc-rule-2) center / 100% 100% no-repeat;
}

.ladder-title {
  font-family: var(--font-title);
  font-size: 1rem;
  font-weight: 640;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.ladder-desc {
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--muted);
}

/* Le dernier niveau : cerné à la sanguine. */
.ladder-row:last-child .ladder-bar::after {
  inset: -3px;
  height: auto;
  opacity: 0.95;
  background: var(--accent);
  -webkit-mask: var(--pc-frame-3);
          mask: var(--pc-frame-3);
}
.ladder-row:last-child .ladder-title { color: var(--accent-deep); }
</style>
