import { ProductForListing, ProductListRequest } from "../../../types/Product";
import { APIError, Meta } from "../../../types/ReduxState";

export interface ProductListState {
  isFetching: boolean;
  error: APIError | null;
  meta: Meta;
  products: ProductForListing[];
}

export interface ProductListRequestPayload {
  body: ProductListRequest;
  isInfiniteLoading?: boolean;
}

export interface ProductListSuccessPayload {
  meta: Meta;
  products: ProductForListing[];
  isInfiniteLoading?: boolean;
}
