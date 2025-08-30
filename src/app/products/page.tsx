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

export const metadata: Metadata = {
  title: 'All Products - Luxury Collection | E-Commerce',
  description:
    'Discover our complete collection of luxury goods, each piece carefully selected for its exceptional quality and timeless elegance. Browse, filter, and find your perfect luxury item.',
  openGraph: {
    title: 'All Products - Luxury Collection',
    description:
      'Discover our complete collection of luxury goods, each piece carefully selected for its exceptional quality and timeless elegance. Browse, filter, and find your perfect luxury item.',
    url: 'https://ecommerce-recruitment-task.vercel.app/products',
    siteName: 'E-Commerce Luxury Store',
    images: [
      {
        url: 'https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Luxury Products Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Products - Luxury Collection',
    description:
      'Discover our complete collection of luxury goods, each piece carefully selected for its exceptional quality and timeless elegance. Browse, filter, and find your perfect luxury item.',
    images: [
      'https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
};

export default async function Page() {
  const data = await handleErrors(async () => {
    return await Promise.all([getCategories(), getProducts()]);
  });

  if (!data.isSuccess) {
    return notFound();
  }

  const [categories, products] = data.data;

  const collectionPageSchema = generateCollectionPageSchema(
    'All Products - Luxury Collection',
    'Discover our complete collection of luxury goods, each piece carefully selected for its exceptional quality and timeless elegance.',
    'https://ecommerce-recruitment-task.vercel.app/products',
  );

  const itemListSchema = generateItemListSchema(products);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ecommerce-recruitment-task.vercel.app' },
    { name: 'Products', url: 'https://ecommerce-recruitment-task.vercel.app/products' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Schema.org structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionPageSchema, itemListSchema, breadcrumbSchema]),
        }}
      />
      <ProductsView products={products} categories={categories} />
    </>
  );
}
