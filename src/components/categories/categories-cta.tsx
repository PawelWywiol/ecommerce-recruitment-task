import { Button } from '../ui/button';

export const CategoriesCTA = () => (
  <div className="text-center mt-16 p-8 bg-luxury-cream/30 rounded-2xl">
    <h2 className="text-2xl font-bold text-luxury-charcoal mb-4">
      Can't Find What You're Looking For?
    </h2>
    <p className="text-luxury-warm-gray mb-6 max-w-lg mx-auto">
      Our personal stylists are here to help you find the perfect luxury pieces for any occasion.
    </p>
    <Button
      size="lg"
      className="bg-luxury-charcoal hover:bg-luxury-charcoal/90 text-luxury-charcoal-foreground"
    >
      Contact Personal Stylist
    </Button>
  </div>
);
