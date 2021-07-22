import Request, { RequestMethod } from "../../../api/request";
import { expectSaga } from "redux-saga-test-plan";
import { APIError } from "../../../types/ReduxState";
import * as matchers from "redux-saga-test-plan/matchers";
import * as sagas from "./productList.sagas";
import { ProductListResponse } from "../../../types/Product";
import { formatProductListResponse } from "../productList.service";
import { mockSamplePayload } from "../productList.fixtures";
import {
  getProductListSuccess,
  getProductListFailure,
  ProductListActions,
  GET_PRODUCT_LIST_REQUEST,
} from "./productList.actions";
import * as Analytics from "./productList.analytics";

describe("ProductList - Sagas", () => {
  describe("getProductListRequest", () => {
    const samplePayload = mockSamplePayload;
    const mockAction: ProductListActions = {
      type: GET_PRODUCT_LIST_REQUEST,
      payload: samplePayload,
    };

    it("Should handle a successful execution", () => {
      const expectedResponse: ProductListResponse = {
        pageData: [],
        total: 10,
        availableFilters: {
          subclasses: [],
          classes: [],
          brands: [],
        },
        pageNumber: 0,
      };

      return expectSaga(sagas.getProductList, mockAction)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.POST,
              "/products",
              undefined,
              mockAction.payload.body
            ),
            expectedResponse,
          ],
          [
            matchers.call(
              [Analytics, "trackListingAnalytics"],
              mockAction,
              formatProductListResponse(expectedResponse)
            ),
            undefined,
          ],
        ])
        .put(
          getProductListSuccess(
            formatProductListResponse(
              expectedResponse,
              mockAction.payload.isInfiniteLoading
            )
          )
        )
        .run();
    });

    it("Should handle a failed execution", () => {
      const mockError: APIError = {
        error: "foo errors out",
        message: "but bar errors in",
        status: 500,
      };

      return expectSaga(sagas.getProductList, mockAction)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.POST,
              "/products",
              undefined,
              mockAction.payload.body
            ),
            Promise.reject(mockError),
          ],
        ])
        .put(getProductListFailure(mockError))
        .run();
    });
  });
});
