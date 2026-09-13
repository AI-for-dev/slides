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
drawings:
  persist: false
fonts:
  sans: Geist
  mono: Geist Mono
  serif: Instrument Serif
  provider: none
layout: cover
---

<div class="flex items-start justify-between gap-8">
  <div class="cvr-meta mt-1">
    <span>IA4Dev 2026</span>
    <span class="dot" />
    <span>ANF jour 1</span>
  </div>
  <div class="logo-plate">
    <img src="/images/logo-devlog.png" alt="Réseau DevLog" style="height: 46px" />
    <img src="/images/logo-groupe-calcul.png" alt="Groupe Calcul" style="height: 46px" />
    <img src="/images/logo-uga.png" alt="Université Grenoble Alpes" style="height: 50px" />
  </div>
</div>

<div class="flex-1 flex flex-col justify-center">
  <h1>Présentation<br />de l’atelier</h1>
  <h2 class="mt-5">Comprendre et construire son harnais</h2>
</div>

<div class="flex items-end justify-between gap-8">
  <div>
    <div class="hairline mb-4" style="width: 210px" />
    <div class="flex flex-col gap-2">
      <div class="author">
        <span class="who">Max Beligné</span>
        <span class="where">PUD-GA / MSH Alpes / UGA</span>
      </div>
      <div class="author">
        <span class="who">Loïc Gouarin</span>
        <span class="where">CMAP / CNRS / École polytechnique</span>
      </div>
    </div>
  </div>
  <div class="cvr-meta">Octobre 2026</div>
</div>

---
section: Introduction
---

# D’où parlons-nous ?

<div class="grid grid-cols-2 gap-7 flex-1 min-h-0">

  <div class="speaker">
    <div class="speaker-head">
      <img class="avatar" src="/images/avatar-loic.png" alt="Loïc Gouarin" />
      <div>
        <div class="speaker-name">Loïc</div>
        <div class="speaker-org">CMAP / CNRS / École polytechnique</div>
      </div>
    </div>
    <ul class="t-md mt-4">
      <li>IR en calcul scientifique au CNRS</li>
      <li>Co-responsable de l’équipe HPC@Maths</li>
      <li>Membre du groupe Calcul</li>
      <li>Développeur de logiciels libres</li>
    </ul>
  </div>

  <div class="speaker is-max">
    <div class="speaker-head">
      <img class="avatar" src="/images/avatar-max.png" alt="Max Beligné" />
      <div>
        <div class="speaker-name">Max</div>
        <div class="speaker-org">PUD-GA / MSH Alpes / UGA</div>
      </div>
    </div>
    <ul class="t-md mt-4">
      <li>IR dans le domaine des SHS à l’UGA</li>
      <li>Responsable du groupe TIPS-IA</li>
      <li>Membre de trop de groupes</li>
      <li>Autodidacte en développement logiciel</li>
    </ul>
  </div>

</div>

---
section: Introduction
---

# Organisation de l’atelier

<div class="flex-1 flex flex-col gap-2.5">

  <div class="act">
    <div class="act-n">1</div>
    <div class="act-body">
      <div class="act-title">Fondations</div>
      <div class="act-desc">Historique, usages, objectifs, positionnement, modèles, harnais, outils et méthode</div>
    </div>
    <div class="tag">Aujourd’hui</div>
  </div>

  <div class="act">
    <div class="act-n">2</div>
    <div class="act-body">
      <div class="act-title">Approche brique par brique</div>
      <div class="act-desc">Contexte, outils, agents, workflows, mémoire, permissions</div>
    </div>
  </div>

  <div class="act">
    <div class="act-n">3</div>
    <div class="act-body">
      <div class="act-title">Vérifier, évaluer, observer</div>
      <div class="act-desc">Tests, évaluations multi-modèles, observabilité</div>
    </div>
  </div>

  <div class="act">
    <div class="act-n">4</div>
    <div class="act-body">
      <div class="act-title">Construire son propre harnais</div>
      <div class="act-desc">Un cas d’usage personnel, et le tri entre le durable et le jetable</div>
    </div>
  </div>

</div>

<div class="mt-5 flex items-center gap-3 t-sm muted">
  <span class="tag is-plain">Version écrite</span>
  <span>Une version longue et rédigée de la formation est disponible sur
  <a href="https://github.com/AI-for-dev/hands-on-harness">github.com/AI-for-dev/hands-on-harness</a></span>
</div>

---
layout: section
index: Acte 1 / 4
---

<div>
  <div class="eyebrow">Acte 1</div>
  <div class="sect-num mt-5">01</div>
  <h1 class="mt-6">Les fondations</h1>
</div>

