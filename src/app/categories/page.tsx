import type { Metadata } from 'next';
import { notFound } from 'next/dist/client/components/navigation';

import { handleErrors } from '@/lib/error-handler';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/schema';
import { getCategories } from '@/services/categories/categories';

import { CategoriesView } from '@/components/views/categories-view';

export const metadata: Metadata = {
  title: 'Shop by Category - Luxury Collections | E-Commerce',
  description:
    'Explore our carefully curated collections of luxury goods, each category representing the finest in its field. Browse premium categories with personal stylist assistance available.',
  openGraph: {
    title: 'Shop by Category - Luxury Collections',
    description:
      'Explore our carefully curated collections of luxury goods, each category representing the finest in its field. Browse premium categories with personal stylist assistance available.',
    url: 'https://ecommerce-recruitment-task.vercel.app/categories',
    siteName: 'E-Commerce Luxury Store',
    images: [
      {
        url: 'https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Luxury Categories Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop by Category - Luxury Collections',
    description:
      'Explore our carefully curated collections of luxury goods, each category representing the finest in its field. Browse premium categories with personal stylist assistance available.',
    images: [
      'https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
};

export default async function Page() {
  const data = await handleErrors(() => getCategories());

  if (!data.isSuccess) {
    return notFound();
  }

  const categories = data.data;

  const collectionPageSchema = generateCollectionPageSchema(
    'Shop by Category - Luxury Collections',
    'Explore our carefully curated collections of luxury goods, each category representing the finest in its field.',
    'https://ecommerce-recruitment-task.vercel.app/categories',
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ecommerce-recruitment-task.vercel.app' },
    { name: 'Categories', url: 'https://ecommerce-recruitment-task.vercel.app/categories' },
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
