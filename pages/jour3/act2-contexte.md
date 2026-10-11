---
layout: section
index: Acte 2 · Module 1 / 4
---

::SectionHead{eyebrow="Acte 2 · Module 1" num="2.1" detail="Ce qu’on y met, ce que ça coûte"}
# Le contexte<br />et la fenêtre
::

::Agenda
- Ce qu’il y a réellement dans la fenêtre, et ce que chaque partie coûte
- Les leviers : modèle, raisonnement, prompt, `AGENTS.md`, prompt système
- Un dispositif de mesure reproductible, pour trancher
- Un `AGENTS.md` court et une décision motivée sur chaque levier
::

---
section: 2.1 · Le contexte
---

# Cinq sources, une seule fenêtre

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Cell
<ContextStack />
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="« Dis juste OK »" tone=teal size=sm}
Sans fichier de contexte, skill ni extension, l’entrée pèse **1 660 tokens**. Avec un prompt système de trois lignes : **1 110**.
Celui de Pi coûte donc environ 550 tokens.
::
::Note
L’essentiel ne vient pas du harnais mais de ce que vous et l’agent déversez au fil de la session.
::
::Card{variant=accent eyebrow="En salle" size=sm}
`\export` après une question, puis lisez le prompt système de Pi en entier : repérez les **capacités** et les **conventions**.
::
:::
::::

---
section: 2.1 · Le contexte
---

# Que coûte un appel ? :Hint[Tarifs opencode Zen, au million de tokens]{href="https://opencode.ai/docs/zen/"}

::::Cols{cols=2 gap=9 fill align=center}
:::Stack{gap=5}
::Matrix{size=md}
| modèle | entrée | sortie | lecture de cache |
| --- | --- | --- | --- |
| `deepseek-v4-flash` | 0,14 $ | 0,28 $ | 0,0028 $ |
| `deepseek-v4-pro` | 1,74 $ | 3,48 $ | 0,0145 $ |
::

::Note{tag="ILaaS"}
Gratuit pour la formation : nos mesures comptent des tokens plutôt que des euros. Un compteur de tokens ne vous prévient pas quand vous dépensez.
::
:::

:::Stack{gap=4}
::Bullet{k="×12" accent}
Le `pro` coûte 12,4 fois le `flash` à tarif nominal.
::
::Bullet{k="×50" accent}
Entre l’entrée et la lecture de cache : ×50 sur `flash`, **×120** sur `pro`.
::
::Card{variant=soft size=sm}
C’est ce second écart qui rend un agent viable : il relit tout son historique à chaque tour, et paierait sinon vingt fois son contexte sur une session de vingt tours.
::
:::
::::

---
section: 2.1 · Le contexte
---

# Le cache, mesuré :Hint[Cinq tours sur game/theme.js, bascule de modèle au 4e]

::Matrix{size=sm first="3.4rem"}
| appel | tour | prompt | modèle | entrée | lecture de cache | coût |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | « Lis `game/theme.js`… » | `flash` | 1 675 | 0 | 0,000254 $ |
| 2 | 1 | (suite, après la lecture) | `flash` | 307 | 1 664 | 0,000081 $ |
| 3 | 2 | « cite une couleur… » | `flash` | 66 | 2 048 | 0,000053 $ |
| 4 | 3 | « combien de couleurs… » | `flash` | 118 | 2 048 | 0,000087 $ |
| 5 | 4 | « confirme ce nombre… » | `pro` | 2 521 | **0** | **0,005455 $** |
| 6 | 5 | « redis ce nombre… » | `pro` | 148 | 2 432 | 0,000362 $ |
::

::::Cols{cols=2 gap=6 .mt-5}
::Takeaway
**Ce qui est stable devant, ce qui varie derrière.** Le cache ne marche que sur un préfixe inchangé :
un horodatage ou un `git status` dans le prompt système fait tout repayer, à chaque tour.
::
::Takeaway
**Changer de modèle n’est pas gratuit.** La bascule remet le cache à zéro : ce tour coûte quinze fois le suivant, à modèle identique.
::
::::

---
section: 2.1 · Le contexte
---

# La tâche : l’issue #1 de NÉON

::::Cols{cols=2 gap=8 fill}
:::Stack{gap=4}
::Lead
La balle traverse les briques au lieu de rebondir. `ISSUES.md` détaille les comportements attendus.
::

