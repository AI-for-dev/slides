---
layout: section
index: Acte 2 · Module 0 / 4
---

::SectionHead{eyebrow="Acte 2 · Module 0" num="2.0" detail="Isoler l’agent de votre machine"}
# Le bac à sable
::

::Agenda
- Ce qu’un agent de code peut faire sur votre machine
- Clone jetable, conteneur, micro-VM : ce que chacun protège et coûte
- Lancer Pi dans une Docker Sandboxes avec un kit versionné
- Un bac à sable pour les manipulations sans surveillance de l’acte
::

---
section: 2.0 · Le bac à sable
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

::Takeaway{.mt-5}
Une consigne (« ne lis rien hors du dépôt ») reste du texte, suivi ou non par un modèle non déterministe.
Le bac à sable pose une limite **qui ne dépend pas de son obéissance**.
::

---
section: 2.0 · Le bac à sable
---

# Le modèle n’a même pas besoin de se tromper

::::::Cols{cols=2 gap=8 fill align=center}
::::Stack{gap=4}
:::Item{variant=goal n=1}
Un fichier du dépôt écrit pour l’agent
::Detail
Le `SUPPORT.md` de NÉON imite une procédure d’assistance et demande d’envoyer le `.env` à une adresse externe.
L’agent qui l’ouvre traite l’instruction comme si elle venait de vous.
::
:::
:::Item{variant=goal n=2 ghost}
Une extension de l’annuaire communautaire
:Detail[Elle s’exécute avec l’intégralité de vos droits.]
:::
::Note{tone=muted}
Dans les deux cas la faille est dans le harnais : une ligne dans `AGENTS.md` ne vous protège pas.
::
::::

:::Card{variant=soft eyebrow="La documentation de Pi" center}
::Pull
« For untrusted repositories, generated code you do not intend to monitor closely, or unattended
automation, run pi in a contained environment. »
::

:Rule

Nos vingt exécutions de l’issue #1 sont exactement de l’automatisation sans surveillance.
:::
::::::

---
section: 2.0 · Le bac à sable
---

# Trois niveaux d’isolation

::::Cols{cols=3 gap=5 fill}
::Criterion{n=1 title="Clone jetable"}
NÉON cloné à un tag dans un répertoire temporaire, à chaque exécution. Ne coûte presque rien, mais le processus garde votre identité, votre `home` et votre réseau : seul le dépôt est protégé, et encore, si l’agent a `gh` il peut pousser.
::
::Criterion{n=2 title="Conteneur"}
Pi dans une image Docker où seul le dépôt est monté : votre `home` est hors de portée. Mais il partage le noyau, le réseau est ouvert par défaut, et « Provider API keys enter the container ».
::
::Criterion{n=3 title="Micro-VM à politique"}
Docker Sandboxes : un noyau par sandbox, un proxy sur l’hôte qui filtre le trafic sortant et injecte les clés. « Credential values never enter the VM ». Prix : une image de 700 Mo, un démon, une liste à entretenir.
::
::::

---
section: 2.0 · Le bac à sable
---

# Ce que chaque niveau protège

::Matrix{size=md first="15rem"}
| ce qui est protégé | clone jetable | conteneur | Docker Sandboxes |
| --- | --- | --- | --- |
| l’arbre de travail du dépôt | :Mark{v=yes} | :Mark{v=no} | :Mark[avec --clone]{v=part} |
| votre répertoire personnel | :Mark{v=no} | :Mark[si seul le dépôt est monté]{v=part} | :Mark{v=yes} |
| le réseau sortant | :Mark{v=no} | :Mark[ouvert par défaut]{v=no} | :Mark[refus par défaut, liste d’autorisations]{v=yes} |
| vos clés d’API | :Mark{v=no} | :Mark[elles entrent dans l’image]{v=no} | :Mark[seul le proxy de l’hôte les voit]{v=yes} |
::

