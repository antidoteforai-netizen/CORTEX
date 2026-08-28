# Prompt

## Rôle

Ce prompt est envoyé à l'API Anthropic à chaque notion, par le workflow n8n. Il
produit le contenu du champ `fiche` et du message Discord.

Il est stocké dans `Config`, clé `prompt_systeme`, et modifiable depuis l'onglet
Prompt du dashboard. La version `actif = true` est celle utilisée au prochain envoi.

## Variables injectées

| Variable | Source |
|---|---|
| `{notion}` | `Notions.notion` |
| `{sprint}` | `Notions.sprint` |
| `{domaine}` | `Notions.domaine` |
| `{creneau}` | `Notions.creneau` |
| `{liste_des_5_dernieres}` | requête « 5 dernières vues » |
| `{ordre}` | `Notions.ordre` |
| `{passages}` | `Notions.passages` |
| `{projet_sprint}` | `Sprints.projet_titre` du sprint en cours |

## Valeur d'origine

```
Tu rédiges une fiche de notion pour Opaline, product designer avec
10 ans de métier, qui code (HTML/CSS/JS, Python en apprentissage)
et construit des systèmes automatisés depuis 2 ans. Elle n'a pas
de formation mathématique supérieure récente. Elle apprend l'IA
au niveau ingénieur, pas au niveau vulgarisation.

NOTION : {notion}
SPRINT : {sprint} / {domaine}
DÉJÀ VUES : {liste_des_5_dernieres}
MOMENT : {creneau}

RÈGLES
1. Français. Vouvoiement. Pas de tiret cadratin.
2. Aucune analogie avec la cuisine, le sport ou les recettes.
   Si une analogie est nécessaire, prends-la dans le design
   d'interface, la typographie ou l'architecture de l'information.
3. Tu peux utiliser librement les notions listées dans DÉJÀ VUES.
   Toute notion non vue doit être définie en une incise ou évitée.
4. Une formule mathématique maximum, et seulement si elle éclaire.
   Toujours nommer chaque symbole.
5. Le champ PIÈGE est obligatoire et doit contenir une erreur
   réellement fréquente, pas une mise en garde générique.
6. Sections matin : EN UNE PHRASE / LE PROBLÈME QU'ELLE RÉSOUT /
   L'INTUITION / LE PIÈGE, puis 1 lien FR et 1 lien EN.
   Sections soir : RAPPEL 2 LIGNES / CE QUE ÇA DONNE EN CODE
   (10 lignes commentées) / EXERCICE (une consigne, 15 min max),
   puis 1 vidéo et 1 tuto.
7. Longueur totale : 250 mots maximum hors code.
8. Les liens viennent exclusivement de la liste blanche fournie.
   Si tu n'as pas de lien fiable pour une langue, écris
   « pas de ressource FR retenue » plutôt que d'inventer une URL.
```

## Garde-fou

La règle 8 ne doit pas être retirée. Trois liens morts et les notifications ne sont
plus ouvertes. Le workflow teste chaque URL en HTTP HEAD avant de poster : statut
différent de 200, le lien est supprimé du message.

## Format du message produit

Contrainte : tenir sur un écran de téléphone sans scroller deux fois.

```
🧠  NOTION 047 / 192   ·   SPRINT 04   ·   ML CLASSIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉGRESSION RIDGE

📐  EN UNE PHRASE
...

🎯  LE PROBLÈME QU'ELLE RÉSOUT
...

🧩  L'INTUITION
...

⚠️  LE PIÈGE
...

🔗  FR   ...
🔗  EN   ...
🎥  8 min   ...
🛠  Tuto   ...

[ ✅ Compris ]  [ 🔁 À revoir ]  [ ❌ Perdue ]
```

## Liste blanche des sources

Stockée dans `Config`, clé `liste_blanche`. Le prompt ne peut proposer que ces
domaines.

**Français** : youtube.com/@MachineLearnia, youtube.com/@ThibaultNeveu,
youtube.com/@ScienceEtonnante, scikit-learn.org, openclassrooms.com

**Anglais** : youtube.com/@3blue1brown, youtube.com/@statquest, karpathy.ai,
huggingface.co/learn, lilianweng.github.io, jalammar.github.io, madewithml.com,
developers.google.com/machine-learning

Règle d'extension : une source n'est ajoutée qu'après avoir consommé une de ses
ressources en entier.
