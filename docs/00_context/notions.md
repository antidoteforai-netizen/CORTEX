# Notions

Les 192 notions dans l'ordre d'envoi. `ordre` va de 1 à 192, croissant, sans trou.
Créneau : impair = Matin (théorie), pair = Soir (application).

Source d'import : `curriculum-192-notions.csv`.

## S01 · Algèbre linéaire & calcul différentiel

Semaines 1–2 · domaine `Maths` · notions 1 à 24

Le langage dans lequel tout le reste est écrit. Un gradient, une jacobienne et une règle de la chaîne : la backpropagation n'est rien d'autre.

1. Scalaire, vecteur, matrice, tenseur
2. Espace vectoriel, base, dimension
3. Produit scalaire et norme
4. Produit matriciel et coût de calcul
5. Transposée, inverse, pseudo-inverse
6. Déterminant et rang
7. Application linéaire et changement de base
8. Valeurs propres et vecteurs propres
9. Décomposition en valeurs singulières (SVD)
10. PCA vue comme une rotation
11. Matrices creuses et empreinte mémoire
12. Broadcasting et vectorisation NumPy
13. Limite, continuité, notation asymptotique
14. Dérivée et pente d'une courbe
15. Dérivées partielles
16. Gradient et direction de plus forte pente
17. Règle de la chaîne
18. Matrice jacobienne
19. Hessienne et courbure
20. Développement de Taylor à l'ordre 2
21. Convexité et unicité du minimum
22. Différentiation automatique, mode direct et inverse
23. Graphe de calcul
24. Backpropagation comme règle de la chaîne appliquée

**Projet de sprint : Régression linéaire from scratch**

Descente de gradient codée à la main en NumPy, sans scikit-learn. Vous tracez la surface d'erreur en 3D, vous faites varier le learning rate jusqu'à la divergence, et vous expliquez en trois phrases pourquoi elle diverge. Livrable : un notebook et une figure.

## S02 · Probabilités, statistiques & optimisation

Semaines 3–4 · domaine `Maths` · notions 25 à 48

Un modèle ne prédit pas, il estime. Sans le vocabulaire probabiliste, la fonction de coût reste une formule qu'on recopie.

25. Espace probabilisé, événement, indépendance
26. Probabilité conditionnelle
27. Théorème de Bayes
28. Variables aléatoires discrètes et continues
29. Espérance, variance, écart-type
30. Covariance et corrélation
31. Bernoulli et binomiale
32. Loi normale et théorème central limite
33. Poisson, exponentielle, uniforme
34. Vraisemblance et maximum de vraisemblance
35. Prior, posterior, estimation MAP
36. Entropie, entropie croisée, divergence KL
37. Échantillonnage et biais d'échantillonnage
38. Intervalle de confiance
39. Test d'hypothèse, p-value, erreurs I et II
40. A/B testing et puissance statistique
41. Paradoxe de Simpson et causalité
42. Fonction de coût et paysage d'erreur
43. Descente de gradient batch, stochastique, mini-batch
44. Learning rate et scheduling
45. Momentum, RMSProp, Adam, AdamW
46. Régularisation L1 et L2
47. Minimum local, point-selle, plateau
48. Optimisation sous contrainte et Lagrange

**Projet de sprint : Une vraie analyse statistique**

Prenez vos propres données de candidature (ou un jeu data.gouv.fr). Distributions, intervalles de confiance, un test d'hypothèse honnête, et une conclusion qui dit explicitement ce que les données ne permettent pas de conclure. Livrable : un rapport de deux pages.

## S03 · Data engineering & preprocessing

Semaines 5–6 · domaine `Data` · notions 49 à 72

Quatre-vingts pour cent du travail réel. C'est aussi le sprint le plus directement monnayable en entretien.

49. Cycle de vie de la donnée
50. OLTP et OLAP
51. Modélisation relationnelle et normalisation
52. SQL : jointures, agrégations, fonctions fenêtre
53. NoSQL : document, clé-valeur, colonne, graphe
54. Data warehouse, data lake, lakehouse
55. ETL et ELT
56. Orchestration et DAG (Airflow, Dagster)
57. Batch et streaming, architecture événementielle
58. Idempotence et rejouabilité d'un pipeline
59. Partitionnement et formats colonnes (Parquet)
60. Data contract et évolution de schéma
61. Qualité de données : complétude, fraîcheur, unicité
62. Data lineage et catalogage
63. RGPD, minimisation, anonymisation, pseudonymisation
64. Valeurs manquantes et stratégies d'imputation
65. Détection et traitement des valeurs aberrantes
66. Normalisation, standardisation, mise à l'échelle robuste
67. Encodage catégoriel : one-hot, ordinal, target
68. Feature engineering et variables temporelles
69. Réduction de dimension : PCA, t-SNE, UMAP
70. Déséquilibre de classes, SMOTE, pondération
71. Fuite de données (data leakage)
72. Split train / validation / test et validation croisée