::Card{variant=soft eyebrow="Ce que l’agent trouve vite" size=sm}
Calculer la distance aux côtés de la brique et inverser une des deux vitesses selon le côté touché.
::
::Card{variant=accent eyebrow="Ce qu’il a peu de chances de traiter seul" size=sm}
Le **coin**, rare mais réel, et une vitesse assez grande pour que la balle franchisse la brique sans jamais la recouvrir.
::
:::

:::Cell
:Eyebrow[Le cadre, en trois règles]{tone=teal}

::Musts
- Ne modifier que `game/neon.js` et `game/neon.test.js`
- Lancer les tests pour vérifier que rien n’est cassé
- Ajouter des tests si la couverture manque, ce qui est le cas ici
::

::Note{tag="Sonde" .mt-6}
Tout est vérifié de façon déterministe par un fichier de tests, sans LLM-as-a-judge.
::
::Note{tag="Clone" .mt-2}
Chaque exécution part d’un clone jeté au tag `etalon-v1`.
::
:::
::::

---
section: 2.1 · Le contexte
---

# Ce que l’on mesure à chaque exécution

::::Cols{cols=2 gap=8 fill align=center}
:::Card{eyebrow="Le procédé"}
::Specs{w="7rem" raw}
- **delivered** au moins un fichier modifié
- **in_scope** seuls `neon.js` et `neon.test.js` touchés
- **suite_lancee** `npm test` lancé par l’agent, lu dans sa session
- **tests_ajoutes** plus de cas qu’à l’étalon
::
:::
:::Card{eyebrow="La correction, par la sonde" tone=teal}
::Specs{w="6rem" raw}
- **briques** le critère : sur chaque face, l’axe touché s’inverse et l’autre ne bouge pas
- **angles** dans le coin, les deux composantes s’inversent
- **sortie** après le rebond, la balle est hors de la brique
- **voisines** sur une couture, un seul rebond
- **traversée** une balle rapide ne passe plus à travers
::
:::
::::

---
section: 2.1 · Le contexte
---

# Les curseurs, à la main

:::::Stack{fill center gap=5}
::::Cols{cols=2 gap=7}
:::Card{badge="1" title="Le modèle" .code-sm}
Même demande sur deux modèles de tailles différentes, dans deux clones séparés. La « demande négligée », celle qu’on écrit le premier jour.

```bash
git clone --branch etalon-v1 …/neon.git neon-model-xxx
```

::Detail
Lisez les diffs et les `/session`, sans conclure : deux exécutions ne départagent pas deux modèles.
::
:::
:::Card{badge="2" title="L’effort de raisonnement"}
`pi --help` annonce sept niveaux, de `off` à `max`. Comparez `--thinking minimal` et `--thinking max` sur `gemma-4-31b` :
**aucun écart**, les deux produisent la même requête. Ce modèle n’a que `on` et `off`.

::Detail
Refaites la comparaison entre deux niveaux réellement distincts, `off` et `high`.
::
:::
::::

::Takeaway{.mt-5}
Un réglage exposé par le harnais n’est pas forcément transmis au modèle. Cherchez où atterrit un flag avant de lui faire confiance.
::
:::::

---
section: 2.1 · Le contexte
---

# AGENTS.md, le point de configuration globale

::::Cols{cols=2 gap=8 fill}
:::Stack{gap=4}
Le fichier entre dans le contexte **à chaque tour**. Quand l’agent se trompe, on ajoute une phrase, puis une autre… Chaque ligne coûte, et les modèles suivants en rendront certaines obsolètes.

::Card{variant=accent eyebrow="Budget : 40 lignes" size=sm}
L’`AGENTS.md` de NÉON ne dépassera jamais 40 lignes. Un module qui veut ajouter une règle doit d’abord en retirer une, ou fusionner les deux.
::

::Note
Il peut pointer ailleurs : conventions dans `CONTRIBUTING.md`, architecture dans le `README.md`, historique dans git.
::
:::

:::Stack{gap=4}
::Card{variant=soft eyebrow="Ce que dit la mesure" size=sm}
Sur nos vingt exécutions de l’issue #1 avec la demande négligée, **aucune n’a lancé la suite de tests** et **aucune n’a ajouté un cas**.
::
::Card{eyebrow="En salle" size=sm}
Écrivez l’`AGENTS.md` de NÉON à partir de vos propres diffs : ce que l’agent a fait sans qu’on le demande, ou omis. Faites-lui lancer les tests et en ajouter.
::
::Card{variant=teal eyebrow="Un AGENTS.md peut en cacher un autre" tone=teal size=sm}
Pi les charge en cumulé : `~/.pi/agent/`, chaque parent, puis le répertoire courant. `-nc` coupe cette découverte, indispensable pour mesurer.
::
:::
::::

