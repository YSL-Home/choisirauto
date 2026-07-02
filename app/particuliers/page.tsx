import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Particuliers — Acheter la bonne voiture",
  description: "Assistant de choix, calculateur de coût réel et guides pour acheter une voiture au Maroc sans se tromper.",
};

const OUTILS = [
  {
    href: "/particuliers/assistant",
    titre: "Assistant choix voiture",
    desc: "Répondez à quelques questions, recevez 3 recommandations personnalisées avec leur score.",
    cta: "Trouver ma voiture",
  },
  {
    href: "/particuliers/cout-reel",
    titre: "Calculateur coût réel",
    desc: "Le vrai coût mensuel d'une voiture : crédit, carburant, assurance, entretien, pneus, vignette, décote.",
    cta: "Calculer le coût réel",
  },
  {
    href: "/guides",
    titre: "Guides « Acheter ou éviter ? »",
    desc: "Des avis clairs et courts sur des modèles, des budgets et des situations d'achat.",
    cta: "Lire les guides",
  },
];

export default function ParticuliersPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-sm font-semibold text-accent">Particuliers</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-extrabold text-ink md:text-4xl">
        Aider à acheter la bonne voiture, au bon prix, sans se tromper.
      </h1>
      <p className="mt-4 max-w-2xl text-ink/60">
        Trois outils simples pour avancer dans votre décision en quelques minutes.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {OUTILS.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition hover:border-accent hover:shadow-md"
          >
            <div className="text-lg font-bold text-ink">{o.titre}</div>
            <p className="mt-2 flex-1 text-sm text-ink/60">{o.desc}</p>
            <div className="mt-4 text-sm font-semibold text-accent">{o.cta} →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
