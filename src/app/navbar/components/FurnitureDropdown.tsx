/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import Title1 from "../../../ui/titles/Title1";
import NavImageLink from "./NavImageLink";
import NavDropdown from "./NavDropdown";
import {
  NavVerticalDivider,
  NavLinkGroup,
  NavImageLinkGroup,
} from "../DesktopNavbar";
import Header4 from "../../../ui/headers/Header4";
import ArrowRightBold from "../../../ui/icons/ArrowRightBold";
import {
  PRODUCT_CATEGORIES,
  ITEM_TYPE,
  PACKAGES,
  NavLinkData,
} from "./navbar.link.data";
import NavLink, { NavLinkWrapper } from "./NavLink";

interface Props {
  bodyMarginTop: number;
  isVisible: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  handleNavLinkClick: (currentLink: string) => () => void;
}

const NavTitleMargin = styled.div`
  margin-bottom: 12px;
`;

const FurnitureDropdown = ({
  isVisible,
  bodyMarginTop,
  handleMouseOver,
  handleMouseOut,
  handleNavLinkClick,
}: Props) => {
  const renderCategory = (category: NavLinkData) => (
    <NavLink
      key={category.to}
      label={category.label}
      withArrow={category.withArrow}
      to={category.to}
      onClick={handleNavLinkClick(category.analyticsKey)}
    />
  );

  return (
    <NavDropdown
      isVisible={isVisible}
      bodyMarginTop={bodyMarginTop}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      css={css`
        height: initial;
      `}
      grid="1fr 1fr 1px 1fr 1fr 1fr 1px 1fr 1fr 1fr 1px 1fr 1fr 1fr 1fr"
    >
      <NavLinkGroup columns={2}>
        <NavTitleMargin>
          <Header4>CATEGORY</Header4>
        </NavTitleMargin>
        {PRODUCT_CATEGORIES.map(renderCategory)}
      </NavLinkGroup>

      <NavVerticalDivider />

      <NavLinkGroup>
        <NavTitleMargin>
          <Header4>ITEM TYPE</Header4>
        </NavTitleMargin>
        {ITEM_TYPE.map(renderCategory)}
      </NavLinkGroup>

      <NavVerticalDivider />

      <NavLinkGroup>
        <NavTitleMargin>
          <Header4>PACKAGES</Header4>
        </NavTitleMargin>
        {PACKAGES.map((category) => (
          <NavLinkWrapper key={category.to}>
            <AnchorLink to={category.to}>
              <div
                role="button"
                tabIndex={0}
                onClick={handleNavLinkClick(category.analyticsKey)}
              >
                <Title1 isBold={category.withArrow} isAnimated={true}>
                  {category.label} {category.withArrow && <ArrowRightBold />}
                </Title1>
              </div>
            </AnchorLink>
          </NavLinkWrapper>
        ))}
      </NavLinkGroup>

      <NavVerticalDivider />

      <NavImageLinkGroup columns={4}>
        <NavImageLink
          isFullWidth={true}
          imageUrl="https://img.livefeather.com/pages-new/Floyd/floyd-navigation.png?auto=compress,format&cs=srgb&dpr=1&fit=max&h=500&w=800"
          imageAlt="Floyd platform bed in condo"
          linkText="Shop Floyd"
          to="/products?brands=floyd"
          onClick={handleNavLinkClick("floyd dropdown")}
        />
      </NavImageLinkGroup>
    </NavDropdown>
  );
};

export default FurnitureDropdown;
