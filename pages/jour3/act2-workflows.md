---
layout: section
index: Acte 2 · Module 4 / 4
---

::SectionHead{eyebrow="Acte 2 · Module 4" num="2.4" detail="La boucle écrite dans un fichier"}
# Les workflows
::

::Agenda
- Reconnaître dans la boucle du module 2.3 les motifs d’un flux de travail
- Écrire cette boucle dans un fichier que Pi déroule seul
- Faire des tests le juge final, et choisir où l’humain garde la main
- Adapter ce fichier à ses propres besoins en quelques lignes
::

---
section: 2.4 · Les workflows
---

# Votre boucle était un graphe :Hint[Celle du module 2.3, tenue à la main]

::Stack{fill center}
<LoopMap />
::

::::Cols{cols=2 gap=6 .mt-4}
::Takeaway
Refaire ces gestes une fois est instructif. Vingt fois, c’est exactement ce qu’il faut automatiser.
::
::Note{tag="flow"}
Pour combo, un graphe de tâches en YAML et en markdown, posé à côté des agents, et déroulé **par le code** plutôt que par un modèle.
::
::::

---
section: 2.4 · Les workflows
---

# Cinq motifs :Hint[Building Effective Agents, Anthropic]{href="https://www.anthropic.com/engineering/building-effective-agents"}

::Stack{fill center}
<Motifs />
::

::Note{.mt-4}
On les retrouve dans la plupart des systèmes multi-agents. Dans un flow, fan-out et boucle ont leur propre nœud ; les autres se composent en mettant des nœuds bout à bout.
::

---
section: 2.4 · Les workflows
---

# Un flow : votre boucle dans un fichier

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=2 .code-sm}
:Eyebrow[.pi/flows/impact-plan.md]{tone=quiet code}

```md
---
name: impact-plan
description: La note d'impact, puis le plan
input: string
nodes:
  - id: note
    agent: explorer
    reads: [input]
  - id: plan
    agent: planner
    reads: [input, note]
---

## note
Rends la note d'impact du ticket désigné sous `input`.

## plan
Découpe le ticket désigné sous `input` en petits pas,
avec la note sous `note` comme carte.
```
:::
:::Stack{gap=4}
::Specs{w="4.5rem" raw}
- **En-tête** la structure : les nœuds, dans l’ordre, et ce que chacun lit
- **Corps** une section `## <id>` par nœud, la consigne de l’agent
- **reads** l’agent reçoit sa section et ces éléments, rien d’autre
::

::Note
Ce que vous faisiez en collant à la main le ticket, le pas et le diff dans le message du reviewer. Le fichier est vérifié en entier avant que le moindre modèle ne tourne.
::

::Card{variant=accent eyebrow="En salle" size=sm}
`pi install -l npm:@ai-for-dev/combo`, puis déposez ce fichier dans `.pi/flows/` et testez-le sur l’issue #2, en regardant les agents dans herdr.
::
:::
::::

---
section: 2.4 · Les workflows
---

# Ce que le flow remplace

:::Stack{fill center}
::Matrix{size=md left first="22rem"}
| au module 2.3 | dans le flow |
| --- | --- |
| `/step explorer`, et le tester à côté | un `parallel` de deux agents |
| le planner rend un plan en pas | un `agent` dont la sortie est une liste de pas |
| vous donnez un pas au coder, puis le suivant | un `map` sur cette liste, un pas après l’autre |
| vous lancez `npm test` | un `check` qui lance `.pi/checks/test.sh` |
| le verdict, et le retour au coder | une `loop` jusqu’à des tests verts et un reviewer qui approuve |
| le retour au planner | un second tour : l’auditeur relit tout, le planner replanifie ce qui reste |
| `/chain` et votre journal | `runs/<horodatage>/`, avec la trace de chaque agent |
::
:::

---
section: 2.4 · Les workflows
---

# Les tests ont le dernier mot

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Lead
Demander dans le prompt de lancer les tests ne donne aucune certitude. Le nœud `check` lance **un script de votre projet**, et son résultat est une valeur que la boucle lit.
::

```yaml
- id: step
  loop: tests.output.passed && review.output.approved
  max: 3
  do:
    - id: code
      agent: coder
    - id: tests
      check: .pi/checks/test.sh
    - id: review
      agent: reviewer
```
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="Le coder sait ce qu’il doit faire" size=sm}
Code faux, ou hors du cadre (un linter par exemple) : la boucle repart avec la sortie du script et l’avis du reviewer.
::
::Card{variant=accent eyebrow="Un plafond sur chaque boucle" size=sm}
Sans `max`, un modèle qui ne converge jamais tournerait jusqu’à épuisement du budget. combo vous dit quand la limite est atteinte.
::
::Card{variant=teal eyebrow="Mais" tone=teal size=sm}
Les tests ne vérifient que ce qu’ils contraignent : une suite verte ne prouve pas que le ticket est fait.
::
:::
::::