::Takeaway{.mt-6}
Ces niveaux isolent Pi de l’hôte. À l’intérieur, rien n’empêche encore un `rm -rf` sur le dépôt ou la lecture d’un `.env`.
::

---
section: 2.0 · Le bac à sable
---

# Une garde dans Pi : pi-permission-system :Hint[pi.dev/packages]{href="https://pi.dev/packages/@gotgenes/pi-permission-system"}

::::Cols{cols=2 gap=7 fill align=center}
:::Stack{gap=4}
L’extension s’accroche à l’événement `tool_call` : chaque outil, commande bash, appel MCP ou skill est comparé
à des règles `allow` / `deny` / `ask` **avant** de s’exécuter.

::Specs
- **Global** `~/.pi/agent/extensions/…/config.json`
- **Projet** `.pi/extensions/…/config.json`, si le projet est approuvé
- **Agent** l’en-tête YAML du fichier d’agent, qui l’emporte
::

::Note{tag="Limite"}
Elle vit dans le même processus Node que Pi : elle resserre ce que Pi fait, elle ne remplace aucun niveau d’isolation.
::
:::

:::Stack{gap=2}
```bash
pi install npm:@gotgenes/pi-permission-system
```

```json
{
  "permission": {
    "*": "allow",
    "path": { "*": "allow", "*.env": "deny", "*.env.*": "deny" },
    "bash": { "*": "ask", "rm -rf *": "deny", "sudo *": "ask" },
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
section: 2.0 · Le bac à sable
---

# Exercice : une consigne contre une garde

::::Cols{cols=3 gap=5 fill}
:::Card{variant=accent eyebrow="En salle · 1" size=sm}
Dans un **clone jetable** de NÉON, déposez la configuration et un faux `.env`, puis demandez à Pi :

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

---
section: 2.0 · Le bac à sable
---

# Docker Sandboxes : un kit pour Pi :Hint[github.com/AI-for-dev/pi-sandbox]{href="https://github.com/AI-for-dev/pi-sandbox"}

::::Cols{cols="5fr 6fr" gap=7 fill}
:::Stack{gap=4}
`sbx` sait lancer `claude`, `codex`, `opencode`… mais pas Pi. Il faut donc un **kit** : un répertoire décrit par un `spec.yaml`.

```text
pi-sandbox
├── Dockerfile        image shell-docker + Node + Pi épinglés
├── spec.yaml         image, commande, clés, réseau
└── files/home/.pi/agent/settings.json
```

::Detail
Versions vérifiées : `sbx` 0.45.1, Docker Engine 29.7.2, Pi 0.87.1.
::
:::

:::Cell{.code-sm}
```yaml
sandbox:
  image: "pi-sandbox:0.87.1"
  entrypoint: [pi, -a]        # fichiers du projet déclarés sûrs

credentials:
  - service: ilaas
    apiKey:
      name: ILAAS_API_KEY
      proxyManaged: true      # Pi ne voit qu'une sentinelle
      inject:
        - domain: llm.ilaas.fr
          header: Authorization
          format: "Bearer %s"

permissions:
  network:
    allow: [github.com, raw.githubusercontent.com,
            pypi.org, files.pythonhosted.org, pi.dev]
