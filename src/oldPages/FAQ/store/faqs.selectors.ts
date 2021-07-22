import { State as GlobalState } from "../../../types/ReduxState";

export const getFAQCategories = ({ faq }: GlobalState) => faq.faqCategories;

export const getFAQCategoryNames = ({ faq }: GlobalState) =>
  faq.faqCategories.map((category) => category.name);

export const getMeta = ({ faq }: GlobalState) => faq.meta;

export const getError = ({ faq }: GlobalState) => faq.error;

export const getIsFetching = ({ faq }: GlobalState) => faq.isFetching;
