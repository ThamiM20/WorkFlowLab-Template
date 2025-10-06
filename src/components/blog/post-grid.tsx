'use client';

import Link from 'next/link';

import type { StrapiPost } from '@/lib/strapi/types';

interface PostCardProps {
  post: StrapiPost;
  locale: string;
}

function PostCard({ post, locale }: PostCardProps) {
  // Check if post exists
  if (!post) {
    console.log('PostCard: Missing post', post); // Add logging
    return null;
  }

  // Access properties directly from the post object
  const { id, title, slug, description, date, image, categories, writer } = post;
  
  // Format the date
  const formattedDate = date 
    ? new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  console.log('PostCard: Rendering post', { id, title, slug }); // Add logging

  return (
    <Link
      href={`/${locale}/blog/${slug}`}
      className="block rounded-lg border p-6 transition-all hover:shadow-md"
    >
      <div className="flex flex-col gap-4">
        {image?.url && (
          <div className="flex-shrink-0">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${image.url}`}
              alt={`${title} image`}
              width={300}
              height={200}
              className="rounded-lg border object-cover w-full h-48"
            />
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-xl font-semibold">{title || 'Untitled Post'}</h3>
          <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
            {description || 'No description available'}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                {categories}
              </span>
            )}
            {writer && (
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                By {writer}
              </span>
            )}
          </div>

          {formattedDate && (
            <div className="mt-3 text-sm text-muted-foreground">
              Published on {formattedDate}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

interface PostGridProps {
  posts: StrapiPost[];
  locale: string;
}

export function PostGrid({ posts, locale }: PostGridProps) {
  console.log('PostGrid: Rendering posts', posts); // Add logging
  
  if (!posts || posts.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
        <p className="text-muted-foreground">No posts to display</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} locale={locale} />
      ))}
    </div>
  );
}