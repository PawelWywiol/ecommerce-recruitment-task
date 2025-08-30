import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { handleErrors } from '@/lib/error-handler';
import { generateBreadcrumbSchema, generateProductSchema } from '@/lib/schema';
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
      title: `${product.title} - ${product.category.name}`,
      description: product.description,
      url: `https://ecommerce-recruitment-task.vercel.app/product/${product.slug}`,
      siteName: 'E-Commerce Luxury Store',
      images: product.images.slice(0, MAX_OPEN_GRAPH_IMAGES).map((image) => ({
        url: image,
        width: 1200,
        height: 630,
        alt: product.title,
      })),
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} - ${product.category.name}`,
      description: product.description,
      images: product.images.slice(0, 1).map((image) => image),
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

  const productSchema = generateProductSchema(product);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ecommerce-recruitment-task.vercel.app' },
    { name: 'Products', url: 'https://ecommerce-recruitment-task.vercel.app/products' },
    {
      name: product.category.name,
      url: `https://ecommerce-recruitment-task.vercel.app/category/${product.category.slug}`,
    },
    {
      name: product.title,
      url: `https://ecommerce-recruitment-task.vercel.app/product/${product.slug}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Schema.org structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema, breadcrumbSchema]),
        }}
      />
      <ProductView product={product} relatedProducts={relatedProducts} />
    </>
  );
}
