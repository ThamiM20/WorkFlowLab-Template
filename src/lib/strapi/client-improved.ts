import { StrapiCollectionResponse, StrapiResponse, StrapiSoftware, StrapiPost } from '@/lib/strapi/types';

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';

const defaultHeaders = {
  'Content-Type': 'application/json',
  ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
};

// Enhanced error handling
class StrapiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'StrapiError';
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new StrapiError(
      response.status,
      `Expected JSON response but got ${contentType}`
    );
  }

  let data: any;
  try {
    data = await response.json();
  } catch (error) {
    throw new StrapiError(
      response.status,
      'Failed to parse JSON response',
      error
    );
  }

  if (!response.ok) {
    const errorMessage = data?.error?.message || response.statusText;
    throw new StrapiError(response.status, errorMessage, data?.error?.details);
  }

  return data;
};

// Software endpoints
const strapiSoftware = {
  getAll: async (locale: string = 'en'): Promise<StrapiCollectionResponse<StrapiSoftware>> => {
    try {
      const url = new URL(`${STRAPI_API_URL}/software-saases`);
      url.searchParams.set('locale', locale);
      url.searchParams.set('populate', '*');
      url.searchParams.set('sort', 'name:asc');
      
      const response = await fetch(url.toString(), {
        headers: defaultHeaders,
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
      
      return handleResponse<StrapiCollectionResponse<StrapiSoftware>>(response);
    } catch (error) {
      console.error('Error fetching software listings:', error);
      if (error instanceof StrapiError) {
        throw error;
      }
      throw new StrapiError(500, 'Failed to fetch software listings');
    }
  },
  
  getBySlug: async (slug: string, locale: string = 'en'): Promise<StrapiResponse<StrapiSoftware>> => {
    try {
      const url = new URL(`${STRAPI_API_URL}/software-saases`);
      url.searchParams.set('filters[slug][$eq]', slug);
      url.searchParams.set('locale', locale);
      url.searchParams.set('populate', '*');
      
      const response = await fetch(url.toString(), {
        headers: defaultHeaders,
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
      
      // Handle the response and convert collection to single item
      const data = await handleResponse<StrapiCollectionResponse<StrapiSoftware>>(response);
      
      // Convert collection response to single item response
      return {
        data: data.data[0] || null,
        meta: data.meta
      };
    } catch (error) {
      console.error('Error fetching software by slug:', error);
      if (error instanceof StrapiError) {
        throw error;
      }
      throw new StrapiError(500, 'Failed to fetch software by slug');
    }
  },
  
  getFeatured: async (locale: string = 'en'): Promise<StrapiCollectionResponse<StrapiSoftware>> => {
    try {
      const url = new URL(`${STRAPI_API_URL}/software-saases`);
      url.searchParams.set('filters[Featured][$eq]', 'true');
      url.searchParams.set('locale', locale);
      url.searchParams.set('populate', '*');
      url.searchParams.set('sort', 'name:asc');
      
      const response = await fetch(url.toString(), {
        headers: defaultHeaders,
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
      
      return handleResponse<StrapiCollectionResponse<StrapiSoftware>>(response);
    } catch (error) {
      console.error('Error fetching featured software:', error);
      if (error instanceof StrapiError) {
        throw error;
      }
      throw new StrapiError(500, 'Failed to fetch featured software');
    }
  },
};

// Post endpoints
const strapiPosts = {
  getAll: async (locale: string = 'en'): Promise<StrapiCollectionResponse<StrapiPost>> => {
    try {
      const url = new URL(`${STRAPI_API_URL}/posts`);
      url.searchParams.set('locale', locale);
      url.searchParams.set('populate', '*');
      url.searchParams.set('sort', 'date:desc');
      
      const response = await fetch(url.toString(), {
        headers: defaultHeaders,
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
      
      return handleResponse<StrapiCollectionResponse<StrapiPost>>(response);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      if (error instanceof StrapiError) {
        throw error;
      }
      throw new StrapiError(500, 'Failed to fetch blog posts');
    }
  },
  
  getBySlug: async (slug: string, locale: string = 'en'): Promise<StrapiResponse<StrapiPost>> => {
    try {
      const url = new URL(`${STRAPI_API_URL}/posts`);
      url.searchParams.set('filters[slug][$eq]', slug);
      url.searchParams.set('locale', locale);
      url.searchParams.set('populate', '*');
      
      const response = await fetch(url.toString(), {
        headers: defaultHeaders,
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
      
      // Handle the response and convert collection to single item
      const data = await handleResponse<StrapiCollectionResponse<StrapiPost>>(response);
      
      // Convert collection response to single item response
      return {
        data: data.data[0] || null,
        meta: data.meta
      };
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      if (error instanceof StrapiError) {
        throw error;
      }
      throw new StrapiError(500, 'Failed to fetch post by slug');
    }
  },
  
  getByCategory: async (category: string, locale: string = 'en'): Promise<StrapiCollectionResponse<StrapiPost>> => {
    try {
      const url = new URL(`${STRAPI_API_URL}/posts`);
      url.searchParams.set('filters[categories][$eq]', category);
      url.searchParams.set('locale', locale);
      url.searchParams.set('populate', '*');
      url.searchParams.set('sort', 'date:desc');
      
      const response = await fetch(url.toString(), {
        headers: defaultHeaders,
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
      
      return handleResponse<StrapiCollectionResponse<StrapiPost>>(response);
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      if (error instanceof StrapiError) {
        throw error;
      }
      throw new StrapiError(500, 'Failed to fetch posts by category');
    }
  },
};

export { strapiSoftware, strapiPosts, StrapiError };