import * as actions from "./cart.actions";
import {
  CartItem,
  ProductIdentifiers,
  ProductRecommendation,
  PromoInfo,
  PromoType,
} from "./cart.types";
import { APIError } from "../../../types/ReduxState";
import {
  DeliveryAreaIdentifier,
  MembershipState,
} from "../../../app/store/plan/plan.types";

describe("Cart - Actions", () => {
  it("Should add an item to the cart", () => {
    const item: CartItem = {
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
    };

    const expectedAction: actions.CartActions = {
      type: actions.ADD_ITEM_TO_CART,
      payload: item,
    };

    const actionCreator = actions.addToCart(item);

    expect(actionCreator).toEqual(expectedAction);
  });

  it("Should remove an item from the cart", () => {
    const item: CartItem = {
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
    };

    const expectedAction: actions.CartActions = {
      type: actions.REMOVE_ITEM_FROM_CART,
      payload: item,
    };

    const actionCreator = actions.removeCartItem(item);

    expect(actionCreator).toEqual(expectedAction);
  });

  it("Should update items in the cart", () => {
    const items: CartItem[] = [
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
    ];

    const expectedAction: actions.CartActions = {
      type: actions.UPDATE_CART_ITEMS,
      payload: { items },
    };

    const actionCreator = actions.updateCartItems(items);

    expect(actionCreator).toEqual(expectedAction);
  });

  it("Should reset the cart", () => {
    const expectedAction: actions.CartActions = {
      type: actions.RESET_CART,
    };

    const actionCreator = actions.resetCart();

    expect(actionCreator).toEqual(expectedAction);
  });

  it("Should normalize cart item prices", () => {
    const membershipState = MembershipState.MEMBER;

    const expectedAction: actions.CartActions = {
      type: actions.NORMALIZE_CART_PRICES,
      payload: { membershipState },
    };

    const actionCreator = actions.normalizeCartPrices(membershipState);

    expect(actionCreator).toEqual(expectedAction);
  });

  describe("getUnavailableCartItems", () => {
    it("should handle a request to get unavailable cart items", () => {
      const expectedAction: actions.CartActions = {
        type: actions.GET_UNAVAILABLE_PRODUCTS_REQUEST,
      };

      const actualAction = actions.getUnavailableProductsRequest();

      expect(actualAction).toEqual(expectedAction);
    });

    it("should handle a successful response", () => {
      const unavailableItems: ProductIdentifiers[] = [
        {
          productIdentifier: "athene-chair",
          variantIdentifier: "default",
        },
      ];

      const expectedAction: actions.CartActions = {
        type: actions.GET_UNAVAILABLE_PRODUCTS_SUCCESS,
        payload: { unavailableItems },
      };

      const actualAction =
        actions.getUnavailableProductsSuccess(unavailableItems);

      expect(actualAction).toEqual(expectedAction);
    });

    it("should handle a failed request", () => {
      const error: APIError = {
        error: "oh nooooooo",
        message: "something happened. something bad. send help.",
        status: 500,
      };

      const expectedAction: actions.CartActions = {
        type: actions.GET_UNAVAILABLE_PRODUCTS_FAILURE,
        payload: { error },
        error: true,
      };

      const actualAction = actions.getUnavailableProductsFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe("getRecommendations", () => {
    it("should handle a request to get cart product recommendations", () => {
      const expectedAction: actions.CartActions = {
        type: actions.GET_RECOMMENDATIONS_REQUEST,
      };

      const actualAction = actions.getRecommendationsRequest();

      expect(actualAction).toEqual(expectedAction);
    });

    it("should handle a successful response", () => {
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

      const expectedAction: actions.CartActions = {
        type: actions.GET_RECOMMENDATIONS_SUCCESS,
        payload: { recommendations },
      };

      const actualAction = actions.getRecommendationsSuccess(recommendations);

      expect(actualAction).toEqual(expectedAction);
    });

    it("should handle a failed request", () => {
      const error: APIError = {
        error: "An Error",
        message: "An error message",
        status: 500,
      };

      const expectedAction: actions.CartActions = {
        type: actions.GET_RECOMMENDATIONS_FAILURE,
        payload: { error },
      };

      const actualAction = actions.getRecommendationsFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe("getPromo", () => {
    it("should handle a request to get promo", () => {
      const payload = {
        rentalLength: 12,
        promo: "cat",
        subTotal: 10,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
      };

      const expectedAction: actions.GetPromoRequestAction = {
        type: actions.GET_PROMO_REQUEST,
        payload,
      };

      const actualAction = actions.getPromoRequest(payload);

      expect(actualAction).toEqual(expectedAction);
    });

    it("should handle a successful response", () => {
      const promoInfo: PromoInfo = {
        code: "cat",
        amount: 50,
        type: PromoType.Fixed,
        special: false,
      };

      const expectedAction: actions.CartActions = {
        type: actions.GET_PROMO_SUCCESS,
        payload: { promoInfo },
      };

      const actualAction = actions.getPromoSuccess(promoInfo);

      expect(actualAction).toEqual(expectedAction);
    });

    it("should handle a failed request", () => {
      const error: APIError = {
        error: "oh nooooooo",
        message: "something happened. something bad. send help.",
        status: 500,
      };

      const expectedAction: actions.CartActions = {
        type: actions.GET_PROMO_FAILURE,
        payload: { error },
        error: true,
      };

      const actualAction = actions.getPromoFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });
});
