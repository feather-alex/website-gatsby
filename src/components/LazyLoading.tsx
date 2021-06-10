/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';
import { BREAKPOINTS, BRAND } from '../ui/variables';

const splashPages = ['/about', '/faqs', '/search', '/contact', '/reviews', '/privacy-policy', '/terms-and-conditions'];

const LazyLoading = () => {
  const location = useLocation();
  const currentUrl = location.pathname;

  if (splashPages.includes(currentUrl)) {
    return (
      <div
        css={css`
          width: 100vw;
          height: 100vh;
        `}
      >
        <div
          css={css`
            height: 70%;
            max-height: 604px;
            margin: 43px 16px 16px;
            background: ${BRAND.BACKGROUND};
            @media ${BREAKPOINTS.MOBILE} {
              margin: 43px 0 0;
            }
          `}
        />
      </div>
    );
  } else {
    return (
      <div
        css={css`
          height: 100vh;
        `}
      >
        <Loading />
      </div>
    );
  }
};

export default LazyLoading;
