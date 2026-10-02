<script setup lang="ts">
// Les cinq sources qui remplissent la fenêtre de contexte, dans l'ordre où
// Pi les empile. Les quatre premières restent stables d'un tour à l'autre,
// l'historique grossit à chaque tour.
const layers = [
  { n: 1, title: 'Prompt système', desc: 'rôle, outils, conventions', size: '≈ 550 tokens' },
  { n: 2, title: 'Fichiers de contexte', desc: 'AGENTS.md, CLAUDE.md : home, parents, répertoire courant', size: '' },
  { n: 3, title: 'Descriptions des outils', desc: 'du JSON, une par outil disponible', size: '' },
  { n: 4, title: 'Votre question', desc: 'une ligne dans tout l’empilement', size: '' },
]
</script>

<template>
  <div class="ctx-stack">
    <div v-for="l in layers" :key="l.n" class="ctx-row">
      <span class="ctx-n">{{ l.n }}</span>
      <span class="ctx-text">
        <span class="ctx-title">{{ l.title }}</span>
        <span class="ctx-desc">{{ l.desc }}</span>
      </span>
      <span v-if="l.size" class="ctx-size">{{ l.size }}</span>
    </div>
    <div class="ctx-row is-history">
      <span class="ctx-n">5</span>
      <span class="ctx-text">
        <span class="ctx-title">Historique</span>
        <span class="ctx-desc">réponses du modèle et raisonnement, appels d’outils, sorties d’outils</span>
      </span>
      <span class="ctx-grow"><i /><i /><i /><i /><i /></span>
    </div>
    <div class="ctx-br is-stable"><span>stable d’un tour à l’autre</span></div>
    <div class="ctx-br is-grow"><span>grossit à chaque tour</span></div>
  </div>
</template>

<style>
.ctx-stack {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 9.5rem;
  grid-template-rows: repeat(4, auto) minmax(4.6rem, 1fr);
  column-gap: 1rem;
  row-gap: 0.4rem;
}
.ctx-row { grid-column: 1; }
.ctx-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.45rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--white);
}
.ctx-n {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--teal);
  width: 0.8rem;
  flex: none;
}
.ctx-text { display: flex; flex-direction: column; min-width: 0; }
.ctx-title { font-size: 0.86rem; font-weight: 600; letter-spacing: -0.01em; line-height: 1.3; }
.ctx-desc { font-size: 0.72rem; line-height: 1.35; color: var(--muted); }
.ctx-size {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--teal-deep);
  flex: none;
}
.ctx-row.is-history {
  background: var(--accent-soft);
  border-color: var(--accent-line);
}
.ctx-row.is-history .ctx-n { color: var(--accent); }
.ctx-grow {
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 2.4rem;
  flex: none;
}
.ctx-grow i {
  display: block;
  width: 7px;
  border-radius: 2px;
  background: var(--accent);
}
.ctx-grow i:nth-child(1) { height: 20%; opacity: 0.35; }
.ctx-grow i:nth-child(2) { height: 38%; opacity: 0.5; }
.ctx-grow i:nth-child(3) { height: 56%; opacity: 0.65; }
.ctx-grow i:nth-child(4) { height: 78%; opacity: 0.8; }
.ctx-grow i:nth-child(5) { height: 100%; }

.ctx-br {
  grid-column: 2;
  display: flex;
  align-items: center;
  padding-left: 0.85rem;
  border-left: 2px solid var(--teal);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.4;
  color: var(--teal-deep);
}
.ctx-br.is-stable { grid-row: 1 / span 4; }
.ctx-br.is-grow { grid-row: 5;  border-left-color: var(--accent); color: var(--accent-deep); }
</style>
