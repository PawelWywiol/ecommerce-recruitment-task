import { Button } from '../ui/button';

export const ProductsLoadMoreButton = ({ onClick }: { onClick: () => void }) => (
  <div className="text-center mt-12">
    <Button
      variant="outline"
      size="lg"
      className="border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-luxury-charcoal-foreground px-8"
      onClick={onClick}
    >
      Load More Products
    </Button>
  </div>
);
