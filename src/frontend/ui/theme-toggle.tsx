"use client";

import { useTranslations } from "next-intl";
import { setTheme } from "@/backend/actions/preferences";
import { THEMES, type Theme } from "@/shared/preference-constants";
import { SegmentedToggle } from "./segmented-toggle";

export function ThemeToggle({ theme }: { theme: Theme }) {
  const t = useTranslations("Theme");

  return (
    <SegmentedToggle
      value={theme}
      options={THEMES}
      labels={{ light: t("light"), dark: t("dark") }}
      ariaLabel={`${t("light")} / ${t("dark")}`}
      onChange={setTheme}
    />
  );
}
