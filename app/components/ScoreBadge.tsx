export default function ScoreBadge({ score }: { score: number }) {
  const color = score >= 75 ? "text-good" : score >= 60 ? "text-accent" : score >= 45 ? "text-warn" : "text-bad";
  return (
    <div className="flex items-center gap-2">
      <div className={`text-2xl font-bold ${color}`}>{score}</div>
      <div className="text-xs text-ink/50 leading-tight">
        Score Auto
        <br />
        / 100
      </div>
    </div>
  );
}
