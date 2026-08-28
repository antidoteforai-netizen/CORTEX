# CLAUDE.md — CORTEX

Point d'entrée unique pour comprendre et faire évoluer ce projet. Ce fichier pointe vers `docs/`,
`.claude/memory/` et les procédures universelles pour le détail, il ne le duplique pas.

## 1. Contexte

**CORTEX** est un programme d'apprentissage de l'IA au niveau ingénieur : 192 notions réparties en
8 sprints de 2 semaines (4 mois), 2 notions par jour envoyées sur Discord, jugées par 3 verdicts
(Compris / À revoir / Perdue) avec répétition espacée. Le produit a deux surfaces sur la même
donnée : Discord (réception + verdict en un clic) et un dashboard web (révision, avancement,
édition du prompt).

Le déclencheur : refuser l'équation « maîtriser l'IA = maîtriser Claude Code et n8n ». Le fond
(algèbre, probabilités, optimisation, data engineering, ML/DL, MLOps, RAG, systèmes distribués)
s'apprend avec méthode, pas par outillage.

Détail métier complet : `docs/00_context/` — lire dans l'ordre donné par
[README.md](docs/00_context/README.md).

**Risque projet numéro un, tracé ici parce qu'il est produit et pas technique** : construire
l'outil au lieu de suivre le programme. Le dashboard doit être utilisable dès l'étape 3 de l'ordre
de construction ; tout ce qui vient après est du confort.

## 2. Architecture technique (spécifique au projet)

### Briques

| Brique | Rôle |
|---|---|
| Airtable, base `CORTEX` | Source de vérité unique (statuts, fiches, config). 4 tables, voir `docs/00_context/data.md` |
| Discord (bot + salon `#cortex`) | Surface de réception et de verdict en un clic (boutons, pas webhook) |
| n8n | 4 workflows cron : `envoi-matin`, `envoi-soir`, `revision-hebdo`, `projet-sprint` |
| API Anthropic | Mise en forme d'une notion **déjà choisie** — ne décide jamais de la suivante |
| Dashboard web | Révision (pile de cartes), planning, édition du prompt + route d'interaction Discord |
| Cockpit VibeFlow | Gouvernance et suivi du programme — onglet « Cortex » du Cerveau Manager |

### Règles non négociables du projet

1. Le backlog des 192 notions est **figé** (`data/curriculum-192-notions.csv`).
2. **Une seule** fonction applique les verdicts : `applyVerdict(recordId, verdict, source)`,
   appelée par la route Discord **et** par le dashboard. Jamais dupliquée.
3. Aucun lien inventé : toute URL générée est testée en `HTTP HEAD`, statut ≠ 200 = lien retiré.
4. Comprises + À revoir + Perdues + À venir = **192**, en permanence. Test d'intégrité le plus simple.
5. Aucun secret côté client (`AIRTABLE_TOKEN`, `DISCORD_*` en variables d'environnement serveur).

### Commandes

```bash
node scripts/build-sprints.mjs   # régénère data/sprints.json depuis docs/00_context/notions.md
```

`data/sprints.json` est **dérivé** — ne jamais l'éditer à la main, éditer `notions.md` et relancer.

### Ordre de construction imposé

1. Base Airtable remplie et lisible en API.
2. Écran de révision (pile de cartes) branché en lecture seule.
3. Écriture des verdicts depuis le dashboard.
4. Workflow n8n d'envoi Discord.
5. Route d'interaction Discord.
6. Onglet Prompt.
7. Écran Planning.

Ne pas construire l'étape N+1 avant que N soit utilisable en vrai. Le programme tourne en manuel
pendant les deux premières semaines ; les workflows se construisent pendant le sprint 2.

@../.claude/templates/CLAUDE-BASE.md
