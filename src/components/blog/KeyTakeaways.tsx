interface KeyTakeawaysProps {
  takeaways: string[];
  title?: string;
}

export function KeyTakeaways({ takeaways, title = "Key Takeaways" }: KeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div
      className="my-8 p-5 sm:p-6 rounded-2xl bg-primary-soft/60 border border-primary/20 text-text"
      role="region"
      aria-label={title}
    >
      <div className="flex items-center gap-2 mb-3 text-primary font-bold text-base tracking-tight">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 shrink-0"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
        <span>{title}</span>
      </div>

      <ul className="space-y-2.5 pl-1 text-sm text-text-muted">
        {takeaways.map((point, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            <span className="leading-relaxed text-text">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
