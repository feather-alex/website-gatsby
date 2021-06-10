import { State as GlobalState } from '../../../types/ReduxState';

export const getFAQs = ({ howItWorks }: GlobalState) => howItWorks.faqs;

export const getMeta = ({ howItWorks }: GlobalState) => howItWorks.meta;

export const getSteps = ({ howItWorks }: GlobalState) => howItWorks.steps;

export const getError = ({ howItWorks }: GlobalState) => howItWorks.error;

export const getHeader = ({ howItWorks }: GlobalState) => howItWorks.header;

export const getIsFetching = ({ howItWorks }: GlobalState) => howItWorks.isFetching;
