import { DeliveryAreaIdentifier } from '../../app/store/plan/plan.types';
import { PackageVariant } from '../../types/Package';
export { getPackagePrices } from '../detailsPage/detailsPage.service';

/**
 * Check if package is enabled/in stock in current delivery area
 * at least one item needs to be enabled/in stock
 */
export const getPackageStatusListing = (
  deliveryAreaIdentifier: DeliveryAreaIdentifier,
  packageVariants: PackageVariant[],
  statusToCheck: 'isEnabled' | 'isInStock'
): boolean => {
  if (deliveryAreaIdentifier === 'all') {
    return packageVariants.some((variant) => variant.availability.some((availability) => availability[statusToCheck]));
  }

  return packageVariants.some((variant) =>
    variant.items.some((item) =>
      item.availability.some((detail) => detail.deliveryArea === deliveryAreaIdentifier && detail[statusToCheck])
    )
  );
};

/**
 * Checks package to find the cheapest package variant
 */
export const getCheapestVariant = (packageVariants: PackageVariant[]) => {
  return packageVariants.reduce((cheapestVariant, currVariant) => {
    return currVariant.rentalPrices[12] < cheapestVariant.rentalPrices[12] ? currVariant : cheapestVariant;
  });
};
