import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getProfil } from "@/backend/queries/preferences";
import {
  getCategoriesPhares,
  getNombreProduitsPublies,
  getProduitsRecents,
} from "@/backend/queries/catalogue";
import { ProductCard } from "@/frontend/catalogue/product-card";
import { CategoryIllustration } from "@/frontend/catalogue/category-illustration";
import { PhotoPlaceholder } from "@/frontend/catalogue/photo-placeholder";
import { trad } from "@/shared/trad";

const SERVICES = ["sav", "conseil", "projet", "livraison"] as const;

const SERVICE_ICONS: Record<(typeof SERVICES)[number], React.ReactNode> = {
  sav: <path d="M12 3a9 9 0 0 0-9 9v4a2 2 0 0 0 2 2h2v-6H5a7 7 0 0 1 14 0h-2v6h2a2 2 0 0 0 2-2v-4a9 9 0 0 0-9-9Z" />,
  conseil: <path d="M12 3a7 7 0 0 0-4 12.7V18h8v-2.3A7 7 0 0 0 12 3ZM9 21h6" />,
  projet: <path d="M4 20V8l8-5 8 5v12M9 20v-6h6v6" />,
  livraison: (
    <>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </>
  ),
};

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const profil = await getProfil();

  const [categories, recents, nombreProduits] = await Promise.all([
    getCategoriesPhares(profil, 4),
    getProduitsRecents(profil, 4),
    getNombreProduitsPublies(profil),
  ]);

  const motsDuTitre = t("HomePage.heroTitle").split(" ");

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <svg
          className="pointer-events-none absolute inset-0 size-full opacity-20"
          viewBox="0 0 1440 780"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="1180" cy="140" r="320" stroke="var(--mint-bright)" strokeWidth="1" />
          <circle cx="1180" cy="140" r="220" stroke="var(--mint-bright)" strokeWidth="1" />
          <circle cx="1180" cy="140" r="120" stroke="var(--mint-bright)" strokeWidth="1" />
          <path d="M0 520 L1440 380" stroke="var(--mint-bright)" strokeWidth="1" />
          <path d="M0 600 L1440 460" stroke="var(--mint-bright)" strokeWidth="1" />
        </svg>

        <div className="container-page relative grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:py-24">
          <div className="flex flex-col gap-6">
            <span className="chip w-fit bg-mint-bright/15 text-mint-soft">
              <svg
                viewBox="0 0 24 24"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {t("HomePage.heroBadge")}
            </span>

            <h1 className="hero-title font-display text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-[52px]">
              {motsDuTitre.map((mot, index) => (
                <span key={`${mot}-${index}`} style={{ animationDelay: `${index * 0.08}s` }}>
                  {mot}
                  {index < motsDuTitre.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-mint-pale">
              {t("HomePage.heroSubtitle")}
            </p>

            <div className="flex flex-wrap gap-3.5">
              <Link href="/catalogue" className="btn btn-primary">
                {t("HomePage.ctaProducts")}
                <svg
                  viewBox="0 0 24 24"
                  className="flip-rtl size-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                {t("HomePage.ctaContact")}
              </Link>
            </div>
          </div>

          {/* Visuel hero — fourni par le client. */}
          <div className="flex h-64 items-center justify-center rounded-3xl border border-mint-bright/30 bg-hero-panel lg:h-[420px]">
            <PhotoPlaceholder label={t("HomePage.heroMediaHint")} />
          </div>
        </div>

        {/* Bandeau de statistiques, effet verre dépoli. */}
        <div className="container-page relative pb-14">
          <dl className="grid grid-cols-1 gap-5 rounded-[18px] border border-white/15 bg-white/8 p-6 backdrop-blur-md sm:grid-cols-3">
            {(["clients", "references", "villes"] as const).map((cle, index) => (
              <div
                key={cle}
                className={
                  "flex flex-col gap-0.5 " +
                  (index > 0 ? "sm:border-s sm:border-white/15 sm:ps-7" : "")
                }
              >
                <dt className="order-2 text-sm text-mint-pale">
                  {t(`HomePage.stats.${cle}`)}
                </dt>
                <dd className="order-1 font-display text-3xl font-extrabold text-white">
                  {cle === "references"
                    ? `${nombreProduits}+`
                    : t(`HomePage.stats.${cle}Value`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Catégories phares */}
      {categories.length > 0 && (
        <section className="container-page flex flex-col gap-8 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">{t("HomePage.categoriesEyebrow")}</span>
              <h2 className="text-3xl font-bold sm:text-4xl">
                {t("HomePage.categoriesTitle")}
              </h2>
            </div>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-hover"
            >
              {t("HomePage.allCatalogue")}
              <svg
                viewBox="0 0 24 24"
                className="flip-rtl size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((categorie) => (
              <Link
                key={categorie.id}
                href={`/catalogue?categorie=${categorie.slug}`}
                className="card-lift surface-card flex flex-col overflow-hidden"
              >
                <span className="flex h-44 items-center justify-center bg-mint">
                  <CategoryIllustration categorie={categorie.slug} className="size-14" />
                </span>
                <span className="flex items-center justify-between gap-3 p-5">
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-display truncate text-lg font-bold">
                      {trad(categorie.nom, locale)}
                    </span>
                    <span className="text-[13px] text-muted">
                      {t("Catalogue.productCount", { count: categorie.nombreProduits })}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="flip-rtl size-5 shrink-0 text-brand"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Derniers produits ajoutés */}
      {recents.length > 0 && (
        <section className="container-page flex flex-col gap-8 pb-20">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">{t("HomePage.latestEyebrow")}</span>
            <h2 className="text-3xl font-bold sm:text-4xl">{t("HomePage.latestTitle")}</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recents.map((produit) => (
              <ProductCard key={produit.id} produit={produit} profil={profil} />
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      <section className="bg-surface-muted py-20">
        <div className="container-page flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">{t("HomePage.servicesEyebrow")}</span>
            <h2 className="text-3xl font-bold sm:text-4xl">{t("HomePage.servicesTitle")}</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, index) => (
              <article
                key={service}
                className="surface-card rise flex flex-col gap-3 p-6"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-mint text-brand">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[22px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {SERVICE_ICONS[service]}
                  </svg>
                </span>
                <h3 className="text-base font-bold">{t(`Services.${service}.title`)}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`Services.${service}.text`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaire : le fournisseur MLS, en défilement horizontal. */}
      <section className="overflow-hidden border-y border-line py-9">
        <p className="container-page mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {t("HomePage.partnerTitle")}
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[0, 1].map((bloc) => (
              <div key={bloc} className="flex shrink-0" aria-hidden={bloc === 1}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <span
                    key={index}
                    className="font-display mx-12 text-2xl font-extrabold tracking-[0.28em] text-faint"
                  >
                    MLS
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact rapide */}
      <section className="container-page py-20">
        <div className="surface-card flex flex-col items-start gap-6 overflow-hidden bg-hero p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              {t("HomePage.contactTitle")}
            </h2>
            <p className="text-mint-pale">{t("HomePage.contactText")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              {t("HomePage.ctaContact")}
            </Link>
            <Link href="/catalogue" className="btn btn-ghost">
              {t("HomePage.ctaProducts")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
