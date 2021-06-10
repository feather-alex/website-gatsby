import { groupSubclasses, mainSubclasses, formatProductListResponse, sortSubclasses } from './productList.service';
import {
  nonGroupedSubclasses,
  groupedSubclasses,
  sortedSubclasses,
  unsortedSubclasses,
  mockMeta,
  mockProducts
} from './productList.fixtures';
import { ProductListResponse } from '../../types/Product';
import { ProductListSuccessPayload } from './store/productList.types';

describe('Determine list of subclasses', () => {
  it('should return a reduced list of subclasses if some subclasses fall under higher groupings', () => {
    const subclasses = [...nonGroupedSubclasses, ...groupedSubclasses];
    const reducedSubclasses = [...nonGroupedSubclasses, ...Object.values(mainSubclasses)];
    expect(groupSubclasses(subclasses)).toEqual(reducedSubclasses);
  });

  it('should return the same list of subclasses if no subclasses fall under any higher groupings', () => {
    expect(groupSubclasses(nonGroupedSubclasses)).toEqual(nonGroupedSubclasses);
  });
});

describe('Sort list of subclasses', () => {
  it('should return a sorted list of subclasses', () => {
    expect(sortSubclasses(unsortedSubclasses)).toEqual(sortedSubclasses);
  });

  it('should return the same list of subclasses if they are already in order', () => {
    expect(sortSubclasses(sortedSubclasses)).toEqual(sortedSubclasses);
  });
});

describe('Format ProductListResponse', () => {
  it('Should return a properly formatted value that can be used client-side', () => {
    const mockResponse: ProductListResponse = {
      pageData: mockProducts,
      total: 1,
      availableFilters: {
        subclasses: [],
        classes: [],
        brands: []
      },
      pageNumber: 0
    };

    const mockFormattedResponse: ProductListSuccessPayload = {
      meta: mockMeta,
      products: mockProducts,
      isInfiniteLoading: true
    };

    expect(formatProductListResponse(mockResponse, true)).toEqual(mockFormattedResponse);
  });
});
