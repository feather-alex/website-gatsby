import { DeliveryAreaIdentifier } from '../../../../app/store/plan/plan.types';
import { FullProductDetails, ProductForListing } from '../../../../types/Product';
import { APIError } from '../../../../types/ReduxState';

export interface ProductPairingsState {
  isFetching: boolean;
  error: APIError | null;
  products: ProductForListing[];
  bestsellers: FullProductDetails[];
}

export interface ProductPairingsRequestPayload {
  identifiers: string[];
  categoryIdentifier: string;
  deliveryArea?: DeliveryAreaIdentifier;
}

export interface ProductBestsellersRequestPayload {
  productIdentifiers: string[];
}
