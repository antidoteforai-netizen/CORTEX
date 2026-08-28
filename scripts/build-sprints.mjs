#!/usr/bin/env node
// Dérive data/sprints.json depuis docs/00_context/notions.md (source rédigée à la main).
// notions.md fait autorité sur les intitulés ; sprints.json n'est qu'une projection lisible
// par machine, consommée par le Cockpit VibeFlow. Ne jamais éditer sprints.json à la main.
//
// Format réel sondé dans notions.md (2026-08-28) :
//   ## S01 · Algèbre linéaire & calcul différentiel
//   (ligne vide)
//   Semaines 1–2 · domaine `Maths` · notions 1 à 24
//   (ligne vide)
//   <accroche, un paragraphe>
//   ...liste numérotée...
//   **Projet de sprint : Régression linéaire from scratch**
//   (ligne vide)
//   <brief, un paragraphe>

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "docs", "00_context", "notions.md");
const OUT = join(ROOT, "data", "sprints.json");

const text = readFileSync(SRC, "utf8");
const blocks = text.split(/\n(?=## S\d\d )/).filter((b) => /^## S\d\d /.test(b));

const sprints = blocks.map((block) => {
  const lines = block.split("\n");
  const titleMatch = lines[0].match(/^## (S\d\d) · (.+)$/);
  if (!titleMatch) throw new Error(`Titre de sprint illisible : ${lines[0]}`);
  const [, id, nom] = titleMatch;

  const metaLine = lines.find((l) => l.startsWith("Semaines "));
  const meta = metaLine?.match(/^Semaines (\S+) · domaine `(.+?)` · notions (\d+) à (\d+)$/);
  if (!meta) throw new Error(`Ligne "Semaines …" illisible pour ${id}`);
  const [, semaines, domaine, premiere, derniere] = meta;

  const metaIndex = lines.indexOf(metaLine);
  const accroche = lines.slice(metaIndex + 1).find((l) => l.trim() && !/^\d+\. /.test(l)) ?? "";

  const projetIndex = lines.findIndex((l) => l.startsWith("**Projet de sprint :"));
  if (projetIndex === -1) throw new Error(`Projet de sprint absent pour ${id}`);
  const projetTitre = lines[projetIndex].replace(/^\*\*Projet de sprint : /, "").replace(/\*\*$/, "");
  const projetBrief = lines.slice(projetIndex + 1).find((l) => l.trim()) ?? "";

  return {
    id,
    nom,
    semaines: `Sem. ${semaines.replace("–", "-")}`,
    domaine,
    premiere_notion: Number(premiere),
    derniere_notion: Number(derniere),
    accroche: accroche.trim(),
    projet_titre: projetTitre.trim(),
    projet_brief: projetBrief.trim(),
  };
});

if (sprints.length !== 8) throw new Error(`8 sprints attendus, ${sprints.length} trouvés`);
const total = sprints.reduce((n, s) => n + (s.derniere_notion - s.premiere_notion + 1), 0);
if (total !== 192) throw new Error(`192 notions attendues au total, ${total} couvertes`);

writeFileSync(OUT, JSON.stringify(sprints, null, 2) + "\n", "utf8");
console.log(`[build-sprints] ${sprints.length} sprints, ${total} notions -> ${OUT}`);
