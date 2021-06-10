import { AccountHistory } from './account.history.types';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import {
  GET_ACCOUNT_HISTORY_REQUEST,
  GET_ACCOUNT_HISTORY_SUCCESS,
  GET_ACCOUNT_HISTORY_FAILURE,
  RESET_STATE
} from './account.history.actions';

export const pageIncrements = 7;

export const initialState: AccountHistory = {
  charges: [],
  hasMore: false,
  isFetching: false,
  error: null,
  perPage: pageIncrements
};

const accountHistory = (state = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case GET_ACCOUNT_HISTORY_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_ACCOUNT_HISTORY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case GET_ACCOUNT_HISTORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        charges: [...state.charges, ...action.payload.charges],
        hasMore: action.payload.hasMore,
        error: null
      };

    case RESET_STATE:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default accountHistory;
