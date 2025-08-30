import type { MetadataRoute } from 'next';

import { handleErrors } from '@/lib/error-handler';
import { getCategories } from '@/services/categories/categories';
import { getProducts } from '@/services/products/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ecommerce-recruitment-task.vercel.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
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
        url: `${baseUrl}/product/${product.slug}`,
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
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    );
  }

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
