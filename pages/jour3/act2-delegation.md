---
layout: section
index: Acte 2 · Module 3 / 4
---

::SectionHead{eyebrow="Acte 2 · Module 3" num="2.3" detail="Découper le travail en sous-agents"}
# La délégation
::

::Agenda
- Ce qu’un sous-agent reçoit, ce qu’il ne reçoit pas, ce qui en revient
- Une garantie qui tient à la panoplie d’outils, vérifiée dans la trace
- La boucle explorer → planifier → coder → évaluer, tenue à la main
- Savoir qui a réellement tourné, et avec quel modèle
::

---
section: 2.3 · La délégation
---

# D’où l’on part

::::::Cols{cols=2 gap=8 fill align=center}
::::Stack{gap=4}
:::Item{variant=goal n=1}
Le texte du prompt déplace certaines colonnes
::Detail
Le ticket cadré fait passer le coin de 0/20 à 14/20. Mais sur `briques`, 11/20 contre 13/20 : rien de fondamental.
Déposer les tests d’avance, lui, fait passer de 11/20 à **18/20**.
::
:::
:::Item{variant=goal n=2 ghost}
Un skill n’a que du texte
::Detail
Ni schéma, ni fonction, ni permission : sa consigne de ménage est restée lettre morte dans onze exécutions sur vingt.
::
:::
::::
:::Card{variant=accent eyebrow="La question du module" center}
::Pull{size=lg}
Un sous-agent qui écrit des tests pertinents pour l’agent principal nous ramènerait-il à 18/20 ?
::
:::
::::::

---
section: 2.3 · La délégation
---

# Un sous-agent est un contexte neuf

::Lead
Une session ouverte par la session principale, avec son prompt système, ses outils, son modèle, et une fenêtre **vide**.
Elle reçoit une tâche en texte et ne renvoie que sa conclusion : lectures, appels d’outils et raisonnement disparaissent avec elle.
::

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5 .mt-2}
::Criterion{n=1 title="Isoler le contexte"}
Établir quels fichiers touche un ticket demande d’en lire une dizaine. La note qui en résulte tient en trente lignes, et seule elle revient.
::
::Criterion{n=2 title="Restreindre les outils"}
Un agent sans outil d’écriture ne peut pas écrire. La question de l’obéissance ne se pose plus.
::
::Criterion{n=3 title="Séparer générateur et évaluateur"}
Un modèle qui relit son code relit ses intentions. Un relecteur neuf ne connaît que le ticket, le plan et le diff.
::
::::
:::::

---
section: 2.3 · La délégation
---

# combo, et ce qu’on peut lui préférer :Hint[github.com/AI-for-dev/combo]{href="https://github.com/AI-for-dev/combo"}

::::Cols{cols=2 gap=7 fill}
:::Stack{gap=3}
::Card{variant=accent eyebrow="combo, écrit pour cette formation" size=sm}
Une bibliothèque au-dessus du SDK de Pi : un fichier markdown devient un agent, les agents se composent en workflows.
Un volet [herdr](https://herdr.dev) par sous-agent, le temps et les tokens de chacun, un export HTML et JSONL.
::
::Note{tag="Attention"}
Pas une bibliothèque de production. Nous la gardons pour la pédagogie : tout ce qu’elle fait reste visible.
::
::Note{tag="Extension"}
Chargée avec `-e`, elle ajoute un outil `subagent` que le modèle principal appelle, au même titre que `read` ou `edit`.
::
:::
:::Stack{gap=3}
:Eyebrow[Plus éprouvées pour un usage quotidien]{tone=teal}

::Bullet{size=sm k="subagent" badge=tag}
L’exemple du dépôt de Pi : single, parallel et chain, un processus `pi` par sous-agent
::
::Bullet{size=sm k="pi-subagents" badge=tag}
Le plus abouti : agents prêts à l’emploi (`scout`, `reviewer`, `oracle`…), tâches de fond
::
::Bullet{size=sm k="pi-envoy" badge=tag}
La gouvernance : un contrat de délégation par enfant, budgets, tableau de bord
::
:::
::::

---
section: 2.3 · La délégation
---

# L’anatomie d’un agent

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3 .code-sm}
:Eyebrow[.pi/agents/reader.md]{tone=quiet code}

