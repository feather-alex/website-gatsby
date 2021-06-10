/** @jsx jsx */

import { useSelector } from 'react-redux';
import { css, jsx } from '@emotion/core';
import { PkgItem } from '../../../../types/Package';
import { SHADES, BRAND } from '../../../../ui/variables';
import Paragraph2 from '../../../../ui/paragraphs/Paragraph2';
import Paragraph1 from '../../../../ui/paragraphs/Paragraph1';
import { getIsMobileBreakpoint } from '../../../../app/store/dimensions/dimensions.selectors';
import { MembershipState } from '../../../../app/store/plan/plan.types';
import { isInStockAndEnabled } from '../../../../utils';
import { getDeliveryAreaIdentifier } from '../../../../app/store/plan/plan.selectors';
import QuantitySelect from '../../../../ui/formElements/quantitySelect/QuantitySelect';

interface Props {
  items: PkgItem[];
  membershipState: MembershipState;
  isQuizResults?: boolean;
  selectedItemsQuantity: { [id: string]: number };
  handleSelectedItemsQuantity: (identifier: string) => (itemsQuantity: number) => void;
}

const PackageItemsList = ({
  items,
  membershipState,
  isQuizResults = false,
  selectedItemsQuantity,
  handleSelectedItemsQuantity
}: Props) => {
  const Paragraph = useSelector(getIsMobileBreakpoint) ? Paragraph2 : Paragraph1;
  const planMonths = membershipState === MembershipState.MEMBER ? 12 : 3;

  const deliveryAreaIdentifier = useSelector(getDeliveryAreaIdentifier);

  return (
    <ul>
      {items.map((item, index) => {
        const quantity = selectedItemsQuantity[item.identifier];
        const isItemInStock = isQuizResults || isInStockAndEnabled(deliveryAreaIdentifier, item.availability);

        return (
          <li
            key={`${item.title} ${index}`}
            css={css`
              display: flex;
              justify-content: space-between;
              padding-top: 16px;
            `}
          >
            <Paragraph>
              {item.title}
              <span
                css={css`
                  color: ${SHADES.SHADE_LIGHT};
                `}
              >
                {item.options.length > 0 && ` (${item.options.map((option) => option.valueName).join(', ')})`}
              </span>
            </Paragraph>
            {isItemInStock ? (
              <div
                data-cy="package-item-price-quantity"
                css={css`
                  display: flex;
                  justify-content: space-between;
                `}
              >
                {quantity > 0 ? (
                  <Paragraph>{`$${item.rentalPrices[planMonths] * quantity}/mo`}</Paragraph>
                ) : (
                  <Paragraph color={SHADES.SHADE_LIGHT}>Removed</Paragraph>
                )}
                <div
                  css={css`
                    margin-left: 16px;
                    height: 25px;
                    width: 1px;
                    background-color: ${BRAND.ACCENT};
                  `}
                />
                <QuantitySelect
                  handleChange={handleSelectedItemsQuantity(item.identifier)}
                  initialQuantity={quantity}
                ></QuantitySelect>
              </div>
            ) : (
              <Paragraph color={BRAND.ERROR}>Out of stock</Paragraph>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PackageItemsList;
