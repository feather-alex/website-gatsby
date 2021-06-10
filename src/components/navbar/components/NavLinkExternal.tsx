/** @jsx jsx */
import { jsx } from '@emotion/core';
import Title1 from '../../../ui/titles/Title1';
import ArrowRightBold from '../../../ui/icons/ArrowRightBold';
import { NavLinkWrapper } from './NavLink';
import { ExternalNavLinkData } from './navbar.link.data';

interface Props {
  href: string;
  onClick?: () => void;
  label: string;
  withArrow?: boolean;
  isUnderline?: boolean;
  dataCy?: string;
}

export const renderExternalLink = (handleNavLinkClick: (currentLink: string) => () => void, isUnderline = true) => (
  navLinkData: ExternalNavLinkData
) => (
  <NavLinkExternal
    label={navLinkData.label}
    key={navLinkData.label}
    isUnderline={isUnderline}
    href={navLinkData.href}
    onClick={handleNavLinkClick(navLinkData.analyticsKey)}
    dataCy={navLinkData.dataCy}
  />
);

const NavLinkExternal = ({ href, label, onClick, withArrow, isUnderline, dataCy }: Props) => {
  return (
    <NavLinkWrapper data-cy={dataCy} isUnderline={isUnderline} key={href}>
      <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer">
        <Title1 isBold={withArrow} isAnimated={true}>
          {label} {withArrow && <ArrowRightBold />}
        </Title1>
      </a>
    </NavLinkWrapper>
  );
};

export default NavLinkExternal;
