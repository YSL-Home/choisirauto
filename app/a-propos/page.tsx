import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description: "ChoisirAuto est la plateforme qui aide les particuliers et les entreprises au Maroc à choisir la bonne voiture, au bon prix.",
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-sm font-semibold text-accent">À propos</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Le site ne doit pas seulement informer, il doit aider à décider.</h1>

      <div className="mt-6 space-y-4 text-ink/70">
        <p>
          ChoisirAuto (nom provisoire) est une plateforme automobile de référence au Maroc, pensée pour deux publics :
          les particuliers qui veulent acheter un véhicule sans se tromper, et les entreprises qui veulent mieux choisir,
          financer et gérer leur flotte.
        </p>
        <p>
          Contrairement aux sites de fiches techniques ou d'annonces classiques, notre objectif n'est pas de vous
          donner plus d'informations, mais de vous aider à trancher : acheter, négocier, vérifier ou éviter.
        </p>
        <p>
          Notre règle de confiance est simple : le score, la note et le verdict d'un véhicule ne sont jamais vendus.
          Les partenaires peuvent payer pour de la visibilité ou pour recevoir des demandes, jamais pour obtenir une
          bonne recommandation.
        </p>
      </div>
    </div>
  );
}
