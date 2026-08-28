#!/usr/bin/env node
// Dérive data/sources.json : une source FR et une source EN par notion, plus la ressource
// canonique du sprint. Ne jamais éditer sources.json à la main, éditer ce script.
//
// Règle absolue, héritée de la règle 8 du prompt système (docs/00_context/prompt.md) :
// AUCUNE URL INVENTÉE. Deux formes d'URL seulement sont produites ici :
//   1. une racine de chaîne / de site de la liste blanche, vérifiée en HTTP 200 ;
//   2. une recherche YouTube limitée à une chaîne de la liste blanche
//      (https://www.youtube.com/@chaine/search?query=...), qui est une URL stable par
//      construction : elle ne peut pas pointer vers une vidéo supprimée.
// Un identifiant de vidéo précis n'est jamais fabriqué. Les playlists ci-dessous sont les
// seules URL profondes, et chacune a été vérifiée par le titre réel de sa page, pas par son
// code HTTP (YouTube répond 200 même sur une playlist inexistante).
//
// Quand aucune chaîne de la liste blanche ne couvre honnêtement un domaine, la source vaut
// null et l'interface écrit « pas de ressource retenue » plutôt que de proposer un lien
// hors sujet. C'est la règle 8 appliquée telle quelle.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const CSV = join(ROOT, "data", "curriculum-192-notions.csv");
const OUT = join(ROOT, "data", "sources.json");

// --- Liste blanche (docs/00_context/prompt.md), vérifiée en HTTP 200 le 2026-08-28 ---
const CHAINES = {
  machinelearnia: { label: "Machine Learnia", handle: "MachineLearnia", langue: "fr" },
  thibaultneveu: { label: "Thibault Neveu", handle: "ThibaultNeveu", langue: "fr" },
  scienceetonnante: { label: "Science Étonnante", handle: "ScienceEtonnante", langue: "fr" },
  troisbleuunbrun: { label: "3Blue1Brown", handle: "3blue1brown", langue: "en" },
  statquest: { label: "StatQuest", handle: "statquest", langue: "en" },
};

const DOCS = {
  sklearn: { label: "scikit-learn", url: "https://scikit-learn.org" },
  openclassrooms: { label: "OpenClassrooms", url: "https://openclassrooms.com" },
  karpathy: { label: "karpathy.ai", url: "https://karpathy.ai" },
  hf: { label: "Hugging Face Learn", url: "https://huggingface.co/learn" },
  lilianweng: { label: "Lilian Weng", url: "https://lilianweng.github.io" },
  jalammar: { label: "Jay Alammar", url: "https://jalammar.github.io" },
  madewithml: { label: "Made With ML", url: "https://madewithml.com" },
  googleml: { label: "Google ML", url: "https://developers.google.com/machine-learning" },
};

