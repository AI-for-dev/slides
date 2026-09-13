/**
 * Résout un chemin de `public/` contre la base du site.
 *
 * Vite réécrit les URL absolues qu'il voit dans le template, mais pas celles
 * qui passent par une liaison dynamique (`:src`). Sur GitHub Pages, où le site
 * est servi sous `/slides/`, `/images/x.png` pointerait alors à la racine du
 * domaine. D'où ce préfixe explicite : `/` en dev, `/slides/` une fois publié.
 */
export function asset(path: string): string {
  if (/^(?:[a-z]+:|\/\/|data:)/i.test(path)) return path
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`)
}
