import { formatEnterpriseContentResponse } from './enterprise.service';
import { mockContentfulResponse, mockSuccessPayload } from './enterprise.fixtures';

describe('Enterprise Page Services', () => {
  describe('Convert an Enterprise Page content from Contentful in to FAQ Page state data', () => {
    it('should return Enterprise and meta information', () => {
      const faqContent = formatEnterpriseContentResponse(mockContentfulResponse);
      expect(faqContent).toEqual(mockSuccessPayload);
    });
  });
});
