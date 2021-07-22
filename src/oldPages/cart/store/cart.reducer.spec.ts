import { initialState } from "./cart.reducer";
import cartReducer from "./cart.reducer";
import * as actions from "./cart.actions";
import {
  Cart,
  ProductIdentifiers,
  ProductRecommendation,
  PromoState,
  PromoType,
} from "./cart.types";
import { APIError } from "../../../types/ReduxState";
import { DeliveryAreaIdentifier } from "../../../app/store/plan/plan.types";

describe("Cart - Reducer", () => {
  let state: Cart;

  beforeEach(() => (state = { ...initialState }));

  it("Should handle action: UPDATE_CART_ITEMS", () => {
    const payload = { items: [] };

    const action: actions.CartActions = {
      type: actions.UPDATE_CART_ITEMS,
      payload,
    };

    const reduced = cartReducer(state, action);

    expect(reduced.items).toEqual(payload.items);
  });

  it("Should handle action: RESET_CART", () => {
    state = {
      ...initialState,
      items: [
        {
          type: "product",
          title: "Akepa Dresser",
          brand: "Feather",
          categories: [{ identifier: "bedroom", name: "Bedroom" }],
          identifier: "akepa-dresser",
          variantIdentifier: "default",
          variantName: "Default",
          rentalPrices: { "3": 100, "12": 10 },
          image: { desktop: "", mobile: "" },
          quantity: 1,
          rentalLength: 12,
          location: "new-york",
          availability: [],
        },
      ],
    };

    const action: actions.CartActions = {
      type: actions.RESET_CART,
    };

    const reduced = cartReducer(state, action);

    expect(reduced.items).toEqual([]);
  });

  it("should handle action: GET_UNAVAILABLE_PRODUCTS_REQUEST", () => {
    const action: actions.CartActions = {
      type: actions.GET_UNAVAILABLE_PRODUCTS_REQUEST,
      payload: { deliveryAreaIdentifier: DeliveryAreaIdentifier.NY },
    };

    const reduced = cartReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
  });

  it("should handle action: GET_UNAVAILABLE_PRODUCTS_SUCCESS", () => {
    const unavailableItems: ProductIdentifiers[] = [
      {
        productIdentifier: "athene-chair",
        variantIdentifier: "default",
      },
      {
        productIdentifier: "akepa-nightstand",
        variantIdentifier: "akepa-color-acorn",
      },
    ];

    const action: actions.CartActions = {
      type: actions.GET_UNAVAILABLE_PRODUCTS_SUCCESS,
      payload: { unavailableItems },
    };

    const reduced = cartReducer(state, action);

    expect(reduced.error).toEqual(null);
    expect(reduced.isFetching).toEqual(false);
    expect(reduced.unavailableItems.length).toEqual(2);
  });

  it("should handle action: GET_UNAVAILABLE_PRODUCTS_FAILURE", () => {
    const error: APIError = {
      error: "lil err boi",
      message: "attention. this is lil err boi. i cause problems. fear me.",
      status: 418,
    };

    const action: actions.CartActions = {
      type: actions.GET_UNAVAILABLE_PRODUCTS_FAILURE,
      payload: { error },
      error: true,
    };

    const reduced = cartReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.unavailableItems.length).toEqual(0);
    expect(reduced.error).toEqual(error);
  });

  it("Should handle action: GET_PROMO_REQUEST", () => {
    state = {
      ...initialState,
    };

    const action: actions.CartActions = {
      type: actions.GET_PROMO_REQUEST,
      payload: {
        promo: "PROMO",
        rentalLength: 12,
        subTotal: 200,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      },
    };

    const reduced = cartReducer(state, action);
    expect(reduced.promoState).toEqual(PromoState.FETCHING);
  });

  it("Should handle action: GET_PROMO_SUCCESS", () => {
    state = {
      ...initialState,
    };

    const action: actions.CartActions = {
      type: actions.GET_PROMO_SUCCESS,
      payload: {
        promoInfo: {
          code: "cat",
          amount: 50,
          type: PromoType.Fixed,
          special: false,
        },
      },
    };

    const reduced = cartReducer(state, action);
    expect(reduced.promoState).toEqual(PromoState.VALID);
    expect(reduced.promoError).toEqual(null);
    expect(reduced.promo).toEqual({
      code: "cat",
      amount: 50,
      type: "Fixed",
      special: false,
    });
  });

  it("Should handle action: GET_PROMO_FAILURE", () => {
    state = {
      ...initialState,
    };

    const error = { message: "help", error: "fail", status: 500 };

    const action: actions.CartActions = {
      type: actions.GET_PROMO_FAILURE,
      payload: {
        error,
      },
    };

    const reduced = cartReducer(state, action);
    expect(reduced.promoState).toEqual(PromoState.INVALID);
    expect(reduced.promo).toEqual(null);
    expect(reduced.promoError).toEqual(error);
  });

  it("Should handle action: RESET_PROMO", () => {
    state = {
      ...initialState,
      promoState: PromoState.VALID,
      promoError: null,
      promo: {
        code: "cat",
        amount: 50,
        type: PromoType.Fixed,
        special: false,
      },
    };

    const action: actions.CartActions = {
      type: actions.RESET_CART,
    };

    const reduced = cartReducer(state, action);
    expect(reduced.promoState).toEqual(PromoState.EMPTY);
    expect(reduced.promo).toEqual(null);
    expect(reduced.promoError).toEqual(null);
  });

  it("Should handle action: GET_RECOMMENDATIONS_REQUEST", () => {
    state = {
      ...initialState,
      isRecommendationsFetching: false,
    };

    const action: actions.CartActions = {
      type: actions.GET_RECOMMENDATIONS_REQUEST,
      payload: { deliveryAreaIdentifier: DeliveryAreaIdentifier.NY },
    };

    const reduced = cartReducer(state, action);
    expect(reduced.recommendations).toEqual([]);
    expect(reduced.isRecommendationsFetching).toEqual(true);
  });

  it("Should handle action: GET_RECOMMENDATIONS_SUCCESS", () => {
    const recommendations: ProductRecommendation[] = [
      {
        title: "Product title",
        identifier: "product-identifier",
        listingImage: {
          desktop: "desktop-image",
          mobile: "mobile-image",
        },
        rentalPrices: {
          "3": 40,
          "12": 80,
        },
        variantCounts: {
          structure: 1,
          color: 2,
        },
      },
    ];

    state = {
      ...initialState,
      recommendationsError: null,
      isRecommendationsFetching: true,
    };

    const action: actions.CartActions = {
      type: actions.GET_RECOMMENDATIONS_SUCCESS,
      payload: { recommendations },
    };

    const reduced = cartReducer(state, action);
    expect(reduced.recommendations).toEqual(recommendations);
    expect(reduced.isRecommendationsFetching).toEqual(false);
    expect(reduced.recommendationsError).toEqual(null);
  });

  it("Should handle action: GET_RECOMMENDATIONS_FAILURE", () => {
    const error = { message: "error message", error: "An error", status: 500 };
    state = {
      ...initialState,
      recommendationsError: error,
      isRecommendationsFetching: true,
    };

    const action: actions.CartActions = {
      type: actions.GET_RECOMMENDATIONS_FAILURE,
      payload: { error },
    };

    const reduced = cartReducer(state, action);
    expect(reduced.recommendations).toEqual([]);
    expect(reduced.recommendationsError).toEqual(error);
    expect(reduced.isRecommendationsFetching).toEqual(false);
  });
});
