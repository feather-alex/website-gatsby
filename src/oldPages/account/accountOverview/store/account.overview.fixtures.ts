import { addMonths, format as formatDate } from 'date-fns';

import { Subscription, Overview, PlanType } from './account.overview.types';
import { DeliveryAreaIdentifier } from '../../../../app/store/plan/plan.types';
import { APIError } from '../../../../types/ReduxState';

export const mockAccountResource: Subscription = {
  id: 123456789,
  numberOfFreeTrips: 0,
  startDate: formatDate(new Date(), 'yyyy-MM-dd'),
  endDate: formatDate(addMonths(new Date(), 6), 'yyyy-MM-dd'),
  monthlySubtotal: 80,
  subscriptionPlans: [
    {
      membershipFee: 19,
      startDate: formatDate(new Date(), 'yyyy-MM-dd'),
      type: PlanType.Member
    }
  ],
  requestedDeliveryDate: formatDate(new Date(), 'yyyy-MM-dd'),
  items: [
    {
      monthlySubtotal: 19,
      customerPurchaseDate: null,
      productVariant: {
        identifier: 'default',
        product: {
          title: 'Willow lounge chair',
          identifier: 'willow-lounge-chair',
          images: [
            {
              mobile: 'x5000-main-desktop.jpg',
              desktop: 'x5000-main-desktop.jpg'
            }
          ]
        },
        optionValues: []
      }
    }
  ],
  taxRate: 8.875,
  discounts: [],
  leases: [],
  postalArea: {
    deliveryAreaId: 1,
    deliveryArea: {
      identifier: DeliveryAreaIdentifier.NY
    }
  },
  isActive: true
};

export const mockAccountOverview: Overview = {
  subscriptionId: 123456789,
  numberOfFreeTrips: 0,
  startDate: formatDate(new Date(), 'yyyy-MM-dd'),
  endDate: formatDate(addMonths(new Date(), 6), 'yyyy-MM-dd'),
  monthlySubtotal: 80,
  currentPlan: {
    membershipFee: 19,
    startDate: formatDate(new Date(), 'yyyy-MM-dd'),
    type: PlanType.Member
  },
  requestedDeliveryDate: formatDate(new Date(), 'yyyy-MM-dd'),
  items: [
    {
      monthlySubtotal: 19,
      customerPurchaseDate: null,
      productVariant: {
        identifier: 'default',
        product: {
          title: 'Willow lounge chair',
          identifier: 'willow-lounge-chair',
          images: [
            {
              mobile: 'x5000-main-desktop.jpg',
              desktop: 'x5000-main-desktop.jpg'
            }
          ]
        },
        optionValues: []
      }
    }
  ],
  taxRate: 8.875,
  discounts: [],
  leases: [],
  deliveryAreaIdentifier: DeliveryAreaIdentifier.NY
};

export const mockError: APIError = {
  error: 'Here is another',
  message: 'Some error about failure',
  status: 400
};

export const mockUnauthenticatedError: APIError = {
  error: 'Unauthenticated',
  message: 'who you?',
  status: 401
};
