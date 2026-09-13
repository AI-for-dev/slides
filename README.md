# IA4Dev 2026 - Jour 1

Support de l'atelier (ANF jour 1, octobre 2026), construit avec
[Slidev](https://sli.dev).

## Lancer

```bash
npm install
npm run dev        # présentation live sur http://localhost:3030
npm run build      # site statique dans dist/
npm run export     # Jour1.pdf
npm run export:png # une image par slide dans export-png/
```

## Organisation

```
slides.md                 le contenu des 30 slides
public/images/            les figures, logos et avatars
theme/                    le thème maison
  styles/tokens.css       palette, typographie, géométrie
  styles/base.css         éléments de base (titres, listes, liens)
  styles/components.css   vocabulaire visuel réutilisable (card, tag, figure…)
  styles/blocks.css       compositions propres aux slides
  styles/layouts.css      cover / section / quote / statement / default
  layouts/*.vue           les cinq gabarits de slide
  components/*.vue        les diagrammes (frise, échelle 0-5, carte du harnais)
archive-original-jour1/   trace de la version PowerPoint/PDF d'origine
```

## Conventions

- Schéma de couleurs **clair uniquement** : toutes les figures du deck sont des
  captures sur fond clair, un thème sombre casserait le système visuel.
- Un seul accent (`--accent`, orange braise) plus un appui (`--teal`).
- Les titres de slide sont des `#` markdown ; pour ajouter une note à droite du
  titre, utiliser `.title-row`.
- `section:` dans le frontmatter d'une slide alimente le pied de page.
- Espaces insécables devant `: ; ! ?` et dans les guillemets (typographie
  française).
