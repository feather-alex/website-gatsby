import { APIError } from "../../../../types/ReduxState";

export interface AccountHistory extends AccountHistoryResource {
  isFetching: boolean;
  error: APIError | null;
  perPage: number;
}

export interface PaymentDetails {
  id: string;
  amount: number;
  status: "failed" | "succeeded" | "pending";
  chargedAt: number;
  sourceId: string;
  description: string;
  reasonForFailure: string | null;
  amountRefunded: number;
}

export interface AccountHistoryResource {
  charges: PaymentDetails[];
  hasMore: boolean;
}
