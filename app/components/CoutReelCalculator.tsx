"use client";

import { useState } from "react";
import { computeCoutReel } from "@/lib/cost";

const SEGMENTS = ["citadine", "berline", "SUV", "SUV familial"];
const MOTORISATIONS = ["essence", "diesel", "hybride", "electrique"] as const;

export default function CoutReelCalculator() {
  const [prixDH, setPrixDH] = useState(200000);
  const [segment, setSegment] = useState("SUV");
  const [motorisation, setMotorisation] = useState<(typeof MOTORISATIONS)[number]>("essence");
  const [consommationL100, setConsommationL100] = useState(6.5);
  const [cvFiscaux, setCvFiscaux] = useState(6);
  const [kmAnnuel, setKmAnnuel] = useState(15000);
  const [apportDH, setApportDH] = useState(40000);
  const [dureeCreditMois, setDureeCreditMois] = useState(60);

  const detail = computeCoutReel({ prixDH, segment, motorisation, consommationL100, cvFiscaux, kmAnnuel, apportDH, dureeCreditMois });

  const postes = [
    { label: dureeCreditMois > 0 ? "Mensualité crédit" : "Amortissement (comptant)", value: detail.credit },
    { label: "Carburant", value: detail.carburant },
    { label: "Assurance", value: detail.assurance },
    { label: "Entretien", value: detail.entretien },
    { label: "Pneus", value: detail.pneus },
    { label: "Vignette", value: detail.vignette },
    { label: "Décote (perte de valeur)", value: detail.decote },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Prix du véhicule (DH)</label>
          <input type="number" value={prixDH} onChange={(e) => setPrixDH(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/70">Segment</label>
            <select value={segment} onChange={(e) => setSegment(e.target.value)} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm">
              {SEGMENTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/70">Motorisation</label>
            <select value={motorisation} onChange={(e) => setMotorisation(e.target.value as any)} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm">
              {MOTORISATIONS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/70">Consommation (L/100km)</label>
            <input type="number" step={0.1} value={consommationL100} onChange={(e) => setConsommationL100(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/70">Puissance fiscale (CV)</label>
            <input type="number" value={cvFiscaux} onChange={(e) => setCvFiscaux(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Kilométrage annuel</label>
          <input type="range" min={5000} max={40000} step={1000} value={kmAnnuel} onChange={(e) => setKmAnnuel(Number(e.target.value))} className="w-full" />
          <div className="text-sm text-ink/60">{kmAnnuel.toLocaleString("fr-FR")} km/an</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/70">Apport (DH)</label>
            <input type="number" value={apportDH} onChange={(e) => setApportDH(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink/70">Durée crédit (mois, 0 = comptant)</label>
            <input type="number" value={dureeCreditMois} onChange={(e) => setDureeCreditMois(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-sm font-semibold text-ink/60">Coût mensuel réel estimé</div>
        <div className="mt-1 text-4xl font-extrabold text-accent">
          {Math.round(detail.total).toLocaleString("fr-FR")} DH<span className="text-lg font-medium text-ink/40">/mois</span>
        </div>

        <div className="mt-6 space-y-2">
          {postes.map((p) => (
            <div key={p.label} className="flex items-center justify-between text-sm">
              <span className="text-ink/60">{p.label}</span>
              <span className="font-medium text-ink">{Math.round(p.value).toLocaleString("fr-FR")} DH</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-ink/40">
          Estimation indicative basée sur des paramètres moyens marché (carburant, assurance, entretien). Ne constitue ni une offre ni un conseil financier.
        </p>
      </div>
    </div>
  );
}
