/** @jsx jsx */
import renderWithRedux, {
  createMockStoreAndHistoryWithState,
} from "../../../utils/test-utils";
import { jsx } from "@emotion/core";
import { ConnectedRouter } from "connected-react-router";
import ProductPairings from "./ProductPairings";
import { APIError } from "../../../types/ReduxState";
import { ProductForListing } from "../../../types/Product";
import { ProductPairingsRequestPayload } from "../store/productPairings/productPairings.types";
import { makeMockProductForListing } from "../store/productDetails/product.fixtures";
import { initialState } from "../store/productPairings/productPairings.reducer";
import { initialState as fullInitialState } from "../../../store/reducer";
import { getProductPairingsRequest } from "../store/productPairings/productPairings.actions";

jest.mock("../../../ui/images/BaseImage", () => {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ imgUrl }: any) => <img alt={""} src={imgUrl} />;
});

const productIdentifiers = ["akepa-dresser"];
const mockItems: ProductForListing[] = [
  makeMockProductForListing(1),
  makeMockProductForListing(2),
  makeMockProductForListing(3),
  makeMockProductForListing(4),
];
const categoryIdentifier = "bedroom";

describe("<ProductPairings />", () => {
  it("should call to fetch product pairings on mount", () => {
    const expectedProductPairingsRequestPayload: ProductPairingsRequestPayload =
      {
        identifiers: productIdentifiers,
        categoryIdentifier,
      };

    const { store, history } =
      createMockStoreAndHistoryWithState(fullInitialState);
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    renderWithRedux(
      <ConnectedRouter history={history}>
        <ProductPairings
          productIdentifiers={productIdentifiers}
          categoryIdentifier={categoryIdentifier}
        />
      </ConnectedRouter>,
      undefined,
      store
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      getProductPairingsRequest(expectedProductPairingsRequestPayload)
    );
  });

  it("renders nothing when no product pairings are returned", () => {
    const { store, history } =
      createMockStoreAndHistoryWithState(fullInitialState);
    store.dispatch = jest.fn();

    const { queryByText } = renderWithRedux(
      <ConnectedRouter history={history}>
        <ProductPairings
          productIdentifiers={productIdentifiers}
          categoryIdentifier={categoryIdentifier}
        />
      </ConnectedRouter>,
      undefined,
      store
    );

    expect(queryByText("Complete the look")).toBeFalsy();
    expect(queryByText("Loading...")).toBeFalsy();
  });

  it("renders a product card for each product pairing provided", () => {
    const { store, history } = createMockStoreAndHistoryWithState({
      ...fullInitialState,
      productPairings: { ...initialState, products: mockItems },
    });
    store.dispatch = jest.fn();

    const { getByText, getAllByText } = renderWithRedux(
      <ConnectedRouter history={history}>
        <ProductPairings
          productIdentifiers={productIdentifiers}
          categoryIdentifier={categoryIdentifier}
        />
      </ConnectedRouter>,
      undefined,
      store
    );

    expect(getByText("Complete the look")).toBeTruthy();
    const productCardTitles = getAllByText("Athene chair");
    const productCardPrices = getAllByText("$4/mo");
    expect(productCardTitles.length).toEqual(4);
    expect(productCardPrices.length).toEqual(4);
  });

  it("renders a maximum of four product cards despite how many product pairing are provided", () => {
    const { store, history } = createMockStoreAndHistoryWithState({
      ...fullInitialState,
      productPairings: {
        ...initialState,
        products: [...mockItems, makeMockProductForListing(5)],
      },
    });
    store.dispatch = jest.fn();

    const { getAllByText } = renderWithRedux(
      <ConnectedRouter history={history}>
        <ProductPairings
          productIdentifiers={productIdentifiers}
          categoryIdentifier={categoryIdentifier}
        />
      </ConnectedRouter>,
      undefined,
      store
    );

    const productCardTitles = getAllByText("Athene chair");
    const productCardPrices = getAllByText("$4/mo");
    expect(productCardTitles.length).toEqual(4);
    expect(productCardPrices.length).toEqual(4);
  });

  it("renders a Loading component when still fetching productPairings", () => {
    const { store, history } = createMockStoreAndHistoryWithState({
      ...fullInitialState,
      productPairings: { ...initialState, isFetching: true },
    });
    store.dispatch = jest.fn();

    const { getByText } = renderWithRedux(
      <ConnectedRouter history={history}>
        <ProductPairings
          productIdentifiers={productIdentifiers}
          categoryIdentifier={categoryIdentifier}
        />
      </ConnectedRouter>,
      undefined,
      store
    );

    expect(getByText("Loading...")).toBeTruthy;
  });

  it("renders neither the component nor the loading text when there is an api error", () => {
    const mockError: APIError = {
      error: "omnomnom",
      status: 404,
      message: "Oops! Please check back in a moment.",
    };
    const { store, history } = createMockStoreAndHistoryWithState({
      ...fullInitialState,
      productPairings: { ...initialState, error: mockError },
    });
    store.dispatch = jest.fn();

    const { queryByText } = renderWithRedux(
      <ConnectedRouter history={history}>
        <ProductPairings
          productIdentifiers={productIdentifiers}
          categoryIdentifier={categoryIdentifier}
        />
      </ConnectedRouter>,
      undefined,
      store
    );

    expect(queryByText("Loading...")).toBeNull();
    expect(queryByText("Complete the look")).toBeNull();
  });
});
