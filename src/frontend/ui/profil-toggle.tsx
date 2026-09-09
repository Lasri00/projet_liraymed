"use client";

import { useTranslations } from "next-intl";
import { setProfil } from "@/backend/actions/preferences";
import { PROFILS, type Profil } from "@/shared/preference-constants";
import { SegmentedToggle } from "./segmented-toggle";

export function ProfilToggle({ profil }: { profil: Profil }) {
  const t = useTranslations("Profil");

  return (
    <SegmentedToggle
      value={profil}
      options={PROFILS}
      labels={{ particulier: t("particulier"), professionnel: t("professionnel") }}
      ariaLabel={`${t("particulier")} / ${t("professionnel")}`}
      onChange={setProfil}
    />
  );
}
