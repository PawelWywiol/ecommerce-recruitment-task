import { notFound } from 'next/navigation';

import { handleErrors } from '@/lib/error-handler';
import { getProductBySlug, getRelatedProductsBySlug } from '@/services/products/products';

import { ProductView } from '@/components/views/product-view';

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
