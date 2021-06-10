import productDetailsReducer, { initialState, initialProductDetails } from './product.reducer';
import { ProductDetailsRequestPayload, ProductDetailsState } from './product.types';
import { FullProductDetails } from '../../../../types/Product';
import * as actions from './product.actions';
import { APIError } from '../../../../types/ReduxState';

describe('Product Details - Reducer', () => {
  let state: ProductDetailsState;

  beforeEach(() => (state = { ...initialState }));

  it('Should handle action: GET_PRODUCT_DETAILS_REQUEST', () => {
    const samplePayload: ProductDetailsRequestPayload = {
      productIdentifier: 'athene-chair'
    };

    const action = actions.getProductDetailsRequest(samplePayload);

    const reduced = productDetailsReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.data).toEqual(initialProductDetails);
    expect(reduced.error).toBeNull();
  });

  it('Should handle action: GET_PRODUCT_DETAILS_SUCCESS', () => {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockResponse: FullProductDetails[] = [{ title: 'Athene chair' }, { title: 'Batis sofa' }] as any;

    const action = actions.getProductDetailsSuccess(mockResponse);

    const reduced = productDetailsReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.data).toEqual(mockResponse);
    expect(reduced.error).toBeNull();
  });

  it('Should handle action: GET_PRODUCT_DETAILS_FAILURE', () => {
    const mockError: APIError = {
      error: 'omnomnom',
      status: 404,
      message: 'om. nom. nom.'
    };

    const action = actions.getProductDetailsFailure(mockError);

    const reduced = productDetailsReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.data).toEqual(initialProductDetails);
    expect(reduced.error).toEqual(mockError);
  });
});