**Projet de sprint : Un pipeline ETL de bout en bout**

Une API publique en entrée, du Parquet partitionné en sortie, orchestré, rejouable, avec un notebook de contrôle qualité qui échoue bruyamment si la fraîcheur dépasse 24 h. Livrable : un dépôt git avec un README qui explique les choix.

## S04 · Machine learning classique

Semaines 7–8 · domaine `ML` · notions 73 à 96

Ce que 90 % des entreprises utilisent réellement en production. Un gradient boosting bien réglé bat encore un réseau de neurones sur données tabulaires.

73. Supervisé, non supervisé, semi-supervisé
74. Compromis biais-variance
75. Sur-apprentissage et sous-apprentissage
76. Régression linéaire simple et multiple
77. Moindres carrés et solution analytique
78. Ridge, Lasso, ElasticNet
79. Régression logistique et sigmoïde
80. Frontière de décision
81. Matrice de confusion
82. Précision, rappel, F1
83. ROC, AUC, courbe précision-rappel
84. MAE, RMSE, R² et leurs pièges
85. Arbre de décision, entropie et Gini
86. Profondeur et élagage
87. Bagging et Random Forest
88. Boosting : AdaBoost, Gradient Boosting
89. XGBoost, LightGBM, CatBoost
90. SVM et notion de marge
91. Astuce du noyau (kernel trick)
92. k plus proches voisins
93. Naive Bayes
94. K-means et méthode du coude
95. Clustering hiérarchique et DBSCAN
96. Interprétabilité : importance des variables, SHAP, LIME

**Projet de sprint : Cinq modèles, un verdict**

Un problème de classification réel, cinq familles d'algorithmes comparées à la loyale (même split, même validation croisée), les métriques choisies avant de voir les résultats, et une analyse SHAP qui explique la décision du meilleur modèle. Livrable : un notebook et un tableau comparatif.

## S05 · Deep learning

Semaines 9–10 · domaine `DL` · notions 97 à 120

Les briques. CNN, RNN, autoencodeurs, GAN : toutes reposent sur les deux mêmes mécanismes vus au sprint 1.

97. Neurone formel et perceptron
98. Perceptron multicouche
99. Activations : ReLU, GELU, sigmoïde, tanh
100. Initialisation des poids : Xavier, He
101. Forward pass et backward pass
102. Fonctions de perte usuelles en DL
103. Batch norm et layer norm
104. Dropout et régularisation en DL
105. Gradients qui s'évanouissent ou explosent
106. Gradient clipping
107. Convolution : noyau, stride, padding
108. Pooling et champ réceptif
109. LeNet, ResNet, connexions résiduelles
110. Transfer learning et fine-tuning
111. Augmentation de données
112. RNN et dépendance temporelle
113. LSTM : portes d'oubli, d'entrée, de sortie
114. GRU et arbitrage coût / performance
115. Seq2seq et encodeur-décodeur
116. Autoencodeur et espace latent
117. Autoencodeur variationnel (VAE)
118. GAN : générateur, discriminateur, effondrement de mode
119. Modèles de diffusion, le principe
120. Embeddings et espaces de représentation

**Projet de sprint : Un CNN et un détecteur d'anomalie**