<div class="sect-list">
  <div class="item"><span class="k">01</span><span>Rapide historique</span></div>
  <div class="item"><span class="k">02</span><span>Diversité des usages</span></div>
  <div class="item"><span class="k">03</span><span>Objectif des deux jours</span></div>
  <div class="item"><span class="k">04</span><span>Positionnement</span></div>
</div>

---
section: Acte 1 · Les fondations
---

<div class="title-row">
  <h1>Perspective historique sommaire</h1>
  <div class="title-note">Quatre ans, trois changements de nature</div>
</div>

<div class="flex-1 flex flex-col justify-center">
  <EraTimeline />
</div>

<div class="takeaway mt-6">
On n’a pas seulement gagné en qualité de génération : l’unité de travail est passée
du <strong>fragment</strong> au <strong>fichier</strong>, puis au <strong>dépôt</strong>, puis au <strong>cycle de développement complet</strong>.
</div>

---
section: Acte 1 · Les fondations
---

<div class="title-row">
  <h1>Différents types d’utilisation de l’IA pour coder</h1>
  <div class="title-note">Inspiré par Shapiro, 2026</div>
</div>

<div class="flex-1 flex flex-col justify-center">
  <AutonomyLadder />
</div>

<div class="mt-4 t-sm muted">
Ces niveaux ne sont pas un classement : on en change selon le projet, l’enjeu et le temps disponible.
</div>

---
section: Acte 1 · Les fondations
---

# Objectifs des deux jours d’atelier à venir

<div class="grid grid-cols-5 gap-6 flex-1 min-h-0 items-center">

  <div class="col-span-3 flex flex-col gap-4">
    <div class="goal">
      <div class="num is-accent">1</div>
      <div>
        <div class="card-title">Mieux comprendre et contrôler ses agents et son harnais</div>
        <div class="t-sm muted">Savoir ce que le modèle voit, ce qu’il peut faire, et ce qui l’arrête.</div>
      </div>
    </div>
    <div class="goal">
      <div class="num is-ghost">2</div>
      <div>
        <div class="card-title">Ce qui implique souvent un usage plus intensif de l’IA</div>
        <div class="t-sm muted">
          Connaissant les problématiques environnementales, sociales…
          <strong class="accent">quel est notre positionnement ?</strong>
        </div>
      </div>
    </div>
  </div>

  <div class="col-span-2 card-soft v-center">
    <div class="eyebrow">Notre position</div>
    <p class="t-md mt-3">
      Pas de volonté de promouvoir l’usage de l’IA : à chacun de construire son positionnement.
    </p>
    <div class="hairline my-3" />
    <p class="t-md">
      Mais en organisant cette ANF et cet atelier, est-ce qu’on encourage l’usage de l’IA ?
      <em class="accent">Non ?</em>
    </p>
  </div>

</div>

---
layout: quote
section: Acte 1 · Les fondations
---

<div class="eyebrow mb-4">Expérimenter, éviter la politique de l’autruche</div>

<div class="qte-mark">“</div>

<p class="qte-text is-small">
La solution n’est pas de mettre la tête dans le sable et de chanter « La La La, je ne t’entends pas »
à pleine voix comme certains semblent le faire. La solution est de s’assurer que ces outils LLM aident
les mainteneurs <span class="add">[et les développeurs]</span> au lieu de leur causer de la douleur.
Il n’y a pas de question de ce côté-là. Nous ne forçons personne à l’utiliser, mais j’ignorerai très
bruyamment les personnes qui essaient de contredire d’autres sur leur utilisation
<span class="add">[ou leur non-utilisation]</span>. Et non, l’IA n’est pas parfaite. Mais bordel,
quiconque souligne les problèmes de l’IA ferait mieux de se regarder dans le miroir en même temps.
Parce que ce n’est pas comme si <em>l’intelligence naturelle</em> était toujours si géniale non plus.
</p>

<div class="qte-cite">
  <span class="bar" />
  <span>Linus Torvalds · <a href="https://www.phoronix.com/news/Linux-Is-Not-Anti-AI">phoronix.com/news/Linux-Is-Not-Anti-AI</a></span>
  <span class="quiet">entre crochets, ajouts de notre part</span>
</div>

---
layout: section
index: Partie 2 / 5
---

<div>
  <div class="eyebrow">Partie 2</div>
  <div class="sect-num mt-5">02</div>
  <h1 class="mt-6">Les modèles</h1>
  <h2 class="mt-3">état des lieux, septembre 2026</h2>
</div>

