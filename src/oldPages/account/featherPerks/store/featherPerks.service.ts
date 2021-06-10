import { parseFeatherPerks } from '../../../../contentful/contentful.parsers';
import { FeatherPerksContent, FeatherPerksSuccessPayload } from './featherPerks.types';

export function formatFeatherPerksContentResponse(content: FeatherPerksContent): FeatherPerksSuccessPayload {
  const { fields } = content.items[0];
  return {
    perks: parseFeatherPerks(fields.perks)
  };
}
