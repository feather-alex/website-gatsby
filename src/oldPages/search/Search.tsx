/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useEffect, useState, ChangeEvent, useCallback, KeyboardEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';
import { useHistory } from 'react-router';

import Layout from '../../app/Layout';
import Analytics from '../../analytics/analytics';
import PAGES from '../../analytics/pages';
import Helmet from '../../components/Helmet';
import {
  getProductsData,
  getProductsTotal,
  getPackagesData,
  getPackagesError,
  getProductsError,
  getIsFetchingPackages,
  getIsFetchingProducts,
  getSearchKeyword
} from './store/search.selectors';
import TakeTheQuizPreFooter from '../../ui/footers/TakeTheQuizPreFooter';
import { getIsMobileBreakpoint } from '../../app/store/dimensions/dimensions.selectors';
import { addKeyword, loadSearchProducts } from './store/search.actions';
import { SHADES, BRAND, COLORS, BREAKPOINTS } from '../../ui/variables';
import Button from '../../ui/buttons/Button';
import InfoDisplay from './InfoDisplay';
import ProductList from '../productListing/ProductList';
import PackageList from '../packageListing/PackageList';
import { getDeliveryAreaIdentifier, getMembershipState } from '../../app/store/plan/plan.selectors';
import SearchIcon from '../../ui/icons/SearchIcon';
import ErrorPage from '../../components/ErrorPage';
import { getShouldShowProduct } from '../productListing/productList.service';
import { DeliveryAreaIdentifier } from '../../app/store/plan/plan.types';
import Paragraph2 from '../../ui/paragraphs/Paragraph2';
import Header3 from '../../ui/headers/Header3';
import Header2 from '../../ui/headers/Header2';

