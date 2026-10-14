import { defineAppSetup } from '@slidev/types'

// Slidev change de slide avec ces touches sans appeler preventDefault. Dans
// une WKWebView (navigateur intégré de cmux, par exemple), une touche que la
// page ne déclare pas traitée remonte jusqu'à macOS, qui joue le son d'alerte
// à chaque changement de slide.
const NAV_KEYS = new Set([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'])

function isEditable(target: EventTarget | null) {
  return target instanceof HTMLElement
    && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
}

export default defineAppSetup(() => {
  if (typeof window === 'undefined')
    return
  window.addEventListener('keydown', (e) => {
    if (!NAV_KEYS.has(e.key) || e.metaKey || e.ctrlKey || e.altKey || isEditable(e.target))
      return
    e.preventDefault()
  })
})
