import Link from "next/link";
import { Guide, TYPE_LABEL } from "@/lib/guides";
import { getVehicle } from "@/lib/vehicles";
import { VerdictIcon, CoinIcon, PriceTagIcon, ScoreIcon } from "./icons";
import CarIllustration from "./CarIllustration";

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
  const vehicle = guide.vehicleSlug ? getVehicle(guide.vehicleSlug) : undefined;

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg"
    >
      {vehicle ? (
        <div className="flex h-28 items-center justify-center bg-gradient-to-br from-paper to-accent/10">
          <CarIllustration segment={vehicle.segment} className="h-20 w-32" />
        </div>
      ) : (
        <div className={`flex h-28 items-center justify-center ${TYPE_COLOR[guide.type]}`}>
          <Icon className="h-10 w-10" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-accent">{TYPE_LABEL[guide.type]}</div>
        <div className="mt-1 font-bold text-ink">{guide.titre}</div>
        <p className="mt-2 flex-1 text-sm text-ink/60">{guide.chapo}</p>
      </div>
    </Link>
  );
}
