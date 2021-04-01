import styled from "@emotion/styled";

import { GRID_BREAKPOINTS } from "../../ui/variables";
import { Z_INDICIES } from "../../ui/zIndicies";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderDisplay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  @media ${GRID_BREAKPOINTS.MOBILE} {
    flex-direction: column;
  }
`;

export const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  z-index: ${Z_INDICIES.HOMEPAGE_HEADER_TEXT};

  & p {
    margin: 16px 0 48px;
    max-width: 650px;
  }

  @media ${GRID_BREAKPOINTS.TABLET} {
    width: 50%;
    padding: 16px 24px 16px 48px;
  }

  @media ${GRID_BREAKPOINTS.MOBILE} {
    width: 100%;
    padding: 16px 24px 24px;
    position: unset;
    order: 2;

    & p {
      margin: 16px 0 24px;
    }
  }

  @media ${GRID_BREAKPOINTS.DESKTOP} {
    width: 50%;
    padding: 32px 16px 32px 96px;
  }
`;

export const CTAContainer = styled.div`
  width: 100%;
  ${({ isMobileBreakpoint }: { isMobileBreakpoint: boolean }) =>
    !isMobileBreakpoint &&
    `display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              `}

  * {
    ${({ isMobileBreakpoint }: { isMobileBreakpoint: boolean }) =>
      isMobileBreakpoint ? "width: 100%;" : ""}
    margin-bottom: 16px;
    margin-right: 16px;
  }
`;

export const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  z-index: ${Z_INDICIES.HOMEPAGE_HEADER};

  @media ${GRID_BREAKPOINTS.MOBILE} {
    width: 100%;
    order: 1;
    margin-bottom: 24px;
  }
`;
