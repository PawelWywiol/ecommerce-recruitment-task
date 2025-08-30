import { notFound } from 'next/navigation';

import { getProductBySlug, getRelatedProductsBySlug } from '@/services/products/products';

import { ProductView } from '@/components/views/product-view';

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const slug = params.slug;

  if (typeof slug !== 'string' || !slug.length) {
    return notFound();
  }

  const product = await getProductBySlug(slug);
  const relatedProducts = await getRelatedProductsBySlug(slug);

  if (!product) {
    return notFound();
  }

  return <ProductView product={product} relatedProducts={relatedProducts} />;
}
