import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { strapiPosts } from '@/lib/strapi/client';
import type { StrapiResponse, StrapiPost } from '@/lib/strapi/types';

interface StrapiBlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: StrapiBlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  // Fetch post data from Strapi
  let post: StrapiPost | null = null;
  try {
    const response = await strapiPosts.getBySlug(slug, locale);
    post = response.data || null;
  } catch (err) {
    console.error('Error fetching post for metadata:', err);
  }

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  return {
    title: `${post.title} | ${t('title')}`,
    description: post.description,
  };
}

export default async function StrapiBlogPostPage({
  params,
}: StrapiBlogPostPageProps) {
  const { locale, slug } = await params;
  // Fetch post data from Strapi
  let post: StrapiPost | null = null;
  let error: string | null = null;

  try {
    const response = await strapiPosts.getBySlug(slug, locale);
    post = response.data || null;
  } catch (err) {
    console.error('Error fetching post:', err);
    error = 'Failed to load post details';
  }

  // If post not found, return 404
  if (!post && !error) {
    notFound();
  }

  if (error || !post) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {error || 'Post not found'}
        </div>
      </div>
    );
  }

  const { title, description, content, date, image, categories, writer } = post;

  // Format the date
  const formattedDate = date 
    ? new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="container py-8">
      <div className="mb-6">
        <a href={`/${locale}/blog`} className="text-primary hover:underline">
          ← Back to Blog
        </a>
      </div>

      <article className="mb-8 rounded-lg border p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">{title || 'Untitled Post'}</h1>
          
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {writer && (
              <span>By {writer}</span>
            )}
            {formattedDate && (
              <time dateTime={date}>{formattedDate}</time>
            )}
          </div>

          {categories && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                {categories}
              </span>
            </div>
          )}
        </header>

        {image?.url && (
          <div className="mb-8">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${image.url}`}
              alt={`${title} image`}
              width={800}
              height={400}
              className="rounded-lg border object-cover w-full h-96"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <p className="text-muted-foreground text-lg">
            {description || 'No description available'}
          </p>
          
          {content && (
            <div className="mt-8">
              {Array.isArray(content) ? (
                content.map((block, index) => {
                  if (block.type === 'paragraph') {
                    return (
                      <p key={index} className="mb-4">
                        {block.children.map((child, childIndex) => (
                          <span key={childIndex}>{child.text}</span>
                        ))}
                      </p>
                    );
                  }
                  return null;
                })
              ) : typeof content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : null}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}