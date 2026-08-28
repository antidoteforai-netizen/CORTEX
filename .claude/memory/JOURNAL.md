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

## 2026-08-28 (2)

- **Fait** : maquette cliquable du dashboard produit, `prototypes/dashboard-cortex.html`, publiée
  en artifact. Reprise complète de la première maquette externe : nom CORTEX, contenu de fiche
  qui ne tronque plus (la pile épouse la hauteur de la fiche, défilement interne au-delà),
  suppression des emoji de verdict, pile de 3 cartes réelle avec glissement, tampon et envol,
  progression redessinée en trame des 192 notions et Planning en planche 8 x 24 (voir DEC-003),
  textes d'interface resserrés. Les 192 intitulés, les 8 sprints et le prompt viennent des
  fichiers réels du dépôt ; seuls les statuts et le contenu des fiches sont simulés, et la
  maquette le dit en tête et en pied de page.
- **Bloqué** : rien. Écart signalé, non tranché : le sens des gestes de verdict (voir DEC-004).
- **Prochaine action** : trancher DEC-004, puis étape 1 de l'ordre de construction (base Airtable
  `CORTEX`, import du CSV, lecture en API).

## 2026-08-28 (3)

- **Fait** : le principe visuel de la maquette (DEC-003) est maintenant aussi dans le Cockpit,
  onglet Cerveau Manager > Cortex : réglette des 192 notions en progression, planche 8 x 24 pour
  situer les notions perdues. Rendu avec les tokens VibeFlow et non la palette CORTEX, pour ne pas
  créer deux identités dans une même application (décision tracée côté racine VibeFlow).
- **Bloqué** : rien. DEC-004 (sens des gestes de verdict) toujours ouvert, à trancher avant
  l'étape 2.
- **Prochaine action** : étape 1 de l'ordre de construction, créer la base Airtable `CORTEX` et y
  importer `data/curriculum-192-notions.csv` tel quel.

## 2026-08-28 (4)

- **Fait** : (1) Les trois chemins de verdict sont vérifiés en navigateur réel, pas relus :
  glissement souris gauche/bas/droite, flèches clavier, boutons, plus le retour de carte sous le
  seuil et le glissement démarré dans le texte de la fiche. 9 scénarios, 9 succès, invariant 192
  tenu à chaque étape. Boutons et en-tête de carte réalignés sur la maquette de référence
  (centrés, bordure à la couleur du verdict, glyphes ← ↓ →). (2) Onglet « Chantier » ajouté au
  Cerveau Manager : 8 étapes, 35 tâches, dépendances et alertes, dérivé de `data/chantier.json`
  (voir DEC-006). (3) Sourçage des 192 notions via `scripts/build-sources.mjs` et
  `data/sources.json` (voir DEC-005) : 331 URL, tous les hôtes sur liste blanche, 13 sources et
  5 playlists vérifiées en vrai. Audit de verbosité passé sur les trois surfaces, colophon
  resserré ; les 8 fiches d'exemple respectent la règle des 250 mots.
- **Bloqué** : rien. DEC-004 est tranchée (le sens des gestes est confirmé). Reste un trou de
  sourçage sur le sprint 08, qui demande une décision d'extension de la liste blanche.
- **Prochaine action** : étape E1 du chantier, créer la base Airtable `CORTEX` et importer le CSV.
