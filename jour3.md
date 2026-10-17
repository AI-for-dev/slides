---
theme: ./theme
title: Hooks, délégation, workflows, essaim et Pi Durable - IA4Dev 2026
info: |
  IA4Dev 2026 - ANF jour 3, octobre 2026
  Max Beligné (PUD-GA / MSH Alpes / UGA) · Loïc Gouarin (CMAP / CNRS / École polytechnique)
author: Max Beligné, Loïc Gouarin
colorSchema: auto
themeConfig:
  footer: IA4Dev 2026 · ANF jour 3
# Publié sous /slides/jour3/ : le 404.html de GitHub Pages est celui du jour 1,
# donc les liens profonds passent par le hash.
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
layout: cover
---

:::Cols{cols="1fr auto" align=start}
::CoverMeta
IA4Dev 2026 · ANF jour 3
::
::LogoBar{size=46}
::
:::

::CoverTitle{sub="Comprendre et construire son harnais" style="transform: translateY(-3rem)"}
# Hooks, délégation, workflows,<br />essaim et Pi Durable
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

# Le programme du jour :Hint[NÉON]{prefix="Fil rouge," href="https://github.com/AI-for-dev/neon"}

::::Stack{gap=1}
::Act{n=1 title="Les hooks"}
Déclencher du code à un moment défini de la boucle, de manière déterministe
::
::Act{n=2 title="La délégation"}
Découper le travail en sous-agents, et tenir la boucle à la main
::
::Act{n=3 title="Les workflows"}
La même boucle, écrite dans un fichier que Pi déroule seul
::
::Act{n=4 title="L’essaim"}
Faire débattre des agents sur un tableau commun, jusqu’à l’accord
::
::Act{n=5 title="Pi Durable"}
Faire survivre l’état d’exécution et les tâches au processus qui les porte
::
::::

