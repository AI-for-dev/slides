/**
 * Langue du deck, lue dans l'en-tête (`lang: en`). Sans réglage, le deck est
 * en français. Les composants qui portent leur propre texte (schémas, pied de
 * page) le donnent dans les deux langues et prennent celle du deck avec `t`.
 */
import { configs } from '@slidev/client'

export type Lang = 'fr' | 'en'

export const lang: Lang = configs.lang === 'en' ? 'en' : 'fr'

export function t<T>(texts: Record<Lang, T>): T {
  return texts[lang]
}
