"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SegmentedToggle } from "./segmented-toggle";

// Codes courts et neutres (pas les noms natifs) : compact sur mobile,
// et un visiteur retrouve sa langue même sans lire celle affichée.
const LOCALE_LABELS: Record<Locale, string> = {
  fr: "FR",
  ar: "AR",
  en: "EN",
};

export function LocaleToggle() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SegmentedToggle
      value={locale}
      options={routing.locales}
      labels={LOCALE_LABELS}
      ariaLabel={t("language")}
      refreshAfterChange={false}
      onChange={async (next) => {
        router.replace(pathname, { locale: next });
      }}
    />
  );
}
