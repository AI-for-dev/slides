/**
 * Traits au crayon.
 *
 * Toutes les formes du thème sont tracées ici : des polylignes un peu
 * tremblées, qui dépassent légèrement à leurs extrémités et que l'on repasse
 * deux fois, comme une main qui hésite. Le hasard est seedé, donc une même
 * forme donne toujours le même trait (écran, PDF et PNG identiques).
 *
 * Les fonctions renvoient des attributs `d` de chemins SVG ; c'est au
 * composant appelant de les peindre, avec le filtre `graphite` pour le grain.
 */

export type Pt = [number, number]

export interface Stroke {
  d: string
  /** épaisseur relative (1 = trait principal) */
  w: number
  /** opacité relative */
  o: number
}

/** Générateur pseudo-aléatoire déterministe (mulberry32). */
export function rng(seed: number | string) {
  let s = typeof seed === 'number' ? seed : hash(seed)
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const f = (n: number) => Math.round(n * 100) / 100

/** Chemin lissé passant par les points (milieux reliés par des quadratiques). */
export function smooth(pts: Pt[]): string {
  if (pts.length < 3) return `M${pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L')}`
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i]
    const mx = (x + pts[i + 1][0]) / 2
    const my = (y + pts[i + 1][1]) / 2
    d += ` Q${f(x)} ${f(y)} ${f(mx)} ${f(my)}`
  }
  const last = pts[pts.length - 1]
  return `${d} L${f(last[0])} ${f(last[1])}`
}

export interface LineOpts {
  /** amplitude du tremblement, en px */
  wobble?: number
  /** flèche de la courbure d'ensemble, en px (signe aléatoire) */
  bow?: number
  /** dépassement aux extrémités, en px */
  over?: number
  /** nombre de passages */
  passes?: number
}

/** Un trait droit tiré à main levée de a vers b. */
export function line(a: Pt, b: Pt, rand: () => number, o: LineOpts = {}): Stroke[] {
  const { wobble = 0.6, bow = 1.2, over = 2, passes = 2 } = o
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const nx = -uy
  const ny = ux
  const n = Math.max(3, Math.min(14, Math.round(len / 28)))
  const out: Stroke[] = []
  for (let p = 0; p < passes; p++) {
    const sBow = (rand() - 0.5) * 2 * bow
    const o0 = -over * (0.3 + rand() * 0.9)
    const o1 = over * (0.3 + rand() * 0.9)
    const shift = (rand() - 0.5) * (p === 0 ? 0.4 : 1.6)
    const pts: Pt[] = []
    for (let i = 0; i <= n; i++) {
      const t = i / n
      const along = o0 + t * (len + o1 - o0)
      const off = shift + sBow * Math.sin(Math.PI * t) + (rand() - 0.5) * 2 * wobble
      pts.push([a[0] + ux * along + nx * off, a[1] + uy * along + ny * off])
    }
    out.push({ d: smooth(pts), w: p === 0 ? 1 : 0.7, o: p === 0 ? 1 : 0.55 })
  }
  return out
}

/** Une ligne brisée (plusieurs segments tracés d'un seul geste). */
export function polyline(pts: Pt[], rand: () => number, o: LineOpts = {}): Stroke[] {
  const { wobble = 0.6, passes = 2 } = o
  const out: Stroke[] = []
  for (let p = 0; p < passes; p++) {
    const dense: Pt[] = []
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i]
      const [bx, by] = pts[i + 1]
      const len = Math.hypot(bx - ax, by - ay)
      const n = Math.max(2, Math.round(len / 26))
      for (let k = 0; k < n; k++) {
        const t = k / n
        dense.push([
          ax + (bx - ax) * t + (rand() - 0.5) * 2 * wobble,
          ay + (by - ay) * t + (rand() - 0.5) * 2 * wobble,
        ])
      }
    }
    const end = pts[pts.length - 1]
    dense.push([end[0] + (rand() - 0.5) * wobble, end[1] + (rand() - 0.5) * wobble])
    out.push({ d: smooth(dense), w: p === 0 ? 1 : 0.7, o: p === 0 ? 1 : 0.5 })
  }
  return out
}

/** Rectangle : quatre traits indépendants qui se croisent aux coins. */
export function rect(x: number, y: number, w: number, h: number, rand: () => number, o: LineOpts = {}): Stroke[] {
  const opts = { over: 3, bow: 1.4, passes: 1, ...o }
  const j = () => (rand() - 0.5) * 1.6
  const tl: Pt = [x + j(), y + j()]
  const tr: Pt = [x + w + j(), y + j()]
  const br: Pt = [x + w + j(), y + h + j()]
  const bl: Pt = [x + j(), y + h + j()]
  return [
    ...line(tl, tr, rand, opts),
    ...line(tr, br, rand, opts),
    ...line(br, bl, rand, opts),
    ...line(bl, tl, rand, opts),
  ]
}

