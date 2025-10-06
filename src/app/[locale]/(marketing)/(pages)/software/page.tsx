import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SoftwareGrid } from '@/components/software/software-grid';
import { strapiSoftware } from '@/lib/strapi/client';
import type { StrapiCollectionResponse, StrapiSoftware } from '@/lib/strapi/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SoftwarePage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function SoftwarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage.softwareCatalog' });
  
  // Fetch software listings from Strapi
  let softwareList: StrapiCollectionResponse<StrapiSoftware> | null = null;
  let error: string | null = null;

  try {
    softwareList = await strapiSoftware.getAll(locale);
  } catch (err) {
    console.error('Error fetching software listings:', err);
    error = 'Failed to load software listings';
  }

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('subtitle')}
          </p>
        </div>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            {error}
          </div>
        ) : softwareList && softwareList.data.length > 0 ? (
          <SoftwareGrid softwareList={softwareList.data} locale={locale} />
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-muted-foreground">No software listings found</p>
          </div>
        )}
      </div>
    </section>
  );
}