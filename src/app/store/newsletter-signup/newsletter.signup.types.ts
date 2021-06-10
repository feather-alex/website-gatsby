import { APIError } from '../../../types/ReduxState';

export interface NewsletterState {
  email: string | null;
  isFetching: boolean;
  error: APIError | null;
  displaySuccess: boolean;
}

export enum NewsletterInputOrigin {
  NAVBAR = 'Navbar',
  FOOTER = 'Footer',
  HOMEPAGE = 'Homepage'
}

export interface NewsletterSignupRequestResource {
  email: string;
  origin: NewsletterInputOrigin;
}
