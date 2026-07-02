"use client";

import { useState } from "react";
import { computeComparatif, FinancementMode } from "@/lib/fleet";
import { formatNumber } from "@/lib/format";

const LABELS: Record<FinancementMode, string> = { achat: "Achat", credit: "Crédit", lld: "LLD" };

export default function FinancementComparator() {
  const [prixDH, setPrixDH] = useState(220000);
  const [dureeMois, setDureeMois] = useState(48);
  const [kmAnnuel, setKmAnnuel] = useState(25000);
  const [tresorerieDisponible, setTresorerieDisponible] = useState<"faible" | "moyenne" | "confortable">("moyenne");

  const result = computeComparatif({ prixDH, dureeMois, kmAnnuel, tresorerieDisponible });

  const rows: { mode: FinancementMode; value: number }[] = [
    { mode: "achat", value: result.achat },
    { mode: "credit", value: result.credit },
    { mode: "lld", value: result.lld },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Prix du véhicule (DH)</label>
          <input type="number" value={prixDH} onChange={(e) => setPrixDH(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Durée de détention souhaitée (mois)</label>
          <select value={dureeMois} onChange={(e) => setDureeMois(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm">
            {[24, 36, 48, 60].map((d) => <option key={d} value={d}>{d} mois</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Kilométrage annuel estimé</label>
          <input type="range" min={5000} max={60000} step={1000} value={kmAnnuel} onChange={(e) => setKmAnnuel(Number(e.target.value))} className="w-full" />
          <div className="text-sm text-ink/60">{formatNumber(kmAnnuel)} km/an</div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Trésorerie disponible</label>
          <div className="grid grid-cols-3 gap-2">
            {(["faible", "moyenne", "confortable"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTresorerieDisponible(t)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize ${tresorerieDisponible === t ? "border-accent bg-accent/10 text-accent" : "border-black/15 text-ink/70"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-sm font-semibold text-ink/60">Coût mensuel estimé par mode</div>
        <div className="mt-4 space-y-3">
          {rows.map((r) => {
            const max = Math.max(...rows.map((x) => x.value), 1);
            return (
              <div
                key={r.mode}
                className={`rounded-lg border px-4 py-3 ${r.mode === result.recommandation ? "border-accent bg-accent/5" : "border-black/10"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-ink">
                    {LABELS[r.mode]}
                    {r.mode === result.recommandation && (
                      <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase text-white">Recommandé</span>
                    )}
                  </span>
                  <span className="font-bold text-ink">{formatNumber(Math.round(r.value))} DH/mois</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/5">
                  <div
                    className={`h-full rounded-full ${r.mode === result.recommandation ? "bg-accent" : "bg-ink/20"}`}
                    style={{ width: `${Math.max((r.value / max) * 100, 3)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-lg bg-accent/10 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-accent">Recommandation</div>
          <div className="mt-1 text-lg font-bold text-ink">{LABELS[result.recommandation]}</div>
          <p className="mt-1 text-sm text-ink/70">{result.argumentaire}</p>
        </div>

        <p className="mt-4 text-xs text-ink/40">Estimation indicative. Ne remplace pas une offre chiffrée par un partenaire.</p>
      </div>
    </div>
  );
}
