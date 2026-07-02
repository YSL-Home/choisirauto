# CAHIER DES CHARGES — V2 (optimisé)
## Plateforme de décision automobile — Maroc

**Version :** 2.0 — Juillet 2026
**Statut :** Prêt pour développement
**Base :** Cahier_des_charges_plateforme_auto_Maroc.docx (V1, juin 2026)

> **Phrase à retenir :** le site n'informe pas, il aide à décider.
> **Promesse :** la bonne voiture, au bon prix, avec le bon budget — pour les particuliers et les entreprises au Maroc.

---

## 0. Ce qui change par rapport à la V1

| # | Changement | Pourquoi |
|---|-----------|----------|
| 1 | Choix technique tranché : **développement sur mesure (Next.js + Payload CMS)** | WordPress/Webflow ne permettent pas les calculateurs, le scoring administrable et l'évolution vers une vraie plateforme sans dette technique. |
| 2 | MVP resserré : **l'outil "Prix juste occasion" passe en P2** | Il exige des données de marché (cotes occasion) qu'on n'a pas au lancement. Le publier sans données fiables détruit la crédibilité — l'actif n°1 du projet. |
| 3 | **Modèle de données véhicules** spécifié (section 6) | La V1 ne disait pas d'où viennent les données ni comment elles sont structurées. C'est le principal risque projet. |
| 4 | **Formule du Score Auto et du Coût réel** spécifiée avec paramètres administrables (section 7) | "À définir" n'est pas développable. Les pondérations restent modifiables dans le back-office. |
| 5 | **Conformité loi 09-08 / CNDP** ajoutée (section 11) | Collecte de leads (téléphone, budget, entreprise) = traitement de données personnelles au Maroc → déclaration CNDP obligatoire. Absent de la V1. |
| 6 | **Langues** tranchées : FR au lancement, architecture i18n prête (AR/darija en phase 3) | Non traité dans la V1 alors que c'est structurant (URLs, SEO, base de données). |
| 7 | **KPIs de succès** définis par phase (section 13) | La V1 n'avait aucun critère mesurable de réussite. |
| 8 | Notifications leads : **email + WhatsApp** dès la V1 | Au Maroc, un lead non rappelé dans l'heure est perdu. La V1 prévoyait seulement le stockage back-office. |
| 9 | Questions ouvertes de la V1 : **toutes tranchées** avec recommandation (section 14) | Objectif : commencer le développement immédiatement. |
| 10 | Livrables reformulés pour un développement itératif (plus orienté "mission agence") | Le développement se fait en interne/AI-assisted, pas en prestation forfaitaire. |

---

## 1. Vision

Créer **la plateforme de décision automobile de référence au Maroc**.

Pas un site de fiches techniques ni d'annonces : une plateforme qui répond à une seule question — *« est-ce que ce véhicule, cette offre ou ce contrat est réellement le bon choix ? »*

**Deux cibles :**
- **Particuliers** : acheter la bonne voiture, au bon prix, sans se tromper.
- **Professionnels** (dirigeants, DAF, responsables achats/parc, professions libérales) : choisir le bon véhicule, le bon contrat (achat / crédit / LLD) et maîtriser le coût de flotte.

**Signature fonctionnelle (les 5 piliers) :**

| Élément | Rôle |
|---------|------|
| **Score Auto** | Note 0–100 comparant les véhicules : prix, coût, revente, entretien, usage, risque. |
| **Prix juste** | Badge : bonne affaire · prix correct · à négocier · trop cher · suspect. |
| **Coût réel** | Coût mensuel total : crédit, carburant, assurance, entretien, pneus, vignette, décote. |
| **Verdict** | Conclusion claire : acheter · acheter mais négocier · vérifier avant achat · éviter. |
| **Espace Pro** | Simulateur coût flotte, comparateur achat/crédit/LLD, devis, audit flotte. |

**Format éditorial signature :** *« Acheter ou éviter ? »* — applicable à un modèle, une annonce, un crédit, une motorisation, une offre flotte.

