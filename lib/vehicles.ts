import vehiclesData from "@/content/vehicles.json";

export type VehicleScores = {
  prix: number;
  cout: number;
  revente: number;
  fiabilite: number;
  confort: number;
  risque: number;
};

export type Vehicle = {
  slug: string;
  marque: string;
  modele: string;
  segment: string;
  prixDH: number;
  motorisation: "essence" | "diesel" | "hybride" | "electrique";
  consommationL100: number;
  cvFiscaux: number;
  boite: "manuelle" | "automatique";
  places: number;
  scores: VehicleScores;
  resume: string;
  pointsForts: string[];
  pointsFaibles: string[];
};

export const vehicles = vehiclesData as Vehicle[];

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

// Pondérations par défaut du Score Auto (modifiables ici sans redéploiement lourd)
export const DEFAULT_WEIGHTS: VehicleScores = {
  prix: 0.2,
  cout: 0.2,
  revente: 0.15,
  fiabilite: 0.2,
  confort: 0.15,
  risque: 0.1,
};

export function computeScore(scores: VehicleScores, weights: VehicleScores = DEFAULT_WEIGHTS): number {
  const raw =
    scores.prix * weights.prix +
    scores.cout * weights.cout +
    scores.revente * weights.revente +
    scores.fiabilite * weights.fiabilite +
    scores.confort * weights.confort +
    scores.risque * weights.risque;
  // sous-notes sur 20 -> ramener sur 100
  return Math.round((raw / 20) * 100);
}

export type Verdict = "acheter" | "negocier" | "verifier" | "eviter";

export function verdictFromScore(score: number): Verdict {
  if (score >= 75) return "acheter";
  if (score >= 60) return "negocier";
  if (score >= 45) return "verifier";
  return "eviter";
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  acheter: "Acheter",
  negocier: "Acheter mais négocier",
  verifier: "Vérifier avant achat",
  eviter: "Éviter",
};
