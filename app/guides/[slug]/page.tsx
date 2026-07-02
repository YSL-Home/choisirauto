import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guides, TYPE_LABEL, getGuide } from "@/lib/guides";
import { getVehicle, computeScore, verdictFromScore } from "@/lib/vehicles";
import VerdictBadge from "@/app/components/VerdictBadge";
import ScoreBadge from "@/app/components/ScoreBadge";
import LeadForm from "@/app/components/LeadForm";
import { CarIcon } from "@/app/components/icons";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return { title: guide.titre, description: guide.chapo };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const vehicle = guide.vehicleSlug ? getVehicle(guide.vehicleSlug) : undefined;
  const score = vehicle ? computeScore(vehicle.scores) : undefined;
  const verdict = guide.verdict ?? (score !== undefined ? verdictFromScore(score) : undefined);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <Link href="/guides" className="text-sm font-semibold text-accent hover:underline">← Tous les guides</Link>

      <div className="mt-4 flex items-center gap-3">
        {vehicle && (
          <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <CarIcon segment={vehicle.segment} className="h-7 w-11" />
          </div>
        )}
        <div className="text-xs font-semibold uppercase tracking-wide text-accent">{TYPE_LABEL[guide.type]}</div>
      </div>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">{guide.titre}</h1>
      <p className="mt-3 text-lg text-ink/60">{guide.chapo}</p>

      {(verdict || score !== undefined) && (
        <div className="mt-6 flex items-center gap-4 rounded-xl border border-black/10 bg-white p-4">
          {verdict && <VerdictBadge verdict={verdict} />}
          {score !== undefined && <ScoreBadge score={score} />}
        </div>
      )}

      <div className="mt-8 space-y-4">
        {guide.contenu.map((p, i) => (
          <p key={i} className="leading-relaxed text-ink/80">{p}</p>
        ))}
      </div>

      {vehicle && (
        <div className="mt-8 grid gap-4 rounded-xl border border-black/10 bg-white p-5 sm:grid-cols-2">
          <div>
            <div className="text-sm font-semibold text-ink/60">Points forts</div>
            <ul className="mt-1 space-y-1 text-sm text-ink/80">
              {vehicle.pointsForts.map((p) => <li key={p}>+ {p}</li>)}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-ink/60">Points faibles</div>
            <ul className="mt-1 space-y-1 text-sm text-ink/80">
              {vehicle.pointsFaibles.map((p) => <li key={p}>− {p}</li>)}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-12">
        <LeadForm type="offre-neuve" />
      </div>
    </div>
  );
}
