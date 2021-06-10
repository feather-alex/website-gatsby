import { APIError } from '../../../../types/ReduxState';
import { DeliveryAreaIdentifier } from '../../../../app/store/plan/plan.types';

export enum PlanType {
  Legacy = 'Legacy',
  Member = 'Member',
  NonMember = 'Non-Member'
}

export interface SubscriptionPlan {
  membershipFee: number;
  startDate: string;
  type: PlanType;
}

export interface OptionValue {
  identifier: string;
  name: string;
}

export interface Discount {
  description: string;
}

export interface Lease {
  status: string;
  signedAt?: string;
  createdAt: string;
  leaseDocumentType: string;
}

export interface Overview {
  subscriptionId: number;
  startDate: string | null;
  endDate: string | null;
  monthlySubtotal: number;
  items: SubscriptionItemResource[];
  currentPlan: SubscriptionPlan;
  taxRate: number;
  requestedDeliveryDate: string | null;
  numberOfFreeTrips: number | null;
  discounts: Discount[];
  leases: Lease[];
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
}

export interface AccountOverview {
  isFetching: boolean;
  error: APIError | null;
  overview: Overview;
}

export interface ProductVariantImages {
  mobile: string;
  desktop: string;
}

export interface SubscriptionItemResource {
  customerPurchaseDate: Date | null;
  monthlySubtotal: number;
  productVariant: {
    identifier: string;
    product: {
      title: string;
      identifier: string;
      images: ProductVariantImages[];
    };
    optionValues: OptionValue[];
  };
}

export interface Subscription {
  id: number;
  numberOfFreeTrips: number;
  startDate: string;
  endDate: string;
  monthlySubtotal: number;
  items: SubscriptionItemResource[];
  taxRate: number;
  requestedDeliveryDate: string | null;
  subscriptionPlans: SubscriptionPlan[];
  discounts: Discount[];
  leases: Lease[];
  isActive: boolean;
  postalArea: {
    deliveryAreaId: number;
    deliveryArea: {
      identifier: DeliveryAreaIdentifier;
    };
  };
}
