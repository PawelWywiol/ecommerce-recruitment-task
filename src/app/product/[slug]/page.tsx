import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { handleErrors } from '@/lib/error-handler';
import { getProductBySlug, getRelatedProductsBySlug } from '@/services/products/products';

import { ProductView } from '@/components/views/product-view';

const DESCRIPTION_MAX_LENGTH = 160;
const MAX_OPEN_GRAPH_IMAGES = 4;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (typeof slug !== 'string' || !slug.length) {
    return {
      title: 'Product Not Found | E-Commerce',
      description: 'The requested product could not be found.',
    };
  }

  const data = await handleErrors(() => getProductBySlug(slug));

  if (!data.isSuccess || !data.data) {
    return {
      title: 'Product Not Found | E-Commerce',
      description: 'The requested product could not be found.',
    };
  }

  const product = data.data;

  return {
    title: `${product.title} - ${product.category.name} | E-Commerce`,
    description: `${product.description.slice(0, DESCRIPTION_MAX_LENGTH)}... Shop luxury ${product.category.name.toLowerCase()} at premium prices. Free shipping available.`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.slice(0, MAX_OPEN_GRAPH_IMAGES).map((image) => ({
        url: image,
        alt: product.title,
      })),
    },
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const slug = params.slug;

  if (typeof slug !== 'string' || !slug.length) {
    return notFound();
  }

  const data = await handleErrors(() =>
    Promise.all([getProductBySlug(slug), getRelatedProductsBySlug(slug)]),
  );

  if (!data.isSuccess) {
    return notFound();
  }

  const [product, relatedProducts] = data.data;

  if (!product) {
    return notFound();
  }

  return <ProductView product={product} relatedProducts={relatedProducts} />;
}
