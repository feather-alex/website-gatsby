import { State as GlobalState } from "../../../types/ReduxState";

export const getIsFetching = ({ homepage }: GlobalState) => homepage.isFetching;
export const getError = ({ homepage }: GlobalState) => homepage.error;
export const getHomepageMeta = ({ homepage }: GlobalState) => homepage.meta;
export const getHomepageHero = ({ homepage }: GlobalState) => homepage.hero;
export const getHomepageTextLockup = ({ homepage }: GlobalState) =>
  homepage.textLockup;
export const getHomepageSections = ({ homepage }: GlobalState) =>
  homepage.sections;
export const getHomepageBestSellers = ({ homepage }: GlobalState) =>
  homepage.bestSellers;
export const getHomepageShopByRoom = ({ homepage }: GlobalState) =>
  homepage.shopByRoom;
export const getHomepageReviews = ({ homepage }: GlobalState) =>
  homepage.reviews;
