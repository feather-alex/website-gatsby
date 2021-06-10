import { APIError } from '../../../../types/ReduxState';

export interface BillingInformation {
  isFetching: boolean;
  error: APIError | null;
  defaultSource: BillingResource;
  sources: BillingResource[];
  startDate: number | null; // unix date format
}

export interface BillingResource {
  id: string;
  sourceType: string;
  lastFour: string;
  expMonth: number;
  expYear: number;
}

export interface BillingSourcesResource {
  id: string;
  defaultSourceId: string;
  sources: BillingResource[];
}