```markdown
---
name: reader
description: Reads one file and reports what it exports
tools: read
model: ilaas/gemma-4-31b
---

You read the file you are given and list its exported symbols,
one per line, with the line number. Nothing else.
```

::Note
Le corps devient le **prompt système** du sous-agent : il est lu à coup sûr, là où un skill reste une procédure que le modèle ouvre ou non.
::
:::
:::Card{variant=soft eyebrow="Les champs" tone=teal}
::Specs{w="5rem" raw}
- **tools** les outils enregistrés : sans `write`, aucun moyen d’écrire. Absent : `read, grep, find, ls`
- **model** absent, le sous-agent tourne sur vos réglages du jour
- **lifetime** propre à combo : `task` (défaut) ou `workflow`
- **skills** ceux qu’il doit avoir, car il n’hérite de rien : ni extensions, ni skills, ni fichiers de contexte
::
:::
::::

---
section: 2.3 · La délégation
---

# Trois avertissements avant de lancer

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{badge="1" title="Le modèle n’est jamais hérité"}
Il vient de l’argument d’appel, à défaut du fichier de pipeline, à défaut de l’en-tête de l’agent, et en dernier recours de `~/.pi/agent/settings.json`.

:Rule

Le plus proche du travail l’emporte.
:::
:::Card{badge="2" title="Les agents du projet ne se chargent pas seuls"}
`.pi/agents/` est contrôlé par le dépôt : ce sont des instructions tierces. La portée se demande à chaque appel.

:Rule

`/agents` liste ce qui est disponible.
:::
:::Card{badge="3" badgeTone=teal title="Voir les agents travailler"}
Lancez Pi dans herdr, puis `/herdr on` : chaque sous-agent ouvre son volet, qui se referme quand il a fini.

:Rule

Plus agréable que la trace après coup.
:::
::::
:::::

---
section: 2.3 · La délégation
---

# La tâche : l’issue #2 de NÉON

::::Cols{cols=2 gap=8 fill}
:::Stack{gap=4}
::Lead
La boucle sur les briques de `frame()` fait la collision, le score et le dessin dans le même corps : rien n’est testable séparément.
::
::Card{variant=accent eyebrow="Sortie attendue" size=sm}
Une fonction **pure**, extraite de `frame()`, couverte par des tests neufs, sans qu’aucun export de `game/neon.js` ne change de nom ni de signature.
::
::Note{tag="Cadre"}
Seuls `neon.js` et `neon.test.js` changent, les tests vont dans la suite, `npm test` finit vert.
::
:::
:::Stack{gap=4 center}
:Eyebrow[Pourquoi ce ticket]{tone=teal}

::Bullet{size=sm k="1"}
Chaque rôle a un livrable **falsifiable** : la note se vérifie en ouvrant les fichiers cités, le plan pas à pas, le diff avec la suite, le verdict contre la liste des exports.
::
::Bullet{size=sm k="2"}
Le ticket affirme ce qu’il ne mesure pas : « la collision est lente » est une phrase du mainteneur, pas un chiffre.
::
:::
::::

---
section: 2.3 · La délégation
---

# Quatre rôles, et ce que chacun a le droit de faire :Hint[scripts/agents/ du dépôt de la formation]

::Matrix{size=md left first="8rem"}
| agent | livrable | panoplie | ce que sa panoplie lui interdit |
| --- | --- | --- | --- |
| `explorer` | une note d’impact | `read, grep, find, ls` | écrire quoi que ce soit |
| `planner` | un plan en petits pas | `read, grep, find, ls` | écrire quoi que ce soit |
| `coder` | le diff d’**un** pas du plan | `read, grep, find, ls, edit, write` | lancer une commande |
| `reviewer` | `APPROVED` ou `CHANGES REQUESTED`, motivé | `read, grep, find, ls` | corriger ce qu’il relit |
::

