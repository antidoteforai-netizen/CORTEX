# Écrans et fonctionnalités

Trois onglets. `Révision` est l'écran par défaut.

## 1. Révision (écran principal)

Deux colonnes sur desktop. Sur mobile, la pile occupe l'écran et la colonne droite
passe dessous.

### Pile de cartes

Comportement type Tinder. Une carte par notion de la file du jour, triée par `ordre`.
Trois cartes visibles au maximum : la carte active, plus deux derrière, décalées de
10px vers le bas et réduites de 3,5 % chacune.

Contenu d'une carte :

```
[badge sprint · domaine]              NOTION 027 / 192
Théorème de Bayes

EN UNE PHRASE            <- issu du champ `fiche`
LE PROBLÈME QU'ELLE RÉSOUT
L'INTUITION
LE PIÈGE                 <- bloc distinct, fond ambré, filet vertical
```

Le contenu défile à l'intérieur de la carte si nécessaire. La page ne défile jamais
horizontalement.

### Les trois verdicts

Trois chemins équivalents vers la même action.

| Verdict | Bouton | Geste | Clavier |
|---|---|---|---|
| ✅ Compris | vert | glisser à gauche | `←` |
| 🔁 À revoir | ambre | glisser vers le bas | `↓` |
| ❌ Perdue | rouge | glisser à droite | `→` |

Pendant le glissement : un tampon apparaît en surimpression (`Compris`, `À revoir`,
`Perdue`), opacité proportionnelle à la distance. Seuils de validation : 110px
horizontal, 140px vertical.

Au relâchement au-delà du seuil, la carte s'envole dans la direction du geste,
la suivante remonte. En deçà, elle revient à sa position.

`prefers-reduced-motion` : pas d'envol, remplacement direct.

### État vide

Quand la file est traitée : nombre de notions traitées, heure de la prochaine fiche,
rappel que les notions perdues reviennent dans 3 jours.

### Colonne droite, dans cet ordre

1. **Objectif projet du sprint en cours.** L'encart le plus visible, filet d'accent à
   gauche. Titre, date de rendu, durée estimée, brief, checklist cochable, barre de
   progression. Les cases écrivent dans `Sprints.projet_faits`.
2. **Quatre tuiles de statut.** Comprises, À revoir, Perdues, À venir. Chiffre en
   gros, pastille de couleur plus libellé. Jamais la couleur seule.
3. **File de rattrapage.** Notions `À revoir` et `Perdue` avec leur date de retour en
   langage naturel (`demain`, `dans 3 j`).
4. **Flux Discord.** Les 6 derniers événements avec heure, verdict et source.

## 2. Planning

Les 8 sprints en lignes. Par ligne : identifiant, nom, semaines, barre empilée
vert / ambre / rouge sur fond neutre (comprises / à revoir / perdues sur 24), et le
compteur `12 / 24`. Le sprint en cours est surligné.

## 3. Prompt

Voir `prompt.md` pour le contenu. L'écran :

- Grand champ monospace éditable avec le prompt système actif.
- Boutons `Enregistrer` et `Rétablir le prompt d'origine`.
- Liste de variables cliquables qui s'insèrent au curseur.
- Encart de la version courante (`v3 · modifié le 12/09`).
- Encart garde-fou rappelant la règle des liens.

Enregistrer crée une nouvelle ligne dans `Config`, ne remplace jamais l'ancienne.
Le prochain message généré utilise la version active.

## Direction artistique

- Fond gris légèrement bleuté, encre bleu-nuit, un seul accent bleu de tracé.
- Les couleurs de statut (vert, ambre, rouge) sont réservées aux verdicts.
  Jamais décoratives.
- Trois familles : une grotesque à caractère pour les titres, une serif lisible pour
  le corps, une monospace pour libellés, compteurs et données.
- Modes clair et sombre définis tous les deux par tokens CSS. Aucune couleur déclarée
  uniquement dans un bloc `@media` ou `[data-theme]`.
- Chiffres alignés en `tabular-nums`.
- Interdits : dégradé violet, tout-arrondi, emoji comme marqueur de section, tiret
  cadratin dans les textes d'interface.

## Accessibilité

- Tout est atteignable au clavier. `←` `↓` `→` pour les verdicts, `Tab` pour les
  onglets, focus visible partout.
- Les barres empilées portent un `aria-label` qui donne les trois chiffres.
- Le statut n'est jamais porté par la couleur seule.

## Critères d'acceptation

- Un verdict donné sur Discord se voit sur le dashboard en moins de 30 s.
- Une notion marquée Perdue réapparaît en tête de pile 3 jours plus tard.
- Comprises + À revoir + Perdues + À venir = 192, en permanence.
- Modifier le prompt et recharger conserve la modification.
- Aucune clé d'API dans le bundle client.
