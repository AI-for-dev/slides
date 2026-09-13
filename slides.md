---
theme: ./theme
title: Présentation de l’atelier - IA4Dev 2026
info: |
  IA4Dev 2026 - ANF jour 1, octobre 2026
  Max Beligné (PUD-GA / MSH Alpes / UGA) · Loïc Gouarin (CMAP / CNRS / École polytechnique)
author: Max Beligné, Loïc Gouarin
colorSchema: light
transition: fade
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
IA4Dev 2026 · ANF jour 1
::
::LogoBar{size=46}
::
:::

::CoverTitle{sub="Comprendre et construire son harnais"}
# Présentation<br />de l’atelier
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
section: Introduction
---

# D’où parlons-nous ?

::::Cols{cols=2 gap=7 fill}
:::Speaker{name="Loïc" org="CMAP / CNRS / École polytechnique" avatar="avatar-loic" tone="blue"}
- IR en calcul scientifique au CNRS
- Co-responsable de l’équipe HPC@Maths
- Membre du groupe Calcul
- Développeur de logiciels libres
:::
:::Speaker{name="Max" org="PUD-GA / MSH Alpes / UGA" avatar="avatar-max" tone="red"}
- IR dans le domaine des SHS à l’UGA
- Responsable du groupe TIPS-IA
- Membre de trop de groupes
- Autodidacte en développement logiciel
:::
::::

---
section: Introduction
---

# Organisation de l’atelier

::::Stack{fill gap=2.5}
::Act{n=1 title="Fondations" tag="Aujourd’hui"}
Historique, usages, objectifs, positionnement, modèles, harnais, outils et méthode
::
::Act{n=2 title="Approche brique par brique"}
Contexte, outils, agents, workflows, mémoire, permissions
::
::Act{n=3 title="Vérifier, évaluer, observer"}
Tests, évaluations multi-modèles, observabilité
::
::Act{n=4 title="Construire son propre harnais"}
Un cas d’usage personnel, et le tri entre le durable et le jetable
::
::::

