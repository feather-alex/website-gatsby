import { CheckoutErrors } from '../pages/checkout/store/checkout.types';

export class APIError extends Error {
  error: string;
  status: string | number;
  body?: object | string;
  detail?: string;

  constructor(
    message = 'Oops! Please check back in a moment.',
    error = 'Unknown Error',
    status: string | number = 0,
    body?: object | string
  ) {
    super(message);
    this.error = error;
    this.status = status;
    this.body = body;
  }
}

export function isAPIError(data: unknown): data is APIError {
  return typeof data === 'object' && data && data['status'] && data['message'] && data['error'];
}

export class StripeError extends Error {
  status: string | number;
  type = CheckoutErrors.StripeCardError;
  code: string;

  constructor(message: string, status: string | number, code: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function isStripeError(data: unknown): data is StripeError {
  return typeof data === 'object' && data && data['type'] && data['type'] === CheckoutErrors.StripeCardError;
}

export function isTooManyAttemptsError(data: object): boolean {
  return data && data['error'] && JSON.parse(data['error']).error === 'too_many_attempts';
}