<div class="sect-list">
  <div class="item"><span class="k">01</span><span>« LLM disponibles » <span style="opacity:.55">vs</span> « ceux que vous pouvez utiliser »</span></div>
  <div class="item"><span class="k">02</span><span>Quelques bases sur les LLM</span></div>
  <div class="item"><span class="k">03</span><span>La montée en puissance des modèles open weight</span></div>
  <div class="item"><span class="k">04</span><span>Modèles pour planifier / pour réaliser les tâches</span></div>
</div>

---
section: Partie 2 · Les modèles
---

<div class="title-row">
  <h1>L’ensemble de l’offre <span class="quiet">vs</span> « ceux que vous pouvez utiliser »</h1>
  <div class="title-note">Quatre filtres, dans cet ordre</div>
</div>

<div class="grid grid-cols-4 gap-4 flex-1 min-h-0">

  <div class="dim dim-1">
    <div class="dim-k">01</div>
    <div class="dim-t">Institutionnelle</div>
    <p class="dim-d">C’est la 1<sup>re</sup> question à se poser : qu’est-ce qu’autorise ma ou mes institution(s) de rattachement ?</p>
  </div>

  <div class="dim dim-2">
    <div class="dim-k">02</div>
    <div class="dim-t">Éthique</div>
    <p class="dim-d">Vous pouvez être autorisé à utiliser un modèle, mais ce n’est peut-être pas adéquat : code stratégique, données personnelles…</p>
  </div>

  <div class="dim dim-3">
    <div class="dim-k">03</div>
    <div class="dim-t">Humaine</div>
    <p class="dim-d">Discussion à avoir au sein des projets : quel(s) niveau(x) d’utilisation de l’IA ? Quelle(s) IA ?</p>
  </div>

  <div class="dim dim-4">
    <div class="dim-k">04</div>
    <div class="dim-t">Technique</div>
    <p class="dim-d">Par rapport aux infrastructures accessibles (IaaS, API Albert…, abonnement payant), quels modèles je peux réellement utiliser ?</p>
  </div>

</div>

<div class="takeaway mt-5">
L’ensemble utile n’est pas « tous les modèles du marché », c’est l’intersection de ces quatre filtres.
</div>

---
section: Partie 2 · Les modèles
---

# Quelques bases sur les LLM

<div class="grid grid-cols-2 gap-x-9 gap-y-0 flex-1 min-h-0 items-center">

  <div>
    <ul class="t-md" style="display:flex; flex-direction:column; gap:0.9rem">
      <li>Prédiction du prochain token en fonction des précédents</li>
      <li>
        Différentes tailles et architectures<br />
        <span class="t-xs quiet">ex. Qwen3.6 27B · Qwen3.6 35B A3B · DeepSeek-V4-Flash-Vision-Exp (284B / 13B)</span>
      </li>
      <li>
        Quantifications <span class="t-xs quiet">(GGUF : voir par exemple unsloth)</span>
        et optimisations <span class="t-xs quiet">(MLX pour Mac, DS4 pour les MoE DeepSeek et GLM)</span>
      </li>
      <li>Importance du raisonnement et des appels d’outils</li>
      <li>
        <a href="https://huggingface.co/models">huggingface.co/models</a>
        <span class="t-xs quiet"> · pas de catégorie à part pour le code, classé dans « text generation »</span>
      </li>
    </ul>
  </div>

  <div class="card-soft">
    <div class="eyebrow is-teal">Un jeu à plusieurs paramètres</div>
    <div class="param-grid mt-3">
      <div><span class="param-k">VRAM</span>taille du GPU</div>
      <div><span class="param-k">Contexte</span>du modèle, mais aussi de votre infra</div>
      <div><span class="param-k">Vitesse</span>nombre de tokens par unité de temps</div>
      <div><span class="param-k">Efficacité</span>sur une tâche spécifique</div>
      <div><span class="param-k">Coûts</span>économique, écologique…</div>
    </div>
  </div>

</div>

---
section: Partie 2 · Les modèles
---

<div class="title-row">
  <h1>Évolution dans le temps</h1>
  <div class="title-note">La densité de sorties, elle, n’a pas ralenti</div>
</div>

<div class="grid grid-cols-3 gap-7 flex-1 items-center">
  <div class="col-span-2 h-full">
    <Fig src="/images/llm-timeline-labonne.jpg" contain
         caption="Maxime Labonne, septembre 2026" />
  </div>
  <div class="flex flex-col gap-4">
    <div class="card-soft">
      <div class="eyebrow">À retenir</div>
      <p class="t-sm mt-2">Le rythme de publication rend tout classement <strong>périssable</strong> : ce qui compte est la méthode pour choisir, pas le nom du modèle du mois.</p>
    </div>
    <div class="card-soft">
      <div class="eyebrow is-teal">Tendance</div>
      <p class="t-sm mt-2">Les familles <strong>open weight</strong> occupent une part croissante de la frise.</p>
    </div>
  </div>
