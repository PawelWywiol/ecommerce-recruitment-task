import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { handleErrors } from '@/lib/error-handler';
import {
  generateItemListSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from '@/lib/schema';
import { getProducts } from '@/services/products/products';

import { MainView } from '@/components/views/main-view';
import {
  APP_BASE_URL,
  APP_COVER_IMAGE_URL,
  APP_DEFAULT_LOCALE,
  APP_DESCRIPTION,
  APP_IMAGES_ALT_TEXT,
  APP_SITE_NAME,
  APP_TITLE,
} from '@/config/metadata';

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    url: APP_BASE_URL,
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
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: [APP_COVER_IMAGE_URL],
  },
};

export default async function Page() {
  const data = await handleErrors(() => getProducts({ offset: 0, limit: 4 }));

  if (!data.isSuccess) {
    return notFound();
  }

  const products = data.data;

  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const itemListSchema = generateItemListSchema(products);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Schema.org structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema, itemListSchema]),
        }}
      />
      <MainView products={products} />
    </>
  );
}
