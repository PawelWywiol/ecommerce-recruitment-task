import Link from 'next/link';

export const HeaderLogo = () => (
  <div className="flex items-center">
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center">
        <span className="text-luxury-gold-foreground font-bold text-sm">L</span>
      </div>
      <span className="text-xl lg:text-2xl font-bold text-luxury-charcoal tracking-tight">
        LUXORA
      </span>
    </Link>
  </div>
);
