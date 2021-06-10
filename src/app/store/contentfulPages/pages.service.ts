import { ContentfulPagesSuccessPayload } from './pages.types';
import { PagesContent } from '../../../contentful/contentful.types';
import { parseContentfulPages } from '../../../contentful/contentful.parsers';

export const formatContentfulPagesResponse = (content: PagesContent): ContentfulPagesSuccessPayload => ({
  pages: parseContentfulPages(content.items)
});
