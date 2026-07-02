import Link from "next/link";
import { Guide, TYPE_LABEL } from "@/lib/guides";
import { VerdictIcon, CoinIcon, PriceTagIcon, ScoreIcon } from "./icons";

const TYPE_ICON: Record<Guide["type"], typeof VerdictIcon> = {
  "acheter-ou-eviter": VerdictIcon,
  budget: CoinIcon,
  "cout-reel": CoinIcon,
  occasion: PriceTagIcon,
  pro: ScoreIcon,
  comparatif: ScoreIcon,
};

const TYPE_COLOR: Record<Guide["type"], string> = {
  "acheter-ou-eviter": "bg-bad/10 text-bad",
  budget: "bg-good/10 text-good",
  "cout-reel": "bg-warn/10 text-warn",
  occasion: "bg-accent/10 text-accent",
  pro: "bg-accent/10 text-accent",
  comparatif: "bg-good/10 text-good",
};

export default function GuideCard({ guide }: { guide: Guide }) {
  const Icon = TYPE_ICON[guide.type];
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="flex flex-col rounded-xl border border-black/10 bg-white p-5 transition hover:border-accent hover:shadow-md"
    >
      <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full ${TYPE_COLOR[guide.type]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-xs font-semibold uppercase tracking-wide text-accent">{TYPE_LABEL[guide.type]}</div>
      <div className="mt-1 font-bold text-ink">{guide.titre}</div>
      <p className="mt-2 flex-1 text-sm text-ink/60">{guide.chapo}</p>
    </Link>
  );
}
