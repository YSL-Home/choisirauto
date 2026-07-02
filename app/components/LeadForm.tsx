"use client";

import { useState, FormEvent } from "react";

export type LeadType =
  | "conseil"
  | "offre-neuve"
  | "credit"
  | "assurance"
  | "devis-flotte"
  | "audit-flotte"
  | "inspection-preinteret";

const TITLES: Record<LeadType, string> = {
  conseil: "Demander un conseil personnalisé",
  "offre-neuve": "Recevoir une offre neuve",
  credit: "Demander un devis crédit",
  assurance: "Demander un devis assurance",
  "devis-flotte": "Demander un devis flotte",
  "audit-flotte": "Demander un audit flotte gratuit",
  "inspection-preinteret": "Être prévenu au lancement de l'inspection occasion",
};

export default function LeadForm({
  type,
  extraFields,
}: {
  type: LeadType;
  extraFields?: { name: string; label: string; placeholder?: string }[];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot anti-spam
    if (data.website) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...data, page: typeof window !== "undefined" ? window.location.pathname : "" }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-good/30 bg-good/5 p-6 text-good">
        <p className="font-semibold">Demande envoyée.</p>
        <p className="mt-1 text-sm text-ink/70">
          Nous revenons vers vous rapidement. Un particulier ou un partenaire de confiance vous contactera au numéro fourni.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-black/10 bg-white p-6">
      <h3 className="text-lg font-bold text-ink">{TITLES[type]}</h3>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Nom complet</label>
          <input name="nom" required className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Téléphone</label>
          <input name="telephone" required type="tel" className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">Email</label>
        <input name="email" type="email" className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
      </div>

      {extraFields?.map((f) => (
        <div key={f.name}>
          <label className="mb-1 block text-sm font-medium text-ink/70">{f.label}</label>
          <input name={f.name} placeholder={f.placeholder} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
        </div>
      ))}

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">Message (optionnel)</label>
        <textarea name="message" rows={3} className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm" />
      </div>

      <label className="flex items-start gap-2 text-xs text-ink/60">
        <input type="checkbox" required name="consentement" className="mt-0.5" />
        J'accepte que mes données soient transmises à ChoisirAuto et, le cas échéant, à un partenaire pour traiter ma demande. Voir la{" "}
        <a href="/confidentialite" className="underline">politique de confidentialité</a>.
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-50"
      >
        {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>

      {status === "error" && (
        <p className="text-sm text-bad">Une erreur est survenue. Réessayez ou contactez-nous directement.</p>
      )}
    </form>
  );
}
