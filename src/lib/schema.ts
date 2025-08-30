import type { Product } from '@/services/products/products.type';

export const generateOrganizationSchema = (): object => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'E-Commerce Luxury Store',
  url: 'https://ecommerce-recruitment-task.vercel.app',
  logo: 'https://ecommerce-recruitment-task.vercel.app/logo.png',
  description:
    "Premium luxury goods e-commerce store featuring curated collections of the world's finest products.",
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-800-LUXURY',
    contactType: 'Customer Service',
  },
  sameAs: [
    'https://facebook.com/ecommerce-luxury',
    'https://instagram.com/ecommerce-luxury',
    'https://twitter.com/ecommerce-luxury',
  ],
});

export const generateWebSiteSchema = (): object => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'E-Commerce Luxury Store',
  url: 'https://ecommerce-recruitment-task.vercel.app',
  description: "Discover our curated collection of the world's finest luxury goods.",
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ecommerce-recruitment-task.vercel.app/products?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>): object => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateProductSchema = (product: Product): object => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.title,
  description: product.description,
  image: product.images,
  url: `https://ecommerce-recruitment-task.vercel.app/product/${product.slug}`,
  sku: product.id.toString(),
  brand: {
    '@type': 'Brand',
    name: product.category.name,
  },
  category: product.category.name,
  offers: {
    '@type': 'Offer',
    price: product.price.toString(),
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `https://ecommerce-recruitment-task.vercel.app/product/${product.slug}`,
  },
  dateCreated: product.creationAt,
  dateModified: product.updatedAt,
});

export const generateCollectionPageSchema = (
  name: string,
  description: string,
  url: string,
): object => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  description,
  url,
  mainEntity: {
    '@type': 'ItemList',
    name,
    description,
  },
});

export const generateItemListSchema = (products: Product[]): object => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: products.length,
  itemListElement: products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: product.title,
      url: `https://ecommerce-recruitment-task.vercel.app/product/${product.slug}`,
      image: product.images[0],
      offers: {
        '@type': 'Offer',
        price: product.price.toString(),
        priceCurrency: 'USD',
      },
    },
  })),
});
