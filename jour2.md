---
theme: ./theme
title: Atelier, acte 2 - IA4Dev 2026
info: |
  IA4Dev 2026 - ANF jour 2, octobre 2026
  Max Beligné (PUD-GA / MSH Alpes / UGA) · Loïc Gouarin (CMAP / CNRS / École polytechnique)
author: Max Beligné, Loïc Gouarin
lang: fr
colorSchema: auto
# Logo de l'organisation AI-for-dev (dépôt AI-for-dev/.github, profile/brand).
favicon: /favicon.svg
themeConfig:
  footer: IA4Dev 2026 · ANF jour 2
  authors: Max Beligné · Loïc Gouarin
  license: CC BY-SA 4.0
  licenseUrl: https://creativecommons.org/licenses/by-sa/4.0/deed.fr
  # Le même deck en anglais, relatif à celui-ci (/slides/jour2/).
  translation: ../en/jour2/
# Publié sous /slides/jour2/ : le 404.html de GitHub Pages est celui de
# l'accueil, donc les liens profonds passent par le hash.
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
IA4Dev 2026 · ANF jour 2
::
::LogoBar{size=46}
::
:::

::CoverTitle{sub="Comprendre et construire son harnais" style="transform: translateY(-2rem)"}
# Atelier<br />Acte 2
::

:::Cols{cols="1fr auto" align=end}
::Stack{gap=2}
:Rule{width="210px"}

:Author{name="Max Beligné" org="PUD-GA / MSH Alpes / UGA"}
:Author{name="Loïc Gouarin" org="CMAP / CNRS / École polytechnique"}
::
::CoverMeta
:License
Octobre 2026
::
:::

---
# V2 court : 6 h en salle. Les slides de mode d’emploi passent en annexe, chaque exercice suit le même déroulé (prédire, lancer deux fois, lire la session)
section: Introduction
---

# Le programme du jour :Hint[installation et configuration : en annexe]

::::Stack{gap=1}
::Act{n=1 title="Premier pas avec Pi"}
Installer, prendre herdr en main, comparer les modèles
::
::Act{n=2 title="Sécurité et sandbox"}
Mesurer ce que vaut une consigne face à un garde-fou
::
::Act{n=3 title="Contexte"}
Lire une session, ce qui remplit la fenêtre, ce que ça coûte
::
::Act{n=4 title="Évaluer"}
Mesurer les leviers du contexte sur trois modèles, avec trysquare
::
::Act{n=5 title="Skills"}
Écrire une procédure de travail, puis mesurer ce qu’elle produit
::
::::

