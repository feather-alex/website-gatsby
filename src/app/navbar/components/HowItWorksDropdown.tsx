import React from 'react';
import NavImageLink from './NavImageLink';
import NavDropdown from './NavDropdown';
import { NavLinkGroup, NavVerticalDivider, NavImageLinkGroup } from '../DesktopNavbar';
import NavLink from './NavLink';

interface Props {
  isVisible: boolean;
  bodyMarginTop: number;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  handleNavLinkClick: (currentLink: string) => () => void;
}

const HowItWorksDropdown = ({
  isVisible,
  bodyMarginTop,
  handleMouseOver,
  handleMouseOut,
  handleNavLinkClick
}: Props) => (
  <NavDropdown
    isVisible={isVisible}
    bodyMarginTop={bodyMarginTop}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
  >
    <NavLinkGroup>
      <NavLink
        dataCy="nav-how-it-works"
        label="How it Works"
        to="/how-it-works"
        onClick={handleNavLinkClick('how it works dropdown')}
      />
      <NavLink
        dataCy="nav-about-feather"
        label="About Feather"
        to="/about"
        onClick={handleNavLinkClick('about Feather dropdown')}
      />
      <NavLink
        dataCy="nav-feather-furniture"
        label="Feather Furniture"
        to="/feather-furniture"
        onClick={handleNavLinkClick('Feather furniture dropdown')}
      />
      <NavLink dataCy="nav-faqs" label="FAQs" to="/faqs" onClick={handleNavLinkClick('FAQs dropdown')} />
      <NavLink dataCy="nav-reviews" label="Reviews" to="/reviews" onClick={handleNavLinkClick('reviews dropdown')} />
    </NavLinkGroup>
    <NavVerticalDivider />
    <NavImageLinkGroup>
      <NavImageLink
        imageUrl="https://img.livefeather.com/pages-new/Global/howitworks_nav-2.jpg"
        imageAlt="How it Works"
        linkText="How it Works"
        to="/how-it-works"
        onClick={handleNavLinkClick('how it works image link dropdown')}
      />
      <NavImageLink
        imageUrl="https://img.livefeather.com/pages-new/Global/featherfurniture_nav.png"
        imageAlt="Feather Furniture"
        linkText="Feather Furniture"
        to="/feather-furniture"
        onClick={handleNavLinkClick('Feather furniture image link dropdown')}
      />
      <NavImageLink
        imageUrl="https://img.livefeather.com/pages-new/Global/reviewsnav.png"
        imageAlt="Feather Reviews"
        linkText="Feather Reviews"
        to="/reviews"
        onClick={handleNavLinkClick('reviews image link dropdown')}
      />
    </NavImageLinkGroup>
  </NavDropdown>
);

export default HowItWorksDropdown;
