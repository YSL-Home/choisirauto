import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";

const BASE = "https://choisirauto.pages.dev";

const STATIC_ROUTES = [
  "",
  "/particuliers",
  "/particuliers/assistant",
  "/particuliers/cout-reel",
  "/entreprises",
  "/entreprises/simulateur-flotte",
  "/entreprises/achat-credit-lld",
  "/entreprises/audit-flotte",
  "/guides",
  "/contact",
  "/a-propos",
  "/mentions-legales",
  "/confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
  }));

  const guideEntries = guides.map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...guideEntries];
}
