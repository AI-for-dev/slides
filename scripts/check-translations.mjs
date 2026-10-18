// Vérifie que chaque version anglaise (`x.en.md`) a les mêmes slides que sa
// version française (`x.md`) : même nombre, même ordre, même layout. Le bouton
// de langue garde le numéro de slide, un décalage enverrait sur la mauvaise.
// Les slides sont comptées par le parseur de Slidev, comme au build.
import { readdirSync } from 'node:fs'
import { load } from '@slidev/parser/fs'

const root = process.cwd()
const pairs = readdirSync(root)
  .filter(f => f.endsWith('.en.md'))
  .map(en => [en.replace(/\.en\.md$/, '.md'), en])

const layout = (s, i) => s.frontmatter.layout ?? (i === 0 ? 'cover' : 'default')
let failed = false

for (const [fr, en] of pairs) {
  const [a, b] = await Promise.all([load(root, fr), load(root, en)])
  const problems = []
  if (a.slides.length !== b.slides.length)
    problems.push(`${a.slides.length} slides en français, ${b.slides.length} en anglais`)
  const n = Math.min(a.slides.length, b.slides.length)
  for (let i = 0; i < n; i++) {
    const [la, lb] = [layout(a.slides[i], i), layout(b.slides[i], i)]
    if (la !== lb)
      problems.push(`slide ${i + 1} : layout ${la} (« ${a.slides[i].title ?? ''} ») contre ${lb} (« ${b.slides[i].title ?? ''} »)`)
  }
  if (problems.length) {
    failed = true
    console.error(`✗ ${fr} / ${en}`)
    for (const p of problems) console.error(`  ${p}`)
  }
  else {
    const k = a.slides.length
    console.log(`✓ ${fr} / ${en} : ${k} slide${k > 1 ? 's alignées' : ' alignée'}`)
  }
}

if (!pairs.length) console.log('Aucune version anglaise à vérifier.')
process.exit(failed ? 1 : 0)
