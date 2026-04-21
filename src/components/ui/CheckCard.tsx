"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { Button } from "./Button";

interface CheckCardProps {
  icon: string;
  title: string;
  description: string;
  tooltip: string;
  time: string;
  cta: string;
  href: string;
  className?: string;
}

export function CheckCard({
  icon,
  title,
  description,
  tooltip,
  time,
  cta,
  href,
  className = "",
}: CheckCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipId = useId();

  return (
    <div className={`relative bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors min-w-0 ${className}`}>
      {/* Info button */}
      <div className="absolute top-4 right-4">
        <button
          type="button"
          aria-describedby={tooltipId}
          aria-expanded={showTooltip}
          aria-label="Learn more"
          className="w-6 h-6 rounded-full bg-surface-muted text-text-subtle text-xs font-bold hover:bg-primary-soft hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 transition-colors"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        >
          ?
        </button>

        {/* Tooltip panel */}
        {showTooltip && (
          <div
            id={tooltipId}
            role="tooltip"
            className="absolute right-0 top-8 z-20 w-64 bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-muted shadow-xl"
          >
            {/* Arrow */}
            <div className="absolute -top-1.5 right-2.5 w-3 h-3 bg-surface border-t border-l border-border rotate-45" />
            {tooltip}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex items-start gap-3 pr-8 min-w-0">
        <span className="text-3xl shrink-0 mt-0.5" aria-hidden="true">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-text text-lg leading-snug wrap-break-word">{title}</h3>
          <p className="text-sm text-text-muted mt-1.5 leading-relaxed wrap-break-word">{description}</p>
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
        <span className="text-xs text-text-subtle bg-surface-muted px-2.5 py-1 rounded-full">
          {time}
        </span>
        <Link href={href}>
          <Button variant="outline" size="sm">
            {cta}
          </Button>
        </Link>
      </div>
    </div>
  );
}