::::Stack{gap=1 .mt-4}
::Note{tag="Version écrite"}
Chaque partie suit un module du cours :
[Pi](https://ai-for-dev.github.io/hands-on-harness/act1-pi),
[sandbox](https://ai-for-dev.github.io/hands-on-harness/act2-sandbox),
[contexte](https://ai-for-dev.github.io/hands-on-harness/act2-contexte),
[trysquare](https://ai-for-dev.github.io/hands-on-harness/act3-trysquare) et [mesures](https://ai-for-dev.github.io/hands-on-harness/act3-contexte),
[skills](https://ai-for-dev.github.io/hands-on-harness/act2-skill)
::
::::

---
# V2 court : le déroulé commun des exercices, pour travailler l’esprit critique
section: Introduction
---

# Comment nous allons travailler

::::::Stack{fill center gap=6}
::Lead
Une exécution unique ne dit presque rien d’un modèle. <br /> Chaque exercice de la journée suit donc le même déroulé.
::

::::Cols{cols=3 gap=5}
::Step{n=1 title="Prédire"}
Avant de lancer, posez-vous quelques questions : quel modèle réussit, ce qu’il va lire, combien de tours il lui faut.
::
::Step{n=2 title="Lancer deux fois"}
La même demande sur deux modèles, ou avec deux réglages, chacune dans une session neuve.
::
::Step{n=3 title="Lire la session"}
Comparez ce que l’agent a lu et fait, pas seulement le résultat. `/export` vous donne la session en html.
::
::::

::Takeaway
L'analyse des traces permet de connaître finement les qualités et les défauts d'un modèle. <br /> Vous savez ensuite dire quel modèle utiliser selon vos besoins.
::
::::::

---
layout: section
index: Partie 1 / 5
---

::SectionHead{num="01"}
# Premier pas<br />avec Pi
::

::Agenda
- Ce que fait Pi quand vous lui posez une question
- Installer Pi et herdr
- Prendre Herdr et Fresh en main
- Se connecter aux modèles de la formation
- Comparer deux modèles et deux niveaux de réflexion
::

---
section: Partie 1 · Premier pas avec Pi
---

# Une requête qui lit un seul fichier

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
# Procédures tirées de pi.dev/docs/latest/quickstart et herdr.dev/docs/install (octobre 2026)
section: Partie 1 · Premier pas avec Pi
---

# Installer Pi et herdr :Hint[macOS et Linux]

::::::Stack{fill center gap=6}
::::Cols{cols=2 gap=7 align=start}
:::Stack{gap=3 .code-sm}
:Eyebrow[Pi · l’agent]

```bash
curl -fsSL https://pi.dev/install.sh | sh
pi --version      # vérifier
pi update         # mettre à jour
```

::Detail
Ou via npm, avec Node.js 22.19 ou plus récent :
::

```bash
npm install -g --ignore-scripts \
  @earendil-works/pi-coding-agent
```

::Detail
Windows : [pi.dev/docs/latest/quickstart](https://pi.dev/docs/latest/quickstart)
::
:::

:::Stack{gap=3 .code-sm}
:Eyebrow[herdr · le multiplexeur]{tone=teal}

```bash
curl -fsSL https://herdr.dev/install.sh | sh
herdr             # lancer, pour vérifier
herdr update      # mettre à jour
```

::Detail
Ou via Homebrew, qui gère alors les mises à jour :
::

```bash
brew install herdr
brew upgrade herdr
```

::Detail
Windows : [herdr.dev/docs/install](https://herdr.dev/docs/install)
::
:::
::::

::Takeaway
Si le terminal ne trouve pas la commande, ouvrez-en un nouveau : l’installeur a ajouté le dossier au `PATH`.
::
::::::

---
section: Partie 1 · Premier pas avec Pi
---

# Prendre Herdr en main

:::Stack{gap=3}
:Eyebrow[Dans le terminal]

```bash
herdr
```

::Note{tag="Raccourci essentiel"}
Appuyez sur `Ctrl+B`, relâchez, puis choisissez une touche.<br />Par exemple, `?` affiche la liste complète des raccourcis actifs.
::
:::

::Lead{.mt-3}
**La souris fonctionne aussi pour naviguer.**
::

::::Cols{cols="3fr 2fr" gap=6 align=center .mt-2}
<Fig src="/images/herdr-interface.jpg" frame="screen" h="13.6rem" caption="Interface" />
<Fig src="/images/herdr-tree.png" h="13.6rem" caption="Schéma fonctionnel" />
::::

---
section: Partie 1 · Premier pas avec Pi
---

# Utiliser Fresh dans Herdr

::::::Stack{fill center gap=5}
:::Stack{gap=3}
:Eyebrow[Dans un pane herdr]

```bash
fresh
```
:::

::::Cols{cols=2 gap=5 align=stretch}
:::Card{variant=soft eyebrow="Clavier" title="Afficher l’explorateur"}
`Ctrl+B` affiche ou masque l’explorateur, mais herdr utilise déjà ce raccourci.

`Ctrl+B`, relâchez, puis `Ctrl+B` : herdr transmet alors un `Ctrl+B` à Fresh.
:::
:::Card{variant=soft eyebrow="Souris" tone=teal title="Ouvrir le menu contextuel d’un fichier"}
Un clic droit affiche le menu de herdr, qui le garde pour lui.

`Ctrl` + clic droit transmet le clic à Fresh, qui affiche le menu contextuel du fichier.
:::
::::
::::::

---
# V2 : JSON corrigé (virgules en trop) et second modèle repris du cours ; note du cours sur le bloc cost
section: Partie 1 · Premier pas avec Pi
routeAlias: connecter
---

# Se connecter à des modèles :Hint[pi.dev/docs/latest/providers]{href="https://pi.dev/docs/latest/providers"}

::Lead
**Méthode 1** : si vous avez une clé API, en modifiant votre `~/.pi/agent/models.json`
::

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Cell{.code-xs}
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
          "cost": { "input": 0.14, "output": 0.28,
                    "cacheRead": 0.0028, "cacheWrite": 0 }
        },
        { "id": "qwen-3.8-27b", "contextWindow": 256000 }
      ]
    }
  }
}
```
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="Le bloc cost" size=sm}
Optionnel, à zéro par défaut : sans lui, `/session` annonce un coût nul. Les prix sont au million de tokens.
::
::Note{tag="À retenir"}
Le coût qu’affiche un agent ne vient pas du fournisseur : c’est une multiplication faite à partir d’un champ que **vous** avez écrit.
::
:::
::::

---
# D’après le README et extensions/index.ts de github.com/AI-for-dev/providers (octobre 2026)
section: Partie 1 · Premier pas avec Pi
---

# Se connecter à des modèles :Hint[github.com/AI-for-dev/providers]{href="https://github.com/AI-for-dev/providers"}

::Lead
**Méthode 2** : avec le paquet de la formation, qui ajoute nos deux fournisseurs à Pi
::

::::Cols{cols="5fr 6fr" gap=7 fill align=center}
:::Stack{gap=3}
:Eyebrow[Installer, une seule fois]

```bash
pi install npm:@ai-for-dev/providers
```

:Eyebrow[Se connecter]{.mt-2}

1. Lancez `pi`
2. Tapez `/login ia4dev-ilaas` ou `/login ia4dev-gricad`
3. Collez votre clé API
4. Choisissez un modèle avec `/model`
:::

:::Stack{gap=4}
::Card{variant=soft eyebrow="Ce que le paquet règle pour vous" tone=teal}
- **la liste des modèles**, lue sur le serveur avec votre clé
- **la fenêtre**, **la lecture d’images** et **le raisonnement** de chaque modèle, mesurés sur les serveurs
::

::Note{tag="Méthodes 1 et 2"}
Un fournisseur de même nom dans `~/.pi/agent/models.json` prend le dessus sur celui du paquet.
::
:::
::::

---
# Chiffres relevés sur les fiches Hugging Face (octobre 2026) : google/gemma-4-31B-it, Qwen/Qwen3.8-27B,
# deepseek-ai/DeepSeek-V4-Flash, deepseek-ai/DeepSeek-V4.1-Flash, zai-org/GLM-5.2, zai-org/GLM-5.3.
# V4.1 Flash : 552B de backbone (763B sur le Hub avec la mémoire Engram), 8B actifs au prefill, 16B au décodage.
# GLM-5.3 reprend la base de GLM-5.2, seul le post-entraînement change.
section: Partie 1 · Premier pas avec Pi
---

# Deux familles de modèles :Hint[tous open weight]

::::::Stack{fill center gap=6}
::::Cols{cols=4 gap=4 align=stretch}
:::Card{eyebrow="Google" title="Gemma 4 31B" size=sm}
::Specs{w="5rem"}
- **Type** dense
- **Taille** 31B
- **Fenêtre** 256K
- **Licence** Apache 2.0
::
:::
:::Card{eyebrow="Alibaba" title="Qwen3.8 27B" size=sm}
::Specs{w="5rem"}
- **Type** dense
- **Taille** 27B
- **Fenêtre** 256K
- **Licence** Apache 2.0
::
:::
:::Card{variant=soft eyebrow="DeepSeek" tone=teal title="V4 et V4.1 Flash" size=sm}
::Specs{w="5rem"}
- **Type** MoE
- **V4** 284B A13B
- **V4.1** 552B A16B
- **Fenêtre** 1M
- **Licence** MIT
::
:::
:::Card{variant=soft eyebrow="Z.ai" tone=teal title="GLM 5.2 et 5.3" size=sm}
::Specs{w="5rem"}
- **Type** MoE
- **Taille** 753B A40B
- **Fenêtre** 1M
- **Licence** MIT (5.2)<br />maison (5.3)
::
:::
::::

::::Cols{cols=2 gap=4}
::Note{tag="Dense"}
Tous les paramètres travaillent à chaque token. Une trentaine de milliards : ces modèles tiennent sur un GPU, une fois quantifiés.
::
::Note{tag="MoE"}
Seuls quelques experts s’activent par token (le « A » : A13B, A40B). Trop gros pour un poste de travail, on les utilise via un fournisseur.
::
::::
::::::

---
# Fenêtres, vision et raisonnement : table ENDPOINTS de github.com/AI-for-dev/providers (extensions/index.ts),
# valeurs mesurées sur les serveurs. La vision concorde avec pi.dev/models et le pipeline_tag des fiches Hugging Face.
# Raisonnement : « always » sur l’offre Scaleway, « toggle » pour Qwen3.6 et Gemma 4, par niveau pour Qwen3.8 et DeepSeek V4.1 sur GRICAD.
section: Partie 1 · Premier pas avec Pi
---

# Les modèles de la formation :Hint[configuration des endpoints]{to="connecter"}

::::::Stack{fill center gap=4}
:Eyebrow[Chaque ligne : la fenêtre de contexte servie par la plateforme]{tone=quiet}

::::Cols{cols="1.15fr 1fr 1fr" gap=5 align=stretch}
:::Card{variant=accent eyebrow="ILaaS" title="Offre Scaleway (crédits limités)"}
- **GLM 5.2** · 256K
- **GLM 5.3** · 256K
- **DeepSeek V4.1 Flash** · 256K
- **DeepSeek V4 Flash 0731** · 256K
- **Qwen3.8 27B** · 262K
:::
:::Card{variant=soft eyebrow="ILaaS" title="Hors offre Scaleway"}
- **Qwen3.6 35B Instruct** · 262K
- **Gemma 4 31B** · 131K
:::
:::Card{variant=teal eyebrow="GRICAD" title="Plateforme IA4Dev"}
- **Qwen3.8 27B** · 262K
- **DeepSeek V4.1 Flash** · 1M
- **Gemma 4 31B** · 159K
:::
::::

::::Stack{gap=2}
::Note{tag="Vision"}
Gemma 4, Qwen3.6, Qwen3.8 et DeepSeek V4.1 Flash lisent aussi les images. GLM et DeepSeek V4 Flash, non.
::
::Note{tag="Réflexion"}
Toujours active sur l’offre Scaleway. Qwen3.6 et Gemma 4 l’activent ou non. Sur GRICAD, Qwen3.8 et DeepSeek V4.1 se règlent par niveau avec `Shift+Tab`.
::
::::
::::::

---
# V2 : NÉON s’importe sur un GitLab avant d’être cloné ; essais en low et high
section: Partie 1 · Premier pas avec Pi
---

# Exercice : premiers essais sur NÉON

:::::Stack{fill center gap=3}
::::Cols{cols="6fr 5fr" gap=7 align=start}
:::Stack{gap=3}
:Eyebrow[Préparer, une seule fois]{tone=quiet}

1. Importez [github.com/AI-for-dev/neon](https://github.com/AI-for-dev/neon) sur un GitLab (*Import project*), puis clonez-le
2. Dans votre terminal, lancez `herdr`
3. Dans `neon`, créez la branche `dev` et placez-vous dessus
4. Ouvrez votre IDE, ou `fresh` dans un 2e onglet herdr
5. Lancez `pi` dans le premier onglet

:::

:::Stack{gap=3}
:Eyebrow[Essayer, quatre sessions neuves]

::Lead
Notez votre prédiction, puis commencez par :
::

```text
Sans modifier le code, explique-moi…
```

::Matrix{size=md first="9rem"}
| | réflexion low | réflexion high |
| --- | --- | --- |
| `gemma-4-31b` | session 1 | session 2 |
| `qwen-3.8-27b` | session 3 | session 4 |
::
:::
::::

:Eyebrow[Raccourcis]{tone=quiet}

::::Cols{cols="6fr 5fr" gap=7}
:::Specs{w="8.5rem" raw}
- **/new** ouvre une session neuve
- **/model** choisit le modèle, `Ctrl+P` les fait défiler
- **/scoped-models** restreint la liste des modèles
:::
:::Specs{w="5.5rem" raw}
- **Shift+Tab** change la réflexion, comme `/thinking`
- **Ctrl+T** affiche ou masque la réflexion
- **Ctrl+S** garde ce modèle et ce niveau par défaut
:::
::::
:::::

---
layout: section
index: Partie 2 / 5
---

::SectionHead{num="02" detail="Isoler l’agent de votre machine"}
# Sécurité<br />et sandbox
::

::Agenda
- Ce qu’un agent de code peut faire sur votre machine
- Ce que protège chaque niveau d’isolation
- Un garde-fou dans Pi : `pi-permission-system`
- Une consigne contre un garde-fou : compter les refus
::

---
# V2 : incident sourcé, https://huggingface.co/blog/agent-intrusion-technical-timeline (27/07/2026)
section: Partie 2 · Sécurité et sandbox
---

# Distinguer les problèmes

:::::Stack{fill center gap=6}
::::Cols{cols=3 gap=5}
:::Card{badge="1" title="Le partage avec un fournisseur" center}
Secrets ou données envoyés à OpenAI, Anthropic, OpenCode… avec le contexte de la requête.
:::
:::Card{badge="2" title="Un contenu malveillant" center}
Un dépôt, une extension ou un skill piégés. Le `SUPPORT.md` de NÉON demande d’envoyer le `.env` à un tiers : l’agent qui l’ouvre traite l’instruction comme si elle venait de vous.
:::
:::Card{badge="3" title="Le modèle lui-même" center}
Les modèles les plus récents peuvent agir sans être contrôlés.
::Detail
ex. juillet 2026 : des modèles OpenAI en évaluation sortent de leur bac à sable et piratent Hugging Face pour tricher au test
::
:::
::::

::Takeaway
Une consigne (« ne lis rien hors du dépôt ») reste du texte, suivi ou non par un modèle non déterministe.
Il faut une limite **qui ne dépende pas de son obéissance**.
::
:::::

---
section: Partie 2 · Sécurité et sandbox
---

# Pi n’a pas de bac à sable :Hint[pi.dev/docs/latest/security]{href="https://pi.dev/docs/latest/security"}

::Lead
Les outils de Pi lisent, écrivent et lancent des commandes « with the permissions of the pi process ».
Tout ce que vous faites depuis votre terminal, l’agent peut le faire aussi.
::

::::Cols{cols=3 gap=5 fill .mt-2}
:::Card{badge="1" title="Vos fichiers" center}
- le dépôt sur lequel il travaille
- `~/.ssh`, `~/.pi/agent/auth.json`
- les `.env` de vos autres projets
:::
:::Card{badge="2" title="Le réseau" center}
- installer n’importe quel paquet
- exécuter un `curl | sh` lu dans un README
- envoyer ce qu’il vient de lire
:::
:::Card{badge="3" title="Vos processus" center}
- le démon Docker, la commande `rm`
- `git push --force` sur le dépôt distant
- et `sudo`, si vous l’avez
:::
::::

::Note{tag="La doc de Pi" .mt-5}
« For untrusted repositories, generated code you do not intend to monitor closely, or unattended automation, run pi in a contained environment. »
::

---
# NOUVEAU V2 : tableau du cours (module sandbox)
section: Partie 2 · Sécurité et sandbox
---

# Ce que chaque niveau protège

:::Stack{fill center gap=6}
::Matrix{size=md first="15rem" left}
| ce qui est protégé | clone jetable | conteneur | Docker Sandboxes |
| --- | --- | --- | --- |
| votre répertoire personnel | :Mark{v=no} | :Mark[si seul le dépôt est monté]{v=part} | :Mark{v=yes} |
| le réseau sortant | :Mark{v=no} | :Mark[ouvert par défaut]{v=no} | :Mark[refus par défaut, liste d’autorisations]{v=yes} |
| vos clés d’API | :Mark{v=no} | :Mark[elles entrent dans l’image]{v=no} | :Mark[seul le proxy de l’hôte les voit]{v=yes} |
::

::Takeaway
Ces niveaux isolent Pi de l’hôte. À l’intérieur, rien n’empêche encore un `rm -rf` sur le dépôt ou la lecture d’un `.env` : c’est le rôle d’un garde-fou dans Pi.
::
:::

---
section: Partie 2 · Sécurité et sandbox
---

# Un garde-fou dans Pi : pi-permission-system :Hint[pi.dev/packages]{href="https://pi.dev/packages/@gotgenes/pi-permission-system"}

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=4}
L’extension s’attache à l’événement `tool_call` : chaque outil, commande bash, appel MCP ou skill est comparé
à des règles `allow` / `deny` / `ask` **avant** de s’exécuter.

::Specs{w="4.5rem"}
- **Global** `~/.pi/agent/extensions/…/config.json`
- **Projet** `.pi/extensions/…/config.json`, si le projet est approuvé
- **Agent** l’en-tête YAML du fichier d’agent, qui l’emporte
::
:::

:::Stack{gap=2 .code-sm}
```bash
pi install -l npm:@gotgenes/pi-permission-system
```

```json
{
  "permission": {
    "*": "allow",
    "path": {
      "*": "allow", "*.env": "deny", "*.env.*": "deny",
      "*.env.example": "allow"
    },
    "bash": {
      "*": "ask", "rm -rf *": "deny", "sudo *": "ask"
    },
    "external_directory": "ask"
  }
}
```

::Detail
La règle la plus spécifique l’emporte. Une commande que l’analyseur ne sait pas classer est refusée.
::
:::
::::

---
section: Partie 2 · Sécurité et sandbox
---

# Créer un espace jetable avec un worktree

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=4}
::Lead
Un **worktree Git** est un exemple de « clone jetable ». De plus, c’est une bonne pratique si plusieurs agents travaillent sur un même projet.
::

:::Card{variant=soft eyebrow="À ne pas confondre" tone=teal}
::Specs{w="7rem"}
- **Branche** un historique distinct
- **Worktree** un répertoire distinct
::

Le worktree partage l’historique Git du dépôt : ce n’est pas une copie indépendante.
:::
:::

:::Stack{gap=3 .code-sm}
:Eyebrow[Depuis le dépôt NÉON]{tone=quiet code}

```bash
herdr worktree create \
  --branch atelier/garde-fou \
  --base dev \
  --focus
```

:::Card{variant=accent eyebrow="Créé par herdr"}
Herdr range tous ses worktrees sous :

`~/.herdr/worktrees/`

`--focus` ouvre le nouveau worktree dans herdr.
:::
:::
::::

::Takeaway{.mt-4}
Pour l’exercice, ce répertoire joue le rôle du clone jetable : vos essais restent hors du répertoire de travail principal.
::

---
# NOUVEAU V2 : exercice en salle du cours (module sandbox)
section: Partie 2 · Sécurité et sandbox
---

# Exercice : une consigne contre un garde-fou

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{variant=accent eyebrow="En salle · 1" size=sm}
Dans un **clone jetable** de NÉON, déposez la configuration ci-dessus dans le `.pi` du projet, puis demandez à Pi :

1. de lire le `.env`
2. d’effacer `game/` avec `rm -rf`
3. de lancer les tests

Les deux premières sont refusées sans vous consulter, la troisième vous demande confirmation.
:::
:::Card{variant=accent eyebrow="En salle · 2" size=sm}
Reposez la lecture du `.env` trois fois en la reformulant, puis en expliquant que vous êtes le propriétaire du fichier.

Le verdict ne bouge pas : il vient d’une règle évaluée **avant** l’appel d’outil, pas d’un arbitrage du modèle.
:::
:::Card{variant=accent eyebrow="En salle · 3" size=sm}
Retirez le bloc `path` et écrivez à la place « ne lis jamais de fichier `.env` » dans `AGENTS.md`.

Reposez la demande dans cinq sessions et **comptez les refus** : vous avez votre propre chiffre sur ce que vaut une consigne.
:::
::::
:::::

---
# D’après le cours, module sandbox (« Trois niveaux d’isolation ») et docs.docker.com/ai/sandboxes/security
# Kits comptés le 16 oct. 2026 dans github.com/docker/sbx-kits-contrib (dossiers avec spec.yaml) : 33 kind: sandbox, 37 kind: mixin
section: Partie 2 · Sécurité et sandbox
---

# Docker Sandboxes : une micro-VM à politique :Hint[docs.docker.com/ai/sandboxes]{href="https://docs.docker.com/ai/sandboxes/"}

:::::Stack{fill center gap=6}
::Lead
Le troisième niveau du tableau. Pi tourne dans sa propre machine virtuelle, et tout ce qui en sort passe par l’hôte.
::

::::Cols{cols=3 gap=5 align=stretch}
:::Card{title="La micro-VM" size=sm}
- Son propre noyau, derrière un hyperviseur
- Le dépôt monté au même chemin que sur l’hôte, et rien d’autre
- Pi y est administrateur : la VM est jetable
:::
:::Card{variant=teal title="Le proxy de l’hôte" size=sm}
- Tout le trafic sortant passe par lui
- Refus par défaut, puis une liste de domaines autorisés
- Il pose la clé dans l’en-tête HTTP : « Credential values never enter the VM »
:::
:::Card{variant=soft title="Le coût" size=sm}
- Une image de 650 Mo et un démon sur l’hôte
- Une liste de domaines à entretenir
- Pi n’est pas connu de `sbx` : il faut un kit,<br />[AI-for-dev/ai4dev-pi-kit](https://github.com/AI-for-dev/ai4dev-pi-kit)
:::
::::

:Pipeline{label="La clé" flow="Pi lit une sentinelle > le proxy de l’hôte pose la clé > llm.ilaas.fr seulement"}

::Detail
Docker publie aussi 70 kits dans [docker/sbx-kits-contrib](https://github.com/docker/sbx-kits-contrib) : 33 agents, dont Pi (`sbx/pi-kit`), et 37 compléments comme GitLab, Playwright ou Trivy.<br />
Mise en route avec notre kit, gestion des clés et limites du bac à sable : cf. annexe.
::
:::::

---
# V2 court : le kit Docker Sandboxes est en annexe ; le point 2 reprend l’exercice consigne contre garde-fou
section: Partie 2 · Sécurité et sandbox
---

# Généraliser

::::Stack{fill gap=4 center}
:::Item{variant=goal n=1}
Une frontière qui ne dépend pas de l’obéissance
::Detail
Une permission écrite dans `AGENTS.md` ou `SKILL.md` est une suggestion. Un garde-fou est évalué avant l’appel d’outil, et le bac à sable tient quand le harnais lui-même est en faute.
::
:::
:::Item{variant=goal n=2 ghost}
Expérimenter plutôt que croire
::Detail
Vos essais successifs vous donnent la tendance, qui dépend du modèle et du remplissage du contexte. Ils vous permettent de faire les bons choix et de bien dessiner cette frontière.
::
:::
:::Item{variant=goal n=3 ghost}
Isoler l’agent de la machine
::Detail
La clé reste sur l’hôte et le réseau est refusé par défaut. L’annexe B montre comment avec le kit Docker Sandboxes.
::
:::
::::

---
layout: section
index: Partie 3 / 5
---

::SectionHead{num="03" detail="Ce qu’on y met, ce que ça coûte"}
# Le contexte
::

::Agenda
- Ce qu’il y a réellement dans la fenêtre
- Une session : la reprendre, l’exporter, la lire
- Configurer Pi : outils, réglages, AGENTS.md
- Gérer la fenêtre : sous-agents, compaction
::

---
# NOUVEAU V2 : les cinq sources et la mesure « dis juste OK », d’après le cours (module contexte)
section: Partie 3 · Contexte
---

# Cinq sources, une seule fenêtre

::::Cols{cols="1fr 19rem" gap=7 fill align=center}
:::Cell
<ContextStack />
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="« Dis juste OK »" tone=teal size=sm}
Sans fichier de contexte, skill ni extension, l’entrée pèse **1 660 tokens**. Avec un prompt système de trois lignes : **1 110**.
Celui de Pi coûte donc environ 550 tokens.
::
::Note
L’essentiel ne vient pas du harnais, mais de ce que vous et l’agent déversez au fil de la session.
::
:::
::::


---
section: Partie 3 · Contexte
---

# Comprendre les sessions

::Lead
Tout ce que vous avez fait jusqu’ici s’est fait dans une session.
En bas de votre onglet Pi, vous avez dû voir votre contexte augmenter.
::

::::Cols{cols="11fr 9fr" gap=8 fill align=center}
:::Stack{gap=3}
:Eyebrow[À faire, dans l’ordre]

::Specs{w="6.5rem" raw}
- **/new** ouvrez une seconde session et posez-y une autre question, toujours en commençant par « Sans modifier le code,… »
- **/resume** revenez à la première session
- **/name** donnez-lui un nom
- **/tree** naviguez dans son historique
::
:::

:::Stack{gap=4}
::Note{tag="Après /new"}
Le contexte affiché en bas de l’onglet revient à zéro.
::
::Note{tag="Avec /tree"}
Revenir à un instant t ne restaure pas vos fichiers. L’extension `pi-workspace-history` relie l’historique à vos modifications.
::
:::
::::

::Takeaway
Une nouvelle session dès que vous changez de sujet.
::

---
section: Partie 3 · Contexte
---

# Exporter une session

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Cell
<Fig src="/images/jour2/pi-export-session.jpg" frame="screen" caption="Export html d’une session NÉON" />
:::

:::Stack{gap=3}
::Specs{w="5.5rem" raw}
- **/session** les statistiques de la session, et le fichier `.jsonl` où elle est stockée
- **/export** la même session en html, lisible dans un navigateur
::

:Eyebrow[Dans l’export]{tone=quiet .mt-6}

::Specs{w="5.5rem"}
- **À gauche** le fil : chaque message, chaque appel d’outil
- **En tête** le modèle, les tokens, le coût
- **En italique** la réflexion du modèle
::
:::
::::

::Takeaway
Exportez votre session en html, ouvrez-la et commencez à la lire.
::

---
# NOUVEAU V2 : tarifs et cache mesuré, d’après le cours (module contexte)
# Tarifs Zen et rapports mis à jour le 15 oct. 2026 d’après le cours (hands-on-harness #45)
section: Partie 3 · Contexte
---

# Que coûte un appel ? :Hint[Tarifs opencode Zen, au million de tokens]{href="https://opencode.ai/docs/zen/"}

::::Cols{cols=2 gap=9 fill align=center}
:::Stack{gap=5}
::Matrix{size=md}
| modèle | entrée | sortie | lecture de cache |
| --- | --- | --- | --- |
| `deepseek-v4.1-flash` | 0,30 $ | 1,20 $ | 0,006 $ |
| `deepseek-v4-pro` | 1,74 $ | 3,48 $ | 0,145 $ |
::

::Note{tag="ILaaS"}
Gratuit pour la formation, et ne rapporte pas le cache : `cacheRead` y vaut toujours zéro. Vous y compterez des tokens plutôt que des euros.
::
:::

:::Stack{gap=4}
::Bullet{k="×6" accent}
Le `pro` coûte 5,8 fois le `flash` en entrée, 2,9 fois en sortie.
::
::Bullet{k="×50" accent}
Entre l’entrée et la lecture de cache : **×50** sur `flash`, ×12 sur `pro`.
::
::Card{variant=soft size=sm}
C’est ce second écart qui rend un agent viable : il relit tout son historique à chaque tour, et paierait sinon vingt fois son contexte sur une session de vingt tours.
::
:::
::::

---
# Séquence remesurée le 15 oct. 2026 avec deepseek-v4.1-flash, coûts aux tarifs Zen, d’après le cours (hands-on-harness #47).
# Le premier tour prend trois appels dans 7 passages sur 10 (recherche du fichier avec bash), deux sinon.
section: Partie 3 · Contexte
---

# Le cache, mesuré :Hint[Cinq tours sur game/theme.js, bascule de modèle au 4e]

::Matrix{size=xs first="3.4rem"}
| appel | tour | prompt | modèle | entrée | sortie | lecture de cache | coût |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | « Lis `game/theme.js`… » | `flash` | 1 718 | 92 | 0 | 0,000626 $ |
| 2 | 1 | (lecture du fichier) | `flash` | 621 | 138 | 1 664 | 0,000362 $ |
| 3 | 1 | (réponse) | `flash` | 472 | 70 | 2 176 | 0,000239 $ |
| 4 | 2 | « cite une couleur… » | `flash` | 182 | 53 | 2 560 | 0,000134 $ |
| 5 | 3 | « combien de couleurs… » | `flash` | 130 | 82 | 2 688 | 0,000154 $ |
| 6 | 4 | « confirme ce nombre… » | `pro` | 2 995 | 41 | **0** | **0,005354 $** |
| 7 | 5 | « redis ce nombre… » | `pro` | 111 | 17 | 2 944 | 0,000679 $ |
::

::::Cols{cols=2 gap=6 .mt-3}
::Takeaway
**Ce qui est stable devant, ce qui varie derrière.** Le cache ne marche que sur un préfixe inchangé :
un horodatage ou un `git status` dans le prompt système fait tout repayer, à chaque tour.
::
::Takeaway
**Changer de modèle n’est pas gratuit.** La bascule remet le cache à zéro : ce tour coûte huit fois le suivant, à modèle identique.
::
::::

---
section: Partie 3 · Contexte
---

# Pi est un harnais minimal

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3}
Plusieurs manières de l’étendre :

::Musts
- AGENTS.md
- prompt template
- extension
- skill
- …
::
:::
:::Stack{gap=5}
::Card{variant=soft eyebrow="Définition d’une extension"}
**Un module TypeScript/JavaScript chargé par Pi, qui utilise l’API d’extension pour construire de nouvelles capacités.**
::

De nombreuses extensions existent déjà sur [pi.dev/packages](https://pi.dev/packages).
:::
::::

---
# V2 : /tools et l’exercice du cours ajoutés
section: Partie 3 · Contexte
---

# Quatre outils par défaut

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Chips
- read
- write
- edit
- bash
::

::Lead
Suffisant dans la plupart des cas.
::

::Card{variant=accent eyebrow="En salle" size=sm}
Avec vos questions, essayez de déclencher chacun de ces quatre outils.
::
:::
:::Card{variant=soft eyebrow="Pour les gros dépôts, des extensions" tone=teal size=sm}
::Specs{w="9.5rem" raw}
- **pi-fff** indexe vos fichiers, recherche floue optimisée : « où est le code ? »
- **@henryqw/pi-codegraph** navigue dans le graphe de code ; `pi-codegraphcontext` est plus puissant mais exige un MCP : « comment le code est-il relié ? »
- **pi-gitnexus** une approche par graphe de connaissance : « comment le code est-il relié au reste du système et de l’organisation ? »
::

::Detail{.mt-3}
`pi-gitnexus` est sous MIT, mais le moteur GitNexus est sous PolyForm Noncommercial. Graphify est sous Apache 2, ses extensions pour Pi (`@wwjd/pi-graphify`…) sous MIT.
::
:::
::::

---
# NOUVEAU V2 : le niveau de raisonnement, d’après le cours (curseurs à la main)
section: Partie 3 · Contexte
---

# Un réglage exposé n’est pas forcément transmis

:::::Stack{fill center gap=6}
::Lead
`pi --help` annonce sept niveaux de raisonnement, de `off` à `max`.
::

::::Cols{cols=2 gap=8 align=center}
:::Stack{gap=4}
::Card{variant=accent eyebrow="En salle" size=sm}
Lancez la même tâche avec `--thinking minimal`, puis `--thinking max`, sur `gemma-4-31b` : **aucun écart**, les deux produisent la même requête. Ce modèle n’a que `on` et `off`.

Refaites la comparaison entre deux niveaux réellement distincts, `off` et `high`.
::
:::
:::Stack{gap=4}
::Card{variant=soft size=sm}
Entre la configuration que vous tapez et la requête qui part vers le serveur d’inférence, il y a une **table de correspondance** écrite par quelqu’un, qui peut être incomplète.
::
::Takeaway
Cherchez où atterrit un flag avant de lui faire confiance.
::
:::
::::
:::::

---
section: Partie 3 · Contexte
---

# Avec les modèles récents, un AGENTS.md minimal

::Lead
N’y mettre que ce qui concerne les **problèmes récurrents**.
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
# V2 : budget de 40 lignes et option -nc d’après le cours (module contexte)
section: Partie 3 · Contexte
---

# Un AGENTS.md évolue dans le temps

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=4}
::Card{variant=soft eyebrow="Avec un nouveau modèle, deux stratégies" size=sm}
- tout effacer, et reconstruire au fur et à mesure que des problèmes réapparaissent… ou pas
- évaluer l’impact en ne retirant que les parties qu’on suppose inutiles, avec l’outil [trysquare](https://github.com/AI-for-dev/trysquare) par exemple
::
::Card{variant=teal eyebrow="Un AGENTS.md peut en cacher un autre" tone=teal size=sm}
Pi les cumule : `~/.pi/agent/`, chaque répertoire parent, puis le répertoire courant. `-nc` coupe cette découverte, indispensable pour mesurer.
::
:::
:::Card{variant=accent eyebrow="Budget : 40 lignes" center}
L’`AGENTS.md` de NÉON ne dépassera jamais 40 lignes. Pour ajouter une règle, il faut d’abord en retirer une, ou fusionner les deux.

:Rule

Chaque ligne entre dans le contexte **à chaque tour**, et les modèles suivants en rendront certaines inutiles.
:::
::::

---
# D’après le cours, module contexte : exercice « Écrivez l’AGENTS.md de NÉON » ; base reprise de scripts/trysquare-campaign/briques/AGENTS.md.
# La demande négligée est celle de l’issue #1 (partie 4). Le cours note qu’avec elle l’agent ne lance en général pas la suite de tests.
section: Partie 3 · Contexte
---

# Exercice : tester l’AGENTS.md de NÉON

::::Cols{cols="5fr 6fr" gap=8 fill align=start .mt-6}
:::Stack{gap=3 .code-sm}
:Eyebrow[neon/AGENTS.md, la base du cours]{tone=quiet code}

```md
# NÉON

- Une tâche = un ticket. Ne traite pas
  d'autre issue en passant.
- Ne renomme ni ne supprime un export de
  `game/neon.js` : les tests en dépendent.
- Zéro dépendance : aucun paquet, aucun CDN.
- Les tests se lancent avec `npm test`.
```

::Detail
À poser à la racine de votre clone, sur la branche `dev`.
::
:::

:::Stack{gap=3}
:Eyebrow[Mesurer, deux sessions neuves]

1. Sans le fichier, lancez `pi -nc` et donnez la demande négligée : « La balle traverse les briques au lieu de rebondir. Corrige ça. »
2. Avec le fichier, lancez `pi` et redonnez la même demande
3. Dans les deux sessions, regardez si l’agent a lancé `npm test` et ajouté un test
4. Ajoutez la règle qui manque : lancer les tests après chaque modification, en écrire s’il n’y en a pas. Relancez.

::Detail
`git restore .` entre deux sessions, pour repartir du même code.
::
:::
::::

::Takeaway
N’ajoutez une règle qu’après avoir vu l’agent échouer sans elle, et gardez le fichier sous 40 lignes.
::

---
section: Partie 3 · Contexte
---

# La gestion du contexte

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=3}
::Note{tag="Constat"}
Les performances baissent à mesure que la fenêtre se remplit, de façon variable selon les modèles.
::
::Bullet{k="1" accent}
Le plus simple : **une nouvelle session** pour chaque nouveau sujet, `/new`
::
::Bullet{k="2" accent}
**Déléguer** certaines étapes à un sous-agent : il cherche le contexte de sa tâche et ne renvoie que ses conclusions à l’agent principal (cf. délégation, demain)
::
::Bullet{k="3"}
`/handoff <but>` (extension d’exemple de Pi, ou paquet `pi-handoff`) écrit une note de la session et ouvre une nouvelle session avec
::
:::
:::Card{variant=soft eyebrow="La compaction" tone=teal}
Pi compacte automatiquement quand

```text
contextTokens > contextWindow - reserveTokens
```

`reserveTokens` vaut 16 384 par défaut. Pas conseillé d’arriver jusque-là.

`/compact` la déclenche quand vous le souhaitez, avec des instructions optionnelles pour orienter le résumé.
:::
::::

---
# V2 : exercice de la fenêtre bridée ajouté, d’après le cours
section: Partie 3 · Contexte
---

# Que se passe-t-il lors d’une compaction ?

::::Cols{cols=2 gap=7 fill}
:::Stack{gap=4}
Le LLM lit l’ancien historique et rédige un résumé structuré, avec la liste des fichiers lus et modifiés :

::Chips
- Goal
- Constraints & Preferences
- Progress
- Key Decisions
- Next Steps
- Critical Context
::

::Card{variant=soft eyebrow="Les derniers tokens restent intacts" size=sm}
`keepRecentTokens` vaut 20 000 par défaut : ces derniers tokens ne sont pas résumés mais gardés tels quels, à la suite du résumé. La coupure se voit dans `/tree`.
::
:::
:::Stack{gap=4}
::Card{variant=accent eyebrow="Plus artisanal" size=sm}
Créer un fichier `memory.md` et demander au LLM de l’écrire, en lui précisant les points importants. Demande une certaine rigueur.
::
::Card{variant=teal eyebrow="En autonomie" tone=teal size=sm}
Avec `gemma-4-31b` (128K, seuil vers 112 000), la compaction ne se déclenche pas sur NÉON. Déclarez un second fournisseur `ilaas-bride` qui annonce `"contextWindow": 32000`, travaillez jusqu’au déclenchement, puis lisez le résumé et la coupure dans `/tree`.
::
:::
::::

---
# NOUVEAU V2 : principes du module contexte du cours
section: Partie 3 · Contexte
---

# Généraliser :Hint[Ce qui reste vrai quand l’outil change]

::::Stack{fill gap=4 center}
:::Item{variant=goal n=1}
Stable devant, variable derrière
::Detail
Le prompt système, les fichiers de contexte et les outils au début ; ce qui varie à la fin. Changer de modèle ou d’outils en cours de session remet le cache à zéro.
::
:::
:::Item{variant=goal n=2 ghost}
Vérifier qu’un réglage arrive jusqu’au modèle
::Detail
`--thinking max` peut envoyer la même requête que `minimal`. Si vous testez les modèles, assurez-vous de bien vérifier les configurations des fournisseurs d'inférence.
::
:::
:::Item{variant=goal n=3 ghost}
Gérer ce qui entre et sort de votre fenêtre principale
::Detail
Un script, une commande ou `codemode` coûtent moins qu’une compaction, sauf sur une petite tâche.
::
:::
::::

---
# V3 : la partie suit le nouveau module 3.1 du cours (act3-contexte) : la matrice issue1-context croise quatre leviers et tourne sur trois modèles. Les anciennes mesures (gemma seul, août 2026) et le détail de trysquare sont retirés
layout: section
index: Partie 4 / 5
---

::SectionHead{num="04" detail="Les leviers du contexte, mesurés"}
# Évaluer
::

::Agenda
- trysquare, pour répéter une configuration et comparer
- L’expérience : quatre leviers du contexte, trois modèles
- Vérifier une campagne avant de lire ses scores
- Ce que change chaque levier, et pourquoi d’un modèle à l’autre
::

---
section: Partie 4 · Évaluer
---

# trysquare : répéter, noter, comparer :Hint[github.com/AI-for-dev/trysquare]{href="https://github.com/AI-for-dev/trysquare"}

::::Cols{cols="5fr 6fr" gap=7 fill align=center}
:::Stack{gap=4}
::Lead
Une exécution unique ne dit rien d’une configuration : sur six exécutions identiques de la base, le critère est manqué deux fois.
::

::Specs{w="6rem"}
- **Répéter** chaque configuration d’un scénario TOML, dans un clone jeté du tag `etalon-v1`
- **Noter** avec un script de validation qui rend ses métriques et la raison de chacune : un juge LLM est possible, nous l’évitons
- **Comparer** deux configurations : l’intervalle à 95 % de l’écart exclut-il zéro ?
::
:::
:::Stack{gap=3 .code-xs}
:Eyebrow[Exercice, dans trysquare-starter]{tone=teal}

```bash
# adapter [agent] à votre fournisseur, puis trois répétitions :
# 16 configurations × 3 = 48 exécutions, pendant la suite
uv run trysquare run scenarios/issue1-context.toml \
  --output results --repetitions 3

# analyser sans rappeler le modèle
uv run trysquare render scenarios/issue1-context.toml \
  --output results --repetitions 3
uv run trysquare replay results/issue1-context_… \
  --scenario scenarios/issue1-context.toml --rescore
uv run trysquare compare results/… results/…
```

::Note{tag="Avant de lancer"}
Pariez sur le levier qui aidera le plus votre modèle, et sur celui qui ne changera rien.
::
::Note{tag="En autonomie"}
Changez de modèle dans `[agent]` et comparez votre matrice aux nôtres.
::
:::
::::

---
section: Partie 4 · Évaluer
---

# L’expérience : quatre leviers croisés :Hint[16 configurations × 20 exécutions, par modèle]

::::Cols{cols="2fr 3fr" gap=7 fill align=center}
:::Stack{gap=4}
::Card{variant=soft eyebrow="La tâche : l’issue #1 de NÉON" size=sm}
La balle traverse les briques. Le commentaire du code décrit le correctif de base. `ISSUES.md` ajoute le coin, la jonction de deux briques, le tunneling et les tests rouges d’abord.
::
:Eyebrow[Notée par une sonde et par le diff]{tone=teal}

::Specs{w="5.5rem"}
- **critère** sur chaque face, l’axe touché s’inverse et l’autre non
- **coin** les deux composantes s’inversent
- **tunneling** une balle rapide ne traverse plus
- **tests** la suite compte plus de cas qu’au départ
::
:::
:::Stack{gap=4}
::Matrix{size=sm left first="6.5rem"}
| levier | sans | avec |
| --- | --- | --- |
| ticket | « The ball goes through the bricks instead of bouncing. Fix that. » | un ticket qui renvoie à l’issue, demande de penser aux interactions et fixe le périmètre |
| `blind` | le dépôt tel quel | ni historique git ni `ISSUES.md` |
| raisonnement | coupé | `medium` |
| sonde | aucune | `probe.test.js` déposé dès le départ |
::

::Note{tag="Modèles"}
`gemma-4-31b` (ILaaS), `qwen-3.8-27b` et `DeepSeek-V4.1-Flash` (GRICAD).
::
::Note{tag="Voulu"}
Le ticket renvoie à `ISSUE.md`, sans S : le modèle cherche-t-il le bon fichier ou est-ce qu'il abandonne ?
::
:::
::::

---
section: Partie 4 · Évaluer
---

# Peut-on se fier aux campagnes ? :Hint[13 et 14 octobre 2026, timeout de 30 min]

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Cell
::Matrix{size=md first="17rem"}
| sur 320 exécutions par modèle | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| sans aucun fichier modifié | 3 | **18** | 1 |
| coupées par le timeout | 25 | **181** | 1 |
| reprises côté fournisseur | **974** | 9 | 0 |
| sonde laissée intacte, sur 160 | 160 | 158 | 160 |
| débit médian (tokens/s) | 21 | 8 | 49 |
::

::Note{tag="Convention" .mt-5}
Tous nos chiffres portent sur les vingt exécutions d’une configuration : une exécution vide compte comme un échec.
::
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="DeepSeek" size=sm}
Propre : aucune reprise, une seule exécution coupée.
::
::Card{variant=soft eyebrow="gemma" size=sm}
Exploitable, mais ILaaS était instable. Une reprise rejoue le tour avec tout le contexte : les colonnes de coût ne sont pas lisibles.
::
::Card{variant=accent eyebrow="qwen" size=sm}
Relancé chez GRICAD, mais lent : ses chiffres disent ce qu’il obtient **en 30 minutes** chez ce fournisseur.
::
:::
::::

---
section: Partie 4 · Évaluer
---

# Configuration par configuration :Hint[coin réussi, sur 20 exécutions]

::Stack{fill center}
<Heatmap
  :groups="['gemma-4-31b', 'qwen-3.8-27b', 'DeepSeek-V4.1-Flash']"
  :notes="['critère : 267/320', 'critère : 226/320', 'critère : 315/320']"
  :row-groups="['Demande négligée', 'Ticket bien rédigé']"
  :row-labels="['ISSUES.md', 'blind']"
  :col-groups="['raisonnement off', 'medium']"
  :col-labels="['sans', 'sonde']"
  :values="[
    [[0, 12, 0, 19], [0, 10, 0, 17], [16, 17, 17, 17], [0, 16, 0, 19]],
    [[12, 16, 4, 18], [0, 10, 0, 20], [9, 16, 8, 15], [1, 13, 1, 16]],
    [[19, 20, 20, 20], [0, 20, 0, 20], [20, 20, 19, 20], [5, 20, 4, 20]],
  ]"
/>
::

::Takeaway{.mt-5}
Le critère sépare surtout les modèles : DeepSeek le réussit presque partout. Les leviers se lisent sur les cas difficiles, comme le coin : une colonne « sonde » qui s’allume, une ligne `blind` qui s’éteint.
::

---
section: Partie 4 · Évaluer
---

# L’effet de chaque levier :Hint[écart en points, 160 exécutions avec contre 160 sans]

::::Cols{cols=2 gap=6 fill content=center .effects}
:::Stack{gap=1}
:Eyebrow[La sonde fournie]

::Matrix{size=xs first="4.6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| critère | :Effect{v="12" lo="4" hi="20"} | :Effect{v="16" lo="6" hi="26"} | :Effect{v="3" lo="1" hi="6"} |
| coin | :Effect{v="59" lo="49" hi="68"} | :Effect{v="56" lo="46" hi="64"} | :Effect{v="46" lo="38" hi="53"} |
| tunneling | :Effect{v="51" lo="42" hi="59"} | :Effect{v="41" lo="31" hi="51"} | :Effect{v="32" lo="25" hi="39"} |
| tests | :Effect{v="-31" lo="-41" hi="-21"} | :Effect{v="-38" lo="-48" hi="-28"} | :Effect{v="-42" lo="-51" hi="-32"} |
::
:::
:::Stack{gap=1}
:Eyebrow[Le ticket bien rédigé]{tone=teal}

::Matrix{size=xs first="4.6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| critère | :Effect{v="7" lo="-1" hi="15"} | :Effect{v="-11" lo="-21" hi="-2"} | :Effect{v="-1" lo="-4" hi="2"} |
| coin | :Effect{v="27" lo="17" hi="38"} | :Effect{v="-1" lo="-11" hi="10"} | :Effect{v="6" lo="-4" hi="15"} |
| tunneling | :Effect{v="28" lo="18" hi="38"} | :Effect{v="6" lo="-4" hi="17"} | :Effect{v="18" lo="11" hi="26"} |
| tests | :Effect{v="34" lo="23" hi="44"} | :Effect{v="33" lo="22" hi="44"} | :Effect{v="54" lo="46" hi="63"} |
::
:::
:::Stack{gap=1}
:Eyebrow[Le raisonnement medium]

::Matrix{size=xs first="4.6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| critère | :Effect{v="17" lo="9" hi="25"} | :Effect{v="16" lo="6" hi="26"} | :Effect{v="-1" lo="-3" hi="2"} |
| coin | :Effect{v="11" lo="1" hi="22"} | :Effect{v="3" lo="-8" hi="14"} | :Effect{v="-1" lo="-10" hi="9"} |
| tunneling | :Effect{v="16" lo="6" hi="26"} | :Effect{v="25" lo="15" hi="35"} | :Effect{v="-3" lo="-11" hi="5"} |
| tests | :Effect{v="48" lo="38" hi="56"} | :Effect{v="12" lo="1" hi="23"} | :Effect{v="-4" lo="-15" hi="6"} |
::
:::
:::Stack{gap=1}
:Eyebrow[Sans ISSUES.md ni historique (blind)]{tone=teal}

::Matrix{size=xs first="4.6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| critère | :Effect{v="3" lo="-4" hi="11"} | :Effect{v="8" lo="-3" hi="17"} | :Effect{v="-2" lo="-5" hi="1"} |
| coin | :Effect{v="-23" lo="-33" hi="-12"} | :Effect{v="-23" lo="-34" hi="-12"} | :Effect{v="-43" lo="-51" hi="-35"} |
| tunneling | :Effect{v="-16" lo="-26" hi="-5"} | :Effect{v="-10" lo="-21" hi="0"} | :Effect{v="-29" lo="-37" hi="-22"} |
| tests | :Effect{v="-5" lo="-16" hi="6"} | :Effect{v="-2" lo="-12" hi="9"} | :Effect{v="-23" lo="-33" hi="-13"} |
::
:::
::::

::Note
Le trait est l’intervalle à 95 %, obtenu par rééchantillonnage. Point plein : l’intervalle exclut zéro. Point creux : rien à conclure.
::

---
# V2 court : la carte 4 résume la slide blind, passée en annexe D
section: Partie 4 · Évaluer
---

# Quatre leviers, quatre effets

::::Cols{cols=2 gap=5 fill content=center}
:::Card{badge="1" title="La sonde aide les trois modèles" size=sm}
Avec elle, le coin est réussi dans **79 %**, **78 %** et **100 %** des exécutions.

::Detail
En échange, l’agent n’écrit plus ses tests : -31 à -42 points. Il a les cas sous les yeux. Sur un vrai ticket, personne ne vous fournira la sonde.
::
:::
:::Card{badge="2" title="Le ticket fait écrire des tests" size=sm}
+33 à +54 points de tests ajoutés. Chez gemma, c’est lui qui fait lire `ISSUES.md` : +27 sur le coin.

::Detail
Chez qwen, -11 sur le critère : il enquête, écrit des tests, et le timeout tombe avant la correction.
::
:::
:::Card{badge="3" title="Le raisonnement aide les plus faibles" size=sm}
gemma : +17 sur le critère, +48 sur les tests. qwen : +16, et 54 timeouts au lieu de 127.

::Detail
DeepSeek est déjà au plafond : il n’y gagne que du temps, 482 s contre 335 s en médiane.
::
:::
:::Card{badge="4" title="blind ne coûte qu’aux modèles qui lisent" size=sm}
Avec la demande négligée et sans sonde, retirer `ISSUES.md` fait tomber le coin à zéro chez qwen et DeepSeek, qui l’ouvrent d’eux-mêmes (58 et 79 fois sur 80).

::Detail
gemma ne l’ouvre presque jamais (2/80) : il ne perd que ce que le ticket l’envoyait lire. Le critère, lui, ne bouge pas.
::
:::
::::

---
section: Partie 4 · Évaluer
---

# Comment travaillent les modèles ? :Hint[d’après les sessions]

::Matrix{size=sm first="22rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| appels d’outils (médiane), configuration de base | 5 | 27 | 22 |
| même configuration, en `blind` | 5 | 9 | 11 |
| durée médiane sans raisonnement / avec | 269 s / 556 s | 1 800 s / 1 422 s | 335 s / 482 s |
::

::::Cols{cols=3 gap=5 .mt-5}
:::Card{variant=soft eyebrow="gemma" title="Fait ce qu’on lui montre" size=sm}
Avec la demande négligée et sans sonde, 35 exécutions sur 40 suivent le même chemin : `ls -R`, lire `neon.js`, `npm test`, le correctif du commentaire, `npm test`.
:::
:::Card{variant=soft eyebrow="qwen" title="Débogue par simulation" size=sm}
Des scripts jetables, les vitesses de la balle, une retouche, et on recommence. Chez un fournisseur lent, le timeout tombe.
:::
:::Card{variant=soft eyebrow="DeepSeek" title="Travaille avec méthode" size=sm}
Il lit tout, se sert de git et relance les tests après sa dernière modification dans 317 exécutions sur 319.
:::
::::

::Note{.mt-4}
Sessions classées par expressions régulières : ce sont des tendances, pas des mesures.
::

---
section: Partie 4 · Évaluer
---

# Généraliser :Hint[Ce qui reste vrai quand l’outil change]

::::Cols{cols=2 gap=4 fill content=center}
::Bullet{k="1" accent}
**Le chemin suivi prédit mal le résultat** : ce qui décide du coin et du tunneling, c’est l’information que l’agent a lue.
::
::Bullet{k="2" accent}
**Un levier mesuré sur un modèle ne dit rien d’un autre** : gemma ne lit que ce vers quoi on l’envoie, qwen et DeepSeek explorent seuls.
::
::Bullet{k="3"}
**Mettre les tests dans la boucle** agit sur tous les modèles, au prix des tests que l’agent n’écrit plus.
::
::Bullet{k="4"}
**Vérifiez une campagne avant d’en lire les scores** : reprises, relance, timeouts. Aucun ne se voit dans la table.
::
::::

::Takeaway{.mt-5}
**Ce que vous devez savoir dire à la fin** : un levier dont l’effet change d’un modèle à l’autre, et pourquoi. Le ticket bien rédigé fait lire `ISSUES.md` à gemma, et ne change presque rien au coin chez DeepSeek, qui le lit de toute façon.
::

---
# V2 : la partie suit le module skills du cours (playtester puis dynamic-playtester). Les mesures de playtest et playtest-court (p. 85 à 96 du PDF) sont retirées : le cours ne les contient plus et trysquare-starter mesure désormais les deux nouveaux skills (scenarios/issue1-skill.toml)
layout: section
index: Partie 5 / 5
---

::SectionHead{num="05" detail="Une procédure de travail chargée à la demande"}
# Les skills
::

::Agenda
- Définition et première utilisation d'un skill
- Reconstruire : `playtester`, puis `dynamic-playtester`
- Mesurer un skill sur trois modèles
::

---
section: Partie 5 · Skills
---

# D’où l’on part

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Card{variant=soft eyebrow="Le constat de la partie 4" size=sm}
Le coin et le tunneling ne sont traités que si l’agent a lu `ISSUES.md` ou la sonde. Or un vrai ticket décrit rarement tous les cas.
::
::Card{variant=soft eyebrow="Le seul levier qui aide les trois modèles" size=sm}
Fournir les tests déjà écrits. Mais personne ne le fera sur un vrai ticket.
::
:::
:::Card{variant=accent eyebrow="Une solution possible : le skill" center}
::Pull{size=lg}
Maintenir l’attention de l’agent sur des séquences complexes (TDD, refactoring, audit) sans saturer le prompt système.
::
:::
::::

---
# V2 : le PDF écrit revue-rapide.md ; le cours et l’exercice utilisent revue-rapide/SKILL.md
section: Partie 5 · Skills
---

# Emplacement et anatomie :Hint[agentskills.io]{href="https://agentskills.io"}

::::Cols{cols="4fr 5fr" gap=7 fill align=center}
:::Stack{gap=4}
::Specs{w="6rem"}
- **Global** `~/.pi/agent/skills/`
- **Projet** `mon-projet/.pi/skills/` ou `mon-projet/.agents/skills/`
::

::Detail
Des sous-dossiers sont possibles, et d’autres emplacements s’ils sont déclarés dans `.pi/settings.json` : `{ "skills": ["../src/database"] }`
::

::Card{variant=soft eyebrow="Un fichier markdown" size=sm}
- un **frontmatter YAML** : un nom, celui du répertoire comme l’exige la spécification, et une description, sans laquelle Pi ne charge pas le skill
- un **corps** : les règles à suivre et, s’il y a plusieurs étapes, la procédure pas à pas
::

::Note
`AGENTS.md` entre dans le contexte à chaque tour. Un skill est fait pour n’entrer que quand la tâche le demande.
::
:::
:::Stack{gap=2 .code-sm}
:Eyebrow[.pi/skills/revue-rapide/SKILL.md]{tone=quiet code}

```markdown
---
name: revue-rapide
description: Relit les modifications en cours du dépôt.
  Utiliser quand l'utilisateur demande une relecture
  avant de commiter.
---

# Revue rapide

1. Lance `git diff` et lis toute la sortie.
2. Relève ce qui peut casser un test existant,
   puis ce qui manque de test.
3. Rends deux listes : « à corriger avant le commit »
   et « peut attendre ».
```
:::
::::

---
section: Partie 5 · Skills
---

# Ce que le modèle en voit

:::::Cols{cols=2 gap=8 fill}
:::Stack{gap=3 .code-sm}
À **chaque tour**, Pi injecte dans le prompt système le nom, la description et le chemin de chaque skill. Le corps n’y est pas.

```xml
<available_skills>
  <skill>
    <name>revue-rapide</name>
    <description>Relit les modifications…</description>
    <location>…/revue-rapide/SKILL.md</location>
  </skill>
</available_skills>
```

::Note
Vingt skills, ce sont vingt descriptions dans chaque tour : un préambule conséquent.
::
:::

::::Stack{gap=4 center}
:Eyebrow[Deux chemins pour le corps]

:::Choice{k="Chemin 1" title="Le modèle décide de l’ouvrir"}
::Detail
Avec l’outil de lecture, sur la foi de la seule description. La doc de Pi prévient qu’un modèle peut ne pas charger un skill pertinent.
::
:::
:::Choice{k="Chemin 2" title="Vous tapez /skill:revue-rapide" hero}
::Detail
Pi colle le corps dans votre premier message, côté client. Le modèle n’a plus rien à décider.
::
:::
::::
:::::

---
section: Partie 5 · Skills
---

# Deux types de skills

::::Cols{cols=2 gap=7 fill}
:::Card{eyebrow="Déclenché par le modèle" title="Model-invoked" size=sm}
- le mode par défaut
- le nom et la description de chaque skill, du projet et global, sont dans le prompt système à chaque tour
- la description doit dire au modèle **quand** et **pourquoi** s’en servir : la plus précise possible

::Specs{w="6rem" .mt-3}
- **Pour** peu de charge pour l’humain, qui n’a pas à connaître les commandes slash
- **Contre** alourdit la fenêtre ; l’agent peut passer à côté d’un skill ; il faut tester et évaluer qu’il est utilisé au bon moment
::
:::
:::Card{variant=teal eyebrow="Déclenché par l’utilisateur" title="User-invoked" tone=teal size=sm}
- `disable-model-invocation: true` dans le frontmatter
- absent de la liste des skills que voit le modèle
- le développeur tape `/skill:nom-du-skill` : alors seulement, le harnais le charge
- la description reste obligatoire : sans elle, Pi ne charge pas le skill

::Specs{w="6rem" .mt-3}
- **Pour** l’utilisateur contrôle, c’est plus déterministe ; n’alourdit pas la fenêtre
- **Contre** l’oubli, surtout sur de longues sessions ; une charge mentale plus grande, qui croît avec le nombre de skills
::
:::
::::

---
section: Partie 5 · Skills
---

# Exercice : vérifier la mécanique

::::Cols{cols=4 gap=4}
::Step{n=1 title="Déposer"}
`revue-rapide/SKILL.md`, modifier une ligne du jeu, ouvrir une session
::
::Step{n=2 title="Exporter"}
`/export` : le bloc `<available_skills>` est là, le corps non
::
::Step{n=3 title="Demander"}
« relis ce que je viens de modifier », sans nommer le skill : le modèle va-t-il lire `SKILL.md` ?
::
::Step{n=4 title="Imposer"}
session neuve, `/skill:revue-rapide` : le corps est dans votre premier message
::
::::

:::::Stack{fill center gap=5}
::::Cols{cols=2 gap=6 .mt-6}
::Card{variant=accent eyebrow="En salle" center}
Le premier chemin repose entièrement sur la description, le second n’en a pas besoin. L’appel à l’outil de lecture se voit dans la session.
::
::Card{variant=soft eyebrow="Écrire la description" center}
Dit-elle **quand** s’en servir, ou seulement **ce que** fait la procédure ? Seule la première aide le modèle à décider.
::
::::
:::::

---
# NOUVEAU V2 : sources et sécurité, d’après le cours
section: Partie 5 · Skills
---

# Dois-je écrire mon skill ?

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Card{variant=accent eyebrow="Vigilance" size=sm}
Des sites en proposent beaucoup, comme [skills.sh](https://www.skills.sh/). Mais un skill peut faire lancer des scripts à votre agent : la sécurité compte.
::
::Lead
Commencez par écrire les vôtres, en vous inspirant de personnes qui ont du recul.
::
:::
:::Card{variant=soft eyebrow="Nos sources d’inspiration, octobre 2026" tone=teal}
- Lauren Tan : [cursor/plugins/pstack](https://github.com/cursor/plugins/tree/main/pstack)
- Matt Pocock : [mattpocock/skills](https://github.com/mattpocock/skills)
- Addy Osmani : [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)

::Detail{.mt-3}
Pour un premier squelette : le skill [skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) d’Anthropic.
::
:::
::::

---
# NOUVEAU V2 : slide de transition demandée par le PDF (p. 84), vers la partie « Reconstruire » du cours
layout: statement
---

:Eyebrow[Reconstruire]{.mb-6}

# Un skill pour NÉON

<p class="muted mt-6" style="font-size:0.95rem">
Obtenir les tests de l’issue #1 sans qu’un ticket décrive tous les cas.<br />
En deux versions : un catalogue écrit à la main, puis un catalogue construit par recherche web.
</p>

---
# NOUVEAU V2 : exercices de la version 1, d’après le cours
section: Partie 5 · Skills
---

# Version 1 : playtester :Hint[hands-on-harness/scripts/skills/depart/playtester]{href="https://github.com/AI-for-dev/hands-on-harness/tree/main/scripts/skills/depart/playtester"}

::::Cols{cols=2 gap=8 fill}
:::Stack{gap=4}
::Lead
Un symptôme rapporté par un joueur n’est que le cas visible. Les casse-briques cassent toujours aux mêmes endroits.
::

::Card{variant=soft eyebrow="Un catalogue des bugs connus du genre" size=sm}
Chaque entrée a sa cause, son **invariant** (ce que le test vérifie) et sa source.
::

:Eyebrow[La procédure]{tone=quiet}

1. **Composant** : la fonction du symptôme, les valeurs limites du jeu
2. **Sélection** : toutes les entrées du composant
3. **Tests rouges** : un par un
4. **Vérification** : quand le travail est-il fini ?

:::
:::Stack{gap=4}
::Card{variant=accent eyebrow="En salle · 1" size=sm}
Écrivez le frontmatter pour que le skill soit appelé dès qu’on demande de corriger un bug dans NÉON. Testez-le avec différents modèles.
::
::Card{variant=accent eyebrow="En salle · 2" size=sm}
Copiez [ce début de skill](https://github.com/AI-for-dev/hands-on-harness/blob/main/scripts/skills/depart/playtester/SKILL.md) dans `.pi/skills/playtester/SKILL.md` : le catalogue et les étapes 1 et 2 sont écrits, les étapes **3** et **4** sont vides. Écrivez-les, puis testez avec au moins deux modèles, sur la demande négligée, **sans** laisser l’agent lire `ISSUES.md`.
::
::Note
Les tests produits couvrent-ils tous les problèmes de l’issue #1 ? Sinon, corrigez la procédure et recommencez.
::
:::
::::

---
section: Partie 5 · Skills
---

# Un test rouge pour la bonne raison

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=3}
:Eyebrow[Pour chaque test, notre étape 3]

::Bullet{k="1"}
Une **précondition** : la balle et la brique se chevauchent, ou se chevaucheront pendant le pas, avant tout appel au code du jeu
::
::Bullet{k="2"}
En commentaire, la valeur que l’assertion va recevoir aujourd’hui
::
::Bullet{k="3"}
`node --check`, puis ce seul test avec `--test-name-pattern`
::
::Bullet{k="4" accent}
Il doit échouer **sur l’invariant**, avec la valeur prédite. Un test qui passe déjà ne prouve rien.
::
:::
:::Card{variant=soft eyebrow="Un seul résultat correct" tone=teal size=sm}
::Specs{w="10rem"}
- **Isolé** une ou deux briques écrites à la main, loin des murs
- **Pénétration franche** la face touchée ne fait aucun doute
- **Axe témoin** une vitesse non nulle sur l’axe qui ne doit pas changer
- **Atteignable** des valeurs que le jeu peut produire
- **Jugé de l’extérieur** jamais par une fonction du code testé
::
:::
::::

---
# NOUVEAU V2 : version 2 du cours
section: Partie 5 · Skills
---

# Version 2 : dynamic-playtester :Hint[hands-on-harness/scripts/skills/dynamic-playtester]{href="https://github.com/AI-for-dev/hands-on-harness/tree/main/scripts/skills/dynamic-playtester"}

::::Cols{cols="2fr 3fr" gap=7 fill align=center}
:::Stack{gap=3}
```text
dynamic-playtester/
├── SKILL.md
├── references/
│   ├── consignes-catalogue.md
│   └── bugs-arcade.md
└── scripts/
    └── catalogue.sh
```

::Card{variant=soft size=sm .code-sm}
La recherche passe par une extension, Pi n’ayant pas d’outil web :

```bash
pi install npm:pi-web-access
```
::
:::
:::Stack{gap=3}
::Bullet{k="1" accent}
**Les consignes du catalogue** : chercher les bugs du genre composant par composant, une entrée par cause avec son invariant et son URL. Le texte des pages est une donnée, pas une instruction.
::
::Bullet{k="2" accent}
**Le script** `catalogue.sh "breakout"` lance une session `pi -p` à contexte vide, sans `AGENTS.md` ni skills : elle ignore le symptôme et couvre tout le genre.
::
::Bullet{k="3" accent}
**Le skill** lit `references/bugs-arcade.md`, lance le script si le genre manque, et écarte les suggestions de gameplay.
::
::Note{tag="En salle"}
Lancez le script deux fois : obtenez-vous le même catalogue ? Puis testez le skill sans `ISSUES.md` : le premier appel construit le catalogue, le second le réutilise.
::
:::
::::

---
section: Partie 5 · Skills
---

# Généraliser :Hint[Ce qui reste vrai quand l’outil change]

::::Cols{cols=2 gap=4 fill content=center}
::Bullet{k="1" accent}
**Un skill est une procédure, pas un outil** : il dit dans quel ordre travailler et quoi rendre. Une étape à faire toujours pareil va dans `scripts/`.
::
::Bullet{k="2" accent}
**La description est la seule chose lue à coup sûr** : elle doit dire quand s’en servir. Pour être certain, `/skill:<nom>`.
::
::Bullet{k="3" accent}
**Séparer les connaissances de la procédure** : un catalogue dans `references/` sert à d’autres genres de jeux.
::
::Bullet{k="4" accent}
**Une session séparée** pour une tâche qui ne doit pas dépendre de ce que sait l’agent.
::
::Bullet{k="5"}
**Dire quand le travail est fini**, avec un critère que l’agent peut vérifier seul.
::
::Bullet{k="6"}
**Un skill se teste comme du code**, avec plusieurs modèles, sessions lues, et il évolue avec les modèles.
::
::::

---
# D’après le cours, module 3.2 (act3-skill) : campagnes du 17 octobre 2026, matrice issue1-skill de trysquare-starter
section: Partie 5 · Skills
---

# Les skills, mesurés :Hint[3 configurations × 20 exécutions, par modèle]

::::Cols{cols="2fr 3fr" gap=7 fill align=center}
:::Stack{gap=4}
::Lead
Au module contexte, seule la sonde faisait réussir le coin aux trois modèles. Une procédure écrite une fois peut-elle obtenir le même résultat ?
::

::Card{variant=soft eyebrow="La tâche : l’issue #1, en blind" size=sm}
La demande négligée, sans `ISSUES.md` ni historique git : l’agent serait sinon noté sur ce qu’il a recopié.
::

::Note{tag="Modèles"}
`gemma-4-31b` (raisonnement high), `qwen-3.8-27b` et `DeepSeek-V4.1-Flash` (medium), tous chez GRICAD.
::
:::
:::Stack{gap=4}
::Matrix{size=sm left first="10rem"}
| configuration | ce que reçoit l’agent |
| --- | --- |
| `nothing` | la demande négligée seule |
| `playtester` | `/skill:playtester`, puis la demande |
| `dynamic_playtester` | `/skill:dynamic-playtester`, puis la demande |
::

::Detail
Le skill est appelé par son nom : on mesure la procédure une fois chargée, pas sa description. Une dernière étape demande de corriger le jeu.
::

::Card{variant=accent eyebrow="Pas neutre" size=sm}
Nous avons écrit le catalogue de `playtester` en connaissant `ISSUES.md`. Celui de `dynamic-playtester` était déjà construit : on mesure la procédure avec ce catalogue, pas la recherche web.
::
:::
::::

---
section: Partie 5 · Skills
---

# Juger les tests de l’agent :Hint[sans juge LLM]

::::Cols{cols="6fr 5fr" gap=7 fill align=center}
:::Stack{gap=4}
::Lead
Les tests de l’agent sont lancés sur d’autres corrections que la sienne : une correction complète, et cinq corrections à qui il manque chacune une partie.
::

::Specs{w="9rem" raw}
- **tests_sound** aucun test n’échoue sur la correction complète
- **detects_axis** le critère : un test sain attrape la correction qui inverse `vy` sur toutes les faces
- **detects_corner** … celle qui oublie le coin
- **detects_neighbors** … celle qui rebondit deux fois à la jonction
- **detects_tunneling** … celle qui laisse passer une balle rapide
::

::Detail
La correction, elle, reste notée par la sonde du module contexte : faces, coin, tunneling.
::
:::
:::Stack{gap=3 .code-xs}
:Eyebrow[Exercice, dans trysquare-starter]{tone=teal}

```bash
# adapter [agent] à votre fournisseur, puis trois répétitions :
# 3 configurations × 3 = 9 exécutions, plus longues
uv run trysquare run scenarios/issue1-skill.toml \
  --output results --repetitions 3
```

::Note{tag="Pendant ce temps"}
Ouvrez le `diff.patch` d’une exécution `playtester` : retrouvez-vous une entrée du catalogue par `describe` ?
::
::Note{tag="En autonomie"}
Supprimez `references/bugs-arcade.md` de `dynamic-playtester` et relancez avec `--only dynamic_playtester` : vous mesurez alors aussi la recherche.
::
:::
::::

---
section: Partie 5 · Skills
---

# Peut-on se fier aux campagnes ? :Hint[17 octobre 2026, GRICAD]

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Cell
::Matrix{size=md first="19rem"}
| sur 20 exécutions | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| aucun fichier modifié, sans skill | 0 | 2 | 0 |
| même chose avec `playtester` | 0 | **11** | 0 |
| même chose avec `dynamic_playtester` | 0 | **12** | 0 |
| reprises côté fournisseur, au total | 4 | 0 | 0 |
| tests non lançables sur les références, sur 60 | 13 | 14 | 16 |
::

::Note{tag="Convention" .mt-5}
Une exécution vide, ou dont les tests ne se lancent pas sur les références, compte comme un échec. La synthèse de trysquare les retire du dénominateur : 5/12 au lieu de 5/20.
::
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="DeepSeek" size=sm}
Propre : aucune reprise, aucun timeout, toutes les exécutions livrent.
::
::Card{variant=soft eyebrow="gemma" size=sm}
Exploitable. Les 4 reprises tombent dans `playtester` : les coûts de cette configuration ne sont pas lisibles.
::
::Card{variant=accent eyebrow="qwen" size=sm}
Avec un skill, il ne livre rien une fois sur deux : son raisonnement remplit les 32 768 tokens du tour sans un seul appel d’outil. Ce n’est pas un incident, c’est un résultat.
::
:::
::::

---
section: Partie 5 · Skills
---

# Configuration par configuration :Hint[réussites, sur 20 exécutions]

::Stack{fill center}
<Heatmap
  :groups="['gemma-4-31b', 'qwen-3.8-27b', 'DeepSeek-V4.1-Flash']"
  :notes="['4 reprises, dans playtester', 'avec skill : 9 et 8 livrées', 'aucune reprise']"
  :row-groups="['Configuration']"
  :row-labels="['nothing', 'playtester', 'dynamic']"
  :col-groups="['la correction', 'ses tests']"
  :col-labels="['faces', 'coin', 'tunnel']"
  :values="[
    [[14, 0, 0, 4, 0, 0], [20, 20, 17, 5, 5, 8], [16, 0, 12, 8, 1, 4]],
    [[17, 0, 0, 0, 0, 0], [9, 9, 8, 9, 9, 7], [5, 4, 1, 7, 4, 1]],
    [[20, 0, 0, 0, 0, 0], [20, 20, 19, 20, 20, 18], [20, 12, 17, 20, 10, 17]],
  ]"
/>
::

::Takeaway{.mt-5}
Sans skill, aucun modèle ne réussit le coin ni le tunneling, comme au module contexte. Avec `playtester`, gemma et DeepSeek réussissent le coin 20 fois sur 20, sans la sonde.
::

::Note{.mt-3}
Côté tests, « faces » est le critère `detects_axis`. La correction est notée par la sonde, les tests sur les corrections de référence.
::

---
section: Partie 5 · Skills
---

# Chaque skill contre la demande seule :Hint[écart en points, 20 exécutions contre 20]

::::Cols{cols=2 gap=6 fill content=center}
:::Stack{gap=1}
:Eyebrow[playtester contre nothing]

::Matrix{size=xs first="6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| coin | :Effect{v="100" lo="100" hi="100" max="120"} | :Effect{v="45" lo="25" hi="65" max="120"} | :Effect{v="100" lo="100" hi="100" max="120"} |
| tunneling | :Effect{v="85" lo="70" hi="100" max="120"} | :Effect{v="40" lo="20" hi="60" max="120"} | :Effect{v="95" lo="85" hi="100" max="120"} |
| test : faces | :Effect{v="5" lo="-20" hi="30" max="120"} | :Effect{v="45" lo="25" hi="65" max="120"} | :Effect{v="100" lo="100" hi="100" max="120"} |
| test : coin | :Effect{v="25" lo="5" hi="45" max="120"} | :Effect{v="45" lo="25" hi="65" max="120"} | :Effect{v="100" lo="100" hi="100" max="120"} |
| test : jonction | :Effect{v="5" lo="0" hi="15" max="120"} | :Effect{v="35" lo="15" hi="55" max="120"} | :Effect{v="90" lo="75" hi="100" max="120"} |
::
:::
:::Stack{gap=1}
:Eyebrow[dynamic_playtester contre nothing]{tone=teal}

::Matrix{size=xs first="6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| coin | :Effect{v="0" lo="0" hi="0" max="120"} | :Effect{v="20" lo="5" hi="40" max="120"} | :Effect{v="60" lo="40" hi="80" max="120"} |
| tunneling | :Effect{v="60" lo="40" hi="80" max="120"} | :Effect{v="5" lo="0" hi="15" max="120"} | :Effect{v="85" lo="70" hi="100" max="120"} |
| test : faces | :Effect{v="20" lo="-10" hi="45" max="120"} | :Effect{v="35" lo="15" hi="55" max="120"} | :Effect{v="100" lo="100" hi="100" max="120"} |
| test : coin | :Effect{v="5" lo="0" hi="15" max="120"} | :Effect{v="20" lo="5" hi="40" max="120"} | :Effect{v="50" lo="30" hi="70" max="120"} |
| test : jonction | :Effect{v="5" lo="0" hi="15" max="120"} | :Effect{v="0" lo="0" hi="0" max="120"} | :Effect{v="5" lo="0" hi="15" max="120"} |
::
:::
::::

::Note
Le trait est l’intervalle à 95 %, obtenu par rééchantillonnage. Point plein : l’intervalle exclut zéro. Avec vingt exécutions de chaque côté, les intervalles sont plus larges qu’au module contexte.
::

---
section: Partie 5 · Skills
---

# Même procédure, autre catalogue :Hint[dynamic_playtester contre playtester]

::::Cols{cols="5fr 6fr" gap=7 fill align=center}
:::Stack{gap=4}
:Eyebrow[L’invariant du coin, dans chaque catalogue]

::Card{variant=teal eyebrow="playtester, écrit à la main" tone=teal size=sm}
« when the ball penetrates as much on both axes, both components flip »

Une condition et une valeur : l’agent peut en tirer un test exact.
::
::Card{variant=soft eyebrow="dynamic-playtester, tiré du web" size=sm}
« the chosen reflection side must be the face the ball is actually penetrating »

Un invariant vague donne un test vague.
::
:::
:::Stack{gap=1}
::Matrix{size=xs first="6rem"}
| | gemma | qwen | DeepSeek |
| --- | --- | --- | --- |
| coin | :Effect{v="-100" lo="-100" hi="-100" max="120"} | :Effect{v="-25" lo="-50" hi="5" max="120"} | :Effect{v="-40" lo="-60" hi="-20" max="120"} |
| tunneling | :Effect{v="-25" lo="-50" hi="0" max="120"} | :Effect{v="-35" lo="-60" hi="-10" max="120"} | :Effect{v="-10" lo="-30" hi="5" max="120"} |
| test : faces | :Effect{v="15" lo="-15" hi="45" max="120"} | :Effect{v="-10" lo="-40" hi="20" max="120"} | :Effect{v="0" lo="0" hi="0" max="120"} |
| test : coin | :Effect{v="-20" lo="-40" hi="0" max="120"} | :Effect{v="-25" lo="-50" hi="5" max="120"} | :Effect{v="-50" lo="-70" hi="-30" max="120"} |
| test : jonction | :Effect{v="0" lo="-15" hi="15" max="120"} | :Effect{v="-35" lo="-55" hi="-15" max="120"} | :Effect{v="-85" lo="-100" hi="-65" max="120"} |
::
:::
::::

::Takeaway{.mt-4}
Le catalogue compte autant que la procédure. Avec l’invariant vague, gemma ne corrige plus jamais le coin (0/20) et DeepSeek seulement 12 fois sur 20.
::

---
section: Partie 5 · Skills
---

# Ce que nous en retenons

::::Cols{cols=2 gap=5 fill content=center}
:::Card{badge="1" title="La procédure fait écrire les tests d’abord" size=sm}
Sans skill, aucune exécution n’écrit un test avant de modifier `neon.js`. Avec, toutes celles qui livrent le font.

::Detail
10 cas ajoutés en médiane avec `playtester`, contre 2 à 4 sans skill.
::
:::
:::Card{badge="2" title="playtester obtient le coin sans la sonde" size=sm}
gemma et DeepSeek réussissent le coin 20 fois sur 20, le tunneling 17 et 19 fois.

::Detail
Avec une réserve : ce catalogue a été écrit par des gens qui avaient lu `ISSUES.md`.
::
:::
:::Card{badge="3" title="Un test vert peut ne rien détecter" size=sm}
gemma corrige le coin 20 fois sur 20, mais ses tests ne détectent le défaut du coin que 5 fois.

::Detail
Un seul de ses vingt jeux de tests passe sur la correction de référence.
::
:::
:::Card{badge="4" title="Un skill coûte, et peut faire échouer" size=sm}
DeepSeek passe de 104 s à 470 s en médiane, avec environ sept fois plus de tokens en entrée.

::Detail
Chez qwen, le raisonnement sort de son plafond une fois sur deux, avant d’avoir écrit une ligne.
::
:::
::::

---
section: Partie 5 · Skills
---

# Comment travaillent les modèles ? :Hint[d’après les sessions]

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5 align=stretch}
:::Card{variant=soft eyebrow="DeepSeek" title="Suit la procédure pas à pas" size=sm}
Un test par entrée du catalogue, lancé seul pour le voir échouer (17 fois sur 20 avec `playtester`), puis la correction. Ses tests n’importent que des fonctions déjà exportées.
:::
:::Card{variant=soft eyebrow="gemma" title="Teste sa propre correction" size=sm}
Il sort la collision de `frame()` pour la mettre dans `step()` ou une nouvelle fonction, puis réécrit ses tests pour l’appeler là (15 fois sur 20). Ils vérifient alors son code, plus le comportement attendu.
:::
:::Card{variant=soft eyebrow="qwen" title="Planifie tout avant d’agir" size=sm}
Quand il livre, il corrige le coin 9 fois sur 9. Mais il conçoit tous les tests dans son raisonnement, qui dépasse 32 768 tokens une fois sur deux.
:::
::::

::Note
Sessions classées par expressions régulières : ce sont des tendances, pas des mesures.
::
:::::

---
section: Partie 5 · Skills
---

# Généraliser :Hint[Ce que la mesure apprend]

::::Stack{fill gap=2 center}
::Bullet{k="1" accent}
**Une procédure change la façon de travailler, de manière reproductible** : les trois modèles écrivent leurs tests avant de corriger dès qu’on la leur donne.
::
::Bullet{k="2" accent}
**La connaissance du domaine est dans le catalogue** : un invariant utile nomme une condition et une valeur que l’agent peut transformer en test exact.
::
::Bullet{k="3"}
**Lancez les tests de l’agent sur une autre correction que la sienne.** À défaut, comparez les tests rouges du début aux tests verts de la fin.
::
::Bullet{k="4"}
**Mesurez un skill sur chaque modèle visé** : le même fichier donne 20 coins sur 20 chez DeepSeek et fait échouer qwen une fois sur deux.
::
::Bullet{k="5"}
**Vérifiez ce que la configuration mesure** : ici, `dynamic_playtester` partait d’un catalogue déjà écrit, pas d’une recherche web.
::
::::

---
layout: statement
---

# À demain !

::LogoBar{size=40 dark .mt-10}
::

---
# V2 court : une annexe par partie, dans l’ordre de la journée
layout: section
index: Annexes
---

::SectionHead{eyebrow="Annexes" num="A"}
# Pour aller<br />plus loin
::

::Agenda{numbering=alpha}
- Pi en détail : installation, raccourcis, settings, extensions, outils
- Sécurité et sandbox : quatre approches d’isolation, le kit Docker Sandboxes
- Contexte : prompt cache, prix, compaction, `codemode`
- Évaluer : `blind` et `ISSUES.md`
- Skills : méthode, sources d’inspiration, tools et skills
::

---
section: Annexe A · Pi en détail
---

# L’organisation du code source de Pi :Hint[github.com/earendil-works/pi]{href="https://github.com/earendil-works/pi/"}

::::::Stack{fill center gap=6}
::Lead
Le dépôt du projet est organisé en trois briques principales :
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
section: Annexe A · Pi en détail
---

# L’installation de Pi (déjà faite normalement ✅)

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=5}
::Card{variant=soft eyebrow="Rappel"}
Procédure d’installation de Pi : [pi.dev/docs/latest/quickstart](https://pi.dev/docs/latest/quickstart)
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
section: Annexe A · Pi en détail
---

# Méthode 3 : la commande /login dans Pi

::::Cols{cols="4fr 3fr" gap=8 fill align=center}
:::Stack{gap=5}
::Card{variant=soft}
- lancer votre terminal
- taper `pi`
- taper `/login`
- choisir `sign in with an account` (Échap pour revenir en arrière) ou `with API key`
::

::Card{variant=accent eyebrow="Attention"}
Anthropic apparaît, mais son abonnement est réservé à ses propres applications. En OAuth, Pi se présente comme Claude Code, ce qu’Anthropic interdit : risque de suspension du compte.
Passez par une clé d’API, facturée à l’usage.
::
:::
:::Stack{gap=3}
Les clés déjà configurées apparaissent. Ex. :

<Fig src="/images/jour2/pi-login-cles.jpg" frame="screen" />
:::
::::

---
section: Annexe A · Pi en détail
---

# Cas des modèles locaux

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=6}
- [llama.cpp](https://github.com/ggml-org/llama.cpp) est un bon choix : [intégration dans Pi](https://pi.dev/docs/latest/llama-cpp)
- [llmfit](https://github.com/AlexsJones/llmfit) permet de voir si un modèle est adapté à votre matériel

::Card{variant=soft eyebrow="Pour des travaux au-delà de choses simples"}
Viser 24 Go de VRAM avec un modèle Qwen 3.8 quantifié : cf. [unsloth.ai/docs/fr/modeles/qwen3.8](https://unsloth.ai/docs/fr/modeles/qwen3.8)
::
:::
:::Cell
<Fig src="/images/jour2/llmfit.jpg" frame="screen" caption="source : korben.info/llmfit-trouver-llm-compatible-hardware.html" href="https://korben.info/llmfit-trouver-llm-compatible-hardware.html" />
:::
::::

---
section: Annexe A · Pi en détail
---

# Sécuriser clés et tokens :Hint[docs/providers.md]{prefix="source :" href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/providers.md"}

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=4}
Si vous ouvrez votre `auth.json`, vous pouvez voir vos clés et tokens d’accès en clair.

Pi crée le fichier avec les permissions `0600` : lecture + écriture pour le propriétaire, aucun droit pour le groupe ni pour les autres.

::Card{variant=soft eyebrow="Conseils" size=sm}
- chiffrement de votre disque dur (ex. VeraCrypt)
- si vous avez des sauvegardes synchronisées dans le cloud et que vous avez un peu peur d’une maladresse, possible d’avoir des `!command`
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
section: Annexe A · Pi en détail
---

# Les premiers raccourcis au quotidien

::Lead
Pour la liste complète des raccourcis : `/hotkeys`
::

::::Cols{cols=2 gap=7 fill align=start .mt-4}
:::Stack{gap=3}
::Card{variant=soft eyebrow="Pour aller à la ligne" size=sm}
`Shift+Enter`, ou `Ctrl+J` si le terminal ne transmet pas `Shift+Enter`.
::
::Card{variant=accent eyebrow="Attention au Ctrl+C" size=sm}
Ce n’est pas « copier » mais « effacer dans l’éditeur ».
::
::Card{variant=soft eyebrow="Interrompre et quitter" size=sm}
`Échap` interrompt l’agent et restaure les messages en file dans l’éditeur. `Ctrl+D` pour quitter.
::
:::
:::Card{size=sm}
::Specs{w="8.5rem"}
- **Copier** `Ctrl+Shift+C` sous Linux et Windows Terminal, `Cmd+C` sous macOS, ou `Ctrl+X` et `/copy`
- **Coller du texte** `Ctrl+Shift+V` sous Linux et Windows Terminal, `Cmd+V` sous macOS
- **Coller des images** `Ctrl+V` sous Linux natif et macOS, `Alt+V` sous Windows et WSL
::

::Detail{.mt-3}
Inutile si le modèle utilisé n’est pas multimodal…
::
:::
::::

---
section: Annexe A · Pi en détail
---

# Une petite subtilité : steering et follow-up

::::Cols{cols=2 gap=7}
::Card{variant=accent eyebrow="Entrée → steering" size=sm}
L’appel d’outil en cours se termine, puis le message est pris en compte. L’agent peut ainsi corriger sa trajectoire en cours de route.
::
::Card{variant=teal eyebrow="Alt+Entrée → follow-up" tone=teal size=sm}
Met en file un message de suivi, livré seulement une fois que l’agent a terminé tout son travail.
Sur Mac, c’est `Option+Entrée`. Sous Windows et WSL, `Ctrl+Q`.
::
::::

::::Cols{cols=2 gap=7 fill align=center .mt-4}
:::Card{size=sm}
::Specs{w="4rem" raw}
- **@** dans l’éditeur pour chercher et insérer un fichier (`Tab` pour compléter)
- **!** pour lancer une commande shell directement
::
:::
::Note{tag="Raccourcis"}
Modifiables dans `~/.pi/agent/keybindings.json`, cf. [Keybindings Reference](https://pi.dev/docs/latest/keybindings)
::
::::

---
# V2 : pi -p ajouté d’après le cours, il sert aux mesures de la partie 4
section: Annexe A · Pi en détail
---

# Reprendre, dupliquer, nettoyer

::::::Stack{fill center gap=6}
::::Stack{gap=2.5}
:::Bullet{k="12" accent}
Sortez de votre session (`Ctrl+D`). `pi -c` reprend votre dernière session
:::
:::Bullet{k="13" accent}
Quelques commandes utiles à tester :
::Detail
`/fork` repart d’un ancien message, mais dans **une nouvelle session**.
`/clone` duplique la branche active dans **une nouvelle session**.
`pi -p "…"` lance une requête sans interface et rend la main.
::
:::
::::

::Card{variant=accent eyebrow="Attention"}
Pi ne supprime jamais vos sessions de lui-même. Elles sont rangées sous `~/.pi/agent/` : effacer un projet ne les efface pas !
Vous pouvez le faire à la main, ou faire des nettoyages ciblés avec l’extension `pi-session-cleanup`.
::
::::::

---
# V2 : trust.json et chargement du .pi local d’après le cours
section: Annexe A · Pi en détail
---

# Du system prompt à l’AGENTS.md

::::Stack{gap=4}
Le system prompt de Pi se lit dans votre export de session. On peut le personnaliser pour un projet :

::Specs{w="8.5rem" raw}
- **SYSTEM.md** `…/neon/.pi/SYSTEM.md` **remplace** le system prompt par défaut de Pi pour ce projet
- **APPEND_SYSTEM.md** `…/neon/.pi/APPEND_SYSTEM.md` **ajoute** votre contenu au system prompt de Pi
::

::Note{tag="Attention"}
En pratique, on modifie très rarement le system prompt. La bonne pratique, c’est d’ajouter un fichier AGENTS.md.
::
::::

::::Cols{cols=2 gap=6 .mt-5}
::Takeaway
**Distinguer le dossier global `~/.pi/agent/` du `.pi` local à chaque projet** (ici `…/neon/.pi`), utile aussi pour des settings, skills… propres au projet.
::
::Card{variant=soft eyebrow="Projet de confiance" tone=teal size=sm}
Pi ne charge le `.pi` d’un projet qu’une fois ce projet marqué sûr, dans `~/.pi/agent/trust.json`.
Un dépôt cloné n’exécute rien sans votre accord.
::
::::

---
section: Annexe A · Pi en détail
---

# AGENTS.md

- ce fichier se place à la racine du projet
- son contenu est envoyé à chaque fois, après le system prompt

::::Cols{cols="1fr 1fr" gap=7 fill align=center .mt-2}
:::Card{variant=soft size=sm}
Historiquement, la bonne pratique conseillait d’y décrire :

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
# V2 : le PDF écrit README.md ; il s’agit des règles écrites dans les documents que l’agent lit (AGENTS.md, CONTRIBUTING.md…)
section: Annexe A · Pi en détail
---

# Renvoyer vers d’autres fichiers

::Lead
On peut faire référence à d’autres fichiers. Sur un gros projet, indiquer le bon fichier selon la tâche :
::

::::Cols{cols=2 gap=6}
::Card{variant=accent eyebrow="Mauvaise pratique" size=sm}
« Avant toute modification, lisez les fichiers architecture.md, database.md et deployment.md »
::
:::Card{variant=teal eyebrow="Bonne pratique" tone=teal size=sm}
- Avant de modifier la structure ou les frontières entre services : lis `docs/architecture.md`
- Avant toute migration ou modification de schéma (`db/migrations/`, `models/`) : lis `docs/database.md`
- Avant de préparer un déploiement : lis `docs/deployment.md` et suis la checklist
:::
::::

::Takeaway{.mt-5}
Une règle écrite dans un document n’est pas forcément respectée. Pour en être certain, la remplacer par une **règle déterministe** (cf. les hooks, demain).
::

---
section: Annexe A · Pi en détail
---

# Settings :Hint[pi.dev/docs/latest/settings]{href="https://pi.dev/docs/latest/settings"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
Deux niveaux :

::Specs
- **Global** `~/.pi/agent/settings.json`
- **Projet** `neon/.pi/settings.json`
::

::Note
Les réglages du projet surchargent les réglages globaux. Les objets imbriqués sont fusionnés, pas remplacés.
::
:::
:::Stack{gap=4}
::Bullet{k="/settings" badge=tag}
Le plus simple pour changer les settings au niveau global
::
::Bullet{k="/reload" badge=tag}
Après avoir modifié le fichier du projet, pour que Pi le relise
::
:::
::::

---
section: Annexe A · Pi en détail
---

# Prompt

::::Cols{cols=2 gap=7}
::Card{badge="1" title="Pas assez précis"}
Le modèle, surtout s’il est petit (27B) et en réflexion élevée, génère plein d’hypothèses sur les zones de flou :
c’est long et ça produit des erreurs.
::
::Card{badge="2" title="Trop précis"}
L’utilisateur détaille toutes les étapes à réaliser : dommage, une partie de ce que permet l’IA n’est pas exploitée.
::
::::

::Takeaway{.mt-6}
**Dès que le travail demandé est un peu complexe, planifier en levant les zones de flou, puis exécuter.**
::

---
section: Annexe A · Pi en détail
---

# Prompt template

::Lead
Si vous tapez souvent un prompt similaire, créez un modèle dans `~/.pi/agent/prompts`, ou dans `monprojet/.pi/prompts` pour un seul projet.
::

:::Stack{gap=2 .mt-2}
:Eyebrow[~/.pi/agent/prompts/continue-plan.md]{tone=quiet code}

```markdown
---
description: Continuer un travail déjà commencé à partir d’un plan rédigé
argument-hint: "[plan]"
---
Reprends le plan $1 et continue le travail commencé
```
:::

::Takeaway{.mt-6}
Ensuite, il suffit de taper `/continue-plan MonSuperPlan`
::

---
section: Annexe A · Pi en détail
---

# L’annuaire des extensions :Hint[pi.dev/packages]{href="https://pi.dev/packages"}

:::Stack{fill gap=4}
<Fig src="/images/jour2/pi-packages.jpg" h="330px" />

::Note{tag="Attention"}
Être recensé sur ce site ne garantit pas qu’une extension est sûre. Si elle a déjà été beaucoup téléchargée, le risque est plus faible.
::
:::

---
# NOUVEAU V2 : installation locale, essai sans installer et retrait, d’après le cours (module Pi)
section: Annexe A · Pi en détail
---

# Installer, essayer, retirer

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3 .code-sm}
```bash
# global : ~/.pi/agent/npm/, actif sur tous vos projets
pi install npm:@aliou/pi-guardrails

# local au projet : .pi/npm/, une fois le projet approuvé
pi install -l npm:@aliou/pi-guardrails

# pour la seule session en cours, sans rien installer
pi -e npm:@aliou/pi-guardrails
pi -e ./mon-extension.ts

pi remove npm:@aliou/pi-guardrails
```
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="Le réflexe" tone=teal size=sm}
Essayer avec `-e` avant de s’engager sur une extension trouvée dans l’annuaire.
::
::Card{variant=accent eyebrow="Attention" size=sm}
Une extension s’exécute avec **l’intégralité de vos droits**. N’installez, et ne testez, que ce que vous êtes prêt à faire tourner en confiance.
::
:::
::::

---
# V2 : liste reprise du PDF
section: Annexe A · Pi en détail
---

# Quelques extensions bien utiles

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Card{size=sm}
::Specs{w="15rem" raw}
- **pi-web-search** recherche internet simple (`pi-web-access` si besoin plus complexe)
- **pi-diff-review** visualiser les changements, les commenter et les renvoyer dans Pi
- **@juicesharp/rpiv-todo** automatiser les todo lists et leur avancement
- **@juicesharp/rpiv-ask-user-question** présenter les questions sous forme de questionnaire
- **@juicesharp/rpiv-btw** poser des questions secondaires sans polluer la conversation principale (encore mieux avec herdr : `pi-herdr-btw`)
::

::Detail{.mt-3}
Le dépôt `rpiv-mono` regroupe toutes les `@juicesharp/rpiv-*`. `pi-agent-extensions` est un autre lot de 17 extensions.
::
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="Au départ" size=sm}
Ne pas installer trop d’extensions, on est vite perdu. Quand un besoin apparaît, regarder si une extension existe déjà !
::
::Card{variant=accent eyebrow="Attention" size=sm}
Éviter deux extensions proches sur le même thème, par exemple `@aliou/pi-guardrails` et `pi-permission-system`.
::
:::
::::

---
section: Annexe A · Pi en détail
---

# Ajouter des outils

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
Pi propose aussi `grep`, `find`, `ls` et `powershell`. Comme l’agent a `bash`, ajouter les trois premiers est peu utile.

::Card{badge="A" title="tool_search" size=sm}
Une meilleure recherche des outils, intéressante seulement si vous en avez beaucoup.
::
::Card{badge="B" title="codemode" size=sm}
Au lieu d’appeler les outils un par un, le modèle écrit un script qui orchestre les appels. Utile avec des MCP, qui apportent souvent beaucoup d’outils et consomment beaucoup de contexte (cf. partie 3).
::
:::
:::Stack{gap=2 .code-sm}
:Eyebrow[.pi/settings.json]{tone=quiet code}

```json
{
  "defaultTools": ["+codemode", "+tool_search"]
}
```
:::
::::

---
section: Annexe A · Pi en détail
---

# Faire créer un outil par Pi

::::Cols{cols=2 gap=7 fill align=center}
:::Card{variant=soft eyebrow="La demande" center}
« Sur mes dernières sessions pi, le banc docker a souvent été utilisé pour des tests. Plusieurs fois, j’ai l’impression que la commande utilisée par l’agent n’était pas optimale. Peux-tu regarder les logs des 10 dernières sessions sur ce projet afin de confirmer cette analyse ? Si elle est confirmée, crée un tool pi pour ce projet permettant de régler ce problème. »
:::
:::Card{eyebrow="La réponse de Pi" tone=teal size=sm}
Analyse confirmée […]

- outil `preparer_bancs_docker`, dans `.pi/extensions/preparer-bancs-docker.ts`
- bancs disponibles : `gitlab`, `nextcloud-a`, `nextcloud-b`
- il sonde d’abord le service réel : si le banc fonctionne, il rend la main sans commande Docker
- sinon, il démarre uniquement les bancs demandés, sans pull ni provisioning

::Detail{.mt-3}
L’`AGENTS.md` demande désormais d’utiliser cet outil et de ne pas arrêter prématurément les bancs.
::
:::
::::

---
# V2 : la frise des quatre approches du PDF passe dans le Hint de chaque slide ; « approche » et non « niveau », pour ne pas croiser les trois niveaux d’isolation du cours
section: Annexe B · Sécurité et sandbox
---

# Garde-fous sans sandbox :Hint[Approche 1 / 4 · garde-fous]

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Card{variant=accent eyebrow="Extensions Pi"}
::Specs{w="11rem" raw}
- **pi-guardrails** confirmation des commandes risquées, protection des fichiers secrets et, si on l’active à l’onboarding, demande avant tout accès hors du répertoire de travail. Avec herdr, une demande de confirmation apparaît comme « bloqué »
- **pi-permission-system** une autre extension, aux permissions plus configurables
::
:::
:::Card{variant=soft eyebrow="Bonne pratique" tone=teal}
**Git worktrees** : un répertoire de travail par agent, sans isolation des permissions.

::Specs{w="6rem" .mt-3}
- **Branche** un historique distinct
- **Worktree** un répertoire distinct
::
:::
::::

::Takeaway{.mt-5}
Utile contre les erreurs ; insuffisant pour se protéger de l’exécution de code non fiable.
::

---
section: Annexe B · Sécurité et sandbox
---

# Exercice : un worktree et pi-guardrails

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=2.5}
::Bullet{k="1" accent}
Faire le point sur sa situation git (`git status`), en gardant ou en effaçant ses modifications
::
::Bullet{k="2" accent}
Créer le worktree
::
::Bullet{k="3" accent}
Installer l’extension
::
::Bullet{k="4" accent}
Essayer de résoudre le bug 1, puis retour collectif sur l’expérimentation
::
:::
:::Stack{gap=3 .code-sm}
```bash
herdr worktree create \
  --branch fix/brick-bounce \
  --base dev \
  --focus
```

```bash
pi install npm:@aliou/pi-guardrails
```

::Note{tag="Puis"}
`/guardrails:onboarding` pour régler l’extension
::
:::
::::

---
section: Annexe B · Sécurité et sandbox
---

# /guardrails:onboarding

::::Cols{cols=2 gap=6 fill align=center}
<Fig src="/images/jour2/guardrails-defaults.jpg" frame="screen" caption="Les protections par défaut" />
<Fig src="/images/jour2/guardrails-recap.jpg" frame="screen" caption="Le récapitulatif" />
::::

::Note{tag="herdr" .mt-4}
Avec l’intégration Pi de herdr (`herdr integration install pi`), un agent qui attend une confirmation apparaît comme bloqué.
::

---
section: Annexe B · Sécurité et sandbox
---

# Une fois la tâche finie :Hint[à ne pas faire pendant la formation]

::::Cols{cols="2fr 3fr" gap=7 align=start}
:::Stack{gap=3 .code-sm}
:Eyebrow[Dans le worktree]{tone=quiet code}

```bash
git add .
git commit -m "Fix brick bounce"
```

::Card{badge="A" title="Avec une pull request" size=sm}
```bash
git push -u origin fix/brick-bounce
```
::
:::
:::Card{badge="B" title="Avec un merge local" size=sm .code-xs}
Revenir dans le dépôt initial, sur la bonne branche et à jour, puis fusionner et nettoyer :

```bash
cd ~/Projects/neon
git switch dev && git pull
git merge fix/brick-bounce
git worktree remove ~/.herdr/worktrees/neon/fix-brick-bounce
git branch -d fix/brick-bounce
```
:::
::::

---
section: Annexe B · Sécurité et sandbox
---

# Confinement du processus Pi :Hint[Approche 2 / 4 · processus]

::Lead
Pi et les processus qu’il lance sont contraints par l’OS, sans noyau invité ni micro-VM.
::

::::Cols{cols=2 gap=7 .mt-4}
:::Card{eyebrow="Bubblewrap" title="pi-safe" size=sm}
[github.com/dimaginar/pi-safe](https://github.com/dimaginar/pi-safe)

- système de fichiers en lecture seule, sauf le projet courant et `~/.pi`
- protège surtout des écritures accidentelles hors du projet

::Detail{.mt-3}
À retenir : la lecture globale et le réseau restent libres.
::
:::
:::Card{eyebrow="Politiques fines" title="nono" tone=teal size=sm}
[github.com/nolabs-ai/nono](https://github.com/nolabs-ai/nono)

- profils d’accès aux fichiers, au réseau et aux identifiants
- un broker : chaque outil délégué peut avoir sa propre politique

::Detail{.mt-3}
De la granularité, sans frontière de VM.
::
:::
::::

::Takeaway{.mt-4}
Le confinement par l’OS limite les accès, mais partage toujours le noyau de l’hôte.
::

---
section: Annexe B · Sécurité et sandbox
---

# Exécuter les outils en micro-VM :Hint[Approche 3 / 4 · outils en VM]

::Lead
Les outils standards s’exécutent derrière une frontière de VM ; Pi reste sur l’hôte. Exemple : [Gondolin](https://github.com/earendil-works/gondolin), expérimental, et [pi-gondolin](https://github.com/pasky/pi-gondolin). Les clés passées en variables d’environnement restent visibles dans la VM.
::

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Stack{gap=2}
::Card{eyebrow="Hôte" size=sm}
**Pi · extensions · identifiants**
:Detail[le runtime de l’agent, hors de la micro-VM]
::
:Pipeline{label="Appels de tools" flow="Pi > micro-VM"}
::Card{variant=teal eyebrow="Micro-VM" tone=teal size=sm}
**`bash` · `read` · `write` · `edit` · `!`**
:Detail[le projet monté en lecture et écriture]
::
:::
:::Card{variant=soft eyebrow="Ce que cela change" size=sm}
- une frontière de VM plus forte pour les commandes
- les extensions non déléguées restent sur l’hôte
- le workspace partagé reste modifiable depuis la VM
:::
::::

::Takeaway{.mt-4}
Gondolin protège l’hôte des outils, pas forcément des extensions ni des effets sur le projet partagé.
::

---
section: Annexe B · Sécurité et sandbox
---

# Isoler tout le runtime de l’agent :Hint[Approche 4 / 4 · runtime]

::Lead
Pi, ses outils et ses extensions tournent dans une même sandbox ; les droits restent à définir.
::

::::Cols{cols=3 gap=5 fill}
:::Card{eyebrow="Micro-VM" title="micro-pi + Microsandbox" size=sm}
- [micro-pi](https://github.com/asyrjasalo/micro-pi) : Pi entier s’exécute dans une micro-VM
- projet bind-monté, modifications en direct
- configuration Pi copiée ; clés d’API passées en variables d’environnement

::Detail{.mt-3}
Attention : les clés sont accessibles dans la VM.
::
:::
:::Card{variant=accent eyebrow="VM managée" title="Docker Sandboxes" size=sm}
- un environnement VM dédié à l’agent
- secrets substitués par un proxy côté hôte
- workspace partagé en écriture (direct) ou copie isolée (clone Git, `--clone`)

::Detail{.mt-3}
Contrôler le mode de partage.
::
:::
:::Card{eyebrow="Runtime configurable" title="OpenShell" tone=teal size=sm}
- sandbox Docker, Podman, Kubernetes ou micro-VM
- politiques : fichiers, processus, réseau
- identifiants liés aux endpoints autorisés, via un proxy

::Detail{.mt-3}
Un noyau distinct seulement avec une VM.
::
:::
::::

---
section: Annexe B · Sécurité et sandbox
---

# Remarque : allow ou ask par défaut ?

::::Cols{cols=2 gap=7 .mt-8}
:::Card{badge="1" title="ask par défaut"}
Avec `ask` par défaut, l’extension demande une autorisation pour beaucoup trop de choses : ça devient vite pénible.

::Detail{.mt-3}
En mode non interactif (`pi -p`), personne ne répond : chaque commande `ask` est refusée.
::
:::
:::Card{badge="2" title="allow par défaut"}
Il faut ensuite définir beaucoup d’exceptions en `deny`.

::Detail{.mt-3}
C’est le choix du kit de la formation, qui tourne déjà dans une sandbox.
::
:::
::::

---
# V2 : le dépôt pi-sandbox est devenu ai4dev-pi-kit et utilise l’image officielle docker.io/sbx/pi-image : plus d’image à construire (cours, module sandbox)
section: Annexe B · Sécurité et sandbox
---

# Docker Sandboxes : un kit pour Pi :Hint[github.com/AI-for-dev/ai4dev-pi-kit]{href="https://github.com/AI-for-dev/ai4dev-pi-kit"}

::::Cols{cols="5fr 6fr" gap=7 fill}
:::Stack{gap=4}
Pi n’est pas un agent intégré à `sbx`, qui lance `claude`, `codex`, `opencode`… Il passe par un **kit** : un répertoire décrit par un `spec.yaml`.

```text
ai4dev-pi-kit
├── spec.yaml       image, commande, clés, réseau
└── files/home/.pi/agent
    ├── models.json
    ├── settings.json
    └── extensions/pi-permission-system/config.json
```

::Note{tag="Attention"}
Ne pas confondre avec [carderne/pi-sandbox](https://github.com/carderne/pi-sandbox), une extension qui confine `bash` au niveau de l’OS, sans Docker.
::
:::

:::Cell{.code-sm}
```yaml
sandbox:
  image: docker.io/sbx/pi-image:latest
  entrypoint: [pi, -a]   # projet déclaré sûr

credentials:
  - service: ilaas
    apiKey:
      name: ILAAS_API_KEY
      proxyManaged: true   # Pi ne voit qu’une sentinelle
      inject:
        - domain: llm.ilaas.fr
          scheme: bearer

permissions:
  network:
    allow: [llm.ilaas.fr, github.com, pypi.org,
            registry.npmjs.org, pi.dev, …]
```
:::
::::

:Pipeline{label="La clé" flow="Pi lit une sentinelle > le proxy de l’hôte pose la clé > llm.ilaas.fr seulement" .mt-4}

---
# V2 : étapes du kit ai4dev-pi-kit ; deny-all comme recommandé par le cours
section: Annexe B · Sécurité et sandbox
---

# Mise en route :Hint[docs.docker.com/ai/sandboxes]{href="https://docs.docker.com/ai/sandboxes/install/"}

::::Cols{cols=5 gap=3}
::Step{n=1 title="Installer"}
l’outil `sbx`
::
::Step{n=2 title="Récupérer"}
le kit
::
::Step{n=3 title="Enregistrer"}
la clé du service
::
::Step{n=4 title="Poser"}
la politique réseau
::
::Step{n=5 title="Lancer"}
depuis NÉON
::
::::

::::Cols{cols=2 gap=6 fill .mt-4}
:::Cell{.code-sm}
```bash
sbx login
git clone https://github.com/AI-for-dev/ai4dev-pi-kit \
  ~/Projects/ai4dev-pi-kit
sbx kit validate ~/Projects/ai4dev-pi-kit

sbx secret set ilaas          # puis sbx secret ls
sbx policy init deny-all      # une fois pour toutes

cd ~/Projects/neon
sbx run ~/Projects/ai4dev-pi-kit
```
:::
:::Stack{gap=3}
::Card{variant=soft eyebrow="Pourquoi deny-all" size=sm}
Au premier lancement, `sbx` propose *Open*, *Balanced* ou *Locked Down*. `Balanced` autorise des jokers comme `*.googleapis.com`, bien plus large que des API de modèles.
On part du refus et on n’ouvre que ce qui apparaît dans `sbx policy log`.
::
::Card{variant=accent eyebrow="Credential binding" size=sm}
Au premier lancement, `sbx` demande d’autoriser le kit à utiliser ce secret. Sans réponse (CI, `--detach`), le sandbox démarre sans la clé : `sbx` affiche un avertissement et les appels au modèle échouent.
::
:::
::::

---
section: Annexe B · Sécurité et sandbox
---

# Les clés restent côté hôte

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=3 .code-xs}
:Eyebrow[Déclarer une clé ILaaS]{tone=quiet code}

```bash
sbx secret set ilaas
sbx secret ls
```

:Eyebrow[Réutiliser la clé déjà enregistrée par Pi]{tone=quiet code .mt-3}

```bash
python3 -c "import json, os; print(json.load(open(
  os.path.expanduser('~/.pi/agent/auth.json')))['ilaas']['key'])" \
  | sbx secret set ilaas
