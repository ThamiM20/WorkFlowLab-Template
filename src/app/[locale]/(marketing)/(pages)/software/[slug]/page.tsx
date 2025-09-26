import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { strapiSoftware } from '@/lib/strapi/client';
import type { StrapiResponse, StrapiSoftware } from '@/lib/strapi/types';

interface SoftwareDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: SoftwareDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  // Fetch software data from Strapi
  let software: StrapiSoftware | null = null;
  try {
    const response = await strapiSoftware.getBySlug(slug, locale);
    software = response.data || null;
  } catch (err) {
    console.error('Error fetching software for metadata:', err);
  }

  if (!software) {
    return {
      title: 'Software Not Found',
    };
  }

  const t = await getTranslations({ locale, namespace: 'SoftwareDetailPage' });

  return {
    title: `${software.name} | ${t('title')}`,
    description: software.description,
  };
}

export default async function SoftwareDetailPage({
  params,
}: SoftwareDetailPageProps) {
  const { locale, slug } = await params;
  // Fetch software data from Strapi
  let software: StrapiSoftware | null = null;
  let error: string | null = null;

  try {
    const response = await strapiSoftware.getBySlug(slug, locale);
    software = response.data || null;
  } catch (err) {
    console.error('Error fetching software:', err);
    error = 'Failed to load software details';
  }

  // If software not found, return 404
  if (!software && !error) {
    notFound();
  }

  if (error || !software) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {error || 'Software not found'}
        </div>
      </div>
    );
  }

  const { name, description, longDescription, url, Category, tags, pricing, logo } =
    software;

  return (
    <div className="container py-8">
      <div className="mb-6">
        <a href={`/${locale}/software`} className="text-primary hover:underline">
          ← Back to Software Catalog
        </a>
      </div>

      <div className="mb-8 rounded-lg border p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {logo?.url && (
            <div className="flex-shrink-0">
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${logo.url}`}
                alt={`${name || 'Software'} logo`}
                width={120}
                height={120}
                className="rounded-lg border"
              />
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{name || 'Untitled Software'}</h1>
            <p className="text-muted-foreground mt-2">{description || 'No description available'}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {Category && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                  {Category}
                </span>
              )}
              {pricing && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                  {pricing}
                </span>
              )}
              {tags && tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            {url && (
              <div className="mt-6">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                >
                  Visit Website
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>

        {longDescription && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">About</h2>
            <div
              className="prose mt-4 max-w-none"
              dangerouslySetInnerHTML={{ __html: Array.isArray(longDescription) 
                ? longDescription.map(block => block.children.map(child => child.text).join('')).join('') 
                : typeof longDescription === 'string' 
                ? longDescription 
                : '' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}