import { formatFeatherPerksContentResponse } from './featherPerks.service';
import { mockContentfulResponse, mockSuccessPayload } from './featherPerks.fixtures';

describe('Feather Perks Services', () => {
  it('should format the Feather Perks Content from Contentful into Feather Perks state data', () => {
    const featherPerksContent = formatFeatherPerksContentResponse(mockContentfulResponse);

    expect(featherPerksContent).toEqual(mockSuccessPayload);
  });
});
