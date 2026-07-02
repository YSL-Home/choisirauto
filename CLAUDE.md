# CLAUDE.md — ChoisirAuto

## Règle d'or

Les scores, coûts et verdicts affichés doivent rester crédibles : ne jamais gonfler artificiellement un score
pour un modèle ou un partenaire. Voir la règle de confiance dans CAHIER_DES_CHARGES_V2.md §2.

## Architecture

- Next.js 14 App Router, `output: "export"` (export statique)
- Déployé sur Cloudflare Pages via GitHub Actions (wrangler)
- Pas de base de données en V1 : contenu véhicules/guides dans `content/*.json`, commité sur Git
- Formulaires → `functions/api/lead.js` (Cloudflare Pages Function) → email via Resend (optionnel)

## Modifier le contenu

- Ajouter/éditer un véhicule → `content/vehicles.json` (respecter le schéma `Vehicle` dans `lib/vehicles.ts`)
- Ajouter/éditer un guide → `content/guides.json` (respecter le schéma `Guide` dans `lib/guides.ts`)
- Les pages `/guides/[slug]` sont générées statiquement (`generateStaticParams`) — un `npm run build` régénère
  toutes les pages à partir du JSON.

## Langue

- Répondre toujours en français à l'utilisateur.
- Contenu du site en français en V1 (voir §5.2 et §14 du cahier des charges pour l'arabe en phase 3).

## Git

- Repo GitHub : YSL-Home/choisirauto
- Ne jamais `git push --force` sans confirmation explicite.
