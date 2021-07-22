import styled from "@emotion/styled";
import { BRAND } from "../../../../ui/variables";

export const ScrollableContainer = styled.div`
  flex: 1 1;
  /* This little trick is so that we show the < arrow, which would be hidden otherwise */
  margin-left: -32px;
  padding-left: 32px;
  overflow-y: auto;
  /* Needed to click on last link - otherwise, link is behind the FooterFade and not easily clickable */
  margin-bottom: 32px;
`;

export const FixedFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FooterFade = styled.div`
  position: fixed;
  bottom: ${({ bottom }: { bottom: number }) => bottom}px;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0) 0,
    ${BRAND.BACKGROUND} 70%
  );
  height: 60px;
  width: 100%;
`;

export const LinkContainer = styled.div`
  & p,
  h4 {
    line-height: 27px;
    margin-bottom: 8px;
  }
  & h4 {
    letter-spacing: 1px;
  }
`;
