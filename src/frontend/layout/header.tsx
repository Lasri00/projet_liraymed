"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleToggle } from "../ui/locale-toggle";
import { ProfilToggle } from "../ui/profil-toggle";
import { ThemeToggle } from "../ui/theme-toggle";
import { Wordmark } from "./wordmark";
import type { Profil, Theme } from "@/shared/preference-constants";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "catalogue", href: "/catalogue" },
  { key: "contact", href: "/contact" },
] as const;

const SCROLL_THRESHOLD = 24;
// Hauteur réservée pour le header non replié (cf. le spacer plus bas et
// le point de départ du tiroir/voile mobile, qui restent sous le header).
const HEADER_HEIGHT_CLASS = "h-18";
const BELOW_HEADER_CLASS = "top-18";

export function Header({ theme, profil }: { theme: Theme; profil: Profil }) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Filet de sécurité : ferme le tiroir si la route change par un autre
  // biais qu'un clic sur un lien du tiroir (retour navigateur, etc.).
  // Ajustement pendant le rendu plutôt qu'un effet : évite le rendu
  // intermédiaire "périmé" que useEffect(() => setState(...), [pathname])
  // provoquerait (cf. règle react-hooks/set-state-in-effect).
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setDrawerOpen(false);
  }

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    drawerRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <>
      {/* z-50 : reste au-dessus du voile du tiroir mobile (z-40), qui
          démarre sous le header pour que les trois bascules restent
          joignables même tiroir ouvert. */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
        <div
          className={
            "flex items-center justify-between gap-3 transition-all duration-300 " +
            (scrolled
              ? "mt-3 w-[min(94%,64rem)] rounded-full border border-line bg-bg/80 px-4 py-2 shadow-[0_16px_32px_-24px_rgb(13_31_36/0.4)] backdrop-blur-md"
              : "w-full border-b border-line bg-bg/85 px-5 py-3 backdrop-blur-md lg:px-10")
          }
        >
          <Link href="/" className="shrink-0">
            <Wordmark compact={scrolled} />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                data-active={isActive(item.href)}
                className="nav-link"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            {/* Sous sm, seuls logo + langue + menu tiennent dans la barre :
                thème et profil passent dans le tiroir mobile ci-dessous. */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <div className="hidden items-center gap-1.5 lg:flex lg:gap-2">
                <ProfilToggle profil={profil} />
              </div>
              <LocaleToggle />
              <div className="hidden items-center gap-1.5 sm:flex sm:gap-2">
                <ThemeToggle theme={theme} />
              </div>
            </div>

            <button
              type="button"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen((open) => !open)}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-muted md:hidden"
            >
              <span className="sr-only">{drawerOpen ? t("closeMenu") : t("openMenu")}</span>
              {drawerOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Réserve l'espace du header (position fixed) pour ne pas masquer
          le contenu qui suit dans le flux normal. */}
      <div aria-hidden="true" className={HEADER_HEIGHT_CLASS} />

      {/* Voile + tiroir : démarrent sous le header (top-18), jamais
          au-dessus, pour que les bascules du header restent cliquables. */}
      <div
        className={
          `fixed inset-x-0 bottom-0 z-40 ${BELOW_HEADER_CLASS} transition-opacity duration-300 md:hidden ` +
          (drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")
        }
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
        <div
          ref={drawerRef}
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t("openMenu")}
          tabIndex={-1}
          className={
            "absolute inset-y-0 end-0 flex w-[min(84%,20rem)] flex-col gap-6 border-s border-line bg-surface p-6 shadow-xl transition-transform duration-300 " +
            (drawerOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full")
          }
        >
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setDrawerOpen(false)}
                className={
                  "rounded-xl px-3 py-2.5 text-[15px] font-semibold transition-colors " +
                  (isActive(item.href)
                    ? "bg-mint text-brand"
                    : "text-ink hover:bg-surface-muted")
                }
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Miroir de la barre : le profil sort de la barre sous lg, le
              thème sous sm. Les deux restent joignables ici. */}
          <div className="mt-auto flex flex-col gap-4 border-t border-line pt-5">
            <div className="lg:hidden">
              <ProfilToggle profil={profil} />
            </div>
            <div className="sm:hidden">
              <ThemeToggle theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