::::Stack{gap=1 .mt-4}
::Note{tag="Version écrite"}
Les quatre premières parties suivent un module du cours :
[hooks](https://ai-for-dev.github.io/hands-on-harness/act2-hooks),
[délégation](https://ai-for-dev.github.io/hands-on-harness/act2-delegation),
[workflows](https://ai-for-dev.github.io/hands-on-harness/act2-workflows),
[essaim](https://ai-for-dev.github.io/hands-on-harness/act2-swarm)
::
::::

---
layout: section
index: Partie 1 / 5
---

::SectionHead{num="01" detail="Des événements déterministes"}
# Les hooks
::

::Agenda
- Pourquoi un hook, et où le brancher dans Pi
- Les moments de la boucle où intervenir
- Deux extensions pour NÉON : refuser, puis vérifier
- Hooks, consignes et sous-agents
::

---
section: Partie 1 · Les hooks
---

# Constats de la veille :Hint[module hooks]{prefix="Cours," href="https://ai-for-dev.github.io/hands-on-harness/act2-hooks"}

:::::Stack{fill center gap=7}
::::Cols{cols=2 gap=6 content=center}
:::Card{variant=soft eyebrow="Une consigne s’oublie" center}
Une règle dans `AGENTS.md` ou un skill que le modèle invoque seul peuvent être **ignorés** par l’agent : ils se perdent dans le contexte.
:::
:::Card{variant=soft eyebrow="Un rappel s’oublie aussi" tone=teal center}
Pour un traitement qu’on veut lancer à chaque fois, un skill qu’il faut invoquer soi-même n’est pas pratique : il faut **toujours y penser**.
:::
::::

::Takeaway
D’où l’intérêt des **hooks** : déclencher du code au moment voulu, de manière **déterministe**. L’agent ne peut pas l’ignorer, ce n’est pas du texte.
::
:::::

---
section: Partie 1 · Les hooks
---

# Où brancher un hook dans Pi ?

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Lead
Dans une **extension** : un fichier TypeScript que Pi charge directement, sans compilation. Un dossier avec un `index.ts` pour une extension plus grosse.
::
::Note{tag="Ailleurs"}
Claude Code passe par un fichier `settings.json` qui lance des scripts shell. Pi n’a pas d’équivalent : un hook y est une fonction enregistrée avec `pi.on(...)`.
::
:::

:::Stack{gap=3}
:Eyebrow[Rappel : le dossier fixe la portée]{tone=teal}

::Matrix{size=md left first="15rem"}
| emplacement | portée |
| --- | --- |
| `~/.pi/agent/extensions/` | toutes vos sessions, quel que soit le projet |
| `.pi/extensions/` | ce projet seulement, une fois le projet approuvé |
| `pi --extension ./bloque-env.ts` | cette session seulement, pratique pour tester |
::
:::
::::

---
section: Partie 1 · Les hooks
---

# Comment ça marche ? :Hint[Une extension qui empêche de lire le .env]

::::Cols{cols="1fr 1fr" gap=7 fill align=center}
:::Stack{gap=4 .code-xs}
```ts
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("tool_call", async (event) => {
    if (event.toolName === "read" && event.input.path.endsWith(".env")) {
      return { block: true, reason: "Lecture du fichier .env interdite" };
    }
  });
}
```

::Note
Même sans avoir jamais écrit de TypeScript, ce code se lit, à quelques explications près.
::
:::

:::Card{variant=soft eyebrow="Quelques explications" tone=teal size=sm}
::Specs{w="6.5rem" raw}
- **ExtensionAPI** l’API qui permet d’étendre Pi
- **pi.on(...)** écoute un événement et réagit quand il se produit
- **"tool_call"** l’agent s’apprête à appeler un outil, que décrivent `event.toolName` et `event.input`
- **block** l’outil n’est pas lancé, l’agent reçoit `reason` à la place du résultat
::

::Detail{.mt-3}
Attention : `.env.local` ou `.env.production` passent encore.
::
:::
::::

---
section: Partie 1 · Les hooks
---

# D’autres moments que l’appel d’outil

::::Cols{cols=3 gap=5 fill}
:::Card{eyebrow="Avant un travail" title="Préparer l’environnement" size=sm}
- `session_start` : lancer ce qui doit tourner pendant la session, `session_shutdown` pour l’arrêter
- `before_agent_start` : agir avant chaque exécution de l’agent
- `input` : intercepter le prompt, pour le laisser passer, le réécrire, ou le garder loin du modèle
:::

:::Card{eyebrow="Pendant un travail" title="Les garde-fous" tone=teal size=sm}
- `tool_call` : bloquer ou modifier un appel d’outil
- `tool_result` : réécrire le résultat, par exemple pour ajouter la sortie du linter après une édition
- `context` : transformer les messages envoyés au modèle
- `session_before_compact` : agir avant le compactage
:::

:::Card{variant=accent eyebrow="À la fin d’un travail" title="Tester et relancer" size=sm}
- `turn_end` : après chaque réponse
- `agent_before_settle` : dernier moment avant que l’agent s’arrête, on peut encore le relancer
- `agent_settled` : notification seulement, l’agent ne repart plus
:::
::::

::Note{tag="Liste non exhaustive" .mt-4}
Tous les événements sont détaillés dans le [module hooks](https://ai-for-dev.github.io/hands-on-harness/act2-hooks) du cours.
::

---
section: Partie 1 · Les hooks
---

# Complexifier le premier exemple

::::Cols{cols="2fr 3fr" gap=7 fill align=center}
:::Stack{gap=4}
::Lead
Objectif : retrouver le comportement de [`pi-permission-system`](https://www.npmjs.com/package/@gotgenes/pi-permission-system), vu hier, qui refuse des commandes interdites.
::

::Specs{w="5.5rem"}
- **Motif** une expression régulière cherchée dans la commande
- **Raison** ce que l’agent reçoit si sa commande correspond
::

::Note{tag="JSON"}
Les barres obliques inverses sont doublées : `\\.env(\\s|$)` se lit `\.env(\s|$)`, qui reconnaît `cat .env` sans bloquer `cat .env.example`.
::
:::

:::Stack{gap=2 .code-xs}
:Eyebrow[neon/.pi/forbidden-commands.json]{tone=quiet code}

```json
{
  "forbidden": [
    { "pattern": "rm -rf",
      "reason": "recursive deletion, ask the user to run it themselves." },
    { "pattern": "git push.*--force",
      "reason": "rewrites the remote history." },
    { "pattern": "\\.env(\\s|$)",
      "reason": "the .env file contains secrets." },
    { "pattern": "curl|wget",
      "reason": "no network requests from the shell." }
  ]
}
```
:::
::::

---
# V2 : testé en octobre 2026 avec un prompt écrit d’après cette slide et vérifié en conditions réelles : qwen-3.8-27b réussit 3 fois sur 3, gemma-4-31b 1 fois sur 5 (mauvais événement, champs d’API inventés)
section: Partie 1 · Les hooks
---

# Exercice : faites écrire le garde-fou par Pi

:::::Cols{cols="1.25fr 1fr" gap=6 fill}
::::Card{badge="1" title="Écrivez le prompt" size=sm}
Demandez à Pi de lire sa documentation et ses exemples d’extensions, puis d’écrire `.pi/extensions/command-guard.ts`. L’extension doit :

- comparer chaque commande que l’agent lance avec son outil `bash` aux règles de `.pi/forbidden-commands.json`, dont Pi lit le format dans le fichier ;
- si une règle correspond, bloquer la commande et renvoyer sa raison à l’agent ;
- relire le fichier à chaque commande, pour qu’une règle ajoutée s’applique sans redémarrer Pi ;
- tout bloquer si le fichier est absent ou illisible.

**À vous de trouver :** quel événement écouter, et que renvoyer pour refuser.
::::

::::Stack{gap=4}
:::Card{badge="2" title="Chargez l’extension" size=sm}
```bash
pi -e .pi/extensions/command-guard.ts
```
:::

:::Card{badge="3" title="Demandez à l’agent de lancer" size=sm}
::Matrix{size=sm left}
| commande | attendu |
| --- | --- |
| `rm -rf game/` | :Mark[refusée, avec la raison]{v=no} |
| `cat .env` | :Mark[refusée, avec la raison]{v=no} |
| `cat .env.example` | :Mark[exécutée]{v=yes} |
::
:::


::Bullet{size=sm k="4" accent}
**Changez de modèle et recommencez :** lesquels réussissent, lesquels échouent, et sur quoi ?
::
::::
:::::

---
section: Partie 1 · Les hooks
---

# Réalisation :Hint[neon/.pi/extensions/command-guard.ts]

::::Cols{cols="2fr 1fr" gap=6 fill align=center}
:::Cell{.code-xs}
```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isToolCallEventType, type ExtensionAPI } from "@earendil-works/pi-coding-agent";

const RULES_FILE = ".pi/forbidden-commands.json";

interface Rule {
  pattern: string;
  reason: string;
}

export default function (pi: ExtensionAPI) {
  pi.on("tool_call", async (event, ctx) => {
    if (!isToolCallEventType("bash", event)) return;
    // Re-read on every call: a new rule applies without restarting Pi.
    const text = readFileSync(join(ctx.cwd, RULES_FILE), "utf8");
    const rules: Rule[] = JSON.parse(text).forbidden;

    for (const rule of rules) {
      if (new RegExp(rule.pattern).test(event.input.command)) {
        return {
          block: true,
          reason: `Command refused by ${RULES_FILE}: ${rule.reason}`,
        };
      }
    }
  });
}
```
:::

:::Stack{gap=3}
::Lead
À chaque appel de `bash`, l’extension compare la commande à chaque règle. Si l’une correspond, elle bloque et dit pourquoi.
::
::Bullet{size=sm k="1"}
Les règles sont **relues à chaque appel** : on corrige le JSON sans redémarrer Pi.
::
::Bullet{size=sm k="2"}
Fichier absent ou invalide : le handler lève une exception, et Pi **bloque l’outil** par précaution plutôt que de tout laisser passer.
::
::Bullet{size=sm k="3"}
Seul `bash` est surveillé : les autres outils ne sont pas concernés.
::
:::
::::

---
section: Partie 1 · Les hooks
---

# Exercice : une règle et son angle mort

::Lead
Un refus observé ne prouve pas que tous les chemins vers la même action sont bloqués.
::

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=2}
:Eyebrow[En salle]{tone=accent}

::Bullet{size=sm k="1" accent}
**Lancer avec l’extension** : `pi -e .pi/extensions/command-guard.ts`
::
::Bullet{size=sm k="2" accent}
**Provoquer un refus** : demander d’effacer `game/`, puis un `cat .env` via `bash`
::
::Bullet{size=sm k="3" accent}
**Modifier la règle à chaud** : interdire aussi `npm install`, sans redémarrer Pi
::
::Bullet{size=sm k="4" accent}
**Chercher un autre chemin** : essayer l’outil `read` sur `.env`, puis étendre le hook
::
:::

:::Stack{gap=4}
::Card{variant=accent eyebrow="Angle mort · bash ≠ read" size=sm}
Bloquer `cat .env` dans `bash` ne bloque pas `read(".env")`.
::
::Card{variant=teal eyebrow="Limite · une regex ne comprend pas le shell" tone=teal size=sm}
Une règle sur `rm -rf` laisse passer `rm -r -f` ou `rm -fr`, et `find -delete` efface sans jamais écrire `rm`.

:Rule

Le bac à sable reste la couche qui tient quand l’agent trouve un chemin imprévu.
::
:::
::::

---
section: Partie 1 · Les hooks
---

# Tester avant de rendre la main :Hint[.pi/extensions/final-checks.ts]

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
::Criterion{n=1 title="Observer · tool_result"}
Après un `edit` ou un `write` : `codeChanged = true`.
::
::Criterion{n=2 title="Attendre · agent_before_settle"}
Seulement si le code a changé et que l’agent a fini normalement (`outcome` vaut `completed`).
::
::Criterion{n=3 title="Vérifier · npm test"}
Commande lancée **par le harnais** via `pi.exec`, pas par le modèle.
::
::::

::::Cols{cols=2 gap=5}
::Card{variant=teal eyebrow="Tests verts" tone=teal size=sm}
« Checks: OK » s’affiche et la main vous revient.
::
::Card{variant=accent eyebrow="Tests rouges" size=sm}
La sortie de l’échec revient au modèle avec `continue: true` : l’agent reprend le travail.
::
::::

::::Cols{cols=2 gap=5}
::Note{tag="MAX_RETRIES = 3"}
Pi ne limite pas les continuations : sans compteur, la relance tourne en boucle.
::
::Note{tag="3 000 caractères"}
Les derniers de la sortie : ce qui revient au modèle se paie en tokens.
::
::::
:::::

---
# V2 : testé en octobre 2026 de la même façon : qwen-3.8-27b réussit 2 fois sur 3, gemma-4-31b 3 fois sur 5 (échecs : continue sans message, API inventée, message envoyé pendant que l’agent travaille)
section: Partie 1 · Les hooks
---

# Exercice : faites écrire la vérification par Pi

:::::Cols{cols="1.25fr 1fr" gap=6 fill}
::::Card{badge="1" title="Écrivez le prompt" size=sm}
Partez des trois étapes de la slide précédente. Demandez à Pi de lire sa documentation et ses exemples d’extensions, d’écrire `.pi/extensions/final-checks.ts`, puis de vérifier qu’elle se charge. Quand l’agent s’apprête à rendre la main, l’extension doit :

- lancer `npm test`, seulement s’il a modifié des fichiers et n’a pas été interrompu ;
- si les tests passent, afficher « Checks: OK » et rendre la main ;
- sinon, relancer l’agent avec la fin de la sortie et la consigne de corriger le code, pas les tests ;
- après trois relances, afficher un avertissement et rendre la main.

**À vous de trouver :** comment savoir que du code a changé, et comment relancer l’agent.
::::

::::Stack{gap=4}
:::Card{badge="2" title="Chargez l’extension" size=sm}
```bash
pi -e .pi/extensions/final-checks.ts
```
:::

:::Card{badge="3" title="Demandez à l’agent" size=sm}
::Matrix{size=sm left}
| demande | attendu |
| --- | --- |
| « Que fait `collides` ? » | aucun test lancé |
| « Renomme `collides` en `intersects` » | tests lancés, relance s’ils échouent |
::
:::


::Bullet{size=sm k="4" accent}
**Changez de modèle et recommencez :** lesquels réussissent, lesquels échouent, et sur quoi ?
::
::::
:::::

---
# V2 : exercice refait d’après nos essais d’octobre 2026 (gemma-4-31b, qwen-3.8-27b sur ILaaS) : aucun n’atteint les trois relances, l’agent remet un alias dès la première
section: Partie 1 · Les hooks
---

# Exercice : la consigne du hook contre la vôtre

:::::Cols{cols=2 gap=7 fill}
::::Stack{gap=3}
:::Cell{.code-sm}
```bash
pi -e .pi/extensions/command-guard.ts \
   -e .pi/extensions/final-checks.ts
```
:::

::Bullet{size=sm k="1" accent}
Demandez de renommer `collides` en `intersects` dans `game/neon.js` et de **supprimer** `collides`, sans alias, **sans toucher** à `game/neon.test.js`
::
::Bullet{size=sm k="2" accent}
Les tests importent `collides` et échouent : l’extension relance l’agent avec « Fix the code (not the tests) »
::
::Bullet{size=sm k="3" accent}
Regardez ce que fait l’agent après la relance : quelle consigne a-t-il suivie ?
::
::::

::::Stack{gap=4}
::Card{variant=accent eyebrow="Ce que nous avons observé" center}
Avec gemma-4-31b et qwen-3.8-27b, l’agent respecte « ne touche pas au test » mais remet un alias `collides` dès la première relance, alors que vous l’aviez interdit. Les tests repassent au vert.
::
::Takeaway
Le message d’un hook est une consigne comme une autre, et il arrive **en dernier**. Un garde-fou fait respecter ce qu’il vérifie (des tests verts), pas ce que vous avez demandé.
::
::Detail
Le code complet de `final-checks.ts` est dans le [module hooks](https://ai-for-dev.github.io/hands-on-harness/act2-hooks).
::
::::
:::::

---
section: Partie 1 · Les hooks
---

# Où se placent les hooks ? :Hint[Birgitta Böckeler]{prefix="Harness engineering for coding agent users," href="https://martinfowler.com/articles/harness-engineering.html"}

::Lead
Deux questions : **à quel moment** agir, et peut-on **vérifier la règle par du code** ?
::

::::Cols{cols=4 gap=4 fill content=center}
:::Card{eyebrow="Avant l’action" title="Guide calculé" size=sm}
**Bloquer l’action** : la règle se vérifie par du code.

::Detail
`tool_call`, comme `command-guard.ts`
::
:::
:::Card{variant=soft eyebrow="Avant l’action" title="Guide inférentiel" size=sm}
**Orienter le modèle** : la règle demande un jugement.

::Detail
`AGENTS.md` ou skills
::
:::
:::Card{eyebrow="Après le travail" title="Capteur calculé" tone=teal size=sm}
**Tester et corriger** : le résultat se vérifie par du code.

::Detail
`agent_before_settle`, comme `final-checks.ts`
::
:::
:::Card{variant=soft eyebrow="Après le travail" title="Capteur inférentiel" tone=teal size=sm}
**Évaluer la qualité** : le résultat demande un jugement.

::Detail
Revue par un LLM
::
:::
::::

::::Cols{cols=2 gap=5 .mt-5}
::Note{tag="Hooks"}
Contrôler l’exécution : quand intervenir, que vérifier, que bloquer ?
::
::Note{tag="Sous-agents"}
Organiser le travail : à qui déléguer, avec quel contexte, quelle spécialisation ?
::
::::

---
section: Partie 1 · Les hooks
---

# Un hook ou un sous-agent ? :Hint[L’exemple de final-checks.ts]

:::::Stack{fill center gap=6}
::::Cols{cols=2 gap=6}
:::Card{eyebrow="Avec un hook" title="Des tests, et une limite"}
Après une modification, le hook lance `npm test`. Si les tests échouent, l’agent doit corriger.

::Detail
Des tests verts ne disent pas si le code est bien conçu, lisible ou maintenable.
::
:::
:::Card{eyebrow="Avec un sous-agent" title="Un jugement à part" tone=teal}
On délègue une revue de code à un sous-agent spécialisé, puis l’agent principal exploite son retour.
:::
::::

::Takeaway
Le gros avantage du sous-agent : **son contexte est indépendant** de celui de l’agent principal. Il reçoit une tâche, travaille et ne renvoie que sa conclusion, si bien que la fenêtre principale se remplit beaucoup moins vite.
::
:::::

---
layout: section
index: Partie 2 / 5
---

::SectionHead{num="02" detail="Découper le travail en sous-agents"}
# La délégation
::

::Agenda
- Ce qu’un sous-agent reçoit, et ce qui en revient
- combo et l’anatomie d’un agent
- Quatre rôles, chacun limité par ses outils
- La boucle des quatre rôles, tenue à la main
::

---
section: Partie 2 · La délégation
---

# Pi, agents, sous-agents et skills :Hint[module délégation]{prefix="Cours," href="https://ai-for-dev.github.io/hands-on-harness/act2-delegation"}

:::::Stack{fill center gap=6}
::::Cols{cols=3 gap=5}
::Criterion{n=1 title="Pi, le harnais"}
Le logiciel qui exécute les sessions, donne accès aux modèles et expose outils et extensions.
::
::Criterion{n=2 title="L’agent principal"}
Votre session Pi interactive, avec ses instructions, son contexte de travail, ses outils et éventuellement ses skills.
::
::Criterion{n=3 title="Un sous-agent"}
Une session distincte, ouverte pour une tâche, avec son prompt, son modèle, ses outils et éventuellement ses skills.
::
::::

::Takeaway
Un sous-agent part d’une fenêtre **vide**. Il reçoit une tâche en texte et ne renvoie que sa conclusion : ses lectures, ses appels d’outils et son raisonnement disparaissent avec lui.
::
:::::

---
section: Partie 2 · La délégation
---

# Quatre avantages de la délégation

::::Cols{cols=2 gap=5 fill content=center}
:::Card{badge="1" title="Isoler le contexte" size=sm}
Établir quels fichiers touche un ticket demande d’en lire une dizaine, alors que la note qui en résulte tient en trente lignes. Faite dans la session principale, les dix fichiers restent dans votre fenêtre jusqu’à la fin. Déléguée, **seule la note y entre**.
:::
:::Card{badge="2" title="Restreindre les outils" size=sm}
Un sous-agent sans outil d’écriture ne peut pas écrire, quelle que soit la consigne. Un skill peut seulement le **demander** : Pi ignore son champ `allowed-tools`.
:::
:::Card{badge="3" badgeTone=teal title="Séparer générateur et évaluateur" size=sm}
Un modèle qui relit son code relit ses intentions. Un relecteur neuf ne connaît que le ticket, le plan et le diff.
:::
:::Card{badge="4" badgeTone=teal title="Préparer l’orchestration" size=sm}
Aujourd’hui, délégation manuelle : **c’est vous l’orchestrateur**. La partie suivante automatise cette boucle dans un workflow.
:::
::::

---
section: Partie 2 · La délégation
---

# Quelques extensions existantes

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=2}
::Bullet{size=sm k="pi-delegator" badge=tag}
Délégation simple
::
::Bullet{size=sm k="subagent" badge=tag}
[L’exemple du dépôt de Pi](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/subagent) : single, parallel et chain, un processus `pi` par sous-agent
::
::Bullet{size=sm k="pi-subagents" badge=tag}
[Coordination](https://github.com/nicobailon/pi-subagents), agents prêts à l’emploi, tâches en arrière-plan
::
::Bullet{size=sm k="pi-dynamic-workflow" badge=tag}
Scripts de workflow générés à la demande
::
::Bullet{size=sm k="pi-envoy" badge=tag}
[Gouvernance](https://github.com/jmnargi/pi-envoy) : un contrat de délégation par enfant, budgets, tableau de bord
::
:::

:::Stack{gap=4}
::Card{variant=soft eyebrow="Loin d’être exhaustif" tone=teal size=sm}
- la collaboration : `pi-orchestration`, `pi-messenger`, `pi-agent-teams`
- les motifs d’orchestration : `pi-flows`
::
::Note{tag="Annexe"}
Une comparaison avec combo, l’outil de cette formation, en fin de deck.
::
:::
::::

---
section: Partie 2 · La délégation
---

# L’outil combo :Hint[github.com/AI-for-dev/combo]{href="https://github.com/AI-for-dev/combo"}

::::Cols{cols=2 gap=7 fill align=center}
:::Card{variant=accent eyebrow="Écrit pour cette formation"}
Une bibliothèque au-dessus du SDK de Pi : un fichier markdown devient un agent, les agents se composent en workflows.

:Rule

Un volet [herdr](https://herdr.dev) par sous-agent, le temps et les tokens de chacun, un export HTML et JSONL.
:::

:::Stack{gap=4}
::Card{variant=soft eyebrow="L’extension" tone=teal size=sm}
Chargée avec `-e` ou installée dans le projet, elle ajoute un outil `subagent` que le modèle principal appelle, au même titre que `read` ou `edit`.
::
::Note{tag="Attention"}
Pas une bibliothèque de production. Conçue pour la pédagogie : orchestration manuelle ici, automatisation dans la partie suivante.
::
::Note{tag="Ailleurs"}
Pour une chaîne dont vous dépendez, partez plutôt de `subagent`, `pi-subagents` ou `pi-envoy`. Ce qu’on établit ici s’y transpose.
::
:::
::::

---
section: Partie 2 · La délégation
---

# L’anatomie d’un sous-agent :Hint[champs détaillés dans la doc de combo]{href="https://github.com/AI-for-dev/combo/blob/main/docs/guide/agents.md"}

:::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3 .code-sm}
:Eyebrow[neon/.pi/agents/reader.md]{tone=quiet code}

```markdown
---
name: reader
description: Reads one file and reports what it exports
tools: read
model: ilaas/gemma-4-31b
---

You read the file you are given and list its
exported symbols, one per line, with the line
number. Nothing else.
```

::Note
Un **en-tête YAML**, puis un **corps** qui devient le prompt système du sous-agent : il est lu à coup sûr, là où un skill peut ne jamais être ouvert.
::
::Note{tag="Portable"}
Le même format sert dans Claude Code, Codex, OpenCode ou Cursor. Les champs propres à combo y sont ignorés.
::
:::

::::Stack{gap=3}
:::Card{variant=soft eyebrow="Le format des agents de Pi" tone=teal size=sm}
::Specs{w="6.4rem" raw}
- **name** obligatoire : sans lui, le fichier est ignoré
- **description** obligatoire, une ligne : à quoi sert l’agent
- **tools** la panoplie
- **model** absent, les réglages de Pi du jour
::
:::

:::Card{variant=accent eyebrow="Ce que combo ajoute" size=sm}
::Specs{w="6.4rem" raw}
- **tools** absent : `read, grep, find, ls` (avec Pi seul : tous ses outils)
- **skills** absent, aucun. Il faut `read` dans la panoplie pour les lire
- **lifetime** `task` (défaut) ou `workflow`
::
:::

::::
:::::

---
# V2 : la portée n’est plus à préciser depuis combo 0.5.0 ; l’ordre de résolution des agents et du modèle vient du cours
section: Partie 2 · La délégation
---

# Trois points avant de lancer

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{badge="1" title="Le projet l’emporte"}
combo charge les agents du projet (`.pi/agents/`), les vôtres (`~/.pi/agent/agents/`) et les siens. À nom égal, **celui du projet gagne**.

:Rule

Ce sont des fichiers du dépôt cloné : lisez-les avant de répondre `Trust`. `/agents` liste ce qui est chargé.
:::
:::Card{badge="2" title="Le modèle n’est jamais hérité"}
Il vient de l’appel, à défaut du fichier de pipeline, à défaut de l’en-tête de l’agent, et en dernier recours de `~/.pi/agent/settings.json`.

:Rule

Le plus proche du travail l’emporte.
:::
:::Card{badge="3" badgeTone=teal title="Voir les agents travailler"}
Lancez Pi dans herdr, puis `/herdr on` : chaque sous-agent ouvre son volet, qui se referme quand il a fini.

:Rule

Plus agréable que la trace après coup.
:::
::::

::Note{tag="combo ≥ 0.5.0"}
Les versions antérieures ne chargeaient les agents du projet que si l’appel précisait la portée. `pi update npm:@ai-for-dev/combo` met à jour.
::
:::::

---
section: Partie 2 · La délégation
---

# La tâche : l’issue #2 de NÉON

::::Cols{cols=2 gap=8 fill}
:::Stack{gap=4}
::Lead
Dans `frame()`, la détection des collisions, le score et l’affichage sont entremêlés : la collision n’est pas testable isolément.
::
::Card{variant=accent eyebrow="Sortie attendue" size=sm}
Une fonction **pure**, extraite de `frame()`, couverte par des tests neufs, sans qu’aucun export de `game/neon.js` ne change de nom ni de signature.
::
::Note{tag="Livrables"}
Ceux des quatre sous-agents : note d’impact, plan découpé, diff et verdict.
::
:::
:::Stack{gap=4 center}
:Eyebrow[C’est vous qui orchestrez la boucle]{tone=teal}

::Bullet{size=sm k="1"}
**Cadre** : seuls `game/neon.js` et `game/neon.test.js` changent, et la suite finit verte.
::
::Bullet{size=sm k="2"}
**Vigilance** : la lenteur alléguée par le ticket n’est pas mesurée. C’est une phrase du mainteneur, pas un chiffre.
::
:::
::::

---
# V2 : le reviewer a l’outil verdict (cours à jour)
section: Partie 2 · La délégation
---

# Quatre rôles, quatre panoplies :Hint[hands-on-harness/scripts/agents/]{href="https://github.com/AI-for-dev/hands-on-harness/tree/main/scripts/agents"}

::Matrix{size=md left first="8rem"}
| agent | livrable | panoplie | ce que sa panoplie lui interdit |
| --- | --- | --- | --- |
| `explorer` | une note d’impact factuelle | `read, grep, find, ls` | modifier quoi que ce soit |
| `planner` | un plan en petits pas testables | `read, grep, find, ls` | modifier quoi que ce soit |
| `coder` | le code et le test d’**un** pas | `read, grep, find, ls, edit, write` | lancer une commande |
| `reviewer` | `APPROVED` ou `CHANGES REQUESTED`, motivé | `read, grep, find, ls, verdict` | corriger ce qu’il relit |
::

:::::Stack{fill center gap=5}
::::Cols{cols=4 gap=4 .mt-5}
::Card{variant=soft title="Observer, pas conseiller" size=xs}
Vérifie dans le code ce qu’affirme le ticket, sans proposer de correction.
::
::Card{variant=soft title="Découper, pas coder" size=xs}
Chaque pas tient dans une invocation du coder et commence par un test rouge. « Si tu hésites, découpe. »
::
::Card{variant=soft title="Écrire, pas exécuter" size=xs}
Implémente le pas, sans lancer les tests ni prétendre l’avoir fait.
::
::Card{variant=soft title="Vérifier, pas corriger" size=xs}
Relit le code du dépôt, pas le rapport du coder. Rend sa décision avec l’outil `verdict`.
::
::::
:::::

---
# V2 : plus de scope à préciser dans le prompt (combo ≥ 0.5.0)
section: Partie 2 · La délégation
---

# Exercice : chaque agent énonce sa garantie

:::::Cols{cols=2 gap=7 fill}
::::Stack{gap=3}
:::Cell{.code-xs}
```bash
cd /chemin/vers/neon     # ou le workspace neon dans herdr
pi install -l npm:@ai-for-dev/combo
mkdir -p .pi/agents
cp /chemin/vers/hands-on-harness/scripts/agents/*.md .pi/agents/
pi
```
:::

::Card{variant=accent eyebrow="En salle" size=sm}
Pas de commande dédiée : `subagent` est un outil. Nommez l’agent et la tâche, le modèle principal l’appelle. Le modèle se précise aussi (« avec le modèle qwen-3.8-27b d’ilaas »), s’il est déclaré dans `models.json`.
::
::::
:::Stack{gap=4}
::Card{eyebrow="explorer" size=sm}
<p class="mono muted" style="font-size:0.68rem;line-height:1.45">utilise le subagent "explorer" pour la tâche "Nomme exactement les outils dont tu disposes."</p>

« Je dispose des outils suivants : `read`, `grep`, `find`, `ls`. »
::
::Card{eyebrow="coder" size=sm}
<p class="mono muted" style="font-size:0.68rem;line-height:1.45">utilise le subagent "coder" pour la tâche "Lance npm test et rapporte le résultat."</p>

« Le subagent "coder" indique qu’il ne dispose pas d’un outil lui permettant d’exécuter des commandes shell, et ne peut donc pas lancer npm test. »
::
::Note{tag="Piège"}
La session principale a `bash` et lance parfois `npm test` elle-même. L’appel `bash` qui suit la ligne `subagent` le montre : ce n’est pas le coder.
::
:::
:::::

---
section: Partie 2 · La délégation
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
La réponse s’écrit dans la transcription **sans entrer** dans le contexte du modèle : c’est vous qui décidez.
::
::Note{tag="/quote"}
Fait entrer le dernier résultat dans le contexte, quand il y a quelque chose à discuter.
::
::::

---
# V2 : étapes 2, 3 et 5 alignées sur le cours (ticket retapé, --from none, ce qu’on colle au reviewer)
section: Partie 2 · La délégation
---

# La boucle en six étapes

::::Stack{fill center gap=2}
::Bullet{size=sm k="1" accent}
`/step explorer traite le ticket #2 d’ISSUES.md` rend la note d’impact
::
::Bullet{size=sm k="2"}
Vous la lisez, puis `/step planner découpe le ticket #2 d’ISSUES.md en pas, à partir de cette note`
::
::Bullet{size=sm k="3" accent}
`/step --from none coder`, suivi du pas 1 recopié du plan : sans `--from none`, il recevrait **le plan entier**
::
::Bullet{size=sm k="4"}
Vous lancez **`npm test` vous-même**, dans un second terminal, et vous gardez la sortie
::
::Bullet{size=sm k="5" accent}
`/step reviewer` : collez le ticket, le pas, `git diff` et la sortie des tests
::
::Bullet{size=sm k="6"}
Vous décidez : pas suivant, retour au coder, ou retour au planner avec `/step --from <id>`
::
::::

::::Cols{cols=3 gap=5 .mt-4}
::Note{tag="Retapez le ticket"}
`/step` ne transmet que la sortie du pas précédent.
::
::Note{tag="/chain"}
La trace des étapes et leur dossier d’export. `/chain reset` repart de zéro.
::
::Note{tag="Votre journal"}
Ce que `/chain` ne voit pas : **vos décisions**, et sur quel critère.
::
::::

---
# V2 : arborescence et usage.json relevés sur un vrai /step explorer (NÉON, combo 0.6.0, gemma-4-31b sur ILaaS, 14 octobre 2026) ; snapshot.json et journal.jsonl d’après la doc de combo
section: Partie 2 · La délégation
---

# Lire la trace de combo :Hint[doc de combo, Export]{href="https://github.com/AI-for-dev/combo/blob/main/docs/guide/export.md"}

:::::Cols{cols="5fr 4fr" gap=7 fill}
::::Stack{gap=2 .code-xs}
:Eyebrow[neon/runs/, après deux /step]{tone=quiet code}

```text
runs/
├── .gitignore              ignore tout : rien n’entre dans git
└── 2026-10-14_12-42-14/    une chaîne de /step
    ├── 1-explorer/
    │   ├── explorer-1.html  la session, dans un navigateur
    │   ├── explorer-1.jsonl la même, rejouable
    │   └── usage.json       temps, outils, tokens
    ├── 2-planner/  …
    └── chain.md             écrit par /chain export
```

:Eyebrow[1-explorer/usage.json, extrait]{tone=quiet code}

```json
"agent": "explorer",  "model": "ilaas/gemma-4-31b",
"wallMs": 49393,      "toolCalls": 6,
"input": 35591,       "output": 4983,
"contextTokens": 10961,  "cost": 0
```
::::

::::Stack{gap=4}
::Specs{w="7.6rem" raw}
- **pendant** une ligne par sous-agent au-dessus du prompt : état, modèle, tokens envoyés et reçus, durée
- **/chain** les pas, ce que chacun a transmis, leur dossier
- **/chain export** `chain.md` : chaque pas, sa demande, sa réponse, son coût, les liens vers les sessions
- **/run** un flow ajoute `snapshot.json` (le flow et les agents tels que lus) et `journal.jsonl` (un fait par ligne)
::

::Note{tag="cost: 0"}
ILaaS ne rapporte pas de coût : ce 0 veut dire non rapporté, pas gratuit.
::
::Note{tag="/export"}
Il ne voit rien d’une boucle faite de `/step` : la trace est dans `runs/`.
::
::::
:::::

---
# V2 : /session reste vide avec /step ; la session de comparaison se lance avec pi -ne ; la trace passe par /chain et runs/<date>/, /export ne voit rien après des /step
section: Partie 2 · La délégation
---

# Exercices : la boucle, la fenêtre, la trace

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{variant=accent eyebrow="01 · La boucle" title="Décider du prochain pas" size=sm}
Menez le pas 1 jusqu’au premier `APPROVED`. En cas de refus, renvoyez au coder ou au planner, et notez pourquoi.

::Detail
À montrer : diff du pas 1, sortie de `npm test`, verdict et décision motivée.
::
:::
:::Card{variant=accent eyebrow="02 · La fenêtre" title="Comparer contextes et tokens" size=sm}
Après la note de l’explorer, `/session` : **aucun message**. Refaites la même note dans une session neuve sans combo (`pi -ne`). Comparez les `/session`, puis les tokens de la session directe et ceux du `usage.json` du pas.

::Detail
Notre essai, avec gemma-4-31b : délégué, 36 k tokens envoyés et rien dans votre fenêtre ; direct, 10 k envoyés et 6 k qui y restent.
::
:::
:::Card{variant=accent eyebrow="03 · La trace" title="Prouver qui a tourné" size=sm}
`/chain` donne le dossier `runs/<date>/`. Ouvrez la session HTML du reviewer : quels fichiers a-t-il lus, avec quel modèle, en combien d’appels d’outils ?

::Detail
À montrer : le dossier du pas et sa ligne dans `usage.json`.
::
:::
::::

::Note{tag="À conserver" .mt-5}
Le dossier `runs/<date>/` · le diff du pas 1 · la sortie des tests · le journal de vos décisions
::
:::::

---
section: Partie 2 · La délégation
---

# Généraliser

::::Cols{cols=2 gap=5 fill content=center}
:::Item{variant=adv n=1}
Déléguer, c’est isoler un contexte
::Detail
Le sous-agent travaille dans son propre contexte : seule sa conclusion revient, pas ses lectures. Si elle est aussi grosse que ce qu’il a lu, rien n’est isolé.
::
:::
:::Item{variant=adv n=2}
Les outils garantissent les limites
::Detail
Retirer une capacité est plus fiable que l’interdire par prompt. Sans shell, le coder ne peut pas lancer les tests.
::
:::
:::Item{variant=adv n=3}
Séparer production et évaluation
::Detail
Le reviewer juge le code dans un contexte neuf. Il signale les erreurs, mais ne les corrige pas.
::
:::
:::Item{variant=adv n=4}
Tout champ omis a une valeur par défaut
::Detail
Sans `model:`, les réglages du jour. Sans `tools:`, la lecture seule. Sans `name`, l’agent n’est pas chargé.
::
:::
:::Item{variant=adv n=5}
Découper pour rendre le travail maîtrisable
::Detail
Chaque pas tient dans une invocation du coder et commence par un test rouge. Sinon, découpez davantage.
::
:::
:::Item{variant=adv n=6}
Piloter avant d’automatiser
::Detail
Tenir la boucle à la main fait apparaître les décisions, les critères et les retours à automatiser.
::
:::
::::

---
layout: section
index: Partie 3 / 5
---

::SectionHead{num="03" detail="La boucle écrite dans un fichier"}
# Les workflows
::

::Agenda
- Reconnaître dans la boucle les motifs d’un flux de travail
- Écrire cette boucle dans un fichier que Pi déroule seul
- Faire des tests le juge final, et choisir où l’humain garde la main
- Adapter ce fichier à ses besoins en quelques lignes
- Retrouver ces briques dans Claude Code, Codex et OpenCode
::

---
section: Partie 3 · Les workflows
---

# Votre boucle est un graphe :Hint[module workflows]{prefix="Cours," href="https://ai-for-dev.github.io/hands-on-harness/act2-workflows"}

::Stack{fill center}
<LoopMap />
::

::::Cols{cols=2 gap=6 .mt-4}
::Takeaway
Faire cette boucle deux fois à la main est instructif. Vingt fois, mieux vaut l’**automatiser** dans un workflow.
::
::Note{tag="Mais"}
Automatiser n’est pas supprimer l’humain : c’est décider quels gestes confier au code, et où garder un jugement humain.
::
::::

---
section: Partie 3 · Les workflows
---

# Cinq motifs pour assembler des agents :Hint[Anthropic]{prefix="Building Effective Agents," href="https://www.anthropic.com/engineering/building-effective-agents"}

::Stack{fill center}
<Motifs />
::

::Note{.mt-4}
Les mêmes schémas reviennent dans la plupart des systèmes multi-agents. Dans un flow, `parallel` et `loop` sont des nœuds dédiés. Les autres motifs viennent de l’enchaînement des nœuds.
::

---
# V2 : exercice impact-plan ajouté, comme dans le cours
section: Partie 3 · Les workflows
---

# Un flow : un fichier YAML et markdown

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=2 .code-sm}
:Eyebrow[neon/.pi/flows/impact-plan.md]{tone=quiet code}

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
- **En-tête** le nom du flow, ses nœuds, dans l’ordre d’exécution
- **Corps** une section `## <id>` par nœud : la consigne de l’agent
- **reads** exactement ce que chaque agent reçoit, rien d’autre
::

::Note
Ce que vous faisiez en collant le ticket, le pas et le diff au reviewer. Le fichier est **vérifié en entier** avant le moindre appel de modèle.
::

::Card{variant=accent eyebrow="En salle" size=sm}
Déposez ce fichier dans `.pi/flows/`, puis dans Pi :

<p class="mono" style="font-size:0.7rem;line-height:1.5">/herdr on<br />/run impact-plan traite le ticket #2 d'ISSUES.md</p>
::
:::
::::

---
section: Partie 3 · Les workflows
---

# Ce que le flow automatise

::Lead
Chaque geste répété dans la boucle à la main devient une règle vérifiable.
::

:::Stack{fill center}
::Matrix{size=md left first="22rem"}
| vous, à la main | dans le flow |
| --- | --- |
| `/step explorer`, et le tester à côté | `parallel` : deux lectures simultanées |
| le planner découpe le ticket | `output.steps` : une liste de pas |
| vous transmettez chaque pas au coder | `map-from` : un pas après l’autre |
| vous lancez `npm test` | `check` : lance `.pi/checks/test.sh` |
| vous relancez coder et reviewer | `loop` et `max` : jusqu’à validation |
| vous revenez au planner | l’auditeur relit tout, un second tour replanifie ce qui reste |
| `/chain` et votre journal | `runs/<horodatage>/` : la trace de chaque agent |
::
:::

::Takeaway
Le flow ne devine pas votre méthode : il formalise les transitions que **vous** avez décidées.
::

---
section: Partie 3 · Les workflows
---

# Un test automatique ne suffit pas

:::::Cols{cols=2 gap=8 fill align=center}
::::Stack{gap=4}
::Lead
La boucle n’avance que si le script de tests réussit **et** si le reviewer approuve. Sinon, nouvel essai, trois au plus.
::

:::Cell{.code-sm}
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
::::
::::Stack{gap=4}
:::Card{variant=soft eyebrow="Deux preuves complémentaires" size=sm}
::Specs{w="7rem"}
- **Tests verts** les comportements contraints sont vérifiés
- **APPROVED** le pas est accepté par un relecteur neuf
::
:::
::Card{variant=accent eyebrow="Un plafond sur chaque boucle" size=sm}
Sans `max`, un modèle qui ne converge jamais tournerait jusqu’à épuisement du budget. combo dit quand la limite est atteinte.
::
::Card{variant=teal eyebrow="Et pour le ticket entier ?" tone=teal size=sm}
Les tests ne vérifient que ce qu’ils contraignent. L’**auditeur** contrôle ce que les tests et les revues de pas peuvent manquer.
::
::::
:::::

---
section: Partie 3 · Les workflows
---

# Issue #2 : un flow en deux niveaux :Hint[hands-on-harness/scripts/flows/issue2.md]{href="https://github.com/AI-for-dev/hands-on-harness/blob/main/scripts/flows/issue2.md"}

::Lead
Six agents, deux boucles bornées, un audit final pour juger l’ensemble du ticket.
::

::::Cols{cols=5 gap=3 .mt-4}
::Step{n=1 title="Lectures"}
explorer + tester · `parallel`
::
::Step{n=2 title="Plan"}
planner · `output.steps`
::
::Step{n=3 title="Pas du plan"}
coder → check → reviewer · `map-from`
::
::Step{n=4 title="Suite"}
`npm test` · `check`
::
::Step{n=5 title="Audit"}
auditor · verdict global
::
::::

::::Cols{cols=2 gap=6 fill align=center .mt-4}
::Card{variant=soft eyebrow="Boucle du pas · 3 essais au plus" size=sm}
Tests verts **et** reviewer qui approuve. `on-fail: continue` laisse passer au pas suivant.
::
::Card{variant=accent eyebrow="Boucle du ticket · 2 tours au plus" size=sm}
Audit insatisfaisant : le planner replanifie ce qui reste ouvert, et seulement cela.
::
::::

::Note{tag="Limites" .mt-4}
6 pas au plus · 3 essais par pas · 2 tours · 15 minutes : les limites empêchent les exécutions sans fin.
::

---
# V2 : troisième échec repris du cours (verdict rendu en prose, run d’octobre 2026)
section: Partie 3 · Les workflows
---

# Ce que les premiers runs ont appris

::Lead
La trace explique pourquoi un run s’est arrêté, et ce qu’il faut changer dans le flow.
::

::::Cols{cols=3 gap=5 fill content=center}
:::Card{badge="1" title="Le planner répond en texte libre" size=sm}
Un très bon plan, mais sans la structure `output.steps` attendue, et le run s’arrête.

::Detail
**Correction** : `retry: 1`, le second essai rappelle le format attendu.
::
:::
:::Card{badge="2" title="Le pas ne peut jamais devenir vert" size=sm}
Un pas « écrire les tests rouges » seul ne peut pas satisfaire une boucle qui exige des tests verts : il brûle ses trois essais.

::Detail
**Correction** : test rouge et code correctif dans le **même pas**.
::
:::
:::Card{badge="3" badgeTone=teal title="Le verdict reste dans la prose" size=sm}
Le reviewer refuse deux fois en prose, sans appeler `verdict` : le pas échoue, les suivants reprennent le travail, l’audit approuve.

::Detail
Seule la trace permettait de le comprendre.
::
:::
::::

::Takeaway{.mt-5}
Avant d’augmenter les `retry`, vérifiez que la condition de sortie est **atteignable**.
::

---
# V2 : combo s’installe depuis npm ; les lignes du .gitignore sont expliquées par le cours (le diff compte les fichiers non suivis)
section: Partie 3 · Les workflows
---

# Atelier : lancer et inspecter le flow

::::Cols{cols=2 gap=7 fill}
:::Stack{gap=3 .code-xs}
```bash
cd /chemin/vers/neon
mkdir -p .pi/agents .pi/flows .pi/checks
cp /chemin/vers/hands-on-harness/scripts/agents/*.md .pi/agents/
cp /chemin/vers/hands-on-harness/scripts/flows/issue2.md .pi/flows/
printf '#!/usr/bin/env bash\nnpm test\n' > .pi/checks/test.sh

printf '.pi/\nruns/\n' >> .gitignore
git add .gitignore && git commit -m "ignorer .pi et runs"

pi install -l npm:@ai-for-dev/combo   # si ce n'est pas déjà fait
pi
```

```text
/flows                  les flows reconnus
/flows issue2           les nœuds, et le fichier vérifié
/run issue2 traite le ticket #2 d'ISSUES.md
/run resume             reprendre un run interrompu
```
:::
:::Stack{gap=3}
::Bullet{size=sm k="1" accent}
Au premier lancement, choisissez **Trust** : sans cela, Pi ne charge ni `.pi/` ni combo
::
::Bullet{size=sm k="2" accent}
Cassez le fichier exprès (`agent: codeur`) : `/flows` nomme le nœud et propose le bon nom
::
::Bullet{size=sm k="3" accent}
Lancez le ticket #2 : une vingtaine de minutes sur ILaaS avec gemma-4-31b
::
::Note{tag=".gitignore"}
Le `diff` lu par le reviewer et l’auditeur compte les fichiers non suivis : sans ces lignes, les agents, les paquets de `.pi/` et les traces y entreraient.
::
::Card{variant=accent eyebrow="Ne vous contentez pas du verdict" size=sm}
Après `/run`, vérifiez vous-même `npm test`, les exports publics, `git diff` et `runs/<horodatage>/`.
::
:::
::::

---
section: Partie 3 · Les workflows
---

# Choisir un arrêt humain avant le commit

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
Un flow automatisé peut demander une validation là où une erreur coûterait cher : une question, un branchement, le commit.
::
::Specs{w="7.5rem" raw}
- **committer** livré avec combo, guidé par une section `## message`
- **commit** sur une branche propre au run, aucun push automatique
- **default: false** aucun accord implicite : sans personne devant l’écran, pas de commit
::
::Card{variant=soft eyebrow="Un choix de conception" size=sm}
Placez les arrêts humains là où une erreur coûte plus cher à défaire qu’à prévenir. Par exemple, une discussion sur le ticket pour enrichir le plan.
::
:::
::::

---
section: Partie 3 · Les workflows
---

# Un flow réutilisable devient une brique

::::Cols{cols=2 gap=8 fill align=center}
:::Cell{.code-xs}
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
:Eyebrow[Adapter sans tout réécrire]{tone=teal}

::Bullet{size=sm k="modèle" badge=tag}
Un modèle plus gros pour le planner et l’auditeur : dans leurs fichiers d’agents
::
::Bullet{size=sm k="nœud" badge=tag}
Un audit trop coûteux pour un petit ticket : retirez son nœud, simplifiez la condition du tour
::
::Bullet{size=sm k="parallèle" badge=tag}
Des pas indépendants, chacun dans sa copie : `concurrency: 2` et `copies: true` sur le `map`
::
::Card{variant=accent eyebrow="Attention" size=sm .mt-2}
Ici, le commit est direct. Pour garder l’accord humain, réinsérez `ask` et `choice`.
::
:::
::::

---
section: Partie 3 · Les workflows
---

# Généraliser : quatre principes de conception

::Lead
Un bon harnais est un processus explicite, observé et corrigé.
::

::::Cols{cols=2 gap=5 fill content=center}
:::Item{variant=goal n=1}
Automatiser ce qu’on a observé
::Detail
Le flow formalise les décisions prises à la main dans la partie précédente : vous savez où placer chaque ligne.
::
:::
:::Item{variant=goal n=2 ghost}
Faire parler la trace
::Detail
Un échec de run doit conduire à un ajustement concret du flow.
::
:::
:::Item{variant=goal n=3 ghost}
Structurer les verdicts
::Detail
Un outil comme `verdict` plutôt que `APPROVED` cherché dans de la prose. Des modèles de classification, comme [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), répondent à ce genre de question pour très peu de tokens.
::
:::
:::Item{variant=goal n=4 ghost}
Placer les arrêts humains
::Detail
Demander l’accord là où une erreur coûte cher à corriger, et pas ailleurs.
::
:::
::::

::Takeaway{.mt-4}
Automatiser ne supprime pas la responsabilité : elle se déplace vers la **conception** et la **vérification** du flow.
::

---
# V2 : comparaison relevée le 14 octobre 2026 dans les docs officielles : code.claude.com/docs/en/hooks, /sub-agents, /workflows, /agent-teams ; learn.chatgpt.com/docs/hooks, /agent-configuration/subagents, developers.openai.com/codex/sdk ; opencode.ai/docs/plugins, /agents, /sdk, /cli. Chemin des sessions Codex non documenté officiellement, donc absent.
section: Partie 3 · Les workflows
---

# Les mêmes briques ailleurs :Hint[docs officielles, 14 octobre 2026]

::Matrix{size=sm left first="12rem"}
<table>
<thead><tr><th></th><th>Pi + combo</th><th>Claude Code</th><th>Codex CLI</th><th>OpenCode</th></tr></thead>
<tbody>
<tr class="is-group"><th colspan="5">Hooks</th></tr>
<tr><td>s’écrit en</td><td>TypeScript</td><td>commande (JSON)</td><td>commande (JSON, TOML)</td><td>plugin JS ou TS</td></tr>
<tr><td>bloquer un outil</td><td><code>tool_call</code></td><td><code>PreToolUse</code></td><td><code>PreToolUse</code></td><td><code>tool.execute.before</code></td></tr>
<tr><td>relancer à la fin</td><td><code>agent_before_settle</code></td><td><code>Stop</code></td><td><code>Stop</code></td><td><Mark v="no">non documenté</Mark></td></tr>
<tr class="is-group"><th colspan="5">Sous-agents</th></tr>
<tr><td>fichier</td><td><code>.pi/agents/*.md</code></td><td><code>.claude/agents/*.md</code></td><td><code>.codex/agents/*.toml</code></td><td><code>.opencode/agents/*.md</code></td></tr>
<tr><td>outils restreints</td><td><code>tools</code></td><td><code>tools</code></td><td><Mark v="no">pas de liste</Mark></td><td><code>permission</code></td></tr>
<tr class="is-group"><th colspan="5">Workflows</th></tr>
<tr><td>dans un fichier</td><td>flow en markdown</td><td>script JavaScript</td><td><Mark v="no">non, SDK</Mark></td><td><Mark v="no">non, SDK</Mark></td></tr>
<tr><td>trace et tokens</td><td><code>runs/</code></td><td><code>~/.claude/projects/</code></td><td><code>codex exec --json</code></td><td><code>opencode stats</code></td></tr>
</tbody>
</table>
::

---
layout: section
index: Partie 4 / 5
---

::SectionHead{num="04" detail="Faire débattre des agents"}
# L’essaim
::

::Agenda
- Ce qui sépare un essaim d’une délégation ou d’un workflow
- Le tableau partagé, et ce qui arrête une discussion
- Trois débats qui ne tranchent rien, et pourquoi
- Donner au débat une question qu’il peut trancher
::

---
section: Partie 4 · L’essaim
---

# Des agents qui se répondent :Hint[module essaim]{prefix="Cours," href="https://ai-for-dev.github.io/hands-on-harness/act2-swarm"}

::Stack{fill center}
<Topologies />
::

::::Cols{cols=2 gap=6 .mt-4}
::Takeaway
Une question **sans chemin connu** demande une discussion : quelqu’un qui défend une autre option, et qui change d’avis quand vous avez raison.
::
::Note{tag="Le prix"}
Chaque membre relit à chaque tour ce que les autres ont écrit, et on ne sait pas d’avance combien de tours il faudra.
::
::::

---
section: Partie 4 · L’essaim
---

# Le tableau : un journal partagé :Hint[doc de combo, essaims]{href="https://github.com/AI-for-dev/combo/blob/main/docs/guide/swarm.md"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Lead
Un membre d’essaim est un agent ordinaire dont la panoplie contient l’outil `board`. Il garde son contexte et ne voit des autres que **ce qu’ils publient**.
::
::Specs{w="7rem" raw}
- **ajout seul** personne ne modifie ni n’efface un message : le débat se relit tel qu’il s’est déroulé
- **auteur** inscrit par le tableau, pas déclaré par le membre : nul ne parle au nom d’un autre
- **à chaque tour** combo remet à chaque membre ce qui est nouveau, en commençant par ce qui lui répond
- **plafonds** 200 messages, 50 par membre, 2 000 caractères, pas deux fois le même message
::
:::
:::Stack{gap=4}
:Eyebrow[Trois sortes de messages pour un débat]{tone=teal}

::Matrix{size=md left first="6rem"}
| sorte | usage |
| --- | --- |
| `result` | sa réponse à la question, ici son vote ; une seule par tour |
| `tell` | un argument ; avec `re`, il répond à un message précis |
| `ask` | une question, adressée à un seul membre avec `to` |
::

::Note{tag="Ailleurs"}
Dans [Swarm](https://github.com/openai/swarm) d’OpenAI, un agent passe la main à un autre, qui hérite de tout l’historique. combo garde un contexte par membre : la trace dit qui a dit quoi à qui.
::
:::
::::

---
section: Partie 4 · L’essaim
---

# Qu’est-ce qui arrête un essaim ?

:::::Stack{fill center gap=5}
::Lead
Un ticket est fini quand les tests passent. Un débat n’a pas de critère aussi net : combo en propose trois.
::

::::Cols{cols=3 gap=5}
:::Card{badge="1" title="Le nombre de tours" size=sm}
`--rounds`, 3 par défaut. Il borne la dépense.

::Detail
Un débat arrêté par ce plafond n’a rien conclu.
::
:::
:::Card{badge="2" badgeTone=teal title="La couverture" size=sm}
`--claim` donne une liste de choses à prendre, et l’essaim s’arrête quand chacune a un résultat.

::Detail
Détourné pour distribuer les camps : `--hold 1` limite chaque membre à une prise.
::
:::
:::Card{variant=accent badge="3" title="L’accord" size=sm}
`--until agree` : chaque membre publie un `result` qui commence par `VOTE: <réponse>`, et l’essaim s’arrête quand **tous** les derniers votes sont identiques.

::Detail
Deux sur trois ne suffisent pas. Un membre qui abandonne empêche l’accord.
::
:::
::::
:::::

---
section: Partie 4 · L’essaim
---

# Le débatteur livré avec combo

::::Cols{cols="5fr 4fr" gap=7 fill align=center}
:::Stack{gap=2 .code-xs}
:Eyebrow[combo/agents/debater.md, extrait]{tone=quiet code}

```markdown
---
name: debater
description: Argues one side of a question beside other
  debaters, and votes every turn until they all vote the same
tools: board
lifetime: workflow
---

You are one of several agents arguing about one question.
The others argue at the same time, none of you can see
another's context, and nobody arbitrates.

Every turn, post one `result` to the board: your vote,
and under it the one argument the others have not answered.

To answer somebody, post a `tell` with `re` set to the id
of the post you are answering.

Change your vote when somebody is right: agreeing is the
result, not a defeat. But agreeing to be done with it,
without a reason you could give out loud, is worse than
still disagreeing.
```
:::
:::Stack{gap=4}
::Specs{w="6.4rem" raw}
- **tools** le seul outil `board` : il ne lit aucun fichier, le débat ne dépend pas du dépôt
- **lifetime** `workflow` : il se souvient de ce qu’on lui a objecté au tour d’avant
- **consigne** un vote par tour, répondre avec `re`, changer d’avis quand l’autre a raison, jamais pour en finir
::
::Note{tag="combo ≥ 0.5.0"}
Première version qui livre `--until agree` et l’agent `debater`.
::
:::
::::

---
section: Partie 4 · L’essaim
---

# Exercice : trois copies d’un même agent

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4 .code-xs}
```text
/herdr on
/swarm --members 3 --until agree --rounds 4 --agent debater
       Quel langage choisir pour écrire un nouveau
       logiciel de calcul scientifique ?
```

::Card{variant=accent eyebrow="En salle" size=sm}
Un volet herdr par membre, plus un volet `board` : la seule vue où l’on voit **un échange** et non trois monologues. Dans `runs/<date>/1-debater/`, notez le nombre de tours, le langage choisi, et les `tell` avec `re`.
::
:::
:::Stack{gap=4}
:Eyebrow[Notre exécution, trois copies de gemma-4-31b]{tone=teal}

::Specs{w="5.6rem" raw}
- **vote** Julia pour les trois, dès le premier message
- **argument** le même : le « problème des deux langages »
- **durée** un tour, 51 secondes, un seul message qui répond à un autre
::

::Card{variant=soft size=sm}
« Je suis tout à fait d’accord. La compilation JIT est justement ce qui permet d’éviter le passage au C/Fortran. »
::

::Takeaway
Trois copies d’un même modèle partagent la même réponse la plus probable : les faire voter revient à poser **trois fois** la question à un seul agent.
::
:::
::::

---
section: Partie 4 · L’essaim
---

# Imposer le désaccord avec --claim

:::::Cols{cols=2 gap=8 fill align=center}
::::Stack{gap=4 .code-xs}
```text
/swarm --members 3 --claim Python,Julia,C++ --hold 1
       --until agree --rounds 4 --agent debater
       Quel langage choisir pour écrire un nouveau
       logiciel de calcul scientifique ? Chacun de vous
       défend au départ le langage qu'il a pris.
```

:Eyebrow[Ce qu’ont reçu debater#1 et debater#2]{tone=quiet code}

```text
`Julia` is held by debater#3 - ask debater#3,
or take something else. Still free: Python, C++
```
::::
::::Stack{gap=4}
::Lead
Les trois copies ont demandé Julia. debater#3 l’a obtenu, les deux autres ont été refusés…
::
:::Card{variant=soft size=sm}
… et **aucun** n’a pris Python ni C++. Ils ont voté Julia comme s’ils l’avaient obtenu : accord au premier tour, en 105 secondes.

::Detail
La doc de combo rapporte la même chose sur gemma-4-31b et qwen-3.6-35b-instruct : deux exécutions sur quatre.
::
:::
::Takeaway
Le mécanisme a fonctionné, mais il n’oblige personne à défendre ce qui reste. Un membre ne défend une position que si elle est **écrite dans son prompt système**.
::
::::
:::::

---
section: Partie 4 · L’essaim
---

# Un agent par camp :Hint[hands-on-harness/scripts/agents/]{href="https://github.com/AI-for-dev/hands-on-harness/tree/main/scripts/agents"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=2 .code-xs}
:Eyebrow[neon/.pi/agents/debat-julia.md, extrait]{tone=quiet code}

```markdown
---
name: debat-julia
tools: board
lifetime: workflow
model: ilaas/gemma-4-31b
---

You are one of three agents debating one question on a
shared board. You open for Julia. The two others open for
Python and C++. […]
```

```text
/herdr on
/swarm --agent debat-python,debat-julia,debat-cpp
       --until agree --rounds 6
       Quel langage choisir pour écrire un nouveau
       logiciel de calcul scientifique ?
```
:::
:::Stack{gap=4}
::Lead
Un fichier par camp, avec son prompt, son modèle et la ligne qui dit ce qu’il défend. Un camp **écrit** ne peut pas être refusé.
::
::Note{tag="--agent"}
Une liste d’agents place chacun d’eux une fois sur le tableau. Elle demande une version de combo plus récente que la 0.6.0.
::
::Card{variant=accent eyebrow="En salle" size=sm}
Copiez `debat-*.md` dans `.pi/agents/`, lancez le débat et suivez le volet `board`. Dans `runs/<date>/1-swarm/`, notez à quel tour chaque débatteur change de vote, s’il en change.
::
:::
::::

---
section: Partie 4 · L’essaim
---

# Ils se répondent, et personne ne bouge

::::Cols{cols="4fr 5fr" gap=8 fill align=center}
:::Stack{gap=4}
::Lead
Deux exécutions sur gemma-4-31b : les six tours permis, **aucun vote** n’a bougé.
::
::Matrix{size=md left first="8rem"}
| exécution | messages | réponses adressées (`re`) |
| --- | --- | --- |
| première | 61 | 43 |
| seconde | 49 | 31 |
::
::Note{tag="Ce n’est pas"}
un défaut de communication : le tableau est plein de réponses qui citent l’argument d’en face.
::
:::
:::Stack{gap=3}
::Card{size=sm eyebrow="C++ · p7, en réponse à Python"}
« L’écosystème de Python repose presque entièrement sur des bibliothèques écrites en C ou Fortran. Pour un nouveau logiciel qui doit innover dans les calculs \[…\], Python devient un goulot d’étranglement. »
::
::Card{variant=teal size=sm tone=teal eyebrow="Python · p9, en réponse à p7"}
« L’argument du “goulot d’étranglement” est aujourd’hui largement mitigé par des outils comme Numba, Cython ou Jax \[…\] sans quitter l’écosystème Python. »
::
::Card{size=sm eyebrow="C++ · p14, en réponse à p9"}
« S’appuyer sur Numba ou Jax revient à admettre que Python n’est qu’une interface. »
::
:::
::::

---
section: Partie 4 · L’essaim
---

# Qu’est-ce qui empêche des agents de converger ?

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
:Eyebrow[Le débatteur Python, au quatrième tour]{tone=teal}

::Pull
« However, to win the debate (get everyone to vote the same), I need to find a way to convince them \[…\]. But as a Python agent, my primary goal is to defend Python. »
::

::Lead
Chacun traite son camp comme une identité et l’accord comme la reddition des autres. Conclusion à chaque tour : « Maintain my vote ».
::
:::
:::Stack{gap=3}
::Bullet{size=sm k="1"}
**La consigne de vote** se termine par « This ends when every one of you has voted for the same thing » : gemma la lit comme un objectif de victoire
::
::Bullet{size=sm k="2"}
**Le prompt** pousse à tenir : « agreeing to be done with it \[…\] is worse than still disagreeing »
::
::Bullet{size=sm k="3"}
**La question** n’a aucun critère : chacun ramène le débat sur l’axe où son langage gagne, la performance, l’écosystème ou le coût humain
::
::Card{variant=accent eyebrow="Une seule phrase ajoutée à la question" size=sm .mt-2}
« Le but n’est pas de gagner : c’est de trouver la réponse que les autres peuvent aussi tenir. »
::
:::
::::

---
section: Partie 4 · L’essaim
---

# Trois modèles, trois conditions

::Lead
Les mêmes essais, en imposant le modèle à tous les membres avec `--model`.
::

:::Stack{fill center}
::Matrix{size=md left first="17rem"}
| condition | gemma-4-31b | qwen3.8-flash | deepseek-v4.1-flash |
| --- | --- | --- | --- |
| trois copies de `debater`, sans camp | Julia au 1er tour | Julia au 2e tour | Julia au 3e tour |
| un agent par camp | 2 × aucun vote ne bouge | pas d’accord, deux membres coupés par le délai | accord sur Julia au 6e tour |
| un agent par camp, avec la phrase sur le but | 1 accord (Julia), 1 membre sorti | accord sur le fond, **non compté** | accord sur Python au 3e tour |
::
:::

::::Cols{cols=3 gap=5 .mt-2}
::Note{tag="gemma"}
La phrase compte beaucoup : ses débatteurs la citent presque à chaque tour, et leurs changements de vote restent motivés.
::
::Note{tag="deepseek"}
Converge même sans elle, en zigzag : son débatteur C++ passe à Python au 4e tour, puis à Julia au 5e.
::
::Note{tag="qwen"}
Trois votes pour la même architecture, écrits chacun à sa façon : « Python pour piloter, C++ pour le noyau »… `--until agree` compare à l’identique.
::
::::

::Takeaway{.mt-4}
Une case, une exécution : ce tableau ne mesure pas les modèles. Il montre que l’issue dépend de **réglages qu’on choisit**, la consigne, le format du vote et le modèle.
::

---
section: Partie 4 · L’essaim
---

# Donner au débat une question qu’il peut trancher

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Card{variant=soft eyebrow="L’énoncé, à la suite de la commande" size=sm}
<p class="mono muted" style="font-size:0.64rem;line-height:1.45;white-space:nowrap">/swarm --agent debat-python,debat-julia,debat-cpp --until agree --rounds 4</p>

Une équipe de six physiciens et deux ingénieurs de recherche lance un nouveau code de simulation de plasma. Il doit tourner sur les **GPU NVIDIA et AMD** du calculateur national, être maintenu **au moins dix ans**, et reprendre un **noyau existant de 40 000 lignes en Fortran 90**. Les physiciens connaissent **bien Python et peu le C++**. Quel langage principal choisir pour ce code ?

:Rule

Votez pour le langage principal seulement, en un mot : la place des autres langages va dans votre argument. Le but n’est pas de gagner : c’est de trouver la réponse que les autres peuvent aussi tenir.
:::
:::Stack{gap=3}
::Bullet{size=sm k="critères" badge=tag}
Des exigences que tous reconnaissent, sur lesquelles un argument peut en battre un autre
::
::Bullet{size=sm k="vote" badge=tag}
Un mot : l’accord devient comptable, la répartition entre langages va dans l’argument
::
::Bullet{size=sm k="but" badge=tag}
Une raison de bouger : chercher une réponse commune plutôt que gagner
::
::Takeaway{.mt-2}
« Un nouveau logiciel de calcul scientifique » n’a pas de réponse : rien ne dit ce qu’il doit faire. Une décision réelle s’appuie sur des **exigences**.
::
:::
::::

---
section: Partie 4 · L’essaim
---

# Six débats, six accords

::::Cols{cols="11fr 9fr" gap=7 fill align=center}
:::Stack{gap=4}
::Matrix{size=md left first="10rem"}
| modèle | sans camp | débat 1 | débat 2 |
| --- | --- | --- | --- |
| gemma-4-31b | C++ | Julia (4) | Julia (3) |
| qwen3.8-flash | Fortran | C++ (2) | C++ (2) |
| deepseek-v4.1-flash | Fortran | C++ (4) | Fortran (3) |
::
::Lead
Entre parenthèses, les tours joués. Chaque changement de vote cite un **critère de l’énoncé**, et cinq débats sur six s’écartent du témoin : le débat ne restitue pas seulement l’a priori du modèle.
::
:::
:::Stack{gap=3}
::Card{size=sm eyebrow="gemma · C++ se rallie à Julia"}
« Le risque de dépendance exclusive envers les deux ingénieurs pour la maintenance d’un code C++ sur dix ans est plus critique que le risque technique lié à l’utilisation de Julia. »
::
::Card{variant=accent size=sm eyebrow="deepseek · Julia corrige son propre argument"}
« Les 40 000 lignes doivent tourner sur GPU, pas seulement être liées. Mon ccall vers le F90 ne les exécutait que sur le CPU \[…\]. Le portage caché que je reprochais aux autres, je le portais aussi. »
::
::Note{tag="Désaccords lisibles"}
gemma met en premier l’autonomie des physiciens, qwen la pérennité des outils, deepseek de ne pas réécrire un noyau validé.
::
:::
::::

---
section: Partie 4 · L’essaim
---

# Exercices : lire ce qui a décidé

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{variant=accent eyebrow="01 · En salle" title="Le critère de chaque vote" size=sm}
Lancez le débat sur l’énoncé du plasma. Pour chaque changement de vote, retrouvez dans le tableau le critère invoqué.

::Detail
Puis trois copies de `debater` sur la même question, sans camp : comparez.
::
:::
:::Card{variant=accent eyebrow="02 · En autonomie" title="Retirer un critère" size=sm}
Supprimez le noyau Fortran de l’énoncé. La réponse change-t-elle ? Quel argument disparaît ?

::Detail
Puis un modèle différent derrière chaque camp, avec la ligne `model:` des débatteurs.
::
:::
:::Card{variant=accent eyebrow="03 · En autonomie" title="Une décision de votre domaine" size=sm}
Écrivez un énoncé avec ses exigences, pour une décision que vous avez réellement eue à prendre.

::Detail
Comparez le débat à ce que vous aviez décidé.
::
:::
::::

::Note{tag="Plafonner chaque tour" .mt-2}
Un débatteur gemma a appelé `read` **259 fois** dans un seul tour : la boucle de Pi n’a pas de maximum d’appels d’outils. `/swarm` donne 5 minutes par tour, `--timeout 3m` raccourcit, et un membre coupé deux fois sort du débat. Lisez `usage.json` après chaque exécution.
::
:::::

---
section: Partie 4 · L’essaim
---

# Généraliser

::::Cols{cols=2 gap=5 fill content=center}
:::Item{variant=adv n=1}
Un débat reflète son cadre
::Detail
Mêmes agents, même question : aucun vote ne bouge, puis un accord, selon une phrase de la consigne. En lisant un débat, on évalue le harnais autant que les agents.
::
:::
:::Item{variant=adv n=2}
Des copies ne sont pas des avis indépendants
::Detail
Sans camp, elles votent ce que le modèle dirait seul. Le désaccord doit venir de la construction, écrit dans le fichier de chaque agent.
::
:::
:::Item{variant=adv n=3}
Une raison de bouger, un terrain commun
::Detail
La phrase sur le but donne la première, le cahier des charges le second.
::
:::
:::Item{variant=adv n=4}
L’arrêt suit l’espace des réponses
::Detail
`--until agree` compte des votes identiques : restreignez le vote, ou lisez la convergence dans le tableau.
::
:::
:::Item{variant=adv n=5}
Les plafonds font partie du débat
::Detail
Environ quinze fois plus de tokens qu’une conversation selon [Anthropic](https://www.anthropic.com/engineering/multi-agent-research-system), et un débatteur qui boucle peut tout consommer.
::
:::
:::Item{variant=adv n=6}
Explorer une décision avant de la prendre
::Detail
Faire apparaître les arguments et le critère de chaque option, pas rendre un verdict. Pour un ticket au chemin connu, le workflow reste moins cher.
::
:::
::::

---
layout: section
index: Partie 5 / 5
---

::SectionHead{num="05" detail="Faire survivre le travail au processus"}
# Pi Durable
::

::Agenda
- Distinguer historique de conversation et état d’exécution
- Installer le SDK et assembler un harnais durable
- Voir deux usages : interface collaborative et runtime multi-agent
::

---
section: Partie 5 · Pi Durable
---

# Pi et Pi Durable : deux rôles distincts

:::::Stack{fill center gap=5}
::::Cols{cols=2 gap=7}
:::Card{eyebrow="Pi" title="Agent de programmation" size=sm}
- Interface terminal prête à l’emploi
- Sessions et historique de conversation
:::
:::Card{variant=teal eyebrow="Pi Durable" title="SDK de longue durée" tone=teal size=sm}
- État d’exécution et appels d’outils persistés
- Reprise des tâches après redémarrage
:::
::::

::Takeaway
Pi Durable sauvegarde le **travail en cours**, pas seulement le dialogue.
::

::::Cols{cols=3 gap=5}
::Note{tag="Depuis Pi 1.0.0"}
Le SDK est intégré au dépôt de Pi.
::
::Note{tag="Expérimental"}
Il reste pour l’instant distinct de Pi et son API peut évoluer.
::
::Note{tag="À construire"}
Le SDK fournit le moteur durable, pas l’interface utilisateur.
::
::::
:::::

---
section: Partie 5 · Pi Durable
---

# Installation et premiers pas :Hint[README officiel]{href="https://github.com/earendil-works/pi/blob/main/packages/durable/README.md"}

:::::Stack{fill center gap=5}
::Lead
Un SDK qui s’installe à côté de Pi, avec npm et Node.js 22.19 ou plus récent :
::

:::Cell{.code-sm}
```bash
npm install @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```
:::

::::Cols{cols=4 gap=4 align=stretch}
::Step{n="01" title="Choisir le modèle"}
Clé API ou authentification.
::
::Step{n="02" title="Configurer le stockage"}
SQLite ou JSONL pour reprendre après un arrêt.
::
::Step{n="03" title="Brancher les outils"}
`CodingTools`, dossier projet et environnement.
::
::Step{n="04" title="Démarrer le Harness"}
`open()`, `root()`, `submit()` et `resume()`.
::
::::

::Note{tag="Exemples"}
[Agent de code](https://github.com/earendil-works/pi/blob/main/packages/durable/test/examples/26-coding-agent.ts) · [sous-agents en arrière-plan](https://github.com/earendil-works/pi/blob/main/packages/durable/test/examples/23-subagent-background.ts)
::
:::::

---
section: Partie 5 · Pi Durable
---

# Deux exemples parmi d’autres

:::::Stack{fill center}
::::Cols{cols=2 gap=7 align=stretch}
:::Card{variant=accent eyebrow="Expérience collaborative" title="Pi Pocket" size=sm}
- Application web et mobile pour Pi
- Accès aux agents depuis un navigateur
- Sessions partagées et pilotage en direct
- Tâches et sous-agents qui survivent aux redémarrages

:Rule

**Rôle de Pi Durable :** exécution et état persistants.

::Detail
[github.com/TannerMidd/pi-pocket](https://github.com/TannerMidd/pi-pocket)
::
:::

:::Card{variant=teal eyebrow="Orchestration multi-agent" title="pi-fabric" tone=teal size=sm}
- Runtime programmable pour Pi
- Agents résidents et workflows composables
- Coordination et tâches durables
- Runner fondé sur Pi Durable pour la reprise

:Rule

**Rôle de Pi Durable :** composant du runtime.

::Detail
[github.com/fabric-runtime/pi-fabric](https://github.com/fabric-runtime/pi-fabric)
::
:::
::::
:::::

---
layout: statement
---

:Eyebrow[Place à la pratique]{.mb-6}

# À vous de jouer !

<p class="muted mt-6" style="font-size:0.95rem">
Que garder de combo et de trysquare, où trouver des skills, quels outils plus aboutis :<br />
<a href="https://ai-for-dev.github.io/hands-on-harness/a-vous-de-jouer">ai-for-dev.github.io/hands-on-harness/a-vous-de-jouer</a>
</p>

::LogoBar{size=40 dark .mt-10}
::

---
layout: section
index: Annexe
---

::SectionHead{eyebrow="Annexe" num="A"}
# Extensions Pi<br />et combo
::

::Agenda
- Quelles extensions sont les plus proches de combo ?
::

---
section: Annexe · Extensions Pi
---

# Les extensions proches de combo :Hint[d’après les dépôts GitHub, 10 octobre 2026]

::Matrix{size=xs left first="10rem"}
| extension | proximité | points communs | différence principale |
| --- | --- | --- | --- |
| `subagent` officiel | les fondations de la délégation | agents spécialisés ; single, parallel et chain ; suivi des exécutions | un processus Pi par enfant ; composition limitée aux trois modes de base |
| `pi-dynamic-workflow` | très proche : architecture et composition programmable | sessions Pi en mémoire ; parallélisme ; pipelines ; sorties structurées | workflow JavaScript créé à la demande ; ni persistance ni reprise |
| `pi-subagents` | très proche : exécution et cycle de vie | SDK Pi ; agents spécialisés ; workflows scriptés ; supervision | tâches de fond, FleetView, missions et pilotage des agents |
| `pi-flows` | très proche : motifs et garde-fous | boucles ; graphes ; routage ; validation ; reprise ; observabilité | sous-processus Pi ; plafonds de coût et de tokens, politiques de délégation |
| `pi-orchestration` | proche : orchestration complexe | décomposition ; planification ; parallélisme ; validation ; reprise | guidé par objectifs, avec planification et replanification des tâches |
::

::Note{tag="combo" .mt-4}
Huit combinateurs et des flows déclaratifs, une mémoire explicite, des contrats de résultat et des contrôles d’exécution. Une comparaison par mécanisme, pas un classement de qualité.
::
