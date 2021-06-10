import { State as GlobalState } from '../../../types/ReduxState';
import { getShouldShowProduct } from '../../productListing/productList.service';
import { getDeliveryAreaIdentifier } from '../../../app/store/plan/plan.selectors';
import { createSelector } from 'reselect';
import { DeliveryAreaIdentifier } from '../../../app/store/plan/plan.types';

// Keyword Selector
export const getSearchKeyword = ({ search }: GlobalState) => search.keyword;
export const getIsKeywordPresent = createSelector(getSearchKeyword, (keyword: string) => keyword.trim().length > 0);

// Product Selectors
export const getProductsData = ({ search }: GlobalState) => (search.products ? search.products.data : []);
export const getProductsTotal = createSelector(
  getProductsData,
  getDeliveryAreaIdentifier,
  (productsData, deliveryAreaIdentifier) => {
    return productsData.reduce(
      (total, product) =>
        getShouldShowProduct(product, deliveryAreaIdentifier || DeliveryAreaIdentifier.All)
          ? total + new Set(product.variants.map((variants) => variants.listingImage.desktop)).size
          : total,
      0
    );
  }
);
export const getProductsError = ({ search }: GlobalState) => search.products.error;
export const getProductsOffset = ({ search }: GlobalState) => search.products.offset;
export const getIsFetchingProducts = ({ search }: GlobalState) => search.products.isFetching;
export const getIsInfiniteLoading = ({ search }: GlobalState) => search.products.isInfiniteLoading;

// Package Selectors
export const getPackagesData = ({ search }: GlobalState) => search.packages.data;
export const getPackagesError = ({ search }: GlobalState) => search.packages.error;
export const getIsFetchingPackages = ({ search }: GlobalState) => search.packages.isFetching;
