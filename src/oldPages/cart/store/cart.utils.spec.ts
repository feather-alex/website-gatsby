import { isItemUnavailable, filterOutDuplicateProducts, getCartItemImage } from './cart.utils';
import { ProductIdentifiers, CartItem } from './cart.types';
import { Image } from '../../../types/Product';

describe('cart utility functions', () => {
  describe('isItemUnavailable', () => {
    const unavailableItems: ProductIdentifiers[] = [
      {
        productIdentifier: 'athene-chair',
        variantIdentifier: 'default'
      },
      {
        productIdentifier: 'akepa-nightstand',
        variantIdentifier: 'akepa-acorn-color'
      }
    ];

    it('should return true if the item is unavailable', () => {
      const product: CartItem = {
        type: 'product',
        title: 'Athene Chair',
        brand: 'Feather',
        categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
        identifier: 'athene-chair',
        variantIdentifier: 'default',
        variantName: 'Default',
        rentalPrices: { '3': 100, '12': 10 },
        image: { desktop: '', mobile: '' },
        quantity: 1,
        rentalLength: 12,
        location: 'new-york',
        availability: []
      };

      const itemAvailability = isItemUnavailable(product, unavailableItems);

      expect(itemAvailability).toEqual(true);
    });

    it('should return false if the item is available', () => {
      const product: CartItem = {
        type: 'product',
        title: 'Batis Sofa',
        brand: 'Feather',
        categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
        identifier: 'batis-sofa',
        variantIdentifier: 'default',
        variantName: 'Default',
        rentalPrices: { '3': 100, '12': 10 },
        image: { desktop: '', mobile: '' },
        quantity: 1,
        rentalLength: 12,
        location: 'new-york',
        availability: []
      };

      const itemAvailability = isItemUnavailable(product, unavailableItems);

      expect(itemAvailability).toEqual(false);
    });
  });

  describe('filterOutDuplicateProducts', () => {
    it('should remove all duplicate items from the provided array', () => {
      const cartItems: CartItem[] = [
        {
          type: 'product',
          title: 'Athene Chair',
          brand: 'Feather',
          categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
          identifier: 'athene-chair',
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
          title: 'Akepa Nightstand',
          brand: 'Feather',
          categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
          identifier: 'akepa-nightstand',
          variantIdentifier: 'akepa-acorn-color',
          variantName: 'Acorn',
          rentalPrices: { '3': 100, '12': 10 },
          image: { desktop: '', mobile: '' },
          quantity: 1,
          rentalLength: 12,
          location: 'new-york',
          availability: []
        },
        {
          type: 'product',
          title: 'Akepa Nightstand',
          brand: 'Feather',
          categories: [{ identifier: 'bedroom', name: 'Bedroom' }],
          identifier: 'akepa-nightstand',
          variantIdentifier: 'akepa-acorn-color',
          variantName: 'Acorn',
          rentalPrices: { '3': 100, '12': 10 },
          image: { desktop: '', mobile: '' },
          quantity: 1,
          rentalLength: 12,
          location: 'new-york',
          availability: []
        }
      ];

      const uniqueItems = filterOutDuplicateProducts(cartItems);

      expect(uniqueItems.length).toEqual(2);
      expect(uniqueItems[0].identifier).not.toEqual(uniqueItems[1].identifier);
    });
  });

  describe('getCartItemImage', () => {
    it('should use mobile image if available', () => {
      const image: Image = {
        desktop: 'desktop_image.jpg',
        mobile: 'mobile_image.jpg'
      };

      expect(getCartItemImage(image)).toBe(`mobile_image.jpg`);
    });

    it('should use desktop image if mobile image is not available', () => {
      const image: Image = {
        desktop: 'desktop_image.jpg',
        mobile: null
      };

      expect(getCartItemImage(image)).toBe(`desktop_image.jpg`);
    });

    it('should return an empty string if both desktop and mobile are null', () => {
      const image: Image = {
        desktop: null,
        mobile: null
      };

      expect(getCartItemImage(image)).toBe('');
    });
  });
});
