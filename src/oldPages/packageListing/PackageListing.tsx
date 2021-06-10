/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { Fragment } from 'react';
import Layout from '../../app/Layout';

import { loadPackages, LoadPackages } from '../../reducers/packages';
import { State as GlobalState } from '../../types/ReduxState';
import Analytics from '../../analytics/analytics';
import PAGES from '../../analytics/pages';
import Helmet from '../../components/Helmet';
import ErrorPage from '../../components/ErrorPage';
import ProductHeader from '../productListing/ProductHeader';
import { getProductEntities } from '../../app/store/entities/entities.selectors';
import { SHADES } from '../../ui/variables';
import Loading from '../../components/Loading';
import NoResults from '../productListing/NoResults';
import { ProductEntities } from '../../app/store/entities/entities.types';
import { getIsMobileBreakpoint } from '../../app/store/dimensions/dimensions.selectors';
import { connect } from 'react-redux';
import { PackageForListing } from '../../types/Package';
import PackageList from './PackageList';
import { getMembershipState, getDeliveryAreaIdentifier } from '../../app/store/plan/plan.selectors';
import { DeliveryAreaIdentifier, MembershipState } from '../../app/store/plan/plan.types';

const BottomPad = styled.div`
  display: flex;
  background-color: ${SHADES.WHITE};
  padding-bottom: ${({ isMobileBreakpoint }: { isMobileBreakpoint: boolean }) => (isMobileBreakpoint ? '0' : '154px')};
`;
const SidePad = styled.div`
  width: 100%;
  padding: 0 ${({ isMobileBreakpoint }: { isMobileBreakpoint: boolean }) => (isMobileBreakpoint ? 0 : 80)}px;
`;

const TITLE = 'Furnish your space in less than 5 minutes';
const DESCRIPTION =
  'Easily furnish your bedroom, living room, or dining area with a curated package. Packages start at $36 per month. Delivery & assembly within 7 days.';

const IMAGE =
  'https://img.livefeather.com/pages-new/Homepage/dining.jpg?auto=compress&sat=40&q=50&sharp=20&w=500&dpr=1.2';

interface ConnectedProps {
  error: Error | null;
  isMobileBreakpoint: boolean;
  isFetching: boolean;
  packagesData: PackageForListing[];
  productEntities: ProductEntities | null;
  membershipState: MembershipState;
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
}

interface DispatchProps {
  loadPackages: LoadPackages;
}

type Props = ConnectedProps & DispatchProps;

const PackagesListing = ({
  error,
  isMobileBreakpoint,
  isFetching,
  packagesData,
  productEntities,
  loadPackages: dispatchLoadPackages,
  membershipState,
  deliveryAreaIdentifier
}: Props) => {
  React.useEffect(() => {
    dispatchLoadPackages('all');
    Analytics.trackPage(PAGES.PACKAGES);
  }, [dispatchLoadPackages]);

  return (
    <Layout>
      <Helmet title={TITLE} description={DESCRIPTION} imageUrl={IMAGE} />
      {error ? (
        <ErrorPage title={error.name} content={error.message} />
      ) : (
        <Fragment>
          <ProductHeader categories={productEntities ? productEntities.categories : null} />
          {isFetching && packagesData.length === 0 ? (
            <Loading message="Beautiful furniture is just around the corner!" />
          ) : packagesData.length === 0 ? (
            <BottomPad isMobileBreakpoint={isMobileBreakpoint}>
              <SidePad isMobileBreakpoint={isMobileBreakpoint}>
                <NoResults />
              </SidePad>
            </BottomPad>
          ) : (
            <BottomPad isMobileBreakpoint={isMobileBreakpoint}>
              <SidePad isMobileBreakpoint={isMobileBreakpoint}>
                <PackageList
                  isMobileBreakpoint={isMobileBreakpoint}
                  packagesData={packagesData}
                  membershipState={membershipState}
                  deliveryAreaIdentifier={deliveryAreaIdentifier || DeliveryAreaIdentifier.All}
                />
              </SidePad>
            </BottomPad>
          )}
        </Fragment>
      )}
    </Layout>
  );
};

const mapStateToProps = (state: GlobalState): ConnectedProps => ({
  error: state.entities.packages.error,
  isFetching: state.entities.packages.isFetching,
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  packagesData: state.entities.packages.data,
  productEntities: getProductEntities(state),
  membershipState: getMembershipState(state),
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state)
});

const mapDispatchToProps: DispatchProps = {
  loadPackages
};

export default connect(mapStateToProps, mapDispatchToProps)(PackagesListing);
