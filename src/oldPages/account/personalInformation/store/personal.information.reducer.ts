import { PersonalInformation, AddressInfo } from './personal.information.types';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import {
  GET_PERSONAL_INFORMATION_REQUEST,
  GET_PERSONAL_INFORMATION_SUCCESS,
  GET_PERSONAL_INFORMATION_FAILURE,
  UPDATE_PERSONAL_INFORMATION_REQUEST,
  UPDATE_PERSONAL_INFORMATION_SUCCESS,
  UPDATE_PERSONAL_INFORMATION_FAILURE
} from './personal.information.actions';

export const initialState: PersonalInformation = {
  accountLastAccessedAt: '',
  addressInfo: [],
  isFetching: false,
  firstName: '',
  lastName: '',
  error: null,
  phone: '',
  email: ''
};

export const getAddressInfoFromSubscription = (subscription: AddressInfo) => ({
  address1: subscription.address1,
  address2: subscription.address2,
  city: subscription.city,
  region: subscription.region,
  postal: subscription.postal
});

const personalInformation = (state = initialState, action: FluxStandardAction): PersonalInformation => {
  switch (action.type) {
    case GET_PERSONAL_INFORMATION_REQUEST:
    case UPDATE_PERSONAL_INFORMATION_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_PERSONAL_INFORMATION_FAILURE:
    case UPDATE_PERSONAL_INFORMATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case GET_PERSONAL_INFORMATION_SUCCESS:
    case UPDATE_PERSONAL_INFORMATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        addressInfo: action.payload.subscriptions.map(getAddressInfoFromSubscription),
        phone: action.payload.phone,
        email: action.payload.email,
        accountLastAccessedAt: action.payload.accountLastAccessedAt,
        error: null
      };

    default:
      return state;
  }
};

export default personalInformation;
