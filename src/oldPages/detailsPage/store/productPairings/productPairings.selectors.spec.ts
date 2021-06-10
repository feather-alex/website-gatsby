import { State as GlobalState, APIError } from '../../../../types/ReduxState';
import { ProductPairingsState } from './productPairings.types';
import * as selectors from './productPairings.selectors';
import { initialState } from './productPairings.reducer';
import { makeMockProductForListing } from '../productDetails/product.fixtures';

describe('Product Pairings - Selectors', () => {
  it('Should return the value of: productPairings (many pairings)', () => {
    const mockProduct1 = makeMockProductForListing(1);
    const mockProduct2 = makeMockProductForListing(2);
    const mockProduct3 = makeMockProductForListing(3);

    const value = [mockProduct1, mockProduct2, mockProduct3];

    const state: ProductPairingsState = {
      ...initialState,
      products: value
    };

    const selected = selectors.getProductPairing({ productPairings: state } as GlobalState);

    expect(selected).toEqual(value);
    expect(selected.length).toEqual(3);
  });

  it('Should return the value of: isFetching', () => {
    const value = true;

    const state: ProductPairingsState = {
      ...initialState,
      isFetching: value
    };

    const selected = selectors.getIsFetching({ productPairings: state } as GlobalState);

    expect(selected).toEqual(value);
  });

  it('Should return the value of: error', () => {
    const value: APIError = {
      error: 'lil error boi',
      message: 'causin all sorts of problems',
      status: 500
    };

    const state: ProductPairingsState = {
      ...initialState,
      error: value
    };

    const selected = selectors.getError({ productPairings: state } as GlobalState);

    expect(selected).toEqual(value);
  });
});
