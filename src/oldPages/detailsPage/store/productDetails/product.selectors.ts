import { State as GlobalState } from '../../../../types/ReduxState';
import { FullProductDetails } from '../../../../types/Product';

/**
 * *--------------------------------------------*
 * | Selectors for Product Details global state |
 * *--------------------------------------------*
 */
export const getError = ({ productDetails }: GlobalState) => productDetails.error;

export const getIsFetching = ({ productDetails }: GlobalState) => productDetails.isFetching;

export const getProductDetails = ({ productDetails }: GlobalState) => productDetails.data;

/**
 * *---------------------------------------------*
 * | Selectors for properties on a given Product |
 * *---------------------------------------------*
 */
export const title = (product: FullProductDetails) => product.title;

export const identifier = (product: FullProductDetails) => product.identifier;

export const memberPrice = (product: FullProductDetails) => product.variants[0].rentalPrices[12];

export const nonMemberPrice = (product: FullProductDetails) => product.variants[0].rentalPrices[3];
