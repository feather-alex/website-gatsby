import { State as GlobalState } from '../../../types/ReduxState';
import * as selectors from './plan.selectors';
import { Plan, MembershipState, DeliveryAreaIdentifier } from './plan.types';
import { initialState } from './plan.reducer';

describe('Plan - selectors', () => {
  const mockMemberState: Plan = {
    membershipState: MembershipState.MEMBER,
    rentalLength: 12,
    cartMinimum: 29,
    deliveryFee: 0,
    monthlyMembershipFee: 19,
    deliveryZipcode: '10023',
    deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
    isInDeliveryZone: true,
    isEmailSubmitted: true,
    isFetching: false,
    error: null
  };

  const mockNonMemberState: Plan = {
    membershipState: MembershipState.NON_MEMBER,
    rentalLength: 3,
    cartMinimum: 99,
    deliveryFee: 99,
    monthlyMembershipFee: 0,
    deliveryZipcode: '10023',
    deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
    isInDeliveryZone: true,
    isEmailSubmitted: true,
    isFetching: false,
    error: null
  };

  it('should return whether we are currently fetching from the API', () => {
    const isFetching = selectors.getIsFetching({ plan: mockMemberState } as GlobalState);
    expect(isFetching).toEqual(false);
  });

  it('should return the current error', () => {
    const error = selectors.getError({ plan: mockMemberState } as GlobalState);
    expect(error).toEqual(null);
  });

  it('should return the delivery zip code', () => {
    const deliveryZipcode = selectors.getDeliveryZipCode({ plan: mockMemberState } as GlobalState);
    expect(deliveryZipcode).toEqual('10023');
  });

  it('should return the delivery area indentifier', () => {
    const deliveryAreaIdentifier = selectors.getDeliveryAreaIdentifier({ plan: mockMemberState } as GlobalState);
    expect(deliveryAreaIdentifier).toEqual('new-york');
  });

  it('should return if the delivery zip code is in our delivery zone', () => {
    const isInDeliveryZone = selectors.getIsInDeliveryZone({ plan: mockMemberState } as GlobalState);
    expect(isInDeliveryZone).toEqual(true);
  });

  it('should return if the plan is set', () => {
    const isPlanSet = selectors.getIsPlanSet({ plan: mockMemberState } as GlobalState);
    expect(isPlanSet).toEqual(true);
  });

  it('should return if email is submitted', () => {
    const isEmailSubmitted = selectors.getIsEmailSubmitted({ plan: mockMemberState } as GlobalState);
    expect(isEmailSubmitted).toEqual(true);
  });

  describe('Get membership state', () => {
    it('should return NONE if membership is not set', () => {
      const membershipState = selectors.getMembershipState({ plan: initialState } as GlobalState);
      expect(membershipState).toEqual(MembershipState.NONE);
    });

    it('should return MEMBER if membership is selected', () => {
      const membershipState = selectors.getMembershipState({ plan: mockMemberState } as GlobalState);
      expect(membershipState).toEqual(MembershipState.MEMBER);
    });

    it('should return NON_MEMBER if membership is not selected', () => {
      const membershipState = selectors.getMembershipState({ plan: mockNonMemberState } as GlobalState);
      expect(membershipState).toEqual(MembershipState.NON_MEMBER);
    });
  });

  describe('Get monthly membership fee', () => {
    it('should return 19 if membership is selected', () => {
      const monthlyMembershipFee = selectors.getMonthlyMembershipFee({ plan: mockMemberState } as GlobalState);
      expect(monthlyMembershipFee).toEqual(19);
    });

    it('should return 0 if membership is not selected', () => {
      const monthlyMembershipFee = selectors.getMonthlyMembershipFee({ plan: mockNonMemberState } as GlobalState);
      expect(monthlyMembershipFee).toEqual(0);
    });
  });

  describe('Get cart minimum', () => {
    it('should return 29 if membership is selected', () => {
      const cartMinimum = selectors.getCartMinimum({ plan: mockMemberState } as GlobalState);
      expect(cartMinimum).toEqual(29);
    });

    it('should return 99 if membership is not selected', () => {
      const cartMinimum = selectors.getCartMinimum({ plan: mockNonMemberState } as GlobalState);
      expect(cartMinimum).toEqual(99);
    });
  });

  describe('Get delivery fee', () => {
    it('should return 0 if membership is selected', () => {
      const deliveryFee = selectors.getDeliveryFee({ plan: mockMemberState } as GlobalState);
      expect(deliveryFee).toEqual(0);
    });

    it('should return 99 if membership is not selected', () => {
      const deliveryFee = selectors.getDeliveryFee({ plan: mockNonMemberState } as GlobalState);
      expect(deliveryFee).toEqual(99);
    });
  });

  describe('Get rental length', () => {
    it('should return 12 if membership is selected', () => {
      const rentalLength = selectors.getRentalLength({ plan: mockMemberState } as GlobalState);
      expect(rentalLength).toEqual(12);
    });

    it('should return 3 if membership is not selected', () => {
      const rentalLength = selectors.getRentalLength({ plan: mockNonMemberState } as GlobalState);
      expect(rentalLength).toEqual(3);
    });
  });

  describe('Get select plan button text', () => {
    it(`should return the correct text in the initial state`, () => {
      const buttonText = selectors.getSelectPlanButtonText({ plan: initialState } as GlobalState);
      expect(buttonText).toEqual('Choose Plan');
    });

    it('should return the correct text when membership is selected, but no zip provided', () => {
      const planState: Plan = {
        ...initialState,
        isInDeliveryZone: null,
        deliveryZipcode: null,
        membershipState: MembershipState.MEMBER
      };

      const buttonText = selectors.getSelectPlanButtonText({ plan: planState } as GlobalState);
      expect(buttonText).toEqual('Annual Member : enter zip');
    });

    it('should return the correct text when non-membership is selected, but no zip provided', () => {
      const planState: Plan = {
        ...initialState,
        isInDeliveryZone: null,
        deliveryZipcode: null,
        membershipState: MembershipState.NON_MEMBER
      };

      const buttonText = selectors.getSelectPlanButtonText({ plan: planState } as GlobalState);
      expect(buttonText).toEqual('Short-Term Plan : enter zip');
    });

    it('should return the correct text when no plan is selected, but a deliverable zip is provided', () => {
      const planState: Plan = {
        ...initialState,
        isInDeliveryZone: true,
        deliveryZipcode: '99999',
        membershipState: MembershipState.NONE
      };

      const buttonText = selectors.getSelectPlanButtonText({ plan: planState } as GlobalState);
      expect(buttonText).toEqual('Choose Plan');
    });

    it('should return the correct text when membership is selected and a deliverable zip is provided', () => {
      const planState: Plan = {
        ...initialState,
        isInDeliveryZone: true,
        deliveryZipcode: '11222',
        membershipState: MembershipState.MEMBER
      };

      const buttonText = selectors.getSelectPlanButtonText({ plan: planState } as GlobalState);
      expect(buttonText).toEqual('Annual Member : 11222');
    });

    it('should return the correct text when non-membership is selected and a deliverable zip is provided', () => {
      const planState: Plan = {
        ...initialState,
        isInDeliveryZone: true,
        deliveryZipcode: '11222',
        membershipState: MembershipState.NON_MEMBER
      };

      const buttonText = selectors.getSelectPlanButtonText({ plan: planState } as GlobalState);
      expect(buttonText).toEqual('Short-Term Plan : 11222');
    });

    it('should return the correct text when a non-deliverable zip code is provided', () => {
      const planState: Plan = {
        ...initialState,
        isInDeliveryZone: false,
        deliveryZipcode: '99999',
        membershipState: MembershipState.MEMBER
      };

      const buttonText = selectors.getSelectPlanButtonText({ plan: planState } as GlobalState);
      expect(buttonText).toEqual('Outside delivery zone');
    });
  });

  describe('Get delivery timeline text', () => {
    it('should return the correct timeline when membership is selected in DC', () => {
      const planState: Plan = {
        ...initialState,
        membershipState: MembershipState.MEMBER,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.DC
      };

      const deliveryTimelineText = selectors.getDeliveryTimelineText({ plan: planState } as GlobalState);
      expect(deliveryTimelineText).toEqual('Free delivery & assembly - typically in 9-12 days');
    });

    it('should return the correct timeline when non-membership is selected in DC', () => {
      const planState: Plan = {
        ...initialState,
        membershipState: MembershipState.NON_MEMBER,
        deliveryAreaIdentifier: DeliveryAreaIdentifier.DC
      };

      const deliveryTimelineText = selectors.getDeliveryTimelineText({ plan: planState } as GlobalState);
      expect(deliveryTimelineText).toEqual('Delivery & assembly in your area takes 9-12 days');
    });

    it.each([
      DeliveryAreaIdentifier.All,
      DeliveryAreaIdentifier.LA,
      DeliveryAreaIdentifier.NY,
      DeliveryAreaIdentifier.SF
    ])('should return the correct timeline when membership is selected in %s', (deliveryAreaIdentifier) => {
      const planState: Plan = {
        ...initialState,
        membershipState: MembershipState.MEMBER,
        deliveryAreaIdentifier
      };

      const deliveryTimelineText = selectors.getDeliveryTimelineText({ plan: planState } as GlobalState);
      expect(deliveryTimelineText).toEqual('Free delivery & assembly in as little as 7 days');
    });

    it.each([
      DeliveryAreaIdentifier.All,
      DeliveryAreaIdentifier.LA,
      DeliveryAreaIdentifier.NY,
      DeliveryAreaIdentifier.SF
    ])(
      'should return the correct timeline when non-membership is selected in any market other than DC',
      (deliveryAreaIdentifier) => {
        const planState: Plan = {
          ...initialState,
          membershipState: MembershipState.NON_MEMBER,
          deliveryAreaIdentifier
        };

        const deliveryTimelineText = selectors.getDeliveryTimelineText({ plan: planState } as GlobalState);
        expect(deliveryTimelineText).toEqual('Delivery & assembly in as little as 7 days');
      }
    );
  });
});
