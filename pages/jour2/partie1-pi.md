---
layout: section
index: Partie 1 / 5
---

::SectionHead{eyebrow="Partie 1 · Premier pas avec Pi" num="I" detail="Quelques grands repères"}
# Mais, en fait, comment ça marche…
::

---
section: Partie 1 · Premier pas avec Pi
---

# Fonctionnement avec une requête impliquant une seule lecture de fichier

::::Cols{cols="12.5rem 1fr" gap=6 fill align=center}
:::Stack{gap=3}
::Bullet{k="1"}
Question → LLM
::
::Bullet{k="2" accent}
Appel outil
::
::Bullet{k="3"}
LLM → Résultat
::
:::
:::Cell{fill}
<PiSequence />
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# L’organisation du code source de Pi

::::::Stack{fill center gap=6}
::Lead
Sur le github du projet : [https://github.com/earendil-works/pi/](https://github.com/earendil-works/pi/)
indique qu’il y a trois briques principales :
::

::::Cols{cols=3 gap=6}
:::Card{center}
:Eyebrow[Couche applicative de Pi]

<p class="card-title mt-4">pi-coding-agent</p>

CLI/TUI · sessions · extensions · configuration
:::
:::Card{center}
:Eyebrow[Runtime agentique]{tone=teal}

<p class="card-title mt-4">pi-agent-core</p>

Boucle agentique<br />état · outils · sessions · événements
:::
:::Card{center}
:Eyebrow[Accès modèles]{tone=quiet}

<p class="card-title mt-4">pi-ai</p>

API multi-fournisseurs : commerciale et locale
:::
::::
::::::

---
layout: section
index: Partie 1 / 5
---

::SectionHead{eyebrow="Partie 1 · Premier pas avec Pi" num="II"}
# Installation et connexion aux modèles
::

---
section: Partie 1 · Premier pas avec Pi
---

# L’installation de Pi (déjà faite normalement ✅)

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=5}
::Card{variant=soft eyebrow="Rappel"}
Procédure d’installation de Pi : [https://pi.dev/docs/latest/quickstart](https://pi.dev/docs/latest/quickstart)
::

::Stack{gap=2}
Commande :

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```
::

::Takeaway
Création d’un dossier `.pi` au niveau de votre home
::
:::
:::Cell
<Fig src="/images/jour2/pi-dossier-agent.jpg" />
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# Se connecter à des modèles

::Lead
**Méthode 1** : si vous avez une clé API, en modifiant votre `~/.pi/agent/models.json`
::

:::Cell{.code-sm}
```json
{
  "providers": {
    "ilaas": {
      "baseUrl": "https://llm.ilaas.fr/v1",
      "api": "openai-completions",
      "apiKey": "XXXXX",
      "models": [
        {
          "id": "gemma-4-31b",
          "contextWindow": 128000,
          "reasoning": true,
          "cost": { "input": 0.14, "output": 0.28, "cacheRead": 0.0028, "cacheWrite": 0 }
        },
      ]
    },
  }
}
```
:::

---
section: Partie 1 · Premier pas avec Pi
---

# Méthode 2 : en utilisant dans pi, la commande /login

::::Cols{cols="4fr 3fr" gap=8 fill align=center}
:::Stack{gap=5}
::Card{variant=soft}
- lancer votre terminal
- taper `pi`
- taper `/login`
- choisir `sign in with an account` (Échap pour revenir en arrière) ou `with API key`
::

::Card{variant=accent eyebrow="Attention"}
Anthropic apparaît, mais son utilisation est contraire à ses CGU : risque de vous faire couper votre compte.
Possible uniquement par API : pas le même coût.
::
:::
:::Stack{gap=3}
Les clés déjà configurées apparaissent. Ex. :

<Fig src="/images/jour2/pi-login-cles.jpg" frame="screen" />
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# Cas des modèles locaux

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=6}
- utiliser [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [llmfit](https://github.com/AlexsJones/llmfit) permet de voir si un modèle est adapté à votre matériel
- lire [l’intégration de llama.cpp dans pi](https://pi.dev/docs/latest/llama-cpp)

::Card{variant=soft eyebrow="Pour des travaux au-delà de choses simples"}
Viser 24 Go de VRAM avec un modèle Qwen 3.8 quantifié : cf. [https://unsloth.ai/docs/fr/modeles/qwen3.8](https://unsloth.ai/docs/fr/modeles/qwen3.8)
::
:::
:::Cell
<Fig src="/images/jour2/llmfit.jpg" frame="screen" caption="source : korben.info/llmfit-trouver-llm-compatible-hardware.html" href="https://korben.info/llmfit-trouver-llm-compatible-hardware.html" />
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# À savoir :Hint[docs/providers.md]{prefix="source :" href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/providers.md"}

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=4}
Si vous ouvrez votre `auth.json`, vous pouvez voir vos clés et tokens d’accès en clair.

Les permissions du fichier sont `0600` : lecture + écriture pour le propriétaire, aucun droit pour le groupe ni pour les autres.

::Card{variant=soft eyebrow="Conseils" size=sm}
- chiffrement de votre disque dur (ex. VeraCrypt)
- si vous avez des sauvegardes synchronisées cloud de votre disque et que vous avez un peu peur d’une maladresse, possible d’avoir des `!command`
::
:::
:::Stack{gap=3 .code-sm}
<Fig src="/images/jour2/pi-dossier-agent.jpg" h="190px" />

```json
{
  "anthropic": {
    "type": "api_key",
    "key": "!security find-generic-password -ws 'anthropic'"
  }
}
```
:::
::::

---
layout: section
index: Partie 1 / 5
---

::SectionHead{eyebrow="Partie 1 · Premier pas avec Pi" num="III" detail="Avec de la pratique :-)"}
# Sessions et raccourcis
::

---
section: Partie 1 · Premier pas avec Pi
---

# Sessions et raccourcis

::::Stack{fill gap=2.5 center}
:::Bullet{k="1" accent}
Faire un git clone de néon là où vous souhaitez : [https://github.com/AI-for-dev/neon](https://github.com/AI-for-dev/neon)
:::
:::Bullet{k="2" accent}
Ouvrir votre terminal, taper la commande `herdr`
:::
:::Bullet{k="3" accent}
Naviguez jusqu’à votre dossier « neon ». Créer une branche « dev » sur laquelle vous vous placerez
:::
:::Bullet{k="4" accent}
lancer votre IDE en parallèle, ou ouvrir `fresh` dans un nouvel onglet de herdr
:::
:::Bullet{k="5" accent}
lancer `pi` dans votre premier onglet herdr
:::
:::Bullet{k="6" accent}
Faire des essais avec deux modèles : DeepSeek Flash et Qwen3.8 27B (`/model`) et deux niveaux de réflexion (high et low) pour Qwen3.8 27B (`Shift + Tab`),
en commençant toujours par « Sans modifier le code, explique-moi… »
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# Complément sur la sélection de modèles, niveaux de réflexion et raccourcis

::::Cols{cols=2 gap=7 fill align=center}
:::Card{center}
::Specs{w="8.5rem" raw}
- **/scoped-models** permet de choisir dans une sous-sélection
- **Ctrl+P** permet de faire défiler les modèles disponibles
- **Ctrl+S** enregistre le modèle et le niveau de réflexion par défaut pour vos futures nouvelles sessions
::
:::
:::Card{center}
::Specs{w="5.5rem" raw}
- **/thinking** permet de sélectionner le niveau de réflexion, mais `Shift + Tab` est vraiment pratique
- **Ctrl+T** permet de voir ou ne pas voir les blocs de réflexion
::
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# Sessions et raccourcis

::Lead
Plus globalement, pour les raccourcis disponibles : `/hotkeys`
::

:Eyebrow[Quels sont les premiers raccourcis au quotidien pour commencer ?]

::::Cols{cols=2 gap=7 fill align=start .mt-4}
:::Stack{gap=3}
::Card{variant=soft eyebrow="Pour aller à la ligne" size=sm}
En général : `Shift+Enter`. Pour WSL : `Alt+Enter`.
::
::Card{variant=accent eyebrow="Attention au Ctrl+C" size=sm}
Ce n’est pas « copier » mais « effacer dans l’éditeur ».
::
:::
:::Card{size=sm}
::Specs{w="8.5rem"}
- **Copier** Linux / Windows Terminal : généralement `Ctrl+Shift+C` · macOS : `Cmd+C` · `Ctrl+X` ou `/copy` pour copier
- **Coller du texte** Linux / Windows Terminal : généralement `Ctrl+Shift+V` · macOS : `Cmd+V`
- **Coller des images** Linux natif / macOS : `Ctrl+V` · Windows et WSL : `Alt+V`
::

::Detail{.mt-3}
Attention, inutile si le modèle utilisé n’est pas multimodal…
::
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# Une petite subtilité

::::Cols{cols=2 gap=7}
::Card{variant=accent eyebrow="Entrée → steering" size=sm}
Pendant que l’agent travaille, Entrée met en file un message de steering.
Il sert à corriger la trajectoire en cours de route. Exemple : pendant un début de raisonnement.
::
::Card{variant=teal eyebrow="Alt+Entrée → follow-up" tone=teal size=sm}
Met en file un message de suivi, qui n’est livré qu’une fois que l’agent a terminé tout son travail.
Sur Mac, c’est Option+Entrée.
::
::::

::::Cols{cols=2 gap=7 fill align=center .mt-4}
:::Card{size=sm}
::Specs{w="4rem" raw}
- **@** dans l’éditeur pour chercher et insérer un fichier (`Tab` en autocomplete)
- **!** pour lancer une commande shell directement
- **Échap** interrompt l’agent et restaure les messages en file dans l’éditeur
- **Ctrl+D** pour quitter
::
:::
::Note{tag="Pour aller plus loin"}
Possibilité de modifier les raccourcis en créant un fichier `~/.pi/agent/keybindings.json`,
cf. [Keybindings Reference](https://pi.dev/docs/latest/keybindings)
::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# Comprendre les sessions (suite)

::Lead
Tout le travail que vous avez fait jusqu’ici s’est fait dans une session.
Si vous avez regardé en bas de votre onglet Pi, vous avez dû voir votre contexte augmenter.
::

::::Stack{fill gap=2 center}
:::Bullet{k="7" accent}
Ouvrir une nouvelle session `/new`
::Detail
Votre contexte est normalement revenu à zéro. Une bonne pratique est de commencer une nouvelle session dès qu’on change de sujet.
::
:::
:::Bullet{k="8" accent}
Faites une nouvelle requête dans cette session, toujours en commençant par « Sans modifier le code,… »
:::
:::Bullet{k="9" accent}
Utiliser la commande `/resume` : revenir à votre première session
:::
:::Bullet{k="10" accent}
Utiliser la commande `/name` pour donner un nom à cette première session
:::
:::Bullet{k="11" accent}
Essayer la commande `/tree` pour naviguer à l’intérieur de votre première session
::Detail
Attention quand vous repartez d’un instant t de votre conversation : par défaut, ce n’est pas relié à vos modifications de fichiers.
Peut être lié en utilisant l’extension `pi-workspace-history`.
::
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# Comprendre les sessions (suite)

::::::Stack{fill center gap=6}
::::Stack{gap=2.5}
:::Bullet{k="12" accent}
Sortez de votre session (`Ctrl+D`). `pi -c` permet de reprendre votre dernière session
:::
:::Bullet{k="13" accent}
Quelques commandes utiles que vous pouvez tester :
::Detail
`/fork` → repart d’un ancien message mais dans **une nouvelle session**.
::
::Detail
`/clone` → duplique la branche active actuelle dans **une nouvelle session**.
::
:::
::::

::Card{variant=accent eyebrow="Attention"}
Il n’y a pas par défaut de suppression de vos sessions.
Quand vous effacez un projet, comme les sessions sont dans `.pi/agents`, elles ne sont pas effacées !
Vous pouvez le faire à la main.
Une petite extension qui peut aider à faire des nettoyages ciblés : `pi-session-cleanup`
::
::::::

---
section: Partie 1 · Premier pas avec Pi
---

# Comprendre les sessions (suite)

::::Stack{fill center gap=6}
::Lead
Pour voir les statistiques de votre session en cours : `/session`
::

::Card{variant=soft size=sm}
Indique le lieu où est stockée votre session. C’est en format jsonl : pas très pratique à lire dans le terminal.
Possibilité d’un `/export` pour récupérer en format html.
::

:::Bullet{k="14" accent}
Faites un export de votre session en html, puis l’ouvrir et commencer à le lire
:::
::::

---
layout: section
index: Partie 1 / 5
---

::SectionHead{eyebrow="Partie 1 · Premier pas avec Pi" num="IV"}
# Du system prompt à l’AGENTS.md
::

---
section: Partie 1 · Premier pas avec Pi
---

# Du system prompt à l’AGENTS.md

::::Stack{gap=4}
Vous pouvez lire le system prompt de Pi dans votre export de session.

Il est possible de le personnaliser pour un projet :

::Specs{w="8.5rem" raw}
- **SYSTEM.md** `…/neon/.pi/SYSTEM.md` **remplace** le system prompt par défaut de Pi pour ce projet
- **APPEND_SYSTEM.md** `…/neon/.pi/APPEND_SYSTEM.md` **ajoute** ton contenu au system prompt existant de Pi
::

::Note{tag="Attention"}
En pratique, il est très rare de modifier le system prompt. La bonne pratique, c’est d’ajouter un fichier AGENTS.md.
::
::::

::Takeaway{.mt-6}
**Mais utile ici de bien distinguer le dossier global `~/.pi/agent/` et la possibilité de créer un `.pi` en local pour chaque projet (ici `…/neon/.pi`).**
Au-delà de la question du system prompt, utile si vous voulez définir des settings, skills… propres à chaque projet.
::

---
section: Partie 1 · Premier pas avec Pi
---

# AGENTS.md

- ce fichier doit être placé à la racine du projet
- son contenu va être envoyé à chaque fois après le system prompt

::::Cols{cols="1fr 1fr" gap=7 fill align=center .mt-2}
:::Card{variant=soft size=sm}
Historiquement, on a conseillé comme bonne pratique de décrire dans AGENTS.md :

::Stack{.list-2 .mt-3}
- le contexte du projet
- l’environnement
- la charte graphique
- la documentation interne
- les tests d’UX
- l’audit par sous-agents
- les conventions de nommage
- les règles de sécurité
- la politique Git
- les problèmes récurrents
::
:::
:::Stack{gap=2}
:Eyebrow[Exemple]{tone=quiet}

<Fig src="/images/jour2/agents-md-exemple.jpg" h="220px" caption="david-informaticien.com : claude-md et agents-md, les meilleures pratiques" href="https://david-informaticien.com/blog/conseils-pratiques/4076-claude-md-et-agents-md-les-meilleures-pratiques-pour-un-meilleur-code-avec-un-agent-ia" />
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# AGENTS.md

::Lead
**Conseil avec les modèles les plus récents : laisser votre AGENTS.md minimal**, n’y mettre que ce qui concerne les problèmes récurrents.
::

::::Cols{cols="3fr 1fr" gap=7 fill align=center}
:::Stack{gap=2}
:Eyebrow[Exemple]{tone=quiet}

<Fig src="/images/jour2/agents-md-minimal.jpg" frame="screen" h="270px" />
:::
::Note
Les `** **` peuvent servir à indiquer ce qui est le plus important.
::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# :Ord[15)] Créer un AGENTS.md dans neon

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
Il est possible de faire référence à un ou à d’autres fichiers. Exemple :

```markdown
# À lire en premier
Conventions complètes dans `CONTRIBUTING.md`
```

::Takeaway
**Vous complèterez votre AGENTS.md au fur et à mesure du projet si vous rencontrez des problèmes par rapport aux réponses obtenues.**
::
:::
:::Card{variant=accent eyebrow="Attention" center}
Ce n’est pas parce qu’il est écrit dans `CONTRIBUTING.md`
« \*\*Never\*\* read secrets (`.env`) nor forward them anywhere »
que votre agent ne va pas le faire.

:Rule

Mieux vaudrait remplacer cela par une règle déterministe (cf. plus tard partie hook).
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# AGENTS.md

::Lead
Sur des projets plus gros, indiquer le fichier adéquat en fonction de la tâche à réaliser :
::

::::Cols{cols=2 gap=6}
::Card{variant=accent eyebrow="Mauvaise pratique" size=sm center}
« Avant toute modification, lisez les fichiers architecture.md, database.md et deployment.md »
::
:::Card{variant=teal eyebrow="Bonne pratique" tone=teal size=sm}
- Avant de modifier la structure ou les frontières entre services : lis `docs/architecture.md`
- Avant toute migration ou modification de schéma (`db/migrations/`, `models/`) : lis `docs/database.md`
- Avant de préparer un déploiement : lis `docs/deployment.md` et suis la checklist
:::
::::

::Card{variant=soft eyebrow="Deux stratégies pour faire évoluer son AGENTS.md dans le temps (nouveau modèle)" size=sm .mt-5}
- Effacer tout son contenu et le reconstruire au fur et à mesure que des problèmes réapparaissent ou pas…
- Évaluer l’impact en ne retirant que certaines parties qu’on suppose ne plus être nécessaires (cf. l’outil trysquare [https://github.com/AI-for-dev/trysquare](https://github.com/AI-for-dev/trysquare), qui sera présenté ensuite)
::

---
layout: section
index: Partie 1 / 5
---

::SectionHead{eyebrow="Partie 1 · Premier pas avec Pi" num="V"}
# Settings, prompt et prompt template
::

---
section: Partie 1 · Premier pas avec Pi
---

# Settings

::::Stack{gap=5}
Deux niveaux :

::Specs
- **Global** `~/.pi/agent/settings.json`
- **Projet** `neon/.pi/settings.json`
::

Pour changer les settings au niveau global, le plus simple, c’est `/settings`.

Si changement au niveau du projet, après avoir modifié le fichier, pensez à faire un `/reload`.

::Note
Ce qui peut être modifié : voir [https://pi.dev/docs/latest/settings](https://pi.dev/docs/latest/settings)
::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# Prompt

::::Cols{cols=2 gap=7}
::Card{badge="1" title="Si votre prompt n’est pas assez précis"}
Le modèle, surtout s’il est petit (27B) et en mode réflexion élevée, va générer plein d’hypothèses par rapport aux zones de flou :
ça va être long et avec possiblement pas mal d’erreurs.
::
::Card{badge="2" title="Trop précis"}
Au sens où l’utilisateur détaille toutes les étapes à réaliser : dommage, car une partie de la puissance de l’IA n’est pas exploitée.
::
::::

::Takeaway{.mt-6}
**Dès que ce qui est demandé est un peu gros, planifier en levant les zones de flou et exécuter ensuite.**
::

---
section: Partie 1 · Premier pas avec Pi
---

# Prompt template

::Lead
Si dans votre pratique, vous voyez que vous tapez plusieurs fois un prompt similaire, vous pouvez créer un modèle de prompt dans
`~/.pi/agent/prompts` ou au niveau de chaque projet `monprojet/.pi/prompts`.
::

:::Stack{gap=2 .mt-2}
:Eyebrow[Exemple ~/.pi/agent/prompts/continue.md]{tone=quiet code}

```markdown
---
description: Continuer un travail déjà commencé à partir d’un plan rédigé
argument-hint: "[plan]"
---
Reprends le plan ${plan} et continue le travail commencé
```
:::

::Takeaway{.mt-6}
Ensuite, vous n’avez plus qu’à faire `/continue MonSuperPlan`
::

---
layout: section
index: Partie 1 / 5
---

::SectionHead{eyebrow="Partie 1 · Premier pas avec Pi" num="VI"}
# Extensions
::

---
section: Partie 1 · Premier pas avec Pi
---

# Extensions

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3}
Pi est un harnais minimal. Plusieurs manières de l’étendre :

::Musts
- AGENTS.md ✅
- prompt template ✅
- extension
- skill
- …
::
:::
:::Stack{gap=5}
::Card{variant=soft eyebrow="Définition d’une extension"}
**Un module TypeScript/JavaScript chargé par Pi, qui utilise l’API d’extension pour construire de nouvelles capacités.**
::

De nombreuses extensions existent déjà sur : [https://pi.dev/packages](https://pi.dev/packages)
:::
::::

---
section: Partie 1 · Premier pas avec Pi
---

# Extensions :Hint[pi.dev/packages]{href="https://pi.dev/packages"}

::Stack{fill center}
<Fig src="/images/jour2/pi-packages.jpg" contain />
::

---
section: Partie 1 · Premier pas avec Pi
---

# Extensions

::Lead
Possibilité bien entendu de construire sa propre extension ou de la faire construire par Pi <span class="mono">:-)</span>
::

:::Stack{gap=2 .mt-2}
Page de référence : [https://pi.dev/docs/latest/extensions](https://pi.dev/docs/latest/extensions)

:Eyebrow[~/.pi/agent/extensions/hello.ts]{tone=quiet code .mt-3}

```ts
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("hello", {
    description: "Show a greeting",
    handler: async (name, ctx) => {
      ctx.ui.notify(`Hello, ${name || "world"}!`, "info");
    },
  });
}
```
:::

---
section: Partie 1 · Premier pas avec Pi
---

# Extensions

::Stack{fill center}
<div class="t-lg muted" style="text-align:center">
Idée sur sélection de modèle :<br />
<a href="https://github.com/Lazco-Corporation/pi-rich-model-selector">https://github.com/Lazco-Corporation/pi-rich-model-selector</a>
</div>
::
