import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { handleErrors } from '@/lib/error-handler';
import { generateBreadcrumbSchema, generateProductSchema } from '@/lib/schema';
import { getProductById, getRelatedProductsById } from '@/services/products/products';

import { ProductView } from '@/components/views/product-view';
import {
  APP_BASE_URL,
  APP_CATEGORY_URL,
  APP_DEFAULT_LOCALE,
  APP_PRODUCT_NOT_FOUND_DESCRIPTION,
  APP_PRODUCT_NOT_FOUND_TITLE,
  APP_PRODUCT_URL,
  APP_PRODUCTS_URL,
  APP_SITE_NAME,
} from '@/config/metadata';

const DESCRIPTION_MAX_LENGTH = 160;
const MAX_OPEN_GRAPH_IMAGES = 4;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  if (typeof id !== 'string' || !id.length) {
    return {
      title: APP_PRODUCT_NOT_FOUND_TITLE,
      description: APP_PRODUCT_NOT_FOUND_DESCRIPTION,
    };
  }

  const data = await handleErrors(() => getProductById(id));

  if (!data.isSuccess || !data.data) {
    return {
      title: APP_PRODUCT_NOT_FOUND_TITLE,
      description: APP_PRODUCT_NOT_FOUND_DESCRIPTION,
    };
  }

  const product = data.data;

  return {
    title: `${product.title} - ${product.category.name} | ${APP_SITE_NAME}`,
    description: `${product.description.slice(
      0,
      DESCRIPTION_MAX_LENGTH,
    )}... Shop luxury ${product.category.name.toLowerCase()} at premium prices. Free shipping available.`,
    openGraph: {
      title: `${product.title} - ${product.category.name}`,
      description: product.description,
      url: APP_PRODUCT_URL(product.slug),
      siteName: APP_SITE_NAME,
      images: product.images.slice(0, MAX_OPEN_GRAPH_IMAGES).map((image) => ({
        url: image,
        width: 1200,
        height: 630,
        alt: product.title,
      })),
      locale: APP_DEFAULT_LOCALE,
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

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const id = params.id;

  if (typeof id !== 'string' || !id.length) {
    return notFound();
  }

  const product = await handleErrors(() => getProductById(id));
  const relatedProducts = await handleErrors(() => getRelatedProductsById(id));

  if (!product.isSuccess || !product.data) {
    console.log(product);
    return notFound();
  }

  const productSchema = generateProductSchema(product.data);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: APP_BASE_URL },
    { name: 'Products', url: APP_PRODUCTS_URL },
    {
      name: product.data.category.name,
      url: APP_CATEGORY_URL(product.data.category.slug),
    },
    {
      name: product.data.title,
      url: APP_PRODUCT_URL(product.data.slug),
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
      <ProductView
        product={product.data}
        relatedProducts={relatedProducts.isSuccess ? relatedProducts.data : []}
      />
    </>
  );
}
