import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { ProduitPublic } from "@/shared/catalogue-types";
import type { Profil } from "@/shared/preference-constants";
import { trad, tradDescription } from "@/shared/trad";
import { AvailabilityBadge } from "./availability-badge";
import { CategoryIllustration, slugDeCategorie } from "./category-illustration";

export function ProductCard({
  produit,
  profil,
}: {
  produit: ProduitPublic;
  profil: Profil;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  const nom = trad(produit.nom, locale);
  const description = tradDescription(
    { pro: produit.descriptionPro, particulier: produit.descriptionParticulier },
    profil,
    locale,
  );
  const photo = produit.images[0];

  return (
    <article className="card-lift surface-card relative flex flex-col overflow-hidden">
      <div className="relative flex h-56 items-center justify-center bg-surface-muted">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.url}
            alt={photo.alt ?? nom}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <CategoryIllustration categorie={slugDeCategorie(produit.categorieId)} />
        )}
        <span className="absolute start-3 top-3">
          <AvailabilityBadge value={produit.disponibilite} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted">
            {t("Product.reference")} {produit.referenceFournisseur}
          </span>
          <h3 className="text-[17px] leading-snug font-bold">
            <Link
              href={`/catalogue/${produit.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {nom}
            </Link>
          </h3>
          {description && (
            <p className="line-clamp-2 text-[13px] text-muted">{description}</p>
          )}
        </div>

        {produit.variantes.length > 0 && (
          <ul className="flex items-center gap-1.5" aria-label={t("Product.colours")}>
            {produit.variantes.slice(0, 5).map((variante) => (
              <li
                key={variante.id}
                title={trad(variante.nom, locale)}
                className="size-3.5 rounded-full border border-line-strong"
                style={{ background: variante.hex }}
              />
            ))}
            {produit.variantes.length > 5 && (
              <li className="text-[11px] text-muted">+{produit.variantes.length - 5}</li>
            )}
          </ul>
        )}

        {/* Invariant #5 : aucun prix affiché, nulle part. */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="text-sm font-semibold text-brand">
            {t("Product.priceOnRequest")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
            {t("Product.see")}
            <svg
              viewBox="0 0 24 24"
              className="flip-rtl size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
