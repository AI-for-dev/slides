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
  gap: 0.35rem;
  padding-left: 2.55rem;
}

.ladder-rail {
  position: absolute;
  left: 0.85rem;
  top: 0.9rem;
  bottom: 0.9rem;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--line-2), var(--accent));
}

.ladder-row {
  flex: 1;
  position: relative;
  display: flex;
  align-items: stretch;
}

.ladder-num {
  position: absolute;
  left: -2.55rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--ink);
  background: var(--paper);
  border: 1.5px solid color-mix(in srgb, var(--accent) calc(18% + var(--i) * 16%), var(--line-2));
  box-shadow: 0 0 0 4px var(--paper);
}
.ladder-row:nth-child(6) .ladder-num,
.ladder-row:nth-child(7) .ladder-num {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.ladder-bar {
  flex: 1;
  display: grid;
  grid-template-columns: 16.5rem 1fr;
  align-items: center;
  gap: 1.2rem;
  padding: 0.5rem 1.2rem;
  border-radius: 10px;
  background: color-mix(in srgb, var(--accent-soft) calc(20% + var(--i) * 16%), var(--surface));
  border: 1px solid color-mix(in srgb, var(--accent-line) calc(25% + var(--i) * 15%), var(--line));
}

.ladder-title {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.ladder-desc {
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--muted);
}

.ladder-row:last-child .ladder-bar {
  background: var(--ink);
  border-color: var(--ink);
}
.ladder-row:last-child .ladder-title { color: var(--paper); }
.ladder-row:last-child .ladder-desc { color: rgba(253, 251, 247, 0.68); }
</style>
