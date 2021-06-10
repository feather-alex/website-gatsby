import { put, call, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import * as actions from './cart.actions';
import { CartItem, ProductIdentifiers, ProductRecommendation } from './cart.types';
import Analytics from '../../../analytics/analytics';
import { CART } from '../../../analytics/cart/events';
import {
  addItemPayloadMapping,
  removeItemPayloadMapping,
  updateCartPayloadMapping
} from '../../../analytics/cart/payload-mappings';
import { getCartItems, getCartUuid, getUnavailableItems } from './cart.selectors';
import { getIsAuthenticated } from '../../auth/login/store/login.selectors';
import { toggleOverlay } from '../../../app/store/overlay/overlay.actions';
import { Overlays } from '../../../app/store/overlay/overlay.types';
import Request, { QueryParam, RequestMethod } from '../../../api/request';
import { filterOutDuplicateProducts } from './cart.utils';
import { MembershipState } from '../../../app/store/plan/plan.types';
import { getMembershipFee } from '../../account/accountOverview/store/account.overview.selectors';
import {
  getRentalLength,
  getDeliveryFee,
  getMembershipState,
  getDeliveryZipCode,
  getDeliveryAreaIdentifier
} from '../../../app/store/plan/plan.selectors';
import { calcSubTotal } from '../../../utils/cart';
import { CheckoutAmountsResource } from '../../../types/Checkout';

export function* addItemToCart(action: actions.AddToCartAction): SagaIterator {
  // If a user is currently logged in, we want to display a modal
  // and prevent them from adding items to their cart.
  const isUserLoggedIn: boolean = yield select(getIsAuthenticated);

  if (isUserLoggedIn) {
    yield put(toggleOverlay(Overlays.AddItemsToCurrentPlanOverlay, true));
    return;
  }

  const {
    quantity,
    identifier,
    variantIdentifier,
    rentalPrices,
    rentalLength,
    title,
    bundleIdentifier,
    bundleVariantIdentifier,
    categories,
    brand,
    image
  } = action.payload;

  const items: CartItem[] = yield select(getCartItems);

  // important cloning of the array to avoid mutation
  const newItems = [...items];
  // 1 CartItem for each product quantity.
  for (let i = 0; i < quantity; i++) {
    newItems.push({
      ...action.payload,
      quantity: 1
    });
  }

  // Sort products alphabetically by title.
  const sortedItems = newItems.sort((a: CartItem, b: CartItem) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  });

  // update cart action put here
  yield put(actions.updateCartItems(sortedItems));

  const cartUuid = yield select(getCartUuid);

  Analytics.trackEvent(
    CART.PRODUCT_ADDED,
    addItemPayloadMapping({
      identifier,
      variantIdentifier,
      rentalPrice: rentalPrices[rentalLength],
      cartItems: items,
      cartUuid,
      categories,
      brand,
      title,
      image,
      bundleVariantIdentifier,
      bundleIdentifier
    })
  );
}

export function* removeItem(action: actions.RemoveFromCartAction): SagaIterator {
  const { identifier, variantIdentifier, rentalPrices, rentalLength, categories, brand, title, image } = action.payload;

  const updatedCartItems: CartItem[] = [];
  const updatedUnavailableItems: ProductIdentifiers[] = [];

  const currentCartItems: CartItem[] = yield select(getCartItems);
  const unavailableItems: ProductIdentifiers[] = yield select(getUnavailableItems);

  // If this is the first occurrence of this product, don't
  // push it to the updated cart. We're only removing the
  // first occurrence of a product.
  let shouldRemoveItem = true;
  currentCartItems.forEach((item) => {
    if (item.identifier === identifier && item.variantIdentifier === variantIdentifier && shouldRemoveItem) {
      shouldRemoveItem = false;
    } else {
      updatedCartItems.push(item);
    }
  });

  // Does this item occur more than once in the user's cart?
  const additionalItemInstances = updatedCartItems.find(
    (item) => item.identifier === identifier && item.variantIdentifier === variantIdentifier
  );
  // Is this item included in our list of unavailable items?
  const isItemUnavailable = unavailableItems.find(
    (item) => item.productIdentifier === identifier && item.variantIdentifier === variantIdentifier
  );

  // If this is the only instance of this item in the cart,
  // and if this item is listed as unavailable, we should
  // remove this item from our list of unavailable cart items.
  if (!additionalItemInstances && isItemUnavailable) {
    unavailableItems.forEach((item) => {
      if (item.productIdentifier !== identifier && item.variantIdentifier !== variantIdentifier) {
        updatedUnavailableItems.push(item);
      }
    });
    yield put(actions.updateUnavailableItems(updatedUnavailableItems));
  }

  yield put(actions.updateCartItems(updatedCartItems));

  const cartUuid = yield select(getCartUuid);

  Analytics.trackEvent(
    CART.PRODUCT_REMOVED,
    removeItemPayloadMapping({
      identifier,
      cartUuid,
      variantIdentifier,
      rentalPrice: rentalPrices[rentalLength],
      categories,
      brand,
      title,
      image
    })
  );
}

