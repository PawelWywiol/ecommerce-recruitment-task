import type { Metadata } from 'next';
import { notFound } from 'next/dist/client/components/navigation';

import { handleErrors } from '@/lib/error-handler';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/schema';
import { getCategories } from '@/services/categories/categories';

import { CategoriesView } from '@/components/views/categories-view';
import {
  APP_BASE_URL,
  APP_CATEGORIES_DESCRIPTION,
  APP_CATEGORIES_SEO_TITLE,
  APP_CATEGORIES_TITLE,
  APP_CATEGORIES_URL,
  APP_COVER_IMAGE_URL,
  APP_DEFAULT_LOCALE,
  APP_IMAGES_ALT_TEXT,
  APP_SITE_NAME,
} from '@/config/metadata';

export const metadata: Metadata = {
  title: APP_CATEGORIES_SEO_TITLE,
  description: APP_CATEGORIES_DESCRIPTION,
  openGraph: {
    title: APP_CATEGORIES_TITLE,
    description: APP_CATEGORIES_DESCRIPTION,
    url: APP_CATEGORIES_URL,
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
    title: APP_CATEGORIES_TITLE,
    description: APP_CATEGORIES_DESCRIPTION,
    images: [APP_COVER_IMAGE_URL],
  },
};

export default async function Page() {
  const data = await handleErrors(() => getCategories());

  if (!data.isSuccess) {
    return notFound();
  }

  const categories = data.data;

  const collectionPageSchema = generateCollectionPageSchema(
    APP_CATEGORIES_TITLE,
    APP_CATEGORIES_DESCRIPTION,
    APP_CATEGORIES_URL,
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: APP_BASE_URL },
    { name: 'Categories', url: APP_CATEGORIES_URL },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Schema.org structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionPageSchema, breadcrumbSchema]),
        }}
      />
      <CategoriesView categories={categories} />
    </>
  );
}
