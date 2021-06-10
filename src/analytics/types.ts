// The information about a product as required by
// Segment's ecommerce spec v2
export type AnalyticsProductFormatted = {
  product_id: string;
  sku: string;
  category: string;
  name: string;
  brand: string;
  variant: string;
  price: number;
  quantity: number;
  coupon?: string;
  position: number;
  url: string;
  image_url: string;
};
