---
layout: section
index: Acte 2 · Module 2 / 4
---

::SectionHead{eyebrow="Acte 2 · Module 2" num="2.2" detail="Une procédure de travail, et ce qu’elle déplace"}
# Les compétences
::

::Agenda
- Ce qu’est un skill sur Pi, ce que le modèle en voit et n’en voit pas
- Une compétence que le modèle peut ignorer, ou qu’on lui impose
- Une procédure qui produit un livrable exploitable
- Mesurer ce qu’elle déplace, sans confondre déplacer et améliorer
- Réviser la procédure, et remesurer
::

---
section: 2.2 · Les compétences
---

# D’où l’on part

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
::Card{variant=soft eyebrow="Le constat du module 2.1" size=sm}
Avec le ticket cadré, 4 exécutions sur 20 écrivent les tests rouges demandés et n’ouvrent jamais `game/neon.js` :
le modèle épuise son budget à formuler les cas.
::
::Card{variant=soft eyebrow="Le seul levier qui a rattrapé ce décrochage" size=sm}
Fournir les tests déjà écrits. Personne ne le fera sur un vrai ticket.
::
:::
:::Card{variant=accent eyebrow="La question du module" center}
::Pull{size=lg}
Une procédure de travail, écrite une fois et rechargée à la demande, obtient-elle la même persévérance sans fournir les tests ?
::
:::
::::

---
section: 2.2 · Les compétences
---

# Un skill est un fichier markdown :Hint[agentskills.io]{href="https://agentskills.io"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=2}
:Eyebrow[.pi/skills/revue-rapide/SKILL.md]{tone=quiet}

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
:::Stack{gap=4}
Un frontmatter (au minimum un nom et une description) et un corps d’instructions. Ni code, ni enregistrement : déposer le fichier suffit.

::::Card{variant=soft size=sm}
::Specs
- **AGENTS.md** entre dans le contexte à chaque tour, et coûte à chaque tour
- **Skill** fait pour n’entrer que quand la tâche le demande
::
::::
:::
::::

---
section: 2.2 · Les compétences
---

# Ce que le modèle en voit

:::::Cols{cols=2 gap=8 fill}
:::Stack{gap=3}
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
Avec l’outil de lecture, sur la foi de la seule description. La doc de Pi ajoute : « models don’t always do this ».
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
section: 2.2 · Les compétences
---

# Exercice : vérifier la mécanique

::::Cols{cols=4 gap=4}
::Step{n=1 title="Déposer"}
`revue-rapide/SKILL.md`, modifier une ligne du jeu, ouvrir une session
::
::Step{n=2 title="Exporter"}
`\export` : le bloc `<available_skills>` est là, le corps non
::
::Step{n=3 title="Demander"}
« relis ce que je viens de modifier », sans nommer le skill : le modèle va-t-il lire `SKILL.md` ?
::
::Step{n=4 title="Imposer"}
session neuve, `/skill:revue-rapide` : le corps est dans votre premier message
::
::::

::::Cols{cols=2 gap=6 fill .mt-6}
::Card{variant=accent eyebrow="En salle" center}
Le premier chemin repose entièrement sur la description, le second n’en a pas besoin. L’appel à l’outil de lecture se voit dans la session.
::
::Card{variant=soft eyebrow="Écrire la description" center}
Écrivez la vôtre avant de lire la nôtre. Dit-elle **quand** s’en servir, ou seulement **ce que** fait la procédure ? Seule la première aide le modèle à décider.
::
::::

---
section: 2.2 · Les compétences
---

# La compétence playtest

::::Cols{cols=2 gap=8 fill}
:::Stack{gap=4}
::Lead
Deux choses à obtenir : que l’agent **décompose** le symptôme en défauts distincts, et qu’il **tienne la distance** jusqu’au vert.
::

::Chips{cols=1}
- Le rôle du playtesteur : un symptôme n’est pas un bug
- Un repère de coordonnées, pour ne pas deviner les signes
- Dix familles de défaillances, passées une par une
- Chaque déclencheur chiffré depuis les constantes du fichier
::
:::

