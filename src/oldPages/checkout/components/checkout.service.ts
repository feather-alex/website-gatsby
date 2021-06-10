import { MembershipState } from '../../../app/store/plan/plan.types';

export const getPersona = (intendedUse: string | null, membershipState: MembershipState) => {
  switch (intendedUse) {
    case 'residential':
      return membershipState === MembershipState.MEMBER ? 'Renter' : 'Short Term Rental';
    case 'staging':
      return 'Stager';
    case 'office':
      return 'Office';
    case 'other':
      return 'Other';
    default:
      return null;
  }
};
