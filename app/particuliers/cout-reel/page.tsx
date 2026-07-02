import type { Metadata } from "next";
import CoutReelCalculator from "@/app/components/CoutReelCalculator";

export const metadata: Metadata = {
  title: "Calculateur de coût réel",
  description: "Calculez le vrai coût mensuel d'une voiture au Maroc : crédit, carburant, assurance, entretien, pneus, vignette et décote.",
};

export default function CoutReelPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-sm font-semibold text-accent">Particuliers · Coût réel</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Combien coûte vraiment cette voiture ?</h1>
      <p className="mt-3 max-w-2xl text-ink/60">
        La mensualité de crédit n'est qu'une partie du coût. Ajoutez carburant, assurance, entretien, pneus, vignette et décote pour connaître le vrai coût mensuel.
      </p>

      <div className="mt-8">
        <CoutReelCalculator />
      </div>
    </div>
  );
}