:::Stack{gap=4}
::Card{badge="A" title="Un livrable à forme imposée" size=sm}
`.scratch/to_fix.md`, un bloc par défaut : cause à la ligne près, invariant violé, déclencheur chiffré, cas de test, sortie d’échec réelle, correction naïve refusée.
Un agent qui produit ce fichier a fait le travail qu’il décrit.
::
::Card{badge="B" title="Ce que la procédure refuse" size=sm}
Chaque cas passe au rouge deux fois : sur le code d’aujourd’hui et sur la correction naïve. Plus de tests qui vérifient seulement que « quelque chose a changé ».
::
:::
::::

---
section: 2.2 · Les compétences
---

# Comment la compétence entre dans la mesure

::::Cols{cols=3 gap=5 fill}
::Criterion{n=1 title="La demande négligée"}
Le même prompt d’une ligne que la base du module 2.1.
::
::Criterion{n=2 title="/skill:playtest en tête"}
Le corps est développé côté client : la compétence est **imposée**, pas proposée.
::
::Criterion{n=3 title="ISSUES.md interdit"}
La procédure travaille sur le symptôme du joueur, pas sur un ticket déjà rédigé.
::
::::

::Note{tag="skill_invoque" .mt-5}
20/20 sur ces configurations par construction, 0/20 ailleurs. Rien de ce qui suit ne dit si une bonne description déclenche.
::

---
section: 2.2 · Les compétences
---

# Ce que la mesure dit :Hint[gemma-4-31b, 20 répétitions, AGENTS.md et raisonnement identiques]

::Matrix{size=sm first="15rem"}
| configuration | in_scope | tests_ajoutes | briques | angles | sortie | voisines |
| --- | --- | --- | --- | --- | --- | --- |
| `+agents+well_crafted` | :Score{v=19} | :Score{v=17} | :Score{v=11} | :Score{v=12} | :Score{v=9} | :Score{v=9} |
| `+agents+skill` | :Score{v=6 hi} | :Score{v=8 hi} | :Score{v=16} | :Score{v=7} | :Score{v=13} | :Score{v=14} |
| `+agents+add_tests+well_crafted` | :Score{v=20} | :Score{v=17} | :Score{v=18} | :Score{v=18} | :Score{v=18} | :Score{v=18} |
| `+agents+add_tests+skill` | :Score{v=9 hi} | :Score{v=7 hi} | :Score{v=13} | :Score{v=12} | :Score{v=13} | :Score{v=13} |
::

::::Cols{cols=3 gap=5 fill .mt-5}
::Card{eyebrow="Établi · -47 pts" size=sm}
**Les tests partent hors de la suite.** La procédure les range dans `.scratch/to_fix.md`, et l’agent obéit.
::
::Card{eyebrow="Établi · -68 pts" size=sm}
**Les brouillons restent.** `.scratch/to_fix.md` traîne dans 11 exécutions sur 20, malgré l’étape « retire tous les fichiers créés ».
::
::Card{variant=soft eyebrow="Non concluant" tone=teal size=sm}
**Sur la correction, rien.** 16/20 contre 11/20 sur le critère, 7/20 contre 12/20 sur le coin : les deux intervalles contiennent zéro.
::
::::

---
section: 2.2 · Les compétences
---

# Contre ce qu’elle remplace, pas contre rien

::::Cols{cols=2 gap=8 fill}
:::Stack{gap=3}
:Eyebrow[Ticket cadré remplacé par la compétence, avec la sonde]

::Matrix{size=sm first="9rem"}
| colonne | ticket | compétence | écart |
| --- | --- | --- | --- |
| `in_scope` | :Score{v=20} | :Score{v=9} | -55 pts `*` |
| `tests_ajoutes` | :Score{v=17} | :Score{v=7} | -50 pts `*` |
| `angles` | :Score{v=18} | :Score{v=12} | -30 pts `*` |
| `briques` | :Score{v=18} | :Score{v=13} | -25 pts `o` |
::

