import { FluxStandardAction } from '../../../types/FluxStandardActions';
import { FullPackageDetails } from '../../../types/Package';
import { ProductListResponse } from '../../../types/Product';
import * as actions from './search.actions';
import { APIError } from '../../../types/ReduxState';

// Action Creators - Functions that return plain objects.
// We want to test whether the correct action creator was
// called and whether the correct action was returned.

describe('Search Page - Actions', () => {
  it('Should create an action to add a search keyword.', () => {
    const keyword = 'chair';

    const expectedAction: FluxStandardAction = {
      type: actions.ADD_SEARCH_KEYWORD,
      payload: { keyword }
    };

    const actionCreator = actions.addKeyword({ keyword });

    expect(actionCreator).toEqual(expectedAction);
  });

  it('Should create an action to add a search keyword when it is initiatied from the navbar', () => {
    const keyword = 'chairz';

    const expectedAction: FluxStandardAction = {
      type: actions.ADD_SEARCH_KEYWORD,
      payload: { keyword }
    };

    const actionCreator = actions.addKeyword({ keyword });

    expect(actionCreator).toEqual(expectedAction);
  });

  it('Should create an action to load product search results.', () => {
    const expectedAction: FluxStandardAction = {
      type: actions.GET_SEARCH_PRODUCTS_REQUEST
    };

    const actionCreator = actions.loadSearchProducts();

    expect(actionCreator).toEqual(expectedAction);
  });

  it('Should create an action to handle a successful load of product search results', () => {
    const mockPayload: ProductListResponse = {
      pageData: [],
      total: 10,
      availableFilters: {
        subclasses: [],
        classes: [],
        brands: []
      },
      pageNumber: 0
    };

    const expectedAction: FluxStandardAction = {
      type: actions.GET_SEARCH_PRODUCTS_SUCCESS,
      payload: mockPayload
    };

    const actionCreator = actions.loadSearchProductsSuccess(mockPayload);

    expect(actionCreator).toEqual(expectedAction);
  });

  it('Should create an action to handle a failed request of product search results', () => {
    const error: APIError = {
      error: `Omg an error`,
      message: `Here's an error, yo.`,
      status: 420
    };

    const expectedAction: FluxStandardAction = {
      type: actions.GET_SEARCH_PRODUCTS_FAILURE,
      payload: { error },
      error: true
    };

    const actionCreator = actions.loadSearchProductsFailure(error);

    expect(actionCreator).toEqual(expectedAction);
  });

  it('Should create an action to load package search results.', () => {
    const expectedAction: FluxStandardAction = {
      type: actions.GET_SEARCH_PACKAGES_REQUEST
    };

    const actionCreator = actions.loadSearchPackages();

    expect(actionCreator).toEqual(expectedAction);
  });

  it('Should create an action to handle a successful request to load package search results', () => {
    const mockPayload: FullPackageDetails[] = [
      {
        description: '',
        identifier: '',
        title: '',
        category: {
          identifier: '',
          name: ''
        },
        listingImage: {
          mobile: '',
          desktop: ''
        },
        variants: [],
        availability: [],
        otherImages: [],
        options: [],
        lifestyle: {
          summary: '',
          image: {
            mobile: '',
            desktop: ''
          }
        }
      }
    ];

    const expectedAction: FluxStandardAction = {
      type: actions.GET_SEARCH_PACKAGES_SUCCESS,
      payload: mockPayload
    };

    const actionCreator = actions.loadSearchPackagesSuccess(mockPayload);

    expect(actionCreator).toEqual(expectedAction);
  });

  it('Should create an action to handle a failed request to load package search results', () => {
    const error: APIError = {
      error: `Omg an error`,
      message: `Here's an error, yo.`,
      status: 420
    };

    const expectedAction: FluxStandardAction = {
      type: actions.GET_SEARCH_PACKAGES_FAILURE,
      payload: { error },
      error: true
    };

    const actionCreator = actions.loadSearchPackagesFailure(error);

    expect(actionCreator).toEqual(expectedAction);
  });

  it('Should create an action to reset search state.', () => {
    const expectedAction: FluxStandardAction = {
      type: actions.RESET_SEARCH
    };

    const actionCreator = actions.resetSearch();

    expect(actionCreator).toEqual(expectedAction);
  });
});
