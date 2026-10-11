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

function svg(w: number, h: number, strokes: Stroke[], width: number, grain = 1.1, view = [0, 0, w, h]) {
  const [vx, vy, vw, vh] = view
  const body = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} ${vy} ${vw} ${vh}" width="${vw}" height="${vh}" preserveAspectRatio="none">`
    + `<defs>${graphiteFilter('g', 7, grain, 1.6, [-0.2 * w, -0.2 * h, 1.4 * w, 1.4 * h])}</defs>`
    + `<g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">${toSvgPaths(strokes, width, 'g')}</g></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(body)}")`
}

// Découpe en 9 d'un cadre de w × h, en coins de c px, écrite comme un masque
// CSS à 8 couches : les coins gardent leur taille, les côtés s'étirent, le
// centre reste vide. C'est ce que fait -webkit-mask-box-image, que Firefox
// ne connaît pas ; un masque multicouche passe partout.
// Les côtés verticaux viennent d'images à part, hautes de `tall` : Firefox
// calcule le grain du filtre dans les unités de l'image, et un morceau de
// 64 unités étiré sur toute la hauteur d'un bloc se hachait en tirets.
function nineSlice(w: number, h: number, strokes: Stroke[], sides: [Stroke[], Stroke[]], tall: number, width: number, c = 28) {
  const piece = (img: string, at: string, size: string) => `${img} ${at} / ${size} no-repeat`
  const cut = (x: number, y: number, pw: number, ph: number) => svg(w, h, strokes, width, 1.1, [x, y, pw, ph])
  const side = (st: Stroke[]) => svg(c, tall, st, width)
  const span = `calc(100% - ${2 * c}px)`
  return [
    piece(cut(0, 0, c, c), '0 0', `${c}px ${c}px`),
    piece(cut(w - c, 0, c, c), '100% 0', `${c}px ${c}px`),
    piece(cut(0, h - c, c, c), '0 100%', `${c}px ${c}px`),
    piece(cut(w - c, h - c, c, c), '100% 100%', `${c}px ${c}px`),
    piece(cut(c, 0, w - 2 * c, c), `${c}px 0`, `${span} ${c}px`),
    piece(cut(c, h - c, w - 2 * c, c), `${c}px 100%`, `${span} ${c}px`),
    piece(side(sides[0]), `0 ${c}px`, `${c}px ${span}`),
    piece(side(sides[1]), `100% ${c}px`, `${c}px ${span}`),
  ].join(', ')
}

const vars: Record<string, string> = {}

// Filet horizontal : étiré en largeur, l'épaisseur ne bouge pas.
for (let i = 1; i <= 3; i++) {
  const r = rng(`rule-${i}`)
  vars[`--pc-rule-${i}`] = svg(1200, 10, line([6, 5], [1194, 5], r, { wobble: 0.35, bow: 1.6, over: 4, passes: 2 }), 1.5)
}

// Cadres découpés en 9 (voir nineSlice), coins de 28 px.
// Les côtés horizontaux sont longs dans l'image (1000 px) et s'adaptent à la
// largeur du bloc. Les côtés verticaux sont tracés parfaitement droits : on
// peut alors les étirer ou les comprimer à n'importe quelle hauteur sans
// bosse (la courbure tassée donnait un trait flou) et sans raccord (des
// morceaux répétés se décalaient d'un pixel en plein écran).
for (let i = 1; i <= 4; i++) {
  const r = rng(`frame-${i}`)
  const j = () => (r() - 0.5) * 1.4
  const [x0, y0, x1, y1] = [9, 9, 991, 111]
  const horiz = { over: 5, bow: 2.2, wobble: 0.5, passes: 1 }
  const vert = { over: 5, bow: 0, wobble: 0, passes: 1 }
  const thin = (st: Stroke) => ({ ...st, w: 1.15 })
  const rs = rng(`frame-side-${i}`)
  const tall = 400
  const xr = x1 - (1000 - 28) // côté droit, dans son morceau de 28 px
  const sides: [Stroke[], Stroke[]] = [
    line([x0, -4], [x0, tall + 4], rs, vert).map(thin),
    line([xr, -4], [xr, tall + 4], rs, vert).map(thin),
  ]
  vars[`--pc-frame-${i}`] = nineSlice(1000, 120, [
    ...line([x0 + j(), y0 + j()], [x1 + j(), y0 + j()], r, horiz),
    ...line([x0 + j(), y1 + j()], [x1 + j(), y1 + j()], r, horiz),
    ...line([x0, y0 + j()], [x0, y1 + j()], r, vert).map(thin),
    ...line([x1, y0 + j()], [x1, y1 + j()], r, vert).map(thin),
  ], sides, tall, 1.35)
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