---
section: 2.1 · Le contexte
---

# Prompt système et compaction

:::::Stack{fill center gap=5}
::::Cols{cols=2 gap=7}
:::Card{badge="A" title="Remplacer le prompt système" center}
`.pi/SYSTEM.md` à la racine du projet, ou `~/.pi/agent/SYSTEM.md`, remplace entièrement celui de Pi.
`--system-prompt` laisse en plus les fichiers de contexte et les skills s’ajouter.

:Rule

550 tokens : le reste du travail se joue ailleurs. À ne modifier que pour de bonnes raisons.
:::
:::Card{badge="B" title="Une fenêtre bridée, pour voir la compaction" center}
Pi résume les anciens messages quand

```text
contextTokens > contextWindow - reserveTokens
```

`reserveTokens` vaut 16 384 par défaut. Sur NÉON (617 lignes, gemma à ≈ 128 000 tokens) elle ne se déclenche jamais. Déclarez le même modèle avec `"contextWindow": 32000` dans `models.json`, travaillez jusqu’au déclenchement, puis lisez la coupure dans `\tree`.
:::
::::

::Takeaway{.mt-5}
La fenêtre que connaît un harnais est une ligne de configuration, pas une propriété du modèle.
::
:::::

---
section: 2.1 · Le contexte
---

# Une expérience plus complète : trysquare :Hint[github.com/AI-for-dev/trysquare]{href="https://github.com/AI-for-dev/trysquare"}

::::Cols{cols=2 gap=8 fill align=center}
:::Stack{gap=4}
Un outil Python écrit pour la formation : il lance les configurations d’un scénario, note chaque exécution, agrège et synthétise.
Il ne sait rien de NÉON ni de l’issue #1.

::Cell{.code-sm}
```text
trysquare-campaign/
  trysquare.toml   où est NÉON, où vivent les clones
  scenarios/       une expérience = un fichier TOML
  hypotheses/      ce qui est prédit, écrit avant de mesurer
  briques/         tickets, AGENTS.md, prompt système, skills
  validateurs/     ce qui note
  results/         une matrice par répertoire
```
::
:::
:::Stack{gap=3}
::::Card{variant=soft eyebrow="Ce que garde chaque exécution" size=sm}
::Specs{w="7.5rem" raw}
- **session** l’export JSONL de Pi, rejouable en HTML
- **validation** l’état de chaque test de validation
- **configuration** modèle, harnais, tests
- **diff.patch** ce qui a changé dans NÉON
::
::::
::Note
À la fin : une synthèse HTML et Markdown, réussites par configuration, coûts et durées moyennes.
::
:::
::::

---
section: 2.1 · Le contexte
---

# Le plan d’expérience :Hint[Une base, et des variantes qui changent peu de chose]

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Cell
::Matrix{size=md left first="17rem"}
| configuration | ce qui change |
| --- | --- |
| `nothing` | rien, c’est la référence |
| `+thinking` | `thinking = "high"` |
| `+agents` | `AGENTS.md` déposé dans le clone |
| `+well_crafted` | le prompt nomme l’issue, le périmètre, le critère d’arrêt |
| `-system_prompt` | prompt système remplacé par trois lignes |
| `+agents+well_crafted` | `AGENTS.md` et prompt bien écrit |
| `+agents+add_tests+well_crafted` | et la sonde déposée d’avance |
::
:::
:::Stack{gap=4}
::Card{variant=soft eyebrow="La base, nothing" size=sm}
Ce que fait quelqu’un le premier jour : demande négligée, pas de fichier de règles, prompt système de l’agent, raisonnement coupé.
::
::Card{variant=accent eyebrow="Le prompt bien écrit" size=sm}
Il ne recopie pas le ticket. Il mesure si **pointer un document** suffit à ce que l’agent aille le lire.
::
:::
::::

---
section: 2.1 · Le contexte
---

# Pourquoi répéter :Hint[Six exécutions strictement identiques de nothing]

