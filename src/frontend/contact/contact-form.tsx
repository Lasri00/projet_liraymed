"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { envoyerDemandeContact, type ContactState } from "@/backend/actions/contact";
import { PROFILS, type Profil } from "@/shared/preference-constants";

function SubmitButton() {
  const t = useTranslations("ContactForm");
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary w-full sm:w-fit" disabled={pending}>
      {pending ? t("sending") : t("submit")}
    </button>
  );
}

export function ContactForm({ profil }: { profil: Profil }) {
  const t = useTranslations();
  const [state, action] = useActionState<ContactState, FormData>(envoyerDemandeContact, {
    status: "idle",
  });

  function erreur(champ: "nom" | "email" | "message") {
    const code = state.fieldErrors?.[champ];
    if (!code) return null;
    return code === "invalid" ? t("ContactForm.invalidEmail") : t("ContactForm.requiredField");
  }

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      {/* Leurre anti-robot, masqué aux personnes et aux lecteurs d'écran. */}
      <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <fieldset className="sm:col-span-2">
        <legend className="field-label">{t("ContactForm.profil")}</legend>
        <div className="flex flex-wrap gap-5">
          {PROFILS.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="profil"
                value={option}
                defaultChecked={profil === option}
                className="accent-brand"
              />
              {t(`Profil.${option}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="field-label" htmlFor="nom">
          {t("ContactForm.name")}
        </label>
        <input id="nom" name="nom" maxLength={160} autoComplete="name" className="field" />
        <FieldError message={erreur("nom")} />
      </div>

      <div>
        <label className="field-label" htmlFor="email">
          {t("ContactForm.email")}
        </label>
        <input id="email" name="email" type="email" maxLength={160} autoComplete="email" className="field" />
        <FieldError message={erreur("email")} />
      </div>

      <div>
        <label className="field-label" htmlFor="telephone">
          {t("ContactForm.phone")}
        </label>
        <input id="telephone" name="telephone" type="tel" maxLength={40} autoComplete="tel" className="field" />
      </div>

      <div>
        <label className="field-label" htmlFor="ville">
          {t("ContactForm.city")}
        </label>
        <input id="ville" name="ville" maxLength={80} autoComplete="address-level2" className="field" />
      </div>

      {/* Mention loi 09-08, affichée au-dessus du champ message. */}
      <p className="rounded-xl bg-surface-muted p-3.5 text-xs leading-relaxed text-muted sm:col-span-2">
        {t("ContactForm.privacyNotice")}
      </p>

      <div className="sm:col-span-2">
        <label className="field-label" htmlFor="message">
          {t("ContactForm.message")}
        </label>
        <textarea id="message" name="message" maxLength={4000} className="field" />
        <FieldError message={erreur("message")} />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <SubmitButton />
        {state.status === "success" && (
          <p role="status" className="text-sm font-medium" style={{ color: "var(--ok-fg)" }}>
            {t("ContactForm.success")}
          </p>
        )}
        {state.status === "error" && !state.fieldErrors && (
          <p role="alert" className="text-sm font-medium" style={{ color: "var(--off-fg)" }}>
            {t("ContactForm.error")}
          </p>
        )}
      </div>
    </form>
  );
}

function FieldError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs font-medium" style={{ color: "var(--off-fg)" }}>
      {message}
    </p>
  );
}