```
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="Partagés par défaut" size=sm}
Les secrets sont partagés par toutes les sandboxes.
::
::Card{variant=teal eyebrow="Limiter à une sandbox" tone=teal size=sm .code-sm}
```bash
sbx secret set ilaas --sandbox neon-bug-1
```
::
:::
::::

---
# V2 : chemins du kit mis à jour (ai4dev-pi-kit)
section: Annexe B · Sécurité et sandbox
---

# Choix d’architecture

::::Cols{cols=2 gap=7 fill}
:::Card{eyebrow="Une sandbox par worktree" .code-xs}
```text
herdr
└── WT bug1
    └── SBX
        └── Pi
```

::Detail{.my-3}
Dans `~/.herdr/worktrees/neon/fix-brick-bounce` :
::

```bash
sbx run --name neon-bug-1 ~/Projects/ai4dev-pi-kit .
sbx ls                      # lister les sandboxes
sbx stop neon-bug-1         # arrêter
sbx run --name neon-bug-1   # relancer
```
:::
:::Card{eyebrow="Une sandbox par projet" tone=teal .code-xs}
```text
herdr
└── neon
    └── SBX
        ├── dépôt principal
        ├── WT1 → Pi
        └── WT2 → Pi
```

::Detail{.my-3}
Depuis le dépôt principal :
::

```bash
sbx run --name neon-project ~/Projects/ai4dev-pi-kit \
  ~/Projects/neon ~/.herdr/worktrees/neon

