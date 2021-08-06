/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
// import FreshChatIcon from "../components/FreshChatIcon";
import Navbar from "../app/navbar/Navbar";
import Footer from "../ui/footers/Footer";
import { BRAND } from "../ui/variables";

const Layout: React.FC = ({ children }) => (
  <div
    css={css`
      background-color: ${BRAND.BACKGROUND};
    `}
  >
    <Navbar />
    <div>{children}</div>
    <Footer />
    {/* <FreshChatIcon /> */}
  </div>
);

export default Layout;
