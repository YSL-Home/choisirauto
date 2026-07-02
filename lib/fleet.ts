// Simulateur coût flotte + comparateur Achat / Crédit / LLD — voir CAHIER_DES_CHARGES_V2.md §4.2

export type FleetInput = {
  nombreVehicules: number;
  prixMoyenDH: number;
  kmAnnuelParVehicule: number;
  dureeDetentionMois: number;
  segment: string;
};

export type FleetResult = {
  coutMensuelParVehicule: number;
  coutMensuelTotal: number;
  coutParKm: number;
};

const ENTRETIEN_SEGMENT: Record<string, number> = {
  citadine: 250,
  berline: 320,
  SUV: 400,
  "SUV familial": 550,
  utilitaire: 450,
};

export function computeFleetCost(input: FleetInput): FleetResult {
  const { nombreVehicules, prixMoyenDH, kmAnnuelParVehicule, dureeDetentionMois, segment } = input;

  const amortissementMensuel = prixMoyenDH / Math.max(dureeDetentionMois, 1);
  const carburantMensuel = (kmAnnuelParVehicule / 12 / 100) * 7 * 13.5; // conso moyenne flotte ~7L/100
  const entretienMensuel = ENTRETIEN_SEGMENT[segment] ?? 350;
  const assuranceMensuelle = (prixMoyenDH * 0.045) / 12;
  const pneusMensuel = (3200 / 40000) * (kmAnnuelParVehicule / 12);

  const coutMensuelParVehicule =
    amortissementMensuel + carburantMensuel + entretienMensuel + assuranceMensuelle + pneusMensuel;

  const coutMensuelTotal = coutMensuelParVehicule * nombreVehicules;
  const coutParKm = coutMensuelParVehicule / (kmAnnuelParVehicule / 12);

  return { coutMensuelParVehicule, coutMensuelTotal, coutParKm };
}

export type FinancementMode = "achat" | "credit" | "lld";

export type ComparatifInput = {
  prixDH: number;
  dureeMois: number;
  kmAnnuel: number;
  tresorerieDisponible: "faible" | "moyenne" | "confortable";
};

export type ComparatifResult = {
  achat: number;
  credit: number;
  lld: number;
  recommandation: FinancementMode;
  argumentaire: string;
};

export function computeComparatif(input: ComparatifInput): ComparatifResult {
  const { prixDH, dureeMois, kmAnnuel, tresorerieDisponible } = input;

  // Coût total mensualisé sur la durée de détention (hors trésorerie immobilisée)
  const decoteTotale = prixDH * 0.5 * (dureeMois / 60); // décote approx. linéaire 50% sur 5 ans
  const achat = (prixDH * 0.03 * (dureeMois / 12) + decoteTotale) / dureeMois; // entretien 3%/an + décote lissée

  const tauxCredit = 0.065;
  const mensualiteCredit =
    (prixDH * (tauxCredit / 12)) / (1 - Math.pow(1 + tauxCredit / 12, -dureeMois));
  const credit = mensualiteCredit + prixDH * 0.03 / 12; // + entretien

  // LLD estimée : mensualité intégrant services (entretien, assurance, assistance)
  const lld = (prixDH * 0.022) + (kmAnnuel > 20000 ? (kmAnnuel - 20000) * 0.002 : 0);

  let recommandation: FinancementMode = "achat";
  let argumentaire = "";

  if (tresorerieDisponible === "faible") {
    recommandation = lld <= credit ? "lld" : "credit";
    argumentaire =
      "Trésorerie limitée : privilégier la LLD ou le crédit pour ne pas immobiliser de capital, même si le coût total est légèrement supérieur à l'achat comptant.";
  } else if (dureeMois >= 60) {
    recommandation = "achat";
    argumentaire =
      "Détention longue (5 ans ou plus) : l'achat devient la solution la plus économique sur la durée totale, la décote étant lissée sur davantage de mois.";
  } else if (tresorerieDisponible === "confortable" && lld > achat && lld > credit) {
    recommandation = "credit";
    argumentaire =
      "Trésorerie confortable et durée courte à moyenne : le crédit offre un bon compromis entre coût maîtrisé et flexibilité, sans les frais de restitution de la LLD.";
  } else {
    recommandation = "lld";
    argumentaire =
      "Durée de détention courte à moyenne avec besoin de renouvellement régulier et de services inclus (entretien, assurance) : la LLD simplifie la gestion, à condition de bien calibrer le kilométrage contractuel.";
  }

  return { achat, credit, lld, recommandation, argumentaire };
}
