import { State as GlobalState } from '../../../types/ReduxState';

export const getIsFetchingProductEntities = ({ app }: GlobalState) => app.productEntities.isFetching;

export const getProductEntities = ({ app }: GlobalState) => app.productEntities.data;

export const getProductEntitiesError = ({ app }: GlobalState) => app.productEntities.error;