# Pi sur le worktree du bug 1, dans un pane herdr
sbx exec -it \
  --workdir ~/.herdr/worktrees/neon/fix-brick-bounce \
  neon-project pi -a
```
:::
::::

---
# V2 : le kit ouvre déjà registry.npmjs.org ; la slide montre la méthode générale d’après le journal des refus
section: Annexe B · Sécurité et sandbox
---

# Une sandbox par projet, avec pi-permission-system

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=3 .code-sm}
::Card{variant=soft eyebrow="Déjà installée" size=sm}
Le kit liste l’extension sous `packages` dans `settings.json`, en version épinglée : `npm:@gotgenes/pi-permission-system@40.1.1`. Pi l’installe au démarrage de chaque sandbox.
::

::Card{variant=soft eyebrow="Un domaine refusé ?" size=sm}
Le lire dans `sbx policy log`, puis l’ouvrir pour cette seule sandbox, et le refermer ensuite.
::

```bash
sbx policy allow network --sandbox neon-project \
  <domaine>
sbx policy rm network --sandbox neon-project \
  --resource <domaine>
```
:::
:::Stack{gap=2 .code-xs}
:Eyebrow[politique globale du kit]{tone=quiet code}

```json
{
  "permission": {
    "*": "allow",
    "path": {
      "*": "allow",
      "*.env": "deny",
      "*.env.*": "deny"
    },
    "bash": {
      "*": "allow",
      "rm -rf *": "deny"
    },
    "external_directory": "allow"
  }
}
```

::Note{tag="Pas de ask"}
En `pi -p`, personne ne répond et l’appel est refusé. Les confirmations vont dans la configuration du projet, `.pi/extensions/…/config.json`, qui prend le pas.
::
:::
::::

---
section: Annexe B · Sécurité et sandbox
---

# En résumé, un dispositif en trois couches

::::Cols{cols=3 gap=5 fill content=center}
::Criterion{n=1 title="Docker Sandbox"}
limite le terrain de jeu
::
::Criterion{n=2 title="Worktree"}
isole les tâches
::
::Criterion{n=3 title="pi-permission-system"}
décide quelles actions sont acceptables
::
::::

---
# NOUVEAU V2 : limites et exercice en autonomie du cours (module sandbox)
section: Annexe B · Sécurité et sandbox
---

# Ce que le bac à sable ne protège pas

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{badge="A" title="Le mode direct" center}
L’agent édite votre arbre de travail en place. Il peut modifier un hook git, un `Makefile` ou une config de CI, qui s’exécuteront plus tard **sur l’hôte**.

:Rule

Le bac à sable ne vous dispense pas de relire le diff.
:::
:::Card{badge="B" title="Les jokers du réseau" center}
`balanced` ouvre des domaines entiers. D’où `deny-all`, puis une ouverture au cas par cas, depuis `sbx policy log`.
:::
:::Card{badge="C" badgeTone=ghost title="Root dans la VM" center}
`sudo` sans mot de passe et un démon Docker à lui. Nous l’acceptons : rien n’en sort et la VM est jetable.
:::
::::

::Card{variant=teal eyebrow="En autonomie" tone=teal size=sm}
Dans la sandbox, demandez la valeur de `ILAAS_API_KEY` (la sentinelle, pas votre clé), lancez `curl https://example.com` (refusé), faites modifier un fichier (le changement apparaît sur l’hôte). Puis rejouez l’exercice `pi-permission-system` : les deux garde-fous se superposent.
::
:::::

