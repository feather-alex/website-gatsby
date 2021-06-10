import qs from 'query-string';
import { Location } from 'history';
import Analytics from '../../analytics/analytics';
import { PRODUCT_CATEGORY } from '../../analytics/product-category/events';
import { removeOrAddFilterPayloadMapping } from '../../analytics/product-category/payload-mappings';
import { Meta } from '../../types/ReduxState';

export enum FilterType {
  BRAND_FILTER = 'brands',
  SUBCLASS = 'subclasses',
  CLASS = 'classes',
  SORT_BY = 'sort',
  ORDER = 'order'
}

export const displayFilters = {
  [FilterType.BRAND_FILTER]: true,
  [FilterType.SUBCLASS]: true
};

export type FilterMap = {
  [key in FilterType]: string[];
};

const filterTypeToAnalyticsType = {
  [FilterType.BRAND_FILTER]: 'BrandFilters',
  [FilterType.SUBCLASS]: 'SubclassFilters'
};

export const queryToList = (query?: string | string[] | null): string[] => {
  return query ? ([] as string[]).concat(query) : [];
};

export const isFilterInQueryList = (filter: string, existingList: string[]): boolean => {
  return existingList.some((filterInList) => filterInList === filter);
};

export const getFilters = (location: Location): FilterMap => {
  const search = qs.parse(location.search, { arrayFormat: 'comma' });
  return {
    [FilterType.BRAND_FILTER]: queryToList(search[FilterType.BRAND_FILTER]),
    [FilterType.ORDER]: queryToList(search[FilterType.ORDER]),
    [FilterType.SORT_BY]: queryToList(search[FilterType.SORT_BY]),
    [FilterType.CLASS]: queryToList(search[FilterType.CLASS]),
    [FilterType.SUBCLASS]: queryToList(search[FilterType.SUBCLASS])
  };
};

export const toggleFilter = (
  filterType: FilterType,
  filter: string,
  locationSearch: string,
  existing?: string | string[] | null
): string[] => {
  const existingList = queryToList(existing);
  const isInList = isFilterInQueryList(filter, existingList);
  Analytics.trackEvent(
    isInList ? PRODUCT_CATEGORY.FILTER_REMOVE : PRODUCT_CATEGORY.FILTER_ADD,
    removeOrAddFilterPayloadMapping({
      filterClicked: `${filterTypeToAnalyticsType[filterType]} / ${filter}`
    })
  );

  return isInList ? existingList.filter((existingFilter) => existingFilter !== filter) : existingList.concat(filter);
};

interface CreateQueryParams {
  identifier: string | undefined;
  filterType: FilterType;
  locationSearch: string;
  replace?: boolean;
}

export const createQuery = ({ identifier, filterType, locationSearch, replace }: CreateQueryParams): string => {
  const search = qs.parse(locationSearch, { arrayFormat: 'comma' });

  const searchObj = {
    ...search,
    [filterType]:
      replace || !identifier ? [identifier] : toggleFilter(filterType, identifier, locationSearch, search[filterType])
  };

  return qs.stringify(searchObj, { arrayFormat: 'comma' });
};

export const createFilterNameMap = (meta: Meta | null): { [identifier: string]: string } => {
  if (!meta) {
    return {};
  }
  const subclassesMap = meta.availableFilters.subclasses.reduce(
    (acc, filter) => ({ ...acc, [filter.identifier]: filter.name }),
    {}
  );
  const brandsMap = meta.availableFilters.brands.reduce(
    (acc, filter) => ({ ...acc, [filter.identifier]: filter.name }),
    {}
  );
  return { ...subclassesMap, ...brandsMap };
};
