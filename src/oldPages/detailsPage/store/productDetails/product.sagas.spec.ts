import { ProductDetailsRequestPayload } from './product.types';
import Request, { RequestMethod } from '../../../../api/request';
import { FullProductDetails } from '../../../../types/Product';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './product.actions';
import { APIError } from '../../../../types/ReduxState';
import * as sagas from './product.sagas';

describe('Product Details - Sagas', () => {
  describe('getProductDetailsRequest', () => {
    const productIdentifier = 'athene-chair';

    const samplePayload: ProductDetailsRequestPayload = {
      productIdentifier
    };

    const mockAction: FluxStandardAction = {
      type: actions.GET_PRODUCT_DETAILS_REQUEST,
      payload: samplePayload
    };

    it('Should handle a successful execution', () => {
      // TODO: Fix this the next time the file is edited.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const expectedResponse: FullProductDetails[] = [{ title: 'Athene chair' }, { title: 'Batis sofa' }] as any;

      return expectSaga(sagas.getProductDetails, mockAction)
        .provide([
          [matchers.call([Request, 'send'], RequestMethod.GET, `/products/${productIdentifier}`), expectedResponse]
        ])
        .put(actions.getProductDetailsSuccess(expectedResponse))
        .run();
    });

    it('Should handle a failed execution', () => {
      const mockError: APIError = {
        error: 'something right here',
        message: "it's literally right there",
        status: 500
      };

      return expectSaga(sagas.getProductDetails, mockAction)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.GET, `/products/${productIdentifier}`),
            Promise.reject(mockError)
          ]
        ])
        .put(actions.getProductDetailsFailure(mockError))
        .run();
    });
  });
});