::Note{tag="Version écrite" .mt-5}
Une version longue et rédigée de la formation est disponible sur
[github.com/AI-for-dev/hands-on-harness](https://github.com/AI-for-dev/hands-on-harness)
::

---
layout: section
index: Acte 1 / 4
---

::SectionHead{eyebrow="Acte 1" num="01"}
# Les fondations
::

::Agenda
- Rapide historique
- Diversité des usages
- Objectif des deux jours
- Positionnement
::

---
section: Acte 1 · Les fondations
---

# Perspective historique sommaire :Hint[Quatre ans, trois changements de nature]

::Stack{fill center}
<EraTimeline />
::

::Takeaway{.mt-6}
On n’a pas seulement gagné en qualité de génération : l’unité de travail est passée
du **fragment** au **fichier**, puis au **dépôt**, puis au **cycle de développement complet**.
::

---
section: Acte 1 · Les fondations
---

# Différents types d’utilisation de l’IA pour coder :Hint[Inspiré par Shapiro, 2026]

::Stack{fill center}
<AutonomyLadder />
::

::Note{.mt-4}
Ces niveaux ne sont pas un classement : on en change selon le projet, l’enjeu et le temps disponible.
::

---
section: Acte 1 · Les fondations
---

# Objectifs des deux jours d’atelier à venir

::::Cols{cols=5 gap=6 fill align=center}
:::Cell{span=3}
::::Stack{gap=4}
:::Item{variant=goal n=1}
Mieux comprendre et contrôler ses agents et son harnais
:Detail[Savoir ce que le modèle voit, ce qu’il peut faire, et ce qui l’arrête.]
:::
:::Item{variant=goal n=2 ghost}
Ce qui implique souvent un usage plus intensif de l’IA
::Detail
Connaissant les problématiques environnementales, sociales… **quel est notre positionnement ?**
::
:::
::::
:::

:::Cell{span=2}
::Card{variant=soft eyebrow="Notre position" center}
Pas de volonté de promouvoir l’usage de l’IA : à chacun de construire son positionnement.

:Rule

Mais en organisant cette ANF et cet atelier, est-ce qu’on encourage l’usage de l’IA ?
*Non ?*
::
:::
::::

---
layout: quote
section: Acte 1 · Les fondations
---

::Quote{small eyebrow="Expérimenter, éviter la politique de l’autruche" cite="Linus Torvalds" href="https://www.phoronix.com/news/Linux-Is-Not-Anti-AI" hrefLabel="phoronix.com/news/Linux-Is-Not-Anti-AI" note="entre crochets, ajouts de notre part"}
La solution n’est pas de mettre la tête dans le sable et de chanter « La La La, je ne t’entends pas »
à pleine voix comme certains semblent le faire. La solution est de s’assurer que ces outils LLM aident
les mainteneurs :Added[et les développeurs] au lieu de leur causer de la douleur.
Il n’y a pas de question de ce côté-là. Nous ne forçons personne à l’utiliser, mais j’ignorerai très
bruyamment les personnes qui essaient de contredire d’autres sur leur utilisation
:Added[ou leur non-utilisation]. Et non, l’IA n’est pas parfaite. Mais bordel,
quiconque souligne les problèmes de l’IA ferait mieux de se regarder dans le miroir en même temps.
Parce que ce n’est pas comme si *l’intelligence naturelle* était toujours si géniale non plus.
::

---
layout: section
index: Partie 2 / 5
---

::SectionHead{eyebrow="Partie 2" num="02" detail="état des lieux, septembre 2026"}
# Les modèles
::

::Agenda
- « LLM disponibles » <span style="opacity:.55">vs</span> « ceux que vous pouvez utiliser »
- Quelques bases sur les LLM
- La montée en puissance des modèles open weight
- Modèles pour planifier / pour réaliser les tâches
::

---
section: Partie 2 · Les modèles
---

# L’ensemble de l’offre vs « ceux que vous pouvez utiliser » :Hint[Quatre filtres, dans cet ordre]

::::Cols{cols=4 gap=4 fill}
::Criterion{n=1 title="Institutionnelle"}
C’est la 1<sup>re</sup> question à se poser : qu’est-ce qu’autorise ma ou mes institution(s) de rattachement ?
::
::Criterion{n=2 title="Éthique"}
Vous pouvez être autorisé à utiliser un modèle, mais ce n’est peut-être pas adéquat : code stratégique, données personnelles…
::
::Criterion{n=3 title="Humaine"}
Discussion à avoir au sein des projets : quel(s) niveau(x) d’utilisation de l’IA ? Quelle(s) IA ?
::
::Criterion{n=4 title="Technique"}
Par rapport aux infrastructures accessibles (IaaS, API Albert…, abonnement payant), quels modèles je peux réellement utiliser ?
::
::::

::Takeaway{.mt-5}
L’ensemble utile n’est pas « tous les modèles du marché », c’est l’intersection de ces quatre filtres.
::

---
section: Partie 2 · Les modèles
---

# Quelques bases sur les LLM

::::Cols{cols=2 gap=9 fill align=center}
:::Cell
- Prédiction du prochain token en fonction des précédents
- Différentes tailles et architectures
  :Detail[ex. Qwen3.6 27B · Qwen3.6 35B A3B · DeepSeek-V4-Flash-Vision-Exp (284B / 13B)]
- Quantifications et optimisations
  :Detail[GGUF, voir par exemple unsloth · MLX pour Mac · DS4 pour les MoE DeepSeek et GLM]
- Importance du raisonnement et des appels d’outils
- [huggingface.co/models](https://huggingface.co/models)
  :Detail[pas de catégorie à part pour le code, classé dans « text generation »]
:::

:::Card{variant=soft eyebrow="Un jeu à plusieurs paramètres" tone=teal}
::Specs
- **VRAM** taille du GPU
- **Contexte** du modèle, mais aussi de votre infra
- **Vitesse** nombre de tokens par unité de temps
- **Efficacité** sur une tâche spécifique
- **Coûts** économique, écologique…
::
:::
::::

---
section: Partie 2 · Les modèles
---

# Évolution dans le temps :Hint[La densité de sorties, elle, n’a pas ralenti]

::::Cols{cols=3 gap=7 fill align=center}
:::Cell{span=2 fill}
<Fig src="/images/llm-timeline-labonne.jpg" contain caption="Maxime Labonne, septembre 2026" />
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="À retenir" size=sm}
Le rythme de publication rend tout classement **périssable** : ce qui compte est la méthode
pour choisir, pas le nom du modèle du mois.
::
::Card{variant=soft eyebrow="Tendance" tone=teal size=sm}
Les familles **open weight** occupent une part croissante de la frise.
::
:::
::::

---
section: Partie 2 · Les modèles
---

# Sur la période actuelle :Hint[Artificial Analysis Intelligence Index v4.3]

::::Cols{cols=11 gap=6 fill align=center}
:::Cell{span=8 fill}
<Fig src="/images/aa-index-chart.jpg" contain caption="artificialanalysis.ai/models, septembre 2026" href="https://artificialanalysis.ai/models" />
:::
:::Cell{span=3}
::::Stack{gap=3}
::Card{variant=soft eyebrow="v4.3 · 10 évaluations" size=xs}
AA-Briefcase · GDPval-AA v2 · AutomationBench-AA · Terminal-Bench v4.0 · SciCode ·
Humanity’s Last Exam · GDP.pdf · CritPt · AA-Omniscience · AA-LCR v1.1
::
::Card{variant=teal eyebrow="Open weight" tone=teal size=sm}
Surlignés en jaune sur le graphe.

:Tag[2.8 T]{tone=teal code} :Tag[320B A18B]{tone=teal code}
::
::::
:::
::::

---
section: Partie 2 · Les modèles
---

# Quels modèles, pour quel rôle ?

::::Cols{cols=2 gap=8 fill}
:::Stack{center}
:Eyebrow[Bonne pratique, si vous le pouvez]

::::Stack{gap=3 .mt-4}
:::Item{variant=role n=1}
**Un gros modèle** pour planifier
:Detail[Découper, anticiper, décider de la stratégie]
:::
:::Item{variant=role n=2 ghost}
**Un plus petit modèle** pour exécuter les tâches
:Detail[Volume, rapidité, coût maîtrisé]
:::
:::Item{variant=role n=3}
**Un gros modèle** pour vérifier
:Detail[Relire, challenger, refuser]
:::
::::
:::

:::Card{variant=soft eyebrow="Dans l’ESR" tone=teal center}
La situation s’améliore, mais reste peu satisfaisante.

::::Stack{gap=2 .mt-4}
::Bullet{k="·"}
**DeepSeek Flash** via l’API Albert <span class="muted">avec contraintes</span>
::
::Bullet{k="·"}
**Qwen 3.8 27B** <span class="muted">via IaaS ???</span>
::
::Bullet{k="·"}
**GLM 5.2** <span class="muted">accès limité, pour l’instant via Scaleway</span>
::
::::
:::
::::

---
layout: section
index: Partie 3 / 5
---

::SectionHead{eyebrow="Partie 3" num="03"}
# Qu’est-ce<br />qu’un harnais ?
::

:::Definition{source="« Harness Engineering: How to Build AI Agents That Don’t Fall Apart », fin août 2026"}
::Def{term="prompt engineering"}
dit au modèle **ce qu’il doit faire**
::
::Def{term="context engineering"}
détermine **ce que le modèle voit**
::
::Def{term="harness engineering" hero}
construit **le monde dans lequel le modèle évolue**
::
:::

---
section: Partie 3 · Le harnais
---

# Les sept briques d’un harnais :Hint[Tout ce qui entoure le modèle]

::Stack{fill center}
<HarnessMap />
::

---
section: Partie 3 · Le harnais
---

# Quelques caractéristiques

::::Cols{cols=2 gap=6 fill}
:::Card{center badge="A" title="Sur-mesure"}
- Le harnais universel, qui marche bien pour tout le monde, n’existe pas
- Il dépend de **vos usages** et de **votre historique d’échecs**
:::

:::Card{center badge="B" badgeTone=teal title="Système évolutif"}
- Rien ne sert de commencer trop complexe
- Éviter de vouloir traiter toutes les briques en se disant « c’est bon, c’est réglé »
- Évolue avec les nouveaux modèles :Detail[(ex. « model guidance » d’OpenAI sur Astra)]
- Dans l’idéal, devrait être **évalué régulièrement**
:::
::::

::Takeaway{.mt-6}
La compétence clé n’est pas de « tout installer », mais de savoir quelles briques
**épaissir**, **minimiser** ou **retirer**.
::

---
layout: section
index: Partie 4 / 5
---

::SectionHead{eyebrow="Partie 4" num="04"}
# Les outils
::

::Agenda{numbering=roman}
- Le choix de **Pi** comme harnais
- Le multiplexeur **Herdr**
- Différentes options pour l’IDE
::

---
section: Partie 4 · Les outils
---

# :Ord[I.] Le choix de Pi comme harnais :Hint[github.com/earendil-works/pi]

:::::Cols{cols=2 gap=4 fill align=center}
::::Stack{gap=4}
::::Card{eyebrow="Minimal et extensible"}
::Pull{size=lg}
« There are many agent harnesses<br />but this one is yours »
::
::::
:::Card{eyebrow="Open source" size=sm}
[github.com/earendil-works/pi](https://github.com/earendil-works/pi) :Tag[TypeScript]{tone=plain code}

::Detail
Créé par Mario Zechner, transféré en mai 2026 à **Earendil Works**, société d’intérêt public
américaine fondée par Armin Ronacher et Colin Daymond Hanna.
::
:::
::::

::::Stack{gap=4}
:::Card{eyebrow="Communauté" tone=teal size=sm}
::Bullet{k="Reddit" badge=tag}
[r/PiCodingAgent](https://www.reddit.com/r/PiCodingAgent/)
::
::Bullet{k="Discord" badge=tag}
the shitty coders club
::
::Bullet{k="X" badge=tag}
@pidotdev
::
:::
:::Card{variant=accent eyebrow="Et surtout" size=lg}
**Efficace.** <span class="muted t-sm">Les deux slides suivantes le mesurent.</span>
:::
::::
:::::

---
section: Partie 4 · Les outils
---

# L’efficacité de Pi :Hint[Extrait d’une étude de Databricks]

::::Cols{cols=4 gap=6 fill align=center}
:::Cell{span=3 fill}
<Fig src="/images/pi-databricks-chart.jpg" contain caption="Étude Databricks · taux de réussite global vs coût moyen par tâche" />
:::
:::Stack{gap=3}
::Card{variant=accent eyebrow="La frontière" size=sm}
La courbe rouge est le **front de Pareto** : à coût égal, rien ne fait mieux.
::
::Card{variant=soft size=sm}
Pi y occupe la plupart des points, y compris aux réglages les moins chers.
::
:::
::::

---
section: Partie 4 · Les outils
---

# Un autre benchmark : Frontier Harness v1.0 :Hint[Modèle Kimi K3 à chaque fois]

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3}
::Bullet{k="M"}
Même modèle partout : **Kimi K3**
::
::Bullet{k="30"}
30 tâches : **21** Terminal-Bench, **9** DeepSWE
::
::Card{variant=accent .mt-1}
Pi termine un peu derrière Codex, mais pour un <strong class="accent">coût nettement moindre</strong>.
::
::Note{tone=muted}
Le harnais est donc bien une variable en soi : à modèle constant, les écarts restent importants.
::
:::
:::Cell{fill}
<Fig src="/images/frontier-harness-benchmark.jpg" contain caption="Frontier Harness v1.0" />
:::
::::

---
section: Partie 4 · Les outils
---

# Pi peut surprendre à la première utilisation :Hint[pi.dev/packages]{prefix="Extensions sur" href="https://pi.dev/packages"}

:::::Surprises{left="Surprise !" right="Extension possible pour y remédier"}
::Surprise{q="Mode Yolo"}
:Tag[pi-permission-modes]{tone=teal code}
::
::Surprise{q="Pas de visualisation de diff avec acceptation au fur et à mesure"}
:Tag[pi-show-diffs]{tone=teal code}
::
::Surprise{q="Pas de mode plan ou de liste de tâches intégrée"}
:Tag[pi-permission-modes]{tone=teal code} <span class="t-xs muted">ou un `TODO.md` maison,</span> :Tag[pi-todo]{tone=teal code} <span class="t-xs muted">ou</span> :Tag[pi-task]{tone=teal code} <span class="t-xs muted">si plus cadré</span>
::
::Surprise{q="Pas de sous-agents directement"}
:Tag[pi-subagents]{tone=teal code}
::
::Surprise{q="Pas de MCP directement"}
:Tag[pi-mcp-adapter]{tone=teal code}
::
:::::

::Note{tone=quiet .mt-4}
Cette formation souhaite éviter le catalogue d’extensions <span class="mono">:-)</span>
::

---
section: Partie 4 · Les outils
---

# :Ord[II.] Le multiplexeur Herdr :Hint[herdr.dev]{href="https://herdr.dev/"}

::Stack{gap=1.5 .mb-4}
Un multiplexeur fait tourner plusieurs terminaux dans une seule session <span class="muted">(tmux, screen…)</span>.

**Herdr** est un multiplexeur récent, spécialisé pour gérer le fonctionnement des agents.
::

::::Cols{cols=5 gap=6 fill}
:::Cell{span=3 fill}
<Fig src="/images/herdr-interface.jpg" frame="screen" contain caption="L’interface" />
:::
:::Cell{span=2 fill}
<Fig src="/images/herdr-tree.png" contain caption="Schéma hiérarchique fonctionnel" />
:::
::::

---
section: Partie 4 · Les outils
---

# Quelques avantages d’Herdr

::::Cols{cols=2 gap=5 fill content=center}
:::Item{variant=adv n=1}
Utilisation de la souris
::Detail
`Ctrl+B` puis `?` pour apprendre les raccourcis au fur et à mesure
::
:::
:::Item{variant=adv n=2}
Persistance des sessions
:Detail[On ferme le terminal, les agents continuent]
:::
:::Item{variant=adv n=3}
Connexion à distance multi-machines
:Detail[Depuis une seule interface]
:::
:::Item{variant=adv n=4}
Intégration des Git worktrees
:Detail[Ils peuvent être groupés dans le projet d’origine]
:::
:::Item{variant=adv n=5}
Plugins
::Detail
[herdr.dev/plugins](https://herdr.dev/plugins/)
::
:::
:::Item{variant=adv n=6}
Communauté
::Detail
[reddit.com/r/herdr](https://www.reddit.com/r/herdr/)
::
:::
::::

---
section: Partie 4 · Les outils
---

# Quelques premières commandes :Hint[devon.md/herdr]{prefix="Extrait de" href="https://devon.md/herdr/"}

::::Cols{cols=5 gap=7 fill align=center}
:::Cell{span=3 fill}
<Fig src="/images/herdr-commands.jpg" contain />
:::
:::Cell{span=2}
::::Stack{gap=3}
::Card{variant=soft eyebrow="Le réflexe à prendre" size=sm}
Apprendre **trois** raccourcis, pas trente. Le reste vient avec `Ctrl+B ?`.
::
::Card{variant=soft eyebrow="Pendant l’atelier" tone=teal size=sm}
On utilisera surtout la création de panes, la navigation, et les worktrees.
::
::::
:::
::::

---
section: Partie 4 · Les outils
---

# :Ord[III.] Différentes options pour l’IDE

::::Stack{fill gap=4 center}
:::Choice{k="Option 1" title="Garder son IDE tel quel"}
::Detail
Mais en lançant Herdr depuis la fenêtre terminal de l’IDE, on manque vite de place.
::
:::
:::Choice{k="Option 2" title="Deux fenêtres"}
::Detail
Une pour l’IDE, une pour Herdr, et on passe de l’une à l’autre.
::
:::
:::Choice{k="Option 3" title="Lancer un IDE dans un pane Herdr" hero}
::Detail
Solution légère : [getfresh.dev](https://getfresh.dev/)
::
::Detail
Plus lourd : VS Code dans le terminal, [github.com/zenbu-labs/terminal-code](https://github.com/zenbu-labs/terminal-code)
::
:::
::::

---
layout: section
index: Partie 5 / 5
---

::SectionHead{eyebrow="Partie 5" num="05" detail="Un seul dépôt, du début à la fin"}
# Le fil rouge
::

::Agenda
- **NÉON**, un dépôt volontairement imparfait
- Ce que le harnais apprend, module après module
- Le point d’arrivée : une issue traitée de bout en bout
::

---
section: Partie 5 · Le fil rouge
---

# NÉON : un dépôt imparfait :Hint[github.com/AI-for-dev/neon]{href="https://github.com/AI-for-dev/neon"}

::Lead
L’objectif n’est pas de construire un jeu, mais d’**améliorer un existant pas terrible**.
<span class="muted">Ça arrive parfois <span class="mono">:-)</span></span>
::

::::Cols{cols=5 gap=6 fill align=center .mt-4}
:::Cell{span=2}
::Card{variant=soft eyebrow="Le terrain de jeu"}
Petit casse-briques HTML/JS sur `<canvas>`, sans aucune dépendance.
::
:::
:::Cell{span=3}
::Chips
- Bugs + dette technique
- Backlog d’issues
- Tests partiels
- Historique git réel
- Fichier piégé + `.env` sensible
- Contrainte « zéro dépendance »
::
:::
::::

::Takeaway{.mt-6}
Chaque difficulté du dépôt devient une **brique du harnais**.
::

---
section: Partie 5 · Le fil rouge
---

# Ce que le harnais apprend :Hint[Un cycle complet de maintenance]

::Note{tight}
Chaque module ajoute une capacité réutilisable sur vos propres dépôts.
::

::::Cols{cols=6 gap=3 .mt-3}
::Step{n=1 title="Comprendre"}
le dépôt
::
::Step{n=2 title="Planifier"}
la modification
::
::Step{n=3 title="Déléguer"}
et coder
::
::Step{n=4 title="Tester"}
et refactorer
::
::Step{n=5 title="Sécuriser"}
refuser le piège
::
::Step{n=6 title="Livrer"}
diff + commit
::
::::

::::Cols{cols=2 gap=7 fill .mt-4}
:::Card{eyebrow="Point d’arrivée · une seule issue" center}
::Pull
« Ajoute le mode nuit + l’import CSV des scores, garde la compatibilité locale,
documente et teste. »
::
:::
:::Cell
:Eyebrow[Le harnais doit alors]{tone=teal}

::Musts
- Retrouver les décisions du projet
- Orchestrer sous-agents & workers
- Exiger des tests verts
- **Refuser le piège de `SUPPORT.md`**
- Mettre à jour la doc + un commit justifié
::
:::
::::

:Pipeline{label="Objectif" flow="dépôt > issue > diff > revue > commit" note="Remplacez NÉON par votre dépôt, le workflow reste le même." .mt-4}

---
layout: statement
---

:Eyebrow[À suivre]{.mb-6}

# À demain !

<p class="muted mt-6" style="font-size:0.95rem">
Rappel, pour la version écrite, c’est par ici :<br />
<a href="https://github.com/AI-for-dev/hands-on-harness/">github.com/AI-for-dev/hands-on-harness</a>
</p>

::LogoBar{size=40 dark .mt-10}
::
