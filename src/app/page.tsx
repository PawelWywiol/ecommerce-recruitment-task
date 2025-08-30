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

export const metadata: Metadata = {
  title: 'Luxury Redefined - Premium Collection | E-Commerce',
  description:
    "Discover our curated collection of the world's finest luxury goods. From haute couture to exquisite jewelry, each piece tells a story of exceptional craftsmanship. Shop our featured collection with 10K+ happy customers and 4.9/5 rating.",
  openGraph: {
    title: 'Luxury Redefined - Premium Collection',
    description:
      "Discover our curated collection of the world's finest luxury goods. From haute couture to exquisite jewelry, each piece tells a story of exceptional craftsmanship.",
    url: 'https://ecommerce-recruitment-task.vercel.app',
    siteName: 'E-Commerce Luxury Store',
    images: [
      {
        url: 'https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Luxury Fashion Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Redefined - Premium Collection',
    description:
      "Discover our curated collection of the world's finest luxury goods. From haute couture to exquisite jewelry, each piece tells a story of exceptional craftsmanship.",
    images: [
      'https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
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
