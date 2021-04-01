/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
// import FreshChatIcon from "../components/FreshChatIcon";
// import Navbar from "./navbar/Navbar";
// import Footer from "../ui/footers/Footer";
import { BRAND } from "../ui/variables";

class Layout extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { children } = this.props;

    return (
      <div
        css={css`
          background-color: ${BRAND.BACKGROUND};
        `}
      >
        {/* <Navbar /> */}
        <div>{children}</div>
        {/* <Footer isMobileBreakpoint={false} /> */}
        {/* <FreshChatIcon /> */}
      </div>
    );
  }
}

export default Layout;
