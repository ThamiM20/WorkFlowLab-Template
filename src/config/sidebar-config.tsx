'use client';

import { isDemoWebsite } from '@/lib/demo';
import type { NestedMenuItem } from '@/types';
import {
  BellIcon,
  CircleUserRoundIcon,
  LockKeyholeIcon,
  Settings2Icon,
  SettingsIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { websiteConfig } from './website';

/**
 * Get sidebar config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://mksaas.com/docs/config/sidebar
 *
 * @returns The sidebar config with translated titles and descriptions
 */
export function useSidebarLinks(): NestedMenuItem[] {
  const t = useTranslations('Dashboard');

  // if is demo website, allow user to access admin and user pages, but data is fake
  const isDemo = isDemoWebsite();

  return [
    {
      title: t('settings.title'),
      icon: <Settings2Icon className="size-4 shrink-0" />,
      items: [
        {
          title: t('settings.profile.title'),
          icon: <CircleUserRoundIcon className="size-4 shrink-0" />,
          href: '/settings/profile',
          external: false,
        },
        {
          title: t('settings.security.title'),
          icon: <LockKeyholeIcon className="size-4 shrink-0" />,
          href: '/settings/security',
          external: false,
        },
        {
          title: t('settings.notification.title'),
          icon: <BellIcon className="size-4 shrink-0" />,
          href: '/settings/notifications',
          external: false,
        },
      ],
    },
  ];
}