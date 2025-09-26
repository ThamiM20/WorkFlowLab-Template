'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import {
  NewspaperIcon,
  SquareCodeIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { websiteConfig } from './website';

/**
 * Get navbar config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://workflowlab.com/docs/config/navbar
 *
 * @returns The navbar config with translated titles and descriptions
 */
export function useNavbarLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.navbar');

  return [
    ...(websiteConfig.blog.enable
      ? [
          {
            title: t('blog.title'),
            href: Routes.Blog,
            external: false,
            icon: <NewspaperIcon className="size-4 shrink-0" />,
          },
        ]
      : []),
    {
      title: 'Software',
      href: Routes.Software,
      external: false,
      icon: <SquareCodeIcon className="size-4 shrink-0" />,
    },
  ];
}
