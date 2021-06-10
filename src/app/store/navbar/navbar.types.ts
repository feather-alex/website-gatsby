import { EntryCollection } from 'contentful';
import {
  MobileNav,
  NavCategoryWithSubmenu,
  NavCategoryDirectLink,
  NavCategoryWithSubmenuContentful,
  NavCategoryDirectLinkContentful
} from '../../../contentful/contentful.types';

export enum BannerType {
  ZipCode = 'zipCode',
  ZipCodeSuccess = 'zipCodeSuccess',
  ZipCodeFailure = 'zipCodeFailure',
  Announcement = 'announcement',
  Success = 'success'
}

export interface NavbarState {
  isBannerVisible: boolean;
  bannerType: BannerType | null;
  bannerMessage?: string;
  bannerColor?: string;
  content: MobileNav | null;
  isContentLoading: boolean;
}

export interface MobileNavContentRequestPayload {
  id: string;
}

export interface MobileNavContentSuccessPayload {
  categories: (NavCategoryWithSubmenu | NavCategoryDirectLink)[];
}

export type MobileNavContent = EntryCollection<{
  categories: (NavCategoryWithSubmenuContentful | NavCategoryDirectLinkContentful)[];
}>;

export interface ShowNavbarBannerPayload {
  bannerType: BannerType;
  message?: string;
  color?: string;
}