---

## 2. Positionnement et différenciation

| Sites existants (Moteur.ma, Auto Hall, Avito, Wandaloo…) | Cette plateforme |
|---|---|
| Fiche technique | **Verdict** : acheter, négocier ou éviter |
| Prix catalogue | **Prix juste** + niveau de négociation conseillé |
| Comparateur d'équipements | Comparateur de **coût réel, revente, entretien, risque** |
| Actualité auto | Guides décision par budget et par usage |
| Annonces | Aide à la décision + **leads qualifiés** |
| Contenu généraliste | Double expertise **particuliers + flotte B2B** |

**Règle de confiance (non négociable) :**
- Le score, la note et le verdict **ne sont jamais vendus**.
- Les partenaires paient la visibilité ou les leads, jamais une recommandation.
- Tout contenu sponsorisé est explicitement marqué.

---

## 3. Périmètre V1 (MVP) — tranché

### Inclus (P1)

| Module | Description | Complexité |
|--------|-------------|-----------|
| Accueil global | Promesse en <10 s, deux entrées : Particuliers / Entreprises. | Faible |
| Assistant choix voiture | Questionnaire 7 étapes → 3 recommandations + score + raisons. Règles administrables. | Moyenne |
| Calculateur coût réel | Coût mensuel total, détail par poste. Paramètres administrables (prix carburant, vignette…). | Moyenne |
| Guides « Acheter ou éviter ? » | Pages éditoriales SEO avec blocs structurés : verdict, score, points forts/faibles. | Faible |
| Espace Entreprises | Pages B2B + simulateur coût flotte simple + comparateur achat/crédit/LLD. | Moyenne |
| Formulaires leads | Conseil, offre neuve, crédit, assurance, devis flotte, audit flotte. Anti-spam, notification email + WhatsApp. | Faible |
| Back-office | Contenus, véhicules, scores, leads (statuts + export CSV), paramètres. | Moyenne |
| Fiches modèles (version simple) | Marque/modèle/version, prix, motorisations, Score Auto, verdict. Alimente l'assistant et les guides. | Moyenne |

### Reporté

| Phase | Module | Condition de déclenchement |
|-------|--------|---------------------------|
| **P2** | Prix juste occasion | Disposer d'une source de données de cotes fiable (voir §6.3). |
| **P2** | Comparateur intelligent 2–3 véhicules | ≥ 60 fiches modèles renseignées. |
| **P2** | Espace partenaires (réception leads en self-service) | ≥ 3 partenaires actifs. |
| **P3** | Inspection occasion (réservation + rapport + paiement CMI) | Demande validée par formulaire de pré-intérêt en V1. |
| **P3** | Version arabe (AR) | Trafic FR validé ; architecture i18n déjà prête. |
| **P3+** | Notation professionnels, badges, stickers, app inspecteurs | Après traction. |

> **Astuce V1 :** intégrer dès le lancement un formulaire léger « Pré-réserver une inspection occasion » (sans paiement). Coût quasi nul, et il valide la demande pour la phase 3.

---

## 4. Parcours utilisateurs

### 4.1 Particulier

**Objectif : une réponse claire en moins de 5 minutes.**

```
Accueil → choix du besoin
 ├─ « Je ne sais pas quoi choisir »  → Assistant choix voiture → 3 recommandations → CTA offre/conseil
 ├─ « Combien ça coûte vraiment ? »  → Calculateur coût réel → détail mensuel → CTA crédit/assurance
 ├─ « Ce modèle est-il un bon choix ? » → Guide « Acheter ou éviter ? » → verdict → CTA comparer/offre
 └─ « Je veux une offre / un crédit » → Formulaire lead → confirmation + délai de rappel annoncé
```

