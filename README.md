# CORTEX

Programme d'apprentissage de l'IA au niveau ingénieur : 192 notions, 8 sprints de 2 semaines,
2 notions par jour sur Discord, répétition espacée par 3 verdicts.

| | |
|---|---|
| État | Non démarré — aucun code produit écrit. Backlog des 192 notions prêt à importer. |
| Source de vérité | Airtable, base `CORTEX` (à créer) |
| Suivi | Cockpit VibeFlow → Cerveau Manager → onglet « Cortex » |

## Contenu du dépôt

| Chemin | Contenu |
|---|---|
| `CLAUDE.md` | Point d'entrée : contexte, briques, règles non négociables, ordre de construction |
| `docs/00_context/` | Spécification complète (7 documents, lire `README.md` en premier) |
| `data/curriculum-192-notions.csv` | Les 192 notions, prêtes à importer dans Airtable sans transformation |
| `data/sprints.json` | Métadonnées des 8 sprints — **dérivé**, régénéré par `scripts/build-sprints.mjs` |
| `.claude/memory/` | Journal, décisions, blocages, apprentissages |

## Commandes

```bash
node scripts/build-sprints.mjs   # data/sprints.json <- docs/00_context/notions.md
```
