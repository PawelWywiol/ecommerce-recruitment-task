'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import type { Product } from '@/services/products/products.type';

import { MOCKED_PRODUCT_DATA } from '@/__mocks__/product';
import { MOCKED_REVIEWS } from '@/__mocks__/reviews';
import { Breadcrumbs } from '../breadcrubs';
import { MIN_PROMO_PRICE, MIN_RATING, PROMO_PERCENTAGE } from '../products/products.config';
import { ProductGridItem } from '../products/products.grid-item';
import { ProductRating } from '../products/products.rating';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const MAX_RELATED_PRODUCTS = 8;

export const ProductView = ({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    MOCKED_PRODUCT_DATA.colors.find((c) => c.available) || MOCKED_PRODUCT_DATA.colors[0],
  );
  const [selectedSize, setSelectedSize] = useState(
    MOCKED_PRODUCT_DATA.sizes.find((s) => s.available) || MOCKED_PRODUCT_DATA.sizes[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        links={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: 'Products', href: '/products' },
        ]}
        last={product.title}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-luxury-cream/30 rounded-2xl overflow-hidden">
            <picture>
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </picture>
            <Badge
              className={cn(
                'absolute top-3 left-3',
                product.price > MIN_PROMO_PRICE
                  ? 'bg-luxury-burgundy text-luxury-burgundy-foreground'
                  : 'bg-luxury-gold text-luxury-gold-foreground',
              )}
            >
              {product.price > MIN_PROMO_PRICE ? 'Sale' : 'New'}
            </Badge>

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background h-10 w-10 p-0"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background h-10 w-10 p-0"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-luxury-gold'
                    : 'border-border hover:border-luxury-gold/50'
                }`}
              >
                <picture>
                  <img
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </picture>
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-luxury-warm-gray tracking-wide uppercase">
                  {product.category.name}
                </p>
                <h1 className="text-3xl lg:text-4xl font-bold text-luxury-charcoal">
                  {product.title}
                </h1>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`h-10 w-10 p-0 ${
                  isWishlisted ? 'text-luxury-burgundy' : 'text-luxury-warm-gray'
                }`}
              >
                <HeartIcon className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-3">
              <ProductRating rating={MIN_RATING} />
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-luxury-charcoal">
                ${product.price.toLocaleString()}
              </span>
              {product.price && (
                <span className="text-xl text-luxury-warm-gray line-through">
                  ${product.price.toLocaleString()}
                </span>
              )}
              {product.price > MIN_PROMO_PRICE && (
                <Badge
                  variant="destructive"
                  className="bg-luxury-burgundy text-luxury-burgundy-foreground"
                >
                  Save ${(product.price * PROMO_PERCENTAGE).toLocaleString()}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Color Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-luxury-charcoal">
              Color: <span className="font-normal">{selectedColor.name}</span>
            </h3>
            <div className="flex items-center space-x-3">
              {MOCKED_PRODUCT_DATA.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => color.available && setSelectedColor(color)}
                  disabled={!color.available}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor.name === color.name
                      ? 'border-luxury-gold ring-2 ring-luxury-gold/20'
                      : 'border-border hover:border-luxury-gold/50'
                  } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-luxury-charcoal">
                Size: <span className="font-normal">{selectedSize.name}</span>
              </h3>
              <Button variant="link" className="text-luxury-gold p-0 h-auto">
                Size Guide
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {MOCKED_PRODUCT_DATA.sizes.map((size) => (
                <button
                  key={size.name}
                  type="button"
                  onClick={() => size.available && setSelectedSize(size)}
                  disabled={!size.available}
                  className={`py-3 px-4 border rounded-lg text-sm font-medium transition-all ${
                    selectedSize.name === size.name
                      ? 'border-luxury-gold bg-luxury-gold text-luxury-gold-foreground'
                      : size.available
                        ? 'border-border hover:border-luxury-gold text-luxury-charcoal'
                        : 'border-border bg-luxury-cream/50 text-luxury-warm-gray cursor-not-allowed line-through'
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-luxury-charcoal">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 p-0 rounded-r-none"
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 p-0 rounded-l-none"
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              {MOCKED_PRODUCT_DATA.stockCount <= 10 && (
                <span className="text-sm text-luxury-burgundy">
                  Only {MOCKED_PRODUCT_DATA.stockCount} left in stock
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 bg-luxury-charcoal hover:bg-luxury-charcoal/90 text-luxury-charcoal-foreground"
                disabled={!MOCKED_PRODUCT_DATA.inStock}
              >
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                Add to Cart - ${(MOCKED_PRODUCT_DATA.price * quantity).toLocaleString()}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-gold-foreground"
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {MOCKED_PRODUCT_DATA.features.map((feature) => (
              <div key={feature.text} className="flex items-center space-x-3 text-sm">
                <feature.icon className="h-4 w-4 text-luxury-gold" />
                <span className="text-luxury-warm-gray">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({MOCKED_PRODUCT_DATA.reviews})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-4">
          <div className="prose prose-luxury max-w-none">
            <p className="text-luxury-warm-gray leading-relaxed text-lg">{product.description}</p>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-luxury-charcoal mb-3">Product Details</h4>
              <ul className="space-y-2">
                {MOCKED_PRODUCT_DATA.details.map((detail) => (
                  <li key={detail} className="text-luxury-warm-gray flex items-center">
                    <span className="w-2 h-2 bg-luxury-gold rounded-full mr-3 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-luxury-charcoal">
                  {MOCKED_PRODUCT_DATA.rating}
                </div>
                <ProductRating rating={MOCKED_PRODUCT_DATA.rating} />
                <div className="text-sm text-luxury-warm-gray">
                  Based on {MOCKED_PRODUCT_DATA.reviews} reviews
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {MOCKED_REVIEWS.map((review) => (
                <Card key={review.id} className="border-border/40">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <ProductRating rating={review.rating} />
                      <span className="text-sm text-luxury-warm-gray">{review.date}</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-luxury-charcoal">{review.title}</h5>
                      <p className="text-sm text-luxury-warm-gray">by {review.author}</p>
                    </div>
                    <p className="text-luxury-warm-gray leading-relaxed">{review.content}</p>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="outline"
                className="border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-luxury-charcoal-foreground"
              >
                Load More Reviews
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <section className="mt-16 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-luxury-charcoal">You May Also Like</h2>
          <p className="text-luxury-warm-gray">
            Discover more luxury pieces from our curated collection
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.slice(0, MAX_RELATED_PRODUCTS).map((relatedProduct) => (
            <ProductGridItem key={relatedProduct.id} product={relatedProduct} viewMode="grid" />
          ))}
        </div>
      </section>
    </section>
  );
};
