import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getProfil } from "@/backend/queries/preferences";
import { chercherProduits, getCategoriesArbre } from "@/backend/queries/catalogue";
import { CategoryFilter } from "@/frontend/catalogue/category-filter";
import { ProductCard } from "@/frontend/catalogue/product-card";
import { CategoryIllustration } from "@/frontend/catalogue/category-illustration";
import { PhotoPlaceholder } from "@/frontend/catalogue/photo-placeholder";
import { trad } from "@/shared/trad";

type SearchParams = Promise<{ categorie?: string; q?: string; page?: string }>;

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const profil = await getProfil();
  const { categorie: categorieSlug, q, page } = await searchParams;

  const [arbre, resultat] = await Promise.all([
    getCategoriesArbre(profil),
    chercherProduits({
      profil,
      categorieSlug,
      recherche: q,
      page: Number.parseInt(page ?? "1", 10) || 1,
    }),
  ]);

  function lienPage(cible: number) {
    const params = new URLSearchParams();
    if (categorieSlug) params.set("categorie", categorieSlug);
    if (q) params.set("q", q);
    if (cible > 1) params.set("page", String(cible));
    const query = params.toString();
    return query ? `/catalogue?${query}` : "/catalogue";
  }

  const titre = resultat.categorie
    ? trad(resultat.categorie.nom, locale)
    : t("Catalogue.title", { profil: t(`Profil.${profil}`) });

  return (
    <main className="flex-1">
      <div className="container-page flex flex-col gap-6 pt-10">
        {/* Fil d'Ariane */}
        <nav aria-label={t("Catalogue.breadcrumb")} className="flex items-center gap-2 text-[13px] text-muted">
          <Link href="/" className="hover:text-ink">
            {t("Nav.home")}
          </Link>
          <svg
            viewBox="0 0 24 24"
            className="flip-rtl size-3 text-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
          {resultat.categorie ? (
            <>
              <Link href="/catalogue" className="hover:text-ink">
                {t("Nav.catalogue")}
              </Link>
              <svg
                viewBox="0 0 24 24"
                className="flip-rtl size-3 text-faint"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
              <span className="font-medium text-ink">{titre}</span>
            </>
          ) : (
            <span className="font-medium text-ink">{t("Nav.catalogue")}</span>
          )}
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold sm:text-[44px]">{titre}</h1>
            <p className="max-w-2xl text-[17px] text-muted">
              {t(`Catalogue.intro.${profil}`)}
            </p>
          </div>
          <span className="chip bg-mint px-3.5 py-2 text-[13px] text-brand">
            <svg
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6z" />
            </svg>
            {t("Catalogue.activeProfile", { profil: t(`Profil.${profil}`) })}
          </span>
        </div>

        {/* Accès rapide aux catégories racines */}
        {arbre.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {arbre.map((categorie) => (
              <Link
                key={categorie.id}
                href={`/catalogue?categorie=${categorie.slug}`}
                className="card-lift surface-card flex items-center gap-3.5 p-3"
              >
                <span className="flex size-16 shrink-0 items-center justify-center rounded-[10px] bg-mint">
                  <CategoryIllustration categorie={categorie.slug} className="size-8" />
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="truncate text-[15px] leading-tight font-bold">
                    {trad(categorie.nom, locale)}
                  </span>
                  <span className="text-xs font-semibold text-brand">
                    {t("Catalogue.viewProducts")} →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="container-page grid items-start gap-8 py-10 pb-24 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Filtres */}
        <aside className="surface-card flex flex-col gap-6 p-6 lg:sticky lg:top-24">
          <form method="get" action="/catalogue" className="flex flex-col gap-2">
            {categorieSlug && <input type="hidden" name="categorie" value={categorieSlug} />}
            <label className="field-label" htmlFor="q">
              {t("Common.search")}
            </label>
            <div className="flex gap-2">
              <input
                id="q"
                name="q"
                defaultValue={q ?? ""}
                maxLength={80}
                placeholder={t("Catalogue.searchPlaceholder")}
                className="field bg-bg"
              />
              <button type="submit" className="btn btn-primary btn-sm shrink-0" aria-label={t("Common.search")}>
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </div>
          </form>

          <CategoryFilter arbre={arbre} categorieActive={categorieSlug} recherche={q} />

          {(categorieSlug || q) && (
            <Link href="/catalogue" className="text-sm text-muted underline underline-offset-2 hover:text-ink">
              {t("Catalogue.resetFilters")}
            </Link>
          )}
        </aside>

        {/* Grille */}
        <section className="flex flex-col gap-5">
          <p className="text-sm text-muted">
            {t("Catalogue.productCount", { count: resultat.total })}
          </p>

          {resultat.produits.length === 0 ? (
            <div className="surface-card flex flex-col items-center gap-4 p-14 text-center">
              <p className="text-muted">{t("Catalogue.noResults")}</p>
              <Link href="/catalogue" className="btn btn-outline">
                {t("Catalogue.resetFilters")}
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {resultat.produits.map((produit) => (
                <ProductCard key={produit.id} produit={produit} profil={profil} />
              ))}
            </div>
          )}

          {resultat.pages > 1 && (
            <nav
              aria-label={t("Catalogue.pagination")}
              className="mt-6 flex items-center justify-center gap-4"
            >
              {resultat.page > 1 && (
                <Link href={lienPage(resultat.page - 1)} className="btn btn-outline btn-sm">
                  {t("Catalogue.previous")}
                </Link>
              )}
              <span className="text-sm text-muted">
                {t("Catalogue.pageOf", { page: resultat.page, pages: resultat.pages })}
              </span>
              {resultat.page < resultat.pages && (
                <Link href={lienPage(resultat.page + 1)} className="btn btn-outline btn-sm">
                  {t("Catalogue.next")}
                </Link>
              )}
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}
