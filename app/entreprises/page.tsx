import Link from "next/link";
import type { Metadata } from "next";
import LeadForm from "@/app/components/LeadForm";
import { CoinIcon, ScoreIcon, VerdictIcon } from "@/app/components/icons";
import CarIllustration from "@/app/components/CarIllustration";

export const metadata: Metadata = {
  title: "Entreprises — Choisir, financer et gérer votre flotte",
  description: "Simulateur coût flotte, comparateur achat vs crédit vs LLD et audit flotte pour les entreprises au Maroc.",
};

const OUTILS = [
  {
    href: "/entreprises/simulateur-flotte",
    titre: "Simulateur coût flotte",
    desc: "Estimez le coût mensuel et annuel de votre flotte, coût par véhicule et coût par km.",
    Icon: CoinIcon,
  },
  {
    href: "/entreprises/achat-credit-lld",
    titre: "Achat vs crédit vs LLD",
    desc: "Une recommandation neutre selon votre trésorerie, votre usage et votre durée de détention.",
    Icon: ScoreIcon,
  },
  {
    href: "/entreprises/audit-flotte",
    titre: "Audit flotte",
    desc: "Un diagnostic gratuit pour identifier où vous perdez de l'argent : carburant, entretien, immobilisation.",
    Icon: VerdictIcon,
  },
];

export default function EntreprisesPage() {
  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-warn/10 via-paper to-accent/10" />
        <div className="relative mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-accent">Entreprises</p>
              <h1 className="mt-2 max-w-2xl text-3xl font-extrabold text-ink md:text-4xl">
                Aider à choisir le bon véhicule, le bon contrat et le bon coût de flotte.
              </h1>
              <p className="mt-4 max-w-2xl text-ink/60">
                Nous ne présentons pas la LLD comme toujours meilleure : nous comparons avec l'achat et le crédit selon votre contexte.
              </p>
            </div>
            <div className="w-40 shrink-0 md:w-48">
              <CarIllustration segment="SUV familial" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-14">
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {OUTILS.map((o) => (
            <Link key={o.href} href={o.href} className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                <o.Icon className="h-6 w-6" />
              </div>
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
    </div>
  );
}
