# Contexte

## Le projet

**CORTEX** est une application web personnelle mono-utilisateur. Elle sert à
suivre un programme d'apprentissage de l'IA : 192 notions, 8 sprints de 2 semaines,
16 semaines au total.

Deux notions sont envoyées chaque jour sur Discord. Le dashboard est la seconde
surface du même système : il montre l'avancement, permet de réviser, et laisse
modifier le prompt qui génère les fiches.

## L'utilisatrice

Une seule personne. Product designer, 10 ans de métier, code (HTML/CSS/JS, Python en
apprentissage), construit des systèmes automatisés depuis 2 ans. Pas de formation
mathématique supérieure récente. Apprend l'IA au niveau ingénieur, pas au niveau
vulgarisation.

Conséquences pour le produit :
- Pas de compte, pas d'authentification multi-utilisateur, pas d'onboarding.
- Usage mobile fréquent (Android, Pixel). Le mobile n'est pas un mode dégradé.
- Le contenu est technique. L'interface ne doit pas l'être.

## Le programme

| | |
|---|---|
| Notions | 192 |
| Sprints | 8, de 2 semaines |
| Cadence | 2 notions par jour, lundi au samedi |
| Dimanche | révision uniquement, aucune notion nouvelle |
| Projet | 1 par sprint, brief le samedi d'ouverture, rendu le samedi de clôture |
| Durée visée | 45 min par jour, 3 h par projet |

## Les trois verdicts

Toute notion reçue est jugée par un des trois verdicts, depuis Discord ou depuis le
dashboard, indifféremment.

| Verdict | Sens | Retour |
|---|---|---|
| ✅ Compris | acquis pour l'instant | J+1, puis J+7, puis J+30 |
| 🔁 À revoir | compris à moitié | J+2 |
| ❌ Perdue | pas compris | J+3, en tête de file, avec une explication reformulée |

Une notion sort du cycle après 3 passages réussis.

## Principes non négociables

1. **Le backlog des 192 notions est figé.** Il est saisi une fois dans Airtable.
   Le LLM met en forme une notion déjà choisie, il ne décide jamais de la suivante.
2. **Une seule fonction applique les verdicts.** `applyVerdict(recordId, verdict,
   source)` est appelée par le dashboard et par la route Discord. Aucune règle de
   statut dupliquée.
3. **Aucun lien inventé.** Toute URL générée est testée en HTTP HEAD avant envoi.
   Statut différent de 200, le lien est retiré du message.
4. **Le total est toujours 192.** Comprises + À revoir + Perdues + À venir = 192.
   C'est le test d'intégrité le plus simple et il doit toujours passer.
5. **Pas de secret côté client.** Clés Airtable et Discord en variables
   d'environnement serveur uniquement.

## Ce que le projet n'est pas

- Pas une plateforme de cours. Aucun contenu n'est hébergé, seulement des liens.
- Pas multi-utilisateur. Pas de rôles, pas de partage.
- Pas un générateur de programme. Le programme existe, il est fixe.

## Risque projet identifié

Le risque principal n'est pas technique : c'est de construire l'outil au lieu de
suivre le programme. Le dashboard doit être utilisable après l'étape 3 de l'ordre de
construction. Tout ce qui vient après est du confort.
