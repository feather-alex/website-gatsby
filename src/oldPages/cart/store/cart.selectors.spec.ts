import { State as GlobalState, APIError } from '../../../types/ReduxState';
import * as selectors from './cart.selectors';
import { initialState } from './cart.reducer';
import { initialState as planInitialState } from '../../../app/store/plan/plan.reducer';
import { Cart, CartItem, ProductIdentifiers, PromoInfo, PromoType, ProductRecommendation } from './cart.types';
import { v1 } from 'uuid';

describe('Cart - Selectors', () => {
  let state: Cart;

  beforeEach(() => (state = { ...initialState }));

  describe('cart uuid', () => {
    it('Should return the value of: cart.uuid', () => {
      const uuid = v1();

      state = {
        ...state,
        uuid
      };

      const selected = selectors.getCartUuid({ cart: state } as GlobalState);

      expect(selected).toEqual(uuid);
    });
  });

  describe('cart items', () => {
    it('Should return the value of: cart.items', () => {
      const items: CartItem[] = [
        {
          type: 'product',
          title: 'Akepa Dresser',
          brand: 'Feather',
          categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
          identifier: 'akepa-dresser',
          variantIdentifier: 'default',
          variantName: 'Default',
          rentalPrices: { '3': 100, '12': 10 },
          image: { desktop: '', mobile: '' },
          quantity: 1,
          rentalLength: 12,
          location: 'new-york',
          availability: []
        }
      ];

      state = {
        ...state,
        items
      };

      const selected = selectors.getCartItems({ cart: state } as GlobalState);

      expect(selected).toEqual(items);
    });
  });

  it('should return the value of: isFetching', () => {
    state = {
      ...state,
      isFetching: true
    };

    const selected = selectors.getIsFetching({ cart: state } as GlobalState);

    expect(selected).toEqual(true);
  });

  it('should return the value of: unavailableItems', () => {
    const unavailableItems: ProductIdentifiers[] = [
      {
        productIdentifier: 'athene-chair',
        variantIdentifier: 'default'
      },
      {
        productIdentifier: 'akepa-nightstand',
        variantIdentifier: 'akepa-color-acorn'
      }
    ];

    state = {
      ...state,
      unavailableItems
    };

    const selected = selectors.getUnavailableItems({ cart: state } as GlobalState);

    expect(selected).toEqual(unavailableItems);
    expect(selected.length).toEqual(2);
  });

  it('should return the value of: error', () => {
    const error: APIError = {
      error: 'geeze, chill with the errors',
      message: "ain't no thang",
      status: 418
    };

    state = {
      ...state,
      error
    };

    const selected = selectors.getError({ cart: state } as GlobalState);

    expect(selected).toEqual(error);
  });

  describe('cartContainsUnavailableProducts', () => {
    it('should return true if there are unavailable items', () => {
      const unavailableItems: ProductIdentifiers[] = [
        {
          productIdentifier: 'athene-chair',
          variantIdentifier: 'default'
        }
      ];

      state = {
        ...state,
        unavailableItems
      };

      const selected = selectors.getCartContainsUnavailableProducts({ cart: state } as GlobalState);

      expect(selected).toEqual(true);
    });

    it('should return false if there are no unavailable items', () => {
      const unavailableItems: ProductIdentifiers[] = [];

      state = {
        ...state,
        unavailableItems
      };

      const selected = selectors.getCartContainsUnavailableProducts({ cart: state } as GlobalState);

      expect(selected).toEqual(false);
    });
  });

  describe('getRecommendations', () => {
    it('should return the recommendations', () => {
      const recommendations: ProductRecommendation[] = [
        {
          title: 'Product title',
          identifier: 'product-identifier',
          listingImage: {
            desktop: 'desktop-image',
            mobile: 'mobile-image'
          },
          rentalPrices: {
            '3': 40,
            '12': 80
          },
          variantCounts: {
            structure: 1,
            color: 2
          }
        }
      ];

      state = {
        ...state,
        recommendations
      };

      const selected = selectors.getRecommendations({ cart: state } as GlobalState);

      expect(selected).toEqual(recommendations);
    });
  });

  describe('getIsRecommendationsFetching', () => {
    it('should return recommendations fetching bool', () => {
      state = {
        ...state,
        isRecommendationsFetching: true
      };

      const selected = selectors.getIsRecommendationsFetching({ cart: state } as GlobalState);

      expect(selected).toEqual(true);
    });
  });

  describe('getRecommendationsError', () => {
    it('should return recommendations fetching bool', () => {
      const error: APIError = {
        error: 'An error',
        message: 'An error message',
        status: 418
      };

      state = {
        ...state,
        recommendationsError: error
      };

      const selected = selectors.getRecommendationsError({ cart: state } as GlobalState);

      expect(selected).toEqual(error);
    });
  });

  describe('getPromoDescription', () => {
    it('should get description for fixed discount', () => {
      const fixedDiscount: PromoInfo = {
        amount: 10,
        code: 'TEN',
        special: false,
        type: PromoType.Fixed
      };

      state = { ...state, promo: fixedDiscount };

      const selected = selectors.getPromoDescription({ cart: state } as GlobalState);

      expect(selected).toBe('$10 off first month');
    });

    it('should get description for percentage discount', () => {
      const percentageDiscount: PromoInfo = {
        amount: 9,
        code: 'RASPBERRY',
        special: false,
        type: PromoType.Percentage
      };

      state = { ...state, promo: percentageDiscount };

      const selected = selectors.getPromoDescription({ cart: state } as GlobalState);

      expect(selected).toBe('9% off monthly');
    });

    it('should get description for reverse percentage discount', () => {
      const percentageDiscount: PromoInfo = {
        amount: 3.14,
        code: 'PI',
        special: true,
        type: PromoType.Percentage
      };

      state = { ...state, promo: percentageDiscount };

      const selected = selectors.getPromoDescription({ cart: state } as GlobalState);

      expect(selected).toBe('3.14% above monthly');
    });

    it('should return empty string if there is no promo', () => {
      state = { ...state, promo: null };

      const selected = selectors.getPromoDescription({ cart: state } as GlobalState);

      expect(selected).toBe('');
    });
  });

  describe('getCartSubtotal', () => {
    it('should return 0 if the rental length has not been set', () => {
      const selected = selectors.getCartSubtotal({ cart: state, plan: planInitialState } as GlobalState);

      expect(selected).toEqual(0);
    });

    it('should return the cart subtotal if the rental length has been set', () => {
      const items: CartItem[] = [
        {
          type: 'product',
          title: 'Akepa Dresser',
          brand: 'Feather',
          categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
          identifier: 'akepa-dresser',
          variantIdentifier: 'default',
          variantName: 'Default',
          rentalPrices: { '3': 100, '12': 10 },
          image: { desktop: '', mobile: '' },
          quantity: 1,
          rentalLength: 12,
          location: 'new-york',
          availability: []
        },
        {
          type: 'product',
          title: 'Akepa Dresser',
          brand: 'Feather',
          categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
          identifier: 'akepa-dresser',
          variantIdentifier: 'default',
          variantName: 'Default',
          rentalPrices: { '3': 100, '12': 10 },
          image: { desktop: '', mobile: '' },
          quantity: 1,
          rentalLength: 12,
          location: 'new-york',
          availability: []
        },
        {
          type: 'product',
          title: 'Akepa Dresser',
          brand: 'Feather',
          categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
          identifier: 'akepa-dresser',
          variantIdentifier: 'default',
          variantName: 'Default',
          rentalPrices: { '3': 100, '12': 10 },
          image: { desktop: '', mobile: '' },
          quantity: 1,
          rentalLength: 12,
          location: 'new-york',
          availability: []
        }
      ];

      state = {
        ...initialState,
        items
      };

      const planState = {
        ...planInitialState,
        rentalLength: 12
      };

      const selected = selectors.getCartSubtotal({ cart: state, plan: planState } as GlobalState);

      expect(selected).toEqual(30);
    });
  });

  describe('getIsCartMinimumMet', () => {
    const planState = {
      ...planInitialState,
      rentalLength: 12,
      cartMinimum: 29
    };

    it('should return false if the subtotal is lower than the cartMinimum', () => {
      const items: CartItem[] = [
        {
          type: 'product',
          title: 'Akepa Dresser',
          brand: 'Feather',
          categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
          identifier: 'akepa-dresser',
          variantIdentifier: 'default',
          variantName: 'Default',
          rentalPrices: { '3': 100, '12': 10 },
          image: { desktop: '', mobile: '' },
          quantity: 1,
          rentalLength: 12,
          location: 'new-york',
          availability: []
        }
      ];

      state = {
        ...initialState,
        items
      };

      const selected = selectors.getIsCartMinimumMet({ cart: state, plan: planState } as GlobalState);

      expect(selected).toEqual(false);
    });

    it('should return true if the subtotal is higher than the cartMinimum', () => {
      const items: CartItem[] = [
        {
          type: 'product',
          title: 'Akepa Dresser',
          brand: 'Feather',
          categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
          identifier: 'akepa-dresser',
          variantIdentifier: 'default',
          variantName: 'Default',
          rentalPrices: { '3': 100, '12': 10 },
          image: { desktop: '', mobile: '' },
          quantity: 1,
          rentalLength: 12,
          location: 'new-york',
          availability: []
        },
        {
          type: 'product',
          title: 'Akepa Bed',
          brand: 'Feather',
          categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
          identifier: 'akepa-bed',
          variantIdentifier: 'default',
          variantName: 'Default',
          rentalPrices: { '3': 350, '12': 35 },
          image: { desktop: '', mobile: '' },
          quantity: 1,
          rentalLength: 12,
          location: 'new-york',
          availability: []
        }
      ];

      state = {
        ...initialState,
        items
      };

      const selected = selectors.getIsCartMinimumMet({ cart: state, plan: planState } as GlobalState);

      expect(selected).toEqual(true);
    });
  });
});
