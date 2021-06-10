import { ProductEntities } from './entities.types';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './entities.actions';
import * as sagas from './entities.sagas';
import { APIError } from '../../../types/ReduxState';
import Request from '../../../api/request';

describe('Product Entities - Sagas', () => {
  describe('getProductEntities', () => {
    it('Should handle a successful request.', () => {
      const expectedResult: ProductEntities = {
        categories: {
          products: [],
          bundles: []
        },
        deliveryAreas: []
      };

      return expectSaga(sagas.getProductEntities)
        .provide([[matchers.call.fn(Request.send), expectedResult]])
        .put(actions.getEntitiesSuccess(expectedResult))
        .run();
    });

    it('Should handle a failed request.', () => {
      const error: APIError = {
        error: 'Some error here.',
        message: 'And a corresponding error message here.',
        status: 500
      };

      return expectSaga(sagas.getProductEntities)
        .provide([[matchers.call.fn(Request.send), Promise.reject(error)]])
        .put(actions.getEntitiesFailure(error))
        .run();
    });
  });

  describe('getUpdatedDeliveryDates', () => {
    it('Should handle a successful request.', () => {
      const expectedResult: ProductEntities = {
        categories: {
          products: [],
          bundles: []
        },
        deliveryAreas: []
      };

      return expectSaga(sagas.getUpdatedDeliveryDates)
        .provide([[matchers.call.fn(Request.send), expectedResult]])
        .put(actions.getUpdatedDeliveryDatesSuccess(expectedResult))
        .run();
    });

    it('Should handle a failed request.', () => {
      const error: APIError = {
        error: 'Some error here.',
        message: 'And a corresponding error message here.',
        status: 500
      };

      return expectSaga(sagas.getUpdatedDeliveryDates)
        .provide([[matchers.call.fn(Request.send), Promise.reject(error)]])
        .put(actions.getUpdatedDeliveryDatesFailure(error))
        .run();
    });
  });
});
