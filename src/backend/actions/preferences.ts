"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  PREFERENCE_COOKIE_MAX_AGE,
  PROFIL_COOKIE,
  THEME_COOKIE,
  type Profil,
  type Theme,
} from "@/shared/preference-constants";

export async function setTheme(theme: Theme): Promise<void> {
  const store = await cookies();
  store.set(THEME_COOKIE, theme, {
    maxAge: PREFERENCE_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
  });
  revalidatePath("/", "layout");
}

export async function setProfil(profil: Profil): Promise<void> {
  const store = await cookies();
  store.set(PROFIL_COOKIE, profil, {
    maxAge: PREFERENCE_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
  });
  revalidatePath("/", "layout");
}
