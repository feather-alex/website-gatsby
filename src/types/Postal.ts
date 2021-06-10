export interface PostalResponse {
  postal: string | null;
  identifier: string | null;
}

export interface PostalRequest {
  postal: string;
  identifier: string | undefined;
  weDeliver: boolean;
  inputError?: boolean;
  showNavigationBanner?: boolean;
}
