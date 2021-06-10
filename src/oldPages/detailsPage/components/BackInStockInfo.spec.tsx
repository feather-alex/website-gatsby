/** @jsx jsx */
import { jsx } from '@emotion/core';
import { render } from '@testing-library/react';
import { DeliveryAreaIdentifier } from '../../../app/store/plan/plan.types';
import BackInStockInfo from './BackInStockInfo';

describe('<BackInStockInfo />', () => {
  const availability = [
    {
      deliveryArea: DeliveryAreaIdentifier.NY,
      isEnabled: true,
      isInStock: false,
      stockExpectedDate: '2020-09-30'
    },
    {
      deliveryArea: DeliveryAreaIdentifier.SF,
      isEnabled: true,
      isInStock: false,
      stockExpectedDate: null
    },
    {
      deliveryArea: DeliveryAreaIdentifier.LA,
      isEnabled: true,
      isInStock: true,
      stockExpectedDate: null
    }
  ];
  it(`shows the expected back in stock date when it is specified`, () => {
    const { getByText } = render(
      <BackInStockInfo deliveryAreaIdentifier={DeliveryAreaIdentifier.NY} availability={availability} />
    );

    expect(getByText('Expected back in stock on 09/30/2020')).toBeTruthy;
  });

  it(`doesn't render anything if the item is out of stock but doesn't have a stockExpectedDate`, () => {
    const { container } = render(
      <BackInStockInfo deliveryAreaIdentifier={DeliveryAreaIdentifier.SF} availability={availability} />
    );

    expect(container.firstChild).toBeNull;
  });

  it(`doesn't render anything if the item is in stock`, () => {
    const { container } = render(
      <BackInStockInfo deliveryAreaIdentifier={DeliveryAreaIdentifier.LA} availability={availability} />
    );

    expect(container.firstChild).toBeNull;
  });
});
