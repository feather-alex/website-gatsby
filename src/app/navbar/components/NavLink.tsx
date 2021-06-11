/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import Title1 from "../../../ui/titles/Title1";
import ArrowRightBold from "../../../ui/icons/ArrowRightBold";
import { BRAND } from "../../../ui/variables";
import { NavLinkData } from "./navbar.link.data";

export const NavLinkWrapper = styled.div`
  margin-bottom: 16px;
  width: fit-content;

  ${({ isUnderline = true }: { isUnderline?: boolean }) =>
    isUnderline
      ? `
  a.active {
    p {
      &:before,
      &:after {
        position: absolute;
        content: '';
        bottom: -1px;
        width: 100%;
        height: 1px;
        background-color: ${BRAND.PRIMARY_TEXT};
        opacity: 1;
      }
    }
  }
  `
      : ""}
`;

export const renderLink = (
  handleNavLinkClick: (currentLink: string) => () => void,
  isUnderline = true
) => (navLinkData: NavLinkData) => (
  <NavLink
    label={navLinkData.label}
    key={navLinkData.label}
    isUnderline={isUnderline}
    to={navLinkData.to}
    onClick={handleNavLinkClick(navLinkData.analyticsKey)}
    dataCy={navLinkData.dataCy}
  />
);

interface Props {
  to: string;
  onClick?: () => void;
  label: string;
  withArrow?: boolean;
  isUnderline?: boolean;
  dataCy?: string;
}

const NavLink = ({
  to,
  label,
  onClick,
  withArrow,
  isUnderline,
  dataCy,
}: Props) => {
  return (
    <NavLinkWrapper data-cy={dataCy} isUnderline={isUnderline} key={to}>
      <Link to={to} activeClassName="active" onClick={onClick}>
        <Title1 isBold={withArrow} isAnimated={true}>
          {label} {withArrow && <ArrowRightBold />}
        </Title1>
      </Link>
    </NavLinkWrapper>
  );
};

export default NavLink;
