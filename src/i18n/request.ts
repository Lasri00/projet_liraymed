import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

type Messages = Record<string, unknown>;

async function loadMessages(locale: string): Promise<Messages> {
  return (await import(`../../messages/${locale}.json`)).default;
}

// Invariant CLAUDE.md #3 : une traduction absente affiche le français,
// jamais une chaîne vide. On fusionne donc chaque locale sur la base
// française plutôt que de laisser next-intl retomber sur la clé brute.
function withFrenchFallback(french: Messages, override: Messages): Messages {
  const merged: Messages = {...french};
  for (const key of Object.keys(override)) {
    const frenchValue = french[key];
    const overrideValue = override[key];
    const bothAreObjects =
      frenchValue &&
      overrideValue &&
      typeof frenchValue === 'object' &&
      typeof overrideValue === 'object' &&
      !Array.isArray(frenchValue) &&
      !Array.isArray(overrideValue);

    merged[key] = bothAreObjects
      ? withFrenchFallback(frenchValue as Messages, overrideValue as Messages)
      : overrideValue;
  }
  return merged;
}

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const french = await loadMessages('fr');
  const messages =
    locale === 'fr' ? french : withFrenchFallback(french, await loadMessages(locale));

  return {locale, messages};
});
