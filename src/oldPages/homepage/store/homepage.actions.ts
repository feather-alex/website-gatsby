import { HomepageContentRequestPayload, HomepageContentSuccessPayload } from './homepage.types';
import createRequestAction from '../../../utils/createRequestAction';
import { APIError } from '../../../types/ReduxState';

export const getHomepageContent = createRequestAction<
  HomepageContentRequestPayload,
  HomepageContentSuccessPayload,
  APIError
>('GET_HOMEPAGE_CONTENT');