</div>

---
section: Partie 2 · Les modèles
---

<div class="title-row">
  <h1>Sur la période actuelle</h1>
  <div class="title-note">Artificial Analysis Intelligence Index v4.3</div>
</div>

<div class="grid grid-cols-11 gap-6 flex-1 min-h-0 items-center">

  <div class="col-span-8 h-full">
    <Fig src="/images/aa-index-chart.jpg" contain
         caption="artificialanalysis.ai/models, septembre 2026"
         href="https://artificialanalysis.ai/models" />
  </div>

  <div class="col-span-3 flex flex-col gap-3">
    <div class="card-soft">
      <div class="eyebrow">v4.3 · 10 évaluations</div>
      <p class="t-xs muted mt-2">AA-Briefcase · GDPval-AA v2 · AutomationBench-AA · Terminal-Bench v4.0 · SciCode · Humanity’s Last Exam · GDP.pdf · CritPt · AA-Omniscience · AA-LCR v1.1</p>
    </div>
    <div class="card-teal">
      <div class="eyebrow is-teal">Open weight</div>
      <p class="t-sm mt-2">Surlignés en jaune sur le graphe.</p>
      <div class="flex gap-2 mt-2">
        <span class="tag is-teal is-code">2.8 T</span>
        <span class="tag is-teal is-code">320B A18B</span>
      </div>
    </div>
  </div>

</div>

---
section: Partie 2 · Les modèles
---

# Quels modèles, pour quel rôle ?

<div class="grid grid-cols-2 gap-8 flex-1 min-h-0">

  <div class="flex flex-col justify-center">
    <div class="eyebrow">Bonne pratique, si vous le pouvez</div>
    <div class="flex flex-col gap-3 mt-4">
      <div class="role">
        <div class="num is-accent">1</div>
        <div><strong>Un gros modèle</strong> pour planifier<div class="t-xs muted">Découper, anticiper, décider de la stratégie</div></div>
      </div>
      <div class="role">
        <div class="num is-ghost">2</div>
        <div><strong>Un plus petit modèle</strong> pour exécuter les tâches<div class="t-xs muted">Volume, rapidité, coût maîtrisé</div></div>
      </div>
      <div class="role">
        <div class="num is-accent">3</div>
        <div><strong>Un gros modèle</strong> pour vérifier<div class="t-xs muted">Relire, challenger, refuser</div></div>
      </div>
    </div>
  </div>

  <div class="card-soft v-center">
    <div class="eyebrow is-teal">Dans l’ESR</div>
    <p class="t-md mt-3">La situation s’améliore, mais reste peu satisfaisante.</p>
    <div class="mt-4 flex flex-col gap-2">
      <div class="row t-sm"><span class="num is-ghost">·</span><span><strong>DeepSeek Flash</strong> via l’API Albert <span class="muted">avec contraintes</span></span></div>
      <div class="row t-sm"><span class="num is-ghost">·</span><span><strong>Qwen 3.8 27B</strong> <span class="muted">via IaaS ???</span></span></div>
      <div class="row t-sm"><span class="num is-ghost">·</span><span><strong>GLM 5.2</strong> <span class="muted">accès limité, pour l’instant via Scaleway</span></span></div>
    </div>
  </div>

</div>

---
layout: section
index: Partie 3 / 5
---

<div>
  <div class="eyebrow">Partie 3</div>
  <div class="sect-num mt-5">03</div>
  <h1 class="mt-6">Qu’est-ce<br />qu’un harnais ?</h1>
</div>

<div>
  <div class="sect-def">
    <div class="def-row">
      <div class="def-k">prompt engineering</div>
      <div class="def-v">dit au modèle <strong>ce qu’il doit faire</strong></div>
    </div>
    <div class="def-row">
      <div class="def-k">context engineering</div>
      <div class="def-v">détermine <strong>ce que le modèle voit</strong></div>
    </div>
    <div class="def-row is-hero">
      <div class="def-k">harness engineering</div>
      <div class="def-v">construit <strong>le monde dans lequel le modèle évolue</strong></div>
    </div>
  </div>
  <div class="sect-src">« Harness Engineering: How to Build AI Agents That Don’t Fall Apart », fin août 2026</div>
</div>

---
section: Partie 3 · Le harnais
---

<div class="title-row">
  <h1>Les sept briques d’un harnais</h1>
  <div class="title-note">Tout ce qui entoure le modèle</div>
</div>

<div class="flex-1 min-h-0 flex items-center justify-center">
  <HarnessMap />
</div>

---
section: Partie 3 · Le harnais
---

# Quelques caractéristiques

