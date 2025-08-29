import z from 'zod';

import {
  CATEGORY_NAME_MAX_LENGTH,
  CATEGORY_NAME_MIN_LENGTH,
  CATEGORY_SLUG_MAX_LENGTH,
  CATEGORY_SLUG_MIN_LENGTH,
} from './categories.config';
import type { Category } from './categories.types';

export const categorySchema: z.ZodType<Category> = z.object({
  id: z.number().min(1),
  name: z.string().min(CATEGORY_NAME_MIN_LENGTH).max(CATEGORY_NAME_MAX_LENGTH),
  slug: z.string().min(CATEGORY_SLUG_MIN_LENGTH).max(CATEGORY_SLUG_MAX_LENGTH),
  image: z.url(),
  creationAt: z.string(),
  updatedAt: z.string(),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export const categoriesArraySchema: z.ZodType<Category[]> = z.array(categorySchema);
