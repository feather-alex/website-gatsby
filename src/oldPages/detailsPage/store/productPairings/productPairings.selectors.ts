import { State as GlobalState } from '../../../../types/ReduxState';

export const getError = ({ productPairings }: GlobalState) => productPairings.error;

export const getIsFetching = ({ productPairings }: GlobalState) => productPairings.isFetching;

export const getProductPairing = ({ productPairings }: GlobalState) => productPairings.products;

export const getProductBestsellers = ({ productPairings }: GlobalState) => productPairings.bestsellers;