<div class="grid grid-cols-2 gap-6 flex-1 min-h-0">

  <div class="card v-center">
    <div class="flex items-center gap-3">
      <span class="num is-accent">A</span>
      <div class="card-title" style="margin:0">Sur-mesure</div>
    </div>
    <ul class="t-md mt-4">
      <li>Le harnais universel, qui marche bien pour tout le monde, n’existe pas</li>
      <li>Il dépend de <strong>vos usages</strong> et de <strong>votre historique d’échecs</strong></li>
    </ul>
  </div>

  <div class="card v-center">
    <div class="flex items-center gap-3">
      <span class="num is-teal">B</span>
      <div class="card-title" style="margin:0">Système évolutif</div>
    </div>
    <ul class="t-md mt-4">
      <li>Rien ne sert de commencer trop complexe</li>
      <li>Éviter de vouloir traiter toutes les briques en se disant « c’est bon, c’est réglé »</li>
      <li>Évolue avec les nouveaux modèles <span class="t-xs quiet">(ex. « model guidance » d’OpenAI sur Astra)</span></li>
      <li>Dans l’idéal, devrait être <strong>évalué régulièrement</strong></li>
    </ul>
  </div>

</div>

<div class="takeaway mt-6">
La compétence clé n’est pas de « tout installer », mais de savoir quelles briques
<strong>épaissir</strong>, <strong>minimiser</strong> ou <strong>retirer</strong>.
</div>

---
layout: section
index: Partie 4 / 5
---

<div>
  <div class="eyebrow">Partie 4</div>
  <div class="sect-num mt-5">04</div>
  <h1 class="mt-6">Les outils</h1>
</div>

<div class="sect-list">
  <div class="item"><span class="k">I</span><span>Le choix de <strong>Pi</strong> comme harnais</span></div>
  <div class="item"><span class="k">II</span><span>Le multiplexeur <strong>Herdr</strong></span></div>
  <div class="item"><span class="k">III</span><span>Différentes options pour l’IDE</span></div>
</div>

---
section: Partie 4 · Les outils
---

<div class="title-row">
  <h1><span class="quiet mono t-sm">I.</span> Le choix de Pi comme harnais</h1>
  <div class="title-note">github.com/earendil-works/pi</div>
</div>

<div class="grid grid-cols-2 gap-4 flex-1 min-h-0">

  <div class="flex flex-col gap-4 justify-center">
    <div class="card">
      <div class="eyebrow">Minimal et extensible</div>
      <p class="serif mt-2" style="font-size:1.12rem; font-style:italic; line-height:1.35">
        « There are many agent harnesses<br />but this one is yours »
      </p>
    </div>
    <div class="card">
      <div class="eyebrow">Open source</div>
      <p class="t-sm mt-2">
        <a href="https://github.com/earendil-works/pi">github.com/earendil-works/pi</a>
        <span class="tag is-plain is-code ml-2">TypeScript</span>
      </p>
      <p class="t-xs muted mt-2">
        Créé par Mario Zechner, transféré en mai 2026 à <strong>Earendil Works</strong>, société
        d’intérêt public américaine fondée par Armin Ronacher et Colin Daymond Hanna.
      </p>
    </div>
  </div>

  <div class="flex flex-col gap-4 justify-center">
    <div class="card">
      <div class="eyebrow is-teal">Communauté</div>
      <div class="mt-3 flex flex-col gap-2">
        <div class="row t-sm"><span class="tag is-plain">Reddit</span><a href="https://www.reddit.com/r/PiCodingAgent/">r/PiCodingAgent</a></div>
        <div class="row t-sm"><span class="tag is-plain">Discord</span><span>the shitty coders club</span></div>
        <div class="row t-sm"><span class="tag is-plain">X</span><span>@pidotdev</span></div>
      </div>
    </div>
    <div class="card-accent">
      <div class="eyebrow">Et surtout</div>
      <p class="t-lg mt-1"><strong>Efficace.</strong> <span class="muted t-sm">Les deux slides suivantes le mesurent.</span></p>
    </div>
  </div>

</div>

---
section: Partie 4 · Les outils
---

<div class="title-row">
  <h1>L’efficacité de Pi</h1>
  <div class="title-note">Extrait d’une étude de Databricks</div>
</div>

<div class="grid grid-cols-4 gap-6 flex-1 items-center">
  <div class="col-span-3 h-full">
    <Fig src="/images/pi-databricks-chart.jpg" contain
         caption="Étude Databricks · taux de réussite global vs coût moyen par tâche" />
  </div>
  <div class="flex flex-col gap-3">
    <div class="card-accent">
      <div class="eyebrow">La frontière</div>
      <p class="t-sm mt-2">La courbe rouge est le <strong>front de Pareto</strong> : à coût égal, rien ne fait mieux.</p>
    </div>
    <div class="card-soft">
      <p class="t-sm">Pi y occupe la plupart des points, y compris aux réglages les moins chers.</p>
    </div>
  </div>
