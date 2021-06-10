import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { GRID_BREAKPOINTS } from "../variables";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 24px;
  max-width: 1920px;
  margin: auto;
  padding-left: 96px;
  padding-right: 96px;

  @media ${GRID_BREAKPOINTS.TABLET} {
    grid-template-columns: repeat(8, 1fr);
    padding-left: 48px;
    padding-right: 48px;
  }

  @media ${GRID_BREAKPOINTS.MOBILE} {
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 16px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

interface LargeGridInterface {
  columns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  start: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

interface MediumGridInterface {
  columns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  start: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

interface SmallGridInterface {
  columns: 1 | 2 | 3 | 4;
  start: 1 | 2 | 3 | 4;
}

interface GridParams {
  small: SmallGridInterface;
  large: LargeGridInterface;
  medium: MediumGridInterface;
}

export const getGridStyle = ({
  small: { start: mobileStart = 1, columns: mobileColumns = 4 },
  large: { start: desktopStart = 1, columns: desktopColumns = 12 },
  medium: { start: tabletStart = 1, columns: tabletColumns = 8 },
}: GridParams) => css`
  align-self: stretch;
  grid-column: ${desktopStart} / span ${desktopColumns};

  @media ${GRID_BREAKPOINTS.TABLET} {
    grid-column: ${tabletStart} / span ${tabletColumns};
  }

  @media ${GRID_BREAKPOINTS.MOBILE} {
    grid-column: ${mobileStart} / span ${mobileColumns};
  }
`;
