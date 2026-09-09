import { cookies } from "next/headers";
import {
  DEFAULT_PROFIL,
  DEFAULT_THEME,
  PROFIL_COOKIE,
  PROFILS,
  THEME_COOKIE,
  THEMES,
  type Profil,
  type Theme,
} from "@/shared/preference-constants";

export async function getTheme(): Promise<Theme> {
  const store = await cookies();
  const value = store.get(THEME_COOKIE)?.value;
  return (THEMES as readonly string[]).includes(value ?? "")
    ? (value as Theme)
    : DEFAULT_THEME;
}

export async function getProfil(): Promise<Profil> {
  const store = await cookies();
  const value = store.get(PROFIL_COOKIE)?.value;
  return (PROFILS as readonly string[]).includes(value ?? "")
    ? (value as Profil)
    : DEFAULT_PROFIL;
}
