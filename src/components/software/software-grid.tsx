'use client';

import Link from 'next/link';

import type { StrapiSoftware } from '@/lib/strapi/types';

interface SoftwareCardProps {
  software: StrapiSoftware;
  locale: string;
}

function SoftwareCard({ software, locale }: SoftwareCardProps) {
  // Check if software exists
  if (!software) {
    console.log('SoftwareCard: Missing software', software);
    return null;
  }

  // Access properties directly from the software object (new structure)
  const { id, name, description, slug, Category, pricing, logo } = software;

  console.log('SoftwareCard: Rendering software', { id, name, slug });

  return (
    <Link
      href={`/${locale}/software/${slug}`}
      className="block rounded-lg border p-6 transition-all hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        {logo?.url && (
          <div className="flex-shrink-0">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${logo.url}`}
              alt={`${name} logo`}
              width={60}
              height={60}
              className="rounded-lg border"
            />
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-lg font-semibold">{name || 'Untitled Software'}</h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {description || 'No description available'}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
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
      </div>
    </Link>
  );
}

interface SoftwareGridProps {
  softwareList: StrapiSoftware[];
  locale: string;
}

export function SoftwareGrid({ softwareList, locale }: SoftwareGridProps) {
  console.log('SoftwareGrid: Rendering software list', softwareList);
  
  // Filter out any invalid software items (new structure)
  const validSoftwareList = softwareList?.filter(
    (software) => software && software.name && software.slug
  ) || [];

  if (validSoftwareList.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
        <p className="text-muted-foreground">No software to display</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {validSoftwareList.map((software) => (
        <SoftwareCard key={software.id} software={software} locale={locale} />
      ))}
    </div>
  );
}