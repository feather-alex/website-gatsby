export enum MembershipState {
  NONE = "NONE",
  MEMBER = "MEMBER",
  NON_MEMBER = "NON_MEMBER",
}

export enum DeliveryAreaIdentifier {
  All = "all",
  NY = "new-york",
  SF = "san-francisco",
  LA = "los-angeles",
  DC = "washington",
}

export const MembershipStateDisplayName: { [key in MembershipState]: string } =
  {
    [MembershipState.MEMBER]: "Annual Member",
    [MembershipState.NON_MEMBER]: "Short-Term Plan",
    [MembershipState.NONE]: "None",
  };

export interface Plan {
  membershipState: MembershipState;
  rentalLength: null | 3 | 12;
  cartMinimum: null | 29 | 99;
  deliveryFee: null | 0 | 99;
  monthlyMembershipFee: null | 0 | 19;
  deliveryZipcode: string | null;
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  isInDeliveryZone: null | boolean;
  isEmailSubmitted: boolean;
  isFetching: boolean;
  error: null | string;
}

export interface ZipcodeRequestResource {
  zipcode: string;
  navigateToListing?: boolean;
  shouldShowError?: boolean;
  isInBanner?: boolean;
  shouldSelectPlan?: MembershipState;
}

export interface ZipcodeResponseResource {
  postal: string | null;
  identifier: string | null;
}
