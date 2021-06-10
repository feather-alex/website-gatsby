import { ProductPairingsRequestPayload } from './productPairings.types';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { ProductForListing } from '../../../../types/Product';
import { APIError } from '../../../../types/ReduxState';
import * as actions from './productPairings.actions';

describe('Product Pairings - Actions', () => {
  it('Should handle action: GET_PRODUCT_PAIRINGS_REQUEST', () => {
    const samplePayload: ProductPairingsRequestPayload = {
      identifiers: ['athene-chair'],
      categoryIdentifier: 'bedroom'
    };

    const expectedAction: FluxStandardAction = {
      type: actions.GET_PRODUCT_PAIRINGS_REQUEST,
      payload: samplePayload
    };

    const actionAction = actions.getProductPairingsRequest(samplePayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: GET_PRODUCT_PAIRINGS_SUCCESS', () => {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockResponse: ProductForListing[] = [{ title: 'Athene chair' }, { title: 'Batis sofa' }] as any;

    const expectedAction: FluxStandardAction = {
      type: actions.GET_PRODUCT_PAIRINGS_SUCCESS,
      payload: mockResponse
    };

    const actionAction = actions.getProductPairingsSuccess(mockResponse);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: GET_PRODUCT_PAIRINGS_FAILURE', () => {
    const mockError: APIError = {
      error: 'foobarbar',
      status: 404,
      message: 'foo. bar. bar.'
    };

    const expectedAction: FluxStandardAction = {
      type: actions.GET_PRODUCT_PAIRINGS_FAILURE,
      payload: mockError,
      error: true
    };

    const actualAction = actions.getProductPairingsFailure(mockError);

    expect(actualAction).toEqual(expectedAction);
  });
});
