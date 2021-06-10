import { ProductDetailsRequestPayload } from './product.types';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { FullProductDetails } from '../../../../types/Product';
import * as actions from './product.actions';
import { APIError } from '../../../../types/ReduxState';

describe('Product Details - Actions', () => {
  it('Should handle action: GET_PRODUCT_DETAILS_REQUEST', () => {
    const samplePayload: ProductDetailsRequestPayload = {
      productIdentifier: 'athene-chair'
    };

    const expectedAction: FluxStandardAction = {
      type: actions.GET_PRODUCT_DETAILS_REQUEST,
      payload: samplePayload
    };

    const actionAction = actions.getProductDetailsRequest(samplePayload);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: GET_PRODUCT_DETAILS_SUCCESS', () => {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockResponse: FullProductDetails[] = [{ title: 'Athene chair' }, { title: 'Batis sofa' }] as any;

    const expectedAction: FluxStandardAction = {
      type: actions.GET_PRODUCT_DETAILS_SUCCESS,
      payload: mockResponse
    };

    const actionAction = actions.getProductDetailsSuccess(mockResponse);

    expect(actionAction).toEqual(expectedAction);
  });

  it('Should handle action: GET_PRODUCT_DETAILS_FAILURE', () => {
    const mockError: APIError = {
      error: 'omnomnom',
      status: 404,
      message: 'om. nom. nom.'
    };

    const expectedAction: FluxStandardAction = {
      type: actions.GET_PRODUCT_DETAILS_FAILURE,
      payload: mockError,
      error: true
    };

    const actualAction = actions.getProductDetailsFailure(mockError);

    expect(actualAction).toEqual(expectedAction);
  });
});
