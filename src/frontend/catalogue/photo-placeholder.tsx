/**
 * Réservation visuelle en attendant les photos produits.
 * Les visuels sont fournis par le client (charte et médias, cf. CLAUDE.md) :
 * ce bloc disparaît dès qu'une image est renseignée.
 */
export function PhotoPlaceholder({ label }: { label?: string }) {
  return (
    <span className="flex flex-col items-center justify-center gap-2 text-faint">
      <svg
        viewBox="0 0 24 24"
        className="size-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 16-5-5-8 9" />
      </svg>
      {label && (
        <span className="px-4 text-center text-[11px] uppercase tracking-[0.06em]">
          {label}
        </span>
      )}
    </span>
  );
}
