import { addMonths, addDays, subDays, format as formatDate } from 'date-fns';

import { State as GlobalState } from '../../../../types/ReduxState';
import { AccountOverview, PlanType } from './account.overview.types';
import { initialState } from './account.overview.reducer';
import * as selectors from './account.overview.selectors';
import { DeliveryAreaIdentifier } from '../../../../app/store/plan/plan.types';

describe('Account Overview - Selectors', () => {
  let state: AccountOverview;

  beforeEach(() => {
    state = {
      ...initialState,
      overview: {
        subscriptionId: 123456789,
        startDate: formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: formatDate(addMonths(new Date(), 6), 'yyyy-MM-dd'),
        monthlySubtotal: 20,
        requestedDeliveryDate: formatDate(new Date(), 'yyyy-MM-dd'),
        currentPlan: {
          startDate: formatDate(new Date(), 'yyyy-MM-dd'),
          membershipFee: 19,
          type: PlanType.Member
        },
        items: [
          {
            customerPurchaseDate: null,
            monthlySubtotal: 20,
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
        numberOfFreeTrips: 1,
        discounts: [],
        leases: [],
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY
      }
    };
  });

  it('should return the subscription id', () => {
    const orderNumber = selectors.getOrderNumber({ accounts: { accountOverview: state } } as GlobalState);
    expect(orderNumber).toEqual(state.overview.subscriptionId);
  });

  it('should return if we are currently fetching from the API', () => {
    const isFetching = selectors.isFetching({ accounts: { accountOverview: state } } as GlobalState);
    expect(isFetching).toEqual(false);
  });

  it('should return the current error', () => {
    const error = selectors.getError({ accounts: { accountOverview: state } } as GlobalState);
    expect(error).toBeNull();
  });

  it('should return the items', () => {
    const items = selectors.getItems({ accounts: { accountOverview: state } } as GlobalState);
    expect(items).toEqual(state.overview.items);
  });

  it('should return the tax rate', () => {
    const taxRate = selectors.getTaxRate({ accounts: { accountOverview: state } } as GlobalState);
    expect(taxRate).toEqual(8.875);
  });

  it('should return the tax amount', () => {
    const taxAmount = selectors.getTaxAmount({ accounts: { accountOverview: state } } as GlobalState);
    expect(taxAmount).toEqual('3.46');
  });

  it('should return the monthly subtotal', () => {
    const monthlySubtotal = selectors.getMonthlySubtotal({ accounts: { accountOverview: state } } as GlobalState);
    expect(monthlySubtotal).toEqual(20);
  });

  it('should return the membership fee', () => {
    const membershipFee = selectors.getMembershipFee({ accounts: { accountOverview: state } } as GlobalState);
    expect(membershipFee).toEqual(19);
  });

  it('should return the grand total', () => {
    const grandTotal = selectors.getGrandTotal({ accounts: { accountOverview: state } } as GlobalState);
    expect(grandTotal).toEqual('42.46');
  });

  it('should return end date', () => {
    const endDate = selectors.getEndDate({ accounts: { accountOverview: state } } as GlobalState);
    expect(endDate).toEqual(formatDate(addMonths(new Date(), 6), 'MMMM d, yyyy'));
  });

  it('should return `Pending` when end date is null', () => {
    state = {
      ...state,
      overview: {
        ...state.overview,
        endDate: null
      }
    };

    const endDate = selectors.getEndDate({ accounts: { accountOverview: state } } as GlobalState);
    expect(endDate).toEqual('Pending');
  });

  it('should return start date', () => {
    const startDate = selectors.getStartDate({ accounts: { accountOverview: state } } as GlobalState);
    expect(startDate).toEqual(formatDate(new Date(), 'MMMM d, yyyy'));
  });

  it('should return `Pending` when start date is null', () => {
    state = {
      ...state,
      overview: {
        ...state.overview,
        startDate: null
      }
    };

    const startDate = selectors.getStartDate({ accounts: { accountOverview: state } } as GlobalState);
    expect(startDate).toEqual('Pending');
  });

  it('should return number of free trips', () => {
    const numberOfFreeTrips = selectors.getNumberOfFreeTrips({ accounts: { accountOverview: state } } as GlobalState);
    expect(numberOfFreeTrips).toEqual(1);
  });

  it('should return the subscription plan type', () => {
    const planType = selectors.getPlanType({ accounts: { accountOverview: state } } as GlobalState);
    expect(planType).toEqual('Member');
  });

  it('should return the confirmed delivery date if it exists', () => {
    const confirmedDate = selectors.getConfirmedDeliveryDate({ accounts: { accountOverview: state } } as GlobalState);
    expect(confirmedDate).toEqual(formatDate(new Date(), 'MMMM d, yyyy'));
  });

  it('should return null for the confirmed delivery date if there is no start date yet', () => {
    state = {
      ...state,
      overview: {
        ...state.overview,
        startDate: null
      }
    };

    const confirmedDate = selectors.getConfirmedDeliveryDate({ accounts: { accountOverview: state } } as GlobalState);
    expect(confirmedDate).toEqual(null);
  });

  it('should return the requested delivery date', () => {
    const requestedDate = selectors.getRequestedDeliveryDate({ accounts: { accountOverview: state } } as GlobalState);
    expect(requestedDate).toEqual(state.overview.requestedDeliveryDate);
  });

  it('should return true if upcoming date is in future', () => {
    state = {
      ...state,
      overview: {
        ...state.overview,
        startDate: formatDate(addDays(new Date(), 1), 'yyyy-MM-dd'),
        requestedDeliveryDate: null
      }
    };
    const hasUpcomingDelivery = selectors.hasUpcomingDelivery({ accounts: { accountOverview: state } } as GlobalState);
    expect(hasUpcomingDelivery).toEqual(true);
  });

  it('should return true if upcoming date is today', () => {
    state = {
      ...state,
      overview: {
        ...state.overview,
        startDate: formatDate(new Date(), 'yyyy-MM-dd'),
        requestedDeliveryDate: null
      }
    };

    const hasUpcomingDelivery = selectors.hasUpcomingDelivery({ accounts: { accountOverview: state } } as GlobalState);
    expect(hasUpcomingDelivery).toEqual(true);
  });

  it('should return false if upcoming date is in the past', () => {
    state = {
      ...state,
      overview: {
        ...state.overview,
        startDate: formatDate(subDays(new Date(), 1), 'yyyy-MM-dd'),
        requestedDeliveryDate: null
      }
    };
    const hasUpcomingDelivery = selectors.hasUpcomingDelivery({ accounts: { accountOverview: state } } as GlobalState);
    expect(hasUpcomingDelivery).toEqual(false);
  });

  describe('Get plan name', () => {
    const MemberPlanName = 'Annual Member';
    const NonMemberPlanName = 'Short-Term Plan';
    const LegacyPlanName = 'Subscription';

    it(`should return "${MemberPlanName}" when the current plan is a member one`, () => {
      const planName = selectors.getPlanName({ accounts: { accountOverview: state } } as GlobalState);
      expect(planName).toEqual(MemberPlanName);
    });

    it(`should return "${NonMemberPlanName}" when the current plan is a non-member one`, () => {
      state = {
        ...state,
        overview: {
          ...state.overview,
          currentPlan: {
            ...state.overview.currentPlan,
            type: PlanType.NonMember
          }
        }
      };

      const planName = selectors.getPlanName({ accounts: { accountOverview: state } } as GlobalState);
      expect(planName).toEqual(NonMemberPlanName);
    });

    it(`should return "${LegacyPlanName}" when the current plan is a legacy one`, () => {
      state = {
        ...state,
        overview: {
          ...state.overview,
          currentPlan: {
            ...state.overview.currentPlan,
            type: PlanType.Legacy
          }
        }
      };

      const planName = selectors.getPlanName({ accounts: { accountOverview: state } } as GlobalState);
      expect(planName).toEqual(LegacyPlanName);
    });
  });

  it('should return descounts (if any)', () => {
    state = {
      ...state,
      overview: {
        ...state.overview,
        discounts: [{ description: '10% off monthly payment' }]
      }
    };

    const discounts = selectors.getDiscounts({ accounts: { accountOverview: state } } as GlobalState);

    expect(discounts.length).toEqual(1);
    expect(discounts[0].description).toEqual('10% off monthly payment');
  });
});
