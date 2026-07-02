import type { Metadata } from "next";
import { guides } from "@/lib/guides";
import GuideCard from "@/app/components/GuideCard";

export const metadata: Metadata = {
  title: "Guides — Acheter ou éviter ?",
  description: "Des avis clairs et courts sur des modèles, des budgets et des situations d'achat au Maroc.",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-sm font-semibold text-accent">Guides</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Acheter ou éviter ?</h1>
      <p className="mt-3 max-w-2xl text-ink/60">
        Chaque guide donne un avis clair : sur un modèle, un budget, un contrat ou une situation d'achat.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <GuideCard key={g.slug} guide={g} />
        ))}
      </div>
    </div>
  );
}
