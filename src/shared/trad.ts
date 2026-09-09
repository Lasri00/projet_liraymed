// Invariant CLAUDE.md #3 : tout texte affiché passe par le repli FR/AR/EN.
// Une traduction absente affiche le français, jamais une chaîne vide.
//
// Fichier partagé serveur/client : n'importer aucune API serveur.

import type { Locale } from "@/i18n/routing";

/** Trois colonnes traduites d'une même donnée, telles qu'elles sortent des vues. */
export type Traduit = {
  readonly fr: string | null;
  readonly ar?: string | null;
  readonly en?: string | null;
};

function propre(valeur: string | null | undefined): string {
  return valeur?.trim() ?? "";
}

/**
 * Choisit la variante de langue d'un contenu de catalogue.
 * Repli imposé : arabe ou anglais manquant → français.
 */
export function trad(champs: Traduit, locale: Locale): string {
  if (locale === "ar") return propre(champs.ar) || propre(champs.fr);
  if (locale === "en") return propre(champs.en) || propre(champs.fr);
  return propre(champs.fr);
}

/**
 * Description technique adaptée au profil actif, avec repli sur l'autre
 * description si celle du profil courant est vide, puis repli de langue.
 */
export function tradDescription(
  descriptions: { readonly pro: Traduit; readonly particulier: Traduit },
  profil: "particulier" | "professionnel",
  locale: Locale,
): string {
  const prefere = profil === "professionnel" ? descriptions.pro : descriptions.particulier;
  const secours = profil === "professionnel" ? descriptions.particulier : descriptions.pro;
  return trad(prefere, locale) || trad(secours, locale);
}
