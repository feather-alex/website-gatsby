/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Fragment, useState } from 'react';
import { BRAND } from '../../ui/variables';
import FeatherLogo from '../../ui/logos/FeatherWordMarkLogo';
import CartNavListItem from './components/CartNavListItem';
import HamburgerMenu from './components/HamburgerMenu';
import MobileNavOverlay from './components/MobileNavOverlay';
import CloseSignIcon from '../../ui/icons/CloseSignIcon';
import { NAVBAR_MOBILE_HEIGHT } from '../store/dimensions/dimensions.selectors';
import SearchIcon from '../../ui/icons/SearchIcon';
import Button, { ButtonStyle } from '../../ui/buttons/Button';
import { Z_INDICIES } from '../../ui/zIndicies';
import useMount from '../../utils/useMount';

type FakeNavbarProps = {
  isBoxShadowActive: boolean;
  top: number;
};

const baseNavbar = css`
  position: fixed;
  height: ${NAVBAR_MOBILE_HEIGHT}px;
  width: 100%;
`;

const FakeNavbar = styled.div`
  ${baseNavbar};
  transition: box-shadow 200ms linear;
  z-index: ${Z_INDICIES.PSEUDO_NAVBAR};
  top: ${(props: FakeNavbarProps) => props.top}px;
  box-shadow: ${(props: FakeNavbarProps) => (props.isBoxShadowActive ? `0px 4px 8px rgba(0, 0, 0, 0.08)` : 'none')};
`;

const BaseNavbar = styled.div`
  ${baseNavbar};
  display: flex;
  background-color: ${BRAND.BACKGROUND};
  top: ${({ top }: { top: number }) => top}px;
  transition: top 400ms linear;
  z-index: ${Z_INDICIES.NAVBAR};
`;

const IconsContainer = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SideIconMenu = styled.li`
  display: flex;
  flex: 2;
  justify-content: flex-start;
  margin-left: 16px;
`;

const SideIconSearch = styled.li`
  display: flex;
  flex: 2;
  justify-content: flex-end;
  margin-right: 16px;
  & > a {
    box-shadow: none;
    padding: 0;
    margin-right: 24px;
    background-color: transparent;
    &:hover,
    &:focus,
    &:active,
    &:hover:focus {
      background-color: transparent;
    }
  }
`;

const LogoIcon = styled.li`
  display: flex;
  justify-content: center;
  flex: 1;
`;

interface Props {
  toggleMiniCartOverlay: () => void;
  toggleMobileNavOverlay: () => void;
  handleNavLinkClick: (currentLink: string) => () => void;
  isMobileNavOpen: boolean;
  isMiniCartOpen: boolean;
  isAuthenticated: boolean;
  isBannerVisible: boolean;
  totalItems: number;
  bodyMarginTop: number;
  bannerHeight: number;
}

const MobileNavbar = ({
  isMobileNavOpen,
  isAuthenticated,
  isBannerVisible,
  totalItems,
  handleNavLinkClick,
  toggleMiniCartOverlay,
  toggleMobileNavOverlay,
  bodyMarginTop,
  bannerHeight
}: Props) => {
  const top = isBannerVisible ? bannerHeight : 0;
  const [isShadowVisible, setIsShadowVisible] = useState(false);
  const handleScroll = () => setIsShadowVisible(window.scrollY > 0);

  useMount(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <Fragment>
      {/* Made a fake navbar that mimics the positioning of the real navbar but w/ a lower z-index so it can have a box shadow
      and the ProductRefineMobile located in the PLP can scroll under it when there are no more products left */}
      <FakeNavbar isBoxShadowActive={isShadowVisible} top={top} />
      <BaseNavbar top={top}>
        <IconsContainer>
          <SideIconMenu>
            {isMobileNavOpen ? (
              <div
                css={css`
                  margin-top: 5px;
                `}
              >
                <CloseSignIcon dataCy="close-nav" onClick={toggleMobileNavOverlay} />
              </div>
            ) : (
              <HamburgerMenu onClick={toggleMobileNavOverlay} />
            )}
          </SideIconMenu>
          <LogoIcon>
            <FeatherLogo dataCy="feather-logo" to="/" height={20} />
          </LogoIcon>
          <SideIconSearch>
            <Button
              dataCy="nav-search"
              style={ButtonStyle.COMPACT}
              to="/search"
              onClick={handleNavLinkClick('search button')}
            >
              <SearchIcon />
            </Button>
            <CartNavListItem dataCy="nav-cart" totalItems={totalItems} toggleMiniCart={toggleMiniCartOverlay} />
          </SideIconSearch>
        </IconsContainer>
      </BaseNavbar>
      {/** Mobile Nav Overlay */}
      <MobileNavOverlay
        isMobileNavOpen={isMobileNavOpen}
        isAuthenticated={isAuthenticated}
        handleNavLinkClick={handleNavLinkClick}
        toggleMobileNavOverlay={toggleMobileNavOverlay}
        bodyMarginTop={bodyMarginTop}
      />
    </Fragment>
  );
};

export default MobileNavbar;
