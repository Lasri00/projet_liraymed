import { useTranslations } from "next-intl";
import type { Disponibilite } from "@/shared/catalogue-types";

// Invariant CLAUDE.md #2 : trois états, libellé et couleur distincts pour
// chacun. Jamais une quantité.
const TONS: Record<Disponibilite, { bg: string; fg: string; dot: string }> = {
  en_stock: { bg: "var(--ok-bg)", fg: "var(--ok-fg)", dot: "var(--ok-dot)" },
  sur_commande: { bg: "var(--warn-bg)", fg: "var(--warn-fg)", dot: "var(--warn-dot)" },
  rupture: { bg: "var(--off-bg)", fg: "var(--off-fg)", dot: "var(--off-dot)" },
};

export function AvailabilityBadge({ value }: { value: Disponibilite }) {
  const t = useTranslations("Disponibilite");
  const ton = TONS[value];

  return (
    <span className="chip" style={{ background: ton.bg, color: ton.fg }}>
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full"
        style={{ background: ton.dot }}
      />
      {t(value)}
    </span>
  );
}