---
# À VÉRIFIER : les exemples des colonnes 1 et 2 (le PDF les laisse vides) ; la fenêtre annoncée par gemma-4-31b et la limite servie par ILaaS
section: Annexe C · Contexte
---

# Plusieurs « contextes »…

::::Cols{cols=4 gap=4 fill content=center}
:::Card{badge="1" title="Modèle" size=sm}
:Tag[Capacité]{tone=teal}

La fenêtre pour laquelle le modèle est conçu, ou annoncée.
:::
:::Card{badge="2" title="Fournisseur" size=sm}
:Tag[Contrainte]{tone=teal}

La limite réellement acceptée par le service qui sert le modèle.

::Detail
Exemple : ILaaS sert `gemma-4-31b` avec une fenêtre d’environ 128 000 tokens.
::
:::
:::Card{badge="3" title="Pi" size=sm}
:Tag[Pilotage]

Le `contextWindow` déclaré dans `models.json` pour piloter le budget et la compaction.

::Detail
Exemple : `"contextWindow": 128000`
::
:::
:::Card{badge="4" title="Fenêtre utile" size=sm}
:Tag[Performance]

La quantité de contexte que le modèle exploite bien pour cette tâche.
:::
::::

::Takeaway{.mt-5}
Modifier `contextWindow` dans Pi ne change pas la capacité du modèle : cela change la manière dont Pi gère son budget de contexte.
::