::Matrix{size=md first="10rem"}
| exécution | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- |
| tokens d’entrée | 13 126 | 16 035 | 13 060 | 13 144 | 14 771 | 13 188 |
| tours | 4 | 5 | 4 | 4 | 5 | 4 |
| durée | 16 s | 38 s | 50 s | 31 s | 20 s | 9 s |
| critère atteint | :Mark{v=yes} | :Mark{v=yes} | :Mark{v=yes} | :Mark{v=no} | :Mark{v=yes} | :Mark{v=no} |
::

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5 .mt-5}
::Card{variant=soft eyebrow="Un point" size=sm}
Un point de pourcentage de réussite. 18/20 contre 11/20 : **+35 points**.
::
::Card{variant=soft eyebrow="* établi · o non concluant" size=sm}
Une seule question : l’intervalle de l’écart contient-il zéro ? Les +35 points viennent avec \[+10, +60\] : positif, sans taille précise.
::
::Card{variant=soft eyebrow="Combien de répétitions" size=sm}
Trois suffisent à **voir** la dispersion. Départager deux leviers en demande bien plus : nos tables sont à vingt.
::
::::
:::::

---
section: 2.1 · Le contexte
---

# Exercice : lancer la matrice :Hint[github.com/AI-for-dev/trysquare-starter]{href="https://github.com/AI-for-dev/trysquare-starter"}

::::Cols{cols="2fr 1fr" gap=7 fill align=center}
:::Cell{.code-sm}
```bash
git clone https://github.com/AI-for-dev/trysquare-starter
cd trysquare-starter && uv sync

# le plan complet, sans rien dépenser
uv run trysquare run scenarios/issue1-contexte.toml --output results --dry-run

# trois répétitions, pendant qu'on discute des curseurs
uv run trysquare run scenarios/issue1-contexte.toml --output results --repetitions 3

# analyser sans relancer de modèle
uv run trysquare render  scenarios/issue1-contexte.toml --output results --repetitions 3
uv run trysquare replay  results/issue1-contexte_… --scenario … --rescore
uv run trysquare compare results/… results/…
```
:::
:::Stack{gap=4}
::Card{variant=accent eyebrow="En salle" size=sm}
`uv` installé, puis le *dry run* et la matrice à trois répétitions.
::
::Card{variant=teal eyebrow="En autonomie" tone=teal size=sm}
Copiez le scénario, changez **une** configuration, relancez. Vous n’avez touché ni l’outil, ni le validateur, ni les autres configurations.
::
::Note
Vingt répétitions prennent 2 à 3 h : nous fournissons une campagne complète, navigable exécution par exécution.
::
:::
::::

---
section: 2.1 · Le contexte
---

# Nos mesures :Hint[gemma-4-31b sur ILaaS, 20 répétitions, août 2026]

::Matrix{size=xs first="15rem"}
| configuration | suite_lancee | tests_ajoutes | briques | angles | sortie | voisines | traversée |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `nothing` | :Score{v=0} | :Score{v=0} | :Score{v=11} | :Score{v=0} | :Score{v=9} | :Score{v=7} | :Score{v=0} |
| `+thinking` | :Score{v=15} | :Score{v=3} | :Score{v=16} | :Score{v=0} | :Score{v=17} | :Score{v=15} | :Score{v=0} |
| `+agents` | :Score{v=20 hi} | :Score{v=0} | :Score{v=9} | :Score{v=0} | :Score{v=8} | :Score{v=6} | :Score{v=0} |
| `+well_crafted` | :Score{v=20} | :Score{v=17 hi} | :Score{v=13} | :Score{v=14 hi} | :Score{v=13} | :Score{v=13} | :Score{v=4} |
| `-system_prompt` | :Score{v=0} | :Score{v=0} | :Score{v=14} | :Score{v=0} | :Score{v=14} | :Score{v=13} | :Score{v=0} |
| `+agents+well_crafted` | :Score{v=20} | :Score{v=17} | :Score{v=11} | :Score{v=12} | :Score{v=9} | :Score{v=9} | :Score{v=12} |
| `+agents+add_tests+well_crafted` | :Score{v=20} | :Score{v=17} | :Score{v=18 hi} | :Score{v=18 hi} | :Score{v=18 hi} | :Score{v=18 hi} | :Score{v=17 hi} |
::

::Note{.mt-4}
`delivered` et `in_scope` sont à 18/20 ou plus partout. `+well_crafted` et `+thinking` ont perdu des exécutions sur des « Request timed out » d’ILaaS.
::

---
section: 2.1 · Le contexte
---

