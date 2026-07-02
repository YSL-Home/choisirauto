import type { Metadata } from "next";
import FleetSimulator from "@/app/components/FleetSimulator";

export const metadata: Metadata = {
  title: "Simulateur coût flotte",
  description: "Estimez le coût mensuel et annuel de votre flotte d'entreprise au Maroc : coût par véhicule, coût total, coût par km.",
};

export default function SimulateurFlottePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-sm font-semibold text-accent">Entreprises · Simulateur flotte</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Combien coûte réellement votre flotte ?</h1>
      <p className="mt-3 max-w-2xl text-ink/60">
        Amortissement, carburant, entretien, assurance et pneus — estimez le coût total et le coût par kilomètre de votre parc.
      </p>

      <div className="mt-8">
        <FleetSimulator />
      </div>
    </div>
  );
}
