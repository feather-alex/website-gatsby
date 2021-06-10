/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import { State as GlobalState, APIError } from '../../../types/ReduxState';
import * as selectors from '../accountOverview/store/account.overview.selectors';
import { getEmail } from '../personalInformation/store/personal.information.selectors';
import ErrorPage from '../../../components/ErrorPage';
import Header1 from '../../../ui/headers/Header1';
import TruckIcon from '../../../ui/icons/TruckIcon';
import SofaLampIcon from '../../../ui/icons/SofaLampIcon';
import DecorativeArrowIcon, { Direction } from '../../../ui/icons/DecorativeArrowIcon';
import Title2 from '../../../ui/titles/Title2';
import Title3 from '../../../ui/titles/Title3';

import FeeBreakdown from './FeeBreakdown';
import LazyLoading from '../../../components/LazyLoading';
import { SHADES, BRAND, BREAKPOINTS, COLORS } from '../../../ui/variables';
import { getIsMobileBreakpoint } from '../../../app/store/dimensions/dimensions.selectors';
import Analytics from '../../../analytics/analytics';
import PAGES from '../../../analytics/pages';
import { ACCOUNTS } from '../../../analytics/accounts/events';
import Header4 from '../../../ui/headers/Header4';
import Subheader2 from '../../../ui/subheaders/Subheader2';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import { constructTypeformLinkData } from '../../../app/navbar/components/navbar.link.data';
import { DeliveryAreaIdentifier } from '../../../app/store/plan/plan.types';
import SelectDeliveryDateModal from './SelectDeliveryDateModal';
import { getDisabledDeliveryDates } from '../accountOverview/store/account.overview.service';
import { getProductEntities } from '../../../app/store/entities/entities.selectors';
import { ProductEntities } from '../../../app/store/entities/entities.types';
import ThirdPartyDeliveryChecklist from './ThirdPartyDeliveryChecklist';
import FeatherDeliveryChecklist, { CompleteNote } from './FeatherDeliveryChecklist';
import LegacyChecklist from './LegacyChecklist';

const IconLabel = styled.div`
  display: flex;
  align-items: baseline;
  > div {
    margin-left: 10px;
  }
`;

const GetReady = styled.div`
  background-color: ${SHADES.WHITE};
  padding: 40px 48px;
  max-width: 717px;
  width: 100%;
  margin-bottom: 32px;

  @media ${BREAKPOINTS.MOBILE} {
    padding: 56px 24px;
  }
`;

const AccountInfo = styled.div`
  padding-bottom: 40px;
  border-bottom: 1px solid ${BRAND.ACCENT};
  display: flex;

  @media ${BREAKPOINTS.MOBILE} {
    flex-direction: column;
    align-items: center;
  }
`;

const OrderNumber = styled.div`
  padding-right: 48px;
  margin-right: 48px;
  border-right: 1px solid ${BRAND.ACCENT};

  @media ${BREAKPOINTS.MOBILE} {
    border: none;
    text-align: center;
    padding: 0;
    margin: 0 0 32px 0;
  }
`;

const DeliveryGuide = styled.div`
  display: flex;
  align-items: center;
  margin-right: 32px;

  @media ${BREAKPOINTS.MOBILE} {
    margin-bottom: 32px;
    margin-right: 0;
  }
`;

const YourFurniture = styled.div`
  display: flex;
  align-items: center;
`;

const DeliverySchedule = styled.div`
  max-width: 376px;
  width: 100%;
  border: 4px solid ${COLORS.MINT};
  background-color: ${COLORS.MINT}1A;
  margin-bottom: 40px;
`;

const ScheduleHeader = styled.div`
  background-color: ${COLORS.MINT};
  text-align: center;
  padding: 16px;
  font-weight: 500;
`;

const ScheduleContent = styled.div`
  padding: 24px;
  text-align: center;
`;

export interface StateProps {
  requestedDeliveryDate: string | null;
  isFetching: boolean;
  orderNumber: number;
  error: APIError | null;
  startDate: string | null;
  deliveryArea: DeliveryAreaIdentifier | null;
  isMobileBreakpoint: boolean;
  hasSignedLease: boolean;
  email: string;
  productEntities: ProductEntities | null;
}

interface State {
  isDeliveryDateModalOpen: boolean;
}

class UpcomingDelivery extends React.Component<StateProps, State> {
  constructor(props: StateProps) {
    super(props);

    this.state = {
      isDeliveryDateModalOpen: false
    };

    this.closeDeliveryDateModal = this.closeDeliveryDateModal.bind(this);
    this.openDeliveryDateModal = this.openDeliveryDateModal.bind(this);
  }

  componentDidMount() {
    Analytics.trackPage(PAGES.ACCOUNT_DELIVERY);
  }

  handleDeliveryGuideClick() {
    Analytics.trackEvent(ACCOUNTS.DOWNLOAD_DELIVERY_GUIDE);
  }

