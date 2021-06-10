import { FaqContentRequestPayload, FaqContentSuccessPayload } from './faqs.types';
import createRequestAction from '../../../utils/createRequestAction';
import { APIError } from '../../../types/ReduxState';

export const getFaqContent = createRequestAction<FaqContentRequestPayload, FaqContentSuccessPayload, APIError>(
  'FAQ_CONTENT'
);