---
section: Annexe C · Contexte
---

# Le prompt cache, côté fournisseur

::::Cols{cols="3fr 2fr" gap=7 fill align=center}
:::Stack{gap=3}
:Eyebrow[D’un appel au suivant]

::Matrix{size=xs left first="5rem"}
| appel | entrée | sortie |
| --- | --- | --- |
| 1 | system · outils · AGENTS.md · M1 | R1 |
| 2 | **system · outils · AGENTS.md · M1** · R1 · M2 | R2 |
| 3 | **system · outils · AGENTS.md · M1 · R1 · M2** · R2 · M3 | R3 |
::

::Detail
En gras, le préfixe identique à l’appel précédent : *cache hit* possible. Une réponse n’entre dans le cache qu’au tour suivant, quand elle devient une partie de l’entrée. Le préfixe réutilisable s’allonge.
::

::Note{tag="Outils"}
Ici, « outils » désigne leurs descriptions. Les appels et résultats d’outils rejoignent ensuite l’historique.
::
:::
:::Card{variant=soft eyebrow="Ce que le cache est" center}
**Cache = réutilisation du calcul associé au plus long préfixe** (une suite de tokens).

:Rule

Ce n’est pas une ancienne conversation stockée à part. Et la gestion du cache a ses subtilités, selon les fournisseurs.
:::
::::

