import productListReducer, { initialState } from './productList.reducer';
import { ProductListState, ProductListSuccessPayload } from './productList.types';
import * as actions from './productList.actions';
import { APIError } from '../../../types/ReduxState';
import { mockSamplePayload, mockMeta, mockProducts } from '../productList.fixtures';

describe('ProductList - Reducer', () => {
  let state: ProductListState;

  beforeEach(() => (state = { ...initialState }));

  it('Should handle action: GET_PRODUCT_LIST_REQUEST', () => {
    const samplePayload = mockSamplePayload;

    const action = actions.getProductListRequest(samplePayload);
    const reduced = productListReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.meta).toEqual(initialState.meta);
    expect(reduced.products).toEqual(initialState.products);
    expect(reduced.error).toBeNull();
  });

  it('Should handle action: GET_PRODUCT_LIST_SUCCESS', () => {
    const mockResponse: ProductListSuccessPayload = {
      meta: mockMeta,
      products: mockProducts,
      isInfiniteLoading: true
    };

    const action = actions.getProductListSuccess(mockResponse);
    const reduced = productListReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.meta).toEqual(mockResponse.meta);
    expect(reduced.products).toEqual(mockResponse.products);
    expect(reduced.error).toBeNull();
  });

  it('Should handle action: GET_PRODUCT_LIST_FAILURE', () => {
    const mockError: APIError = {
      error: 'lil fail boi part duex',
      status: 404,
      message: 'continue?'
    };

    const action = actions.getProductListFailure(mockError);
    const reduced = productListReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.meta).toEqual(initialState.meta);
    expect(reduced.products).toEqual(initialState.products);
    expect(reduced.error).toEqual(mockError);
  });

  it('Should handle action: RESET_PRODUCT_LIST', () => {
    state = {
      ...initialState,
      meta: {
        ...initialState.meta,
        availableFilters: state.meta.availableFilters
      }
    };

    const action = actions.resetProductList();
    const reduced = productListReducer(state, action);

    expect(reduced).toEqual(initialState);
  });
});
