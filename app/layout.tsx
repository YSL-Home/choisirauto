import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://choisirauto.pages.dev"),
  title: {
    default: "ChoisirAuto — Acheter la bonne voiture au Maroc, sans se tromper",
    template: "%s | ChoisirAuto",
  },
  description:
    "La plateforme qui aide les particuliers et les entreprises au Maroc à choisir la bonne voiture, au bon prix, avec le bon budget. Score Auto, coût réel, verdict clair.",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "ChoisirAuto",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
