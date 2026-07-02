import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <h1 className="text-3xl font-extrabold text-ink">Page introuvable</h1>
      <p className="mt-3 text-ink/60">Cette page n'existe pas ou plus.</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent/90">
        Retour à l'accueil
      </Link>
    </div>
  );
}
