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
- **2026-08-28, confirmé** : l'utilisatrice a redemandé explicitement ce sens (Compris = flèche
  gauche, À revoir = flèche bas, Perdue = flèche droite). Les neuf chemins d'entrée sont vérifiés
  en navigateur réel (glissement souris, clavier, boutons, plus le retour sous le seuil et le
  glissement démarré dans le texte de la fiche). La question reste listée dans le chantier tant
  que l'étape E2 n'est pas construite, mais la décision est prise.

## DEC-005 — Sourcer les 192 notions sans jamais fabriquer d'URL de vidéo

- **Date** : 2026-08-28
- **Contexte** : chaque notion doit pointer vers des ressources, dont des vidéos YouTube. Or la
  règle 8 du prompt système interdit d'inventer une URL, et aucun agent ne peut vérifier 192
  identifiants de vidéo ni garantir qu'ils survivront quatre mois.
- **Options envisagées** : (a) écrire un identifiant de vidéo par notion ; (b) ne donner que les
  racines de chaînes ; (c) une recherche YouTube limitée à une chaîne de la liste blanche, plus
  les playlists canoniques vérifiées.
- **Choix** : (c). `scripts/build-sources.mjs` produit `data/sources.json` : par notion, une
  recherche `youtube.com/@chaine/search?query=<notion>` sur la chaîne FR et sur la chaîne EN du
  sprint ; par sprint, les playlists canoniques et les docs.
- **Raisonnement** : (a) est une fabrication déguisée, exactement ce que la règle 8 proscrit, et
  se périme. (b) ne traite pas la notion. (c) donne une URL qui ne peut pas pointer vers une vidéo
  supprimée, tout en ciblant la notion exacte. Les 5 playlists profondes sont les seules URL
  précises : chacune est vérifiée par le **titre réel** de sa page, pas par son code HTTP (YouTube
  répond 200 même sur une playlist inexistante, contrôle fait avec un faux identifiant).
- **Conséquences** : la requête EN est dérivée du titre français par un glossaire explicite dans
  le script, auditable et corrigeable ; zéro mot français ne subsiste dans les 144 requêtes
  anglaises. Le script échoue si un hôte sort de la liste blanche. **Trou identifié** : aucune
  chaîne de la liste blanche ne couvre le sprint 08 (MLOps, architecture, systèmes distribués),
  donc ses 24 notions n'ont pas de source vidéo. L'interface l'écrit au lieu de proposer un lien
  hors sujet. Ajouter une source relève de la règle d'extension de `prompt.md` (consommer une
  ressource en entier d'abord), donc de l'utilisatrice, pas de l'agent.

## DEC-006 — Le suivi de construction vit dans le Cockpit, pas dans le produit

- **Date** : 2026-08-28
- **Contexte** : il fallait un endroit pour suivre la construction (Airtable, Discord, n8n, agents).
- **Choix** : un onglet « Chantier » dans le Cerveau Manager du Cockpit, alimenté par
  `data/chantier.json`. Pas dans le dashboard produit.
- **Raisonnement** : `integration.md` le dit déjà : VibeFlow détient « l'ordre de construction et
  l'avancement des 7 étapes », le produit ne détient que la révision. Mettre le suivi de chantier
  dans le produit aurait mélangé les deux surfaces.
- **Conséquences** : l'état d'une étape n'est jamais saisi, il se **déduit** des cases cochées et
  du graphe de dépendances (`annoterChantier`, testée) : une étape dont une dépendance n'est pas
  finie est « Bloquée », jamais « Prête ». Cocher se fait dans `chantier.json` puis régénération,
  volontairement : ajouter un quatrième serveur local pour cocher depuis le navigateur aurait
  coûté plus que le besoin réel.
