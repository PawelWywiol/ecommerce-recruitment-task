import { kyFetch } from '@/lib/ky';

import { PRODUCTS_API_URL } from './products.config';
import { productSearchParamsSchema, productsArraySchema } from './products.schema';
import type { Product, ProductSearchParams } from './products.type';

const productsApiUrlWithSearchParams = (searchParams: ProductSearchParams = {}): string => {
  const parsedSearchParams = productSearchParamsSchema.safeParse(searchParams);

  if (!parsedSearchParams.success) {
    throw new Error('Invalid search parameters');
  }

  const url = new URL(PRODUCTS_API_URL);

  Object.entries(parsedSearchParams.data).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

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
