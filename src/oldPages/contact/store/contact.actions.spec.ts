import { ContactFormData, ReasonsForInquiry } from './contact.types';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import * as actions from './contact.actions';
import { APIError } from '../../../types/ReduxState';

describe('Contact Page - Actions', () => {
  it('Should handle: sendInquiryRequest', () => {
    const formValues: ContactFormData = {
      emailAddress: 'me@here.now',
      fullName: 'Jeffrey Flynn',
      companyName: 'Feather',
      messageBody: "Here's a message.",
      reasonForInquiry: ReasonsForInquiry.StagingAndOffice
    };

    const expectedAction: FluxStandardAction = {
      type: actions.SEND_INQUIRY_REQUEST,
      payload: formValues
    };

    const actualAction: FluxStandardAction = actions.sendInquiryRequest(formValues);

    expect(actualAction).toEqual(expectedAction);
  });

  it('Should handle: sendInquirySuccess', () => {
    const expectedAction: FluxStandardAction = {
      type: actions.SEND_INQUIRY_SUCCESS
    };

    const actualAction: FluxStandardAction = actions.sendInquirySuccess();

    expect(actualAction).toEqual(expectedAction);
  });

  it('Should handle: sendInquiryFailure', () => {
    const error: APIError = {
      error: '',
      message: '',
      status: 213
    };

    const expectedAction: FluxStandardAction = {
      type: actions.SEND_INQUIRY_FAILURE,
      payload: { error },
      error: true
    };

    const actualAction: FluxStandardAction = actions.sendInquiryFailure(error);

    expect(actualAction).toEqual(expectedAction);
  });
});
