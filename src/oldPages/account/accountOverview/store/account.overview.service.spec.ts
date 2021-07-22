import { addDays, subDays, format as formatDate } from "date-fns";

import {
  getCurrentPlan,
  sortItemsAlphabetically,
} from "./account.overview.service";
import {
  PlanType,
  SubscriptionItemResource,
  SubscriptionPlan,
} from "./account.overview.types";

describe("Account Overview Services", () => {
  describe("Get the current plan", () => {
    it("should return null if there are no items in the array", () => {
      expect(getCurrentPlan([])).toEqual(null);
    });

    it("should return the first item in the array if there is only one", () => {
      const subscriptionPlans: SubscriptionPlan[] = [
        {
          membershipFee: 19,
          startDate: formatDate(new Date(), "yyyy-MM-dd"),
          type: PlanType.Member,
        },
      ];
      expect(getCurrentPlan(subscriptionPlans)).toEqual(subscriptionPlans[0]);
    });

    it("should get the plan with the earliest start date", () => {
      const subscriptionPlans: SubscriptionPlan[] = [
        {
          membershipFee: 0,
          startDate: formatDate(new Date(), "yyyy-MM-dd"),
          type: PlanType.NonMember,
        },
        {
          membershipFee: 19,
          startDate: formatDate(addDays(new Date(), 1), "yyyy-MM-dd"),
          type: PlanType.Member,
        },
      ];

      expect(getCurrentPlan(subscriptionPlans)).toEqual(subscriptionPlans[0]);
    });

    it("should get the plan with the earliest start date 2", () => {
      const subscriptionPlans: SubscriptionPlan[] = [
        {
          membershipFee: 0,
          startDate: formatDate(subDays(new Date(), 1), "yyyy-MM-dd"),
          type: PlanType.NonMember,
        },
        {
          membershipFee: 19,
          startDate: formatDate(new Date(), "yyyy-MM-dd"),
          type: PlanType.Member,
        },
      ];

      expect(getCurrentPlan(subscriptionPlans)).toEqual(subscriptionPlans[1]);
    });
  });

  describe("sort items alphabetically", () => {
    const subscriptionItems: SubscriptionItemResource[] = [
      {
        customerPurchaseDate: null,
        monthlySubtotal: 19,
        productVariant: {
          identifier: "default",
          product: {
            title: "Willow lounge chair",
            identifier: "willow-lounge-chair",
            images: [
              {
                mobile: "x5000-main-desktop.jpg",
                desktop: "x5000-main-desktop.jpg",
              },
            ],
          },
          optionValues: [],
        },
      },
      {
        customerPurchaseDate: null,
        monthlySubtotal: 109,
        productVariant: {
          identifier: "default",
          product: {
            title: "Sora sectional sofa",
            identifier: "sora-sectional-sofa",
            images: [
              {
                mobile: "x5622-main-desktop.jpg",
                desktop: "x5622-main-desktop.jpg",
              },
            ],
          },
          optionValues: [],
        },
      },
      {
        customerPurchaseDate: null,
        monthlySubtotal: 19,
        productVariant: {
          identifier: "default",
          product: {
            title: "Athene chair",
            identifier: "athene-chair",
            images: [
              {
                mobile: "x3141-main-desktop.jpg",
                desktop: "x3141-main-desktop.jpg",
              },
            ],
          },
          optionValues: [],
        },
      },
    ];

    it("should sort a list of subscription items alphabetically", () => {
      const sorted = sortItemsAlphabetically(subscriptionItems);
      expect(sorted[0].productVariant.product.title).toEqual("Athene chair");
    });
  });
});
