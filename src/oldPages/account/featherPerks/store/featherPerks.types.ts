import { EntryCollection } from 'contentful';
import { APIError } from '../../../../api/error';
import { FeatherPerksCard, FeatherPerksCardContentful } from '../../../../contentful/contentful.types';

export interface FeatherPerksRequestPayload {
  id: string;
}

export type FeatherPerksContent = EntryCollection<{
  perks: FeatherPerksCardContentful[];
}>;

export interface FeatherPerksSuccessPayload {
  perks: FeatherPerksCard[];
}

export interface FeatherPerksContentState {
  error: APIError | null;
  isFetching: boolean;
  perks: FeatherPerksCard[] | null;
}
