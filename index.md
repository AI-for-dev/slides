---
theme: ./theme
title: Comprendre et construire son harnais - IA4Dev 2026
info: |
  IA4Dev 2026 - ANF, octobre 2026
  Max Beligné (PUD-GA / MSH Alpes / UGA) · Loïc Gouarin (CMAP / CNRS / École polytechnique)
author: Max Beligné, Loïc Gouarin
lang: fr
colorSchema: auto
# Logo de l'organisation AI-for-dev (dépôt AI-for-dev/.github, profile/brand).
favicon: /favicon.svg
themeConfig:
  authors: Max Beligné · Loïc Gouarin
  license: CC BY-SA 4.0
  licenseUrl: https://creativecommons.org/licenses/by-sa/4.0/deed.fr
  # La même page en anglais, relative à celle-ci (/slides/).
  translation: en/
# En hash comme les decks : recharger l'accueil anglais (/slides/en/) ne doit
# pas tomber sur le 404.html de la racine.
routerMode: hash
mdc: true
editor: false
drawings:
  persist: false
fonts:
  sans: Lexend Variable
  mono: Atkinson Hyperlegible Mono Variable
  serif: Instrument Serif
  provider: none
layout: home
---

:::Cols{cols="1fr auto" align=start}
::CoverMeta
IA4Dev 2026 · ANF · Octobre 2026
::
::LogoBar{size=40}
::
:::

# Comprendre et construire<br />son harnais

::div{.home-authors}
:Author{name="Max Beligné" org="PUD-GA / MSH Alpes / UGA"}
:Author{name="Loïc Gouarin" org="CMAP / CNRS / École polytechnique"}
::

::::div{.home-decks}
:::DeckLink{href="/jour1/" title="Comprendre le harnais"}
Du modèle à l’agent, ce qu’est un harnais, nos outils et le fil rouge NÉON
:::
:::DeckLink{href="/jour2/" title="Construire brique par brique"}
Pi, la sandbox, le contexte, l’évaluation et les skills
:::
:::DeckLink{href="/jour3/" title="Orchestrer des agents"}
Hooks, délégation, workflows, essaim et Pi Durable
:::
::::

::div{.home-foot}
:License
::
