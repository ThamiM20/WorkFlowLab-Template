import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PostGrid } from '@/components/blog/post-grid';
import { strapiPosts } from '@/lib/strapi/client';
import type { StrapiCollectionResponse, StrapiPost } from '@/lib/strapi/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function StrapiBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Fetch blog posts from Strapi
  let posts: StrapiCollectionResponse<StrapiPost> | null = null;
  let error: string | null = null;

  try {
    console.log('Fetching posts for locale:', locale);
    posts = await strapiPosts.getAll(locale);
    console.log('Fetched posts from Strapi:', JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    error = 'Failed to load blog posts';
  }

  console.log('Rendering page with posts:', posts, 'error:', error);

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Latest news and updates from our team
          </p>
        </div>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            {error}
          </div>
        ) : posts && posts.data.length > 0 ? (
          <PostGrid posts={posts.data} locale={locale} />
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-muted-foreground">No blog posts found</p>
          </div>
        )}
      </div>
    </section>
  );
}