/** Ellipse tracée d'un geste : la boucle ne se referme pas tout à fait. */
export function ellipse(cx: number, cy: number, rx: number, ry: number, rand: () => number, o: { passes?: number; wobble?: number } = {}): Stroke[] {
  const { passes = 2, wobble = 0.05 } = o
  const out: Stroke[] = []
  for (let p = 0; p < passes; p++) {
    const start = rand() * Math.PI * 2
    const sweep = Math.PI * 2 * (1.04 + rand() * 0.1)
    const n = 28
    const tilt = (rand() - 0.5) * 0.25
    const pts: Pt[] = []
    for (let i = 0; i <= n; i++) {
      const t = start + (sweep * i) / n
      const k = 1 + (rand() - 0.5) * 2 * wobble + (i / n) * 0.05
      const ex = Math.cos(t) * rx * k
      const ey = Math.sin(t) * ry * k
      pts.push([cx + ex * Math.cos(tilt) - ey * Math.sin(tilt), cy + ex * Math.sin(tilt) + ey * Math.cos(tilt)])
    }
    out.push({ d: smooth(pts), w: p === 0 ? 1 : 0.7, o: p === 0 ? 1 : 0.5 })
  }
  return out
}

/**
 * Hachures parallèles couvrant une boîte, à l'angle donné (degrés).
 * Chaque hachure est un trait court et léger ; on les découpe ensuite avec
 * un `clipPath` (texte, forme).
 */
export function hatch(x: number, y: number, w: number, h: number, angle: number, gap: number, rand: () => number): Stroke[] {
  const a = (angle * Math.PI) / 180
  const ux = Math.cos(a)
  const uy = Math.sin(a)
  const nx = -uy
  const ny = ux
  const cx = x + w / 2
  const cy = y + h / 2
  const R = Math.hypot(w, h) / 2
  const out: Stroke[] = []
  for (let s = -R; s <= R; s += gap * (0.8 + rand() * 0.4)) {
    const px = cx + nx * s
    const py = cy + ny * s
    const l0 = -R - rand() * 6
    const l1 = R + rand() * 6
    const seg = line([px + ux * l0, py + uy * l0], [px + ux * l1, py + uy * l1], rand, { wobble: 0.5, bow: 1.5, over: 0, passes: 1 })
    out.push({ ...seg[0], o: 0.55 + rand() * 0.45 })
  }
  return out
}

/** Pointe de flèche ouverte, à l'extrémité `tip`, orientée selon `from → tip`. */
export function arrowHead(from: Pt, tip: Pt, size: number, rand: () => number): Stroke[] {
  const a = Math.atan2(tip[1] - from[1], tip[0] - from[0])
  const s1 = a + Math.PI - 0.45 + (rand() - 0.5) * 0.12
  const s2 = a + Math.PI + 0.45 + (rand() - 0.5) * 0.12
  const p1: Pt = [tip[0] + Math.cos(s1) * size, tip[1] + Math.sin(s1) * size]
  const p2: Pt = [tip[0] + Math.cos(s2) * size, tip[1] + Math.sin(s2) * size]
  return [
    ...line(p1, tip, rand, { over: 0.5, bow: 0.4, passes: 1 }),
    ...line(tip, p2, rand, { over: 0.5, bow: 0.4, passes: 1 }),
  ]
}

/** Arc de cercle (angles en degrés, sens trigonométrique écran). */
export function arc(cx: number, cy: number, r: number, a0: number, a1: number, rand: () => number): Stroke[] {
  const n = Math.max(6, Math.round(Math.abs(a1 - a0) / 4))
  const pts: Pt[] = []
  for (let i = 0; i <= n; i++) {
    const t = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180
    const k = r + (rand() - 0.5) * 0.8
    pts.push([cx + Math.cos(t) * k, cy - Math.sin(t) * k])
  }
  return [{ d: smooth(pts), w: 0.8, o: 0.9 }]
}

/**
 * Filtre « graphite » : grain du papier dans le trait et bords légèrement
 * rongés. À poser dans les `<defs>` de chaque SVG qui l'utilise.
 */
export function graphiteFilter(id: string, seed = 3, grain = 1.1, bite = 1.6) {
  return `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
  <feTurbulence type="fractalNoise" baseFrequency="${grain}" numOctaves="2" seed="${seed}" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.8 0 0 0 -0.2" result="g"/>
  <feComposite in="SourceGraphic" in2="g" operator="in" result="t"/>
  <feDisplacementMap in="t" in2="n" scale="${bite}" xChannelSelector="R" yChannelSelector="G"/>
</filter>`
}

/** Sérialise des traits en chemins SVG, pour fabriquer des images en data-URI. */
export function toSvgPaths(strokes: Stroke[], width: number, filter?: string) {
  return strokes
    .map(s => `<path d="${s.d}" stroke-width="${f(width * s.w)}" stroke-opacity="${f(s.o)}"${filter ? ` filter="url(#${filter})"` : ''}/>`)
    .join('')
}
