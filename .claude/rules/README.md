# Rules du projet

Règles **scopées par chemin**, chargées uniquement quand un fichier du chemin concerné est
touché — contrairement à `CLAUDE.md` qui est toujours en contexte. À utiliser pour des règles
denses/spécifiques (style de code d'un dossier, contraintes d'édition d'un format de fichier)
qui alourdiraient `CLAUDE.md` si elles y étaient dupliquées.

## Format

Un fichier par règle, avec un frontmatter `paths:` :

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# Règles de l'API

- Règle 1
- Règle 2
```

## Exemple réel (autre projet VibeFlow)

Voir `typeform-contacts-sheets/.claude/rules/workflow-json.md` — règles d'édition des workflows
n8n exportés en JSON (`paths: ["workflows/**/*.json"]`).

Supprimer ce README dès qu'une vraie règle est ajoutée dans ce dossier.
