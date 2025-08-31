import type { Product } from '@/services/products/products.type';

import {
  APP_BASE_URL,
  APP_DESCRIPTION,
  APP_LOGO_URL,
  APP_ORGANIZATION_DESCRIPTION,
  APP_PHONE_NUMBER,
  APP_PRODUCT_URL,
  APP_PRODUCTS_URL,
  APP_SITE_NAME,
  APP_SOCIAL_FACEBOOK,
  APP_SOCIAL_INSTAGRAM,
  APP_SOCIAL_TWITTER,
} from '@/config/metadata';

export const generateOrganizationSchema = (): object => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: APP_SITE_NAME,
  url: APP_BASE_URL,
  logo: APP_LOGO_URL,
  description: APP_ORGANIZATION_DESCRIPTION,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: APP_PHONE_NUMBER,
    contactType: 'Customer Service',
  },
  sameAs: [APP_SOCIAL_FACEBOOK, APP_SOCIAL_INSTAGRAM, APP_SOCIAL_TWITTER],
});

export const generateWebSiteSchema = (): object => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: APP_SITE_NAME,
  url: APP_BASE_URL,
  description: APP_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${APP_PRODUCTS_URL}?search={search_term_string}`,
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
  url: APP_PRODUCT_URL(product.slug),
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
    url: APP_PRODUCT_URL(product.slug),
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
      url: APP_PRODUCT_URL(product.slug),
      image: product.images[0],
      offers: {
        '@type': 'Offer',
        price: product.price.toString(),
        priceCurrency: 'USD',
      },
    },
  })),
});
