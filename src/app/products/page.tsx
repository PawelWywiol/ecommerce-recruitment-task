import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { handleErrors } from '@/lib/error-handler';
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  generateItemListSchema,
} from '@/lib/schema';
import { getCategories } from '@/services/categories/categories';
import { getProducts } from '@/services/products/products';

import { ProductsView } from '@/components/views/products-view';
import {
  APP_BASE_URL,
  APP_COVER_IMAGE_URL,
  APP_DEFAULT_LOCALE,
  APP_IMAGES_ALT_TEXT,
  APP_PRODUCTS_DESCRIPTION,
  APP_PRODUCTS_SEO_TITLE,
  APP_PRODUCTS_TITLE,
  APP_PRODUCTS_URL,
  APP_SITE_NAME,
} from '@/config/metadata';

export const metadata: Metadata = {
  title: APP_PRODUCTS_SEO_TITLE,
  description: APP_PRODUCTS_DESCRIPTION,
  openGraph: {
    title: APP_PRODUCTS_TITLE,
    description: APP_PRODUCTS_DESCRIPTION,
    url: APP_PRODUCTS_URL,
    siteName: APP_SITE_NAME,
    images: [
      {
        url: APP_COVER_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: APP_IMAGES_ALT_TEXT,
      },
    ],
    locale: APP_DEFAULT_LOCALE,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_PRODUCTS_TITLE,
    description: APP_PRODUCTS_DESCRIPTION,
    images: [APP_COVER_IMAGE_URL],
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const data = await handleErrors(async () => {
    return await Promise.all([getCategories(), getProducts()]);
  });

  if (!data.isSuccess) {
    return notFound();
  }

  const [categories, products] = data.data;

  const collectionPageSchema = generateCollectionPageSchema(
    APP_PRODUCTS_TITLE,
    APP_PRODUCTS_DESCRIPTION,
    APP_PRODUCTS_URL,
  );

  const itemListSchema = generateItemListSchema(products);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: APP_BASE_URL },
    { name: 'Products', url: APP_PRODUCTS_URL },
  ]);

  const categorySearchParameter = typeof params.category === 'string' ? params.category : undefined;
  const defaultCategory = categories.find((category) => category.slug === categorySearchParameter);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Schema.org structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionPageSchema, itemListSchema, breadcrumbSchema]),
        }}
      />
      <ProductsView
        products={products}
        categories={categories}
        defaultCategory={defaultCategory?.slug}
      />
    </>
  );
}
