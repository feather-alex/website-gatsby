/** @jsx jsx */
import { ReactNode } from "react";
import { jsx, css } from "@emotion/core";
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import Navbar from "../app/navbar/Navbar";
import FooterAlternate from "../components/FooterAlternate";
import { BRAND } from "../ui/variables";
import { State as GlobalState } from "../types/ReduxState";
import { getBodyMarginTop } from "./store/dimensions/dimensions.selectors";

interface StateProps {
  bodyMarginTop: number;
}

interface OwnProps {
  children: ReactNode;
}

type Props = StateProps & OwnProps;

const AlternateLayout = ({ bodyMarginTop, children }: Props) => (
  <div
    css={css`
      background-color: ${BRAND.BACKGROUND};
    `}
  >
    <Navbar />
    <div
      css={css`
        margin-top: ${bodyMarginTop}px;
        transition: margin-top 400ms linear;
        min-height: 100vh;
      `}
    >
      {children}
      <FooterAlternate />
    </div>
  </div>
);

const mapState = (state: GlobalState): StateProps => ({
  bodyMarginTop: getBodyMarginTop(state),
});

export default compose(withRouter, connect(mapState))(AlternateLayout);
