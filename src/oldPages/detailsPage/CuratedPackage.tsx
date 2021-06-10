/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Layout from '../../app/Layout';
import { getIsMobileBreakpoint, getWindowWidth } from '../../app/store/dimensions/dimensions.selectors';
import {
  getDeliveryAreaIdentifier,
  getDeliveryZipCode,
  getMembershipState,
  getDeliveryTimelineText
} from '../../app/store/plan/plan.selectors';
import { DeliveryAreaIdentifier, MembershipState } from '../../app/store/plan/plan.types';
import Analytics from '../../analytics/analytics';
import PAGES from '../../analytics/pages';
import Helmet from '../../components/Helmet';
import Loading from '../../components/Loading';
import ErrorPage from '../../components/ErrorPage';
import { loadPackage } from '../../reducers/package';
import { FullPackageDetails } from '../../types/Package';
import { State as GlobalState, APIError } from '../../types/ReduxState';
import TakeTheQuizPreFooter from '../../ui/footers/TakeTheQuizPreFooter';
import Breadcrumb, { CurrentType } from './components/Breadcrumb';
import DesktopImageCarousel from './components/packages/curatedPackage/DesktopImageCarousel';
import MobileImageCarousel from './components/MobileImageCarousel';
import PackageDetailsContainer from './components/packages/curatedPackage/CuratedPackageDetailsContainer';
import ProductPairings from './components/ProductPairings';
import { getImageSrc, getImageSrcArray, getDesktopImageSrcArray, getInitialPackagePrices } from './detailsPage.service';
import { BRAND } from '../../ui/variables';
import ProductOrPackageNotFound from './ProductOrPackageNotFoundPage';

interface MatchParams {
  packageIdentifier: string;
}

interface StateProps {
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  errorFetching: APIError | null;
  isFetching: boolean;
  isMobileBreakpoint: boolean;
  membershipState: MembershipState;
  packageData: FullPackageDetails;
  postalCode: string | null;
  windowWidth: number;
  deliveryTimelineText: string;
}

interface DispatchProps {
  loadPackage: (pkgId: string) => void;
}

type Props = StateProps & DispatchProps & RouteComponentProps<MatchParams>;

class CuratedPackage extends React.Component<Props> {
  componentDidMount() {
    const { packageIdentifier } = this.props.match.params;
    this.props.loadPackage(packageIdentifier);

    Analytics.trackPage(PAGES.CURATED_PACKAGE);
  }

  componentDidUpdate(prevProps: Props) {
    // if the package identifier changes, go fetch new package and treat as a new page view
    if (prevProps.match.params.packageIdentifier !== this.props.match.params.packageIdentifier) {
      this.props.loadPackage(this.props.match.params.packageIdentifier);
      Analytics.trackPage(PAGES.CURATED_PACKAGE);
    }
  }

  render() {
    const {
      deliveryAreaIdentifier,
      errorFetching,
      isFetching,
      isMobileBreakpoint,
      membershipState,
      packageData,
      postalCode,
      windowWidth,
      deliveryTimelineText
    } = this.props;

    const { image } = packageData.lifestyle;
    const lifestyleImage = getImageSrc(isMobileBreakpoint, image);
    const carouselImages = getImageSrcArray(isMobileBreakpoint, image, packageData.otherImages, [], []);
    const desktopCarouselImages = getDesktopImageSrcArray(carouselImages);

    const { memberRentalPrice } = getInitialPackagePrices(packageData);

    if (isFetching) {
      return (
        <Layout>
          <Loading />
        </Layout>
      );
    }

    if (errorFetching) {
      // if it is a 404 on a package render a specific error page
      if (errorFetching.status === 404) {
        return <ProductOrPackageNotFound />;
      } else {
        return <ErrorPage title={errorFetching.error} content={errorFetching.message} />;
      }
    }

    // packages may contain multiples of the same item (i.e a dining package w/ 4 chairs), so we use set for uniqueness
    const packageItemIdentifiers = [...new Set(packageData.variants[0].items.map((item) => item.identifier))];

    return (
      <Layout>
        <Helmet
          title={packageData.title}
          description={packageData.description}
          identifier={packageData.identifier}
          imageUrl={lifestyleImage || undefined}
          pageUrl={`https://www.livefeather.com/packages/${packageData.identifier}`}
          price={memberRentalPrice.toString() || undefined}
          product={true}
        />

        {isMobileBreakpoint && (
          <Breadcrumb
            type={CurrentType.Package}
            category={packageData.category}
            title={packageData.title}
            isMobileBreakpoint={isMobileBreakpoint}
          />
        )}

        <section
          css={css`
            background-color: ${BRAND.BACKGROUND};
          `}
        >
          {isMobileBreakpoint ? (
            <MobileImageCarousel carouselImages={carouselImages} isPackage={true} />
          ) : (
            <DesktopImageCarousel carouselImages={desktopCarouselImages} windowWidth={windowWidth} />
          )}
        </section>

        {!isMobileBreakpoint && (
          <Breadcrumb
            type={CurrentType.Package}
            category={packageData.category}
            title={packageData.title}
            isMobileBreakpoint={isMobileBreakpoint}
          />
        )}

        <PackageDetailsContainer
          deliveryAreaIdentifier={deliveryAreaIdentifier}
          membershipState={membershipState}
          isMobileBreakpoint={isMobileBreakpoint}
          packageData={packageData}
          postalCode={postalCode}
          deliveryTimelineText={deliveryTimelineText}
        />

        <ProductPairings
          productIdentifiers={packageItemIdentifiers}
          categoryIdentifier={packageData.category.identifier}
        />
        <TakeTheQuizPreFooter isMobileBreakpoint={isMobileBreakpoint} />
      </Layout>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state),
  errorFetching: state.entities.pkg.error,
  isFetching: state.entities.pkg.isFetching,
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  membershipState: getMembershipState(state),
  packageData: state.entities.pkg.data,
  postalCode: getDeliveryZipCode(state),
  windowWidth: getWindowWidth(state),
  deliveryTimelineText: getDeliveryTimelineText(state)
});

const mapDispatchToProps: DispatchProps = {
  loadPackage
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(CuratedPackage);
