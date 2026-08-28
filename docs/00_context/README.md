# CORTEX · documentation projet

Point d'entrée pour Claude Code. Lire dans cet ordre.

| Fichier | Contenu |
|---|---|
| `contexte.md` | Ce qu'est le projet, pour qui, les principes non négociables |
| `data.md` | Les 4 tables Airtable, champs et règles d'écriture |
| `notions.md` | Les 192 notions, par sprint, dans l'ordre d'envoi |
| `ecrans.md` | Les 3 écrans, la pile de cartes, les composants |
| `prompt.md` | Le prompt système de génération des fiches |
| `integration.md` | Airtable, Discord, VibeFlow |
| `automatisation.md` | Les 4 workflows n8n et le cycle de révision |

## État

Projet non démarré. Aucun code écrit. Les données des 192 notions existent au format
CSV, à importer dans Airtable.

## Ordre de construction imposé

1. Base Airtable remplie et lisible en API.
2. Écran de révision (pile de cartes) branché en lecture seule.
3. Écriture des verdicts depuis le dashboard.
4. Workflow n8n d'envoi Discord.
5. Route d'interaction Discord.
6. Onglet Prompt.
7. Écran Planning.

Ne pas construire l'étape N+1 avant que N soit utilisable en vrai.
