import { kyFetch } from '@/lib/ky';

import { CATEGORIES_API_URL } from './categories.config';
import { categoriesArraySchema } from './categories.schema';
import type { Category } from './categories.types';

export const getCategories = async (): Promise<Category[]> => {
  const response = await kyFetch().get<Category[]>(CATEGORIES_API_URL);
  const categories = await response.json();

  const parsedData = categoriesArraySchema.safeParse(categories);

  if (!parsedData.success) {
    throw new Error('Invalid categories data');
  }

  return parsedData.data;
};
