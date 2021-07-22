import { EntryCollection } from "contentful";

import { APIError } from "../../../types/ReduxState";
import {
  FAQCategoryContentful,
  FAQ,
  HowItWorksStep,
  HowItWorksStepContentful,
  Meta,
  MetaContentful,
} from "../../../contentful/contentful.types";

export interface HowItWorksState {
  error: APIError | null;
  isFetching: boolean;
  header: string;
  faqs: FAQ[];
  meta: Meta;
  steps: HowItWorksStep[];
}

export type HowItWorksPageContent = EntryCollection<{
  name: string;
  header: string;
  meta: MetaContentful;
  faqCategory: FAQCategoryContentful;
  steps: HowItWorksStepContentful[];
}>;

export interface HowItWorksRequestPayload {
  id: string;
}

export interface HowItWorksSuccessPayload {
  header: string;
  faqs: FAQ[];
  meta: Meta;
  steps: HowItWorksStep[];
}
