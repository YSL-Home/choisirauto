// Formatage manuel (pas de toLocaleString) pour éviter les écarts d'hydratation
// Next.js entre le formatage ICU du serveur (Node) et celui du navigateur.
export function formatNumber(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const digits = Math.abs(rounded).toString();
  const withSpaces = digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return sign + withSpaces;
}

export function formatDH(value: number): string {
  return `${formatNumber(value)} DH`;
}
