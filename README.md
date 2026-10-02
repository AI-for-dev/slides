# IA4Dev 2026 - Slides

Supports de l'atelier (ANF, octobre 2026), construits avec
[Slidev](https://sli.dev).

- Jour 1 : <https://ai-for-dev.github.io/slides/>
- Jour 2 : <https://ai-for-dev.github.io/slides/jour2/>

## Publication

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit
les decks et les publie sur GitHub Pages (source : GitHub Actions). Le jour 2
sort dans `dist/jour2/` et utilise `routerMode: hash`, parce que le
`404.html` servi par GitHub Pages est celui du jour 1.

## Lancer

```bash
npm install
npm run dev        # présentation live sur http://localhost:3030
npm run build      # site statique dans dist/
npm run export     # Jour1.pdf
npm run export:png # une image par slide dans export-png/
```

Chaque commande a sa variante pour le jour 2 : `dev:jour2`, `build:jour2`,
`export:jour2`, `export:png:jour2`.

## Organisation

```
slides.md                 jour 1
jour2.md                  jour 2 : couverture et plan, puis un import par partie
pages/jour2/              une partie du jour 2 par fichier
public/images/            les figures, logos et avatars
theme/                    le thème maison
  styles/tokens.css       palette, typographie, géométrie
  styles/base.css         éléments de base (titres, listes, liens)
  styles/components.css   vocabulaire visuel (card, tag, figure, num…)
  styles/blocks.css       compositions propres au deck
  styles/layouts.css      cover / section / quote / statement / default
  styles/mdc.css          colle entre le markdown et les blocs
  layouts/*.vue           les cinq gabarits de slide
  components/*.vue        les briques utilisées dans slides.md
archive-original-jour1/   trace de la version d'origine
```

## Écrire une slide

Une partie importée avec `src:` est un fichier markdown ordinaire, sans en-tête
de deck.

Le contenu est du markdown. La mise en forme passe par des composants, avec la
syntaxe MDC : `::Nom` … `::` pour un bloc, `:Nom[texte]` pour de l'inline, et
`{prop=valeur .classe}` pour les options.

```markdown
---
section: Partie 4 · Les outils      # alimente le pied de page
---

# Titre de la slide :Hint[note alignée à droite]

::::Cols{cols=2 gap=6 fill}
:::Card{eyebrow="Un sur-titre"}
- une liste
- **du gras**, des [liens](https://sli.dev), du `code`
:::
:::Card{variant=soft center}
Un paragraphe.
:::
::::

::Takeaway
Ce qu'il faut retenir.
::
```

### Mise en page

| Composant | Rôle |
| --- | --- |
| `Cols` | grille ; `cols` (nombre ou template CSS), `gap`, `align`, `content`, `fill` |
| `Cell` | cellule qui déborde sur plusieurs colonnes (`span`) ou prend toute la hauteur (`fill`) |
| `Stack` | pile verticale ; `gap`, `fill`, `center` |
| `Rule` | filet horizontal |

### Contenu

| Composant | Rôle |
| --- | --- |
| `Card` | carte ; `variant` (plain/soft/accent/teal), `eyebrow`, `tone`, `badge`, `title`, `size`, `center`, `fill` |
| `Takeaway` | encadré « ce qu'il faut retenir » |
| `Note` | ligne de commentaire discrète ; `tag`, `tone`, `tight` |
| `Lead` | chapeau sous le titre |
| `Detail` | sous-ligne petite et grise |
| `Tag` | étiquette inline ; `tone`, `code` |
| `Eyebrow` | sur-titre isolé ; `tone` |
| `Pull` | exergue en serif ; `size` |
| `Hint` | note à droite du titre ; `prefix`, `href` |
| `Ord` | numéro romain devant un titre |
| `Fig` | figure encadrée ; `src`, `caption`, `href`, `frame`, `contain` |
| `Added` | ajout des auteurs dans une citation (les crochets viennent du CSS) |

### Blocs du deck

| Composant | Slide |
| --- | --- |
| `SectionHead`, `Agenda` | slides de section ; `Agenda` prend une liste markdown, `numbering=roman` pour I/II/III |
| `Definition`, `Def` | les trois définitions de la partie 3 |
| `Speaker` | « D'où parlons-nous ? » |
| `Act` | programme de l'atelier |
| `Criterion` | les quatre filtres « quels modèles » |
| `Item` | ligne pastille + titre + `Detail` ; `variant` = goal / role / adv |
| `Bullet` | ligne encadrée avec pastille ou étiquette |
| `Surprises`, `Surprise` | ce qui surprend dans Pi et l'extension qui répond |
| `Choice` | les options pour l'IDE |
| `Step` | les six étapes du cycle de maintenance |
| `Chips`, `Musts`, `Specs` | listes markdown stylées (pastilles, exigences, paires clé/valeur) |
| `Quote` | corps d'une slide `layout: quote` |
| `CoverTitle`, `LogoBar`, `Author`, `CoverMeta` | couverture et clôture |
| `EraTimeline`, `AutonomyLadder`, `HarnessMap` | les trois diagrammes du jour 1 |
| `PiSequence` | la séquence d'une requête avec lecture de fichier (jour 2) |

Les classes `.code-sm` et `.code-xs` posées sur un bloc (`:::Cell{.code-sm}`)
réduisent les blocs de code qu'il contient.

### Pied de page

Le pied de page affiche le `section` de la slide, sinon
`themeConfig.footer` de l'en-tête du deck.

Chaque composant émet la classe CSS qui porte son nom (`Card` → `.card`,
`Criterion` → `.criterion`…) : pour changer une apparence, chercher la classe
dans `theme/styles/`.

## Pièges MDC à connaître

- **Le contenu d'un composant inline est du texte brut.** `:Detail[du **gras**]`
  affiche les astérisques. Dès qu'il y a du markdown, passer en bloc :
  `::Detail` … `::`.
- **Pas de `##` dans un bloc `::`** : le parseur le prend pour des paramètres.
  Les sous-titres passent par une prop (`SectionHead{sub="…"}`).
- **Imbrication** : le bloc parent prend un deux-points de plus que ses enfants
  (`::::Cols` > `:::Card` > `::Detail`).
- **Noms de composants** : MDC passe le nom en minuscules, donc tout nom qui
  existe en HTML ou en SVG (`col`, `sub`, `param`, `option`, `meta`, `filter`…)
  serait rendu comme balise native. D'où `Cell`, `Detail`, `Spec`, `Choice`,
  `CoverMeta`, `Criterion`.
- **Le titre de slide est une rangée flex** : ne pas y mettre d'autre balise
  inline que `:Ord[]` et `:Hint[]`.
- **Un bloc fermé par cinq deux-points ou plus avale ce qui le suit** dans la
  slide : le contenu placé après `:::::` n'est pas rendu. Fermer ces blocs en
  fin de slide, ou réduire la profondeur (un bloc dont les enfants ont deux
  deux-points n'a besoin que de trois).
- **`:-)` est lu comme un composant inline** : l'écrire dans du HTML
  (`<span class="mono">:-)</span>`) ou dans une prop.

## Conventions

- Schéma de couleurs **clair uniquement** : toutes les figures du deck sont des
  captures sur fond clair, un thème sombre casserait le système visuel.
- Un seul accent (`--accent`, orange braise) plus un appui (`--teal`).
- Espaces insécables devant `: ; ! ?` et dans les guillemets.
