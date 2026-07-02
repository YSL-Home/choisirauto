"use client";

import { useState } from "react";
import { computeFleetCost } from "@/lib/fleet";
import { formatNumber } from "@/lib/format";
import { CoinIcon, CarIcon, ScoreIcon } from "./icons";

const SEGMENTS = ["citadine", "berline", "SUV", "SUV familial", "utilitaire"];

export default function FleetSimulator() {
  const [nombreVehicules, setNombreVehicules] = useState(8);
  const [prixMoyenDH, setPrixMoyenDH] = useState(220000);
  const [kmAnnuelParVehicule, setKmAnnuelParVehicule] = useState(25000);
  const [dureeDetentionMois, setDureeDetentionMois] = useState(48);
  const [segment, setSegment] = useState("SUV");

  const result = computeFleetCost({ nombreVehicules, prixMoyenDH, kmAnnuelParVehicule, dureeDetentionMois, segment });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Nombre de véhicules</label>
          <input type="number" value={nombreVehicules} onChange={(e) => setNombreVehicules(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Prix moyen par véhicule (DH)</label>
          <input type="number" value={prixMoyenDH} onChange={(e) => setPrixMoyenDH(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Segment principal</label>
          <select value={segment} onChange={(e) => setSegment(e.target.value)} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm">
            {SEGMENTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Km annuel par véhicule</label>
          <input type="range" min={5000} max={60000} step={1000} value={kmAnnuelParVehicule} onChange={(e) => setKmAnnuelParVehicule(Number(e.target.value))} className="w-full" />
          <div className="text-sm text-ink/60">{formatNumber(kmAnnuelParVehicule)} km/an</div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Durée de détention (mois)</label>
          <input type="number" value={dureeDetentionMois} onChange={(e) => setDureeDetentionMois(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
            <CarIcon segment={segment} className="h-7 w-10" />
          </div>
          <div>
            <div className="text-sm font-semibold text-ink/60">Coût total mensuel de la flotte</div>
            <div className="text-3xl font-extrabold text-accent">
              {formatNumber(Math.round(result.coutMensuelTotal))} DH<span className="text-base font-medium text-ink/40">/mois</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-paper p-3 text-center">
            <CoinIcon className="mx-auto h-5 w-5 text-accent" />
            <div className="mt-2 text-sm font-bold text-ink">{formatNumber(Math.round(result.coutMensuelParVehicule))}</div>
            <div className="text-xs text-ink/50">DH / véhicule / mois</div>
          </div>
          <div className="rounded-xl bg-paper p-3 text-center">
            <ScoreIcon className="mx-auto h-5 w-5 text-accent" />
            <div className="mt-2 text-sm font-bold text-ink">{result.coutParKm.toFixed(2)}</div>
            <div className="text-xs text-ink/50">DH / km</div>
          </div>
          <div className="rounded-xl bg-paper p-3 text-center">
            <CoinIcon className="mx-auto h-5 w-5 text-accent" />
            <div className="mt-2 text-sm font-bold text-ink">{formatNumber(Math.round(result.coutMensuelTotal * 12))}</div>
            <div className="text-xs text-ink/50">DH / an (total)</div>
          </div>
        </div>

        <p className="mt-6 text-xs text-ink/40">
          Estimation indicative incluant amortissement, carburant, entretien, assurance et pneus. Ne constitue pas une offre.
        </p>
      </div>
    </div>
  );
}
