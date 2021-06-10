import { APIError } from '../../../api/error';
import { Pages } from '../../../contentful/contentful.types';

export interface ContentfulPagesState {
  isFetching: boolean;
  error: APIError | null;
  pages: Pages[];
}

export interface ContentfulPagesSuccessPayload {
  pages: Pages[];
}
