import { defaultMessages } from '@/i18n/messages';
import { LOCALE_COOKIE_NAME, routing } from '@/i18n/routing';
import { parse as parseCookies } from 'cookie';
import type { Locale } from 'next-intl';

import { getBaseUrl } from './urls/urls';

/**
 * Mock auth configuration for a content-only site
 */
export const auth = {
  options: {
    baseURL: getBaseUrl(),
    appName: defaultMessages.Metadata.name,
  },
};

/**
 * Gets the locale from a request by parsing the cookies
 * If no locale is found in the cookies, returns the default locale
 *
 * @param request - The request to get the locale from
 * @returns The locale from the request or the default locale
 */
export function getLocaleFromRequest(request?: Request): Locale {
  const cookies = parseCookies(request?.headers.get('cookie') ?? '');
  return (cookies[LOCALE_COOKIE_NAME] as Locale) ?? routing.defaultLocale;
}