::Note
Le coin est décrit dans le ticket. La compétence, qui n’a pas le droit de lire `ISSUES.md`, doit le retrouver seule.
::
:::
:::Stack{gap=4}
::Card{variant=accent eyebrow="L’écart à la base est un piège" size=sm}
`+agents+skill` affiche +29 points établis contre `nothing`. Mais elle en diffère par **quatre choses** : raisonnement, fichier de règles, compétence, extension de recherche web. Rien n’attribue ces points à la compétence.
::
::Card{variant=soft eyebrow="Ce qu’elle coûte" size=sm}
La configuration la plus chère de la matrice : 921 783 tokens d’entrée, 49 tours. Sur flash, 1 068 s de médiane contre 553 s pour le ticket cadré.
::
:::
::::

---
section: 2.2 · Les compétences
---

# Réviser la procédure, exécutions en main

::::Stack{fill gap=3.5 center}
:::Choice{k="Défaut 1" title="Les tests naissent au mauvais endroit"}
::Detail
L’étape 3 range les cas dans `.scratch/to_fix.md`, l’étape 5 doit les migrer vers `game/neon.test.js`. Dix exécutions sur vingt ratent cette marche.
::
:::
:::Choice{k="Défaut 2" title="La consigne de ménage détruit parfois le livrable"}
::Detail
Ignorée dans treize exécutions, appliquée au pied de la lettre dans deux : `game/neon.test.js`, que l’agent venait de remplir, a disparu.
::
:::
:::Choice{k="Défaut 3" title="Une référence fantôme fabrique des fichiers"}
::Detail
« Depuis la sonde de l’étape 1 », alors que l’étape 1 ne crée aucune sonde. D’où les `probe.js`, `repro.test.js`, `test_ghost.js`.
::
:::
::::

::Note{tag="flash" .mt-4}
La même compétence y obtient `tests_ajoutes` à 20/20 : sur gemma, c’est le protocole lui-même qui épuise le budget.
::

---
section: 2.2 · Les compétences
---

# La révision : playtest-court :Hint[6 étapes → 4, 182 lignes → 86]

::::Cols{cols=2 gap=7 fill}
:::Card{variant=teal eyebrow="Ce qu’elle garde" tone=teal}
- le rôle du playtesteur
- le repère de coordonnées
- la table des dix familles
- chaque déclencheur chiffré depuis les constantes
:::
:::Card{variant=accent eyebrow="Ce qu’elle coupe, et pourquoi"}
- les cas s’écrivent directement rouges dans `game/neon.test.js` : plus de migration, plus de ménage
- la recherche web disparaît : un seul appel dans les sessions
- double rouge et bloc de douze champs deviennent une ligne : le cas vérifie le comportement attendu **en valeurs**
:::
::::

---
section: 2.2 · Les compétences
---

# Ce que la seconde matrice dit :Hint[Les deux versions mesurées ensemble, hypothèse écrite avant]

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Stack{gap=4}
::Matrix{size=md first="9rem"}
| colonne | `playtest` | `playtest-court` | écart |
| --- | --- | --- | --- |
| `in_scope` | :Score{v=9} | :Score{v=20 hi} | +53 pts `*` |
| `tests_ajoutes` | :Score{v=13} | :Score{v=20 hi} | +32 pts `*` |
| `briques` | :Score{v=14} | :Score{v=17} | +11 pts `o` |
| `angles` | :Score{v=4} | :Score{v=8} | +19 pts `o` |
::

::Note{tag="flash"}
`in_scope` 15 → 20/20, aucune colonne de correction ne bouge. Médiane : 12 861 tokens contre 34 764, 692 s contre 1 054.
::
:::
:::Stack{gap=4}
::Card{variant=soft size=sm}
Les deux déplacements établis disparaissent. **La correction ne bouge toujours pas** : le coin reste à 8/20, loin des 14/20 du ticket cadré.
::
::Card{variant=accent eyebrow="La cellule répliquée" size=sm}
`+agents+skill` remesurée : 9, 13 et 14/20, là où la première campagne donnait 6, 8 et 16. Même configuration, même commit : la dispersion, encore.
::
:::
::::

---
section: 2.2 · Les compétences
---

# Ce qu’un skill ne garantit pas

::::Cols{cols=2 gap=8 fill}
:::Stack{gap=3}
:Eyebrow[Un outil d’agent complet]