</div>

---
section: Partie 4 · Les outils
---

<div class="title-row">
  <h1>Un autre benchmark : Frontier Harness v1.0</h1>
  <div class="title-note">Modèle Kimi K3 à chaque fois</div>
</div>

<div class="grid grid-cols-2 gap-8 flex-1 items-center">

  <div class="flex flex-col gap-3">
    <div class="row"><span class="num is-ghost">M</span><span class="t-md">Même modèle partout : <strong>Kimi K3</strong></span></div>
    <div class="row"><span class="num is-ghost">30</span><span class="t-md">30 tâches : <strong>21</strong> Terminal-Bench, <strong>9</strong> DeepSWE</span></div>
    <div class="card-accent mt-1">
      <p class="t-md">Pi termine un peu derrière Codex, mais pour un <strong class="accent">coût nettement moindre</strong>.</p>
    </div>
    <p class="note">Le harnais est donc bien une variable en soi : à modèle constant, les écarts restent importants.</p>
  </div>

  <div class="h-full">
    <Fig src="/images/frontier-harness-benchmark.jpg" contain caption="Frontier Harness v1.0" />
  </div>

</div>

---
section: Partie 4 · Les outils
---

<div class="title-row">
  <h1>Pi peut surprendre à la première utilisation</h1>
  <div class="title-note">Extensions sur <a href="https://pi.dev/packages">pi.dev/packages</a></div>
</div>

<div class="surprise-head">
  <div class="eyebrow">Surprise !</div>
  <div class="eyebrow is-teal">Extension possible pour y remédier</div>
</div>

<div class="flex-1 flex flex-col gap-2">

  <div class="surprise">
    <div class="s-left">Mode Yolo</div>
    <div class="s-arrow">→</div>
    <div class="s-right"><span class="tag is-teal is-code">pi-permission-modes</span></div>
  </div>

  <div class="surprise">
    <div class="s-left">Pas de visualisation de diff avec acceptation au fur et à mesure</div>
    <div class="s-arrow">→</div>
    <div class="s-right"><span class="tag is-teal is-code">pi-show-diffs</span></div>
  </div>

  <div class="surprise">
    <div class="s-left">Pas de mode plan ou de liste de tâches intégrée</div>
    <div class="s-arrow">→</div>
    <div class="s-right">
      <span class="tag is-teal is-code">pi-permission-modes</span>
      <span class="t-xs muted">ou un <code>TODO.md</code> maison,</span>
      <span class="tag is-teal is-code">pi-todo</span>
      <span class="t-xs muted">ou</span>
      <span class="tag is-teal is-code">pi-task</span>
      <span class="t-xs muted">si plus cadré</span>
    </div>
  </div>

  <div class="surprise">
    <div class="s-left">Pas de sous-agents directement</div>
    <div class="s-arrow">→</div>
    <div class="s-right"><span class="tag is-teal is-code">pi-subagents</span></div>
  </div>

  <div class="surprise">
    <div class="s-left">Pas de MCP directement</div>
    <div class="s-arrow">→</div>
    <div class="s-right"><span class="tag is-teal is-code">pi-mcp-adapter</span></div>
  </div>

</div>

<div class="mt-4 t-sm quiet">
Cette formation souhaite éviter le catalogue d’extensions <span class="mono">:-)</span>
</div>

---
section: Partie 4 · Les outils
---

<div class="title-row">
  <h1><span class="quiet mono t-sm">II.</span> Le multiplexeur Herdr</h1>
  <div class="title-note"><a href="https://herdr.dev/">herdr.dev</a></div>
</div>

<div class="flex flex-col gap-1.5 mb-4">
  <div class="t-md">Un multiplexeur fait tourner plusieurs terminaux dans une seule session <span class="muted">(tmux, screen…)</span>.</div>
  <div class="t-md"><strong>Herdr</strong> est un multiplexeur récent, spécialisé pour gérer le fonctionnement des agents.</div>
</div>

<div class="grid grid-cols-5 gap-6 flex-1 min-h-0">
  <div class="col-span-3 h-full">
    <Fig src="/images/herdr-interface.jpg" frame="screen" contain caption="L’interface" />
  </div>
  <div class="col-span-2 h-full">
    <Fig src="/images/herdr-tree.png" contain caption="Schéma hiérarchique fonctionnel" />
  </div>
</div>

---
section: Partie 4 · Les outils
---

# Quelques avantages d’Herdr

