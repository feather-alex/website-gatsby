/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useState, ChangeEvent, Fragment } from 'react';
import {
  getPromo,
  getPromoError,
  getPromoState,
  getCartTotals,
  getPromoDescription
} from '../../cart/store/cart.selectors';

import { reduxForm } from 'redux-form';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import { PromoState } from '../../cart/store/cart.types';
import PlusSignIcon from '../../../ui/icons/PlusSignIcon';
import { getPromoRequest, resetPromo } from '../../cart/store/cart.actions';
import { getDeliveryAreaIdentifier, getMembershipState } from '../../../app/store/plan/plan.selectors';
import { BRAND, SHADES } from '../../../ui/variables';
import Title2 from '../../../ui/titles/Title2';
import { ChangePlanLink as CancelEntryLink, Line } from '../../cart/components/MiniCartFooter';
import { APIError } from '../../../types/ReduxState';
import Analytics from '../../../analytics/analytics';
import { CHECKOUT } from '../../../analytics/checkout/events';
import {
  enterPromoCodePayloadMapping,
  checkoutActionsCartUuidPayloadMapping
} from '../../../analytics/checkout/payload-mappings';
import { MembershipState, MembershipStateDisplayName } from '../../../app/store/plan/plan.types';

const PromoButton = styled(Button)`
  color: ${BRAND.PRIMARY};
  &:after {
    display: none;
  }
`;

const getErrorMessageFromError = (error: APIError | null): string => {
  if (error && error.body && error.body.error) {
    return error.body.error.includes('Expired')
      ? 'Uh oh! Sorry, but it looks like that promotion’s no longer available.'
      : 'Uh oh! It looks like we don’t offer that promotion. Please enter a valid promo code.';
  }

  return 'Please enter a valid promo code';
};

interface Props {
  isAlwaysOpen?: boolean;
  cartUuid: string;
}

const PromoEntry = ({ cartUuid, isAlwaysOpen = false }: Props) => {
  const membershipState = useSelector(getMembershipState);
  const isPromosAvailable = membershipState !== MembershipState.NON_MEMBER;
  const [isPromoOpen, setIsPromoOpen] = useState(isAlwaysOpen);
  const [inputValue, setInputValue] = useState('');

  const promo = useSelector(getPromo);
  const promoState = useSelector(getPromoState);
  const promoError = useSelector(getPromoError);
  const promoDescription = useSelector(getPromoDescription);
  const { subtotal: subTotal } = useSelector(getCartTotals);
  const deliveryAreaIdentifier = useSelector(getDeliveryAreaIdentifier);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (deliveryAreaIdentifier) {
      Analytics.trackEvent(CHECKOUT.PROMO_CODE, enterPromoCodePayloadMapping({ promoCode: inputValue, cartUuid }));
      dispatch(
        getPromoRequest({
          promo: inputValue,
          rentalLength: 12,
          subTotal,
          deliveryAreaIdentifier
        })
      );
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && promoState !== PromoState.FETCHING) {
      handleSubmit();
    }
  };

  const handleResetPromo = () => {
    if (!isAlwaysOpen) {
      setIsPromoOpen(false);
    }
    setInputValue('');
    dispatch(resetPromo());
  };

  if (promoState === PromoState.VALID && promo) {
    return (
      <Fragment>
        <div>
          <Title2 isBold={true}>Promo code: {promo.code}</Title2>
          <Title2>{promoDescription}</Title2>
        </div>
        <Line />
        <CancelEntryLink onClick={handleResetPromo}>Remove</CancelEntryLink>
      </Fragment>
    );
  }

  if (!isPromoOpen) {
    return (
      <div
        css={css`
          display: flex;
        `}
      >
        <PlusSignIcon
          color={isPromosAvailable ? BRAND.PRIMARY : SHADES.SHADE_LIGHTER}
          css={css`
            ${isPromosAvailable ? '' : 'transform: rotate(45deg);'}
          `}
        />
        <PromoButton
          dataCy="promo-button"
          style={ButtonStyle.COMPACT_TEXT}
          isDisabled={!isPromosAvailable}
          onClick={() => {
            Analytics.trackEvent(CHECKOUT.PROMO_CLICK, checkoutActionsCartUuidPayloadMapping({ cartUuid }));
            setIsPromoOpen(true);
          }}
        >
          {isPromosAvailable ? 'Add Promo Code' : `Promos unavailable for ${MembershipStateDisplayName.NON_MEMBER}`}
        </PromoButton>
      </div>
    );
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: baseline;
          justify-content: left;
        `}
      >
        <input
          data-cy="input-promo-code"
          name="promo-code"
          placeholder="Enter promo code"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={!isPromosAvailable}
          css={css`
            width: 100%;
            max-width: 272px;
            height: 46px;
            margin: 0 8px 0 0;
            padding-left: 20px;
            border-radius: 3px;
            color: ${SHADES.SHADE_DARKER};
            background-color: transparent;
            border: 1px solid ${promoState === PromoState.INVALID ? BRAND.ERROR : SHADES.SHADE_LIGHT};
            ::placeholder {
              color: ${SHADES.SHADE_LIGHT};
            }
          `}
        />
        <Button
          dataCy="promo-apply-button"
          type="submit"
          style={ButtonStyle.COMPACT}
          onClick={handleSubmit}
          isDisabled={promoState === PromoState.FETCHING || !isPromosAvailable}
        >
          Apply
        </Button>
      </div>
      {((promoState === PromoState.INVALID && promoError) || !isPromosAvailable) && (
        <Fragment>
          <span
            css={css`
              color: ${!isPromosAvailable ? SHADES.SHADE_LIGHT : BRAND.ERROR};
              text-align: left;
              margin-top: 8px;
              max-width: 320px;
            `}
          >
            {!isPromosAvailable
              ? `Promos not available on ${MembershipStateDisplayName.NON_MEMBER}`
              : getErrorMessageFromError(promoError)}
          </span>
          <CancelEntryLink
            css={css`
              font-size: inherit;
              color: ${BRAND.ERROR};
              text-align: left;
              margin-left: 0;
              ${!isPromosAvailable ? 'display: none;' : ''}
            `}
            onClick={handleResetPromo}
          >
            Or cancel entry
          </CancelEntryLink>
        </Fragment>
      )}
    </div>
  );
};

export default compose(
  reduxForm<{ promoCode: string }, Props>({ form: 'promoForm' })
)(PromoEntry);
