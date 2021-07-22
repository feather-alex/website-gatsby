import { EntryCollection } from "contentful";
import { APIError } from "../../../types/ReduxState";
import {
  Meta,
  FAQCategoryContentful,
  MetaContentful,
  FAQCategory,
} from "../../../contentful/contentful.types";

export interface FaqContentState {
  error: APIError | null;
  isFetching: boolean;
  faqCategories: FAQCategory[];
  meta: Meta;
}

export type FAQPageContent = EntryCollection<{
  name: string;
  meta: MetaContentful;
  faqCategories: FAQCategoryContentful[];
}>;

export interface FaqContentRequestPayload {
  id: string;
}

export interface FaqContentSuccessPayload {
  faqCategories: FAQCategory[];
  meta: Meta;
}