**Questionnaire assistant (7 étapes) :**
1. Budget total OU mensualité souhaitée
2. Neuf, occasion ou les deux
3. Usage principal : ville / route / famille / travail / loisirs
4. Nombre de personnes transportées régulièrement
5. Kilométrage annuel estimé
6. Priorités (3 max) : économie, confort, image, fiabilité, revente, sécurité, consommation
7. Préférences : boîte auto, carburant, carrosserie (SUV, citadine, berline, utilitaire léger)

**Résultat :**
- Recommandation n°1 (meilleur compromis budget/usage) + raison + score
- Alternative économique
- Alternative confort/image
- Modèle à éviter ou à vérifier (avec raison)
- CTA : recevoir une offre · demander conseil · comparer

### 4.2 Professionnel

```
Accueil Entreprises
 ├─ Simulateur coût flotte → coût/véhicule, coût total, coût/km → CTA audit
 ├─ Achat vs crédit vs LLD → recommandation neutre argumentée → CTA devis
 ├─ Guides par métier (commerciaux, livraison, direction, services) → CTA devis
 └─ Devis flotte / Audit flotte → lead structuré → rappel sous 24 h ouvrées
```

**Champs devis flotte :** type d'entreprise et secteur · taille du parc actuel ou nombre de véhicules souhaités · types de véhicules · durée (24/36/48/60 mois) · km annuel par véhicule · services souhaités (entretien, assurance, pneus, véhicule relais, GPS, carte carburant) · ville · délai · budget mensuel · contact décideur (nom, fonction, téléphone, email).

**Positionnement B2B :** ne jamais présenter la LLD comme toujours meilleure ; comparer selon trésorerie, durée, usage, gestion. Mettre en avant l'expérience terrain : kilométrage, restitution, immobilisation, frais cachés.

---

## 5. Architecture technique — tranchée

### 5.1 Stack

| Couche | Choix | Justification |
|--------|-------|---------------|
| Framework | **Next.js 15 (App Router, TypeScript)** | SSR/SSG pour le SEO (critique), performance mobile, un seul langage front/back. |
| CMS / Back-office | **Payload CMS 3** (embarqué dans Next.js) | Back-office complet généré (contenus, véhicules, leads, rôles), champs personnalisés pour le scoring, API auto. Évite de développer un admin from scratch. |
| Base de données | **PostgreSQL** (Supabase ou Neon) | Relationnel adapté au modèle véhicules/versions/scores ; évolutif. |
| Hébergement | **Vercel** (app) + Supabase (DB) au lancement | Déploiement immédiat, CDN, coût quasi nul en V1. Migration VPS possible plus tard. |
| Emails transactionnels | Resend ou Brevo | Notification leads + confirmations. |
| WhatsApp notification | Lien wa.me en V1 → API WhatsApp Business Cloud en V2 | Rappel rapide des leads sans coût initial. |
| Analytics | **Plausible ou GA4** + événements de conversion | KPIs section 13. |
| Anti-spam | Cloudflare Turnstile + honeypot + rate-limiting | Formulaires = cœur du business. |

### 5.2 Exigences non fonctionnelles

- **Performance :** LCP < 2,5 s sur mobile 4G ; score Lighthouse ≥ 90 (mobile) sur les pages publiques.
- **Responsive :** mobile-first — le trafic marocain est majoritairement mobile.
- **SEO technique :** URLs lisibles (`/guides/dacia-duster-2026-acheter-ou-eviter`), balises title/meta uniques, sitemap.xml, données structurées (Article, FAQPage, Product/Vehicle), Open Graph pour le partage social.
- **i18n-ready :** contenu et routes structurés pour ajouter l'arabe en phase 3 (préfixe `/ar/`, hreflang) sans refonte.
- **Sécurité :** HTTPS, validation serveur de tous les formulaires, sauvegardes DB quotidiennes automatiques, accès back-office par rôles.
- **Rôles back-office :** Admin (tout) · Éditeur (contenus + véhicules) · Commercial (leads uniquement).

---

## 6. Modèle de données véhicules

### 6.1 Schéma (collections principales)