// Playlists vérifiées par le titre réel de leur page (voir en-tête).
const PLAYLISTS = {
  algebre: { label: "Essence of linear algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
  calcul: { label: "Essence of calculus", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr" },
  reseaux: { label: "Neural networks", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" },
  stats: { label: "Statistics Fundamentals", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" },
  zero2hero: { label: "Neural Networks: Zero to Hero", url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ" },
};

// Par sprint : quelle chaîne interroger, et quelle ressource canonique mettre en tête.
// `en: null` = aucune chaîne de la liste blanche ne couvre honnêtement ce domaine en vidéo.
const PAR_SPRINT = {
  S01: { fr: "machinelearnia", en: "troisbleuunbrun", playlists: ["algebre", "calcul"], docs: ["sklearn"] },
  S02: { fr: "machinelearnia", en: "statquest", playlists: ["stats"], docs: ["sklearn", "googleml"] },
  S03: { fr: "machinelearnia", en: "statquest", playlists: [], docs: ["madewithml", "googleml"] },
  S04: { fr: "machinelearnia", en: "statquest", playlists: [], docs: ["sklearn", "googleml"] },
  S05: { fr: "thibaultneveu", en: "troisbleuunbrun", playlists: ["reseaux"], docs: ["karpathy"] },
  S06: { fr: "thibaultneveu", en: "troisbleuunbrun", playlists: ["zero2hero"], docs: ["jalammar", "karpathy"] },
  S07: { fr: "thibaultneveu", en: null, playlists: [], docs: ["lilianweng", "hf"] },
  S08: { fr: null, en: null, playlists: [], docs: ["madewithml", "googleml"] },
};

// --- Requête EN : glossaire des termes récurrents, appliqué du plus long au plus court. ---
const GLOSSAIRE = [
  ["décomposition en valeurs singulières", "singular value decomposition"],
  ["différentiation automatique", "automatic differentiation"],
  ["développement de taylor", "taylor series"],
  ["compromis biais-variance", "bias variance tradeoff"],
  ["théorème central limite", "central limit theorem"],
  ["maximum de vraisemblance", "maximum likelihood"],
  ["intervalle de confiance", "confidence interval"],
  ["test d'hypothèse", "hypothesis testing"],
  ["probabilité conditionnelle", "conditional probability"],
  ["théorème de bayes", "bayes theorem"],
  ["variables aléatoires", "random variables"],
  ["descente de gradient", "gradient descent"],
  ["fonction de coût", "loss function"],
  ["point-selle", "saddle point"],
  ["valeurs propres", "eigenvalues"],
  ["vecteurs propres", "eigenvectors"],
  ["produit scalaire", "dot product"],
  ["produit matriciel", "matrix multiplication"],
  ["application linéaire", "linear map"],
  ["changement de base", "change of basis"],
  ["espace vectoriel", "vector space"],
  ["matrices creuses", "sparse matrices"],
  ["empreinte mémoire", "memory footprint"],
  ["dérivées partielles", "partial derivatives"],
  ["règle de la chaîne", "chain rule"],
  ["matrice jacobienne", "jacobian matrix"],
  ["graphe de calcul", "computational graph"],
  ["entropie croisée", "cross entropy"],
  ["divergence kl", "kl divergence"],
  ["écart-type", "standard deviation"],
  ["loi normale", "normal distribution"],
  ["biais d'échantillonnage", "sampling bias"],
  ["échantillonnage", "sampling"],
  ["vraisemblance", "likelihood"],
  ["arbre de décision", "decision tree"],
  ["frontière de décision", "decision boundary"],
  ["matrice de confusion", "confusion matrix"],
  ["k plus proches voisins", "k nearest neighbors"],
  ["astuce du noyau", "kernel trick"],
  ["méthode du coude", "elbow method"],
  ["clustering hiérarchique", "hierarchical clustering"],
  ["importance des variables", "feature importance"],
  ["sur-apprentissage", "overfitting"],
  ["sous-apprentissage", "underfitting"],
  ["réduction de dimension", "dimensionality reduction"],
  ["valeurs manquantes", "missing values"],
  ["valeurs aberrantes", "outliers"],
  ["stratégies d'imputation", "imputation"],
  ["encodage catégoriel", "categorical encoding"],
  ["fuite de données", "data leakage"],
  ["validation croisée", "cross validation"],
  ["déséquilibre de classes", "class imbalance"],
  ["qualité de données", "data quality"],
  ["évolution de schéma", "schema evolution"],
  ["cycle de vie", "lifecycle"],
  ["neurone formel", "artificial neuron"],
  ["perceptron multicouche", "multilayer perceptron"],
  ["initialisation des poids", "weight initialization"],
  ["fonctions de perte", "loss functions"],
  ["gradients qui s'évanouissent ou explosent", "vanishing exploding gradients"],
  ["champ réceptif", "receptive field"],
  ["connexions résiduelles", "residual connections"],
  ["augmentation de données", "data augmentation"],
  ["dépendance temporelle", "recurrent neural network"],
  ["portes d'oubli, d'entrée, de sortie", "lstm gates"],
  ["espace latent", "latent space"],
  ["autoencodeur variationnel", "variational autoencoder"],
  ["autoencodeur", "autoencoder"],
  ["effondrement de mode", "mode collapse"],
  ["modèles de diffusion", "diffusion models"],
  ["espaces de représentation", "embedding space"],
  ["mécanisme d'attention", "attention mechanism"],
  ["attention multi-têtes", "multi head attention"],
  ["encodage positionnel", "positional encoding"],
  ["tokenisation", "tokenization"],
  ["pré-entraînement", "pretraining"],
  ["objectif de langage", "language modeling objective"],
  ["lois d'échelle", "scaling laws"],
  ["fine-tuning supervisé", "supervised fine tuning"],
  ["distillation de modèle", "model distillation"],
  ["fenêtre de contexte", "context window"],
  ["attention longue", "long context attention"],
  ["fonction de valeur", "value function"],
  ["équation de bellman", "bellman equation"],
  ["exploration et exploitation", "exploration exploitation"],
  ["modèle de récompense", "reward model"],
  ["récompense", "reward"],
  ["politique", "policy"],
  ["alignement", "alignment"],
  ["similarité cosinus", "cosine similarity"],
  ["bases vectorielles", "vector database"],
  ["recherche hybride", "hybrid search"],
  ["réécriture de requête", "query rewriting"],
  ["sortie structurée", "structured output"],
  ["raisonnement explicite", "chain of thought"],
  ["prompting structuré", "structured prompting"],
  ["mémoire court terme, long terme, épisodique", "agent memory"],
  ["résumé de contexte", "context summarization"],
  ["budget de contexte", "context budget"],
  ["boucle d'agent", "agent loop"],
  ["outils, planification, arrêt", "tool use planning"],
  ["multi-agents et orchestration", "multi agent orchestration"],
  ["exécution de code non fiable", "untrusted code execution"],
  ["coût d'inférence", "inference cost"],
  ["injection de prompt", "prompt injection"],
  ["sécurité des agents", "agent security"],
  ["tracking d'expériences", "experiment tracking"],
  ["versionnage des données et des modèles", "data model versioning"],
  ["registre de modèles", "model registry"],
  ["tests de modèle et tests de données", "model data testing"],
  ["déploiement", "deployment"],
  ["dérive de données", "data drift"],
  ["dérive de concept", "concept drift"],
  ["réentraînement", "retraining"],
  ["boucle de feedback", "feedback loop"],
  ["capacity planning", "capacity planning"],
  ["infrastructure as code", "infrastructure as code"],
  ["files de messages", "message queues"],
  ["traitement asynchrone", "asynchronous processing"],
  ["théorème cap", "cap theorem"],
  ["niveaux de cohérence", "consistency levels"],
  ["réplication", "replication"],
  ["partitionnement", "partitioning"],
  ["stratégies de cache", "caching strategies"],
  ["invalidation", "cache invalidation"],
  ["observabilité", "observability"],
  ["sécurité applicative", "application security"],
  ["direction de plus forte pente", "steepest descent"],
  ["rejouabilité", "replayability"],
  ["interprétabilité", "interpretability"],
  ["notation asymptotique", "big o notation"],
  ["continuité", "continuity"],
  ["limite", "limit"],
  ["unicité du minimum", "unique minimum"],
  ["optimisation sous contrainte", "constrained optimization"],
  ["modélisation relationnelle", "relational modeling"],
  ["jointures, agrégations, fonctions fenêtre", "joins aggregations window functions"],
  ["clé-valeur", "key value"],
  ["colonne", "column"],
  ["graphe", "graph"],
  ["architecture événementielle", "event driven architecture"],
  ["formats colonnes", "columnar formats"],
  ["catalogage", "data catalog"],
  ["complétude, fraîcheur, unicité", "completeness freshness uniqueness"],
  ["anonymisation", "anonymization"],
  ["pseudonymisation", "pseudonymization"],
  ["mise à l'échelle robuste", "robust scaling"],
  ["variables temporelles", "time features"],
  ["pondération", "class weighting"],
  ["profondeur et élagage", "tree depth pruning"],
  ["moindres carrés", "least squares"],
  ["solution analytique", "closed form solution"],
  ["notion de marge", "margin"],
  ["non supervisé", "unsupervised"],
  ["semi-supervisé", "semi supervised"],
  ["supervisé", "supervised"],
  ["leurs pièges", "pitfalls"],
  ["passe avant", "forward pass"],
  ["scalaire", "scalar"],
  ["vecteur", "vector"],
  ["matrice", "matrix"],
  ["tenseur", "tensor"],
  ["pente", "slope"],
  ["absolu", "absolute"],
  ["poids", "weights"],
  ["couche", "layer"],
  ["réseau", "network"],
  ["apprentissage", "learning"],
  ["renforcement", "reinforcement"],
  ["mémoire", "memory"],
  ["agents", "agents"],
  ["ingestion, retrieval, génération", "ingestion retrieval generation"],
  ["causes et atténuation", "causes mitigation"],
  ["état, action, récompense, politique", "state action reward policy"],
  ["red teaming", "red teaming"],
  ["secrets", "secrets"],
  ["vectorisation", "vectorization"],
  ["broadcasting", "broadcasting"],
  ["régularisation", "regularization"],
  ["normalisation", "normalization"],
  ["standardisation", "standardization"],
  ["convexité", "convexity"],
  ["courbure", "curvature"],
  ["hessienne", "hessian"],
  ["gradient", "gradient"],
  ["dérivée", "derivative"],
  ["transposée", "transpose"],
  ["déterminant", "determinant"],
  ["espérance", "expected value"],
  ["covariance", "covariance"],
  ["corrélation", "correlation"],
  ["entropie", "entropy"],
  ["hallucination", "hallucination"],
  ["quantization", "quantization"],
  ["convolution", "convolution"],
  ["activations", "activation functions"],
  ["orchestration", "orchestration"],
  ["idempotence", "idempotence"],
  ["causalité", "causality"],
  ["puissance statistique", "statistical power"],
];

const VIDES = new Set(
  ("et de des du la le les un une en a au aux sur sous dans pour par comme vue avec ses son sa qui que " +
   "d l s ou ni son leurs leur ce cette il elle est sont plus moins tres seulement " +
   "notion notions vu vues appliquee applique simple multiple usuelles").split(" ")
);

function sansAccents(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function requeteEn(titre) {
  let t = titre.toLowerCase();
  for (const [fr, en] of GLOSSAIRE) {
    if (t.includes(fr)) t = t.split(fr).join(" " + en + " ");
  }
  const mots = sansAccents(t)
    .replace(/[(),:;/'’«»"]/g, " ")
    .split(/[\s-]+/)
    .filter((m) => m && !VIDES.has(m) && m.length > 1);
  const vus = new Set();
  const uniques = mots.filter((m) => (vus.has(m) ? false : (vus.add(m), true)));
  return uniques.slice(0, 6).join(" ");
}

function rechercheChaine(cle, requete) {
  const c = CHAINES[cle];
  return {
    label: c.label,
    url: `https://www.youtube.com/@${c.handle}/search?query=${encodeURIComponent(requete)}`,
    requete,
  };
}

// --- Lecture du backlog (même parseur que partout ailleurs : les libellés contiennent des virgules) ---
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i += 1; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const rows = parseCsv(readFileSync(CSV, "utf8").replace(/^﻿/, "")).filter((r) => r.some((c) => c.trim()));
const head = rows.shift();
const iOrdre = head.indexOf("ordre"), iNotion = head.indexOf("notion"), iSprint = head.indexOf("sprint");

const notions = rows.map((r) => {
  const ordre = Number(r[iOrdre]);
  const titre = r[iNotion];
  const sprint = r[iSprint];
  const conf = PAR_SPRINT[sprint];
  if (!conf) throw new Error(`Sprint inconnu : ${sprint}`);
  return {
    ordre,
    sprint,
    fr: conf.fr ? rechercheChaine(conf.fr, titre) : null,
    en: conf.en ? rechercheChaine(conf.en, requeteEn(titre)) : null,
  };
});

const sprints = Object.entries(PAR_SPRINT).map(([id, c]) => ({
  id,
  chaineFr: c.fr ? CHAINES[c.fr].label : null,
  chaineEn: c.en ? CHAINES[c.en].label : null,
  playlists: c.playlists.map((p) => PLAYLISTS[p]),
  docs: c.docs.map((d) => DOCS[d]),
}));

// --- Contrôles ---
if (notions.length !== 192) throw new Error(`192 notions attendues, ${notions.length}`);
const HOTES_AUTORISES = new Set(["www.youtube.com", "scikit-learn.org", "openclassrooms.com", "karpathy.ai", "huggingface.co", "lilianweng.github.io", "jalammar.github.io", "madewithml.com", "developers.google.com"]);
const toutesUrls = [
  ...notions.flatMap((n) => [n.fr, n.en]).filter(Boolean).map((s) => s.url),
  ...sprints.flatMap((s) => [...s.playlists, ...s.docs]).map((r) => r.url),
];
for (const u of toutesUrls) {
  const h = new URL(u).host;
  if (!HOTES_AUTORISES.has(h)) throw new Error(`Hôte hors liste blanche : ${h} (${u})`);
}
const sansVideo = notions.filter((n) => !n.fr && !n.en).length;

writeFileSync(OUT, JSON.stringify({ notions, sprints }, null, 2) + "\n", "utf8");
console.log(`[build-sources] ${notions.length} notions, ${toutesUrls.length} URL, tous les hôtes sur liste blanche.`);
console.log(`[build-sources] ${sansVideo} notions sans aucune chaîne vidéo retenue (S08 : aucune chaîne de la liste blanche ne couvre honnêtement le MLOps).`);
