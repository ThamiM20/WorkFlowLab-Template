'use client';

import { FormError } from '@/components/shared/form-error';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLocaleRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Delete user account
 *
 * This component allows users to permanently delete their account.
 * It includes a confirmation dialog to prevent accidental deletions.
 */
export function DeleteAccountCard() {
  const t = useTranslations('Dashboard.settings.security.deleteAccount');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const router = useLocaleRouter();

  // Handle account deletion
  const handleDeleteAccount = async () => {
    // Simulate deleting the user's account
    setIsDeleting(true);
    setError('');
    
    setTimeout(() => {
      setIsDeleting(false);
      setShowConfirmation(false);
      toast.success(t('success'));
      router.replace('/');
    }, 1000);
  };

  return (
    <Card
      className={cn(
        'w-full border-destructive/50 overflow-hidden pt-6 pb-0 flex flex-col'
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg font-bold text-destructive">
          {t('title')}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{t('warning')}</p>

        {error && (
          <div className="mt-4">
            <FormError message={error} />
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-2 px-6 py-4 flex justify-end items-center bg-muted rounded-none">
        <Button
          variant="destructive"
          onClick={() => setShowConfirmation(true)}
          className="cursor-pointer"
        >
          {t('button')}
        </Button>
      </CardFooter>

      {/* Confirmation AlertDialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              {t('confirmTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('confirmDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="cursor-pointer"
            >
              {t('cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="cursor-pointer"
            >
              {isDeleting ? t('deleting') : t('confirm')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}