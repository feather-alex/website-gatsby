import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { format as formatDate } from "date-fns";

import {
  getAccountOverview,
  setAccountSubscriptionStartDate,
} from "./account.overview.actions";
import {
  AccountOverview,
  Subscription,
  PlanType,
} from "./account.overview.types";
import {
  getCurrentPlan,
  sortItemsAlphabetically,
} from "./account.overview.service";
import { APIError } from "../../../../types/ReduxState";

export const initialState: AccountOverview = {
  isFetching: false,
  error: null,
  overview: {
    subscriptionId: 0,
    startDate: "",
    endDate: "",
    monthlySubtotal: 0,
    requestedDeliveryDate: null,
    currentPlan: {
      startDate: "",
      membershipFee: 0,
      type: PlanType.Legacy,
    },
    items: [],
    deliveryAreaIdentifier: null,
    taxRate: 0,
    discounts: [],
    leases: [],
    numberOfFreeTrips: 0,
  },
};

export default createReducer(initialState, {
  [getAccountOverview.request.type](state: AccountOverview) {
    state.isFetching = true;
    state.error = null;
  },

  [getAccountOverview.success.type](
    state: AccountOverview,
    action: PayloadAction<Subscription>
  ) {
    state.isFetching = false;
    state.error = null;
    state.overview = {
      subscriptionId: action.payload.id,
      items: sortItemsAlphabetically(action.payload.items),
      startDate: action.payload.startDate,
      endDate: action.payload.endDate,
      deliveryAreaIdentifier: action.payload.postalArea.deliveryArea.identifier,
      taxRate: action.payload.taxRate,
      discounts: action.payload.discounts,
      leases: action.payload.leases,
      monthlySubtotal: action.payload.monthlySubtotal,
      numberOfFreeTrips: action.payload.numberOfFreeTrips,
      requestedDeliveryDate: action.payload.requestedDeliveryDate,
      currentPlan:
        getCurrentPlan(action.payload.subscriptionPlans) ||
        initialState.overview.currentPlan,
    };
  },

  [getAccountOverview.failure.type](
    state: AccountOverview,
    action: PayloadAction<APIError>
  ) {
    state.isFetching = false;
    state.error = action.payload;
  },

  [setAccountSubscriptionStartDate.type](
    state: AccountOverview,
    action: PayloadAction<Date>
  ) {
    state.overview.startDate = formatDate(action.payload, "yyyy-MM-dd");
  },
});
