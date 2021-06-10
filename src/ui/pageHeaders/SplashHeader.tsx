/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Header1 from "../headers/Header1";
import { MARGINS, BREAKPOINTS } from "../variables";

interface Props {
  imageUrl: string;
  children: JSX.Element | string;
}

const SplashHeader = (props: Props) => {
  const cssStyles = `
    height: 70vh;
    max-height: 604px;
    max-width: 100%;
    margin: 43px ${MARGINS.DESKTOP} ${MARGINS.DESKTOP};
    background-image: url(${props.imageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;

    > div {
      text-align: center;
      max-width: 930px;
      color: white;
    }

    @media ${BREAKPOINTS.MOBILE} {
      width: 100vw;
      margin: 43px 0 0;
      padding: 0 ${MARGINS.MOBILE};
    }
  `;

  return (
    <div
      css={css`
        ${cssStyles}
      `}
    >
      <Header1>{props.children}</Header1>
    </div>
  );
};

export default SplashHeader;
