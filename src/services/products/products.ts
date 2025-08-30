import { kyFetch } from '@/lib/ky';

import {
  PRODUCT_BY_SLUG_API_URL,
  PRODUCT_BY_SLUG_RELATED_API_URL,
  PRODUCTS_API_URL,
} from './products.config';
import { productSchema, productSearchParamsSchema, productsArraySchema } from './products.schema';
import type { Product, ProductSearchParams } from './products.type';

const productsApiUrlWithSearchParams = (searchParams: ProductSearchParams = {}): string => {
  const parsedSearchParams = productSearchParamsSchema.safeParse(searchParams);

  if (!parsedSearchParams.success) {
    throw new Error('Invalid search parameters');
  }

  const url = new URL(PRODUCTS_API_URL);

  Object.entries(parsedSearchParams.data).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  console.log(url.toString());
  return url.toString();
};

export const getProducts = async (searchParams: ProductSearchParams = {}): Promise<Product[]> => {
  const response = await kyFetch().get<Product[]>(productsApiUrlWithSearchParams(searchParams));
  const products = await response.json();

  const parsedData = productsArraySchema.safeParse(products);

  if (!parsedData.success) {
    console.error(parsedData.error);
    throw new Error('Invalid products data');
  }

  return parsedData.data;
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  if (typeof slug !== 'string' || !slug.length) {
    throw new Error('Invalid slug');
  }

  const response = await kyFetch().get<Product>(PRODUCT_BY_SLUG_API_URL(slug));
  const product = await response.json();

  const parsedData = productSchema.safeParse(product);

  if (!parsedData.success) {
    console.error(parsedData.error);
    throw new Error('Invalid products data');
  }

  return parsedData.data;
};

export const getRelatedProductsBySlug = async (slug: string): Promise<Product[]> => {
  if (typeof slug !== 'string' || !slug.length) {
    throw new Error('Invalid slug');
  }

  const response = await kyFetch().get<Product[]>(PRODUCT_BY_SLUG_RELATED_API_URL(slug));
  const products = await response.json();

  const parsedData = productsArraySchema.safeParse(products);

  if (!parsedData.success) {
    console.error(parsedData.error);
    throw new Error('Invalid products data');
  }

  return parsedData.data;
};
