"use client";

import { useState } from "react";
import { computeFleetCost } from "@/lib/fleet";

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
          <div className="text-sm text-ink/60">{kmAnnuelParVehicule.toLocaleString("fr-FR")} km/an</div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Durée de détention (mois)</label>
          <input type="number" value={dureeDetentionMois} onChange={(e) => setDureeDetentionMois(Number(e.target.value))} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-sm font-semibold text-ink/60">Coût total mensuel de la flotte</div>
        <div className="mt-1 text-4xl font-extrabold text-accent">
          {Math.round(result.coutMensuelTotal).toLocaleString("fr-FR")} DH<span className="text-lg font-medium text-ink/40">/mois</span>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-ink/60">Coût mensuel par véhicule</span>
            <span className="font-medium text-ink">{Math.round(result.coutMensuelParVehicule).toLocaleString("fr-FR")} DH</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink/60">Coût par kilomètre</span>
            <span className="font-medium text-ink">{result.coutParKm.toFixed(2)} DH/km</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink/60">Coût annuel total</span>
            <span className="font-medium text-ink">{Math.round(result.coutMensuelTotal * 12).toLocaleString("fr-FR")} DH</span>
          </div>
        </div>

        <p className="mt-6 text-xs text-ink/40">
          Estimation indicative incluant amortissement, carburant, entretien, assurance et pneus. Ne constitue pas une offre.
        </p>
      </div>
    </div>
  );
}
