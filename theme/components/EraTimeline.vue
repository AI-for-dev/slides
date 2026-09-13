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
      <div v-if="i < eras.length - 1" class="era-chev">›</div>
    </template>
  </div>
</template>

<style>
.era-line {
  display: grid;
  grid-template-columns: 1fr 14px 1fr 14px 1fr 14px 1fr;
  align-items: stretch;
  gap: 0.55rem;
}

.era { display: flex; flex-direction: column; }

.era-year {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--tone);
  margin-bottom: 0.4rem;
}

.era-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid color-mix(in srgb, var(--tone) 30%, var(--line));
  border-top: 3px solid var(--tone);
  border-radius: 4px 4px 12px 12px;
  background: color-mix(in srgb, var(--tone) 5%, var(--paper));
  padding: 0.8rem 0.85rem 0.9rem;
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
  border-top: 1px dashed color-mix(in srgb, var(--tone) 35%, var(--line));
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
  font-family: var(--font-mono);
  font-size: 1.1rem;
  line-height: 1;
  color: var(--accent);
  opacity: 0.55;
  text-align: center;
  margin-top: 1.4rem;
}

.era.tone-a { --tone: #3d8fd1; --tone-ink: #1f5f93; }
.era.tone-b { --tone: #1f4f96; --tone-ink: #1a3f79; }
.era.tone-c { --tone: #8b3fc0; --tone-ink: #6f2ea0; }
.era.tone-d { --tone: #b03a3a; --tone-ink: #8f2b2b; }
</style>
