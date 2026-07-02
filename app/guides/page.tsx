import Link from "next/link";
import type { Metadata } from "next";
import { guides, TYPE_LABEL } from "@/lib/guides";

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
          <Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-xl border border-black/10 bg-white p-5 transition hover:border-accent hover:shadow-md">
            <div className="text-xs font-semibold uppercase tracking-wide text-accent">{TYPE_LABEL[g.type]}</div>
            <div className="mt-1 font-bold text-ink">{g.titre}</div>
            <p className="mt-2 text-sm text-ink/60">{g.chapo}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
