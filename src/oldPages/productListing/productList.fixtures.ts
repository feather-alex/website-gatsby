import { ProductListRequestPayload } from './store/productList.types';
import { FilterMap, FilterType } from './filter.service';
import { IdentifierAndName } from '../../types/Product';
import { Meta } from '../../types/ReduxState';
import { DeliveryAreaIdentifier } from '../../app/store/plan/plan.types';

export const groupedSubclasses: IdentifierAndName[] = [
  {
    identifier: 'upholstered-occasional-chair',
    name: 'Upholstered Occasional Chair'
  },
  {
    identifier: 'non-upholstered-occasional-chair',
    name: 'Non-Upholstered Occasional Chair'
  },
  {
    identifier: 'bed-frame',
    name: 'Bed Frame'
  },
  {
    identifier: 'upholstered-bed',
    name: 'Upholstered Bed'
  },
  {
    identifier: 'non-upholstered-bed',
    name: 'Non-Upholstered Bed'
  },
  {
    identifier: 'tall-dresser',
    name: 'Tall Dresser'
  },
  {
    identifier: 'wide-dresser',
    name: 'Wide Dresser'
  },
  {
    identifier: 'upholstered-bench',
    name: 'Upholstered Bench'
  },
  {
    identifier: 'non-upholstered-bench',
    name: 'Non-Upholstered Bench'
  },
  {
    identifier: 'shag-rug',
    name: 'Shag Rug'
  },
  {
    identifier: 'flatweave',
    name: 'Flatweave'
  },
  {
    identifier: 'hand-tufted-rug',
    name: 'Hand Tufted Rug'
  },
  {
    identifier: 'framed-print',
    name: 'Framed Print'
  },
  {
    identifier: 'dimensional-art',
    name: 'Dimensional-art'
  },
  {
    identifier: 'bar-stool',
    name: 'Bar Stool'
  },
  {
    identifier: 'counter-stool',
    name: 'Counter Stool'
  },
  {
    identifier: 'upholstered-screen',
    name: 'Upholstered Screen'
  }
];

export const nonGroupedSubclasses: IdentifierAndName[] = [
  {
    identifier: 'nightstand',
    name: 'Nightstand'
  },
  {
    identifier: 'floor-lamp',
    name: 'Floor Lamp'
  },
  {
    identifier: 'table-lamp',
    name: 'Table Lamp'
  },
  {
    identifier: 'sofa',
    name: 'Sofa'
  },
  {
    identifier: 'dining-table',
    name: 'Dining Table'
  },
  {
    identifier: 'ottoman-pouf',
    name: 'Ottoman/pouf'
  },
  {
    identifier: 'side-table',
    name: 'Side Table'
  },
  {
    identifier: 'coffee-table',
    name: 'Coffee Table'
  },
  {
    identifier: 'sleeper-sofa',
    name: 'Sleeper Sofa'
  },

  {
    identifier: 'cabinet',
    name: 'Cabinet'
  },
  {
    identifier: 'bookcase',
    name: 'Bookcase'
  },
  {
    identifier: 'bar-cart',
    name: 'Bar Cart'
  },
  {
    identifier: 'dining-chair',
    name: 'Dining Chair'
  },
  {
    identifier: 'kids-mattress',
    name: 'Kids Mattress'
  },
  {
    identifier: 'desk',
    name: 'Desk'
  },
  {
    identifier: 'wall-mirror',
    name: 'Wall Mirror'
  },
  {
    identifier: 'air-conditioner',
    name: 'Air Conditioner'
  },
  {
    identifier: 'sectional',
    name: 'Sectional'
  },
  {
    identifier: 'media-console',
    name: 'Media Console'
  },
  {
    identifier: 'mattress',
    name: 'Mattress'
  },
  {
    identifier: 'console',
    name: 'Console'
  },
  {
    identifier: 'desk-chair',
    name: 'Desk Chair'
  },
  {
    identifier: 'floor-mirror',
    name: 'Floor Mirror'
  }
];

export const unsortedSubclasses: IdentifierAndName[] = [
  { identifier: 'art', name: 'Art' },
  { identifier: 'sofa', name: 'Sofa' },
  { identifier: 'bar-cart', name: 'Bar Cart' }
];

export const sortedSubclasses: IdentifierAndName[] = [
  { identifier: 'sofa', name: 'Sofa' },
  { identifier: 'bar-cart', name: 'Bar Cart' },
  { identifier: 'art', name: 'Art' }
];

const mockProduct = {
  identifier: 'chair',
  title: 'amazing chair',
  categories: [],
  subclass: {
    identifier: 'subclass',
    name: 'subclass'
  },
  brand: {
    identifier: '',
    name: ''
  },
  variants: [],
  options: []
};

export const mockProducts = [mockProduct];

export const mockMeta: Meta = {
  pageNumber: 0,
  total: 1,
  availableFilters: {
    subclasses: [],
    classes: [],
    brands: []
  }
};

const mockFilterMap: FilterMap = {
  brands: [],
  order: [],
  classes: [],
  subclasses: [],
  sort: []
};

export const mockSamplePayload: ProductListRequestPayload = {
  body: {
    offset: 0,
    numItems: 40,
    sort: (mockFilterMap[FilterType.SORT_BY][0] as 'price' | 'title' | undefined) || null,
    order: (mockFilterMap[FilterType.ORDER][0] as 'a' | 'd' | undefined) || null,
    categories: [],
    classes: [],
    subclasses: [],
    filter: {
      deliveryArea: DeliveryAreaIdentifier.NY,
      brands: mockFilterMap[FilterType.BRAND_FILTER],
      classes: mockFilterMap[FilterType.CLASS],
      subclasses: mockFilterMap[FilterType.SUBCLASS]
    }
  },
  isInfiniteLoading: true
};