---
section: 2.4 · Les workflows
---

# Le flow du ticket #2 :Hint[Les six agents, sans les modifier]

::::Cols{cols="5fr 4fr" gap=8 fill align=center}
:::Cell{.code-xs}
```yaml
nodes:
  - id: survey                    # les deux lectures, en même temps
    parallel:
      impact: [{ id: note,  agent: explorer }]
      cases:  [{ id: cases, agent: tester }]
  - id: round                     # le retour au planner
    loop: suite.output.passed && audit.output.approved
    max: 2
    do:
      - id: plan
        agent: planner
        output: { steps: [{ text: string }] }
      - id: steps                 # un pas après l'autre
        map-from: plan.output.steps
        max: 6
        do:
          - id: step              # le retour au coder
            loop: tests.output.passed && review.output.approved
            max: 3
            on-fail: continue
            do: [code, tests, review]
      - id: suite
        check: .pi/checks/test.sh
      - id: audit
        agent: auditor
```
:::
:::Stack{gap=4}
::Card{eyebrow="Deux rôles de plus" size=sm}
Le **tester** dit quels tests existent et lesquels manquent. L’**auditeur** vérifie que tout le ticket est fait, là où le reviewer ne voit qu’un pas : ce qu’il soulève reste ouvert et relance un tour.
::
::Note{tag="Plafonds"}
Trois essais par pas, six pas, deux tours au plus.
::
::Note{tag="Contrat"}
Écrit dans la section du planner : la phase d’exploration peut l’occulter.
::
::Detail
Version condensée. Le flow complet, avec `retry`, `reads`, `ledger` et les consignes de chaque nœud, est dans le support écrit.
::
:::
::::

---
section: 2.4 · Les workflows
---

# Ce que les premiers runs ont appris

:::::Stack{fill center gap=5}
::::Cols{cols=2 gap=6}
:::Card{badge="1" title="retry: 1 sur chaque agent" center}
Au premier run réel, le planner a écrit un très bon plan… en texte libre, sans l’outil prévu, et le run s’est arrêté.
Un second essai, avec l’erreur nommée, a suffi.
:::
:::Card{badge="2" title="Une condition atteignable" center}
Un run a planifié un pas « écrire les tests rouges » seul, sans le code. La boucle exige une suite verte : le pas ne pouvait pas aboutir et a brûlé ses trois essais.
:::
::::

::Takeaway{.mt-6}
Quand une boucle ne converge pas, regardez d’abord si sa condition était atteignable. Chaque échec lu dans la trace devient une modification du flow.
::
:::::

---
section: 2.4 · Les workflows
---

# Exercice : lancer la boucle

::::Cols{cols=2 gap=7 fill}
:::Stack{gap=3 .code-sm}
```bash
cd /chemin/vers/neon
mkdir -p .pi/agents .pi/flows .pi/checks
cp /chemin/vers/hands-on-harness/scripts/agents/*.md .pi/agents/
# collez le flow dans .pi/flows/issue2.md
printf '#!/usr/bin/env bash\nnpm test\n' > .pi/checks/test.sh

printf '.pi/\nruns/\n' >> .gitignore
git add .gitignore && git commit -m "ignorer .pi et runs"

pi install -l git:github.com/AI-for-dev/combo
pi
```

```text
/flows                  les flows trouvés
/flows issue2           le plan, nœud par nœud
/run issue2 traite le ticket #2 d'ISSUES.md
/run resume             reprendre un run interrompu
```
:::
:::Stack{gap=3}
::Bullet{size=sm k="1" accent}
Au premier lancement, choisissez **Trust** : sans cela, Pi ne charge ni `.pi/` ni combo
::
::Bullet{size=sm k="2" accent}
Cassez le fichier exprès (`agent: codeur`) : `/flows` nomme le nœud et propose le bon nom
::
::Bullet{size=sm k="3" accent}
Lancez : Pi dessine le flow au-dessus de l’invite, la carte de remarque arrive après la note d’impact
::
::Card{variant=accent eyebrow="Ne vous contentez pas du verdict" size=sm .mt-2}
Refaites vos vérifications du module 2.3 : `npm test`, la liste des exports, `git diff` et la trace dans `runs/<horodatage>/`.
::
:::
::::

