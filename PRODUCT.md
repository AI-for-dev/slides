# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Des personnels de l'enseignement supérieur et de la recherche (IR, IE, chercheurs) inscrits à l'ANF IA4Dev 2026. Les profils sont mélangés : calcul scientifique et HPC d'un côté, SHS de l'autre, avec des niveaux de développement très variables. La plupart utilisent déjà l'IA de temps en temps pour coder. Pendant l'atelier, ils suivent une présentation qui alterne avec de la pratique, et ils doivent repartir capables de comprendre puis de monter leur propre harnais d'agent de code.

Les formateurs, Max Beligné (PUD-GA / MSH Alpes / UGA) et Loïc Gouarin (CMAP / CNRS / École polytechnique), sont aussi utilisateurs du deck : ils le présentent et le font évoluer.

## Product Purpose

Le support de présentation de l'atelier « Comprendre et construire son harnais ». Le Jour 1 pose les fondations : historique, usages, objectifs, choix des modèles, définition d'un harnais, outils (Pi, Herdr, IDE) et le fil rouge NÉON. Les jours suivants couvrent l'approche brique par brique, la vérification et l'évaluation, puis la construction d'un harnais personnel.

Le deck est réussi si un public hétérogène suit le raisonnement sans décrocher, retrouve les points clés en relisant après coup, et si les formateurs peuvent écrire de nouvelles slides vite, sans retoucher le CSS.

## Positioning

Une formation faite par des ingénieurs de recherche pour leurs pairs, dans les contraintes de l'ESR : les modèles qu'on peut réellement utiliser, des logiciels libres, peu d'outils mais chacun argumenté. Le deck assume ses choix (Pi comme harnais, Herdr comme multiplexeur) et s'appuie sur un dépôt d'exercice, NÉON.

## Operating Context

- Projeté sur vidéoprojecteur en salle, souvent lu de loin, et présenté en plein écran sur des écrans de tailles variées.
- Partagé en visio pour les participants à distance.
- Publié sur GitHub Pages à chaque push sur `main`, et relu après l'atelier. La racine (<https://ai-for-dev.github.io/slides/>) est une page d'accueil qui renvoie vers les trois jours.
- Exporté en PDF (`npm run export:jour1`, et de même pour les jours 2 et 3) et distribué.
- Une version longue et rédigée existe à part : <https://github.com/AI-for-dev/hands-on-harness>.

## Capabilities and Constraints

- Slidev, contenu en markdown avec syntaxe MDC dans `jour1.md`, thème maison dans `theme/` (tokens, layouts, composants Vue). Le README documente les composants et les pièges MDC.
- Trois decks partagent le thème : `jour1.md` (jour 1), `jour2.md` et `jour3.md` (pages dans `pages/`). Le thème doit rester un système réutilisable, pas une collection de cas particuliers.
- Schéma clair ou sombre selon le réglage de l'écran. Les figures sont des captures sur fond clair : elles gardent une plaque claire en sombre, comme les logos et les avatars.
- Contenu en français, avec espaces insécables devant `: ; ! ?` et dans les guillemets.
- Une version anglaise suit le français slide pour slide (`x.en.md`, publiée sous `/slides/en/`) ; le bouton de langue de la barre Slidev passe de l'une à l'autre sur la même slide. Le français fait référence.
- Polices auto-hébergées via Fontsource (pas de chargement réseau en salle).
- Le rendu doit tenir en projection, en visio, dans un navigateur et en PDF.

## Brand Commitments

- Nom : IA4Dev 2026, ANF jour 1, octobre 2026.
- Logos partenaires dans `public/images/` (UGA, groupe Calcul, DevLog), affichés en couverture.
- Ton : direct et pédagogique, phrases courtes, vouvoiement, avec une pointe d'humour (« Membre de trop de groupes »).

## Evidence on Hand

- Figures réelles dans `public/images/` : index Artificial Analysis, étude Databricks sur Pi, benchmark Frontier Harness, frise LLM de Labonne, captures Herdr.
- Sources citées sur les slides (Shapiro 2026, devon.md, pi.dev, herdr.dev). Toute nouvelle figure ou chiffre doit avoir une source réelle ; ne pas inventer de benchmark.
- `archive-original-jour1/` garde la version d'origine du deck.

## Product Principles

1. Lisible de loin d'abord : une slide doit passer au vidéoprojecteur et en visio avant d'être jolie dans un navigateur.
2. Une idée par slide, avec ce qu'il faut retenir rendu explicite.
3. Un public mixte : expliquer les termes, ne pas supposer une culture HPC ou dev commune.
4. Chaque choix est argumenté et chaque chiffre sourcé.
5. Un thème qui se réutilise : écrire une slide doit rester une affaire de markdown et de composants.
