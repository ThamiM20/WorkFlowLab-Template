'use client';

import type { MenuItem } from '@/types';
import { useTranslations } from 'next-intl';

/**
 * Get avatar config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://mksaas.com/docs/config/avatar
 *
 * @returns The avatar config with translated titles
 */
export function useAvatarLinks(): MenuItem[] {
  const t = useTranslations('Marketing.avatar');

  // Return empty array since we're removing authentication
  return [];
}
