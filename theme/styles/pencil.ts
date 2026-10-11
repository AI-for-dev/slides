/**
 * Les petits traits au crayon réutilisés par le CSS (filets, cercles, puces,
 * flèches, cadres). Ils sont générés une fois au chargement et exposés comme
 * variables CSS `--pc-*` contenant des images SVG en data-URI.
 *
 * Ces images servent de masques : la couleur vient du `background-color` de
 * l'élément masqué, donc un même trait existe en graphite, sanguine ou bleu.
 */
import { arrowHead, ellipse, graphiteFilter, line, rng, toSvgPaths } from '../lib/pencil'
import type { Stroke } from '../lib/pencil'

function svg(w: number, h: number, strokes: Stroke[], width: number, grain = 1.1) {
  const body = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">`
    + `<defs>${graphiteFilter('g', 7, grain)}</defs>`
    + `<g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">${toSvgPaths(strokes, width, 'g')}</g></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(body)}")`
}

const vars: Record<string, string> = {}

// Filet horizontal : étiré en largeur, l'épaisseur ne bouge pas.
for (let i = 1; i <= 3; i++) {
  const r = rng(`rule-${i}`)
  vars[`--pc-rule-${i}`] = svg(1200, 10, line([6, 5], [1194, 5], r, { wobble: 0.35, bow: 1.6, over: 4, passes: 2 }), 1.5)
}

// Cadres découpés en 9 (mask-box-image), coins de 28 px.
// Les côtés horizontaux sont longs dans l'image (1000 px) et s'adaptent à la
// largeur du bloc. Les côtés verticaux, eux, sont répétés à leur taille réelle
// (`round` en CSS) : on les trace donc droits, sans courbure, pour que les
// morceaux se raccordent. Les comprimer donnait un trait tassé, flou.
for (let i = 1; i <= 4; i++) {
  const r = rng(`frame-${i}`)
  const j = () => (r() - 0.5) * 1.4
  const [x0, y0, x1, y1] = [9, 9, 991, 111]
  const horiz = { over: 5, bow: 2.2, wobble: 0.5, passes: 1 }
  const vert = { over: 5, bow: 0, wobble: 0.22, passes: 1 }
  vars[`--pc-frame-${i}`] = svg(1000, 120, [
    ...line([x0 + j(), y0 + j()], [x1 + j(), y0 + j()], r, horiz),
    ...line([x0 + j(), y1 + j()], [x1 + j(), y1 + j()], r, horiz),
    // à taille réelle, le grain paraît plus clair qu'aux côtés comprimés :
    // on appuie un peu plus le crayon
    ...line([x0, y0 + j()], [x0, y1 + j()], r, vert).map(st => ({ ...st, w: 1.3 })),
    ...line([x1, y0 + j()], [x1, y1 + j()], r, vert).map(st => ({ ...st, w: 1.3 })),
  ], 1.35)
}

// Cercles autour des numéros.
for (let i = 1; i <= 4; i++) {
  const r = rng(`circle-${i}`)
  vars[`--pc-circle-${i}`] = svg(48, 48, ellipse(24, 24, 18.5, 17.5, r, { passes: 2, wobble: 0.04 }), 1.3)
}

// Puce : un petit tiret appuyé.
{
  const r = rng('dash')
  vars['--pc-dash'] = svg(20, 10, line([3, 5.5], [17, 4.5], r, { wobble: 0.2, bow: 0.5, over: 0.5, passes: 2 }), 1.9)
}

// Flèche.
{
  const r = rng('arrow')
  const a: [number, number] = [3, 9]
  const b: [number, number] = [33, 8]
  vars['--pc-arrow'] = svg(38, 18, [...line(a, b, r, { wobble: 0.25, bow: 0.8, over: 0.5, passes: 1 }), ...arrowHead(a, b, 7, r)], 1.5)
}

// Trait vertical de « à retenir ».
{
  const r = rng('stem')
  vars['--pc-stem'] = svg(10, 300, line([5, 4], [5, 296], r, { wobble: 0.35, bow: 1.2, over: 2, passes: 2 }), 2.8)
}

if (typeof document !== 'undefined') {
  const root = document.documentElement
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v)
}
