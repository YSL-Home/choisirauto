// Paramètres par défaut du calculateur de coût réel — voir CAHIER_DES_CHARGES_V2.md §7.1
// Modifiables directement ici (pas de base de données en V1).

export const PARAMS = {
  prixCarburant: { essence: 13.5, diesel: 11.8 }, // DH/L
  tauxAssuranceAnnuel: 0.045, // % de la valeur du véhicule, tous risques moyen
  entretienMensuelParSegment: {
    citadine: 250,
    berline: 320,
    SUV: 400,
    "SUV familial": 550,
  } as Record<string, number>,
  pneus: { prixTrain: 3200, dureeVieKm: 40000 },
  vignetteAnnuelleParCV: (cv: number) => {
    if (cv <= 6) return 700;
    if (cv <= 8) return 1500;
    if (cv <= 10) return 3000;
    return 5000;
  },
  decoteAnPourcent: { citadine: 0.13, berline: 0.14, SUV: 0.12, "SUV familial": 0.13 } as Record<string, number>,
  tauxCreditAnnuel: 0.065,
};

export type CoutReelInput = {
  prixDH: number;
  segment: string;
  motorisation: "essence" | "diesel" | "hybride" | "electrique";
  consommationL100: number;
  cvFiscaux: number;
  kmAnnuel: number;
  apportDH: number;
  dureeCreditMois: number; // 0 = achat comptant
};

export type CoutReelDetail = {
  credit: number;
  carburant: number;
  assurance: number;
  entretien: number;
  pneus: number;
  vignette: number;
  decote: number;
  total: number;
};

function mensualiteCredit(montant: number, tauxAnnuel: number, dureeMois: number): number {
  if (dureeMois <= 0 || montant <= 0) return 0;
  const tauxMensuel = tauxAnnuel / 12;
  if (tauxMensuel === 0) return montant / dureeMois;
  return (montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -dureeMois));
}

export function computeCoutReel(input: CoutReelInput): CoutReelDetail {
  const { prixDH, segment, motorisation, consommationL100, kmAnnuel, apportDH, dureeCreditMois } = input;

  const montantFinance = Math.max(prixDH - apportDH, 0);
  const credit =
    dureeCreditMois > 0
      ? mensualiteCredit(montantFinance, PARAMS.tauxCreditAnnuel, dureeCreditMois)
      : prixDH / 60; // amortissement conventionnel sur 60 mois si achat comptant, pour comparaison

  const prixCarburantL =
    motorisation === "diesel" ? PARAMS.prixCarburant.diesel : PARAMS.prixCarburant.essence;
  const carburant = motorisation === "electrique" ? (kmAnnuel / 12) * 0.9 : (kmAnnuel / 12 / 100) * consommationL100 * prixCarburantL;

  const assurance = (prixDH * PARAMS.tauxAssuranceAnnuel) / 12;

  const entretienBase = PARAMS.entretienMensuelParSegment[segment] ?? 350;
  const entretien = motorisation === "hybride" || motorisation === "electrique" ? entretienBase * 0.85 : entretienBase;

  const pneus = (PARAMS.pneus.prixTrain / PARAMS.pneus.dureeVieKm) * (kmAnnuel / 12);

  const vignette = PARAMS.vignetteAnnuelleParCV(input.cvFiscaux) / 12;

  const decotePct = PARAMS.decoteAnPourcent[segment] ?? 0.13;
  const decote = (prixDH * decotePct) / 12;

  const total = credit + carburant + assurance + entretien + pneus + vignette + decote;

  return { credit, carburant, assurance, entretien, pneus, vignette, decote, total };
}