<div class="grid grid-cols-2 gap-x-5 gap-y-4 flex-1 min-h-0 content-center">

  <div class="adv">
    <span class="num is-accent">1</span>
    <div><strong>Utilisation de la souris</strong><div class="t-xs muted"><code>Ctrl+B</code> puis <code>?</code> pour apprendre les raccourcis au fur et à mesure</div></div>
  </div>

  <div class="adv">
    <span class="num is-accent">2</span>
    <div><strong>Persistance des sessions</strong><div class="t-xs muted">On ferme le terminal, les agents continuent</div></div>
  </div>

  <div class="adv">
    <span class="num is-accent">3</span>
    <div><strong>Connexion à distance multi-machines</strong><div class="t-xs muted">Depuis une seule interface</div></div>
  </div>

  <div class="adv">
    <span class="num is-accent">4</span>
    <div><strong>Intégration des Git worktrees</strong><div class="t-xs muted">Ils peuvent être groupés dans le projet d’origine</div></div>
  </div>

  <div class="adv">
    <span class="num is-accent">5</span>
    <div><strong>Plugins</strong><div class="t-xs muted"><a href="https://herdr.dev/plugins/">herdr.dev/plugins</a></div></div>
  </div>

  <div class="adv">
    <span class="num is-accent">6</span>
    <div><strong>Communauté</strong><div class="t-xs muted"><a href="https://www.reddit.com/r/herdr/">reddit.com/r/herdr</a></div></div>
  </div>

</div>

---
section: Partie 4 · Les outils
---

<div class="title-row">
  <h1>Quelques premières commandes</h1>
  <div class="title-note">Extrait de <a href="https://devon.md/herdr/">devon.md/herdr</a></div>
</div>

<div class="grid grid-cols-5 gap-7 flex-1 items-center">
  <div class="col-span-3 h-full">
    <Fig src="/images/herdr-commands.jpg" contain />
  </div>
  <div class="col-span-2 flex flex-col gap-3">
    <div class="card-soft">
      <div class="eyebrow">Le réflexe à prendre</div>
      <p class="t-sm mt-2">Apprendre <strong>trois</strong> raccourcis, pas trente. Le reste vient avec <code>Ctrl+B ?</code>.</p>
    </div>
    <div class="card-soft">
      <div class="eyebrow is-teal">Pendant l’atelier</div>
      <p class="t-sm mt-2">On utilisera surtout la création de panes, la navigation, et les worktrees.</p>
    </div>
  </div>
</div>

---
section: Partie 4 · Les outils
---

# <span class="quiet mono t-sm">III.</span> Différentes options pour l’IDE

<div class="flex-1 flex flex-col gap-4 justify-center">

  <div class="opt">
    <div class="opt-k">Option 1</div>
    <div>
      <div class="card-title">Garder son IDE tel quel</div>
      <p class="t-sm muted">Mais en lançant Herdr depuis la fenêtre terminal de l’IDE, on manque vite de place.</p>
    </div>
  </div>

  <div class="opt">
    <div class="opt-k">Option 2</div>
    <div>
      <div class="card-title">Deux fenêtres</div>
      <p class="t-sm muted">Une pour l’IDE, une pour Herdr, et on passe de l’une à l’autre.</p>
    </div>
  </div>

  <div class="opt is-hero">
    <div class="opt-k">Option 3</div>
    <div>
      <div class="card-title">Lancer un IDE dans un pane Herdr</div>
      <p class="t-sm muted">
        Solution légère : <a href="https://getfresh.dev/">getfresh.dev</a><br />
        Plus lourd : VS Code dans le terminal, <a href="https://github.com/zenbu-labs/terminal-code">github.com/zenbu-labs/terminal-code</a>
      </p>
    </div>
  </div>

</div>

---
layout: section
index: Partie 5 / 5
---

<div>
  <div class="eyebrow">Partie 5</div>
  <div class="sect-num mt-5">05</div>
  <h1 class="mt-6">Le fil rouge</h1>
  <h2 class="mt-3">Un seul dépôt, du début à la fin</h2>
</div>

<div class="sect-list">
  <div class="item"><span class="k">01</span><span><strong>NÉON</strong>, un dépôt volontairement imparfait</span></div>
  <div class="item"><span class="k">02</span><span>Ce que le harnais apprend, module après module</span></div>
  <div class="item"><span class="k">03</span><span>Le point d’arrivée : une issue traitée de bout en bout</span></div>
</div>

---
section: Partie 5 · Le fil rouge
---

<div class="title-row">
  <h1>NÉON : un dépôt imparfait</h1>
  <div class="title-note"><a href="https://github.com/AI-for-dev/neon">github.com/AI-for-dev/neon</a></div>
