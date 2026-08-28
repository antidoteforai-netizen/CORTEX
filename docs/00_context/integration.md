# Intégrations

Trois systèmes. Un seul détient la vérité.

```
Airtable   =  source de vérité (statuts, contenus, config)
Discord    =  surface de lecture et de saisie rapide
Dashboard  =  surface de lecture et de révision
n8n        =  ce qui relie les trois
VibeFlow   =  couche de gouvernance et de suivi du projet
```

## Airtable

Rôle : source de vérité unique. Toute écriture passe par elle, quelle que soit la
surface d'origine.

- Base `CORTEX`, tables décrites dans `data.md`.
- Accès par API REST, token à portée limitée à cette base.
- Token en variable d'environnement serveur. Jamais dans le bundle client.
- Le dashboard n'écrit jamais directement depuis le navigateur : il passe par ses
  propres routes serveur.

Variables : `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`.

Limite à connaître : 5 requêtes par seconde par base. Le dashboard met en cache la
liste des notions côté serveur et ne recharge que les statuts.

## Discord

Rôle : recevoir les deux messages quotidiens et permettre le verdict en un clic.

- Un serveur privé, un salon dédié (`#cortex`).
- Une application Discord avec un bot, pour poster les messages avec des boutons.
  Un simple webhook entrant ne suffit pas : les webhooks ne gèrent pas les
  interactions.
- Trois boutons par message, `custom_id` de la forme `verdict:{ok|again|lost}:{recordId}`.
- Endpoint d'interaction déclaré dans le portail développeur Discord, pointant vers
  la route du dashboard.

Contraintes à respecter :
- Vérifier la signature Ed25519 (`X-Signature-Ed25519`, `X-Signature-Timestamp`).
  Requête non vérifiée, réponse 401. Discord teste cette vérification avant
  d'accepter l'URL.
- Répondre au ping de vérification avec `type: 1`.
- Répondre en moins de 3 secondes. Si l'écriture Airtable est lente, répondre
  d'abord en `type: 5` (différé) puis compléter.
- Après traitement, répondre en `type: 7` pour remplacer les boutons par une ligne
  `✅ Compris · enregistré à 07:42`. Le message ne doit plus être cliquable deux fois.

Variables : `DISCORD_BOT_TOKEN`, `DISCORD_PUBLIC_KEY`, `DISCORD_CHANNEL_ID`,
`DISCORD_APPLICATION_ID`.

## VibeFlow

Rôle : cockpit de gouvernance. VibeFlow ne détient aucune donnée du produit, il
détient le suivi du projet.

Ce qui y vit :
- La fiche projet `CORTEX` son état, ses décisions.
- L'ordre de construction et l'avancement des 7 étapes listées dans `README.md`.
- Les documents de ce dossier, comme référence.
- Le suivi des 8 projets de sprint, qui sont des livrables du programme, pas du
  produit.

Ce qui n'y vit pas : les statuts de notions, les fiches générées, la config du
prompt. Tout cela est dans Airtable.

Emplacement des documents dans le cockpit : 
Le projet est une sous-page, donc l'agencer comme une fonctionnalité du cockpit
Cockpit en page d'accueil (home page), en fin de sprint doit me féliciter d'avoir appris X notion et fait le sprint.

## Le point de jonction

Une seule fonction applique un verdict, quelle que soit la source.

```
applyVerdict(recordId, verdict, source)
  -> lit la notion dans Airtable
  -> calcule statut, passages, revision_le selon les règles de data.md
  -> écrit la notion
  -> écrit une ligne dans Evenements
  -> retourne le nouvel état
```

Appelée par la route Discord et par la route du dashboard. Si cette logique existe en
deux exemplaires, les deux surfaces divergeront. C'est la règle la plus importante du
projet.
