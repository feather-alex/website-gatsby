import { PromoInfo } from "../oldPages/cart/store/cart.types";

export interface CheckoutAmountsResource {
  discountInfo: PromoInfo;
  deliveryFee: number;
  monthlyFee: number;
  taxDueNow: number;
  taxDueMonthly: number;
  taxRate: number;
  totalDueMonthly: number;
  totalDueNow: number;
  depositAmount: number;
}
