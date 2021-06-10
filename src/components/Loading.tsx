/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { ReactNode } from 'react';

import Caption from '../ui/captions/Caption';
import Subheader2 from '../ui/subheaders/Subheader2';
import { BRAND, SHADES, BREAKPOINTS } from '../ui/variables';
import LoadingFeatherArch from '../ui/miscellaneous/LoadingFeatherArch';

interface Props {
  message?: ReactNode;
  className?: string;
}

const Loading = ({ message, className }: Props) => (
  <div
    className={className}
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 48px;
      height: 100%;
      width: 100%;
      background-color: ${BRAND.BACKGROUND};
      & small {
        margin-top: 16px;
        text-align: center;
      }
      & h6 {
        margin-top: 24px;
        max-width: 345px;
        text-align: center;
      }
      @media ${BREAKPOINTS.MOBILE} {
        padding: 48px 0;
      }
    `}
  >
    <LoadingFeatherArch />
    {message && <Subheader2 color={SHADES.SHADE_DARK}>{message}</Subheader2>}
    <Caption color={SHADES.SHADE_LIGHT}>Loading...</Caption>
  </div>
);

export default Loading;
