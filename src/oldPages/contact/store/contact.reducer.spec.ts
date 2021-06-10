import { ContactState, ContactFormData, ReasonsForInquiry } from './contact.types';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import contactReducer from './contact.reducer';
import { initialState } from './contact.reducer';
import * as actions from './contact.actions';

describe('Contact Page - Reducer', () => {
  let state: ContactState;

  beforeEach(() => (state = { ...initialState }));

  it('Should handle action: SEND_INQUIRY_REQUEST', () => {
    const payload: ContactFormData = {
      fullName: 'Jeffrey',
      emailAddress: 'jnflynn93@aol.com',
      companyName: 'Feather',
      messageBody: 'Omg, Feather is toats like the best ever.',
      reasonForInquiry: ReasonsForInquiry.Affiliates
    };

    const action: FluxStandardAction = {
      type: actions.SEND_INQUIRY_REQUEST,
      payload
    };

    const reduced = contactReducer(state, action);

    expect(reduced.isProccessingRequest).toEqual(true);
    expect(reduced.displayErrorMessage).toEqual(false);
    expect(reduced.displaySuccessMessage).toEqual(false);
  });

  it('Should handle action: SEND_INQUIRY_SUCCESS', () => {
    const action: FluxStandardAction = {
      type: actions.SEND_INQUIRY_SUCCESS
    };

    const reduced = contactReducer(state, action);

    expect(reduced.isProccessingRequest).toEqual(false);
    expect(reduced.displaySuccessMessage).toEqual(true);
    expect(reduced.displayErrorMessage).toEqual(false);
  });

  it('Should handle action: SEND_INQUIRY_FAILURE', () => {
    const action: FluxStandardAction = {
      type: actions.SEND_INQUIRY_FAILURE
    };

    const reduced = contactReducer(state, action);

    expect(reduced.isProccessingRequest).toEqual(false);
    expect(reduced.displayErrorMessage).toEqual(true);
    expect(reduced.displaySuccessMessage).toEqual(false);
  });
});
