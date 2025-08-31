import type { MetadataRoute } from 'next';

import { handleErrors } from '@/lib/error-handler';
import { getCategories } from '@/services/categories/categories';
import { getProducts } from '@/services/products/products';

import { APP_BASE_URL } from '@/config/metadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: APP_BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${APP_BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${APP_BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const productsData = await handleErrors(() => getProducts());
  const productRoutes: MetadataRoute.Sitemap = [];

  if (productsData.isSuccess) {
    const products = productsData.data;
    productRoutes.push(
      ...products.map((product) => ({
        url: `${APP_BASE_URL}/product/${product.slug}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    );
  }

  const categoriesData = await handleErrors(() => getCategories());
  const categoryRoutes: MetadataRoute.Sitemap = [];

  if (categoriesData.isSuccess) {
    const categories = categoriesData.data;
    categoryRoutes.push(
      ...categories.map((category) => ({
        url: `${APP_BASE_URL}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    );
  }

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
