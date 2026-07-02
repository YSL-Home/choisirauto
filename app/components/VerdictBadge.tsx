import { Verdict, VERDICT_LABEL } from "@/lib/vehicles";

const STYLES: Record<Verdict, string> = {
  acheter: "bg-good/10 text-good border-good/30",
  negocier: "bg-accent/10 text-accent border-accent/30",
  verifier: "bg-warn/10 text-warn border-warn/30",
  eviter: "bg-bad/10 text-bad border-bad/30",
};

export default function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${STYLES[verdict]}`}
    >
      {VERDICT_LABEL[verdict]}
    </span>
  );
}