```
Marque        : nom, logo, pays, statut (active/inactive)
Modèle        : marque, nom, segment (citadine/berline/SUV/utilitaire…), génération,
                années, photos, statut commercialisation Maroc
Version       : modèle, nom, prix catalogue (DH), motorisation (essence/diesel/hybride/électrique),
                puissance fiscale (CV), consommation mixte (L/100km ou kWh),
                boîte, places, équipements clés
ScoreAuto     : version ou modèle, 6 sous-notes (0–20) : prix, coût d'usage, revente,
                fiabilité/entretien, confort/équipement, risque
                → note globale calculée (0–100), verdict, argumentaire
Guide/Article : type (acheter-ou-eviter / budget / comparatif / occasion / pro),
                modèle(s) lié(s), verdict, blocs de contenu, SEO meta
Lead          : type (conseil/offre-neuve/crédit/assurance/devis-flotte/audit/inspection),
                données formulaire, source (page + UTM), statut, notes internes, historique
Partenaire    : (phase 2) fiche, types de leads acceptés, zone, contacts
Paramètres    : prix carburants (DH/L), tarifs vignette par CV, taux crédit indicatif,
                % assurance indicatif, coût entretien par segment, courbe de décote par segment
```

### 6.2 Alimentation au lancement

- **Saisie manuelle assistée** : ~40–60 modèles prioritaires (les plus vendus au Maroc : Dacia, Renault, Hyundai, Peugeot, VW, Toyota, Kia + SUV chinois en croissance).
- Import CSV prévu dans le back-office pour accélérer la saisie.
- Chaque fiche exige au minimum : prix, motorisations, conso, CV fiscaux, sous-notes de score.

### 6.3 Dépendance critique — données occasion (pour P2)

L'outil « Prix juste occasion » nécessite des cotes de marché. Options à instruire pendant la V1 :
1. Constitution manuelle d'une grille de cotes par modèle/année/km (expertise interne) — réaliste au départ ;
2. Partenariat avec un acteur disposant de données (assureur, financeur, portail) ;
3. Veille structurée des prix affichés sur les portails d'annonces (attention aux CGU — pas de scraping sauvage).

**Décision V1 : l'outil n'est PAS publié tant que la source n'est pas fiable.**

---

## 7. Spécification des calculs (administrable, sans coder)

### 7.1 Coût réel mensuel

```
Coût mensuel = Mensualité crédit (ou amortissement si cash)
             + Carburant   : (km annuel / 12) × conso/100 × prix carburant
             + Assurance   : (valeur × taux % annuel segment) / 12
             + Entretien   : forfait mensuel par segment × coefficient âge
             + Pneus       : (prix train de pneus / durée de vie km) × km mensuel
             + Vignette    : tarif annuel par CV fiscaux / 12
             + Décote      : (valeur actuelle − valeur estimée à horizon) / mois de détention
```

Tous les paramètres (prix carburants, grille vignette, taux, forfaits entretien, courbes de décote par segment) sont **éditables dans le back-office** (collection Paramètres). Le calculateur affiche le détail par poste + mention « estimation indicative ».

### 7.2 Score Auto (0–100)

```
Score = Σ (sous-note /20 × pondération)
Sous-notes : Prix positionnement · Coût d'usage · Revente/décote ·
             Fiabilité/entretien · Confort/équipement · Risque
Pondérations par défaut : 20/20/15/20/15/10 (%) — modifiables dans le back-office.
```

