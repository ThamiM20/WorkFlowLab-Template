'use client';

import { HeaderSection } from '@/components/layout/header-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { strapiSoftware } from '@/lib/strapi/client';
import type { StrapiSoftware } from '@/lib/strapi/types';
import { ChevronRight, SquareCodeIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function SoftwareCatalogSection() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const [softwareList, setSoftwareList] = useState<StrapiSoftware[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        setLoading(true);
        const response = await strapiSoftware.getAll(locale);
        // Filter out any invalid software items and get only the first 6
        const validSoftware = response.data.filter(
          (software) => software && software.name && software.slug
        );
        setSoftwareList(validSoftware.slice(0, 6));
      } catch (err) {
        console.error('Error fetching software:', err);
        setError('Failed to load software catalog');
      } finally {
        setLoading(false);
      }
    };

    fetchSoftware();
  }, [locale]);

  if (loading) {
    return (
      <section id="software-catalog" className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <HeaderSection
            title={t('softwareCatalog.title')}
            subtitle={t('softwareCatalog.subtitle')}
            description={t('softwareCatalog.description')}
            subtitleAs="h2"
            descriptionAs="p"
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="p-6 bg-transparent">
                <div className="animate-pulse">
                  <div className="h-10 w-10 bg-muted rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="software-catalog" className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <HeaderSection
            title={t('softwareCatalog.title')}
            subtitle={t('softwareCatalog.subtitle')}
            description={t('softwareCatalog.description')}
            subtitleAs="h2"
            descriptionAs="p"
          />
          <div className="mt-12 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="software-catalog" className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <HeaderSection
          title={t('softwareCatalog.title')}
          subtitle={t('softwareCatalog.subtitle')}
          description={t('softwareCatalog.description')}
          subtitleAs="h2"
          descriptionAs="p"
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {softwareList
            .filter((software) => software && software.name && software.slug)
            .map((software) => (
              <SoftwareCard
                key={software.id}
                software={software}
                locale={locale}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

const SoftwareCard = ({
  software,
  locale,
}: {
  software: StrapiSoftware;
  locale: string;
}) => {
  // Check if software exists (new structure)
  if (!software || !software.name || !software.slug) {
    console.error('SoftwareCard: Missing software data', software);
    return (
      <Card className="p-6 bg-transparent hover:bg-accent dark:hover:bg-card">
        <div className="relative">
          <div className="flex items-center justify-center size-10 mb-4">
            <SquareCodeIcon className="size-10 text-muted-foreground" />
          </div>
          <div className="space-y-2 py-6">
            <h3 className="text-base font-medium">Invalid Software Data</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              Software data is missing or invalid
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const { name, description, slug, Category, pricing, logo } = software;

  return (
    <Card className="p-6 bg-transparent hover:bg-accent dark:hover:bg-card">
      <div className="relative">
        <div className="flex items-center justify-center size-10 mb-4">
          {logo?.url ? (
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${logo.url}`}
              alt={`${name} logo`}
              width={40}
              height={40}
              className="rounded-lg border"
            />
          ) : (
            <SquareCodeIcon className="size-10 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-2 py-6">
          <h3 className="text-base font-medium">{name || 'Untitled Software'}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {description || 'No description available'}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {Category && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                {Category}
              </span>
            )}
            {pricing && (
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                {pricing}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1 pr-2 shadow-none"
          >
            <LocaleLink href={`/${locale}/software/${slug}`}>
              Learn More
              <ChevronRight className="ml-0 !size-3.5 opacity-50" />
            </LocaleLink>
          </Button>
        </div>
      </div>
    </Card>
  );
};