import { FluxStandardAction } from "../../../types/FluxStandardActions";
import { FullPackageDetails } from "../../../types/Package";
import { ProductListResponse } from "../../../types/Product";
import * as selectors from "../../../oldPages/search/store/search.selectors";
import * as matchers from "redux-saga-test-plan/matchers";
import * as actions from "./search.actions";
import { expectSaga } from "redux-saga-test-plan";
import * as sagas from "./search.sagas";
import { select } from "redux-saga/effects";
import { APIError } from "../../../types/ReduxState";
import Request, { RequestMethod, QueryParam } from "../../../api/request";
import { getDeliveryAreaIdentifier } from "../../../app/store/plan/plan.selectors";
import { DeliveryAreaIdentifier } from "../../../app/store/plan/plan.types";

describe("Search Page - Sagas", () => {
  describe("initSearchResults", () => {
    it("Should reset state, fetch products, then fetch packages.", () => {
      const action: FluxStandardAction = {
        type: actions.ADD_SEARCH_KEYWORD,
        payload: { keyword: "chair" },
      };

      return expectSaga(sagas.initSearchResults, action)
        .put(actions.resetSearch())
        .put(actions.loadSearchProducts())
        .put(actions.loadSearchPackages())
        .run();
    });
  });

  describe("getProductsRequest", () => {
    let numItems: string;
    let offset: number;
    let keyword: string;
    let deliveryArea: DeliveryAreaIdentifier;
    let requestQueryParams: QueryParam[];

    beforeEach(() => {
      offset = 0;
      keyword = "chair";
      numItems = "1000";
      deliveryArea = DeliveryAreaIdentifier.NY;
      requestQueryParams = [
        { name: "numItems", value: numItems },
        { name: "offset", value: offset.toString() },
        { name: "keywords", value: keyword },
        { name: "deliveryArea", value: deliveryArea },
      ];
    });

    it("Should handle a successful execution.", () => {
      const expectedResult: ProductListResponse = {
        pageData: [],
        total: 10,
        availableFilters: {
          subclasses: [],
          classes: [],
          brands: [],
        },
        pageNumber: 0,
      };

      return expectSaga(sagas.getProductsRequest)
        .provide([
          [select(selectors.getProductsOffset), offset],
          [select(selectors.getSearchKeyword), keyword],
          [select(getDeliveryAreaIdentifier), deliveryArea],
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.GET,
              "/search/products",
              requestQueryParams
            ),
            expectedResult,
          ],
        ])
        .put(actions.loadSearchProductsSuccess(expectedResult))
        .run();
    });

    it("Should handle a failed execution.", () => {
      const error: APIError = {
        error: "something",
        message: "oh no",
        status: 500,
      };

      return expectSaga(sagas.getProductsRequest)
        .provide([
          [select(selectors.getProductsOffset), offset],
          [select(selectors.getSearchKeyword), keyword],
          [select(getDeliveryAreaIdentifier), deliveryArea],
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.GET,
              "/search/products",
              requestQueryParams
            ),
            Promise.reject(error),
          ],
        ])
        .put({
          type: actions.GET_SEARCH_PRODUCTS_FAILURE,
          payload: { error },
          error: true,
        })
        .run();
    });
  });

  describe("getPackagesRequest", () => {
    let keyword: string;
    let requestQueryParams: QueryParam[];

    beforeEach(() => {
      keyword = "chair";
      requestQueryParams = [{ name: "keywords", value: keyword }];
    });

    it("Should handle a successful execution.", () => {
      const expectedResult: FullPackageDetails[] = [
        {
          description: "",
          identifier: "",
          title: "",
          category: {
            identifier: "",
            name: "",
          },
          listingImage: {
            mobile: "",
            desktop: "",
          },
          variants: [],
          availability: [],
          otherImages: [],
          options: [],
          lifestyle: {
            summary: "",
            image: {
              mobile: "",
              desktop: "",
            },
          },
        },
      ];

      return expectSaga(sagas.getPackagesRequest)
        .provide([
          [select(selectors.getSearchKeyword), "chair"],
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.GET,
              "/search/bundles",
              requestQueryParams
            ),
            expectedResult,
          ],
        ])
        .put(actions.loadSearchPackagesSuccess(expectedResult))
        .run();
    });

    it("Should handle a failed execution.", () => {
      const error: APIError = {
        error: "something",
        message: "oh no",
        status: 500,
      };

      return expectSaga(sagas.getPackagesRequest)
        .provide([
          [select(selectors.getSearchKeyword), "chair"],
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.GET,
              "/search/bundles",
              requestQueryParams
            ),
            Promise.reject(error),
          ],
        ])
        .put({
          type: actions.GET_SEARCH_PACKAGES_FAILURE,
          payload: { error },
          error: true,
        })
        .run();
    });
  });
});