---
section: 2.4 · Les workflows
---

# Adapter : un arrêt avant le commit

::::Cols{cols=2 gap=8 fill align=center}
:::Cell{.code-sm}
```yaml
  - id: go
    ask: "Commiter ce changement ?"
    confirm: true
    default: false
    reads: [diff]

  - id: ship
    choice:
      - when: go.output.yes
        do:
          - id: message
            agent: committer
            reads: [input, diff]
          - id: commit
            commit: message
    default: []
```
:::
:::Stack{gap=4}
::Lead
Le flow s’arrête à l’audit et c’est vous qui commitez. Pour qu’il vous propose le commit : une question, un branchement, le commit.
::
::Specs{w="7.5rem" raw}
- **committer** livré avec combo, guidé par une section `## message`
- **commit** sur une branche propre au run, rien n’est poussé
- **default: false** sans personne devant l’écran, pas de commit
::
::Card{variant=soft eyebrow="Un choix de conception" size=sm}
Placez les arrêts humains là où une erreur coûte plus cher à défaire qu’à prévenir. Par exemple, une discussion sur le ticket pour enrichir le plan.
::
:::
::::

---
section: 2.4 · Les workflows
---

# Un flow devient une brique

::::Cols{cols=2 gap=8 fill align=center}
:::Cell{.code-sm}
```md
---
name: ticket
description: Le flow issue2 comme une brique, puis le commit
input: string
nodes:
  - id: work
    flow: issue2
    input: input
  - id: message
    agent: committer
    retry: 1
    reads: [input, diff]
  - id: commit
    commit: message
---

## message
Écris le message de commit du changement sous `diff`,
fait pour la demande sous `input`.
```
:::
:::Stack{gap=3}
:Eyebrow[Le reste suit la même logique]{tone=teal}

::Bullet{size=sm}
Un modèle plus gros pour le planner et l’auditeur : dans leurs fichiers d’agents
::
::Bullet{size=sm}
Un audit inutile sur un petit ticket : supprimez son nœud, simplifiez la condition du tour
::
::Bullet{size=sm}
Des pas indépendants en parallèle, chacun dans sa copie : `concurrency: 2` et `copies: true` sur le `map`
::
::Card{variant=teal eyebrow="En autonomie" tone=teal size=sm .mt-2}
Ajoutez l’arrêt avant le commit, puis une modification à vous. Quel geste répétiez-vous à la main, et quelle ligne l’écrirait ?
::
:::
::::

---
section: 2.4 · Les workflows
---

# Généraliser

::::Stack{fill gap=3 center}
:::Item{variant=goal n=1}
Automatiser une boucle demande de l’avoir tenue à la main
::Detail
Le flow est votre journal du module 2.3 réécrit : chaque ligne répond à une décision que vous avez prise.
::
:::
:::Item{variant=goal n=2 ghost}
Le harnais se construit par corrections successives
::Detail
Chaque échec lu dans la trace devient une modification du flux.
::
:::
:::Item{variant=goal n=3 ghost}
Une décision mérite son propre canal
::Detail
Tant qu’un verdict se lit dans de la prose, il dépend de la façon dont le modèle écrit `APPROVED`. Donnez-lui un outil pour répondre.
::
:::
:::Item{variant=goal n=4 ghost}
Les arrêts humains sont des choix de conception
::Detail
Là où une erreur coûte plus cher à défaire qu’à prévenir, et pas ailleurs.
::
:::
::::

---
section: 2.4 · Les workflows
---

# Livrable

::::Cols{cols=5 gap=7 fill}
:::Cell{span=2}
::::Stack{gap=3}
:::Item{variant=role n=1}
**Le flow et le script de tests**
::Detail
`.pi/flows/issue2.md` et `.pi/checks/test.sh`, versionnés avec vos agents, dans votre version
::
:::
:::Item{variant=role n=2 ghost}
**La trace d’un run complet**
::Detail
Le répertoire `runs/<horodatage>/` d’un `/run issue2` sur le ticket #2
::
:::
:::Item{variant=role n=3}
**La ligne « workflows » de la fiche**
:Detail[Effet mesuré, adopté ou non, pourquoi]
:::
::::
:::
:::Cell{span=3}
::Card{variant=accent eyebrow="Critère de réussite" center fill}
Vous savez dire, trace en main, pourquoi un run a abouti ou non : quel pas n’a pas convergé, si la suite était rouge, ce que l’auditeur a laissé ouvert.

:Rule

Et vous savez faire évoluer le flux pour qu’il suive votre façon de travailler.
::
:::
::::
