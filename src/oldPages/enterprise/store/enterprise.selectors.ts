import { State } from '../../../types/ReduxState';

export const getEnterpriseIsFetching = ({ enterprise }: State) => enterprise.isFetching;
export const getEnterpriseError = ({ enterprise }: State) => enterprise.error;
export const getEnterpriseMeta = ({ enterprise }: State) => enterprise.meta;
export const getEnterpriseFAQs = ({ enterprise }: State) => enterprise.faqs;
export const getEnterpriseHeroLockup = ({ enterprise }: State) => enterprise.heroLockup;
export const getEnterpriseHorizontalLockup = ({ enterprise }: State) => enterprise.horizontalLockup;
export const getEnterpriseHorizontalLockup2 = ({ enterprise }: State) => enterprise.horizontalLockup2;
export const getEnterpriseProductShowcase = ({ enterprise }: State) => enterprise.productShowcase;
export const getEnterpriseTitleButtonLockup = ({ enterprise }: State) => enterprise.titleButtonLockup;
export const getEnterpriseTitledTripleVerticalImageLockup = ({ enterprise }: State) =>
  enterprise.titledTripleVerticalImageLockup;
