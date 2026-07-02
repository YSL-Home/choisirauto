import type { Metadata } from "next";
import LeadForm from "@/app/components/LeadForm";

export const metadata: Metadata = {
  title: "Audit flotte gratuit",
  description: "Un diagnostic gratuit pour identifier où votre entreprise perd de l'argent : carburant, entretien, immobilisation, kilométrage, renouvellement.",
};

const POINTS = [
  "Carburant : consommation réelle vs théorique par véhicule",
  "Entretien : fréquence et coût des interventions",
  "Immobilisation : jours d'arrêt et impact sur l'activité",
  "Kilométrage : adéquation avec les contrats en cours",
  "Renouvellement : âge du parc et moment optimal de remplacement",
];

export default function AuditFlottePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <p className="text-sm font-semibold text-accent">Entreprises · Audit flotte</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Où votre entreprise perd-elle de l'argent sur sa flotte ?</h1>
      <p className="mt-3 max-w-2xl text-ink/60">
        Un audit flotte simple et gratuit pour repérer les postes de coûts cachés, avant d'investir dans le renouvellement ou de changer de mode de financement.
      </p>

      <ul className="mt-8 space-y-2">
        {POINTS.map((p) => (
          <li key={p} className="flex gap-3 text-sm text-ink/70">
            <span className="text-accent">✓</span>{p}
          </li>
        ))}
      </ul>

      <div className="mt-10 max-w-xl">
        <LeadForm
          type="audit-flotte"
          extraFields={[
            { name: "entreprise", label: "Nom de l'entreprise" },
            { name: "secteur", label: "Secteur d'activité" },
            { name: "tailleParc", label: "Taille du parc actuel" },
          ]}
        />
      </div>
    </div>
  );
}
