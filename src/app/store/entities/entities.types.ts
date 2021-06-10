import { APIError } from '../../../types/ReduxState';

export interface IdName {
  identifier: string;
  name: string;
}

export interface IdNameOrder extends IdName {
  displayOrder: number;
}

export interface ProductCategory extends IdNameOrder {
  showInFooter: boolean;
}

export interface Categories {
  products: ProductCategory[];
  bundles: IdNameOrder[];
}

export interface DeliveryArea extends IdNameOrder {
  shortName: string;
  validRegions: Array<{
    name: string;
    code: string;
  }>;
  blockedDeliveryDates: string[];
}

export interface ProductTotals {
  [cityIdentifier: string]: { [roomIdentifier: string]: number };
}

export interface ProductEntities {
  categories: Categories;
  deliveryAreas: DeliveryArea[];
}

export interface ProductEntitiesState {
  isFetching: boolean;
  data: ProductEntities | null;
  error: APIError | null;
}
