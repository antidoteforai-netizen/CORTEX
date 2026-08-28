---
description: Vérifie si la session en cours justifie une mise à jour de .claude/memory/ et l'applique si oui
---

Relis les échanges de cette session (édits, décisions prises, erreurs rencontrées et leur résolution,
tests effectués) et décide, pour chacun des 4 fichiers de `.claude/memory/`, si une entrée est
justifiée — en respectant strictement les conventions déjà en place dans chaque fichier (même
format, même niveau de concision) :

- **DECISIONS.md** — une entrée seulement si un choix d'architecture/de branche/de stratégie
  structurant a été tranché (pas pour un simple fix de paramètre).
- **LEARNINGS.md** — une entrée seulement pour un pattern prouvé sur CE projet (observation +
  règle qui en découle), pas une reformulation de doc générique.
- **BLOCKERS.md** — une entrée seulement pour un piège concret rencontré (symptôme + cause +
  contournement), pas une erreur triviale déjà résolue en une correction évidente.
- **JOURNAL.md** — toujours ajouter une entrée de 3 lignes (fait / bloque / prochaine action) si
  du travail réel a eu lieu dans cette session ; ne rien ajouter si la session n'a été que de la
  discussion sans changement.

Si aucune décision/pattern/piège ne mérite une entrée dans un fichier donné, **ne rien écrire dans
ce fichier** plutôt que de forcer une entrée artificielle. Termine par un résumé court listant ce
qui a été ajouté (ou "rien à capitaliser" si c'est le cas pour tous les fichiers).
