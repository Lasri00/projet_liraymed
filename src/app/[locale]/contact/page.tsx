import { getTranslations } from "next-intl/server";
import { getProfil } from "@/backend/queries/preferences";
import { ContactForm } from "@/frontend/contact/contact-form";

// Fiche projet du cahier des charges.
const TELEPHONE = "+212 6 76 81 66 44";
const TELEPHONE_LIEN = "+212676816644";
const EMAIL = "liraymed@gmail.com";
const INSTAGRAM = "https://www.instagram.com/liraymed";

export default async function ContactPage() {
  const t = await getTranslations();
  const profil = await getProfil();

  return (
    <main className="flex-1">
      <div className="container-page flex flex-col gap-10 py-12">
        <header className="flex max-w-2xl flex-col gap-3">
          <span className="eyebrow">{t("ContactPage.eyebrow")}</span>
          <h1 className="text-3xl font-extrabold sm:text-[44px]">{t("ContactPage.title")}</h1>
          <p className="text-[17px] text-muted">{t("ContactPage.intro")}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
          <section className="surface-card p-6 sm:p-8">
            <h2 className="mb-6 text-xl font-bold">{t("ContactPage.formTitle")}</h2>
            <ContactForm profil={profil} />
          </section>

          <aside className="flex flex-col gap-5">
            <div className="surface-card flex flex-col gap-4 p-6">
              <h2 className="text-xl font-bold">{t("ContactPage.directTitle")}</h2>
              <p className="text-sm leading-relaxed text-muted">{t("ContactPage.directText")}</p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={`https://wa.me/${TELEPHONE_LIEN}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                >
                  {t("Product.contactWhatsapp")}
                </a>
                <a href={`tel:${TELEPHONE_LIEN}`} className="btn btn-outline btn-sm">
                  {TELEPHONE}
                </a>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Instagram
                </a>
              </div>
              <a href={`mailto:${EMAIL}`} className="text-sm font-medium text-brand hover:underline">
                {EMAIL}
              </a>
            </div>

            <div className="surface-card flex flex-col gap-2 p-6">
              <h2 className="text-base font-bold">{t("ContactPage.addressTitle")}</h2>
              <p className="text-sm text-muted">{t("ContactPage.addressPending")}</p>
            </div>

            <div className="rounded-[18px] bg-mint p-6">
              <h2 className="mb-1.5 text-base font-bold text-brand">
                {t("ContactPage.deliveryTitle")}
              </h2>
              <p className="text-sm leading-relaxed text-brand/85">
                {t("ContactPage.deliveryText")}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
