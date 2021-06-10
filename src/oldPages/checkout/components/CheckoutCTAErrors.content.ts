export interface CheckoutCTAErrorContent {
  dataCy: string;
  to: string;
  error: string;
  ctaMessage: string;
}

enum CHECKOUT_ERRORS {
  OUT_OF_STOCK = 'outOfStock'
}

export const CHECKOUT_CTA_ERRORS: Record<CHECKOUT_ERRORS, CheckoutCTAErrorContent> = {
  outOfStock: {
    dataCy: 'out-of-stock-checkout',
    to: '/cart',
    error:
      'It looks like some items are unavailable or no longer in stock. Please remove or change the items and try again.',
    ctaMessage: 'Return to cart'
  }
};
