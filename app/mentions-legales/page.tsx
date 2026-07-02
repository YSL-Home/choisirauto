import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 text-ink/70">
      <p className="text-sm font-semibold text-accent">Mentions légales</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Mentions légales</h1>

      <div className="mt-6 space-y-4 text-sm leading-relaxed">
        <p>
          <strong className="text-ink">Éditeur du site :</strong> ChoisirAuto (nom provisoire, dénomination sociale et
          coordonnées légales à compléter avant mise en production — dépôt de marque en cours).
        </p>
        <p>
          <strong className="text-ink">Hébergement :</strong> Cloudflare, Inc. — 101 Townsend St, San Francisco, CA
          94107, États-Unis.
        </p>
        <p>
          <strong className="text-ink">Directeur de la publication :</strong> à compléter.
        </p>
        <p>
          <strong className="text-ink">Propriété intellectuelle :</strong> l'ensemble des contenus (textes, scores,
          calculateurs, mise en forme) est la propriété de ChoisirAuto, sauf mention contraire. Toute reproduction
          sans autorisation est interdite.
        </p>
        <p>
          <strong className="text-ink">Estimations :</strong> les scores, coûts et verdicts affichés sur le site sont
          des estimations indicatives basées sur des données moyennes de marché. Ils ne constituent ni une offre
          commerciale, ni un conseil financier, ni un engagement contractuel.
        </p>
      </div>
    </div>
  );
}
