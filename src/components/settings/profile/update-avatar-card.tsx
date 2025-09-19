'use client';

import { FormError } from '@/components/shared/form-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { websiteConfig } from '@/config/website';
import { cn } from '@/lib/utils';
import { uploadFileFromBrowser } from '@/storage/client';
import { User2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UpdateAvatarCardProps {
  className?: string;
}

/**
 * Update the user's avatar
 */
export function UpdateAvatarCard({ className }: UpdateAvatarCardProps) {
  // show nothing if storage is disabled or update avatar is disabled
  if (
    !websiteConfig.storage.enable ||
    !websiteConfig.features.enableUpdateAvatar
  ) {
    return null;
  }

  const t = useTranslations('Dashboard.settings.profile');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  // Since we're removing authentication, we'll use a mock user
  const [avatarUrl, setAvatarUrl] = useState('');
  const [tempAvatarUrl, setTempAvatarUrl] = useState('');

  // Mock user data
  const user = {
    name: 'User',
    image: avatarUrl,
  };

  const handleUploadClick = () => {
    // Create a hidden file input and trigger it
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg, image/webp';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    input.click();
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setError('');

    try {
      // Create a temporary URL for preview and store the original URL
      const tempUrl = URL.createObjectURL(file);
      setTempAvatarUrl(tempUrl);
      // Show temporary avatar immediately for better UX
      setAvatarUrl(tempUrl);

      // Upload the file to storage
      const result = await uploadFileFromBrowser(file, 'avatars');
      // console.log('uploadFileFromBrowser, result', result);
      const { url } = result;
      console.log('uploadFileFromBrowser, url', url);

      // Simulate updating the user's avatar
      setTimeout(() => {
        // Set the permanent avatar URL on success
        setAvatarUrl(url);
        toast.success(t('avatar.success'));
      }, 1000);
    } catch (error) {
      console.error('update avatar error:', error);
      setError(error instanceof Error ? error.message : t('avatar.fail'));
      // Restore the previous avatar if there was an error
      setAvatarUrl('');
      toast.error(t('avatar.fail'));
    } finally {
      setIsUploading(false);
      // Clean up temporary URL
      if (tempAvatarUrl) {
        URL.revokeObjectURL(tempAvatarUrl);
        setTempAvatarUrl('');
      }
    }
  };

  return (
    <Card
      className={cn(
        'w-full overflow-hidden py-0 pt-6 flex flex-col',
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {t('avatar.title')}
        </CardTitle>
        <CardDescription>{t('avatar.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-8">
          {/* avatar */}
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={avatarUrl ?? ''} alt={user.name} />
            <AvatarFallback>
              <User2Icon className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>

          {/* upload button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleUploadClick}
            disabled={isUploading}
            className="cursor-pointer"
          >
            {isUploading ? t('avatar.uploading') : t('avatar.uploadAvatar')}
          </Button>
        </div>

        <FormError message={error} />
      </CardContent>
      <CardFooter className="mt-auto px-6 py-4 flex justify-between items-center bg-muted rounded-none">
        <p className="text-sm text-muted-foreground">
          {t('avatar.recommendation')}
        </p>
      </CardFooter>
    </Card>
  );
}