Fine-tuning d'un ResNet sur un jeu d'images à vous (vos captures d'interface, pourquoi pas), puis un autoencodeur qui repère les images hors distribution. Vous mesurez ce que l'augmentation de données change vraiment. Livrable : deux notebooks et une matrice de confusion commentée.

## S06 · Transformers, LLM & apprentissage par renforcement

Semaines 11–12 · domaine `LLM & RL` · notions 121 à 144

Le sprint qui transforme « j'utilise un LLM » en « je sais ce qui se passe entre le prompt et la réponse ».

121. Mécanisme d'attention
122. Self-attention : query, key, value
123. Attention multi-têtes
124. Encodage positionnel, absolu et RoPE
125. Architecture Transformer complète
126. Encoder-only, decoder-only, encoder-decoder
127. Tokenisation : BPE, SentencePiece
128. Pré-entraînement et objectif de langage
129. Lois d'échelle (scaling laws)
130. Fine-tuning supervisé (SFT)
131. LoRA, QLoRA, PEFT
132. Quantization : INT8, INT4, GGUF
133. Distillation de modèle
134. Mixture of Experts
135. Fenêtre de contexte et attention longue
136. MDP : état, action, récompense, politique
137. Fonction de valeur et équation de Bellman
138. Q-learning et Deep Q-Network
139. Policy gradient et REINFORCE
140. Actor-critic et PPO
141. Exploration et exploitation
142. RLHF et modèle de récompense
143. DPO et alternatives au RLHF
144. Alignement, red teaming, jailbreak

**Projet de sprint : Votre micro-GPT**

Suivre la série « Neural Networks: Zero to Hero » d'Andrej Karpathy jusqu'à nanoGPT, puis l'entraîner sur votre propre corpus : vos articles ANTIDOTE. Le modèle sera mauvais. Ce n'est pas le sujet. Le sujet, c'est que vous aurez écrit chaque ligne de l'attention. Livrable : un dépôt et 500 tokens générés.

## S07 · IA appliquée : RAG, mémoire, agents

Semaines 13–14 · domaine `IA appliquée` · notions 145 à 168

Là où se trouve votre valeur marchande immédiate. Et là où le mot « OS agentique » commence à vouloir dire quelque chose de vérifiable.

145. Anatomie d'une requête LLM : prompt, complétion, tokens
146. Température, top-p, top-k, sampling
147. Prompting structuré et few-shot
148. Chain of thought et raisonnement explicite
149. Sortie structurée et function calling
150. Embeddings de texte et similarité cosinus
151. Bases vectorielles : index HNSW, IVF
152. Chunking : taille, recouvrement, stratégies
153. RAG naïf : ingestion, retrieval, génération
154. Recherche hybride BM25 + vectoriel
155. Reranking et cross-encoders
156. RAG agentique et réécriture de requête
157. GraphRAG et RAG structuré
158. Évaluation d'un RAG : RAGAS, groundedness, recall
159. Hallucination : causes et atténuation
160. Mémoire court terme, long terme, épisodique
161. Compaction et résumé de contexte
162. Context engineering et budget de contexte
163. Boucle d'agent : outils, planification, arrêt
164. Multi-agents et orchestration
165. Sandboxing et exécution de code non fiable
166. Observabilité LLM : traces, spans, LLM-as-judge
167. Coût d'inférence : tokens, cache, batching, latence
168. Injection de prompt et sécurité des agents

**Projet de sprint : Un RAG que vous pouvez défendre en entretien**

Votre corpus, un retrieval hybride avec reranking, une suite d'évaluation qui donne un score de groundedness, des traces exploitables et un coût mesuré par requête. Puis un agent outillé par-dessus. Livrable : une démo et une page de métriques. C'est la pièce maîtresse du portfolio.

## S08 · MLOps, architecture & systèmes distribués

Semaines 15–16 · domaine `MLOps & Archi` · notions 169 à 192

Ce qui sépare une démo d'un produit. Le sprint le plus ingrat, celui qui fait la différence dans une scale-up B2B.

169. Cycle de vie d'un modèle en production
170. Tracking d'expériences : MLflow, W&B
171. Versionnage des données et des modèles (DVC)
172. Feature store
173. Model registry et promotion
174. CI/CD appliqué au ML
175. Tests de modèle et tests de données
176. Déploiement : batch, temps réel, edge
177. Serving : API, gRPC, vLLM, TGI
178. Monitoring : dérive de données, dérive de concept
179. Réentraînement et boucle de feedback
180. Shadow deployment, canary, rollback
181. Infrastructure GPU, coût, capacity planning
182. Docker et Kubernetes
183. Infrastructure as code
184. Monolithe et microservices
185. REST, GraphQL, webhooks
186. Files de messages et traitement asynchrone
187. Théorème CAP et niveaux de cohérence
188. Sharding, réplication, partitionnement
189. Idempotence, retry, backoff, circuit breaker
190. Stratégies de cache et invalidation
191. Observabilité système : logs, métriques, traces
192. Sécurité applicative : secrets, authn/authz, OWASP

**Projet de sprint : Mettre le RAG en production**

Reprendre le projet du sprint 7 et le rendre exploitable : conteneurisé, déployé derrière une API, avec CI, monitoring de dérive, alerte de coût et procédure de rollback. Livrable : une URL qui répond, et un dashboard qui dit combien elle coûte.

