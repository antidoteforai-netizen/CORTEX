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

## DEC-003 — Direction artistique de l'interface produit : la progression est la trame des 192 notions

- **Date** : 2026-08-28
- **Contexte** : la première maquette (générée depuis `prompt-dashboard-revision-192.md` dans un
  outil externe) portait six défauts : le contenu de fiche tronqué en plein milieu, une colonne
  gauche vide sur toute une hauteur d'écran, des emoji comme marqueurs de verdict (interdits par
  `ecrans.md`), la pile de cartes absente, un Planning très peu dense, et de la prose explicative
  dans une interface mono-utilisatrice.
- **Options envisagées** : (a) corriger les défauts un par un en gardant la barre de progression
  générique ; (b) chercher un principe visuel propre au sujet et en dériver les écrans.
- **Choix** : (b). La progression n'est plus une barre remplie à 18 %, c'est **la trame des 192
  notions elle-même** : une réglette de 192 traits en tête de page, et la même trame en planche
  8 x 24 sur l'écran Planning, une case par notion colorée par son verdict.
- **Raisonnement** : une barre de progression est vraie mais muette. La trame porte exactement la
  même information plus la localisation : on voit d'un coup d'œil *quelles* notions sont perdues et
  dans quel sprint elles se concentrent, ce qu'aucun pourcentage ne dira jamais. Elle donne aussi
  au produit une identité qui n'appartient qu'à lui, là où une barre appartient à tout le monde.
  Un seul système visuel, deux échelles, zéro composant décoratif.
- **Conséquences** : les couleurs de verdict (vert, ambre, rouge) deviennent structurantes et
  doivent rester strictement réservées aux verdicts, sinon la trame devient illisible. Le bleu
  d'accent ne sert qu'au tracé (règle active, filet du sprint en cours, focus) et à l'état
  « envoyée, verdict en attente ». Maquette cliquable : `prototypes/dashboard-cortex.html`.

## DEC-004 — Le sens des gestes de verdict reste celui d'`ecrans.md`, malgré la convention inverse

- **Date** : 2026-08-28
- **Contexte** : `ecrans.md` fixe Compris = glisser à gauche, Perdue = glisser à droite. La
  convention établie par les interfaces à pile de cartes est l'inverse : droite = positif.
- **Choix** : implémenter la spec telle qu'écrite dans la maquette, et signaler l'écart plutôt que
  de le corriger en silence.
- **Raisonnement** : c'est une décision d'usage personnel, pas un bug. La mémoire gestuelle
  acquise ailleurs jouera contre ce sens à chaque session, mais l'arbitrage appartient à
  l'utilisatrice, pas à l'implémentation.
- **Conséquences** : à trancher avant l'étape 2 de l'ordre de construction. Inverser plus tard
  coûte une ligne dans le gestionnaire de glissement et deux libellés, rien de plus.
