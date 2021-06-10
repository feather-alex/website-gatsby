import { ProductPairingsRequestPayload } from './productPairings.types';
import Request, { RequestMethod } from '../../../../api/request';
import { ProductForListing } from '../../../../types/Product';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './productPairings.actions';
import { APIError } from '../../../../types/ReduxState';
import * as sagas from './productPairings.sagas';
import { DeliveryAreaIdentifier } from '../../../../app/store/plan/plan.types';

describe('Product Pairings - Sagas', () => {
  describe('getProductPairingsRequest', () => {
    let identifiers: string[];
    let samplePayload: ProductPairingsRequestPayload;
    let mockAction: FluxStandardAction;
    beforeEach(() => {
      identifiers = ['athene-chair'];
      samplePayload = {
        identifiers,
        categoryIdentifier: 'bedroom'
      };
      mockAction = {
        type: actions.GET_PRODUCT_PAIRINGS_REQUEST,
        payload: samplePayload
      };
    });

    it('Should handle a successful execution when calling only the first endpoint', () => {
      const expectedResponse = [
        { identifier: 'crosby-desk-chair' },
        { identifier: 'octavia-desk-chair' },
        { identifier: 'malone-mirror' },
        { identifier: 'jay-bench' },
        { identifier: 'batis-sofa' }
      ] as ProductForListing[];

      return expectSaga(sagas.getProductPairings, mockAction)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/products/pairings', undefined, mockAction.payload),
            expectedResponse
          ]
        ])
        .put(actions.getProductPairingsSuccess(expectedResponse))
        .run();
    });

    it('should handle filtering out product pairing results that are also present in the requested identifiers', () => {
      const response = [
        { identifier: 'crosby-desk-chair' },
        { identifier: 'octavia-desk-chair' },
        { identifier: 'malone-mirror' },
        { identifier: 'jay-bench' },
        { identifier: 'batis-sofa' },
        { identifier: 'athene-chair' } // <-- this is the one we expect to be filtered out as it is a part of the request
      ] as ProductForListing[];

      const expectedResponse = [
        { identifier: 'crosby-desk-chair' },
        { identifier: 'octavia-desk-chair' },
        { identifier: 'malone-mirror' },
        { identifier: 'jay-bench' },
        { identifier: 'batis-sofa' }
      ] as ProductForListing[];

      return expectSaga(sagas.getProductPairings, mockAction)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/products/pairings', undefined, mockAction.payload),
            response
          ]
        ])
        .put(actions.getProductPairingsSuccess(expectedResponse))
        .run();
    });

    it('Should handle a successful execution when calling both endpoints', () => {
      const expectedResponse = [
        { identifier: 'crosby-desk-chair' },
        { identifier: 'batis-sofa' }
      ] as ProductForListing[];

      const extraProducts = {
        pageData: [{ identifier: 'octavia-desk-chair' }, { identifier: 'varick-console' }] as ProductForListing[]
      };

      const body = {
        offset: 0,
        numItems: 8,
        sort: null,
        order: null,
        categories: ['bedroom'],
        classes: [],
        subclasses: [],
        filter: {
          deliveryArea: null,
          brands: [],
          classes: [],
          subclasses: []
        }
      };

      return expectSaga(sagas.getProductPairings, mockAction)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/products/pairings', undefined, mockAction.payload),
            expectedResponse
          ],
          [matchers.call([Request, 'send'], RequestMethod.POST, '/products', undefined, body), extraProducts]
        ])
        .put(actions.getProductPairingsSuccess([...expectedResponse, ...extraProducts.pageData]))
        .run();
    });

    it('Should handle a successful execution when calling both endpoints when providing a delivery area', () => {
      const mockActionWithDeliveryArea: FluxStandardAction = {
        type: actions.GET_PRODUCT_PAIRINGS_REQUEST,
        payload: {
          identifiers,
          categoryIdentifier: 'bedroom',
          deliveryArea: DeliveryAreaIdentifier.NY
        }
      };

      const expectedResponse = [
        { identifier: 'crosby-desk-chair' },
        { identifier: 'batis-sofa' }
      ] as ProductForListing[];

      const extraProducts = {
        pageData: [{ identifier: 'octavia-desk-chair' }, { identifier: 'varick-console' }] as ProductForListing[]
      };

      const body = {
        offset: 0,
        numItems: 8,
        sort: null,
        order: null,
        categories: ['bedroom'],
        classes: [],
        subclasses: [],
        filter: {
          deliveryArea: DeliveryAreaIdentifier.NY,
          brands: [],
          classes: [],
          subclasses: []
        }
      };

      return expectSaga(sagas.getProductPairings, mockActionWithDeliveryArea)
        .provide([
          [
            matchers.call(
              [Request, 'send'],
              RequestMethod.POST,
              '/products/pairings',
              undefined,
              mockActionWithDeliveryArea.payload
            ),
            expectedResponse
          ],
          [matchers.call([Request, 'send'], RequestMethod.POST, '/products', undefined, body), extraProducts]
        ])
        .put(actions.getProductPairingsSuccess([...expectedResponse, ...extraProducts.pageData]))
        .run();
    });

    it('should handle a successful execution when calling both endpoints for a kids-room category', () => {
      const kidsRoomCategoryPayload: ProductPairingsRequestPayload = {
        identifiers,
        categoryIdentifier: 'kids-room'
      };
      const kidsRoomMockAction: FluxStandardAction = {
        type: actions.GET_PRODUCT_PAIRINGS_REQUEST,
        payload: kidsRoomCategoryPayload
      };

      const response = [{ identifier: 'crosby-desk-chair' }, { identifier: 'batis-sofa' }] as ProductForListing[];

      const body = {
        offset: 0,
        numItems: 8,
        sort: null,
        order: null,
        categories: ['living-room'],
        classes: [],
        subclasses: [],
        filter: {
          deliveryArea: null,
          brands: [],
          classes: [],
          subclasses: []
        }
      };

      const extraResponse = {
        pageData: [{ identifier: 'eddy-sofa' }, { identifier: 'lorimer-desk' }] as ProductForListing[]
      };

      return expectSaga(sagas.getProductPairings, kidsRoomMockAction)
        .provide([
          [
            matchers.call(
              [Request, 'send'],
              RequestMethod.POST,
              '/products/pairings',
              undefined,
              kidsRoomMockAction.payload
            ),
            response
          ],
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/products', undefined, body), // <-- call is made to living-room category
            extraResponse
          ]
        ])
        .put(actions.getProductPairingsSuccess([...response, ...extraResponse.pageData]))
        .run();
    });

    it('Should handle a failed execution when calling both endpoints', () => {
      const expectedResponse = [
        { identifier: 'crosby-desk-chair' },
        { identifier: 'batis-sofa' }
      ] as ProductForListing[];

      const mockError: APIError = {
        error: 'something right here',
        message: "it's literally right there",
        status: 500
      };

      const body = {
        offset: 0,
        numItems: 8,
        sort: null,
        order: null,
        categories: ['bedroom'],
        classes: [],
        subclasses: [],
        filter: {
          deliveryArea: null,
          brands: [],
          classes: [],
          subclasses: []
        }
      };

      return expectSaga(sagas.getProductPairings, mockAction)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/products/pairings', undefined, mockAction.payload),
            expectedResponse
          ],
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/products', undefined, body),
            Promise.reject(mockError)
          ]
        ])
        .put(actions.getProductPairingsFailure(mockError))
        .run();
    });

    it('Should handle a failed execution when calling the first endpoint', () => {
      const mockError: APIError = {
        error: 'something right here',
        message: "it's literally right there",
        status: 500
      };

      return expectSaga(sagas.getProductPairings, mockAction)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.POST, '/products/pairings', undefined, mockAction.payload),
            Promise.reject(mockError)
          ]
        ])
        .put(actions.getProductPairingsFailure(mockError))
        .run();
    });
  });
});
