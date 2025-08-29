import { z } from 'zod';

import {
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_SLUG_MAX_LENGTH,
  PRODUCT_SLUG_MIN_LENGTH,
  PRODUCT_TITLE_MAX_LENGTH,
  PRODUCT_TITLE_MIN_LENGTH,
} from './products.config';
import type { Product, ProductSearchParams } from './products.type';

import {
  CATEGORY_NAME_MAX_LENGTH,
  CATEGORY_NAME_MIN_LENGTH,
  CATEGORY_SLUG_MAX_LENGTH,
  CATEGORY_SLUG_MIN_LENGTH,
} from '../categories/categories.config';

export const productSearchParamsSchema: z.ZodType<ProductSearchParams> = z.object({
  limit: z.number().min(1).optional(),
  offset: z.number().min(0).optional(),
  title: z.string().min(PRODUCT_TITLE_MIN_LENGTH).max(PRODUCT_TITLE_MAX_LENGTH).optional(),
  price: z.number().min(0).optional(),
  price_min: z.number().min(0).optional(),
  price_max: z.number().min(0).optional(),
  categoryId: z.number().min(1).optional(),
  categorySlug: z.string().min(CATEGORY_SLUG_MIN_LENGTH).max(CATEGORY_SLUG_MAX_LENGTH).optional(),
});

export type ProductSearchParamsSchema = z.infer<typeof productSearchParamsSchema>;

export const productSchema: z.ZodType<Product> = z.object({
  id: z.number().min(1),
  title: z.string().min(PRODUCT_TITLE_MIN_LENGTH).max(PRODUCT_TITLE_MAX_LENGTH),
  slug: z.string().min(PRODUCT_SLUG_MIN_LENGTH).max(PRODUCT_SLUG_MAX_LENGTH),
  price: z.number().min(0),
  description: z.string().min(PRODUCT_DESCRIPTION_MIN_LENGTH).max(PRODUCT_DESCRIPTION_MAX_LENGTH),
  category: z.object({
    id: z.number().min(1),
    name: z.string().min(CATEGORY_NAME_MIN_LENGTH).max(CATEGORY_NAME_MAX_LENGTH),
    slug: z.string().min(CATEGORY_SLUG_MIN_LENGTH).max(CATEGORY_SLUG_MAX_LENGTH),
    image: z.url(),
    creationAt: z.string(),
    updatedAt: z.string(),
  }),
  images: z.array(z.string().url()),
  creationAt: z.string(),
  updatedAt: z.string(),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const productsArraySchema: z.ZodType<Product[]> = z.array(productSchema);
