'use client';

import { SidebarMain } from '@/components/dashboard/sidebar-main';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useSidebarLinks } from '@/config/sidebar-config';
import { LocaleLink } from '@/i18n/navigation';
import { Routes } from '@/routes';
import { useTranslations } from 'next-intl';
import type * as React from 'react';
import { useEffect, useState } from 'react';
import { Logo } from '../layout/logo';

/**
 * Dashboard sidebar
 */
export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const { state } = useSidebar();
  // console.log('sidebar currentUser:', currentUser);

  const sidebarLinks = useSidebarLinks();
  // Since we're removing authentication, we'll show all links
  const filteredSidebarLinks = sidebarLinks;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <LocaleLink href={Routes.Root}>
                <Logo className="size-5" />
                <span className="truncate font-semibold text-base">
                  {t('Metadata.name')}
                </span>
              </LocaleLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {mounted && <SidebarMain items={filteredSidebarLinks} />}
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-4">
        {/* Only show UI components when not in loading state */}
        {mounted && (
          <>
            {/* Since we're removing authentication, we won't show user profile */}
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}