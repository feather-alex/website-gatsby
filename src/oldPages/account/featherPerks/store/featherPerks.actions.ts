import { FeatherPerksRequestPayload, FeatherPerksSuccessPayload } from './featherPerks.types';
import createRequestAction from '../../../../utils/createRequestAction';
import { APIError } from '../../../../types/ReduxState';

export const getFeatherPerksContent = createRequestAction<
  FeatherPerksRequestPayload,
  FeatherPerksSuccessPayload,
  APIError
>('GET_FEATHER_PERKS_CONTENT');
