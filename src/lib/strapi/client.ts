import { StrapiCollectionResponse, StrapiResponse, StrapiSoftware, StrapiPost } from '@/lib/strapi/types';

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';

const defaultHeaders = {
  'Content-Type': 'application/json',
  ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Strapi API error: ${errorData.error?.message || response.statusText}`);
  }
  return response.json();
};

// Software endpoints
const strapiSoftware = {
  getAll: async (locale: string = 'en'): Promise<StrapiCollectionResponse<StrapiSoftware>> => {
    const url = new URL(`${STRAPI_API_URL}/software-saases`);
    url.searchParams.set('locale', locale);
    url.searchParams.set('populate', '*');
    url.searchParams.set('sort', 'name:asc');
    
    const response = await fetch(url.toString(), {
      headers: defaultHeaders,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    return handleResponse<StrapiCollectionResponse<StrapiSoftware>>(response);
  },
  
  getBySlug: async (slug: string, locale: string = 'en'): Promise<StrapiResponse<StrapiSoftware>> => {
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
  },
  
  getFeatured: async (locale: string = 'en'): Promise<StrapiCollectionResponse<StrapiSoftware>> => {
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
  },
};

// Post endpoints
const strapiPosts = {
  getAll: async (locale: string = 'en'): Promise<StrapiCollectionResponse<StrapiPost>> => {
    const url = new URL(`${STRAPI_API_URL}/posts`);
    url.searchParams.set('locale', locale);
    url.searchParams.set('populate', '*');
    url.searchParams.set('sort', 'date:desc');
    
    const response = await fetch(url.toString(), {
      headers: defaultHeaders,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    return handleResponse<StrapiCollectionResponse<StrapiPost>>(response);
  },
  
  getBySlug: async (slug: string, locale: string = 'en'): Promise<StrapiResponse<StrapiPost>> => {
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
  },
  
  getByCategory: async (category: string, locale: string = 'en'): Promise<StrapiCollectionResponse<StrapiPost>> => {
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
  },
};

export { strapiSoftware, strapiPosts };