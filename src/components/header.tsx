'use client';

import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'Products', href: '/products' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-luxury-gold relative ${
                  isActive(item.href)
                    ? 'text-luxury-charcoal'
                    : 'text-luxury-warm-gray hover:text-luxury-charcoal'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-6 left-0 right-0 h-0.5 bg-luxury-gold" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search luxury items..."
                    className="w-64 h-9 bg-luxury-cream border-luxury-gold/20 focus:border-luxury-gold"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                    className="h-9 w-9 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="h-9 w-9 p-0 hover:bg-luxury-cream"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-luxury-cream relative"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-luxury-gold text-luxury-gold-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  3
                </span>
              </Button>
            </Link>

            {/* User Account */}
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-luxury-cream">
              <User className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-luxury-gold text-luxury-gold-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  3
                </span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-9 w-9 p-0"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/40 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="px-2">
                <Input
                  type="search"
                  placeholder="Search luxury items..."
                  className="w-full bg-luxury-cream border-luxury-gold/20 focus:border-luxury-gold"
                />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-2 py-2 text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-luxury-charcoal bg-luxury-cream'
                        : 'text-luxury-warm-gray hover:text-luxury-charcoal hover:bg-luxury-cream/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="flex items-center justify-between px-2 pt-4 border-t border-border/40">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
