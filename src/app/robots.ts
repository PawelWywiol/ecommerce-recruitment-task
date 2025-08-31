import type { MetadataRoute } from 'next';

import { APP_SITEMAP_URL } from '@/config/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: APP_SITEMAP_URL,
  };
}
