---
version: 1
slug: "theme"
primary_target: "theme"
related_targets: ["jour1.md","jour2.md","jour3.md"]
---

## Portée

Le thème Slidev `theme/`, partagé par les trois decks (`jour1.md`, `jour2.md`, `jour3.md`). Mode de visite : Read. Le public suit une présentation projetée, puis la relit en ligne ou en PDF.

## Ce que la surface doit faire

- Public : ingénieurs et chercheurs de l'ESR aux profils mélangés, et les deux formateurs qui écrivent les slides en markdown.
- Tâche : suivre un raisonnement slide après slide, voir clairement quand on change de partie, et retrouver ce qu'il faut retenir.
- Contraintes : lisible de loin et en visio ; aucune animation ; rendu identique à l'écran, en PDF et en PNG ; clair ou sombre selon l'écran ; écrire une slide reste une affaire de markdown et de composants.

## Décisions prises avec Loïc

- Deux séries de cinq thèmes inventés ont été refusées : il veut repartir du thème existant, épuré, beau comme une image fixe.
- Le crayon dit l'incertitude du moment. La bifurcation dit que le désordre augmente jusqu'à la fin de la formation : rien ne doit suggérer une convergence.
- Les cadres restent des traits de crayon. Aucun flou, aucun cran en plein écran.
- Titres et texte doivent se distinguer au premier coup d'œil.
- Aucune mention de l'agent dans les commits ni les PR.

## Direction contract

THESIS : un deck de formation qui dessine au crayon ce qui change et tire à la règle ce qui est établi. Il refuse le gabarit de conférence en cartes arrondies et ombres douces.

OWN-WORLD : papier blanc cassé (#fbfaf7) ou ardoise graphite (#18191c) ; graphite pour le trait courant, sanguine (#b4472a) pour ce qu'il faut retenir, crayon bleu en appui. Cadres, soulignés, cercles et flèches tracés à main levée, seedés, avec grain de mine et coins qui dépassent. Titres en Bricolage Grotesque, texte en Lexend, étiquettes en Atkinson Hyperlegible Mono, citations en Instrument Serif.

STORY : le public comprend que le métier bascule, croit que le chaos ne fait que commencer, et apprend à construire son propre harnais.

FIRST VIEWPORT : couverture. Titre en grand à gauche ; à droite, le diagramme de bifurcation de x ↦ r·x(1−x) : un trait à la règle se dédouble puis finit en nuage de points. Logos en haut à droite, auteurs et date en bas. Chaque slide de partie reprend la bifurcation, un trait de sanguine avance vers le chaos, et un grand numéro hachuré nomme la partie.

FORM : thème existant repris au crayon, troisième proposition après deux séries de cinq mondes refusés. Seed key : 106bbaa0.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Points ouverts

- La première slide de section du jour 1 dit « Acte 1 / 4 », les suivantes « Partie n / 5 ».
- La capture `public/images/jour2/pi-login-cles.jpg` contient des carrés vides (glyphes manquants dans l'image elle-même).
