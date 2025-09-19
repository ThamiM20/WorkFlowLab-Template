'use client';

import { ResetPasswordCard } from '@/components/settings/security/reset-password-card';
import { UpdatePasswordCard } from '@/components/settings/security/update-password-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

/**
 * PasswordCardWrapper renders either:
 * - UpdatePasswordCard: if the user has a credential provider (email/password login)
 * - ResetPasswordCard: if the user only has social login providers and has an email
 * - PasswordSkeletonCard: when this component is still loading
 * - Nothing: if the user has no credential provider and no email
 */
export function PasswordCardWrapper() {
  // Since we're removing authentication, we'll use mock data
  const hasCredentialProvider = true;
  const isLoading = false;
  const error = null;
  const session = {
    user: {
      id: 'user-id',
      email: 'user@example.com',
    },
  };

  // Handle error state
  if (error) {
    console.error('check credential provider error:', error);
    return null;
  }

  // Don't render anything while loading
  if (isLoading) {
    return <PasswordSkeletonCard />;
  }

  // If user has credential provider, show UpdatePasswordCard
  if (hasCredentialProvider) {
    return <UpdatePasswordCard />;
  }

  // If user doesn't have credential provider but has an email, show ResetPasswordCard
  // The forgot password flow requires an email address
  if (session?.user?.email) {
    return <ResetPasswordCard />;
  }

  // If user has no credential provider and no email, don't show anything
  return null;
}

function PasswordSkeletonCard() {
  const t = useTranslations('Dashboard.settings.security.updatePassword');
  return (
    <Card className={cn('w-full overflow-hidden pt-6 pb-0 flex flex-col')}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3 flex-1">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-6 w-full" />
      </CardContent>
      <CardFooter className="px-6 py-4 flex justify-end items-center bg-muted rounded-none">
        <Skeleton className="h-8 w-1/4" />
      </CardFooter>
    </Card>
  );
}