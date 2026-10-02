---
theme: ./theme
title: Acte 2, reconstruire brique par brique - IA4Dev 2026
info: |
  IA4Dev 2026 - ANF jour 3, octobre 2026
  Max Beligné (PUD-GA / MSH Alpes / UGA) · Loïc Gouarin (CMAP / CNRS / École polytechnique)
author: Max Beligné, Loïc Gouarin
colorSchema: light
themeConfig:
  footer: IA4Dev 2026 · ANF jour 3
transition: fade
# Publié sous /slides/jour3/ : le 404.html de GitHub Pages est celui du jour 1,
# donc les liens profonds passent par le hash.
routerMode: hash
mdc: true
editor: false
drawings:
  persist: false
fonts:
  sans: Geist
  mono: Geist Mono
  serif: Instrument Serif
  provider: none
layout: cover
---

:::Cols{cols="1fr auto" align=start}
::CoverMeta
IA4Dev 2026 · ANF jour 3
::
::LogoBar{size=46}
::
:::

::CoverTitle{sub="Le harnais, une brique après l’autre"}
# Acte 2<br />Reconstruire
::

:::Cols{cols="1fr auto" align=end}
::Stack{gap=2}
:Rule{width="210px"}

:Author{name="Max Beligné" org="PUD-GA / MSH Alpes / UGA"}
:Author{name="Loïc Gouarin" org="CMAP / CNRS / École polytechnique"}
::
::CoverMeta
Octobre 2026
::
:::

---
section: Acte 2 · Reconstruire
---

# Le programme de l’acte 2 :Hint[Un module par brique]

::::Stack{fill gap=2.5}
::Act{n=0 title="Le bac à sable" tag="Avant tout"}
Isoler l’agent de votre machine, pour qu’il tourne sans surveillance
::
::Act{n=1 title="Le contexte et la fenêtre"}
Ce qu’on y met, ce que ça coûte, et comment le mesurer
::
::Act{n=2 title="Les compétences"}
Une procédure de travail en markdown, et ce qu’elle déplace
::
::Act{n=3 title="La délégation"}
Découper le travail en sous-agents, et tenir la boucle à la main
::
::Act{n=4 title="Les workflows"}
La même boucle, écrite dans un fichier que Pi déroule seul
::
::::

---
section: Acte 2 · Reconstruire
---

# Chaque module en trois temps

:::::Stack{fill center gap=6}
::::Cols{cols=3 gap=5}
::Criterion{n=1 title="Comprendre"}
On part du besoin : à quoi sert la brique, pourquoi elle est indispensable, comment un harnais réel la réalise.
::
::Criterion{n=2 title="Reconstruire"}
On écrit l’équivalent minimal sur Pi, à la main. Le code illustre, il n’est pas la leçon.
::
::Criterion{n=3 title="Généraliser"}
On dégage le principe indépendant de l’outil. C’est le seul temps qui ne périme pas.
::
::::

::::Cols{cols=2 gap=5}
::Note{tag="En salle"}
Tient dans la séance et suffit à comprendre les enjeux du module.
::
::Note{tag="En autonomie"}
Approfondit, et se refait seul, plus tard, sur votre propre dépôt.
::
::::
:::::

---
section: Acte 2 · Reconstruire
---

# NÉON, le terrain des expériences :Hint[github.com/AI-for-dev/neon]{href="https://github.com/AI-for-dev/neon"}

::::Cols{cols=5 gap=7 fill align=center}
:::Cell{span=3}
::Matrix{size=md left first="2.6rem"}
| # | type | titre |
| --- | --- | --- |
| **1** | bug | La balle traverse une brique à grande vitesse |
| **2** | performance | La collision scanne toutes les briques à chaque frame, code mêlé au rendu |
| 3 | fonctionnalité | Mode nuit |
| 4 | fonctionnalité | Import CSV d’un tableau de scores |
| 5 | dette | La logique de score et de combo n’est pas testée |
| 6 | dette | Couleurs en dur au lieu de la palette |
::
:::
:::Cell{span=2}
::::Stack{gap=3}
::Card{variant=accent eyebrow="Issue #1" size=sm}
Le fil des modules **contexte** et **compétences** : on mesure ce que chaque levier change sur la correction.
::
::Card{variant=teal eyebrow="Issue #2" tone=teal size=sm}
Le fil des modules **délégation** et **workflows** : on découpe le ticket en rôles, puis on automatise la boucle.
::
::::
:::
::::

::Note{.mt-4}
Toujours le même cadre : seuls `game/neon.js` et `game/neon.test.js` changent, et `npm test` finit vert.
::

---
src: ./pages/jour3/act2-sandbox.md
---

---
src: ./pages/jour3/act2-contexte.md
---

---
src: ./pages/jour3/act2-skill.md
---

---
src: ./pages/jour3/act2-delegation.md
---

---
src: ./pages/jour3/act2-workflows.md
---

---
layout: statement
---

:Eyebrow[À suivre]{.mb-6}

# À demain !

<p class="muted mt-6" style="font-size:0.95rem">
Le détail de chaque module, avec ses exercices et ses mesures :<br />
<a href="https://github.com/AI-for-dev/hands-on-harness/">github.com/AI-for-dev/hands-on-harness</a>
</p>

::LogoBar{size=40 dark .mt-10}
::
