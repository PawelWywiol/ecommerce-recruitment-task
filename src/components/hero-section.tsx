import { ArrowRightIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from './ui/badge';
import { Button } from './ui/button';

export const HeroSection = () => (
  <section className="relative bg-gradient-to-br from-luxury-cream via-background to-luxury-cream/50 overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20"
            >
              New Collection Available
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-luxury-charcoal leading-tight">
              Luxury
              <span className="text-luxury-gold"> Redefined</span>
            </h1>
            <p className="text-lg lg:text-xl text-luxury-warm-gray leading-relaxed max-w-lg">
              Discover our curated collection of the world's finest luxury goods. From haute couture
              to exquisite jewelry, each piece tells a story of exceptional craftsmanship.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-luxury-charcoal hover:bg-luxury-charcoal/90 text-luxury-charcoal-foreground px-8"
              asChild
            >
              <Link href="/categories">
                Explore Collection
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-gold-foreground px-8"
            >
              Watch Our Story
            </Button>
          </div>

          <div className="flex items-center space-x-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-charcoal">10K+</div>
              <div className="text-sm text-luxury-warm-gray">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-charcoal">50+</div>
              <div className="text-sm text-luxury-warm-gray">Luxury Brands</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-charcoal">99%</div>
              <div className="text-sm text-luxury-warm-gray">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <picture className="aspect-square bg-gradient-to-br from-luxury-gold/20 to-luxury-burgundy/20 rounded-3xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
              srcSet="https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=150 150w, https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=300 300w, https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=400 400w, https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=600 600w, https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800 800w, https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200 1200w, https://images.pexels.com/photos/33676167/pexels-photo-33676167.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600 1600w"
              sizes="(max-width: 650px) calc((100vw - 42px) / 2), (max-width: 900px) calc((100vw - 52px) / 2), (max-width: 1440px) calc((100vw - 108px) / 3), (max-width: 1600px) calc((100vw - 108px) / 3), calc((1600px - 108px) / 3)"
              alt="Luxury Fashion"
              className="w-full h-full object-cover aspect-square"
              draggable="false"
            />
          </picture>
          <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                  <StarIcon key={star} className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                ))}
              </div>
              <div className="text-sm">
                <div className="font-medium">4.9/5 Rating</div>
                <div className="text-luxury-warm-gray">From 2,500+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
