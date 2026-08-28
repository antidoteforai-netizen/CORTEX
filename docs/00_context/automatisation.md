# Automatisation

Quatre workflows n8n. Aucun ne décide du contenu : ils appliquent un backlog figé.

## Vue d'ensemble

| Workflow | Déclencheur | Rôle |
|---|---|---|
| `envoi-matin` | cron, 07:30, lun-sam | Notion théorique |
| `envoi-soir` | cron, 19:30, lun-sam | Notion applicative |
| `revision-hebdo` | cron, dim 10:00 | Quiz sur les notions échues |
| `projet-sprint` | cron, sam 09:00 | Brief ou rappel de rendu, une semaine sur deux |

Les heures sont stockées dans `Config` (`heure_matin`, `heure_soir`) pour être
modifiables sans toucher aux workflows.

## `envoi-matin` et `envoi-soir`

Même workflow, deux paramètres (`creneau = Matin` ou `Soir`).

```
1. Cron
2. Airtable  : lire Config, ligne prompt_systeme active
3. Airtable  : lire Config, ligne liste_blanche active
4. Airtable  : prochaine notion   statut = "À venir", tri ordre, limite 1
5. Airtable  : 5 dernières vues   pour la variable {liste_des_5_dernieres}
6. Function  : interpolation des variables dans le prompt
7. HTTP      : API Anthropic, messages
8. Function  : extraction des URL de la réponse
9. HTTP      : HEAD sur chaque URL
10. Function : suppression des liens dont le statut n'est pas 200
11. HTTP     : POST message Discord avec les 3 boutons
12. Airtable : notion -> statut "Envoyée", envoyee_le = aujourd'hui, fiche = réponse
13. En cas d'erreur : message Discord "envoi raté, notion {ordre} non consommée",
    aucune écriture sur la notion
```

Point critique de l'étape 12 : la notion ne change de statut qu'après le POST Discord
réussi. Sinon un échec réseau consomme silencieusement une notion.

## Comment la modification du prompt agit

Le prompt n'est jamais en dur dans le workflow. L'étape 2 le relit à chaque exécution.

```
Dashboard, onglet Prompt
  -> Enregistrer
  -> nouvelle ligne dans Config (cle = prompt_systeme, version + 1, actif = true)
  -> ancienne ligne passe à actif = false
  -> le prochain envoi lit la nouvelle version
```

Aucun redémarrage, aucune republication. Le changement prend effet au prochain cron.
Le dashboard affiche la version active pour que l'écart entre ce qu'on a écrit et ce
qui part soit toujours visible.

Un enregistrement ne modifie jamais les fiches déjà générées.

## `revision-hebdo`

```
1. Cron dimanche 10:00
2. Airtable : notions avec revision_le <= aujourd'hui et passages < 3
3. Si liste vide : message "rien à réviser cette semaine", fin
4. Function  : construction d'un quiz de 6 questions à partir des champs fiche
5. HTTP      : API Anthropic, génération des questions
6. HTTP      : POST Discord, un message par question, avec les 3 boutons
7. Les verdicts repassent par la route d'interaction habituelle
```

Aucune notion nouvelle n'est introduite le dimanche.

## `projet-sprint`

```
1. Cron samedi 09:00
2. Airtable : sprint avec en_cours = true
3. Function : semaine paire ou impaire depuis la date de démarrage
4a. Semaine d'ouverture -> POST Discord : brief du projet, checklist, deadline
4b. Semaine de clôture  -> POST Discord : rappel de rendu, checklist restante,
    et rappel du projet précédent s'il n'est pas complet
5. Airtable : si clôture, basculer en_cours sur le sprint suivant
```

Règle du protocole à respecter : un projet non rendu décale le sprint suivant. Le
workflow ne bascule `en_cours` que si la checklist est complète, sinon il republie le
rappel la semaine suivante.

## Route d'interaction Discord

Hébergée avec le dashboard, pas dans n8n. n8n envoie, le dashboard reçoit.

```
POST /api/discord/interactions
  1. Vérifier la signature Ed25519      -> sinon 401
  2. type = 1 (ping)                    -> répondre { type: 1 }
  3. Parser custom_id                   -> verdict, recordId
  4. applyVerdict(recordId, verdict, "discord")
  5. Répondre type 7, message mis à jour, boutons remplacés
```

## Coût et surveillance

Environ 400 appels API sur 4 mois, réponses de 600 tokens. Négligeable, mais :
- Poser une alerte de budget dès le premier workflow.
- Journaliser tokens consommés et latence dans `Evenements`.
- C'est aussi un exercice du sprint 7 du programme.

## Ordre de mise en place

1. `envoi-matin` seul, sans boutons, pour valider le format des fiches.
2. Ajouter la vérification des liens.
3. Ajouter les boutons et la route d'interaction.
4. Dupliquer en `envoi-soir`.
5. `revision-hebdo`, puis `projet-sprint`.

Le programme tourne en manuel pendant les deux premières semaines. Les workflows se
construisent pendant le sprint 2, pas avant.
