import { ProductForListing } from '../../../types/Product';
import { PackageForListing } from '../../../types/Package';
import { APIError } from '../../../types/ReduxState';

interface SearchProducts {
  total: number;
  offset: number;
  isFetching: boolean;
  isInfiniteLoading: boolean;
  error: APIError | null;
  data: ProductForListing[];
}

interface SearchPackages {
  isFetching: boolean;
  error: APIError | null;
  data: PackageForListing[];
}

export interface Search {
  keyword: string;
  products: SearchProducts;
  packages: SearchPackages;
}
