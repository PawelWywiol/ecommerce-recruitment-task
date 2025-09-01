import type { Product } from '@/services/products/products.type';

import { MOCKED_PRODUCT_DATA } from '@/__mocks__/product';
import { MOCKED_REVIEWS } from '@/__mocks__/reviews';
import { ProductRating } from '../products/products.rating';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export const ProductTabs = ({ product }: { product: Product }) => (
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
);
