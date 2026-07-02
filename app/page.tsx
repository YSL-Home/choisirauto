import Link from "next/link";
import { guides } from "@/lib/guides";
import { ScoreIcon, PriceTagIcon, CoinIcon, VerdictIcon } from "@/app/components/icons";
import GuideCard from "@/app/components/GuideCard";
import CarIllustration from "@/app/components/CarIllustration";

export default function HomePage() {
  const derniersGuides = guides.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-paper to-good/10" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-good/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-14 text-center md:pt-20">
          <p className="mx-auto mb-4 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
            La plateforme de décision automobile au Maroc
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            La bonne voiture, au bon prix, avec le bon budget.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/60">
            Ce site ne se contente pas d'informer : il vous aide à décider. Score Auto, prix juste, coût réel et
            verdict clair — pour les particuliers comme pour les entreprises.
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl items-end justify-center gap-4 sm:gap-6">
            <div className="w-20 opacity-70 sm:w-24"><CarIllustration segment="citadine" /></div>
            <div className="w-28 sm:w-32"><CarIllustration segment="SUV" /></div>
            <div className="w-20 opacity-70 sm:w-24"><CarIllustration segment="berline" /></div>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
            <Link
              href="/particuliers"
              className="group rounded-2xl border border-black/10 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-lg"
            >
              <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-accent/10">
                <CarIllustration segment="citadine" className="h-12 w-16" />
              </div>
              <div className="mt-4 text-sm font-semibold text-accent">Particuliers</div>
              <div className="mt-1 text-xl font-bold text-ink">Je veux acheter une voiture</div>
              <p className="mt-2 text-sm text-ink/60">
                Assistant de choix, coût réel, guides "acheter ou éviter ?"
              </p>
              <div className="mt-4 text-sm font-semibold text-accent group-hover:underline">Commencer →</div>
            </Link>

            <Link
              href="/entreprises"
              className="group rounded-2xl border border-black/10 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-lg"
            >
              <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-warn/10">
                <CarIllustration segment="SUV familial" className="h-12 w-16" />
              </div>
              <div className="mt-4 text-sm font-semibold text-accent">Entreprises</div>
              <div className="mt-1 text-xl font-bold text-ink">Je gère une flotte ou des achats</div>
              <p className="mt-2 text-sm text-ink/60">
                Coût flotte, achat vs crédit vs LLD, audit et devis.
              </p>
              <div className="mt-4 text-sm font-semibold text-accent group-hover:underline">Commencer →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Signature fonctionnelle */}
      <section className="border-y border-black/5 bg-white py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-2xl font-bold text-ink">Ce qui nous différencie</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { titre: "Score Auto", desc: "Une note claire pour comparer prix, coût, revente, entretien et risque.", Icon: ScoreIcon, color: "text-accent", bg: "bg-accent/10" },
              { titre: "Prix juste", desc: "Bonne affaire, prix correct, à négocier ou trop cher : en un coup d'œil.", Icon: PriceTagIcon, color: "text-good", bg: "bg-good/10" },
              { titre: "Coût réel", desc: "Le vrai coût mensuel, crédit, carburant, assurance et entretien inclus.", Icon: CoinIcon, color: "text-warn", bg: "bg-warn/10" },
              { titre: "Verdict", desc: "Acheter, négocier, vérifier ou éviter — une conclusion, pas juste des chiffres.", Icon: VerdictIcon, color: "text-bad", bg: "bg-bad/10" },
            ].map((item) => (
              <div key={item.titre} className="rounded-xl bg-paper p-5">
                <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-full ${item.bg} ${item.color}`}>
                  <item.Icon className="h-6 w-6" />
                </div>
                <div className="font-bold text-ink">{item.titre}</div>
                <p className="mt-1 text-sm text-ink/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Derniers guides */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-ink">Derniers guides "Acheter ou éviter ?"</h2>
          <Link href="/guides" className="text-sm font-semibold text-accent hover:underline">
            Tous les guides →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {derniersGuides.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>
    </div>
  );
}
