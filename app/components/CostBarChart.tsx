import { formatNumber } from "@/lib/format";

const COLORS = ["bg-accent", "bg-good", "bg-warn", "bg-bad", "bg-violet-500", "bg-cyan-500", "bg-pink-500"];

export type CostItem = { label: string; value: number };

export default function CostBarChart({ items }: { items: CostItem[] }) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-ink/60">{item.label}</span>
            <span className="font-semibold text-ink">{formatNumber(item.value)} DH</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
            <div
              className={`h-full rounded-full ${COLORS[i % COLORS.length]}`}
              style={{ width: `${Math.max((item.value / max) * 100, 3)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
