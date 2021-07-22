import { isAfter, isBefore, isSameDay, parseISO } from "date-fns";

import { DeliveryArea } from "../../../../app/store/entities/entities.types";
import { DeliveryAreaIdentifier } from "../../../../app/store/plan/plan.types";
import {
  SubscriptionItemResource,
  SubscriptionPlan,
} from "./account.overview.types";

export const getDisabledDeliveryDates = (
  deliveryAreas: DeliveryArea[],
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null
) => {
  enum DaysOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
  }

  const today = new Date();
  const todayPlus = new Date();
  today.getDay() === DaysOfWeek.Friday
    ? todayPlus.setDate(today.getDate() + 4)
    : todayPlus.setDate(today.getDate() + 3);
  const year = today.getFullYear();

  const disabledDays = [
    { daysOfWeek: [DaysOfWeek.Sunday] },
    { before: todayPlus },
    new Date(`January 1, ${year + 1}`),
    new Date(`July 4, ${year}`),
    new Date(`December 24, ${year}`),
    new Date(`December 25, ${year}`),
    new Date(`December 31, ${year}`),
  ];

  const currentDeliveryArea =
    deliveryAreas &&
    deliveryAreas.find((area) => area.identifier === deliveryAreaIdentifier);

  const blockedDeliveryDates = currentDeliveryArea
    ? currentDeliveryArea.blockedDeliveryDates
    : [];

  blockedDeliveryDates.forEach((dateString: string) => {
    const dateStringNum = dateString.split("-");
    const dateToBlock = new Date(
      parseInt(dateStringNum[0], 10),
      parseInt(dateStringNum[1], 10) - 1,
      parseInt(dateStringNum[2], 10)
    );

    disabledDays.push(dateToBlock);
  });

  return disabledDays;
};

export const getCurrentPlan = (subscriptionPlans: SubscriptionPlan[]) => {
  if (!subscriptionPlans || subscriptionPlans.length === 0) {
    return null;
  } else if (subscriptionPlans.length === 1) {
    return subscriptionPlans[0];
  } else {
    // find the current plan
    let currentPlanIndex = 0;
    subscriptionPlans.forEach((plan, index) => {
      const startDate = parseISO(plan.startDate);
      const today = new Date();
      const currentPlanStartDate = parseISO(
        subscriptionPlans[currentPlanIndex].startDate
      );
      // reassign current plan index if this plan's start date is closer to today, but not past "today"
      if (
        // the same day or sometime before that day
        (isSameDay(startDate, today) || isBefore(startDate, today)) &&
        // not the same day but after
        !isSameDay(startDate, currentPlanStartDate) &&
        isAfter(startDate, currentPlanStartDate)
      ) {
        currentPlanIndex = index;
      }
    });
    return subscriptionPlans[currentPlanIndex];
  }
};

export const sortItemsAlphabetically = (items: SubscriptionItemResource[]) =>
  items.sort((a, b) =>
    a.productVariant.product.title > b.productVariant.product.title ? 1 : -1
  );
