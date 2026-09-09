import type { Metadata } from "next";
import { IBM_Plex_Sans, Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getProfil, getTheme } from "@/backend/queries/preferences";
import { Header } from "@/frontend/layout/header";
import { Footer } from "@/frontend/layout/footer";
import "../globals.css";

// Titres — reprise de la maquette validée.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Texte courant.
const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Les glyphes arabes ne sont pas couverts par les deux polices latines :
// ajoutée à la chaîne font-family dans globals.css, pas de bascule
// conditionnelle par locale — le navigateur résout par glyphe.
const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale });
  return {
    title: { default: t("HomePage.title"), template: `%s — ${t("HomePage.title")}` },
    description: t("HomePage.description"),
    // Balises alternatives par langue : le site est trilingue.
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Invariant CLAUDE.md #4 : l'arabe est en RTL complet.
const RTL_LOCALES = new Set(["ar"]);

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";

  // Préférences persistées en cookie, lues côté serveur — jamais de
  // détection du thème système (prefers-color-scheme n'intervient pas).
  const [theme, profil] = await Promise.all([getTheme(), getProfil()]);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${jakarta.variable} ${plex.variable} ${notoSansArabic.variable} ${theme === "dark" ? "dark" : ""} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <Header theme={theme} profil={profil} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