</div>

<p class="lead">L’objectif n’est pas de construire un jeu, mais d’<strong>améliorer un existant pas terrible</strong>. <span class="muted">Ça arrive parfois <span class="mono">:-)</span></span></p>

<div class="grid grid-cols-5 gap-6 flex-1 min-h-0 mt-4 items-center">

  <div class="col-span-2 card-soft">
    <div class="eyebrow">Le terrain de jeu</div>
    <p class="t-md mt-3">Petit casse-briques HTML/JS sur <code>&lt;canvas&gt;</code>, sans aucune dépendance.</p>
  </div>

  <div class="col-span-3 grid grid-cols-2 gap-3 content-center">
    <div class="flaw"><span class="flaw-d" /> Bugs + dette technique</div>
    <div class="flaw"><span class="flaw-d" /> Backlog d’issues</div>
    <div class="flaw"><span class="flaw-d" /> Tests partiels</div>
    <div class="flaw"><span class="flaw-d" /> Historique git réel</div>
    <div class="flaw"><span class="flaw-d" /> <span>Fichier piégé + <span class="mono">.env</span> sensible</span></div>
    <div class="flaw"><span class="flaw-d" /> Contrainte « zéro dépendance »</div>
  </div>

</div>

<div class="takeaway mt-6">
Chaque difficulté du dépôt devient une <strong>brique du harnais</strong>.
</div>

---
section: Partie 5 · Le fil rouge
---

<div class="title-row">
  <h1>Ce que le harnais apprend</h1>
  <div class="title-note">Un cycle complet de maintenance</div>
</div>

<p class="t-sm muted" style="margin-top:-0.5rem">
Chaque module ajoute une capacité réutilisable sur vos propres dépôts.
</p>

<div class="grid grid-cols-6 gap-3 mt-3">
  <div class="step"><span class="step-n">1</span><div class="step-t">Comprendre</div><div class="step-d">le dépôt</div></div>
  <div class="step"><span class="step-n">2</span><div class="step-t">Planifier</div><div class="step-d">la modification</div></div>
  <div class="step"><span class="step-n">3</span><div class="step-t">Déléguer</div><div class="step-d">et coder</div></div>
  <div class="step"><span class="step-n">4</span><div class="step-t">Tester</div><div class="step-d">et refactorer</div></div>
  <div class="step"><span class="step-n">5</span><div class="step-t">Sécuriser</div><div class="step-d">refuser le piège</div></div>
  <div class="step"><span class="step-n">6</span><div class="step-t">Livrer</div><div class="step-d">diff + commit</div></div>
</div>

<div class="grid grid-cols-2 gap-7 flex-1 min-h-0 mt-4">

  <div class="card v-center">
    <div class="eyebrow">Point d’arrivée · une seule issue</div>
    <p class="serif mt-3" style="font-size:1.05rem; font-style:italic; line-height:1.4">
      « Ajoute le mode nuit + l’import CSV des scores, garde la compatibilité locale,
      documente et teste. »
    </p>
  </div>

  <div>
    <div class="eyebrow is-teal">Le harnais doit alors</div>
    <div class="mt-3 grid grid-cols-1 gap-1.5">
      <div class="must">Retrouver les décisions du projet</div>
      <div class="must">Orchestrer sous-agents &amp; workers</div>
      <div class="must">Exiger des tests verts</div>
      <div class="must is-warn">Refuser le piège de <code>SUPPORT.md</code></div>
      <div class="must">Mettre à jour la doc + un commit justifié</div>
    </div>
  </div>

</div>

<div class="pipeline mt-4">
  <span class="pipeline-k">Objectif</span>
  <span class="pipeline-flow">dépôt <i>→</i> issue <i>→</i> diff <i>→</i> revue <i>→</i> commit</span>
  <span class="pipeline-note">Remplacez NÉON par votre dépôt, le workflow reste le même.</span>
</div>

---
layout: statement
---

<div class="eyebrow mb-6">À suivre</div>

# À demain !

<p class="muted mt-6" style="font-size:0.95rem">
Rappel, pour la version écrite, c’est par ici :<br />
<a href="https://github.com/AI-for-dev/hands-on-harness/">github.com/AI-for-dev/hands-on-harness</a>
</p>

<div class="logo-plate mt-10" style="background: rgba(255,255,255,.96); border-color: rgba(255,255,255,.25)">
  <img src="/images/logo-devlog.png" alt="Réseau DevLog" style="height: 40px" />
  <img src="/images/logo-groupe-calcul.png" alt="Groupe Calcul" style="height: 40px" />
  <img src="/images/logo-uga.png" alt="Université Grenoble Alpes" style="height: 44px" />
</div>
