import Link from 'next/link';

export const Footer = () => (
  <footer className="bg-luxury-charcoal text-luxury-charcoal-foreground">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center">
              <span className="text-luxury-gold-foreground font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold tracking-tight">LUXORA</span>
          </div>
          <p className="text-luxury-warm-gray text-sm leading-relaxed">
            Curating the finest luxury products for the discerning individual. Experience excellence
            in every detail.
          </p>
        </div>

        {/* Shop */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">Shop</h3>
          <ul className="space-y-2 text-sm text-luxury-warm-gray">
            <li>
              <Link href="/categories" className="hover:text-luxury-gold transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-luxury-gold transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/new-arrivals" className="hover:text-luxury-gold transition-colors">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/sale" className="hover:text-luxury-gold transition-colors">
                Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">Customer Care</h3>
          <ul className="space-y-2 text-sm text-luxury-warm-gray">
            <li>
              <Link href="/contact" className="hover:text-luxury-gold transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-luxury-gold transition-colors">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/size-guide" className="hover:text-luxury-gold transition-colors">
                Size Guide
              </Link>
            </li>
            <li>
              <Link href="/care-guide" className="hover:text-luxury-gold transition-colors">
                Care Instructions
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">Connect</h3>
          <ul className="space-y-2 text-sm text-luxury-warm-gray">
            <li>
              <Link href="#" className="hover:text-luxury-gold transition-colors">
                Instagram
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-luxury-gold transition-colors">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-luxury-gold transition-colors">
                Twitter
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-luxury-gold transition-colors">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-luxury-warm-gray/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-luxury-warm-gray">© 2024 Luxora. All rights reserved.</p>
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
    </div>
  </footer>
);
