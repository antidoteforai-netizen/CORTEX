# CORTEX

**Un programme pour apprendre l'IA au niveau ingénieur, conçu comme un produit.**

Maîtriser l'IA, ce n'est pas maîtriser Claude Code ou n8n. Le fond (algèbre, probabilités, optimisation, data engineering, deep learning, MLOps, RAG) s'apprend avec méthode. CORTEX est le produit que je conçois pour moi-même, Product Designer, afin de suivre ce programme jusqu'au bout : 192 notions, 8 sprints de 2 semaines, 2 notions par jour.

[Voir la maquette cliquable](https://antidoteforai-netizen.github.io/CORTEX/prototypes/dashboard-cortex.html)

## Le principe

Chaque jour, deux notions arrivent sur Discord. Pour chacune, je donne un verdict en un clic : **Compris**, **À revoir** ou **Perdue**. La répétition espacée ramène ensuite les notions fragiles au bon moment. Un tableau de bord web sert à réviser (une pile de cartes qu'on fait glisser), à suivre l'avancement et à régler le prompt qui rédige les fiches.

| Brique | Rôle |
|---|---|
| Airtable | Source de vérité unique : statuts, fiches, réglages |
| Discord | Réception des notions et verdict en un clic |
| n8n | Quatre envois programmés (matin, soir, révision hebdomadaire, projet de sprint) |
| API Anthropic | Met en forme une notion déjà choisie, sans jamais décider de la suivante |
| Tableau de bord web | Révision, planning, édition du prompt |

## Les décisions de design

Chaque choix structurant est tracé avec les options écartées et la raison, dans [`.claude/memory/DECISIONS.md`](./.claude/memory/DECISIONS.md). Trois exemples :

- **La progression est la trame des 192 notions** (DEC-003). Une barre remplie à 18 % est vraie mais muette. Une réglette de 192 traits, et la même trame en planche de 8 × 24, montre en plus *quelles* notions sont perdues et dans quel sprint elles se concentrent. Les couleurs vert, ambre et rouge sont réservées aux verdicts, sinon la trame devient illisible.
- **Aucune URL de vidéo inventée** (DEC-005). Plutôt qu'un lien par notion impossible à vérifier, chaque notion pointe vers une recherche ciblée sur une chaîne de confiance, et les playlists citées sont vérifiées par le titre réel de leur page. Quand aucune source ne couvre un sprint, l'interface l'écrit au lieu de proposer un lien hors sujet.
- **Le sens des gestes suit la spécification, écart signalé** (DEC-004). Les piles de cartes associent d'habitude « droite » au positif. La spécification fait l'inverse : je l'ai signalé avant de construire, puis confirmé avec l'utilisatrice et vérifié sur neuf chemins d'entrée (souris, clavier, boutons).

## Où en est le projet

En conception. La spécification complète est écrite, les 192 notions sont prêtes à importer et la maquette cliquable est vérifiée en navigateur réel. La construction suit un ordre imposé : chaque étape doit servir en vrai avant d'attaquer la suivante.

Le risque numéro un est tracé noir sur blanc : construire l'outil au lieu de suivre le programme. Le tableau de bord doit donc être utilisable dès la troisième étape, tout le reste relève du confort.

## Dans ce dépôt

| Chemin | Contenu |
|---|---|
| [`docs/00_context/`](./docs/00_context/) | La spécification : contexte, données, écrans, automatisation, intégration, notions, prompt |
| [`data/curriculum-192-notions.csv`](./data/curriculum-192-notions.csv) | Les 192 notions, prêtes à importer dans Airtable |
| [`data/sources.json`](./data/sources.json) | Les sources par notion, générées par `scripts/build-sources.mjs` |
| [`prototypes/dashboard-cortex.html`](./prototypes/dashboard-cortex.html) | La maquette cliquable |
| [`.claude/memory/`](./.claude/memory/) | Journal, décisions, blocages |

```bash
node scripts/build-sprints.mjs   # régénère data/sprints.json depuis docs/00_context/notions.md
node scripts/build-sources.mjs   # régénère data/sources.json
```

---

*Par Opaline Mustière, Product Designer · [LinkedIn](https://www.linkedin.com/in/opalinemustiere/) · [Toolbox](https://github.com/antidoteforai-netizen/Toolbox)*
