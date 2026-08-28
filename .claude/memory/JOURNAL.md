# JOURNAL — trace des sessions de travail

3 lignes par session, à chaque point de contrôle naturel (pas seulement en fin de session) :
fait / bloque / prochaine action.

---

## 2026-08-28 (1)

- **Fait** : initialisation du projet dans VibeFlow depuis `PROJECT-TEMPLATE`. Import des 7
  documents de spécification dans `docs/00_context/` avec renommage « Révision 192 » → « CORTEX »
  (base Airtable et salon Discord inclus, voir DEC-001). Import du backlog figé
  `data/curriculum-192-notions.csv` (192 lignes, toutes `À venir`). Écriture de
  `scripts/build-sprints.mjs` qui dérive `data/sprints.json` de `notions.md` et vérifie
  l'invariant 8 sprints / 192 notions. Ajout de l'onglet « Cortex » en position 1 du Cerveau
  Manager du Cockpit, alimenté par les données réelles du CSV (voir DEC-002).
- **Bloque** : rien. Le projet reste à l'étape 0 de l'ordre de construction — la base Airtable
  `CORTEX` n'existe pas encore, donc aucun statut de notion n'est encore réel.
- **Prochaine action** : étape 1 de l'ordre de construction — créer la base Airtable `CORTEX`,
  importer le CSV tel quel, vérifier la lecture en API.
