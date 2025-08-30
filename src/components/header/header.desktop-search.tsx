import { SearchIcon, XIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const HeaderDesktopSearch = ({
  isSearchOpen,
  setIsSearchOpen,
}: {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}) => (
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
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    ) : (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsSearchOpen(true)}
        className="h-9 w-9 p-0 hover:bg-luxury-cream"
      >
        <SearchIcon className="h-4 w-4" />
      </Button>
    )}
  </div>
);
