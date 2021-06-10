import * as selectors from './cart.selectors';
import * as actions from './cart.actions';
import * as sagas from './cart.sagas';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { select } from 'redux-saga/effects';
import { CartItem, ProductIdentifiers, PromoInfo, PromoType } from './cart.types';
import { v1 } from 'uuid';
import { initialState } from '../../auth/login/store/login.reducer';
import Request, { QueryParam, RequestMethod } from '../../../api/request';
import { APIError } from '../../../types/ReduxState';
import { DeliveryAreaIdentifier, MembershipState } from '../../../app/store/plan/plan.types';
import { getDeliveryAreaIdentifier } from '../../../app/store/plan/plan.selectors';

describe('Cart - Sagas', () => {
  const item: CartItem = {
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
  };

  describe('addItemToCart', () => {
    it('Should get the cart items, get the cart uid and add one item', () => {
      const items = [item];
      const uuid = v1();

      const action: actions.CartActions = {
        type: actions.ADD_ITEM_TO_CART,
        payload: item
      };

      return expectSaga(sagas.addItemToCart, action)
        .withState({ auth: { login: { ...initialState } } })
        .provide([
          [select(selectors.getCartItems), []],
          [select(selectors.getNumberOfItemsInCart), items.length],
          [select(selectors.getCartUuid), uuid]
        ])
        .put(actions.updateCartItems(items))
        .run();
    });

    it('Should get the cart items, get the cart uid and add one item', () => {
      const uuid = v1();

      const action: actions.CartActions = {
        type: actions.ADD_ITEM_TO_CART,
        payload: item
      };

      return expectSaga(sagas.addItemToCart, action)
        .withState({
          auth: { login: { ...initialState } }
        })
        .provide([
          [select(selectors.getCartItems), []],
          [select(selectors.getNumberOfItemsInCart), 0],
          [select(selectors.getCartUuid), uuid]
        ])
        .put(actions.updateCartItems([item]))
        .run();
    });
  });

  describe('removeItem', () => {
    const uuid = v1();

    const items: CartItem[] = [
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
      }
    ];

    it('should remove one available item from the cart', () => {
      const unavailableItems: ProductIdentifiers[] = [];

      const action: actions.CartActions = {
        type: actions.REMOVE_ITEM_FROM_CART,
        payload: items[0]
      };

      return expectSaga(sagas.removeItem, action)
        .provide([
          [select(selectors.getCartItems), items],
          [select(selectors.getUnavailableItems), unavailableItems],
          [select(selectors.getCartUuid), uuid]
        ])
        .put(actions.updateCartItems([items[1]]))
        .run();
    });

    it('should remove one unavailable item from the cart', () => {
      const unavailableItems: ProductIdentifiers[] = [
        {
          productIdentifier: 'athene-chair',
          variantIdentifier: 'default'
        }
      ];

      const action: actions.CartActions = {
        type: actions.REMOVE_ITEM_FROM_CART,
        payload: items[0]
      };

      return expectSaga(sagas.removeItem, action)
        .provide([
          [select(selectors.getCartItems), items],
          [select(selectors.getUnavailableItems), unavailableItems],
          [select(selectors.getCartUuid), uuid]
        ])
        .put(actions.updateUnavailableItems([]))
        .put(actions.updateCartItems([items[1]]))
        .run();
    });
  });

  describe('normalizeCartPrices', () => {
    it('Should get the cart items and then set their rental length', () => {
      const items = [item];

      const action: actions.CartActions = {
        type: actions.NORMALIZE_CART_PRICES,
        payload: { membershipState: MembershipState.MEMBER }
      };

      return expectSaga(sagas.normalizeCartPrices, action)
        .provide([[select(selectors.getCartItems), items]])
        .put(actions.updateCartItems(items))
        .run();
    });
  });

  describe('getUnavailableProducts', () => {
    const cartItems: CartItem[] = [
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
        title: 'Athene Chair',
        brand: 'Feather',
        categories: [],
        identifier: 'athene-chair',
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

    const deliveryAreaIdentifier = DeliveryAreaIdentifier.NY;

    const formattedItems: ProductIdentifiers[] = cartItems.map((itm) => ({
      productIdentifier: itm.identifier,
      variantIdentifier: itm.variantIdentifier
    }));

    const requestBody = {
      deliveryAreaIdentifier,
      products: formattedItems
    };

    it('should handle a successful request to fetch unavailable products', () => {
      const mockResponse: ProductIdentifiers[] = [
        {
          productIdentifier: 'athene-chair',
          variantIdentifier: 'default'
        }
      ];

      return expectSaga(sagas.getUnavailableProducts)
        .provide([
          [matchers.select(getDeliveryAreaIdentifier), deliveryAreaIdentifier],
          [matchers.select(selectors.getCartItems), cartItems],
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/products/availability', undefined, requestBody),
            mockResponse
          ]
        ])
        .put(actions.getUnavailableProductsSuccess(mockResponse))
        .run();
    });

    it('should handle a failed request to fetch unavailable products', () => {
      const error: APIError = {
        error: 'oh me oh my',
        message: 'i could go for some apple pie',
        status: 418
      };

      return expectSaga(sagas.getUnavailableProducts)
        .provide([
          [matchers.select(getDeliveryAreaIdentifier), deliveryAreaIdentifier],
          [matchers.select(selectors.getCartItems), cartItems],
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/products/availability', undefined, requestBody),
            Promise.reject(error)
          ]
        ])
        .put(actions.getUnavailableProductsFailure(error))
        .run();
    });
  });

  describe('getCartRecommendation', () => {
    const items: CartItem[] = [
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
      }
    ];

    const deliveryAreaIdentifier = DeliveryAreaIdentifier.NY;
    const mockResponse = {
      products: [
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
      ]
    };

    const queryParams: QueryParam[] = [
      {
        name: 'deliveryArea',
        value: deliveryAreaIdentifier
      },
      {
        name: 'productIdentifiers',
        value: ['athene-chair']
      }
    ];

    it('should handle a successful request to fetch recommendations', () => {
      return expectSaga(sagas.getCartRecommendations)
        .provide([
          [matchers.select(getDeliveryAreaIdentifier), deliveryAreaIdentifier],
          [select(selectors.getCartItems), items],
          [matchers.call([Request, 'send'], RequestMethod.GET, `/recommendations/products`, queryParams), mockResponse]
        ])
        .put(actions.getRecommendationsSuccess(mockResponse.products))
        .run();
    });

    it('should handle a failed request to fetch recommendations', () => {
      const error: APIError = {
        error: 'oh me oh my',
        message: 'i could go for some apple pie',
        status: 418,
        body: {
          error: 'promo code'
        }
      };

      return expectSaga(sagas.getCartRecommendations)
        .provide([
          [matchers.select(getDeliveryAreaIdentifier), deliveryAreaIdentifier],
          [select(selectors.getCartItems), items],
          [
            matchers.call([Request, 'send'], RequestMethod.GET, `/recommendations/products`, queryParams),
            Promise.reject(error)
          ]
        ])
        .put(actions.getRecommendationsFailure(error))
        .run();
    });
  });

  describe('handleGetPromo', () => {
    const action: actions.GetPromoRequestAction = {
      type: actions.GET_PROMO_REQUEST,
      payload: { subTotal: 10, promo: 'cat', deliveryAreaIdentifier: DeliveryAreaIdentifier.NY, rentalLength: 12 }
    };

    const requestBody = {
      planMonths: 12,
      promoCode: 'cat',
      subtotal: 10,
      delivery: {
        area: 'new-york'
      }
    };

    it('should handle a successful request to fetch unavailable products', () => {
      const mockResponse: { discountInfo: PromoInfo } = {
        discountInfo: {
          code: 'cat',
          amount: 50,
          type: PromoType.Fixed,
          special: false
        }
      };

      return expectSaga(sagas.handleGetPromo, action)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/checkout/amounts', undefined, requestBody),
            mockResponse
          ]
        ])
        .put(actions.getPromoSuccess(mockResponse.discountInfo))
        .run();
    });

    it('should handle a failed request to fetch unavailable products', () => {
      const error: APIError = {
        error: 'oh me oh my',
        message: 'i could go for some apple pie',
        status: 418,
        body: {
          error: 'promo code'
        }
      };

      return expectSaga(sagas.handleGetPromo, action)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/checkout/amounts', undefined, requestBody),
            Promise.reject(error)
          ]
        ])
        .put(actions.getPromoFailure(error))
        .run();
    });
  });
});
