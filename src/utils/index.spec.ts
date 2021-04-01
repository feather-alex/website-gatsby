import { DeliveryAreaIdentifier } from '../app/store/plan/plan.types';
import { backInStockDate } from './index';

describe('backInStockDate', () => {
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

  it('Should return the backInStock date if there is one coming from the API', () => {
    const location = 'new-york';

    const date = backInStockDate(location, availability);

    expect(date).toBe('2020-09-30');
  });

  it('Should return null if there is no stockExpectedDate coming from the API', () => {
    const location = 'san-francisco';

    const date = backInStockDate(location, availability);

    expect(date).toBeNull;
  });

  it('Should return null if the item is in stock', () => {
    const location = 'los-angeles';

    const date = backInStockDate(location, availability);

    expect(date).toBeNull;
  });
});
