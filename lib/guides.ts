import guidesData from "@/content/guides.json";

export type Guide = {
  slug: string;
  type: "acheter-ou-eviter" | "budget" | "cout-reel" | "occasion" | "pro" | "comparatif";
  titre: string;
  vehicleSlug: string | null;
  verdict: "acheter" | "negocier" | "verifier" | "eviter" | null;
  chapo: string;
  contenu: string[];
};

export const guides = guidesData as Guide[];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const TYPE_LABEL: Record<Guide["type"], string> = {
  "acheter-ou-eviter": "Acheter ou éviter ?",
  budget: "Par budget",
  "cout-reel": "Coût réel",
  occasion: "Occasion",
  pro: "Professionnels",
  comparatif: "Comparatif",
};
