/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Header2 from "../../ui/headers/Header2";
import Header3 from "../../ui/headers/Header3";

interface Props {
  headerText: string;
  isMobileBreakpoint: boolean;
}

const AuthPageHeader = ({ isMobileBreakpoint, headerText }: Props) => {
  const Header = isMobileBreakpoint ? Header3 : Header2;
  return (
    <div
      css={css`
        padding-top: ${isMobileBreakpoint ? "71px" : "131px"};
        text-align: center;
      `}
    >
      <Header>{headerText}</Header>
    </div>
  );
};

export default AuthPageHeader;
