// Types et constantes partagés entre code serveur (lib/preferences.ts,
// lib/actions.ts) et composants client (les bascules). Ne doit importer
// aucune API serveur (next/headers, etc.) : ce fichier finit dans le bundle
// client.

export type Theme = "light" | "dark";
export type Profil = "particulier" | "professionnel";

export const THEME_COOKIE = "theme";
export const PROFIL_COOKIE = "profil";

export const THEMES: readonly Theme[] = ["light", "dark"];
// Mêmes valeurs que le type `profil` de db/schema.sql.
export const PROFILS: readonly Profil[] = ["particulier", "professionnel"];

export const DEFAULT_THEME: Theme = "light";
// Aucune instruction client sur le profil par défaut : "particulier" retenu
// comme audience la plus large. À confirmer.
export const DEFAULT_PROFIL: Profil = "particulier";

export const PREFERENCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 an
