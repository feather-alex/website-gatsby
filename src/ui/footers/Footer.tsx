/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { BRAND, COLORS } from "../variables";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import { State as GlobalState } from "../../types/ReduxState";
import DesktopFooter from "./footerComponents/DesktopFooter";
import MobileFooter from "./footerComponents/MobileFooter";
import FeatherArchLogo from "../logos/FeatherArchLogo";

interface Props {
  isMobileBreakpoint: boolean;
}

const Footer = ({ isMobileBreakpoint }: Props) => {
  return (
    <div
      css={css`
        border-top: 2px solid ${COLORS.CITRON};
        background-color: ${COLORS.CLOUD};
        color: ${BRAND.PRIMARY_TEXT};
        padding: ${isMobileBreakpoint ? "64px 24px" : "80px"};
      `}
    >
      <div
        css={css`
          display: flex;
          position: relative;
          ${isMobileBreakpoint &&
          "flex-direction: column; align-items: center; text-align: center;"}
        `}
      >
        {isMobileBreakpoint ? <MobileFooter /> : <DesktopFooter />}
      </div>
      <div
        css={css`
          display: flex;
          justify-content: ${isMobileBreakpoint ? "center" : "flex-end"};
          margin-top: ${isMobileBreakpoint ? 64 : 32}px;
        `}
      >
        <FeatherArchLogo height={88} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  isMobileBreakpoint: getIsMobileBreakpoint(state),
});

export default connect(mapStateToProps)(Footer);
