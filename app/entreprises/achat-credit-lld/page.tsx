import type { Metadata } from "next";
import FinancementComparator from "@/app/components/FinancementComparator";
import LeadForm from "@/app/components/LeadForm";

export const metadata: Metadata = {
  title: "Achat vs crédit vs LLD",
  description: "Comparez achat, crédit et LLD pour votre flotte d'entreprise au Maroc et obtenez une recommandation neutre selon votre contexte.",
};

export default function AchatCreditLldPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-sm font-semibold text-accent">Entreprises · Financement</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Achat, crédit ou LLD : quelle solution pour vous ?</h1>
      <p className="mt-3 max-w-2xl text-ink/60">
        Nous ne présentons pas la LLD comme toujours meilleure. La recommandation dépend de votre trésorerie, votre durée de détention et votre kilométrage.
      </p>

      <div className="mt-8">
        <FinancementComparator />
      </div>

      <div className="mt-14 max-w-xl">
        <LeadForm type="devis-flotte" extraFields={[{ name: "entreprise", label: "Nom de l'entreprise" }]} />
      </div>
    </div>
  );
}