---
# V2 : relevé refait sur pi.dev/models (données models.dev) le 15 oct. 2026, sur les modèles du cours ; n.r. = absent de models.dev, affiché 0 par pi.dev
section: Annexe C · Contexte
---

# Quelques prix par API :Hint[pi.dev/models, 15 oct. 2026]{prefix="relevé" href="https://pi.dev/models"}

::::Cols{cols="3fr 1fr" gap=7 fill align=center}
:::Cell
::Matrix{size=sm left first="17rem"}
| modèle (fournisseur) | contexte | entrée $/M | sortie $/M | cache read $/M | cache write $/M |
| --- | --- | --- | --- | --- | --- |
| `deepseek-v4-flash` (opencode) | 1 000 000 | 0,14 | 0,28 | 0,028 | n.r. |
| `deepseek-v4-pro` (opencode-go) | 1 000 000 | 0,66 | 1,98 | 0,022 | n.r. |
| `gpt-5.6-terra` (openai) | 272 000 | 2 | 12 | 0,2 | 2,5 |
| `gpt-5.6-luna` (openai) | 272 000 | 0,2 | 1,2 | 0,02 | 0,25 |
| `google.gemma-4-31b` (amazon-bedrock) | 262 144 | 0,14 | 0,4 | n.r. | n.r. |
| `qwen3.8-flash` (opencode-go) | 1 000 000 | 0,15 | 0,47 | 0,016 | 0,2 |
::
:::
:::Stack{gap=4}
::Card{variant=soft size=sm}
1 000 000 tokens ≈ 750 000 mots en anglais, nettement moins en français ou en code
::
::Detail
n.r. : non renseigné, affiché 0 sur pi.dev. Le même modèle n’a pas le même prix d’un fournisseur à l’autre.
::
::Card{variant=accent eyebrow="Attention" size=sm}
Si vous changez de modèle au cours d’une conversation, vous perdez votre cache.
::
:::
::::

