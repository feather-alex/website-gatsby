import { FullProductDetails, OptionType } from "../../../../types/Product";
import { QueryParam } from "../../../../api/request";
import { APIError } from "../../../../types/ReduxState";

export interface ProductDetailsState {
  isFetching: boolean;
  error: APIError | null;
  data: FullProductDetails;
}

export interface ProductDetailsRequestPayload {
  productIdentifier: string;
}

export interface FormattedRequestDetails {
  fullEndpoint: string;
  queryParams?: QueryParam[];
}

export interface SelectedOptions {
  [OptionType.Color]: SelectedOption | null;
  [OptionType.Material]: SelectedOption | null;
  [OptionType.Structure]: SelectedOption | null;
}

export interface SelectedOption {
  identifier: string;
  name: string;
}
