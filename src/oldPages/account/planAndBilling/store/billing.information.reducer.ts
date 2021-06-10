import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { BillingInformation, BillingResource } from './billing.information.types';
import {
  SET_PRIMARY_CARD_REQUEST,
  SET_PRIMARY_CARD_FAILURE,
  REMOVE_BILLING_CARD_REQUEST,
  REMOVE_BILLING_CARD_FAILURE,
  ADD_NEW_BILLING_CARD_REQUEST,
  ADD_NEW_BILLING_CARD_FAILURE,
  GET_PAYMENT_PROFILE_REQUEST,
  GET_PAYMENT_PROFILE_SUCCESS,
  GET_PAYMENT_PROFILE_FAILURE
} from './billing.information.actions';

export const initialState: BillingInformation = {
  isFetching: false,
  error: null,
  defaultSource: {
    id: '',
    sourceType: '',
    lastFour: '0',
    expMonth: 0,
    expYear: 0
  },
  sources: [],
  startDate: null
};

const getDefaultSource = (defaultSourceId: string, sources: BillingResource[]) =>
  sources.find((source: BillingResource) => source.id === defaultSourceId) || sources[0];

const filterOutNonCards = (sources: BillingResource[]) => {
  return sources.filter((source: BillingResource) => source.sourceType === 'card');
};

const billingInformation = (state = initialState, action: FluxStandardAction): BillingInformation => {
  switch (action.type) {
    case SET_PRIMARY_CARD_REQUEST:
    case REMOVE_BILLING_CARD_REQUEST:
    case ADD_NEW_BILLING_CARD_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      };

    case SET_PRIMARY_CARD_FAILURE:
    case REMOVE_BILLING_CARD_FAILURE:
    case ADD_NEW_BILLING_CARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case GET_PAYMENT_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_PAYMENT_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case GET_PAYMENT_PROFILE_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        startDate: action.payload.startDate,
        defaultSource: getDefaultSource(action.payload.defaultSourceId, action.payload.sources),
        sources: filterOutNonCards(action.payload.sources)
      };

    default:
      return state;
  }
};

export default billingInformation;