::Matrix{size=md left first="12rem"}
| élément | skill | extension |
| --- | --- | --- |
| un nom | :Mark{v=yes} | :Mark{v=yes} |
| une description lue par le modèle | :Mark{v=yes} | :Mark{v=yes} |
| un schéma d’entrée validé | :Mark{v=no} | :Mark{v=yes} |
| une fonction d’exécution | :Mark{v=no} | :Mark{v=yes} |
| une permission avant l’exécution | :Mark{v=no} | :Mark{v=yes} |
::

::Note
Une extension est un module TypeScript dans `.pi/extensions/` qui appelle `pi.registerTool({ name, … })`.
::
:::
:::Card{variant=accent eyebrow="Un champ documenté n’est pas forcément lu" center}
La doc livrée avec Pi 0.80.6 décrit un champ `allowed-tools`. Le type que lit le code :

```ts
export interface SkillFrontmatter {
  name?: string;
  description?: string;
  "disable-model-invocation"?: boolean;
  [key: string]: unknown;
}
```

`allowed-tools` n’apparaît nulle part dans le code compilé. Le `[key: string]: unknown` l’accepte sans jamais s’en servir.
:::
::::

---
section: 2.2 · Les compétences
---

# Ce que ce module ne sait pas encore

::::Cols{cols=2 gap=7 fill}
:::Card{badge="?" badgeTone=ghost title="Une bonne description déclenche-t-elle ?" center}
Nos configurations imposent la compétence par `/skill:` : les matrices mesurent une procédure **appliquée**, jamais **choisie**.
:::
:::Card{badge="?" badgeTone=ghost title="Apporte-t-elle quelque chose à demande égale ?" center}
Il manque le témoin : la même configuration sans la compétence. La seconde matrice compare deux versions, pas la procédure à son absence.
:::
::::

::Card{variant=teal eyebrow="En autonomie" tone=teal .mt-5}
Ajoutez `+agents+skill_par_nom`, identique à `+agents+skill` mais sans `/skill:` dans le prompt, et lisez `skill_invoque`.
Vous mesurerez la seule chose que ce module affirme sans l’avoir établie.
::

---
section: 2.2 · Les compétences
---

# Généraliser :Hint[Ce qui reste vrai quand l’outil change]

::::Cols{cols=2 gap=4 fill content=center}
::Bullet{k="1" accent}
**Un skill est une procédure, pas un outil** : il impose un ordre de travail et une forme de livrable, rien de plus.
::
::Bullet{k="2" accent}
**La description est la seule chose lue à coup sûr** : elle doit dire quand s’en servir.
::
::Bullet{k="3" accent}
**Une procédure déplace le travail avant de l’améliorer** : regardez d’abord où elle l’envoie.
::
::Bullet{k="4" accent}
**Une consigne de nettoyage ne garantit pas le nettoyage** : supprimez le besoin de ménage.
::
::Bullet{k="5"}
**Chaque étape intermédiaire est une marche** que le modèle peut rater.
::
::Bullet{k="6"}
**Une procédure se révise comme du code**, exécutions lues une par une, puis remesurée.
::
::Bullet{k="7"}
**Un champ documenté n’est pas forcément lu** : la vérification tient en un `grep`.
::
::Bullet{k="8"}
**Une brique se mesure contre ce qu’elle remplace**, jamais contre rien.
::
::::

---
section: 2.2 · Les compétences
---

# Livrable

::::Cols{cols=5 gap=7 fill}
:::Cell{span=2}
::::Stack{gap=3}
:::Item{variant=role n=1}
**La compétence**
:Detail[Dans .pi/skills/, description écrite par vous, livrable à forme imposée, versions successives gardées]
:::
:::Item{variant=role n=2 ghost}
**Le répertoire de matrice**
:Detail[La configuration à compétence lue contre celle qu’elle remplace]
:::
:::Item{variant=role n=3}
**La ligne « outils » de la fiche**
:Detail[Skill, description, /skill:, forme du livrable, brouillon, extension]
:::
::::
:::
:::Cell{span=3}
::Card{variant=accent eyebrow="Critère de réussite" center fill}
Vous savez citer un effet de votre compétence qui est **établi**, un effet qui **ne l’est pas**, et dire ce qui manque pour trancher le second.

:Rule

Ce critère demande d’avoir lu une configuration contre la bonne référence. Il ne peut pas être satisfait de mémoire.
::
:::
::::