L'assistant choix voiture ajuste les pondérations selon les priorités déclarées par l'utilisateur (ex. priorité « économie » → poids coût d'usage ×1,5).

**Verdicts (seuils par défaut, administrables) :**
- ≥ 75 : **Acheter**
- 60–74 : **Acheter mais négocier**
- 45–59 : **Vérifier avant achat**
- < 45 : **Éviter**

---

## 8. Back-office

| Module | Fonctions |
|--------|-----------|
| Contenus | CRUD articles/guides/pages, blocs structurés (verdict, tableau, FAQ), statut brouillon/publié, SEO meta, planification. |
| Véhicules | CRUD marques/modèles/versions, import CSV, photos. |
| Scores | Édition des sous-notes par modèle, pondérations globales, seuils de verdict. |
| Leads | Liste filtrable (type, statut, date, source), détail, notes internes, changement de statut, export CSV/Excel, notification email+WhatsApp à réception. |
| Paramètres | Carburants, vignette, taux, forfaits — sans déploiement. |
| Partenaires | Fiches en attente (activation phase 2). |
| Statistiques | Pages vues, leads par type/source, taux de conversion par outil. |

**Statuts de leads :** Nouveau → À rappeler → Contacté → Qualifié → Transmis partenaire → En cours → Converti / Perdu / Non exploitable.

---

## 9. Contenus, SEO et réseaux sociaux

**Objectif lancement : 20 contenus publiés au jour J, puis 2–3/semaine.**

| Format | Exemples |
|--------|----------|
| Acheter ou éviter ? | Dacia Duster 2026 : acheter ou éviter ? · Peugeot 3008 occasion : bon choix ou piège ? |
| Par budget | Meilleures voitures à moins de 150 000 DH · SUV familial à moins de 250 000 DH |
| Coût réel | Le vrai coût d'une voiture à 200 000 DH · Mensualité crédit vs coût réel |
| Occasion | 5 points à vérifier avant d'acheter · Repérer une voiture repeinte |
| Pro | Achat ou LLD pour PME · Choisir le bon kilométrage · Éviter les frais de restitution |
| Comparatifs | Duster vs Tucson · 208 vs Clio · Diesel vs hybride · SUV chinois : bonne idée ? |

**Canaux :** TikTok/Reels (formats courts « acheter ou éviter ») · YouTube (analyses, essais) · LinkedIn (B2B flotte/LLD) · Facebook (grand public, groupes auto).

**Ton :** simple, direct, neutre, terrain. Jamais commercial, jamais jargonneux. Chaque contenu aboutit à une décision et à un CTA outil/formulaire.

---

## 10. Monétisation

| Source | Cible | Phase |
|--------|-------|-------|
| Leads concessionnaires (offre neuve, dispo) | Particuliers | Dès traction (ph. 4) |
| Leads crédit auto | Particuliers | Ph. 4 |
| Leads assurance | Particuliers | Ph. 4 |
| Leads flotte (achat/LLD/crédit) | Pros | Ph. 4 |
| Audit flotte (gratuit → accompagnement payant) | Pros | Ph. 4–5 |
| Inspection occasion (service payant, paiement CMI) | Particuliers | Ph. 5 (P3 produit) |
| Abonnement partenaires (visibilité + leads + stats) | Pros auto | Ph. 5–6 |
| Sponsoring contenu (marqué, sans influence sur les scores) | Partenaires | Ph. 5+ |

**Lancement : leads gratuits** pour les premiers partenaires (préciser « offre de lancement, durée limitée » dès le premier contact) → bascule payante une fois le volume et la qualité démontrés.

---

## 11. Conformité et légal (ajout V2)

- **Loi 09-08 (protection des données personnelles, Maroc)** : les formulaires collectent des données personnelles → **déclaration préalable à la CNDP** requise avant mise en production des formulaires.
- Mentions obligatoires sur chaque formulaire : finalité, destinataires (partenaires), droit d'accès/rectification/opposition, case de consentement explicite pour la transmission à des partenaires.
- Pages légales : mentions légales, politique de confidentialité, CGU.
- Bannière cookies si analytics avec cookies (préférer Plausible = sans cookie, pas de bannière).
- Disclaimer sur les calculateurs : « estimation indicative, ne constitue ni une offre ni un conseil financier ».
- Dépôt de la marque (OMPIC) + domaine .ma et .com + réservation des handles sociaux — **avant** toute communication publique.

---

## 12. Roadmap

| Phase | Contenu | Durée indicative | Critère de sortie |
|-------|---------|------------------|-------------------|
| **1. Cadrage** | Nom, logo provisoire, arborescence, maquettes clés (accueil, assistant, guide, espace pro), 40–60 modèles listés, grille de scores initiale. | 2–3 sem. (parallélisable avec ph. 2) | Nom déposé, maquettes validées. |
| **2. MVP site** | Développement des modules P1 (§3), saisie véhicules, 20 contenus, déclaration CNDP. | 6–8 sem. | Site en ligne, leads reçus et notifiés, Lighthouse ≥ 90. |
| **3. Contenu & trafic** | 2–3 contenus/sem., vidéos courtes, SEO, LinkedIn B2B. | Continu | 10 000 visites/mois organiques+social. |
| **4. Partenariats & monétisation** | Concessionnaires, banques, assureurs, loueurs ; bascule leads payants. | M3–M6 | 3+ partenaires, premiers revenus. |
| **5. Services** | Prix juste occasion (P2), comparateur, inspection occasion + paiement. | M6–M12 | Inspection : 1res réservations payées. |
| **6. Plateforme** | Espace partenaires, app inspecteurs, notation pros, annuaire certifié, version AR. | M12+ | — |

---

## 13. KPIs de succès (ajout V2)

| Phase | KPI | Cible |
|-------|-----|-------|
| MVP (M1–M3) | Visites/mois | 5 000 |
| | Leads/mois (tous types) | 50 |
| | Taux de complétion assistant | ≥ 40 % |
| | Taux de conversion visite → lead | ≥ 1 % |
| Traction (M4–M6) | Visites/mois | 20 000 |
| | Leads/mois | 200, dont 20 pros |
| | Partenaires actifs | 3+ |
| Monétisation (M6–M12) | Revenu mensuel leads | Point mort hébergement + contenu |
| | Part des leads pros qualifiés | ≥ 60 % |

---

## 14. Décisions (ex-« questions à valider ») — toutes tranchées

| Sujet | Décision V2 |
|-------|-------------|
| Nom de marque | À déposer en phase 1 (OMPIC + .ma + .com + handles). **Seul point encore ouvert — bloquant pour la communication, pas pour le développement** (développer sous nom de code). |
| Niveau de départ | **Site MVP complet avec outils** (pas de simple landing) : les outils SONT la différenciation. |
| Technologie | **Sur mesure : Next.js 15 + Payload CMS + PostgreSQL** (§5). |
| Données véhicules | **Saisie manuelle** de 40–60 modèles prioritaires + import CSV. |
| Scoring | Formule et pondérations par défaut définies (§7), administrables. |
| Prix occasion | **Reporté en P2** tant que pas de source de cotes fiable. |
| Partenaires | **Démarrer neutre** ; fiches partenaires préparées en back-office ; premiers contacts pendant la phase 3. |
| Monétisation | **Leads gratuits au lancement**, bascule payante en phase 4. |
| Inspection | Formulaire de **pré-intérêt léger dès la V1**, service complet en phase 5. |
| Langues | **FR au lancement**, i18n-ready, AR en phase 3 selon traction. |
| Réseaux sociaux | Recommandation : **incarnation par un visage/voix** (l'expertise terrain est l'actif différenciant ; l'auto au Maroc est un marché de confiance). Décision marketing non bloquante pour le dev. |
| Conformité | Déclaration CNDP pendant la phase 2, avant mise en ligne des formulaires. |

---

## 15. Livrables de la V1 (reformulés pour un dev itératif)

**Fonctionnels :** site responsive en production · les 8 modules P1 (§3) · back-office avec rôles · notifications leads email+WhatsApp · export CSV · 40–60 fiches véhicules saisies · 20 contenus publiés · structure SEO complète (sitemap, meta, données structurées).

**Techniques :** repo Git avec CI (lint, build, déploiement automatique) · environnements preview + production · sauvegardes DB quotidiennes · documentation courte du back-office (modifier une page, ajouter un véhicule, traiter un lead) · monitoring erreurs (Sentry) · accès admin complets.
