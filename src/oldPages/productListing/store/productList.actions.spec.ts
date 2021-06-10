import { ProductListSuccessPayload } from './productList.types';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import { APIError } from '../../../types/ReduxState';
import {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
  resetProductList,
  ProductListActions,
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,
  RESET_PRODUCT_LIST
} from './productList.actions';
import { mockSamplePayload, mockMeta, mockProducts } from '../productList.fixtures';

describe('ProductList - Actions', () => {
  it('Should handle action: GET_PRODUCT_LIST_REQUEST', () => {
    const samplePayload = mockSamplePayload;

    const expectedAction: ProductListActions = {
      type: GET_PRODUCT_LIST_REQUEST,
      payload: samplePayload
    };

    const actionAction = getProductListRequest(samplePayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: GET_PRODUCT_LIST_SUCCESS', () => {
    const mockResponse: ProductListSuccessPayload = {
      meta: mockMeta,
      products: mockProducts,
      isInfiniteLoading: true
    };

    const expectedAction: ProductListActions = {
      type: GET_PRODUCT_LIST_SUCCESS,
      payload: mockResponse
    };

    const actionAction = getProductListSuccess(mockResponse);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: GET_PRODUCT_LIST_FAILURE', () => {
    const mockError: APIError = {
      error: 'lil fail boi',
      status: 404,
      message: 'continue?'
    };

    const expectedAction: ProductListActions = {
      type: GET_PRODUCT_LIST_FAILURE,
      payload: mockError,
      error: true
    };

    const actualAction = getProductListFailure(mockError);

    expect(actualAction).toEqual(expectedAction);
  });

  it('Should handle action: RESET_PRODUCT_LIST', () => {
    const expectedAction: FluxStandardAction = {
      type: RESET_PRODUCT_LIST
    };

    const actualAction = resetProductList();

    expect(actualAction).toEqual(expectedAction);
  });
});
