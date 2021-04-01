/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Header3 from "../headers/Header3";
import EndLine from "../miscellaneous/EndLine";
import { BRAND } from "../variables";

interface Props {
  children: JSX.Element | string;
  dataCy?: string;
}

const DividingHeader = ({ children, dataCy }: Props) => {
  return (
    <div
      data-cy={dataCy}
      css={css`
        margin: 32px 0 24px;
      `}
    >
      <Header3>{children}</Header3>
      <EndLine color={BRAND.PRIMARY_TEXT} marginBottom="8" />
    </div>
  );
};

export default DividingHeader;
