export interface AddressInfo {
  address1: string;
  address2: string;
  city: string;
  region: string;
  postal: string;
}

export interface PersonalInformation {
  phone: string;
  email: string;
  lastName: string;
  firstName: string;
  addressInfo: AddressInfo[];
  isFetching: boolean;
  error: Error | null;
  accountLastAccessedAt: string | null;
}

export interface PersonalInformationSubscriptionResource {
  status: string;
  startDate: string;
  endDate: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  postal: string;
  isActive: boolean;
}

export interface PersonalInfoResource {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  accountLastAccessedAt: string;
  subscriptions: PersonalInformationSubscriptionResource[];
}

export enum ValidationMessage {
  requirePhone = 'Phone is required',
  invalidPhone = 'Phone is invalid'
}

export interface PersonalInfoRequestResource {
  email: string;
  phone: string;
}
