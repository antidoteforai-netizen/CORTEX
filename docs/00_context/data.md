# Data

Backend : Airtable. Base `CORTEX`. Quatre tables.

## Table `Notions` (192 lignes, préremplies)

| Champ | Type | Notes |
|---|---|---|
| `ordre` | number | 1 à 192. Unique. Détermine seul l'ordre d'envoi. |
| `notion` | single line text | Le libellé. Voir `notions.md`. |
| `sprint` | single select | `S01` … `S08` |
| `domaine` | single select | `Maths`, `Data`, `ML`, `DL`, `LLM & RL`, `IA appliquée`, `MLOps & Archi` |
| `creneau` | single select | `Matin` (théorie) ou `Soir` (application) |
| `statut` | single select | `À venir`, `Envoyée`, `Comprise`, `À revoir`, `Perdue` |
| `envoyee_le` | date | Écrit par le workflow au POST Discord |
| `revision_le` | date | Prochaine échéance. Vide tant que la notion n'est pas jugée. |
| `passages` | number | Révisions réussies. À 3, la notion sort du cycle. |
| `fiche` | long text | Le message généré, archivé tel quel |
| `note_perso` | long text | Seul champ saisi à la main |

### Règles d'écriture

```
verdict "ok"     -> statut = Comprise
                    passages = passages + 1
                    revision_le = aujourd'hui + [1, 7, 30][min(passages-1, 2)]
verdict "again"  -> statut = À revoir
                    revision_le = aujourd'hui + 2
                    passages inchangé
verdict "lost"   -> statut = Perdue
                    revision_le = aujourd'hui + 3
                    passages = 0
```

Une notion avec `passages >= 3` n'entre plus dans la file de révision.

### Requêtes utilisées

| Vue | Filtre |
|---|---|
| File du jour | `statut = "Envoyée"` OU `revision_le <= TODAY()`, trié par `ordre` |
| Prochaine à envoyer | `statut = "À venir"`, trié par `ordre`, limite 1 |
| Rattrapage | `statut` dans (`À revoir`, `Perdue`), trié par `revision_le` |
| 5 dernières vues | `statut != "À venir"`, trié par `envoyee_le` décroissant, limite 5 |

## Table `Sprints` (8 lignes)

| Champ | Type | Notes |
|---|---|---|
| `id` | single line text | `S01` … `S08` |
| `nom` | single line text | Intitulé du sprint |
| `semaines` | single line text | `Sem. 3-4` |
| `en_cours` | checkbox | Un seul coché à la fois |
| `projet_titre` | single line text | |
| `projet_brief` | long text | 3 lignes maximum |
| `projet_deadline` | date | |
| `projet_checklist` | long text | Une ligne par item |
| `projet_faits` | long text | Index des items cochés, séparés par des virgules |

## Table `Config` (versionnée, jamais écrasée)

| Champ | Type | Notes |
|---|---|---|
| `cle` | single line text | `prompt_systeme`, `liste_blanche`, `heure_matin`, `heure_soir` |
| `valeur` | long text | |
| `version` | number | Incrémenté à chaque enregistrement |
| `modifie_le` | date | |
| `actif` | checkbox | Une seule ligne active par `cle` |

Enregistrer une modification crée une nouvelle ligne, décoche l'ancienne, coche la
nouvelle. L'historique reste consultable.

## Table `Evenements` (journal, append only)

| Champ | Type | Notes |
|---|---|---|
| `notion` | link to `Notions` | |
| `verdict` | single select | `ok`, `again`, `lost` |
| `source` | single select | `discord`, `dashboard`, `clavier` |
| `horodatage` | dateTime | |

Sert au flux affiché sur le dashboard et au débogage. Ne sert jamais de source de
vérité : le statut courant vit dans `Notions`.

## Import initial

Le fichier `curriculum-192-notions.csv` contient les 192 lignes avec `ordre`,
`notion`, `sprint`, `domaine`, `creneau`, `statut = À venir`, `passages = 0`.
Import direct dans Airtable, aucune transformation.