# Ce que disent les deux tables

::::Cols{cols=2 gap=5 fill content=center}
:::Item{variant=adv n=1}
Le prompt cadré fait faire tout ce que le ticket nomme
::Detail
`tests_ajoutes` 0 → 17/20, `angles` 0 → 14/20. Le coin reste à 0/20 sur les **quatre-vingts** exécutions qui ne nomment pas l’issue.
::
:::
:::Item{variant=adv n=2}
Le fichier de règles ne déplace que le procédé
::Detail
`+agents` : `suite_lancee` 0 → 20/20, mais rien sur la correction. Par-dessus le prompt cadré, il n’apporte plus rien.
::
:::
:::Item{variant=adv n=3}
Le raisonnement déplace le critère, seul
::Detail
`+thinking` : +29 points établis sur `briques`. Mais le coin reste à 0 : il ne fait pas lire le ticket.
::
:::
:::Item{variant=adv n=4}
Le prompt cadré fait écrire les tests rouges, et parfois s’arrête là
::Detail
4 exécutions sur 20 n’ouvrent jamais `game/neon.js`. Le modèle a un budget : décrire plus de travail ne l’agrandit pas.
::
:::
::::

::Takeaway{.mt-5}
Une ligne d’`AGENTS.md` qu’un ticket correct dirait de toute façon est une ligne à retirer.
::

---
section: 2.1 · Le contexte
---

# Donner les tests répare le décrochage :Hint[Seule différence : la sonde déposée dans l’arbre]

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Cell
::Matrix{size=md first="10rem"}
| colonne | sans la sonde | avec la sonde | écart |
| --- | --- | --- | --- |
| `sortie` | :Score{v=9} | :Score{v=18 hi} | +43 pts `*` \[+17, +69\] |
| `voisines` | :Score{v=9} | :Score{v=18 hi} | +43 pts `*` \[+17, +69\] |
| `briques` | :Score{v=11} | :Score{v=18 hi} | +32 pts `*` \[+6, +58\] |
| `angles` | :Score{v=12} | :Score{v=18 hi} | +27 pts `*` \[+1, +53\] |
| `tests_ajoutes` | :Score{v=17} | :Score{v=17} | -4 pts `o` |
| `sonde_intacte` | sans objet | :Score{v=20} | |
::
:::
:::Stack{gap=4}
::Card{variant=soft size=sm}
Les quatre colonnes de la correction montent, et les quatre écarts sont établis. Le coin commence à **un** point : positif, sans taille précise.
::
::Card{variant=accent eyebrow="Mais" size=sm}
Les cas limites étaient écrits d’avance, par nous. Sur un vrai ticket, personne ne vous les fournira. Ce qu’ils apportent, c’est de la **persévérance**.
::
:::
::::

---
section: 2.1 · Le contexte
---

# Trois vérifications avant de citer une table

:::::Stack{fill center gap=5}
::::Cols{cols=3 gap=5}
:::Card{badge="1" title="Le compte de reprises"}
Un tour relancé parce que le fournisseur a échoué rejoue tout le contexte et **re-pilote** l’agent.

Sur gemma : **1 151** reprises, 1 ou 2 sur les contextes courts, 205 sur les plus lourds. Sur `deepseek-v4-flash` : 37 au total.
:::
:::Card{badge="2" title="Le test de validation"}
Une colonne toute noire peut être un défaut du validateur. Le nôtre recopie les commandes passées quand il ne voit pas de `npm test`.

`deepseek` écrit `cd …/repo && npm test` 664 fois, `npm test 2>&1 | tail -30` 80 fois.
:::
:::Card{badge="3" title="La comparaison de modèles"}
Coin de la brique, gemma contre flash :

::Matrix{size=xs}
| | gemma | flash |
| --- | --- | --- |
| `nothing` | :Score{v=0} | :Score{v=8} |
| `+well_crafted` | :Score{v=14} | :Score{v=19} |
::

::Detail
Modèle et fournisseur changent ensemble : même sens, sans pouvoir attribuer l’écart.
::
:::
::::
:::::

---
section: 2.1 · Le contexte
---

# Trois conclusions tentantes, qui ne tiennent pas

