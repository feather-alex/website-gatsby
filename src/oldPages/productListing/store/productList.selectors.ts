import { State as GlobalState } from "../../../types/ReduxState";

/**
 * *--------------------------------------------*
 * | Selectors for ProductList global state |
 * *--------------------------------------------*
 */
export const getError = ({ productList }: GlobalState) => productList.error;

export const getIsFetching = ({ productList }: GlobalState) =>
  productList.isFetching;

export const getProductListMeta = ({ productList }: GlobalState) =>
  productList.meta;

export const getProducts = ({ productList }: GlobalState) =>
  productList.products;
