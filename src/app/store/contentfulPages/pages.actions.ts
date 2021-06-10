import { ContentfulPagesSuccessPayload } from './pages.types';
import createRequestAction from '../../../utils/createRequestAction';
import { APIError } from '../../../api/error';

export const getContentfulPages = createRequestAction<undefined, ContentfulPagesSuccessPayload, APIError>(
  'CONTENTFUL_PAGES'
);
