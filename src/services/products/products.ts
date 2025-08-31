import { kyFetch } from '@/lib/ky';

import {
  PRODUCT_BY_ID_API_URL,
  PRODUCT_BY_ID_RELATED_API_URL,
  PRODUCTS_API_URL,
  PRODUCTS_REVALIDATE_TIME_SECONDS,
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

  return url.toString();
};

export const getProducts = async (searchParams: ProductSearchParams = {}): Promise<Product[]> => {
  const response = await kyFetch({ revalidate: PRODUCTS_REVALIDATE_TIME_SECONDS }).get<Product[]>(
    productsApiUrlWithSearchParams(searchParams),
  );
  const products = await response.json();

  const parsedData = productsArraySchema.safeParse(products);

  if (!parsedData.success) {
    throw new Error('Invalid products data');
  }

  return parsedData.data;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  if (typeof id !== 'string' || !id.length) {
    throw new Error('Invalid id');
  }

  const response = await kyFetch({
    revalidate: PRODUCTS_REVALIDATE_TIME_SECONDS,
  }).get<Product>(PRODUCT_BY_ID_API_URL(id));
  const product = await response.json();

  const parsedData = productSchema.safeParse(product);

  if (!parsedData.success) {
    throw new Error('Invalid products data');
  }

  return parsedData.data;
};

export const getRelatedProductsById = async (id: string): Promise<Product[]> => {
  if (typeof id !== 'string' || !id.length) {
    throw new Error('Invalid id');
  }

  const response = await kyFetch({
    revalidate: PRODUCTS_REVALIDATE_TIME_SECONDS,
  }).get<Product[]>(PRODUCT_BY_ID_RELATED_API_URL(id));
  const products = await response.json();

  const parsedData = productsArraySchema.safeParse(products);

  if (!parsedData.success) {
    throw new Error('Invalid products data');
  }

  return parsedData.data;
};
