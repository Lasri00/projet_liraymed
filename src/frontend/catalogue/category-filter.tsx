import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { CategorieArbre } from "@/shared/catalogue-types";
import { trad } from "@/shared/trad";

/** Construit une URL de catalogue en conservant la recherche en cours. */
function lien(slug: string | null, recherche: string | undefined) {
  const params = new URLSearchParams();
  if (slug) params.set("categorie", slug);
  if (recherche) params.set("q", recherche);
  const query = params.toString();
  return query ? `/catalogue?${query}` : "/catalogue";
}

export function CategoryFilter({
  arbre,
  categorieActive,
  recherche,
}: {
  arbre: readonly CategorieArbre[];
  categorieActive?: string;
  recherche?: string;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  return (
    <nav aria-label={t("Catalogue.categories")} className="flex flex-col gap-1">
      <span className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
        {t("Catalogue.categories")}
      </span>

      <Link
        href={lien(null, recherche)}
        aria-current={categorieActive ? undefined : "true"}
        className={
          "flex items-center justify-between rounded-[10px] px-3 py-2.5 text-sm font-semibold transition-colors " +
          (categorieActive ? "text-ink hover:bg-surface-muted" : "bg-mint text-brand")
        }
      >
        {t("Catalogue.allCategories")}
      </Link>

      {arbre.map((racine) => {
        const racineActive = racine.slug === categorieActive;
        const enfantActif = racine.enfants.some((e) => e.slug === categorieActive);
        const ouverte = racineActive || enfantActif;

        return (
          <div key={racine.id} className="flex flex-col">
            <Link
              href={lien(racine.slug, recherche)}
              aria-current={racineActive ? "true" : undefined}
              className={
                "flex items-center justify-between gap-2 rounded-[10px] px-3 py-2.5 text-sm font-semibold transition-colors " +
                (racineActive ? "bg-mint text-brand" : "text-ink hover:bg-surface-muted")
              }
            >
              <span className="flex min-w-0 items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className={"size-3.5 shrink-0 " + (ouverte ? "" : "flip-rtl")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {ouverte ? <path d="m6 9 6 6 6-6" /> : <path d="m9 6 6 6-6 6" />}
                </svg>
                <span className="truncate">{trad(racine.nom, locale)}</span>
              </span>
              <span className="shrink-0 text-[13px] font-normal text-muted">
                ({racine.nombreProduits})
              </span>
            </Link>

            {ouverte && racine.enfants.length > 0 && (
              <div className="mt-0.5 flex flex-col gap-0.5 ps-6">
                {racine.enfants.map((enfant) => {
                  const actif = enfant.slug === categorieActive;
                  return (
                    <Link
                      key={enfant.id}
                      href={lien(enfant.slug, recherche)}
                      aria-current={actif ? "true" : undefined}
                      className={
                        "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors " +
                        (actif
                          ? "bg-surface-muted font-semibold text-ink"
                          : "text-ink hover:bg-surface-muted")
                      }
                    >
                      <span className="truncate">{trad(enfant.nom, locale)}</span>
                      <span className="shrink-0 text-muted">({enfant.nombreProduits})</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
