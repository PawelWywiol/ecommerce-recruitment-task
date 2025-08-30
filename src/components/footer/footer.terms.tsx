import Link from 'next/link';

export const FooterTerms = () => (
  <div className="border-t border-luxury-warm-gray/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
    <p className="text-sm text-luxury-warm-gray">
      © {new Date().getFullYear()} Luxora. All rights reserved.
    </p>
    <div className="flex space-x-6 mt-4 sm:mt-0">
      <Link
        href="/privacy"
        className="text-sm text-luxury-warm-gray hover:text-luxury-gold transition-colors"
      >
        Privacy Policy
      </Link>
      <Link
        href="/terms"
        className="text-sm text-luxury-warm-gray hover:text-luxury-gold transition-colors"
      >
        Terms of Service
      </Link>
    </div>
  </div>
);
