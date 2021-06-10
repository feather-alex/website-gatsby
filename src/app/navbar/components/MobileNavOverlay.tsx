/** @jsx jsx */
import { useState, useEffect, Fragment, useRef } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { BRAND } from '../../../ui/variables';
import MobileNavMenu from './mobile/MobileNavMenu';
import MobileNavSubMenu from './mobile/MobileNavSubMenu';
import { Z_INDICIES } from '../../../ui/zIndicies';
import { useSelector } from 'react-redux';
import { getNavbarIsContentLoading, getNavbarContent } from '../../store/navbar/navbar.selectors';
import Loading from '../../../components/Loading';
import { NavCategoryWithSubmenu, NavCategoryDirectLink } from '../../../contentful/contentful.types';

export enum SubMenuState {
  howItWorks = 'isHowItWorksOpen',
  furniture = 'isFurnitureOpen',
  account = 'isAccountOpen',
  none = 'none'
}

const OffClick = styled.div`
  position: fixed;
  z-index: ${Z_INDICIES.MOBILE_NAV_OVERLAY};
  top: 0;
  bottom: 0;
  left: 0;
  ${({ isMobileNavOpen }: { isMobileNavOpen: boolean }) => (isMobileNavOpen ? 'right: 0;' : '')}
`;

const Overlay = styled.div`
  position: fixed;
  top: ${({ bodyMarginTop }: { isMobileNavOpen: boolean; bodyMarginTop: number }) => bodyMarginTop}px;
  /* this is over 100 to go past the shadow */
  left: ${({ isMobileNavOpen }: { isMobileNavOpen: boolean; bodyMarginTop: number }) =>
    isMobileNavOpen ? '0' : '-110vw'};
  height: 100%;
  width: 100%;
  background: transparent;
  z-index: ${Z_INDICIES.MOBILE_NAV_OVERLAY};
  transition: left 600ms ease-in-out, top 400ms linear;
  box-shadow: 16px 24px 24px rgba(51, 51, 51, 0.1);
`;

const OverlayContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - ${({ bodyMarginTop }: { bodyMarginTop: number }) => bodyMarginTop}px);
  width: 100vw;
  background: ${BRAND.BACKGROUND};
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: ${Z_INDICIES.MOBILE_NAV_OVERLAY_CONTENT};
`;

interface Props {
  isMobileNavOpen: boolean;
  isAuthenticated: boolean;
  handleNavLinkClick: (currentLink: string) => () => void;
  toggleMobileNavOverlay: () => void;
  bodyMarginTop: number;
}

const MobileNavOverlay = ({ isMobileNavOpen, bodyMarginTop, toggleMobileNavOverlay, handleNavLinkClick }: Props) => {
  const mobileNavOverlayRef = useRef<HTMLDivElement>(null);
  const [subMenuState, setSubMenuState] = useState<number | null>(null);
  const [currentSubMenu, setCurrentSubMenu] = useState<null | NavCategoryWithSubmenu | NavCategoryDirectLink>(null);
  const isContentLoading = useSelector(getNavbarIsContentLoading);
  const content = useSelector(getNavbarContent);

  useEffect(() => {
    if (!isMobileNavOpen) {
      // delay this reset for the animation
      setTimeout(() => setSubMenuState(null), 400);
    } else {
      // scroll to top upon re-opening
      if (mobileNavOverlayRef.current) {
        mobileNavOverlayRef.current.scrollTo(0, 0);
      }
    }

    if (subMenuState !== null && content) {
      setCurrentSubMenu(content.categories[subMenuState]);
    }
  }, [isMobileNavOpen, subMenuState, content]);

  const handleOffClick = () => {
    toggleMobileNavOverlay();
  };

  const toggleSubMenu = (categoryIndex: number) => {
    if (subMenuState === categoryIndex) {
      setSubMenuState(null);
    } else {
      setSubMenuState(categoryIndex);
    }
  };

  const goBackFromSubmenu = () => {
    setSubMenuState(null);
  };

  if (isContentLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <OffClick onClick={handleOffClick} isMobileNavOpen={isMobileNavOpen} />
      <Overlay isMobileNavOpen={isMobileNavOpen} bodyMarginTop={bodyMarginTop}>
        {content && (
          <OverlayContent bodyMarginTop={bodyMarginTop} ref={mobileNavOverlayRef}>
            {subMenuState === null && (
              <MobileNavMenu
                handleNavLinkClick={handleNavLinkClick}
                toggleSubMenu={toggleSubMenu}
                categories={content.categories}
              />
            )}

            {subMenuState !== null && currentSubMenu && 'secondaryGroups' in currentSubMenu && (
              <MobileNavSubMenu
                handleGoBack={goBackFromSubmenu}
                toggleMobileNavOverlay={toggleMobileNavOverlay}
                secondaryMenuTitle={currentSubMenu.secondaryMenuTitle}
                secondaryGroups={currentSubMenu.secondaryGroups}
                handleNavLinkClick={handleNavLinkClick}
              />
            )}
          </OverlayContent>
        )}
      </Overlay>
    </Fragment>
  );
};

export default MobileNavOverlay;
