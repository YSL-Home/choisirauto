import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-ink/60">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-2 text-base font-bold text-ink">
              Choisir<span className="text-accent">Auto</span>
            </div>
            <p>La plateforme qui aide les particuliers et les entreprises au Maroc à choisir la bonne voiture, au bon prix.</p>
          </div>
          <div>
            <div className="mb-2 font-semibold text-ink">Particuliers</div>
            <ul className="space-y-1">
              <li><Link href="/particuliers/assistant" className="hover:text-ink">Assistant choix voiture</Link></li>
              <li><Link href="/particuliers/cout-reel" className="hover:text-ink">Calculateur coût réel</Link></li>
              <li><Link href="/guides" className="hover:text-ink">Guides "Acheter ou éviter ?"</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-semibold text-ink">Entreprises</div>
            <ul className="space-y-1">
              <li><Link href="/entreprises/simulateur-flotte" className="hover:text-ink">Simulateur coût flotte</Link></li>
              <li><Link href="/entreprises/achat-credit-lld" className="hover:text-ink">Achat vs crédit vs LLD</Link></li>
              <li><Link href="/entreprises/audit-flotte" className="hover:text-ink">Audit flotte</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-semibold text-ink">Plateforme</div>
            <ul className="space-y-1">
              <li><Link href="/a-propos" className="hover:text-ink">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-ink">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-ink">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-black/5 pt-6 text-xs text-ink/40">
          © {new Date().getFullYear()} ChoisirAuto — Nom provisoire. Les estimations de prix, coût et score sont indicatives et ne constituent ni une offre ni un conseil financier.
        </div>
      </div>
    </footer>
  );
}
