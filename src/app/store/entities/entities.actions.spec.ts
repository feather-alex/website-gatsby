import { ProductEntities } from './entities.types';
import * as actions from './entities.actions';
import { APIError } from '../../../types/ReduxState';

describe('Product Entities - Actions', () => {
  describe('GET_ENTITIES', () => {
    it('Should handle action: GET_ENTITIES_REQUEST', () => {
      const expectedAction: actions.EntityActions = {
        type: actions.GET_ENTITIES_REQUEST
      };

      const actualAction: actions.EntityActions = actions.getEntitiesRequest();

      expect(actualAction).toEqual(expectedAction);
    });

    it('Should handle action: GET_ENTITIES_SUCCESS', () => {
      const payload: ProductEntities = {
        categories: {
          products: [],
          bundles: []
        },
        deliveryAreas: []
      };

      const expectedAction: actions.EntityActions = {
        type: actions.GET_ENTITIES_SUCCESS,
        payload
      };

      const actualAction: actions.EntityActions = actions.getEntitiesSuccess(payload);

      expect(actualAction).toEqual(expectedAction);
    });

    it('Should handle action: GET_ENTITIES_FAILURE', () => {
      const error: APIError = {
        error: 'Some error here.',
        message: 'And a corresponding error message here.',
        status: 500
      };

      const expectedAction: actions.EntityActions = {
        type: actions.GET_ENTITIES_FAILURE,
        payload: { error },
        error: true
      };

      const actualAction: actions.EntityActions = actions.getEntitiesFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('GET_DELIVERY_DATES', () => {
    it('Should handle action: GET_DELIVERY_DATES_REQUEST', () => {
      const expectedAction: actions.EntityActions = {
        type: actions.GET_DELIVERY_DATES_REQUEST
      };

      const actualAction: actions.EntityActions = actions.getUpdatedDeliveryDatesRequest();

      expect(actualAction).toEqual(expectedAction);
    });

    it('Should handle action: GET_DELIVERY_DATES_SUCCESS', () => {
      const payload: ProductEntities = {
        categories: {
          products: [],
          bundles: []
        },
        deliveryAreas: []
      };

      const expectedAction: actions.EntityActions = {
        type: actions.GET_DELIVERY_DATES_SUCCESS,
        payload
      };

      const actualAction: actions.EntityActions = actions.getUpdatedDeliveryDatesSuccess(payload);

      expect(actualAction).toEqual(expectedAction);
    });

    it('Should handle action: GET_DELIVERY_DATES_FAILURE', () => {
      const error: APIError = {
        error: 'Some error here.',
        message: 'And a corresponding error message here.',
        status: 500
      };

      const expectedAction: actions.EntityActions = {
        type: actions.GET_DELIVERY_DATES_FAILURE,
        payload: { error },
        error: true
      };

      const actualAction: actions.EntityActions = actions.getUpdatedDeliveryDatesFailure(error);

      expect(actualAction).toEqual(expectedAction);
    });
  });
});
