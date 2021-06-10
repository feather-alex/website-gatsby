/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { Fragment } from 'react';
import { compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import Helmet from '../../components/Helmet';
import Layout from '../../app/Layout';
import { State as GlobalState, Meta, APIError } from '../../types/ReduxState';
import { resetProductList, GetProductListRequest, getProductListRequest } from './store/productList.actions';
import { ProductForListing } from '../../types/Product';
import Analytics from '../../analytics/analytics';
import PAGES from '../../analytics/pages';
import ProductList from './ProductList';
import ProductFilters from './ProductFilters';
import { ProductEntities } from '../../app/store/entities/entities.types';
import { getProductEntities } from '../../app/store/entities/entities.selectors';
import ProductHeader from './ProductHeader';
import ProductSortOrder from './ProductSortOrder';
import NoResults from './NoResults';
import Loading from '../../components/Loading';
import ErrorPage from '../../components/ErrorPage';
import { SHADES } from '../../ui/variables';
import { createFilterNameMap, getFilters, FilterType } from './filter.service';
import { getDeliveryAreaIdentifier, getMembershipState } from '../../app/store/plan/plan.selectors';
import { getIsMobileBreakpoint } from '../../app/store/dimensions/dimensions.selectors';
import ProductRefineMobile from './ProductRefineMobile';
import { getHelmetData, getShouldShowProduct, subclassMappings } from './productList.service';
import { MembershipState, DeliveryAreaIdentifier } from '../../app/store/plan/plan.types';
import { ActionCreator } from '../../types/FluxStandardActions';
import { getError, getIsFetching, getProducts, getProductListMeta } from './store/productList.selectors';

const PRODUCTS_PER_PAGE = 40;

interface StateProps {
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  error: APIError | null;
  isFetching: boolean;
  isMobileBreakpoint: boolean;
  productData: ProductForListing[];
  productMeta: Meta;
  productEntities: ProductEntities | null;
  membershipState: MembershipState;
}

interface DispatchProps {
  getProductList: GetProductListRequest;
  resetProductList: ActionCreator;
}

type Props = StateProps & DispatchProps & RouteComponentProps<{ productIdentifier?: string }>;

class ProductListingPage extends React.Component<Props> {
  componentDidMount() {
    Analytics.trackPage(PAGES.PRODUCTS);

    this.props.resetProductList();
    this.getProductList();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0);
    }
    if (
      prevProps.location.search !== this.props.location.search ||
      prevProps.location.pathname !== this.props.location.pathname ||
      prevProps.deliveryAreaIdentifier !== this.props.deliveryAreaIdentifier
    ) {
      this.props.resetProductList();
      this.setState({ page: 0 }, () => {
        this.getProductList();
      });
    }
  }

  handleLoadMore = () => {
    const { isFetching, productData, productMeta } = this.props;

    if (!isFetching && productMeta.total > productData.length) {
      const offset = productData.length;
      this.getProductList(offset);
    }
  };

  getProductList = (offset = 0) => {
    const filterMap = getFilters(this.props.location);

    // TODO: move this to service and make type-safe
    const newCategoriesSubclassesMap: { [name: string]: string[] } = {
      sofas: ['sofa', 'sleeper-sofa', 'sectional'],
      chairs: ['upholstered-occasional-chair', 'non-upholstered-occasional-chair', 'desk-chair', 'dining-chair'],
      'coffee-tables': ['coffee-table'],
      'side-tables': ['side-table'],
      'ottomans-stools-benches': [
        'ottoman-pouf',
        'bar-stool',
        'counter-stool',
        'non-upholstered-bench',
        'upholstered-bench'
      ],
      'beds-mattresses': [
        'bed-frame',
        'bedding',
        'headboard',
        'mattress',
        'mattress-protector',
        'non-upholstered-bed',
        'pillow',
        'upholstered-bed'
      ],
      dressers: ['dresser', 'nightstand', 'tall-dresser', 'wide-dresser'],
      'dining-tables': ['dining-table'],
      'dining-chairs-stools': ['dining-chair', 'bar-stool', 'counter-stool'],
      storage: ['bookcase', 'shelving-rack', 'cabinet', 'media-console'],
      'desks-chairs-shelves': ['desk', 'desk-chair', 'bookcase'],
      'rugs-artwork': ['shag-rug', 'hand-tufted-rug', 'flatweave', 'rug-pad', 'framed-print', 'dimensional-art'],
      'bar-cart-storage': ['cabinet', 'bar-cart', 'console', 'media-console'],
      'desk-office-chairs': ['desk', 'desk-chair', 'console']
    };

    const { productIdentifier: category } = this.props.match.params;

    const isInNewCategories = category ? Boolean(newCategoriesSubclassesMap[category]) : false;
    // The mainSubclass is just a flag for a group of finer subclasses, and so we want to add in
    // the subclasses it represents when we make the api call.
    Object.entries(subclassMappings).forEach(([subclass, mapping]) => {
      if (filterMap[FilterType.SUBCLASS].includes(mapping.identifier)) {
        filterMap[FilterType.SUBCLASS] = filterMap[FilterType.SUBCLASS].concat(subclass);
      }
    });

    this.props.getProductList({
      body: {
        offset,
        numItems: PRODUCTS_PER_PAGE,
        sort: (filterMap[FilterType.SORT_BY][0] as 'price' | 'title' | undefined) || null,
        order: (filterMap[FilterType.ORDER][0] as 'a' | 'd' | undefined) || null,
        categories: !isInNewCategories && category ? [category] : [],
        classes: [],
        subclasses: isInNewCategories && category ? newCategoriesSubclassesMap[category] : [],
        filter: {
          deliveryArea: this.props.deliveryAreaIdentifier,
          brands: filterMap[FilterType.BRAND_FILTER],
          classes: filterMap[FilterType.CLASS],
          subclasses: filterMap[FilterType.SUBCLASS]
        }
      },
      isInfiniteLoading: true
    });
  };

  render() {
    const {
      error,
      location,
      productEntities,
      isMobileBreakpoint,
      isFetching,
      productMeta,
      productData,
      deliveryAreaIdentifier,
      membershipState
    } = this.props;
    const filterNameMap = createFilterNameMap(productMeta);
    const { title, description, image } = getHelmetData(
      location,
      productEntities ? productEntities.categories : null,
      filterNameMap
    );
    const isResults = productData.some((productDatum) =>
      getShouldShowProduct(productDatum, deliveryAreaIdentifier || DeliveryAreaIdentifier.All)
    );

    return (
      <Layout>
        <Helmet title={title} description={description} imageUrl={image} />
        {error ? (
          <ErrorPage title={`${error.status} ${error.error}`} content={error.message} />
        ) : (
          <Fragment>
            <ProductHeader categories={productEntities ? productEntities.categories : null} />
            <div
              css={css`
                background-color: ${SHADES.WHITE};
                padding-bottom: ${isMobileBreakpoint ? '0' : '154px'};
              `}
            >
              {isMobileBreakpoint ? (
                productEntities && <ProductRefineMobile filterNameMap={filterNameMap} productMeta={productMeta} />
              ) : (
                <ProductSortOrder filterNameMap={filterNameMap} />
              )}
              <div
                css={css`
                  display: flex;
                `}
              >
                {!isMobileBreakpoint && (
                  <section
                    css={css`
                      min-width: max-content;
                      padding: 0 48px;
                    `}
                  >
                    <ProductFilters />
                  </section>
                )}
                <div
                  css={css`
                    width: 100%;
                    padding-right: ${isMobileBreakpoint ? '0' : '48px'};
                  `}
                >
                  {isFetching && !isResults ? (
                    <div
                      css={css`
                        height: 50vh;
                      `}
                    >
                      <Loading
                        message={
                          <Fragment>
                            Beautiful furniture is just <br /> around the corner!
                          </Fragment>
                        }
                      />
                    </div>
                  ) : !isResults ? (
                    <NoResults />
                  ) : (
                    <ProductList
                      isMobileBreakpoint={isMobileBreakpoint}
                      products={productData}
                      deliveryAreaIdentifier={deliveryAreaIdentifier || DeliveryAreaIdentifier.All}
                      loadMoreProducts={this.handleLoadMore}
                      membershipState={membershipState}
                    />
                  )}
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  error: getError(state),
  isFetching: getIsFetching(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  productData: getProducts(state),
  productMeta: getProductListMeta(state),
  productEntities: getProductEntities(state),
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state),
  membershipState: getMembershipState(state)
});

const mapDispatchToProps: DispatchProps = {
  getProductList: getProductListRequest,
  resetProductList
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ProductListingPage);
