import { ProductEntitiesState } from './entities.types';
import {
  GET_ENTITIES_REQUEST,
  GET_ENTITIES_SUCCESS,
  GET_ENTITIES_FAILURE,
  EntityActions,
  GET_DELIVERY_DATES_SUCCESS,
  GET_DELIVERY_DATES_FAILURE
} from './entities.actions';

export const initialState: ProductEntitiesState = {
  isFetching: false,
  data: null,
  error: null
};

const entities = (state: ProductEntitiesState = initialState, action: EntityActions): ProductEntitiesState => {
  switch (action.type) {
    case GET_ENTITIES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_ENTITIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };

    case GET_DELIVERY_DATES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };

    case GET_DELIVERY_DATES_FAILURE:
    case GET_ENTITIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};

export default entities;
