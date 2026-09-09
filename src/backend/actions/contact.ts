"use server";

import { PROFILS, type Profil } from "@/shared/preference-constants";

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Clés de champs en défaut, résolues côté client via ContactForm.*. */
  fieldErrors?: Partial<Record<"nom" | "email" | "message", "required" | "invalid">>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function texte(data: FormData, cle: string): string {
  const valeur = data.get(cle);
  return typeof valeur === "string" ? valeur.trim() : "";
}

/**
 * Enregistrement d'une demande de contact.
 *
 * À FAIRE (tâche T7) : insérer dans `demandes_contact` (db/schema.sql) et
 * notifier par email. La base n'est pas encore branchée sur le projet ; la
 * demande est pour l'instant journalisée côté serveur, jamais perdue
 * silencieusement, et le formulaire reste fonctionnel pour la recette.
 */
export async function envoyerDemandeContact(
  _previous: ContactState,
  data: FormData,
): Promise<ContactState> {
  // Champ leurre : rempli seulement par les robots.
  if (texte(data, "site")) return { status: "success" };

  const nom = texte(data, "nom");
  const email = texte(data, "email");
  const telephone = texte(data, "telephone");
  const ville = texte(data, "ville");
  const message = texte(data, "message");
  const profilBrut = texte(data, "profil");
  const profil: Profil = (PROFILS as readonly string[]).includes(profilBrut)
    ? (profilBrut as Profil)
    : "particulier";

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!nom) fieldErrors.nom = "required";
  if (!email) fieldErrors.email = "required";
  else if (!EMAIL.test(email)) fieldErrors.email = "invalid";
  if (!message) fieldErrors.message = "required";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  console.info(
    "[demande_contact] à insérer dans demandes_contact (T7)",
    JSON.stringify({ profil, nom, email, telephone, ville, message }),
  );

  return { status: "success" };
}
