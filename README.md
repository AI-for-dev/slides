# IA4Dev 2026 - Slides

Supports de l'atelier (ANF, octobre 2026), construits avec
[Slidev](https://sli.dev).

- Accueil : <https://ai-for-dev.github.io/slides/>
- Jour 1 : <https://ai-for-dev.github.io/slides/jour1/>
- Jour 2 : <https://ai-for-dev.github.io/slides/jour2/>
- Jour 3 : <https://ai-for-dev.github.io/slides/jour3/>
- En anglais : <https://ai-for-dev.github.io/slides/en/>

## Publication

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit
les decks et les publie sur GitHub Pages (source : GitHub Actions). La page
d'accueil (`index.md`) occupe la racine et renvoie vers les trois jours, qui
sortent dans `dist/jour1/`, `dist/jour2/` et `dist/jour3/`. Ils utilisent
`routerMode: hash`, parce que le `404.html` servi par GitHub Pages est celui
de l'accueil. La version anglaise suit le même schéma sous `dist/en/`. La
liste des decks et leurs dossiers sont dans `scripts/build-all.mjs`, que la CI
appelle.

## Lancer

```bash
npm install
npm run dev:index        # page d'accueil sur http://localhost:3030
npm run dev:jour1        # présentation live du jour 1
npm run build            # page d'accueil dans dist/
npm run build:jour1      # jour 1 dans dist/jour1/
npm run export:jour1     # Jour1.pdf
npm run export:png:jour1 # une image par slide dans export-png/
npm run preview          # tout le site, comme en ligne, sur http://localhost:4173/slides/
```

Les commandes du jour 1 existent aussi pour les jours 2 et 3 : `dev:jour2`,
`build:jour2`, `export:jour2`, `export:png:jour2`, et de même avec `jour3`.
Les versions anglaises ajoutent `:en` (`dev:jour1:en`, `build:index:en`…), et
`npm run check:translations` vérifie qu'elles restent alignées sur le français.

`npm run dev:*` ne sert qu'un deck : toute adresse y ramène, donc les liens de
l'accueil et le bouton de langue n'y mènent nulle part (le bouton s'affiche
barré). Pour les essayer, `npm run preview` construit tout le site et le sert
sous `/slides/`, comme GitHub Pages.

## Organisation

```
index.md                  page d'accueil : un lien par jour
*.en.md                   versions anglaises, slide pour slide
jour1.md                  jour 1
jour2.md                  jour 2 : Pi, sandbox, contexte, évaluation et skills
jour3.md                  jour 3 : hooks, délégation, workflows, essaim et Pi Durable
public/images/            les figures, logos et avatars
scripts/                  build-all.mjs (tout le site), preview.mjs (le servir
                          en local), check-translations.mjs (lancé par la CI)
theme/                    le thème maison
  styles/tokens.css       palette, typographie, géométrie
  styles/pencil.ts        les traits au crayon réutilisés par le CSS
  lib/pencil.ts           le tracé à main levée (lignes, cadres, hachures)
  lib/i18n.ts             la langue du deck et les textes des composants
  custom-nav-controls.vue le bouton de langue dans la barre de Slidev
  styles/base.css         éléments de base (titres, listes, liens)
  styles/components.css   vocabulaire visuel (card, tag, figure, num…)
  styles/blocks.css       compositions propres au deck
  styles/layouts.css      cover / home / section / quote / statement / default
  styles/mdc.css          colle entre le markdown et les blocs
  layouts/*.vue           les six gabarits de slide
  components/*.vue        les briques utilisées dans les decks
archive-original-jour1/   trace de la version d'origine
```

## Écrire une slide

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
| `Tag` | étiquette inline ; `tone`, `code`, `href` (étiquette cliquable) |
| `Eyebrow` | sur-titre isolé ; `tone` |
| `Pull` | exergue en serif ; `size` |
| `Hint` | note à droite du titre ; `prefix`, `href` (site externe), `to` (slide du deck, par numéro ou `routeAlias`) |
| `Ord` | numéro romain devant un titre |
| `Fig` | figure encadrée ; `src`, `caption`, `href`, `frame`, `contain` |
| `Added` | ajout des auteurs dans une citation (les crochets viennent du CSS) |

### Blocs du deck

| Composant | Slide |
| --- | --- |
| `SectionHead`, `Agenda` | slides de section ; `Agenda` prend une liste markdown, `numbering=roman` pour I/II/III, `numbering=alpha` pour A/B/C |
| `Definition`, `Def` | les trois définitions de la partie 3 ; `source`, `href` |
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
| `Bascule`, `PencilNumeral` | dessins des gabarits cover, section et statement ; pas besoin de les appeler dans `jour1.md` |
| `PiSequence` | la séquence d'une requête avec lecture de fichier (jour 2) |
| `Matrix` | enveloppe d'un tableau de mesures : lignes serrées, colonnes centrées ; `size`, `first`, `left`. Dans un tableau HTML, `<tr class="is-group"><th colspan="n">Titre</th></tr>` ouvre un bloc de lignes |
| `Score` | taux de réussite `v/of` avec jauge (`of` vaut 20 par défaut) ; `hi` le met en avant |
| `Heatmap` | grilles de comptes côte à côte, une par groupe ; `groups`, `notes`, `rowGroups` × `rowLabels`, `colGroups` × `colLabels`, `values`, `of` (20 par défaut). S'écrit en syntaxe Vue (`<Heatmap :values="[…]" />`) |
| `Effect` | écart en points et son intervalle à 95 % ; `v`, `lo`, `hi`, `max` (60 par défaut). Point plein si l'intervalle exclut zéro |
| `Mark` | verdict inline ✓ ✗ ~ ; `v` = yes / no / part, texte optionnel en contenu |
| `ToolLoop` | la boucle d'appel d'outils entre modèle et harnais (jour 1) |
| `LostInMiddle` | la fenêtre de contexte et la courbe en U de « Lost in the Middle » (jour 1) |
| `ContextStack` | les cinq sources de la fenêtre de contexte (jour 3) |
| `LoopMap` | la boucle explorer → planner → coder → reviewer (jour 3) |
| `Motifs` | les cinq motifs d'un flux de travail (jour 3) |
| `Topologies` | délégation, workflow et essaim : qui parle après qui (jour 3) |
| `DeckLink` | carte de la page d'accueil, tout entière un lien vers un deck |

Les classes `.code-sm` et `.code-xs` posées sur un bloc (`:::Cell{.code-sm}`)
réduisent les blocs de code qu'il contient.

### Pied de page

Le pied de page affiche le `section` de la slide, sinon
`themeConfig.footer` de l'en-tête du deck. `deeper: true` dans l'en-tête de la
slide y ajoute l'étiquette « Pour aller plus loin », pour les slides qu'on
passe vite en salle.

À droite, avant le numéro de slide, viennent les auteurs et la licence, lus
dans l'en-tête du deck :

```yaml
themeConfig:
  authors: Max Beligné · Loïc Gouarin
  license: CC BY-SA 4.0
  licenseUrl: https://creativecommons.org/licenses/by-sa/4.0/deed.fr
```

Sur la couverture, `:License` affiche les pictogrammes Creative Commons de
cette licence, avec un lien vers `licenseUrl`.

Chaque composant émet la classe CSS qui porte son nom (`Card` → `.card`,
`Criterion` → `.criterion`…) : pour changer une apparence, chercher la classe
dans `theme/styles/`.

## Version anglaise

Chaque deck traduit a son fichier `x.en.md` à côté de `x.md`. Le français fait
référence : on modifie d'abord `x.md`, puis on reporte dans `x.en.md`. Les
commentaires de travail (`# V2 : …`) restent dans la version française.

- **Mêmes slides, même ordre, même layout.** Le bouton de langue garde le
  numéro de slide (`#/12` ouvre `#/12` dans l'autre langue). La CI lance
  `scripts/check-translations.mjs` avant le build et bloque la publication si
  une version est décalée.
- **L'en-tête porte la langue et le lien.** `lang: fr` ou `lang: en`, et
  `themeConfig.translation`, le chemin de l'autre version relatif à celle-ci :
  `../en/jour1/` depuis `jour1.md`, `../../jour1/` depuis `jour1.en.md`. Sans
  `translation`, le bouton n'apparaît pas. Un nouveau deck traduit s'ajoute
  aussi à la liste de `scripts/build-all.mjs`.
- **Les composants qui portent du texte le donnent dans les deux langues**, via
  `t({ fr: …, en: … })` de `theme/lib/i18n.ts` (pied de page, schémas comme
  `HarnessMap` ou `ToolLoop`). Un nouveau composant avec du texte en dur suit la
  même règle.
- **Typographie.** Pas d'espace avant `: ; ! ?` en anglais, guillemets “ ”.

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

- Schéma de couleurs **clair ou sombre**, selon le réglage de l'écran
  (`colorSchema: auto`). La palette sombre est dans `tokens.css`, sous
  `html.dark`. Les captures, les logos et les avatars ont été faits pour du
  papier blanc : ils restent sur une plaque claire (`--plate`). Pour une
  surface surélevée qui doit suivre le schéma, utiliser `--white`.
- Deux registres de trait. Ce qui est établi est tiré à la règle (filets nets
  de 1 px). Ce qui change est dessiné au crayon : cadres, soulignés, cercles,
  flèches, générés par `theme/lib/pencil.ts` et exposés en variables CSS
  `--pc-*` par `theme/styles/pencil.ts`. Les traits sont seedés, l'écran, le
  PDF et les PNG sont donc identiques.
- Graphite pour le trait courant, sanguine (`--accent`) pour l'accent, bleu
  (`--blue`) en appui. Les composants appellent encore ce bleu `teal`.
- Une famille par rôle (`--font-*` dans `tokens.css`) : Bricolage Grotesque
  pour tout ce qui nomme (titres de slide et de bloc, chiffres), Lexend pour
  le texte, Atkinson Hyperlegible Mono pour les étiquettes et le code,
  Instrument Serif pour les citations. Un titre ne doit jamais être composé
  dans la police du texte.
- Espaces insécables devant `: ; ! ?` et dans les guillemets.

## Licence

Les slides de Max Beligné et Loïc Gouarin sont publiées sous licence
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.fr) (texte
complet dans `LICENSE`). Les logos partenaires et les figures reprises
d'autres auteurs restent soumis à leurs propres droits.
