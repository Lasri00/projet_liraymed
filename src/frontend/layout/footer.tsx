import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Coordonnées et identité légale : cahier des charges, fiche projet.
const TELEPHONE = "+212 6 76 81 66 44";
const TELEPHONE_LIEN = "+212676816644";
const EMAIL = "liraymed@gmail.com";
const RC = "598339";
const ICE = "003378177000067";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "catalogue", href: "/catalogue" },
  { key: "contact", href: "/contact" },
] as const;

export function Footer() {
  const t = useTranslations();
  const annee = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0d1f24] text-[#c9d6d9]">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          {/* Variante claire : le bleu marine du logo disparaîtrait ici. */}
          <Image
            src="/logo-liraymed-light.png"
            alt={t("Brand.legalName")}
            width={1280}
            height={491}
            className="h-11 w-auto"
          />
          <p className="max-w-xs text-sm leading-relaxed">{t("Footer.about")}</p>
          <p className="text-sm text-[#9fb3b8]">
            SARL — RC {RC} · ICE {ICE}
          </p>
        </div>

        <nav className="flex flex-col gap-2.5 text-sm">
          <span className="font-semibold text-white">{t("Footer.navigation")}</span>
          {NAV_ITEMS.map((item) => (
            <Link key={item.key} href={item.href} className="w-fit hover:text-white">
              {t(`Nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 text-sm">
          <span className="font-semibold text-white">{t("Nav.contact")}</span>
          <a href={`tel:${TELEPHONE_LIEN}`} className="w-fit hover:text-white">
            {TELEPHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className="w-fit hover:text-white">
            {EMAIL}
          </a>
          <span className="text-[#9fb3b8]">{t("Footer.city")}</span>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {annee} {t("Brand.legalName")} — {t("Footer.city")}
          </span>
          <span className="text-[#9fb3b8]">{t("Footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
