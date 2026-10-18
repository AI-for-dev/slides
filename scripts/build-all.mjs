// Construit tout le site comme sur GitHub Pages : l'accueil à la racine, chaque
// deck dans son sous-dossier. Utilisé par la CI et par `npm run preview`.
//
//   node scripts/build-all.mjs /slides/
//
// Chaque build de Slidev vide son dossier de sortie : un dossier parent se
// construit donc avant ceux qu'il contient (l'ordre de la liste).
import { spawnSync } from 'node:child_process'

export const DECKS = [
  ['index.md', ''],
  ['jour1.md', 'jour1/'],
  ['jour2.md', 'jour2/'],
  ['jour3.md', 'jour3/'],
  ['index.en.md', 'en/'],
  ['jour1.en.md', 'en/jour1/'],
  ['jour2.en.md', 'en/jour2/'],
  ['jour3.en.md', 'en/jour3/'],
]

const base = process.argv[2] ?? '/'
if (!base.startsWith('/') || !base.endsWith('/')) {
  console.error(`La base doit commencer et finir par « / » : ${base}`)
  process.exit(1)
}

for (const [entry, sub] of DECKS) {
  console.log(`\n▸ ${entry} → ${base}${sub}`)
  const r = spawnSync('npx', ['slidev', 'build', entry, '--base', base + sub, '--out', `dist/${sub}`], { stdio: 'inherit' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}
