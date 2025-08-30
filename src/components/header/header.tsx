'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { HeaderAccountButton } from './header.account-button';
import { HeaderCart } from './header.cart';
import { HeaderDesktopNav } from './header.desktop-nav';
import { HeaderDesktopSearch } from './header.desktop-search';
import { HeaderLogo } from './header.logo';
import { HeaderMobileMenuButton } from './header.mobile-menu-button';
import { HeaderMobileNav } from './header.mobile-nav';
import { HeaderMobileSearch } from './header.mobile-search';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'Products', href: '/products' },
  ];

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <HeaderLogo />
          <HeaderDesktopNav items={navigation} pathname={pathname} />

          <div className="hidden lg:flex items-center space-x-4">
            <HeaderDesktopSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            <HeaderCart />
            <HeaderAccountButton />
          </div>

          <HeaderMobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/40 py-4">
            <div className="space-y-4">
              <HeaderMobileSearch />
              <HeaderMobileNav
                items={navigation}
                pathname={pathname}
                setIsMenuOpen={setIsMenuOpen}
              />

              <HeaderAccountButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
