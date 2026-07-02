import type { Metadata } from "next";
import AssistantWizard from "@/app/components/AssistantWizard";
import LeadForm from "@/app/components/LeadForm";

export const metadata: Metadata = {
  title: "Assistant choix voiture",
  description: "Répondez à quelques questions et recevez 3 recommandations de voitures adaptées à votre budget et votre usage au Maroc.",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <p className="text-sm font-semibold text-accent">Particuliers · Assistant</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Quelle voiture choisir ?</h1>
      <p className="mt-3 text-ink/60">Répondez à 7 questions rapides. Nous vous recommandons 3 véhicules adaptés, avec leur score et le raisonnement.</p>

      <div className="mt-8">
        <AssistantWizard />
      </div>

      <div id="offre" className="mt-14 scroll-mt-20">
        <LeadForm type="conseil" />
      </div>
    </div>
  );
}
