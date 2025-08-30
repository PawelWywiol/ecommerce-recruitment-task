import Link from 'next/link';

export const HeaderDesktopNav = ({
  items,
  pathname,
}: {
  items: Array<{ name: string; href: string }>;
  pathname: string;
}) => (
  <nav className="hidden lg:flex items-center space-x-8">
    {items.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className={`text-sm font-medium transition-colors hover:text-luxury-gold relative ${
          pathname === item.href
            ? 'text-luxury-charcoal'
            : 'text-luxury-warm-gray hover:text-luxury-charcoal'
        }`}
      >
        {item.name}
        {pathname === item.href && (
          <div className="absolute -bottom-6 left-0 right-0 h-0.5 bg-luxury-gold" />
        )}
      </Link>
    ))}
  </nav>
);
