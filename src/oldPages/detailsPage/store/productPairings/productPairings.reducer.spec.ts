import productPairingsReducer, { initialState } from './productPairings.reducer';
import { ProductPairingsRequestPayload, ProductPairingsState } from './productPairings.types';
import { ProductForListing } from '../../../../types/Product';
import { APIError } from '../../../../types/ReduxState';
import * as actions from './productPairings.actions';

describe('Product Pairings - Reducer', () => {
  let state: ProductPairingsState;

  beforeEach(() => (state = { ...initialState }));

  it('Should handle action: GET_PRODUCT_PAIRINGS_REQUEST', () => {
    const samplePayload: ProductPairingsRequestPayload = {
      identifiers: ['athene-chair'],
      categoryIdentifier: 'bedroom'
    };

    const action = actions.getProductPairingsRequest(samplePayload);

    const reduced = productPairingsReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.products).toEqual([]);
    expect(reduced.error).toBeNull();
  });

  it('Should handle action: GET_PRODUCT_PAIRINGS_SUCCESS', () => {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockResponse: ProductForListing[] = [{ title: 'Athene chair' }, { title: 'Batis sofa' }] as any;

    const action = actions.getProductPairingsSuccess(mockResponse);

    const reduced = productPairingsReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.products).toEqual(mockResponse);
    expect(reduced.error).toBeNull();
  });

  it('Should handle action: GET_PRODUCT_PAIRINGS_FAILURE', () => {
    const mockError: APIError = {
      error: 'foobarbar',
      status: 404,
      message: 'foo. bar. bar.'
    };

    const action = actions.getProductPairingsFailure(mockError);

    const reduced = productPairingsReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.products).toEqual([]);
    expect(reduced.error).toEqual(mockError);
  });
});
