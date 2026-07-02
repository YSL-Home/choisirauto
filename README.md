# ChoisirAuto (nom provisoire)

Plateforme de décision automobile pour particuliers et professionnels au Maroc.
Voir [CAHIER_DES_CHARGES_V2.md](./CAHIER_DES_CHARGES_V2.md) pour la vision, le périmètre et la roadmap complète.

## Stack

- Next.js 14 (App Router), export statique (`output: "export"`)
- Tailwind CSS 4
- Cloudflare Pages (hébergement) + Cloudflare Pages Functions (`functions/api/lead.js`) pour les formulaires
- Déploiement automatique via GitHub Actions (`.github/workflows/deploy.yml`) + wrangler

Pas de base de données en V1 : le contenu (véhicules, guides) vit dans `content/*.json`, commité sur Git — même
logique que les autres projets (`nabdriyadah`, `musclefr`). Une V2 avec CMS/back-office est envisageable une fois
la traction confirmée (voir §0 et §12 du cahier des charges).

## Développement local

```bash
npm install
npm run dev
```

## Build statique

```bash
npm run build   # génère out/
```

## Déploiement

Le push sur `main` déclenche `.github/workflows/deploy.yml` qui build puis déploie sur Cloudflare Pages via
`wrangler pages deploy`. Secrets requis dans le repo GitHub :

| Secret | Description |
|---|---|
| `CF_API_TOKEN` | Token API Cloudflare avec droits Pages:Edit |
| `CF_ACCOUNT_ID` | Account ID Cloudflare |
| `CF_PROJECT_NAME` | Nom du projet Cloudflare Pages (défaut : `choisirauto`) |

Pour la notification des leads par email (optionnel, sinon les leads restent visibles dans les logs Cloudflare
Functions) : `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL` en variables d'environnement du projet
Cloudflare Pages (Settings → Environment variables).

## Contenu

- `content/vehicles.json` — fiches véhicules et sous-notes de Score Auto
- `content/guides.json` — articles "Acheter ou éviter ?", budget, occasion, pro, comparatifs
- `lib/cost.ts` — paramètres et formule du calculateur de coût réel
- `lib/vehicles.ts` — pondérations et formule du Score Auto
- `lib/fleet.ts` — simulateur coût flotte et comparateur achat/crédit/LLD
