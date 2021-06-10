/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { BREAKPOINTS } from '../../../ui/variables';

interface Props {
  backgroundColor: string;
  children: React.ReactNode;
}

const Banner = ({ backgroundColor, children }: Props) => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      background-color: ${backgroundColor};
      transition: background-color 300ms linear;

      @media ${BREAKPOINTS.BANNER} {
        flex-direction: row;
        text-align: left;
        padding: 0 48px;
      }

      @media ${BREAKPOINTS.MOBILE} {
        flex-direction: column;
        text-align: center;
        padding: 0 48px;
      }
    `}
  >
    {children}
  </div>
);

export default Banner;
