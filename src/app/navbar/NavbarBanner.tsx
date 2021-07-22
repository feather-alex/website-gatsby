/** @jsx jsx */
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import { State as GlobalState } from "../../types/ReduxState";
import CloseSignIcon from "../../ui/icons/CloseSignIcon";
import {
  dismissNavbarBanner as dismissNavbarBannerAction,
  showNavbarBanner as showNavbarBannerAction,
} from "../store/navbar/navbar.actions";
import {
  getIsNavbarBannerVisible,
  getNavbarBannerType,
  getNavbarBannerMessage,
  getNavbarBannerColor,
} from "../store/navbar/navbar.selectors";
import {
  BannerType,
  ShowNavbarBannerPayload,
} from "../store/navbar/navbar.types";
import { ActionCreator } from "../../types/FluxStandardActions";
import Banner from "./banner/Banner";
import ZipcodeBanner from "./banner/ZipcodeBanner";
import ZipcodeSuccessBanner from "./banner/ZipcodeSuccessBanner";
import ZipcodeFailureBanner from "./banner/ZipcodeFailureBanner";
import { COLORS, BRAND } from "../../ui/variables";
import Paragraph2 from "../../ui/paragraphs/Paragraph2";
import {
  getIsBannerBreakpoint,
  BANNER_DESKTOP_HEIGHT,
  BANNER_MOBILE_HEIGHT,
  getIsNavbarBreakpoint,
} from "../store/dimensions/dimensions.selectors";
import { ReactNode } from "react";
import { Z_INDICIES } from "../../ui/zIndicies";
import { getDeliveryZipCode } from "../store/plan/plan.selectors";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface StateProps {
  isBannerBreakpoint: boolean;
  isNavbarBreakpoint: boolean;
  zipcode: string;
  isVisible: boolean;
}

interface DispatchProps {
  dismissNavbarBanner: ActionCreator;
  showNavbarBanner: ActionCreatorWithPayload<ShowNavbarBannerPayload>;
}

interface OwnProps {
  bannerType: BannerType;
  bannerColor?: string;
  message: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const renderBanner = (
  bannerType: BannerType,
  message: ReactNode,
  bannerColor?: string
): JSX.Element | null => {
  switch (bannerType) {
    case BannerType.Announcement:
      return (
        <Banner backgroundColor={bannerColor || COLORS.CITRON}>
          <Paragraph2 dataCy="banner" color={BRAND.PRIMARY_TEXT}>
            {message}
          </Paragraph2>
        </Banner>
      );
    case BannerType.Success:
      return (
        <Banner backgroundColor={bannerColor || COLORS.MINT}>
          <Paragraph2 dataCy="banner" color={BRAND.PRIMARY_TEXT}>
            {message}
          </Paragraph2>
        </Banner>
      );
    case BannerType.ZipCode:
      return <ZipcodeBanner message={message} />;
    case BannerType.ZipCodeSuccess:
      return <ZipcodeSuccessBanner />;
    case BannerType.ZipCodeFailure:
      return <ZipcodeFailureBanner message={message} />;
    default:
      return null;
  }
};

const NavbarBanner = ({
  isVisible,
  bannerType,
  dismissNavbarBanner,
  showNavbarBanner,
  message,
  isBannerBreakpoint,
  isNavbarBreakpoint,
  zipcode,
  bannerColor,
}: Props) => {
  const dismissThenShowZip = () => {
    dismissNavbarBanner();
    setTimeout(
      () => showNavbarBanner({ bannerType: BannerType.ZipCode }),
      1000
    );
  };
  return (
    <div
      css={css`
        position: fixed;
        width: 100%;
        left: 0;
        right: 0;
        transition: top 400ms linear;
        z-index: ${Z_INDICIES.BANNER};

        ${isBannerBreakpoint
          ? `height: ${BANNER_MOBILE_HEIGHT}px; top: ${
              isVisible ? "0" : `-${BANNER_MOBILE_HEIGHT}px`
            };`
          : `height: ${BANNER_DESKTOP_HEIGHT}px; top: ${
              isVisible ? "0" : `-${BANNER_DESKTOP_HEIGHT}px`
            };`}
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 15px;
          left: ${isNavbarBreakpoint ? 19 : 25}px;
          cursor: pointer;
        `}
      >
        <CloseSignIcon
          onClick={
            bannerType === BannerType.Announcement && !zipcode
              ? dismissThenShowZip
              : dismissNavbarBanner
          }
          isInverted={
            bannerType === BannerType.ZipCodeFailure ||
            (!!message &&
              bannerType !== BannerType.Announcement &&
              bannerType !== BannerType.Success)
          }
        />
      </div>
      {renderBanner(bannerType, message, bannerColor)}
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  isVisible: getIsNavbarBannerVisible(state),
  bannerType: getNavbarBannerType(state),
  message: getNavbarBannerMessage(state),
  isBannerBreakpoint: getIsBannerBreakpoint(state),
  isNavbarBreakpoint: getIsNavbarBreakpoint(state),
  zipcode: getDeliveryZipCode(state),
  bannerColor: getNavbarBannerColor(state),
});

const mapDispatchToProps = {
  dismissNavbarBanner: dismissNavbarBannerAction,
  showNavbarBanner: showNavbarBannerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarBanner);
