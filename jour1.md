---
theme: ./theme
title: Présentation de l’atelier - IA4Dev 2026
info: |
  IA4Dev 2026 - ANF jour 1, octobre 2026
  Max Beligné (PUD-GA / MSH Alpes / UGA) · Loïc Gouarin (CMAP / CNRS / École polytechnique)
author: Max Beligné, Loïc Gouarin
colorSchema: auto
themeConfig:
  footer: IA4Dev 2026 · ANF jour 1
mdc: true
editor: false
drawings:
  persist: false
fonts:
  sans: Lexend Variable
  mono: Atkinson Hyperlegible Mono Variable
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

# Qui sommes-nous ?

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
- Membre de la cellule CDGA
- Traitement de données et dev autodidacte
:::
::::

---
section: Introduction
---

# Avant de commencer

:::::Stack{fill center gap=7}
::Lead
Nous ne sommes pas des experts de l’agentique. Nous nous en servons tous les jours et nous essayons de **dompter la bête**.
::

::::Cols{cols=2 gap=6 content=center}
:::Card{variant=soft eyebrow="Ça évolue très vite" center}
Suivre le domaine demande beaucoup de lecture, et pas que de la review de code ;)
:::
:::Card{variant=soft eyebrow="Vrai aujourd’hui" tone=teal center}
Ce que nous vous proposons ici sera probablement différent demain.
:::
::::

::Takeaway
Notre but : vous donner assez d’éléments pour vous forger **votre propre opinion** et façonner votre utilisation.
::
:::::

---
# V2 : programme du jour mis à jour avec le nouveau plan
section: Introduction
---

# Organisation de l’atelier

::::Stack{fill gap=2.5}
::Act{n=1 title="Aujourd’hui"}
Tour d’horizon : positionnement, du modèle à l’agent, harnais, paysage actuel, nos outils, fil rouge
::
::Act{n=2 title="Demain"}
Premiers pas avec Pi, sandbox, contexte, évaluation, skill
::
::Act{n=3 title="Après-demain"}
Hook, délégation, workflow, expérimenter par soi-même, évaluer et discuter
::
::::

