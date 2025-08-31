export const APP_BASE_URL = 'https://ecommerce-recruitment-task.vercel.app';
export const APP_SITEMAP_URL = `${APP_BASE_URL}/sitemap.xml`;
export const APP_PRODUCTS_URL = `${APP_BASE_URL}/products`;
export const APP_PRODUCT_URL = (slug: string): string => `${APP_BASE_URL}/product/${slug}`;
export const APP_CATEGORIES_URL = `${APP_BASE_URL}/categories`;
export const APP_CATEGORY_URL = (slug: string): string => `${APP_BASE_URL}/category/${slug}`;

export const APP_DEFAULT_LOCALE = 'en_US';

export const APP_TITLE = 'Luxury Redefined - Premium Collection';
export const APP_DESCRIPTION =
  "Discover our curated collection of the world's finest luxury goods. From haute couture to exquisite jewelry, each piece tells a story of exceptional craftsmanship.";
export const APP_SITE_NAME = 'E-Commerce Luxury Store';
export const APP_COVER_IMAGE_URL =
  'https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&cs=tinysrgb&w=1200';
export const APP_IMAGES_ALT_TEXT = 'E-Commerce Luxury Store - Premium Collection';

// Organization metadata
export const APP_ORGANIZATION_DESCRIPTION =
  "Premium luxury goods e-commerce store featuring curated collections of the world's finest products.";
export const APP_PHONE_NUMBER = '+1-800-LUXURY';
export const APP_LOGO_URL = `${APP_BASE_URL}/logo.png`;
export const APP_SOCIAL_FACEBOOK = 'https://facebook.com/ecommerce-luxury';
export const APP_SOCIAL_INSTAGRAM = 'https://instagram.com/ecommerce-luxury';
export const APP_SOCIAL_TWITTER = 'https://twitter.com/ecommerce-luxury';

// Page-specific metadata
export const APP_CATEGORIES_TITLE = 'Shop by Category - Luxury Collections';
export const APP_CATEGORIES_DESCRIPTION =
  'Explore our carefully curated collections of luxury goods, each category representing the finest in its field. Browse premium categories with personal stylist assistance available.';
export const APP_CATEGORIES_SEO_TITLE = `${APP_CATEGORIES_TITLE} | ${APP_SITE_NAME}`;

export const APP_PRODUCTS_TITLE = 'All Products - Luxury Collection';
export const APP_PRODUCTS_DESCRIPTION =
  'Discover our complete collection of luxury goods, each piece carefully selected for its exceptional quality and timeless elegance.';
export const APP_PRODUCTS_SEO_TITLE = `${APP_PRODUCTS_TITLE} | ${APP_SITE_NAME}`;

// Error pages
export const APP_PRODUCT_NOT_FOUND_TITLE = `Product Not Found | ${APP_SITE_NAME}`;
export const APP_PRODUCT_NOT_FOUND_DESCRIPTION = 'The requested product could not be found.';