:::::Stack{fill center gap=5}
::::Cols{cols=4 gap=4 .mt-5}
::Card{variant=soft size=xs}
Une note, pas un avis. Le ticket peut se tromper sur l’emplacement du code : la note vérifie au lieu de recopier.
::
::Card{variant=soft size=xs}
Chaque pas tient dans une invocation du coder, commence par son test rouge. « Si tu hésites, découpe. »
::
::Card{variant=soft size=xs}
De quoi écrire, rien pour exécuter : il ne lance pas les tests et ne prétend pas l’avoir fait.
::
::Card{variant=soft size=xs}
Ne corrige jamais : un vérificateur qui corrige devient un second codeur que personne ne relit.
::
::::
:::::

---
section: 2.3 · La délégation
---

# Exercice : chaque agent énonce sa garantie

:::::Cols{cols=2 gap=7 fill}
::::Stack{gap=3}
:::Cell{.code-sm}
```bash
cd /chemin/vers/neon
pi install -l npm:@ai-for-dev/combo
mkdir -p .pi/agents
cp /chemin/vers/hands-on-harness/scripts/agents/*.md .pi/agents/
pi
```
:::

::Card{variant=accent eyebrow="En salle" size=sm}
`subagent` est un outil : nommez l’agent et la tâche, le modèle principal l’appelle. Vous pouvez aussi préciser le modèle (« avec le modèle deepseek-v4-flash d’opencode-go »).
::
::::
:::Stack{gap=4}
::Card{eyebrow="explorer" size=sm}
<p class="mono muted" style="font-size:0.68rem;line-height:1.45">utilise le subagent "explorer" pour la tâche "Nomme exactement les outils dont tu disposes."</p>

« Je dispose des outils suivants : `read`, `grep`, `find`, `ls`. »
::
::Card{eyebrow="coder" size=sm}
<p class="mono muted" style="font-size:0.68rem;line-height:1.45">utilise le subagent "coder" pour la tâche "Lance npm test et rapporte le résultat."</p>

« Le subagent "coder" indique qu’il ne dispose pas d’un outil lui permettant d’exécuter des commandes shell, et ne peut donc pas lancer npm test. »
::
::Note
Vos sorties seront formulées autrement. Le fond se reproduit : quatre outils de lecture, et le codeur qui renvoie les tests à l’orchestrateur.
::
:::
:::::

---
section: 2.3 · La délégation
---

# Le tour de boucle, à la main :Hint[Vous êtes l’orchestrateur]

::Stack{fill center}
<LoopMap />
::

::::Cols{cols=3 gap=5 .mt-4}
::Note{tag="/step"}
`/step <agent> <instruction>` lance l’agent sur votre texte et la sortie du pas précédent.
::
::Note{tag="console"}
La réponse s’écrit dans la transcription **sans entrer** dans le contexte du modèle : c’est vous qui décidez.
::
::Note{tag="/quote"}
Fait entrer le dernier résultat dans le contexte, quand il y a quelque chose à discuter.
::
::::

---
section: 2.3 · La délégation
---

# Les six étapes

::::Cols{cols="3fr 2fr" gap=8 fill}
:::Stack{gap=2 center}
::Bullet{size=sm k="1" accent}
`/step explorer traite le ticket #2 d’ISSUES.md` rend la note d’impact
::
::Bullet{size=sm k="2" accent}
Vous la lisez, puis `/step planner` la reçoit avec le ticket et rend le plan
::
::Bullet{size=sm k="3" accent}
`/step coder` : dictez-lui **le pas 1 et rien d’autre**. Le diff est dans l’arbre
::
::Bullet{size=sm k="4"}
Vous lancez **`npm test` vous-même**, dans un second terminal
::
::Bullet{size=sm k="5"}
`/step reviewer` : collez le ticket, le pas, `git diff` et la sortie des tests
::
::Bullet{size=sm k="6"}
Pas suivant, retour au coder, ou retour au planner : `/step --from <id>`
::
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="/chain" tone=teal size=sm}
Liste les pas parcourus, `/chain reset` repart de zéro. L’ordre des étapes est déjà tenu par l’outil.
::
::Card{variant=accent eyebrow="Votre journal" size=sm}
Notez ce que `/chain` ne voit pas : **vos décisions** entre deux pas, et sur quel critère. C’est la liste de ce que l’orchestrateur du module suivant devra savoir faire.
::
:::
::::

