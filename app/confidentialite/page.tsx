import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 text-ink/70">
      <p className="text-sm font-semibold text-accent">Confidentialité</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Politique de confidentialité</h1>

      <div className="mt-6 space-y-4 text-sm leading-relaxed">
        <p>
          Les données personnelles collectées via les formulaires de ce site (nom, téléphone, email, et informations
          liées à votre demande) sont traitées conformément à la loi n° 09-08 relative à la protection des personnes
          physiques à l'égard du traitement des données à caractère personnel (Maroc).
        </p>
        <p>
          <strong className="text-ink">Finalité :</strong> traiter votre demande (conseil, offre, devis, audit) et,
          avec votre consentement explicite, la transmettre à un partenaire pertinent (concessionnaire, loueur,
          banque, assureur) pour vous recontacter.
        </p>
        <p>
          <strong className="text-ink">Destinataires :</strong> l'équipe ChoisirAuto et, uniquement si vous avez
          coché la case de consentement, le ou les partenaires concernés par votre demande.
        </p>
        <p>
          <strong className="text-ink">Durée de conservation :</strong> vos données sont conservées le temps
          nécessaire au traitement de votre demande, puis archivées ou supprimées selon les délais légaux.
        </p>
        <p>
          <strong className="text-ink">Vos droits :</strong> vous disposez d'un droit d'accès, de rectification et
          d'opposition sur vos données personnelles. Pour l'exercer, contactez-nous via le formulaire de contact.
        </p>
        <p className="text-xs text-ink/40">
          Déclaration CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel) à
          finaliser avant la mise en production des formulaires du site.
        </p>
      </div>
    </div>
  );
}
