<script setup lang="ts">
const eras = [
  {
    year: '2022 – 23',
    title: 'Autocomplétion',
    lines: ['Suggestions en ligne plus développées'],
    tone: 'a',
  },
  {
    year: '2023 – 24',
    title: 'Agent',
    lines: ['Interaction par le chat en langage naturel'],
    detail: ['un fichier · prompt engineering', 'multi-fichiers · context engineering'],
    tone: 'b',
  },
  {
    year: '2025',
    title: 'Harnais',
    lines: ['Itération + tools, MCP, skills, …'],
    tone: 'c',
  },
  {
    year: '2026',
    title: 'Harnais',
    lines: ['Tout ce qui entoure le modèle', '+ prise en compte du cycle complet de dev logiciel'],
    tone: 'd',
  },
]
</script>

<template>
  <div class="era-line">
    <template v-for="(e, i) in eras" :key="e.year">
      <div class="era" :class="'tone-' + e.tone">
        <div class="era-year">{{ e.year }}</div>
        <div class="era-card">
          <div class="era-title">{{ e.title }}</div>
          <p v-for="l in e.lines" :key="l" class="era-text">{{ l }}</p>
          <div v-if="e.detail" class="era-sub">
            <div v-for="(s, j) in e.detail" :key="s" class="era-sub-item">
              <span v-if="j > 0" class="era-arrow">↓</span>{{ s }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="i < eras.length - 1" class="era-chev" />
    </template>
  </div>
</template>

<style>
.era-line {
  display: grid;
  grid-template-columns: 1fr 18px 1fr 18px 1fr 18px 1fr;
  align-items: stretch;
  gap: 0.55rem;
}

.era { display: flex; flex-direction: column; }

.era-year {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--tone-ink);
  margin-bottom: 0.55rem;
}

.era-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.85rem 0.9rem 0.95rem;
  --pc: var(--tone);
  --pc-o: 0.85;
}

.era-title {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--tone-ink);
  margin-bottom: 0.45rem;
}

.era-text {
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--ink-soft);
  margin: 0;
}
.era-text + .era-text { margin-top: 0.45rem; }

.era-sub {
  margin-top: auto;
  padding-top: 0.7rem;
  border-top: 1px dashed var(--line-2);
}
.era-sub-item {
  font-size: 0.76rem;
  line-height: 1.35;
  color: var(--muted);
}
.era-sub-item + .era-sub-item { margin-top: 0.25rem; }
.era-arrow {
  display: block;
  font-family: var(--font-mono);
  color: var(--tone);
  line-height: 1;
  margin-bottom: 0.15rem;
}

.era-chev {
  align-self: center;
  justify-self: center;
  width: 18px;
  height: 10px;
  margin-top: 1.4rem;
  font-size: 0;
  background: var(--graphite-2);
  -webkit-mask: var(--pc-arrow) center / 100% 100% no-repeat;
          mask: var(--pc-arrow) center / 100% 100% no-repeat;
}

/* Du gris au rouge : plus on s'approche d'aujourd'hui, plus le trait appuie. */
.era.tone-a { --tone: var(--graphite-2); --tone-ink: var(--muted); }
.era.tone-b { --tone: var(--graphite);   --tone-ink: var(--ink-soft); }
.era.tone-c { --tone: var(--blue);       --tone-ink: var(--blue-deep); }
.era.tone-d { --tone: var(--accent);     --tone-ink: var(--accent-deep); }
</style>