::::Stack{gap=1.5 .mt-5}
::Note{tag="Version écrite"}
Une version écrite de la formation est disponible sur
[github.com/AI-for-dev/hands-on-harness](https://github.com/AI-for-dev/hands-on-harness)
::
::Note{tag="Slides"}
Les slides sont disponibles sur
[github.com/AI-for-dev/slides](https://github.com/AI-for-dev/slides)
::
::::

---
layout: section
index: Partie 1 / 6
---

::SectionHead{num="01"}
# Les fondations
::

::Agenda
- Rapide historique
- Diversité des usages
- Objectifs et positionnement
::

---
# V2 : frise alignée sur la page Historique du cours ; usine logicielle en projection (Shapiro, janv. 2026 ; StrongDM, d’après simonwillison.net/2026/Feb/7/software-factory)
section: Partie 1 · Les fondations
---

# Perspective historique sommaire

::Stack{fill center}
<EraTimeline :eras="[
  { year: '2021 - 22', title: 'Complétion', lines: ['Le LLM complète le code à la volée, dans l’éditeur'], tone: 'a' },
  { year: '2022 - 23', title: 'Chat', lines: ['ChatGPT ouvert au grand public', 'Prompt engineering'], tone: 'b' },
  { year: '2023 - 24', title: 'Agent', lines: ['LLM + outils : il agit au lieu de répondre', 'RAG pour la documentation interne'], tone: 'c' },
  { year: 'Fin 2024 - 25', title: 'Harnais', lines: ['MCP (fin 2024), context engineering', 'Un système qui assemble le tout, pour des tâches longues'], tone: 'd' },
  { year: 'Fin 2026 - 27 ?', title: 'Usine logicielle', lines: ['L’humain écrit spécifications et scénarios, des agents codent et valident'], tone: 'd', future: true },
]" />
::

---
section: Partie 1 · Les fondations
---

# Différents types d’utilisation de l’IA pour coder :Hint[Shapiro, 2026]{prefix="Inspiré par" href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/"}

::Stack{fill center}
<AutonomyLadder />
::

---
section: Partie 1 · Les fondations
---

# Objectifs des deux jours d’atelier à venir

::::Cols{cols=5 gap=6 fill align=center}
:::Cell{span=3}
::::Stack{gap=4}
:::Item{variant=goal n=1}
Mieux comprendre et contrôler ses agents et son harnais
:::
:::Item{variant=goal n=2 ghost}
Ce qui implique souvent une utilisation plus intensive de l’IA
::Detail
Connaissant les problématiques (environnementales, sociales…), **quel est notre positionnement ?**
::
:::
::::
:::

:::Cell{span=2}
::Card{variant=soft center}
**De notre côté, pas de volonté de promouvoir l’usage de l’IA.**
À chacun de construire son positionnement.

:Rule

Mais en organisant cette ANF et cet atelier, ça encourage l’usage de l’IA ?
*Non ?*
::
:::
::::

::Note{tag="Ailleurs dans l’ANF" .mt-4}
Les questions juridiques, sociales et environnementales sont traitées par d’autres intervenants. Le cours en donne des références en annexe.
::

---
layout: quote
section: Partie 1 · Les fondations
---

::Quote{small eyebrow="Expérimenter, éviter la politique de l’autruche" cite="Linus Torvalds" href="https://www.phoronix.com/news/Linux-Is-Not-Anti-AI" hrefLabel="phoronix.com/news/Linux-Is-Not-Anti-AI" note="entre crochets, ajouts de notre part"}
La solution n’est pas de mettre la tête dans le sable et de chanter « La La La, je ne t’entends pas »
à pleine voix comme certains semblent le faire. La solution est de s’assurer que ces outils LLM aident
les mainteneurs :Added[et les développeurs] au lieu de leur causer de la douleur.
Il n’y a pas de question de ce côté-là. Nous ne forçons personne à l’utiliser, mais j’ignorerai très
bruyamment les personnes qui essaient de contredire d’autres sur leur utilisation
:Added[ou leur non-utilisation]. Et non, l’IA n’est pas parfaite. Mais bordel,
quiconque souligne les problèmes de l’IA ferait mieux de se regarder dans le miroir en même temps.
Parce que ce n’est pas comme si *l’intelligence naturelle* était toujours si géniale non plus.
::

---
# V2 : nouvelle partie. Ce qu’il faut savoir des modèles pour comprendre un agent ; le reste passe en partie 4 ou en annexe
layout: section
index: Partie 2 / 6
---

::SectionHead{num="02"}
# Du modèle<br />à l’agent
::

::Agenda
- Quelques bases sur les LLM
- Le niveau de raisonnement
- La fenêtre de contexte
- L’appel d’outils, cœur de l’agent
::

---
# V2 : fusion de « Quelques bases » ; le raisonnement et les outils ont leur slide, le MoE passe en annexe
section: Partie 2 · Du modèle à l’agent
---

# Quelques bases sur les LLM

::::Cols{cols=2 gap=9 fill align=center}
:::Cell
- Prédiction du prochain token en fonction des précédents
- Différentes tailles et architectures
  ::Detail
  modèles denses ou mélanges d’experts (MoE), voir l’annexe
  ::
- Les quantifications et optimisations
  ::Detail
  GGUF, voir par exemple [unsloth](https://unsloth.ai/docs/fr/commencer/unsloth-model-catalog) · [MLX](https://korben.info/rapid-mlx-installation-macos.html) pour Mac · [DS4](https://github.com/antirez/ds4) pour les MoE DeepSeek et GLM
  ::
- [huggingface.co/models](https://huggingface.co/models)
  :Detail[pas de catégorie à part pour le code, classé dans « text generation »]
:::

:::Card{variant=soft eyebrow="Un jeu à plusieurs paramètres" tone=teal}
::Specs
- **VRAM** taille du GPU
- **Contexte** du modèle, mais aussi de votre infra
- **Vitesse** nombre de tokens par unité de temps
- **Efficacité** sur une tâche spécifique
- **Coût** économique, écologique…
::
:::
::::

---
section: Partie 2 · Du modèle à l’agent
---

# Le niveau de raisonnement :Hint[Cameron R. Wolfe]{prefix="Demystifying Reasoning Models," href="https://cameronrwolfe.substack.com/p/demystifying-reasoning-models"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Lead
Avant de répondre, le modèle produit une longue chaîne de réflexion intermédiaire. On gagne en qualité en dépensant plus de calcul **au moment de répondre** : le *test-time compute*.
::

::Note{tag="En quelques mois"}
[OpenAI o1](https://openai.com/index/learning-to-reason-with-llms/) en septembre 2024, [DeepSeek-R1](https://arxiv.org/abs/2501.12948) en janvier 2025, Claude 3.7 Sonnet en février 2025
::
:::

:::Stack{gap=3}
::Bullet{k="$"}
Ça coûte des tokens et du temps. La plupart des modèles laissent **régler l’effort**, du mode rapide à la réflexion approfondie.
::
::Bullet{k="↑" accent}
Un planificateur gagne à raisonner longuement.
::
::Bullet{k="↓"}
Un exécutant bien cadré n’en a pas besoin et coûterait cher pour rien.
::
:::
::::

---
section: Partie 2 · Du modèle à l’agent
---

# La fenêtre de contexte :Hint[Liu et al., 2023]{prefix="Lost in the Middle," href="https://arxiv.org/abs/2307.03172"}

:::::Stack{fill gap=6}
<div class="flex-1 min-h-0">
<LostInMiddle />
</div>

::::Cols{cols=2 gap=8 align=center}
:::Stack{gap=2}
::Note{tag="À nuancer"}
Retrouver un fait isolé marche presque parfaitement sur les modèles récents (plus de 99 % au test *needle in a haystack*). Raisonner sur des informations dispersées reste plus difficile.
::
:::

::Takeaway
Remplir la fenêtre ne suffit pas. Ce qui compte, c’est **ce qu’on y met, et où**. Point de départ du travail sur le contexte, demain.
::
::::
:::::

---
section: Partie 2 · Du modèle à l’agent
---

# L’appel d’outils, ou comment un modèle agit

::Lead
Le modèle n’exécute rien lui-même. Il produit une **demande structurée** ; le harnais l’exécute et lui renvoie le résultat.
::

:::::Stack{fill gap=5}
<div class="flex-1 min-h-0">
<ToolLoop />
</div>

::::Cols{cols=2 gap=8 align=center}
:::Stack{gap=1}
:Eyebrow[De la recherche à l’API]{tone=teal}

::Detail
[ReAct](https://arxiv.org/abs/2210.03629) fin 2022 · [Toolformer](https://arxiv.org/abs/2302.04761) début 2023 · [function calling](https://openai.com/index/function-calling-and-other-api-updates/) chez OpenAI en juin 2023 · [outils de Claude](https://www.anthropic.com/news/tool-use-ga) en mai 2024
::
:::

::Takeaway
Cette boucle est le cœur de l’agent. Un harnais est ce qui l’organise.
::
::::
:::::

---
# V2 : la partie s’ouvre sur la définition, puis sur la boucle vue juste avant
layout: section
index: Partie 3 / 6
---

::SectionHead{num="03"}
# Qu’est-ce<br />qu’un harnais ?
::

:::Definition{source="D’après Avi Chawla, « The Anatomy of an Agent Harness », avril 2026" href="https://blog.dailydoseofds.com/p/the-anatomy-of-an-agent-harness"}
::Def{term="prompt engineering"}
façonne **les instructions** données au modèle
::
::Def{term="context engineering"}
décide de **ce que le modèle voit**, et quand
::
::Def{term="harness engineering" hero}
contient les deux et y ajoute **toute l’infrastructure** : outils, état, permissions, vérification
::
:::

---
section: Partie 3 · Le harnais
---

# Un harnais, c’est du logiciel :Hint[Vivek Trivedy]{prefix="The Anatomy of an Agent Harness," href="https://www.langchain.com/blog/the-anatomy-of-an-agent-harness"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=2}
::Bullet{k="cfg" badge=tag size=sm}
Un fichier de configuration : modèles disponibles, permissions accordées
::
::Bullet{k="md" badge=tag size=sm}
Un `AGENTS.md` ou `CLAUDE.md` qui porte les règles du projet
::
::Bullet{k="hooks" badge=tag size=sm}
Des scripts qui interceptent les actions de l’agent
::
::Bullet{k="skills" badge=tag size=sm}
Un répertoire de compétences chargées à la demande
::
::Bullet{k="boucle" badge=tag size=sm}
La boucle agentique : appel au modèle, exécution d’outil, relecture
::
:::

:::Stack{gap=4}
::Card{variant=accent center}
Il se construit, se débogue et se répare **comme n’importe quel logiciel** : des fichiers modifiés, des tests, des commits.
::
::Note{tag="Weng"}
Par rapport à « agent = LLM + mémoire + outils + planification », le harnais ajoute les boucles de travail, l’évaluation, les permissions et l’état qui persiste. <span class="muted">([Lilian Weng](https://lilianweng.github.io/posts/2026-07-04-harness/), juillet 2026)</span>
::
::Note{tag="Chawla"}
Un harnais réduit à un system prompt bien écrit n’en est pas un. <span class="muted">([Avi Chawla](https://blog.dailydoseofds.com/p/the-anatomy-of-an-agent-harness), avril 2026)</span>
::
:::
::::

---
section: Partie 3 · Le harnais
---

# Les sept briques d’un harnais

::Stack{fill center}
<HarnessMap />
::

---
# NOUVEAU V2 : les formats partagés entre harnais (MCP, AGENTS.md, skills)
# Sources : anthropic.com/news/model-context-protocol (25 nov. 2024), anthropic.com/news/skills (16 oct. 2025, standard ouvert le 18 déc. 2025), annonce de l’AAIF par la Linux Foundation (9 déc. 2025), agents.md
section: Partie 3 · Le harnais
---

# Des formats partagés entre harnais

:::::Stack{fill center gap=7}
::::Cols{cols=3 gap=5}
:::Card{eyebrow="Brancher des outils" title="MCP"}
Un protocole pour exposer des outils et des données à un agent, via un serveur : base de données, ticketing, documentation…

::Detail
Publié par [Anthropic](https://www.anthropic.com/news/model-context-protocol) en novembre 2024
::
:::

:::Card{eyebrow="Donner les règles" title="AGENTS.md" tone=teal}
Un fichier Markdown à la racine du dépôt : commandes de build et de test, conventions, pièges connus.

::Detail
Né chez OpenAI Codex, Amp, Jules, Cursor et Factory, voir [agents.md](https://agents.md)
::
:::

:::Card{variant=accent eyebrow="Charger à la demande" title="Skills"}
Un dossier avec un `SKILL.md` et des scripts. L’agent n’en lit que la description, puis le reste quand il en a besoin.

::Detail
[Introduites par Anthropic](https://www.anthropic.com/news/skills) en octobre 2025, standard ouvert depuis décembre, voir [agentskills.io](https://agentskills.io)
::
:::
::::

::Note{tag="Gouvernance"}
Depuis décembre 2025, MCP et AGENTS.md sont confiés à l’[Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), sous l’égide de la Linux Foundation.
::

::Takeaway
Une skill ou un serveur MCP écrits pour un harnais servent dans les autres. Attention : chaque serveur MCP ajoute **ses descriptions d’outils au contexte**, branchez-les avec parcimonie.
::
:::::

---
# NOUVEAU V2 : risques de sécurité propres aux agents
section: Partie 3 · Le harnais
---

# L’injection de prompt :Hint[Simon Willison, juin 2025]{prefix="The lethal trifecta," href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/"}

::Lead
Le modèle ne sépare pas vos instructions du texte qu’il lit. Une issue, une page web ou un fichier du dépôt peuvent contenir des ordres, et l’agent peut les suivre.
::

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=3}
:Eyebrow[Trois ingrédients dangereux ensemble]{tone=accent}

::Bullet{k="1"}
L’accès à des **données privées** : clés, `.env`, code interne
::
::Bullet{k="2"}
L’exposition à du **contenu non fiable** : web, issues, dépendances
::
::Bullet{k="3"}
Un moyen de **communiquer vers l’extérieur** : réseau, `git push`, requête HTTP
::
:::

:::Stack{gap=4}
::Card{variant=accent}
Si les trois sont réunis, une injection peut **exfiltrer vos données**. La parade la plus sûre est de retirer l’un des trois.
::
::Note{tag="En pratique"}
Bac à sable, permissions bornées, réseau filtré. Le dépôt NÉON contient un fichier piégé et un `.env` pour s’y entraîner.
::
:::
::::

---
section: Partie 3 · Le harnais
---

# Quelques caractéristiques :Hint[Addy Osmani]{prefix="Agent Harness Engineering," href="https://addyosmani.com/blog/agent-harness-engineering/"}

::::Stack{gap=4 fill center}
:::Card{badge="A" title="Système évolutif"}
- Rien ne sert de commencer trop complexe !
- Ni de vouloir traiter toutes les briques en se disant « c’est bon, c’est réglé »
- Évolue avec les nouveaux modèles
  ::Detail
  ex. [« model guidance » d’OpenAI sur Astra](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra)
  ::
- Dans l’idéal, doit être **évalué régulièrement**
:::

:::Card{badge="B" badgeTone=teal title="Sur-mesure"}
- Un harnais universel fonctionnant bien pour tout le monde n’existe pas…
- Il dépend de **vos usages** et de **votre historique d’échecs**
:::
::::

::Takeaway{.mt-6}
La compétence clé n’est pas de « tout installer », mais de savoir quelles briques
**épaissir**, **minimiser** ou **retirer**.
::

---
# V2 : nouvelle partie qui regroupe modèles disponibles, harnais, modes de travail et lecture des résultats
layout: section
index: Partie 4 / 6
---

::SectionHead{num="04" detail="octobre 2026"}
# Le paysage<br />aujourd’hui
::

::Agenda
- Les modèles : l’offre et ce que vous pouvez utiliser
- Les harnais et les façons de travailler avec un agent
- Les benchmarks et ce que mesurent les études
::

---
section: Partie 4 · Le paysage
---

# L’ensemble de l’offre vs « ceux que vous pouvez utiliser »

::::Stack{fill center}
:::Cols{cols=4 gap=4}
::Criterion{n=1 title="Contrainte institutionnelle"}
C’est la 1<sup>re</sup> question à se poser ! Qu’est-ce qu’autorise ma ou mes institution(s) de rattachement ?
::
::Criterion{n=2 title="Éthique"}
Vous pouvez être autorisé à utiliser un modèle, mais ce n’est peut-être pas adéquat (code stratégique, données sensibles…)
::
::Criterion{n=3 title="Humaine"}
Discussion à avoir au sein des projets : qu’est-ce qu’on choisit comme niveau(x) d’utilisation de l’IA ? Quelle(s) IA ?
::
::Criterion{n=4 title="Technique"}
Par rapport aux infrastructures auxquelles je peux avoir accès (IlaaS, API Albert…, abonnement payant), quels modèles je peux utiliser ?
::
:::
::::

---
section: Partie 4 · Le paysage
---

# Évolution dans le temps

::Stack{fill}
<Fig src="/images/llm-timeline-labonne.jpg" contain caption="Maxime Labonne, septembre 2026" href="https://maximelabonne.substack.com/p/the-state-of-the-open-frontier" />
::

---
# V2 : tailles corrigées d’après les fiches Hugging Face (GLM-5.3-Flash 320B A18B, DeepSeek V4.1 Flash 552B A16B hors mémoire Engram) et écart chiffré
# À REVOIR : l’image du graphique est coupée à droite (« K2… ») et en basse résolution
section: Partie 4 · Le paysage
---

# Sur la période actuelle :Hint[artificialanalysis.ai, octobre 2026]{prefix="Extrait de" href="https://artificialanalysis.ai/"}

::::Cols{cols="1fr 17rem" gap=5 fill align=center}
:::Cell{fill}
<Fig src="/images/aa-index-chart.jpg" contain />
:::
:::Card{variant=soft eyebrow="Open weight" tone=teal size=sm}
::Specs
- **1T A42B** MiMo-V2.6-Pro
- **753B A40B** GLM-5.3
- **2.8T A104B** Kimi K3
- **320B A18B** GLM-5.3-Flash
- **552B A16B** DeepSeek V4.1 Flash
- **27B** Qwen3.8 27B
::

::Detail
**12 points d’écart** entre le meilleur modèle propriétaire (58) et le meilleur open weight (46) : la différence se voit nettement dans la qualité des réponses.
::
:::
::::

::Note{tag="v4.3 · 10 évaluations" .mt-4}
AA-Briefcase, GDPval-AA v2, AutomationBench-AA, Terminal-Bench v4.0, SciCode,
Humanity’s Last Exam, GDP.pdf, CritPt, AA-Omniscience, AA-LCR v1.1
::

---
# À VÉRIFIER : GLM 5.2 ou 5.3 chez Scaleway ?
section: Partie 4 · Le paysage
---

# Ce que vous pouvez utiliser dans l’ESR

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3}
:Eyebrow[Une bonne pratique en général, si vous pouvez]

:::Item{variant=role n=1}
**Un gros modèle** pour planifier
:::
:::Item{variant=role n=2 ghost}
**Un plus petit modèle** pour exécuter les tâches
:::
:::Item{variant=role n=3}
**Un gros modèle** pour vérifier
:::
:::

:::Card{variant=soft eyebrow="Dans l’ESR" tone=teal}
La situation s’améliore, mais reste pas terrible.

::::Stack{gap=2 .mt-4}
::Bullet{k="·"}
**DeepSeek Flash** via l’API Albert <span class="muted">(avec contrainte)</span>
::
::Bullet{k="·"}
**Qwen 3.8 27B** <span class="muted">(via IlaaS)</span>
::
::Bullet{k="·"}
**GLM 5.2** <span class="muted">(limité et avec problème de cache pour l’instant, via Scaleway)</span>
::
::::
:::
::::

---
section: Partie 4 · Le paysage
---

# Situer un modèle, puis l’essayer

::::Cols{cols=2 gap=8 fill content=center}
:::Card{eyebrow="Situer" title="Le Hub Hugging Face"}
- La **fiche** du modèle : taille, architecture, fenêtre, langues, bancs d’essai, licence
- Son `config.json` : couches, nombre d’experts et d’experts activés
- Des filtres par tâche, taille, licence, et des versions quantifiées (GGUF)
:::

:::Card{eyebrow="Essayer" title="Le même prompt, deux modèles" tone=teal}
- [LMArena](https://lmarena.ai) : côte à côte, sans compte
- [Hugging Face Chat](https://huggingface.co/chat) et [OpenRouter](https://openrouter.ai) : un large catalogue

::Detail
Rejouez **votre** prompt sur un modèle rapide puis sur un modèle de raisonnement pour sentir ce que chacun apporte et ce qu’il coûte.
::
:::
::::

---
# NOUVEAU V2 : les benchmarks qui évaluent un modèle en mode agent et en génie logiciel
# Sources : arxiv.org/abs/2509.16941 (SWE-bench Pro), tbench.ai/news (Terminal-Bench 4.0, 28 août 2026), arxiv.org/abs/2506.07982 (τ²-bench), metr.org (mars 2025)
section: Partie 4 · Le paysage
---

# Évaluer un agent de code : principaux benchmarks

::::Cols{cols=2 gap=6 fill content=center}
:::Card{variant=soft eyebrow="Résolution d’issues" title="SWE-bench Pro" size=sm}
À partir d’un dépôt et d’une issue réelle, l’agent produit un patch, évalué par des tests masqués.

::Detail
[Scale AI](https://arxiv.org/abs/2509.16941), 2025 · 1 865 tâches, 41 dépôts dont 18 propriétaires
::
:::

:::Card{variant=soft eyebrow="Tâches en terminal" title="Terminal-Bench" tone=teal size=sm}
Administration système, traitement de données, entraînement de modèles : la réussite est vérifiée par des tests sur l’état final du conteneur.

::Detail
[Stanford et Laude Institute](https://www.tbench.ai/) · version 4.0, août 2026
::
:::

:::Card{variant=soft eyebrow="Interaction et appel d’outils" title="τ²-bench" tone=teal size=sm}
L’agent dialogue avec un utilisateur simulé qui agit lui aussi sur l’environnement (contrôle partagé).

::Detail
[Sierra](https://arxiv.org/abs/2506.07982), juin 2025 · domaines aérien, commerce, télécom
::
:::

:::Card{variant=soft eyebrow="Tâches longues" title="Horizon de temps" size=sm}
Durée d’exécution, par un humain, des tâches que l’agent réussit avec une probabilité de 50 %.

::Detail
[METR](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/), mars 2025 · doublement en 7 mois environ
::
:::
::::

::Note{tag="Résultats" .mt-4}
Scores par modèle : [BenchLM](https://benchlm.ai/benchmarks), [Epoch AI](https://epoch.ai/benchmarks). Distinguer mesure indépendante et score déclaré.
::

---
section: Partie 4 · Le paysage
---

# Les harnais d’aujourd’hui

:::::Stack{fill center gap=7}
::::Cols{cols=3 gap=5}
:::Card{variant=soft eyebrow="Liés à un fournisseur"}
- **[Claude Code](https://github.com/anthropics/claude-code)**
  :Detail[propriétaire · modèles Claude]
- **[Codex CLI](https://github.com/openai/codex)**
  :Detail[Apache-2.0 · modèles OpenAI]
- **[Gemini CLI](https://github.com/google-gemini/gemini-cli)**
  :Detail[Apache-2.0 · modèles Gemini]
- **[Mistral Vibe](https://github.com/mistralai/mistral-vibe)**
  :Detail[Apache-2.0 · Mistral par défaut]
:::

:::Card{variant=soft eyebrow="Plateformes multi-modèles" tone=teal}
- **[Cursor](https://cursor.com)**
  :Detail[propriétaire · IDE et terminal]
- **[GitHub Copilot](https://github.com/github/copilot-cli)**
  :Detail[propriétaire · IDE et terminal]

::Detail{.mt-4}
Plusieurs fournisseurs de modèles, derrière un abonnement.
::
:::

:::Card{variant=accent eyebrow="Libres, modèles au choix"}
- **[OpenCode](https://github.com/anomalyco/opencode)**
  :Detail[MIT · terminal]
- **[Qwen Code](https://github.com/QwenLM/qwen-code)**
  :Detail[Apache-2.0 · terminal]
- **[Cline](https://github.com/cline/cline)**
  :Detail[Apache-2.0 · extension VS Code]
- **[Pi](https://github.com/earendil-works/pi)**
  :Detail[MIT · terminal, minimal]
:::
::::

::Takeaway
Tous font tourner la même boucle d’appel d’outils. Ce qui les distingue, c’est **le harnais autour** : contexte, outils, permissions, et la liberté de choisir son modèle.
::
:::::

---
# NOUVEAU V2 : où tourne l’agent, de l’éditeur aux agents en arrière-plan
section: Partie 4 · Le paysage
---

# Trois façons de travailler avec un agent

:::::Stack{fill center gap=7}
::::Cols{cols=3 gap=5}
:::Card{variant=soft eyebrow="Dans l’éditeur" title="Vous suivez chaque modification"}
L’agent propose, vous acceptez fichier par fichier.

::Detail
Cursor, Copilot, Cline
::
:::

:::Card{variant=soft eyebrow="Dans le terminal" title="Vous pilotez une session" tone=teal}
L’agent lit le dépôt, lance les commandes et les tests, puis vous relisez le diff.

::Detail
Claude Code, Codex CLI, OpenCode, Pi
::
:::

:::Card{variant=accent eyebrow="En arrière-plan" title="Vous relisez une pull request"}
Vous assignez une issue. L’agent travaille dans un conteneur distant et ouvre une PR.

::Detail
agent de code GitHub Copilot, Codex cloud, Claude Code sur le web, Jules
::
:::
::::

::Takeaway
Plus on va vers la droite, plus on monte sur l’échelle de Shapiro. En arrière-plan, le code et le contexte partent **sur l’infrastructure du fournisseur** : revoir les contraintes institutionnelles.
::
:::::

---
# NOUVEAU V2 : l’étude METR, pour équilibrer les benchmarks
section: Partie 4 · Le paysage
---

# Et sur de vrais développeurs ? :Hint[METR, juillet 2025]{prefix="Étude" href="https://arxiv.org/abs/2507.09089"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Lead
16 développeurs expérimentés, sur **leurs propres dépôts open source**, 246 tâches, chacune tirée au sort : avec ou sans IA.
::

::Note{tag="Outils"}
Cursor avec Claude 3.5 et 3.7 Sonnet, début 2025. Les modèles et les harnais ont beaucoup changé depuis.
::

::Note{tag="Apprendre"}
52 développeurs découvrent une bibliothèque Python : avec un assistant, ils ont 17 % de moins au questionnaire final. <span class="muted">([Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills), janvier 2026)</span>
::
:::

:::Stack{gap=3}
::Bullet{k="+20 %" badge=tag}
gain de temps **estimé** par les développeurs après coup
::
::Bullet{k="-19 %" badge=tag}
temps **mesuré** : ils ont été plus lents avec l’IA
::

::Takeaway{.mt-3}
Le chiffre a vieilli, la leçon non : **le ressenti ne suffit pas**, il faut mesurer.
::
:::
::::

---
layout: section
index: Partie 5 / 6
---

::SectionHead{num="05"}
# Nos choix
::

::Agenda{numbering=roman}
- Le choix de **Pi** comme harnais
- Le multiplexeur **Herdr**
- Différentes options pour l’IDE
::

---
section: Partie 5 · Nos choix
---

# Le choix de Pi comme harnais

:::::Cols{cols=2 gap=4 fill align=center}
::::Stack{gap=4}
::::Card{eyebrow="Minimal et extensible"}
::Pull{size=lg}
« There are many agent harnesses but this one is yours »
::
::::
:::Card{eyebrow="Open source" size=sm}
[github.com/earendil-works/pi](https://github.com/earendil-works/pi) :Tag[TypeScript]{tone=plain code}

::Detail
Créé par [Mario Zechner](https://mariozechner.at/) et transféré en mai 2026 à **Earendil Works**,
*société d’intérêt public américaine fondée par [Armin Ronacher](https://ronacher.eu/) et [Colin Daymond Hanna](https://colin.day/)*.
::
:::
::::

::::Stack{gap=4}
:::Card{eyebrow="Communauté" tone=teal size=sm}
::Bullet{k="Reddit" badge=tag}
[r/PiCodingAgent](https://www.reddit.com/r/PiCodingAgent/)
::
::Bullet{k="Discord" badge=tag}
[the shitty coders club](https://discord.com/invite/3cU7Bz4UPx)
::
::Bullet{k="X" badge=tag}
[@pidotdev](https://x.com/pidotdev)
::
:::
:::Card{variant=accent size=lg}
**Efficace** et **contrôlé**
:::
::::
:::::

---
# V2 : précise que l’étude porte sur des modèles propriétaires
section: Partie 5 · Nos choix
---

# L’efficacité de Pi :Hint[Databricks]{prefix="Extrait d’une étude de" href="https://www.databricks.com/blog/benchmarking-coding-agents-databricks-multi-million-line-codebase"}

::Stack{fill}
<Fig src="/images/pi-databricks-chart.jpg" contain caption="Les meilleurs points utilisent Opus 4.8 et GPT 5.5, des modèles propriétaires que l’ESR n’a pas à disposition" />
::

---
# V2 : ajoute la taille de l’échantillon
section: Partie 5 · Nos choix
---

# Un autre benchmark : Frontier Harness v1.0

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3}
::Bullet{k="M"}
Avec le modèle open weight **Kimi K3** à chaque fois
::
::Bullet{k="30"}
30 tâches : **21** Terminal-Bench, **9** DeepSWE
::
::Card{variant=accent .mt-1}
Pi un peu derrière Codex, mais avec un <strong class="accent">coût moindre</strong>.
::
::Note{tag="Échantillon"}
L’écart avec Codex représente environ deux tâches sur trente.
::
:::
:::Cell{fill}
<Fig src="/images/frontier-harness-benchmark.jpg" contain caption="Frontier Harness v1.0" href="https://runta.com/blog/introducing-frontierharness-eval/" />
:::
::::

---
section: Partie 5 · Nos choix
---

# Pi peut surprendre à la première utilisation :Hint[pi.dev/packages]{prefix="Extensions sur" href="https://pi.dev/packages"}

:::Surprises{left="Surprise !" right="Extension possible pour y remédier"}
::Surprise{q="Mode Yolo"}
:Tag[pi-permission-modes]{tone=teal code href="https://pi.dev/packages/pi-permission-modes"}
::
::Surprise{q="Pas de visualisation de diff avec acceptation au fur et à mesure"}
:Tag[pi-show-diffs]{tone=teal code href="https://pi.dev/packages/pi-show-diffs"}
::
::Surprise{q="Pas de mode plan ou de liste de tâches intégrée"}
<span class="t-xs muted">Présent dans</span> :Tag[pi-permission-modes]{tone=teal code href="https://pi.dev/packages/pi-permission-modes"} <span class="t-xs muted">ou un `TODO.md` maison,</span> :Tag[pi-todo]{tone=teal code href="https://pi.dev/packages/@diegopetrucci/pi-todo"} <span class="t-xs muted">ou</span> :Tag[pi-task]{tone=teal code href="https://pi.dev/packages/@tintinweb/pi-tasks"} <span class="t-xs muted">si plus cadré</span>
::
::Surprise{q="Pas de sous-agents directement"}
:Tag[pi-subagents]{tone=teal code href="https://pi.dev/packages/pi-subagents"}
::
:::

---
section: Partie 5 · Nos choix
---

# Le multiplexeur Herdr :Hint[herdr.dev]{href="https://herdr.dev/"}

::Lead
Un multiplexeur fait tourner plusieurs terminaux dans une seule session <span class="muted">(tmux, cmux, screen…)</span>. **Herdr** est spécialisé dans le suivi des agents.
::

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Cell{fill}
<Fig src="/images/herdr-interface.jpg" frame="screen" contain caption="Interface" />
:::

:::Card{variant=soft eyebrow="Ce qu’il apporte" tone=teal}
- **Souris** utilisable partout
- **Sessions** persistantes
- **Plusieurs machines** depuis une seule interface
- **Git worktrees** groupés sous leur projet d’origine
- **[Plugins](https://herdr.dev/plugins/)** et **[communauté](https://www.reddit.com/r/herdr/)**
:::
::::

---
section: Partie 5 · Nos choix
---

# Différentes options pour l’IDE

::Lead
De la plus familière à la plus radicale : où placer Herdr par rapport à votre éditeur ?
::

::::Cols{cols=4 gap=4 fill content=center}
:::Card{variant=soft eyebrow="Option 1" title="Garder votre IDE"}
Herdr tourne dans le terminal intégré de l’IDE.

::Detail
Vite l’impression de manquer de place.
::
:::

:::Card{variant=soft eyebrow="Option 2" title="Deux fenêtres"}
Une pour votre IDE, une pour Herdr.

::Detail
Vous passez de l’une à l’autre.
::
:::

:::Card{variant=accent eyebrow="Option 3" title="L’IDE dans un pane Herdr"}
Léger : [getfresh.dev](https://getfresh.dev/)

::Detail
Plus lourd, VS Code dans le terminal : [terminal-code](https://github.com/zenbu-labs/terminal-code)
::
:::

:::Card{variant=soft eyebrow="Option 4" title="Plus d’IDE" tone=teal}
Tout se passe dans le terminal : l’agent écrit, vous relisez les diffs.
:::
::::

---
layout: section
index: Partie 6 / 6
---

::SectionHead{num="06"}
# Le fil rouge
::

::Agenda
- **NÉON** : un dépôt imparfait
- Ce que le harnais apprend
- Les réflexes à garder
::

---
section: Partie 6 · Le fil rouge
---

# NÉON : un dépôt imparfait :Hint[github.com/AI-for-dev/neon]{href="https://github.com/AI-for-dev/neon"}

::Lead
L’objectif n’est pas de construire un jeu, mais d’**améliorer un existant pas super…** <span class="muted">(ça arrive parfois <span>:-)</span></span>
::

::::Cols{cols=5 gap=6 fill align=center .mt-4}
:::Cell{span=2}
::Card{variant=soft eyebrow="Le terrain de jeu"}
Petit casse-briques HTML/JS sur `<canvas>`, sans dépendance.
::
:::
:::Cell{span=3}
::Chips
- Bugs + dette technique
- Backlog d’issues
- Tests partiels
- Historique git réel
- Fichier piégé + `.env` sensible
- Contrainte « zéro dépendance »
::
:::
::::

::Takeaway{.mt-6}
Chaque difficulté du dépôt devient une **brique du harnais**.
::

---
section: Partie 6 · Le fil rouge
---

# Maintenir plutôt que construire

::::Cols{cols="2fr 3fr" gap=8 fill align=center}
:::Stack{gap=4}
::Lead
Sur les premières lignes d’un code, un LLM s’en sort bien : tout est à faire. Sur une base de code conséquente, c’est une autre histoire.
::
::Card{variant=soft size=sm}
Chaque brique répond à un **besoin concret** du dépôt, et le transfert vers vos projets est direct : dépôt, issue, diff, revue, commit.
::
:::

:::Stack{gap=3}
:Eyebrow[Le backlog : ISSUES.md]{tone=teal}

::Matrix{size=sm left first="2rem"}
| # | type | titre |
| --- | --- | --- |
| 1 | bug | La balle traverse les briques au lieu de rebondir |
| 2 | performance | La collision scanne toutes les briques à chaque frame |
| 3 | fonctionnalité | Mode nuit |
| 4 | fonctionnalité | Import CSV d’un tableau de scores |
| 5 | dette | Le score et le combo ne sont pas testés |
| 6 | dette | Couleurs en dur au lieu de la palette |
::

::Note
Aucun module ne traite **#3, #4 et #6** : gardez-les pour essayer votre harnais sur une demande qu’il n’a jamais vue.
::
:::
::::

---
# V2 : fusion des deux slides « Ce que le harnais apprend » et « Le point d’arrivée », on garde la version du cours (ticket #2)
section: Partie 6 · Le fil rouge
---

# Ce que le harnais apprend :Hint[Un cycle complet de maintenance]

::::Cols{cols=6 gap=3}
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

::::Cols{cols=2 gap=8 fill align=center .mt-4}
:::Cell
:Eyebrow[À la fin de l’acte 2, votre clone contient]{tone=teal}

::Musts
- Un `AGENTS.md` de moins de 40 lignes
- Les skills `playtester` et `dynamic-playtester`
- Les agents explorer, planner, coder et reviewer
- Un flow qui traite le ticket #2, avec les tests comme juge
- Deux extensions : l’une refuse les commandes interdites, l’autre renvoie l’agent au travail tant que les tests sont rouges
::
:::

:::Stack{gap=4}
::Card{variant=soft center}
Tout cela tourne **dans un bac à sable**.
::
::Card{variant=accent center}
L’acte 3 mesure ensuite ce que certaines de ces pièces changent vraiment.
::
:::
::::

---
section: Partie 6 · Le fil rouge
---

# Les réflexes à garder dès demain

::::Stack{gap=3 fill center}
:::Item{variant=adv n=1}
**Relisez le diff**
::Detail
Le résumé de l’agent dit ce qu’il pense avoir fait. Le diff dit ce qu’il a fait.
::
:::
:::Item{variant=adv n=2}
**Lancez les tests vous-même**
:Detail[Une suite verte annoncée par l’agent n’est pas une suite verte.]
:::
:::Item{variant=adv n=3}
**Vérifiez les tests ajoutés**
:Detail[Retirez le correctif à la main : au moins un test doit échouer.]
:::
:::Item{variant=adv n=4}
**Travaillez sur une branche, un clone ou un worktree**
:Detail[Vous devez pouvoir tout annuler à tout moment.]
:::
:::Item{variant=adv n=5}
**Ne commitez pas ce que vous ne comprenez pas**
:Detail[Demandez une explication à l’agent, ou jetez la modification.]
:::
::::

---
layout: statement
---

# À demain !

::LogoBar{size=40 dark .mt-10}
::

---
# V2 : annexe pour les détails qui intéressent surtout ceux qui hébergent un modèle
layout: section
index: Annexe
---

::SectionHead{eyebrow="Annexe" num="A"}
# Héberger<br />un modèle
::

::Agenda
- Mélange d’experts : total et actifs
- Combien de GPU pour un gros modèle ?
::

---
section: Annexe · Héberger un modèle
---

# Mélange d’experts : total et actifs :Hint[Hugging Face]{prefix="Présentation illustrée par" href="https://huggingface.co/blog/moe"}

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=4}
::Matrix{size=md}
| modèle | architecture | totaux | actifs |
| --- | --- | --- | --- |
| [Kimi K3](https://huggingface.co/moonshotai/Kimi-K3) | MoE | 2 800 Mds | 104 Mds |
| [DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) | MoE | 1 600 Mds | 49 Mds |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | MoE | 552 Mds | 8 à 16 Mds |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | MoE | 320 Mds | 18 Mds |
| [Qwen3.6-35B-A3B](https://huggingface.co/Qwen/Qwen3.6-35B-A3B) | MoE | 35 Mds | 3 Mds |
| [Qwen3.6-27B](https://huggingface.co/Qwen/Qwen3.6-27B) | dense | 27 Mds | 27 Mds |
::

::Note{tag="Suffixe"}
`A<n>B` annonce les paramètres actifs. Convention non universelle : Kimi K3, DeepSeek-V4 ou GLM-5.3 sont des MoE sans suffixe. Vérifiez la fiche du modèle.
::
:::

:::Card{variant=soft eyebrow="Une partie du réseau par token" tone=teal}
::Specs
- **Totaux** mémoire à charger
- **Actifs** calcul et vitesse
::

::Detail{.mt-3}
Deux modèles affichant la même taille peuvent se comporter très différemment.
::
:::
::::

---
section: Annexe · Héberger un modèle
---

# Combien de GPU pour DeepSeek-V4.1-Flash ? :Hint[fiche du modèle]{href="https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash"}

:::::Cols{cols="5fr 8fr" gap=8 fill align=center}
::::Stack{gap=6}
:::Card{variant=soft eyebrow="Mémoire à prévoir" tone=teal}
**poids** + **cache KV** × tokens × sessions, plus 10 % de marge

::Specs{w="5.4rem"}
- **Poids** 552 Mds, experts en FP4
- **Cache KV** 890 octets par token
- **Cartes** H100 80 Go · H200 141 Go · B200 180 Go
::
:::

::Takeaway
Ici, la **quantification** décide. Le cache est si compact que 16 sessions à 1 M de tokens tiennent dans 15 Go.
::
::::

::::Stack{gap=5}
::Matrix{size=sm left first="15rem"}
| format · contexte | poids | cache | H100 | H200 | B200 |
| --- | --- | --- | --- | --- | --- |
| BF16 (calcul) · 128 k | 1,1 To | 0,1 Go | 16 | 16 | 8 |
| FP4/FP8 natif · 128 k | 308 Go | 0,1 Go | 8 | 4 | 2 |
| FP4/FP8 natif · 16 × 1 M | 308 Go | 15 Go | 8 | 4 | 2 |
| Q2 GGUF (calcul) · 128 k | 163 Go | 0,1 Go | 4 | 2 | 2 |
::

::Note{tag="Hypothèses"}
Nombre de cartes arrondi à 2, 4, 8… pour répartir le modèle. Les 183 Gio de mémoire Engram restent en RAM, comme dans la [recette vLLM](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash) (4 H200, 2 B200).
::
::::
:::::