---
section: 2.3 · La délégation
---

# Exercices : la boucle, la fenêtre, la trace

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{variant=accent eyebrow="En salle · la boucle" size=sm}
Jusqu’au premier `APPROVED` : le pas 1 livré, testé et relu.

Si le reviewer refuse, jouez le refus jusqu’au bout : c’est la moitié la plus instructive, il faut décider à qui renvoyer le verdict.

::Detail
Critère final : fonction pure, au moins deux tests neufs, exports intacts, `npm test` vert.
::
:::
:::Card{variant=accent eyebrow="En salle · la fenêtre" size=sm}
Après la note de l’explorer, `/session` : votre cadre, l’appel d’outil, la note.

Puis une session neuve **sans** l’extension qui produit la même note elle-même. Comparez les `/session` et les `\tree` : chaque fichier lu y reste jusqu’à la fin.
:::
:::Card{variant=accent eyebrow="En salle · la trace" size=sm}
`\export` de la session principale : retrouvez chaque appel de `subagent`, avec le nom de l’agent, la portée, le modèle et la tâche transmise.

::Detail
La seule réponse fiable à « qui a tourné ? », si vous n’avez pas suivi dans herdr.
::
:::
::::

::Note{tag="Pas de matrice" .mt-5}
Ce module montre la mécanique, il n’affirme pas que le découpage corrige mieux le ticket qu’un agent seul. C’est une question de mesure.
::
:::::

---
section: 2.3 · La délégation
---

# Généraliser

::::Cols{cols=2 gap=5 fill content=center}
:::Item{variant=adv n=1}
Déléguer, c’est isoler un contexte
::Detail
Seule la conclusion revient. Si elle est aussi grosse que ce que le sous-agent a lu, rien n’est isolé.
::
:::
:::Item{variant=adv n=2}
La garantie vient de la panoplie
::Detail
Entre écrire une interdiction et retirer un outil, retirez l’outil : une absence se constate dans la configuration.
::
:::
:::Item{variant=adv n=3}
Un générateur ne s’évalue pas lui-même
::Detail
La valeur du relecteur tient à ce que son contexte ne contient pas. S’il corrige, il la détruit.
::
:::
:::Item{variant=adv n=4}
Un champ non déclaré est décidé ailleurs
::Detail
Sans `model:`, les réglages du jour ; sans `tools:`, la lecture seule. Qui décide quand le champ manque ?
::
:::
:::Item{variant=adv n=5}
Le découpage répartit le travail sans l’augmenter
::Detail
Un planner qui découpe trop gros reproduit le décrochage du module 2.1.
::
:::
:::Item{variant=adv n=6}
Automatiser une boucle demande de l’avoir tenue
::Detail
Votre journal dit ce que l’orchestrateur devra router, et sur quels critères.
::
:::
::::

---
section: 2.3 · La délégation
---

# Livrable

::::Cols{cols=5 gap=7 fill}
:::Cell{span=2}
::::Stack{gap=3}
:::Item{variant=role n=1}
**Les quatre agents**
:Detail[Versionnés, panoplie minimale, model: déclaré. Le module suivant les branche sans les modifier]
:::
:::Item{variant=role n=2 ghost}
**Le journal d’un tour de boucle**
:Detail[Trace exportée, diff du premier pas, sortie de npm test lue par le reviewer, vos décisions]
:::
:::Item{variant=role n=3}
**Les choix entre chaque étape**
:Detail[Ce que vous savez maintenant attendre de l’automatisation]
:::
::::
:::
:::Cell{span=3}
::::Stack{gap=4 fill}
::Card{variant=accent eyebrow="Critère de réussite" center}
Vous savez montrer, trace en main, quel agent a tourné à chaque étape, avec quels outils et quel modèle, et quelles actions vous refuseriez de refaire vingt fois.
::
::Card{variant=teal eyebrow="En autonomie" tone=teal size=sm}
Écrivez vos agents, ajoutez-leur des skills, prenez un modèle plus gros pour planifier et valider, et regardez ce qui change.
::
::::
:::
::::
