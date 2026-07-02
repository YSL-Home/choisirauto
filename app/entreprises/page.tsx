import Link from "next/link";
import type { Metadata } from "next";
import LeadForm from "@/app/components/LeadForm";

export const metadata: Metadata = {
  title: "Entreprises — Choisir, financer et gérer votre flotte",
  description: "Simulateur coût flotte, comparateur achat vs crédit vs LLD et audit flotte pour les entreprises au Maroc.",
};

const OUTILS = [
  {
    href: "/entreprises/simulateur-flotte",
    titre: "Simulateur coût flotte",
    desc: "Estimez le coût mensuel et annuel de votre flotte, coût par véhicule et coût par km.",
  },
  {
    href: "/entreprises/achat-credit-lld",
    titre: "Achat vs crédit vs LLD",
    desc: "Une recommandation neutre selon votre trésorerie, votre usage et votre durée de détention.",
  },
  {
    href: "/entreprises/audit-flotte",
    titre: "Audit flotte",
    desc: "Un diagnostic gratuit pour identifier où vous perdez de l'argent : carburant, entretien, immobilisation.",
  },
];

export default function EntreprisesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-sm font-semibold text-accent">Entreprises</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-extrabold text-ink md:text-4xl">
        Aider à choisir le bon véhicule, le bon contrat et le bon coût de flotte.
      </h1>
      <p className="mt-4 max-w-2xl text-ink/60">
        Nous ne présentons pas la LLD comme toujours meilleure : nous comparons avec l'achat et le crédit selon votre contexte.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {OUTILS.map((o) => (
          <Link key={o.href} href={o.href} className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition hover:border-accent hover:shadow-md">
            <div className="text-lg font-bold text-ink">{o.titre}</div>
            <p className="mt-2 flex-1 text-sm text-ink/60">{o.desc}</p>
            <div className="mt-4 text-sm font-semibold text-accent">Ouvrir l'outil →</div>
          </Link>
        ))}
      </div>

      <div className="mt-14 max-w-xl">
        <LeadForm
          type="devis-flotte"
          extraFields={[
            { name: "entreprise", label: "Nom de l'entreprise" },
            { name: "tailleParc", label: "Taille du parc actuel ou souhaité", placeholder: "ex. 8 véhicules" },
          ]}
        />
      </div>
    </div>
  );
}
