"use client";

import { useState } from "react";
import Link from "next/link";
import { vehicles, computeScore, verdictFromScore, VERDICT_LABEL, VehicleScores, Vehicle } from "@/lib/vehicles";
import { formatNumber } from "@/lib/format";
import VerdictBadge from "./VerdictBadge";
import ScoreBadge from "./ScoreBadge";
import { CarIcon } from "./icons";

type Answers = {
  budget: number;
  etat: "neuf" | "occasion" | "les-deux";
  usage: "ville" | "route" | "famille" | "travail" | "loisirs";
  personnes: number;
  kmAnnuel: number;
  priorites: string[];
  boite: "manuelle" | "automatique" | "peu-importe";
};

const PRIORITE_OPTIONS = [
  { key: "prix", label: "Économie / prix" },
  { key: "confort", label: "Confort" },
  { key: "revente", label: "Revente" },
  { key: "fiabilite", label: "Fiabilité" },
  { key: "cout", label: "Coût d'usage" },
  { key: "risque", label: "Sécurité / faible risque" },
];

const STEPS = ["Budget", "Neuf/occasion", "Usage", "Personnes", "Kilométrage", "Priorités", "Boîte"];

export default function AssistantWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    budget: 180000,
    etat: "les-deux",
    usage: "famille",
    personnes: 4,
    kmAnnuel: 15000,
    priorites: [],
    boite: "peu-importe",
  });
  const [showResult, setShowResult] = useState(false);

  function togglePriorite(key: string) {
    setAnswers((a) => {
      const has = a.priorites.includes(key);
      if (has) return { ...a, priorites: a.priorites.filter((p) => p !== key) };
      if (a.priorites.length >= 3) return a;
      return { ...a, priorites: [...a.priorites, key] };
    });
  }

  function weightsFromPriorites(): VehicleScores {
    const base: VehicleScores = { prix: 0.2, cout: 0.2, revente: 0.15, fiabilite: 0.2, confort: 0.15, risque: 0.1 };
    if (answers.priorites.length === 0) return base;
    const boosted = { ...base };
    answers.priorites.forEach((p) => {
      const key = p as keyof VehicleScores;
      boosted[key] = boosted[key] * 1.6;
    });
    return boosted;
  }

  function getRecommendations() {
    const weights = weightsFromPriorites();
    const candidats = vehicles.filter((v) => v.prixDH <= answers.budget * 1.08);
    const withScore = candidats.map((v) => ({ vehicle: v, score: computeScore(v.scores, weights) }));
    withScore.sort((a, b) => b.score - a.score);

    const meilleure = withScore[0];
    const economique = [...withScore].sort((a, b) => a.vehicle.prixDH - b.vehicle.prixDH)[0];
    const confort = [...withScore].sort((a, b) => b.vehicle.scores.confort - a.vehicle.scores.confort)[0];

    const aEviter = vehicles
      .map((v) => ({ vehicle: v, score: computeScore(v.scores, weights) }))
      .filter((x) => x.score < 55)
      .sort((a, b) => a.score - b.score)[0];

    return { meilleure, economique, confort, aEviter, weights };
  }

  if (showResult) {
    const { meilleure, economique, confort, aEviter } = getRecommendations();

    if (!meilleure) {
      return (
        <div className="rounded-2xl border border-warn/30 bg-warn/5 p-8 text-center">
          <p className="font-semibold text-ink">Aucun véhicule de notre base ne correspond à ce budget pour le moment.</p>
          <p className="mt-2 text-sm text-ink/60">Essayez d'augmenter légèrement le budget ou contactez-nous pour un conseil personnalisé.</p>
          <button onClick={() => setShowResult(false)} className="mt-4 text-sm font-semibold text-accent">← Modifier mes critères</button>
        </div>
      );
    }

    const cards: { label: string; item: { vehicle: Vehicle; score: number } | undefined }[] = [
      { label: "Recommandation n°1", item: meilleure },
      { label: "Alternative économique", item: economique?.vehicle.slug !== meilleure.vehicle.slug ? economique : undefined },
      { label: "Alternative confort / image", item: confort?.vehicle.slug !== meilleure.vehicle.slug ? confort : undefined },
    ];

    return (
      <div>
        <button onClick={() => setShowResult(false)} className="mb-6 text-sm font-semibold text-accent">
          ← Modifier mes critères
        </button>
        <div className="grid gap-5 md:grid-cols-3">
          {cards.filter((c) => c.item).map((c) => (
            <div key={c.label} className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide text-accent">{c.label}</div>
                <div className="flex h-9 w-12 items-center justify-center rounded-lg bg-paper text-ink/50">
                  <CarIcon segment={c.item!.vehicle.segment} className="h-6 w-9" />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-lg font-bold text-ink">
                  {c.item!.vehicle.marque} {c.item!.vehicle.modele}
                </div>
                <ScoreBadge score={c.item!.score} />
              </div>
              <div className="mt-1 text-sm text-ink/60">{formatNumber(c.item!.vehicle.prixDH)} DH</div>
              <div className="mt-3"><VerdictBadge verdict={verdictFromScore(c.item!.score)} /></div>
              <p className="mt-3 text-sm text-ink/70">{c.item!.vehicle.resume}</p>
              <Link href={`/guides?vehicule=${c.item!.vehicle.slug}`} className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
                Voir les guides liés →
              </Link>
            </div>
          ))}
        </div>

        {aEviter && (
          <div className="mt-6 rounded-2xl border border-bad/30 bg-bad/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-bad">À éviter ou à vérifier selon votre profil</div>
            <div className="mt-1 font-bold text-ink">{aEviter.vehicle.marque} {aEviter.vehicle.modele}</div>
            <p className="mt-1 text-sm text-ink/70">
              Score plus faible sur vos priorités ({aEviter.score}/100) — points faibles : {aEviter.vehicle.pointsFaibles.join(", ")}.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#offre" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent/90">
            Recevoir une offre
          </a>
          <Link href="/particuliers/cout-reel" className="rounded-lg border border-black/15 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-black/5">
            Calculer le coût réel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
      <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-ink/40">
        {STEPS.map((s, i) => (
          <span key={s} className={i === step ? "text-accent" : ""}>
            {i > 0 && "· "}{s}
          </span>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2 className="text-lg font-bold text-ink">Quel est votre budget total (DH) ?</h2>
          <input
            type="range" min={100000} max={450000} step={5000}
            value={answers.budget}
            onChange={(e) => setAnswers({ ...answers, budget: Number(e.target.value) })}
            className="mt-6 w-full"
          />
          <div className="mt-2 text-2xl font-bold text-accent">{formatNumber(answers.budget)} DH</div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold text-ink">Neuf, occasion, ou les deux ?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {(["neuf", "occasion", "les-deux"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setAnswers({ ...answers, etat: v })}
                className={`rounded-lg border px-4 py-3 text-sm font-medium capitalize ${answers.etat === v ? "border-accent bg-accent/10 text-accent" : "border-black/15 text-ink/70"}`}
              >
                {v.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-bold text-ink">Quel est votre usage principal ?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {(["ville", "route", "famille", "travail", "loisirs"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setAnswers({ ...answers, usage: v })}
                className={`rounded-lg border px-4 py-3 text-sm font-medium capitalize ${answers.usage === v ? "border-accent bg-accent/10 text-accent" : "border-black/15 text-ink/70"}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-bold text-ink">Nombre de personnes transportées régulièrement</h2>
          <input
            type="range" min={1} max={7} step={1}
            value={answers.personnes}
            onChange={(e) => setAnswers({ ...answers, personnes: Number(e.target.value) })}
            className="mt-6 w-full"
          />
          <div className="mt-2 text-2xl font-bold text-accent">{answers.personnes} personne(s)</div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-lg font-bold text-ink">Kilométrage annuel estimé</h2>
          <input
            type="range" min={5000} max={40000} step={1000}
            value={answers.kmAnnuel}
            onChange={(e) => setAnswers({ ...answers, kmAnnuel: Number(e.target.value) })}
            className="mt-6 w-full"
          />
          <div className="mt-2 text-2xl font-bold text-accent">{formatNumber(answers.kmAnnuel)} km/an</div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-lg font-bold text-ink">Vos priorités (3 max)</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PRIORITE_OPTIONS.map((p) => (
              <button
                key={p.key}
                onClick={() => togglePriorite(p.key)}
                className={`rounded-lg border px-4 py-3 text-left text-sm font-medium ${answers.priorites.includes(p.key) ? "border-accent bg-accent/10 text-accent" : "border-black/15 text-ink/70"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 6 && (
        <div>
          <h2 className="text-lg font-bold text-ink">Boîte de vitesses</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {(["manuelle", "automatique", "peu-importe"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setAnswers({ ...answers, boite: v })}
                className={`rounded-lg border px-4 py-3 text-sm font-medium capitalize ${answers.boite === v ? "border-accent bg-accent/10 text-accent" : "border-black/15 text-ink/70"}`}
              >
                {v.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-ink/60 disabled:opacity-0"
        >
          ← Retour
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent/90"
          >
            Suivant →
          </button>
        ) : (
          <button
            onClick={() => setShowResult(true)}
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent/90"
          >
            Voir mes recommandations
          </button>
        )}
      </div>
    </div>
  );
}