export function* normalizeCartPrices(action: actions.NormalizeCartAction): SagaIterator {
  const { membershipState } = action.payload;
  const items: CartItem[] = yield select(getCartItems);

  const newItems = items.map((item) => ({
    ...item,
    rentalLength: membershipState === MembershipState.MEMBER ? 12 : 3
  }));

  yield put(actions.updateCartItems(newItems));
}

export function* getUnavailableProducts(): SagaIterator {
  try {
    const deliveryAreaIdentifier = yield select(getDeliveryAreaIdentifier);
    const cartItems: CartItem[] = yield select(getCartItems);

    const uniqueCartItems = filterOutDuplicateProducts(cartItems);

    const formattedCartItems: ProductIdentifiers[] = uniqueCartItems.map((item) => ({
      productIdentifier: item.identifier,
      variantIdentifier: item.variantIdentifier
    }));

    const requestBody = {
      deliveryAreaIdentifier,
      products: formattedCartItems
    };

    const unavailableItems: ProductIdentifiers[] = yield call(
      [Request, 'send'],
      RequestMethod.POST,
      '/products/availability',
      undefined,
      requestBody
    );

    yield put(actions.getUnavailableProductsSuccess(unavailableItems));
  } catch (error) {
    yield put(actions.getUnavailableProductsFailure(error));
  }
}

export function* handleCartItemsUpdate(action: actions.UpdateCartItemsAction) {
  const cartItems = action.payload.items;
  const membershipFee = yield select(getMembershipFee);
  const rentalLength = yield select(getRentalLength);
  const cartSubtotal = yield call(calcSubTotal, cartItems, rentalLength);
  const deliveryFee = yield select(getDeliveryFee);
  const membershipState = yield select(getMembershipState);
  const deliveryZipCode = yield select(getDeliveryZipCode);
  const deliveryAreaIdentifier = yield select(getDeliveryAreaIdentifier);
  const cartUuid = yield select(getCartUuid);

  yield call(
    Analytics.trackEvent,
    CART.UPDATE,
    updateCartPayloadMapping({
      membershipFee,
      cartSubtotal,
      deliveryFee,
      monthlyTotal: cartSubtotal + membershipFee,
      totalDueNow: cartSubtotal + membershipFee + deliveryFee,
      planType: membershipState === MembershipState.MEMBER ? 'member' : 'non-member',
      deliveryZipCode,
      deliveryAreaIdentifier,
      cartItems,
      cartUuid
    })
  );
}

export function* handleGetPromo(action: actions.GetPromoRequestAction): SagaIterator {
  const { promo, rentalLength, subTotal, deliveryAreaIdentifier } = action.payload;
  if (promo === null) {
    yield put(actions.resetPromo());
  }
  const amountData = {
    planMonths: rentalLength,
    promoCode: promo ? promo.trim() : undefined,
    subtotal: subTotal,
    delivery: {
      area: deliveryAreaIdentifier ? deliveryAreaIdentifier.trim() : undefined
    }
  };

  try {
    const response: CheckoutAmountsResource = yield call(
      [Request, 'send'],
      RequestMethod.POST,
      '/checkout/amounts',
      undefined,
      amountData
    );
    yield put(actions.getPromoSuccess(response.discountInfo));
  } catch (err) {
    yield put(actions.getPromoFailure(err));
  }
}

export function* getCartRecommendations(): SagaIterator {
  const deliveryAreaIdentifier = yield select(getDeliveryAreaIdentifier);
  const cartItems: CartItem[] = yield select(getCartItems);
  const uniqueCartItems = filterOutDuplicateProducts(cartItems);
  const productIdentifiers: string[] = uniqueCartItems.map((item) => item.identifier);

  const queryParams: QueryParam[] = [
    {
      name: 'deliveryArea',
      value: deliveryAreaIdentifier ? deliveryAreaIdentifier.trim() : ''
    },
    {
      name: 'productIdentifiers',
      value: productIdentifiers
    }
  ];

  try {
    const response: { products: ProductRecommendation[] } = yield call(
      [Request, 'send'],
      RequestMethod.GET,
      `/recommendations/products`,
      queryParams
    );

    yield put(actions.getRecommendationsSuccess(response.products));
  } catch (err) {
    yield put(actions.getRecommendationsFailure(err));
  }
}

export default function* cartWatcher(): SagaIterator {
  yield takeEvery(actions.ADD_ITEM_TO_CART, addItemToCart);
  yield takeEvery(actions.REMOVE_ITEM_FROM_CART, removeItem);
  yield takeLatest(actions.NORMALIZE_CART_PRICES, normalizeCartPrices);
  yield takeLatest(actions.GET_UNAVAILABLE_PRODUCTS_REQUEST, getUnavailableProducts);
  yield takeLatest(actions.UPDATE_CART_ITEMS, handleCartItemsUpdate);
  yield takeLatest(actions.GET_PROMO_REQUEST, handleGetPromo);
  yield takeLatest(actions.GET_RECOMMENDATIONS_REQUEST, getCartRecommendations);
}