const TITLE = 'Pay monthly for beautiful, high-quality furniture';
const DESCRIPTION =
  'Creating a home you love should be easy. Rent from 200+ pieces of furniture, art, and rugs, get everything delivered + assembled in as little as 7 days.';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 48px;
  padding: 0 200px 48px;

  @media ${BREAKPOINTS.MOBILE} {
    padding: 0 24px 48px;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  width: 100%;
  border-bottom: 1px solid
    ${({ isQueryPresent }: { isQueryPresent: boolean }) => (isQueryPresent ? BRAND.PRIMARY_TEXT : SHADES.SHADE_LIGHTER)};
`;

const SearchButton = styled(Button)`
  min-width: 20px;

  @media ${BREAKPOINTS.MOBILE} {
    padding: 11px 13px;
  }
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  font-size: 44px;
  line-height: 54px;
  width: 100%;

  @media ${BREAKPOINTS.MOBILE} {
    font-size: 24px;
    line-height: 24px;
  }
`;

const SearchIconContainer = styled.div`
  width: 26px;
  height: 26px;

  @media ${BREAKPOINTS.DESKTOP} {
    margin-right: 8px;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 200px;
  background-color: ${SHADES.WHITE};

  @media ${BREAKPOINTS.MOBILE} {
    padding: 0;
  }
`;

const ResultsHeader = styled.div`
  min-height: 72px;
  width: 100%;

  @media ${BREAKPOINTS.DESKTOP} {
    min-height: 96px;
  }
`;

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 112px;
`;

const NumResults = styled(Paragraph2)`
  margin: 48px 0 24px;
  align-self: baseline;

  @media ${BREAKPOINTS.MOBILE} {
    margin: 24px;
  }
`;

const Results = styled.div`
  width: 100%;
  ${({ areResultsAvailable, isMobileBreakpoint }: { areResultsAvailable: boolean; isMobileBreakpoint: boolean }) =>
    areResultsAvailable && `margin-bottom: ${isMobileBreakpoint ? 72 : 96}px;`}
`;

const Search = () => {
  useEffect(() => {
    Analytics.trackPage(PAGES.SEARCH);
  }, []);
  const dispatch = useDispatch();

  const history = useHistory();
  const search = qs.parse(location.search);
  const keyword = search.keyword ? search.keyword.toString() : null;

  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const productData = useSelector(getProductsData);
  const productTotal = useSelector(getProductsTotal);
  const packageData = useSelector(getPackagesData);
  const deliveryAreaIdentifier = useSelector(getDeliveryAreaIdentifier);
  const packagesError = useSelector(getPackagesError);
  const productsError = useSelector(getProductsError);
  const isFetchingPackages = useSelector(getIsFetchingPackages);
  const isFetchingProducts = useSelector(getIsFetchingProducts);
  const membershipState = useSelector(getMembershipState);
  const reduxKeyword = useSelector(getSearchKeyword);

  const [query, setQuery] = useState<string | null>(null);
  const isDisabled = !query || query.length <= 2;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [keyword]);

  useEffect(() => {
    if (keyword && keyword !== reduxKeyword) {
      dispatch(addKeyword({ keyword }));
    }
  }, [dispatch, keyword, reduxKeyword]);

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (query && !isDisabled && e.key === 'Enter') {
        const newSearch = qs.stringify({ keyword: query });
        history.replace(`${history.location.pathname}?${newSearch}`);
        dispatch(addKeyword({ keyword: query }));
        setQuery(null);

        // close keyboard on mobile:
        if ('ontouchstart' in document.documentElement) {
          e.currentTarget.blur();
        }
      }
    },
    [isDisabled, query, history, dispatch]
  );

  const handleClick = useCallback(() => {
    if (query) {
      const newSearch = qs.stringify({ keyword: query });
      history.replace(`${history.location.pathname}?${newSearch}`);
      dispatch(addKeyword({ keyword: query }));
      setQuery(null);
    }
  }, [query, history, dispatch]);

  const handleLoadMoreProducts = useCallback(() => {
    if (!keyword) {
      return;
    }

    dispatch(loadSearchProducts());
  }, [keyword, dispatch]);

  const isProductResults =
    !!keyword &&
    productData.some((productDatum) =>
      getShouldShowProduct(productDatum, deliveryAreaIdentifier || DeliveryAreaIdentifier.All)
    );
  const isPackageResults = !!keyword && !!packageData.length;

  const isResults = isProductResults || isPackageResults;
  const isFetching = isFetchingPackages || isFetchingProducts;
  const Header = isMobileBreakpoint ? Header3 : Header2;

  if (productsError) {
    return (
      <Layout>
        <Helmet title={TITLE} description={DESCRIPTION} />
        <ErrorPage title={`${productsError.status} ${productsError.error}`} content={productsError.message} />
      </Layout>
    );
  }

  if (packagesError) {
    return (
      <Layout>
        <Helmet title={TITLE} description={DESCRIPTION} />
        <ErrorPage title={`${packagesError.status} ${packagesError.error}`} content={packagesError.message} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet title={TITLE} description={DESCRIPTION} />
      <SearchContainer>
        <SearchInputContainer isQueryPresent={!!query}>
          <SearchInput
            type="text"
            value={query || ''}
            placeholder={keyword ? keyword : 'Search Furniture'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            onKeyDown={handleEnter}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={true}
          />
          <SearchButton onClick={handleClick} isDisabled={isDisabled}>
            <SearchIconContainer>
              <SearchIcon color={isDisabled ? SHADES.SHADE_LIGHT : BRAND.PRIMARY_TEXT} />
            </SearchIconContainer>
            {!isMobileBreakpoint && 'Search'}
          </SearchButton>
        </SearchInputContainer>
      </SearchContainer>

      <ResultsContainer>
        <ResultsHeader>
          {!!keyword &&
            !isFetching &&
            (!isResults ? (
              <NoResultsContainer>
                <Header>No results found for search: {keyword}.</Header>
                <Header>Try searching again.</Header>
              </NoResultsContainer>
            ) : (
              // The products endpoint is paginated so it returns a total property that reflects the total amount of products.
              <NumResults>
                We found {productTotal + packageData.length} results for "{keyword}"
              </NumResults>
            ))}
        </ResultsHeader>

        <Results areResultsAvailable={isProductResults || isPackageResults} isMobileBreakpoint={isMobileBreakpoint}>
          {isProductResults && (
            <ProductList
              products={productData || []}
              loadMoreProducts={handleLoadMoreProducts}
              deliveryAreaIdentifier={deliveryAreaIdentifier || DeliveryAreaIdentifier.All}
              isMobileBreakpoint={isMobileBreakpoint}
              membershipState={membershipState}
            />
          )}
          {isPackageResults && (
            <PackageList
              packagesData={packageData}
              isMobileBreakpoint={isMobileBreakpoint}
              membershipState={membershipState}
              deliveryAreaIdentifier={deliveryAreaIdentifier || DeliveryAreaIdentifier.All}
              isSearchResults={true}
            />
          )}
        </Results>
        <InfoDisplay />
      </ResultsContainer>
      <TakeTheQuizPreFooter backgroundColor={COLORS.CREAM} isMobileBreakpoint={isMobileBreakpoint} />
    </Layout>
  );
};

export default Search;
