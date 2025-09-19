'use client';

import { AuthCard } from '@/components/auth/auth-card';
import { FormError } from '@/components/shared/form-error';
import { FormSuccess } from '@/components/shared/form-success';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const ForgotPasswordForm = ({ className }: { className?: string }) => {
  const t = useTranslations('AuthPage.forgotPassword');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, setIsPending] = useState(false);
  const searchParams = useSearchParams();

  const ForgotPasswordSchema = z.object({
    email: z.email({
      message: t('emailRequired'),
    }),
  });

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Pre-fill the email field if it's provided in the URL
  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      form.setValue('email', emailFromUrl);
    }
  }, [searchParams, form]);

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    // Since we're removing authentication, this form will just show a success message
    setIsPending(true);
    setError('');
    setSuccess('');
    
    // Simulate API call delay
    setTimeout(() => {
      setIsPending(false);
      setSuccess(t('checkEmail'));
    }, 1000);
  };

  return (
    <AuthCard
      headerLabel={t('title')}
      className={cn('', className)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="name@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            size="lg"
            type="submit"
            className="w-full cursor-pointer"
          >
            {isPending && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            <span>{t('send')}</span>
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};