:::Surprises{left="Ce qu’on aimerait dire" right="Ce que dit l’intervalle"}
::Surprise{q="« Le fichier de règles casse la correction »"}
« +agents » : 9/20 contre 11/20, soit -10 points. L’intervalle contient zéro : rien à en dire.
::
::Surprise{q="« Retirer le prompt système améliore le rebond »"}
14/20 contre 11/20, non concluant. Avec trois exécutions bien tirées, 3/3 contre 1/3 : on y aurait cru.
::
::Surprise{q="« Le prompt cadré corrige mieux le bug »"}
+17 points sur le critère, non concluant. Son effet réel est ailleurs : tests ajoutés et coin.
::
:::

::Takeaway{.mt-4}
Un effet qui ne dépasse pas la dispersion de sa propre configuration n’est pas un effet. Et un effet établi ne l’est que sur cette tâche, ce ticket, ce modèle.
::

---
section: 2.1 · Le contexte
---

# La pile contre la base :Hint[À modèle rigoureusement constant]

::::Cols{cols="3fr 2fr" gap=8 fill align=center}
:::Cell
::Matrix{size=sm first="9rem"}
| | `nothing` | pile complète |
| --- | --- | --- |
| `briques` | :Score{v=11} | :Score{v=18 hi} |
| `sortie` | :Score{v=9} | :Score{v=18 hi} |
| `voisines` | :Score{v=7} | :Score{v=18 hi} |
| `angles` | :Score{v=0} | :Score{v=18 hi} |
| `traversée` | :Score{v=0} | :Score{v=17 hi} |
| `suite_lancee` | :Score{v=0} | :Score{v=20} |
| `tests_ajoutes` | :Score{v=0} | :Score{v=17} |
| tours médians | 19 | 13 |
| durée médiane | 163 s | 410 s |
::
:::
:::Stack{gap=4}
::::Card{variant=soft eyebrow="Addy Osmani" center}
::Pull
« A decent model with a great harness beats a great model with a bad harness »
::
::::
::Note
Vérifiée ici sur sa moitié la plus facile à établir : une correction qui marche une fois sur deux contre neuf fois sur dix.
::
::Detail
Scores sur gemma, tours et durées sur `deepseek-v4-flash` (37 reprises, colonnes de coût lisibles).
::
:::
::::

---
section: 2.1 · Le contexte
---

# Généraliser :Hint[Ce qui reste vrai quand l’outil change]

::::Cols{cols=2 gap=4 fill content=center}
::Bullet{k="1" accent}
**Stable devant, variable derrière** : toute donnée volatile placée tôt invalide le cache de ce qui suit.
::
::Bullet{k="2" accent}
**Pointer un document suffit à ce qu’il soit lu**, et c’est ce qui y est écrit qui décide du résultat.
::
::Bullet{k="3" accent}
**Un modèle a un budget** : décrire plus de travail ne l’agrandit pas.
::
::Bullet{k="4" accent}
**Le fichier de règles** change ce que l’agent fait, pas ce qu’il trouve.
::
::Bullet{k="5"}
**Un réglage exposé** n’est pas forcément transmis au modèle.
::
::Bullet{k="6"}
**Un effet qui ne survit pas au rééchantillonnage** n’est pas un effet.
::
::Bullet{k="7"}
**Épinglez par le commit**, pas par un tag qu’un `git tag -f` déplace.
::
::Bullet{k="8"}
**Une métrique dit pourquoi**, et l’hypothèse s’écrit avant de mesurer.
::
::::

---
section: 2.1 · Le contexte
---

# Livrable

::::Cols{cols=5 gap=7 fill}
:::Cell{span=2}
::::Stack{gap=3}
:::Item{variant=role n=1}
**L’`AGENTS.md` de NÉON**
:Detail[Sous les 40 lignes, chaque règle justifiée par un échec observé]
:::
:::Item{variant=role n=2 ghost}
**Le répertoire de matrice**
:Detail[Les mesures brutes, sessions et diffs qui permettent de refabriquer la table]
:::
:::Item{variant=role n=3}
**La fiche de décision**
:Detail[Une ligne par levier : effet mesuré, adopté ou non, pourquoi]
:::
::::
:::
:::Cell{span=3}
::Card{variant=accent eyebrow="Critère de réussite" center fill}
Vous savez citer un levier que vous avez mesuré **sans effet** sur NÉON, et dire à quelle condition il en aurait un ailleurs.

:Rule

Notre exemple : `AGENTS.md` ne déplace pas d’un point le critère de correction. Il deviendrait décisif sur un ticket dont l’échec habituel est de procédé, ou sur un dépôt aux tickets mal écrits.
::
:::
::::
