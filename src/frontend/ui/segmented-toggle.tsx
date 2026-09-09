"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function SegmentedToggle<T extends string>({
  value,
  options,
  labels,
  ariaLabel,
  onChange,
  refreshAfterChange = true,
}: {
  value: T;
  options: readonly T[];
  labels: Record<T, string>;
  ariaLabel: string;
  onChange: (next: T) => Promise<void>;
  // La bascule de langue navigue déjà vers une nouvelle URL : un
  // router.refresh() y serait redondant avec la navigation elle-même.
  refreshAfterChange?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-mint p-0.5"
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          disabled={isPending}
          onClick={() => {
            if (option === value) return;
            startTransition(async () => {
              await onChange(option);
              if (refreshAfterChange) router.refresh();
            });
          }}
          className={
            "whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 sm:px-3.5 sm:text-[13px] " +
            (value === option
              ? "bg-brand text-on-brand"
              : "text-brand hover:bg-surface/60")
          }
        >
          {labels[option]}
        </button>
      ))}
    </div>
  );
}