---
section: Annexe C · Contexte
---

# Améliorer la compaction automatique

::::Stack{fill center gap=3}
::Bullet{k="billion-context" badge=tag}
L’agent compresse lui-même son contexte en résumés qu’il peut redéplier
::
::Bullet{k="pi-vcc" badge=tag}
Compaction sans LLM : extraction déterministe, historique interrogeable via `vcc_recall`
::
::Bullet{k="Magic Context" badge=tag}
LLM + règles pour construire une mémoire, avec des références pour revenir à l’original
::
::::

---
section: Annexe C · Contexte
---

# Avant la compaction, ne pas remplir trop vite

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=3}
:Eyebrow[Plusieurs facteurs]

::Specs{w="7rem" raw}
- **Projet** les fichiers, une mauvaise architecture
- **Modèle** plus ou moins efficace, et son mode de raisonnement
- **Harnais** taille de l’`AGENTS.md`, nombre d’outils, `tool_search`, `codemode`, sous-agents…
::

::Card{variant=accent eyebrow="Attention" size=sm}
Des sous-agents mal utilisés peuvent vous coûter cher en tokens !
::
:::
:::Stack{gap=4}
::Takeaway
Une bonne organisation du projet compte plus que des solutions comme **rtk** (Rust Token Killer).
::
::Card{variant=soft size=sm}
rtk est un proxy CLI qui intercepte les commandes de dev, filtre leur sortie et envoie au LLM une version plus compacte.
Ses chiffres de compression ont été [remis en cause](https://blog.jetbrains.com/ai/2026/07/rtk-claude-code-token-savings/) : +7,6 % de coût mesuré par JetBrains.
::
:::
::::

---
# NOUVEAU V2 : codemode, d’après le cours (module contexte)
section: Annexe C · Contexte
---

# Quand les sorties d’outils remplissent la fenêtre :Hint[docs/codemode.md]{href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/codemode.md"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
Une sortie d’outil reste dans la fenêtre jusqu’à la fin de la session. Avec `codemode`, le modèle écrit un script qui fait les appels, filtre et combine : **seule la sortie du script revient** dans le contexte.

::Specs{w="6rem"}
- **Session** `pi --tools +codemode`
- **Projet** `"defaultTools": ["+codemode"]`
::

::Note{tag="Bac à sable"}
Le script tourne dans QuickJS, mais les outils qu’il appelle modifient réellement le dépôt.
::
:::
:::Stack{gap=4}
::Card{variant=accent eyebrow="Un coût fixe" size=sm}
Sa description entre dans le préfixe à chaque tour. Sur une petite tâche comme l’issue #1, il peut coûter plus qu’il ne fait gagner.
::
::Card{variant=teal eyebrow="En autonomie" tone=teal size=sm}
Posez la même question qui parcourt tout `game/`, avec et sans `codemode`, puis en demandant une seule commande. Comparez les tokens d’entrée dans les exports.
::
::Detail
Activez-le en début de session : changer la liste des outils invalide le cache, comme un changement de modèle.
::
:::
::::

---
section: Annexe D · Évaluer
---

# `blind` ne coûte que ce qu’apporte ISSUES.md :Hint[coin réussi, sans la sonde]

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Cell
::Matrix{size=md first="8rem"}
| | demande négligée | ticket bien rédigé |
| --- | --- | --- |
| gemma | 0/40 → 0/40 | **33/40** → 0/40 |
| qwen | 16/40 → 0/40 | 17/40 → 2/40 |
| DeepSeek | **39/40** → 0/40 | **39/40** → 9/40 |
::

::Detail{.mt-3}
Avec `ISSUES.md`, puis sans. Sur le critère, le retirer ne change rien : le commentaire du code suffit.
::
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="Qui ouvre ISSUES.md seul ?" size=sm}
Sans qu’on le demande : gemma **2/80**, qwen **58/80**, DeepSeek **79/80**.
::
::Card{variant=accent eyebrow="L’historique git" size=sm}
qwen et DeepSeek le consultent, DeepSeek jusqu’à `git log` et `git show`. Aucun n’en tire d’information utile.
::
:::
::::

---
# NOUVEAU V2 : arborescence complète, d’après le cours
section: Annexe E · Skills
---

# Plus qu’un fichier

::::Cols{cols=2 gap=8 fill align=center}
:::Cell{.code-sm}
```text
mon-skill/
├── SKILL.md      requis
├── scripts/      du code exécutable
├── references/   de la documentation
└── assets/       templates, ressources
```
:::
:::Card{size=sm}
::Specs{w="7rem"}
- **scripts** des programmes cités dans `SKILL.md` : l’agent suit toujours le même chemin au lieu d’écrire ses scripts à la volée
- **references** des parties spécifiques, lues seulement quand elles concernent la tâche : documentation utilisateur, API, tutoriel…
- **assets** tout document utile au modèle : image, template…
::
:::
::::

---
# V2 : « les agents ne sont pas des humains » repris du cours
section: Annexe E · Skills
---

# Méthodologie et conception :Hint[best practices d’Anthropic]{href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices"}

::::Cols{cols=2 gap=5}
:::Card{badge="1" title="Découper en étapes, si c’est pertinent" size=sm}
- une séquence chronologique numérotée : l’agent saute moins d’étapes
- des verbes d’action précis, pas de consignes vagues
- des critères d’arrêt explicites, pour éviter les boucles infinies
:::
:::Card{badge="2" title="S’appuyer sur des références externes" size=sm}
Pour garder le skill court : « Pour cette étape où vous devez créer un PRD, lisez attentivement `references/prd-template.md` avant de rédiger. »
Ça économise le contexte, et c’est plus facile à comprendre et à maintenir.
:::
:::Card{badge="3" title="Des termes techniques denses" size=sm}
Plutôt que de longs paragraphes : *vertical slice*, *TDD red-green-refactor*, *blast radius*.
::Detail{.mt-3}
Un agent n’est pas un humain : il ne trie pas ce qu’il lit, et ne devinera pas ce que vous avez oublié.
::
:::
:::Card{badge="4" title="Éliminer la confusion et le superflu" size=sm}
Des règles empilées sur un même sujet diluent l’attention (de même pour les répétitions entre `AGENTS.md`, ticket et skill).
Si retirer une consigne (« écris du code maintenable ») ne change rien, la supprimer.
:::
::::


---
section: Annexe E · Skills
---

# Un dépôt de skills qui couvre le cycle de production :Hint[workflow v1.3 de Matt Pocock]{href="https://github.com/mattpocock/skills"}

::::Cols{cols=5 gap=3}
::Step{n=1 title="Cadrage"}
`/grill-with-docs` : l’agent interroge le développeur, clarifie le besoin, met à jour le glossaire métier ou les ADR
::
::Step{n=2 title="Spécification"}
`/to-spec` : une spécification claire, contrat de vérité pour l’implémentation
::
::Step{n=3 title="Découpage"}
`/to-tickets` : des tickets indépendants, calibrés pour une seule session
::
::Step{n=4 title="Exécution"}
`/implement-spec` : des sous-agents en parallèle dans des worktrees, en TDD. `/implement` traite les tickets un par un
::
::Step{n=5 title="Clôture"}
`/code-review`, `/pr`, `/retro` : revue par des sous-agents, rayon d’impact, améliorations de l’environnement pour la session suivante
::
::::

::::Cols{cols="3fr 1fr" gap=6 .mt-5}
::Takeaway
Le mieux est de créer ses skills selon ses problèmes et sa façon de travailler, mais il est très utile de s’inspirer de ce qui existe déjà.
::
::Note{tag="Vidéo"}
9 Things People Get Wrong With My /grill-* skills
::
::::

---
section: Annexe E · Skills
---

# Une approche comparative

::Matrix{size=xs left first="8rem"}
| | Matt Pocock (skills) | Superpowers (Jesse Vincent) | Agent Skills (Addy Osmani) |
| --- | --- | --- | --- |
| philosophie | **Requirements-first, composable.** Anti-framework modulaire : l’humain pilote, la clarification prime sur la vitesse | **Pipeline autonome.** Cycle complet sans intervention : l’agent planifie et délègue à des sous-agents | **Cycle de vie complet.** Culture d’ingénierie Google : 24 skills sur 6 phases (Define, Plan, Build, Verify, Review, Ship) |
| mode et contrôle | **Contrôle humain.** Flux principal user-invoked, disciplines (`tdd`, `code-review`, `pr`) model-invoked ; sessions sous la « smart zone » (~150k tokens) | **Model-invoked.** Forte décharge pour l’humain, mais taxe de contexte permanente | **Commandes ciblées.** 9 commandes (`/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`…) avec points d’arrêt humains |
| garde-fous | **`/grill-with-docs`** résout l’arbre de dépendance des idées avant le code | **Git worktrees** par branche, un sous-agent neuf par tâche de 2 à 5 min, TDD strict | **Tables anti-rationalisation** : chaque skill réfute les excuses classiques de l’agent |
| vérification | **`/retro`** : propose après la session des améliorations de l’environnement (contrôles, navigation, standards) | **Un relecteur par tâche** vérifie la conformité à la spec | **Évals en CI** : routage testé ; `/ship` lance 3 personas de revue en parallèle |
::

::::Cols{cols=2 gap=6 .mt-4}
::Note{tag="Autre approche"}
[pstack](https://github.com/cursor/plugins/tree/main/pstack) (Lauren Tan, Cursor) : « The best spec is code », 23 playbooks d’intervention (perf, forensics…).
::
::Note{tag="Règles d’or"}
Ne pas télécharger des skills n’importe où, ne pas cumuler deux skills sur le même thème venus de deux dépôts, et évaluer.
::
::::

---
# V2 : extrait de code recopié depuis la capture du PDF
section: Annexe E · Skills
---

# Différence entre tools et skills

::::Cols{cols=2 gap=8 fill align=start}
:::Stack{gap=3 .code-xs}
::Lead
Le **tool**, c’est du code qui dit **comment faire une action**.
::

:Eyebrow[extrait de preparer_bancs_docker]{tone=quiet code}

```ts
async function executer(
  commande: string,
  argumentsCommande: string[],
  signal: AbortSignal,
  cwd: string,
): Promise<void> {
  try {
    await executerFichier(commande, argumentsCommande, {
      cwd,
      signal,
      timeout: 120_000,
      maxBuffer: 64 * 1024,
    });
  } catch (erreur) {
    const execution = erreur as Error & { stdout?: string; … };
```
:::
:::Stack{gap=3 .code-xs}
::Lead
Le **skill**, c’est plutôt du texte qui dit **comment faire une tâche**.
::

:Eyebrow[exemple simplifié]{tone=quiet code}

```text
SKILL: validate-feature

Pour valider une feature :
1. lire les changements git
2. démarrer le banc de test
3. attendre qu'il soit prêt
4. lancer les tests concernés
5. si échec :
   - récupérer les logs
   - identifier la cause
   - proposer une correction
6. relancer les tests
7. produire un résumé
```
:::
::::
