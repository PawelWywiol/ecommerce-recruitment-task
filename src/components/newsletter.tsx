import { Button } from './ui/button';
import { Input } from './ui/input';

export const Newsletter = () => (
  <section className="py-16 lg:py-24 bg-luxury-charcoal">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-luxury-charcoal-foreground">
            Stay In Touch
          </h2>
          <p className="text-lg text-luxury-warm-gray">
            Be the first to know about new collections, exclusive events, and special offers from
            Luxora.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-background border-luxury-warm-gray/30 focus:border-luxury-gold"
          />
          <Button className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-gold-foreground whitespace-nowrap">
            Subscribe
          </Button>
        </div>

        <p className="text-sm text-luxury-warm-gray">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from our
          company.
        </p>
      </div>
    </div>
  </section>
);
