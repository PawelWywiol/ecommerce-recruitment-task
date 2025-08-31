export const PRODUCTS_API_URL = 'https://api.escuelajs.co/api/v1/products';
export const PRODUCT_BY_SLUG_API_URL = (slug: string): string =>
  `https://api.escuelajs.co/api/v1/products/slug/${slug}`;
export const PRODUCT_BY_SLUG_RELATED_API_URL = (slug: string): string =>
  `https://api.escuelajs.co/api/v1/products/slug/${slug}/related`;

export const PRODUCT_TITLE_MAX_LENGTH = 100;
export const PRODUCT_TITLE_MIN_LENGTH = 1;
export const PRODUCT_SLUG_MAX_LENGTH = 100;
export const PRODUCT_SLUG_MIN_LENGTH = 1;
export const PRODUCT_DESCRIPTION_MAX_LENGTH = 1000;
export const PRODUCT_DESCRIPTION_MIN_LENGTH = 1;
