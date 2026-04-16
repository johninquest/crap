interface ProgressBarProps {
  current: number;
  total: number;
  labelQuestionOf: string;
  labelPctComplete: string;
}

export function ProgressBar({ current, total, labelQuestionOf, labelPctComplete }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  const questionLabel = labelQuestionOf
    .replace("{current}", String(current))
    .replace("{total}", String(total));
  const pctLabel = labelPctComplete.replace("{pct}", String(pct));

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm text-text-muted">
        <span>{questionLabel}</span>
        <span>{pctLabel}</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
