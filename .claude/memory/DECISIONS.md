# DECISIONS — décisions structurantes tracées

Format : une entrée par décision (choix d'architecture, de stratégie, de branche). Ne jamais
supprimer ; marquer `[REMPLACÉE PAR DEC-XXX]` si obsolète.

---

## DEC-001 — Un seul nom pour tout le système : CORTEX

- **Date** : 2026-08-28
- **Contexte** : les documents de spécification livrés portaient trois noms pour la même chose —
  le projet « Révision 192 », la base Airtable `Protocole 192`, le salon Discord `#protocole-192`.
- **Options envisagées** : (a) ne renommer que le projet, garder les noms d'infrastructure ;
  (b) tout aligner sur `CORTEX`.
- **Choix** : (b). Projet, base Airtable et salon Discord s'appellent tous `CORTEX` / `#cortex`.
- **Raisonnement** : aucune de ces ressources n'existe encore (projet non démarré), le coût du
  renommage est donc nul aujourd'hui et croissant ensuite. Trois noms pour un système
  mono-utilisateur est une dette de lisibilité pure, sans contrepartie.
- **Conséquences** : à la création de la base Airtable et du salon Discord, utiliser ces noms.
  Les documents de `docs/00_context/` sont déjà à jour.

## DEC-002 — Le Cockpit affiche CORTEX depuis les fichiers du dépôt, pas depuis Airtable

- **Date** : 2026-08-28
- **Contexte** : l'onglet « Cortex » du Cerveau Manager doit montrer l'avancement du programme,
  mais la source de vérité des statuts (`Airtable`) n'existe pas encore, et le Cockpit s'ouvre en
  `file://` sans serveur — il ne peut pas appeler une API au chargement.
- **Options envisagées** : (a) attendre Airtable et laisser l'onglet en placeholder ; (b) faire
  appeler l'API Airtable par le navigateur ; (c) lire `data/curriculum-192-notions.csv` et
  `data/sprints.json` au moment du build, via `collect-data.mjs`.
- **Choix** : (c).
- **Raisonnement** : (b) est exclu par la règle « pas de secret côté client » et par la contrainte
  zéro serveur du Cockpit. (a) laisserait un onglet vide alors que la structure du programme (8
  sprints, 192 notions, intitulés, projets de sprint) est déjà une donnée réelle et vérifiable.
  (c) affiche du réel sans rien inventer : tant que le CSV porte `statut = À venir` partout,
  l'onglet affiche honnêtement 0 notion traitée.
- **Conséquences** : l'onglet reflète l'état du **dépôt**, pas d'Airtable — l'écart devient visible
  dès que le programme démarre. Quand Airtable sera la source vivante, remplacer la lecture du CSV
  dans `collect-data.mjs` par un export Airtable rafraîchi, sans toucher à l'UI ni au calcul
  d'agrégation (`aggregateCortexSprints`, testé).