```
:::
::::

:Pipeline{label="La clé" flow="Pi lit une sentinelle > proxy de l’hôte > Authorization vers llm.ilaas.fr" note="et nulle part ailleurs" .mt-4}

---
section: 2.0 · Le bac à sable
---

# Mise en route :Hint[docs.docker.com/ai/sandboxes]{href="https://docs.docker.com/ai/sandboxes/install/"}

::::Cols{cols=5 gap=3}
::Step{n=1 title="Installer"}
`sbx`, selon votre OS
::
::Step{n=2 title="Construire"}
l’image, puis la charger
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
git clone https://github.com/AI-for-dev/pi-sandbox
cd pi-sandbox
docker build --platform linux/arm64 -t pi-sandbox:0.87.1 .
docker image save pi-sandbox:0.87.1 -o pi-sandbox.tar
sbx template load pi-sandbox.tar

sbx secret set ilaas          # puis sbx secret ls
sbx policy init deny-all      # une fois pour toutes

sbx kit validate .
cd /chemin/vers/neon && sbx run /chemin/vers/pi-sandbox
```
:::
:::Stack{gap=3}
::Card{variant=soft eyebrow="Pourquoi deny-all" size=sm}
La politique `balanced` autorise des jokers comme `*.googleapis.com`, bien plus large que des API de modèles.
On part du refus et on n’ouvre que ce qui apparaît dans le journal.
::
::Card{variant=accent eyebrow="En non-interactif, personne ne répond" size=sm}
Sans réponse au *credential binding*, le sandbox démarre avec la sentinelle : `401` à l’usage, alors que `pi auth check` dit `ready`.
Écrivez le binding dans `~/.config/sbx/credentials.yaml` avant.
::
:::
::::

---
section: 2.0 · Le bac à sable
---

# Ce que le bac à sable ne protège pas

::::Cols{cols=3 gap=5 fill}
:::Card{badge="A" title="Le mode direct" center}
L’agent édite votre arbre de travail en place. Il peut modifier un hook git, un `Makefile` ou une config de CI, qui s’exécuteront plus tard **sur l’hôte**.

:Rule

Le bac à sable ne vous dispense pas de relire le diff.
:::
:::Card{badge="B" title="Les jokers du réseau" center}
`sbx policy init balanced` ouvre des domaines entiers. D’où `deny-all`, puis une ouverture au cas par cas, depuis `sbx policy log`.
:::
:::Card{badge="C" badgeTone=ghost title="Root dans la VM" center}
`sudo` sans mot de passe et un démon Docker à lui. Nous l’acceptons : rien n’en sort et la VM est jetable.
:::
::::

---
section: 2.0 · Le bac à sable
---

# Exercice et livrable

::::Cols{cols=2 gap=7 fill}
:::Card{variant=teal eyebrow="En autonomie" tone=teal}
Déroulez les cinq étapes jusqu’au premier `sbx run`, puis dans la session Pi :

- demandez la valeur de `ILAAS_API_KEY` : la sentinelle, pas votre clé
- lancez `curl https://example.com` : refusé
- faites modifier un fichier : le changement apparaît sur l’hôte

Lisez `sbx policy log`, puis rejouez l’exercice `pi-permission-system` **dans** le sandbox : les deux gardes se superposent.
:::

:::Cell
:Eyebrow[Quatre vérifications]{tone=teal}

::Musts
- `ILAAS_API_KEY` lue depuis le sandbox est la sentinelle
- Une requête vers un domaine absent de la liste échoue
- Une édition de Pi apparaît dans le dépôt côté hôte
- **`sbx policy log` ne montre aucun refus que vous n’ayez pas choisi**
::

::Note{.mt-5}
Après une séance entière dans le sandbox, n’ajoutez à `permissions.network.allow` que les domaines dont le refus vous a réellement bloqué.
::
:::
::::

---
section: 2.0 · Le bac à sable
---

# Généraliser

::::Stack{fill gap=4 center}
:::Item{variant=goal n=1}
Une frontière qui ne dépend pas de l’obéissance
::Detail
Une permission écrite dans `AGENTS.md` ou `SKILL.md` est une suggestion. Le bac à sable est la couche extérieure, celle qui tient quand le harnais lui-même est en faute.
::
:::
:::Item{variant=goal n=2 ghost}
La clé reste sur l’hôte
::Detail
L’agent n’a pas besoin de lire la clé, seulement que ses requêtes vers un domaine précis soient authentifiées.
::
:::
:::Item{variant=goal n=3 ghost}
Refuser par défaut, puis ouvrir depuis le journal
::Detail
La liste d’autorisations ne s’écrit pas d’avance : on part du refus, on travaille, on n’ajoute que ce qui a réellement bloqué.
::
:::
::::