  closeDeliveryDateModal() {
    this.setState({
      isDeliveryDateModalOpen: false
    });
  }

  openDeliveryDateModal() {
    this.setState({
      isDeliveryDateModalOpen: true
    });
  }

  render() {
    const {
      error,
      requestedDeliveryDate,
      startDate,
      isFetching,
      orderNumber,
      deliveryArea,
      email,
      hasSignedLease,
      productEntities
    } = this.props;
    const buildingQuestionnaireTypeformData = constructTypeformLinkData({ email, orderNumber }).buildingQuestionnaire;

    if (error) {
      return <ErrorPage title={`${error.status} ${error.error}`} content={error.message} />;
    }

    if (isFetching || !productEntities) {
      return <LazyLoading />;
    }

    const isLegacyCheckoutRequestDateSub = !!requestedDeliveryDate;
    let isFeatherDeliveryArea = false;
    if (deliveryArea) {
      isFeatherDeliveryArea = [
        DeliveryAreaIdentifier.NY,
        DeliveryAreaIdentifier.SF,
        DeliveryAreaIdentifier.LA
      ].includes(deliveryArea);
    }

    const disabledDeliveryDates = getDisabledDeliveryDates(productEntities.deliveryAreas, deliveryArea);

    return (
      <div>
        {isLegacyCheckoutRequestDateSub && (
          <LegacyChecklist buildingQuestionnaire={buildingQuestionnaireTypeformData} />
        )}

        {!isLegacyCheckoutRequestDateSub && (
          <GetReady>
            <Header1
              css={css`
                margin-bottom: 38px;
                @media ${BREAKPOINTS.MOBILE} {
                  text-align: center;
                }
              `}
            >
              Get Ready For
              <br /> Your Delivery
            </Header1>

            {startDate && (
              <React.Fragment>
                <CompleteNote>Sit back &amp; relax! We're preparing your items for the trip.</CompleteNote>

                <DeliverySchedule>
                  <ScheduleHeader>Delivery scheduled for:</ScheduleHeader>
                  <ScheduleContent>{startDate}</ScheduleContent>
                </DeliverySchedule>

                <div>
                  Need to reschedule your delivery?{' '}
                  <Button style={ButtonStyle.COMPACT_TEXT}>Contact Us To Reschedule</Button>
                </div>
              </React.Fragment>
            )}

            {!startDate && isFeatherDeliveryArea && (
              <FeatherDeliveryChecklist
                buildingQuestionsLink={buildingQuestionnaireTypeformData.href}
                hasSignedLease={hasSignedLease}
                handleDisplaySelectDeliveryDate={this.openDeliveryDateModal}
              />
            )}
            {!startDate && !isFeatherDeliveryArea && <ThirdPartyDeliveryChecklist />}
          </GetReady>
        )}

        <SelectDeliveryDateModal
          disabledDeliveryDates={disabledDeliveryDates}
          subscriptionId={orderNumber}
          onClose={this.closeDeliveryDateModal}
          isOpen={this.state.isDeliveryDateModalOpen}
        />

        <AccountInfo>
          <OrderNumber data-cy="order-number">
            <Header4
              css={css`
                margin-bottom: 8px;
              `}
            >
              Account number
            </Header4>
            <Subheader2>{orderNumber}</Subheader2>
          </OrderNumber>

          <DeliveryGuide>
            <TruckIcon height="20" width="44" />
            <a
              href="https://cdn.livefeather.com/docs/delivery/feather-delivery-guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={this.handleDeliveryGuideClick}
            >
              <IconLabel>
                <Title2>Delivery Guide</Title2>
                <DecorativeArrowIcon color={BRAND.PRIMARY_TEXT} direction={Direction.Right} />
              </IconLabel>
            </a>
          </DeliveryGuide>

          <YourFurniture>
            <SofaLampIcon width="44" />
            <Link to="/account/furniture">
              <IconLabel>
                <Title2>Your Furniture</Title2>
                <DecorativeArrowIcon color={BRAND.PRIMARY_TEXT} direction={Direction.Right} />
              </IconLabel>
            </Link>
          </YourFurniture>
        </AccountInfo>

        <FeeBreakdown />
        <Title3>*Our delivery team will always wait 20 minutes to attempt your delivery</Title3>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  error: selectors.getError(state),
  isFetching: selectors.isFetching(state),
  orderNumber: selectors.getOrderNumber(state),
  startDate: selectors.getConfirmedDeliveryDate(state),
  requestedDeliveryDate: selectors.getRequestedDeliveryDate(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  deliveryArea: selectors.getDeliveryArea(state),
  hasSignedLease: selectors.hasSignedLease(state),
  productEntities: getProductEntities(state),
  email: getEmail(state)
});

export default connect(mapStateToProps)(UpcomingDelivery);
