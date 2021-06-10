/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useSelector } from 'react-redux';
import ErrorPage from '../../components/ErrorPage';
import DividingHeader from '../../ui/textLockups/DividingHeader';
import * as selectors from './accountOverview/store/account.overview.selectors';
import Button, { ButtonStyle } from '../../ui/buttons/Button';
import ProductListItem from '../../ui/products/ProductListItem';
import Paragraph1 from '../../ui/paragraphs/Paragraph1';
import LazyLoading from '../../components/LazyLoading';
import { getIsMobileBreakpoint } from '../../app/store/dimensions/dimensions.selectors';
import Header1 from '../../ui/headers/Header1';
import Paragraph2 from '../../ui/paragraphs/Paragraph2';
import Analytics from '../../analytics/analytics';
import PAGES from '../../analytics/pages';
import { ACCOUNTS } from '../../analytics/accounts/events';
import useMount from '../../utils/useMount';
import { SubscriptionItemResource } from './accountOverview/store/account.overview.types';
import { BREAKPOINTS } from '../../ui/variables';
import { Fragment } from 'react';
import { getEmail } from './personalInformation/store/personal.information.selectors';
import { constructTypeformLinkData } from '../../app/navbar/components/navbar.link.data';

const handleEmailClick = () => Analytics.trackEvent(ACCOUNTS.EMAIL_AM);

const handleTelephoneClick = () => Analytics.trackEvent(ACCOUNTS.CALL_AM);

const createItem = (item: SubscriptionItemResource, index: number) => (
  <div
    css={css`
      margin-bottom: 8px;
      @media ${BREAKPOINTS.DESKTOP} {
        margin-right: 8px;
      }
      /* TODO: this is temporary while we migrate V2 products to have listing images for variants
                       in the database, for now we can avoid image clipping in the CSS */
      img {
        object-fit: contain;
        object-position: center !important;
      }
    `}
    key={`${index} ${item.productVariant.product.identifier}`}
  >
    <ProductListItem
      productImage={
        `https://img.livefeather.com/products/${item.productVariant.product.identifier}/images/` +
        item.productVariant.product.images[0].desktop
      }
      productName={item.productVariant.product.title}
      variantName={item.productVariant.optionValues.map((option) => option.name).join(', ')}
    />
  </div>
);

const CurrentFurniture = () => {
  const isFetching = useSelector(selectors.isFetching);
  const error = useSelector(selectors.getError);
  const items = useSelector(selectors.getItems);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const email = useSelector(getEmail);
  const orderNumber = useSelector(selectors.getOrderNumber);
  const contactUsTypeformData = constructTypeformLinkData({ email, orderNumber }).contactUs;

  useMount(() => {
    Analytics.trackPage(PAGES.ACCOUNT_FURNITURE);
  });

  const Paragraph = isMobileBreakpoint ? Paragraph2 : Paragraph1;

  const { currentItems, purchasedItems } = items.reduce(
    (acc, item, index) => {
      const itemEl = createItem(item, index);
      if (item.customerPurchaseDate) {
        return { ...acc, purchasedItems: [...acc.purchasedItems, itemEl] };
      }
      return { ...acc, currentItems: [...acc.currentItems, itemEl] };
    },
    { currentItems: [], purchasedItems: [] }
  );

  if (error) {
    return <ErrorPage title={`${error.status} ${error.error}`} content={error.message} />;
  }

  return isFetching ? (
    <LazyLoading />
  ) : (
    <div>
      {!isMobileBreakpoint && <Header1>My Furniture</Header1>}
      <DividingHeader>Currently Renting</DividingHeader>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-bottom: ${isMobileBreakpoint ? '24px' : '48px'};
          ${isMobileBreakpoint && 'flex-direction: column;'}
        `}
      >
        {currentItems}
      </div>
      {Boolean(purchasedItems.length) && (
        <Fragment>
          <DividingHeader dataCy="furniture-purchased">Purchased</DividingHeader>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              margin-bottom: ${isMobileBreakpoint ? '24px' : '48px'};
              ${isMobileBreakpoint && 'flex-direction: column;'}
            `}
          >
            {purchasedItems}
          </div>
        </Fragment>
      )}
      <div
        css={css`
          ${isMobileBreakpoint && 'text-align: center;'}
        `}
      >
        <div
          css={css`
            margin-bottom: 30px;
          `}
        >
          <Paragraph>
            Questions? Reach out to your account manager. They can help facilitate a furniture change
            (swap/return/addition), provide more detail about the monthly price of each item, and correct any issues
            with your cart summary.
          </Paragraph>
        </div>
        <div
          css={css`
            width: 300px;
            ${isMobileBreakpoint ? 'margin: 0 auto 20px;' : 'margin-bottom: 20px;'}
          `}
        >
          <Button style={ButtonStyle.TERTIARY} external={contactUsTypeformData.href}>
            <span role="button" tabIndex={0} onClick={handleEmailClick}>
              {contactUsTypeformData.label}
            </span>
          </Button>
        </div>
        <Paragraph1>
          <a href="tel:3473528599" onClick={handleTelephoneClick}>
            347.352.8599
          </a>
        </Paragraph1>
      </div>
    </div>
  );
};

export default CurrentFurniture;
