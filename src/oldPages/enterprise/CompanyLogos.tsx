/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

import Header4 from "../../ui/headers/Header4";
import { SHADES, BREAKPOINTS } from "../../ui/variables";
import CBSLogo from "../../ui/logos/companyLogos/CBSLogo";
import BreatherLogo from "../../ui/logos/companyLogos/BreatherLogo";
import SquareLogo from "../../ui/logos/companyLogos/SquareLogo";
import NetflixLogo from "../../ui/logos/companyLogos/NetflixLogo";
import TishmanSpeyerLogo from "../../ui/logos/companyLogos/TishmanSpeyerLogo";
import CompassLogo from "../../ui/logos/companyLogos/CompassLogo";
import ShiftLogo from "../../ui/logos/companyLogos/ShiftLogo";
import GreyStarLogo from "../../ui/logos/companyLogos/GreyStarLogo";
import { useSelector } from "react-redux";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";

const HorizontalRule = styled.div`
  height: 1px;
  width: 100%;
  margin: 72px 0;
  background-color: ${SHADES.SHADE_LIGHTER};

  @media ${BREAKPOINTS.MOBILE} {
    margin: 48px 0;
  }
`;

const CompanyLogosContainer = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CompanyLogos = () => {
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <HorizontalRule />
      <Header4>you're in good company</Header4>
      <div
        css={css`
          width: 100%;
          display: grid;
          grid-template-columns: ${isMobileBreakpoint
            ? "repeat(2, 1fr)"
            : "repeat(4, 1fr)"};
          margin-top: ${isMobileBreakpoint ? "48px" : "72px"};
          row-gap: ${isMobileBreakpoint ? "48px" : "64px"};
        `}
      >
        <CompanyLogosContainer>
          <NetflixLogo width={isMobileBreakpoint ? "96" : "140"} />
        </CompanyLogosContainer>
        <CompanyLogosContainer>
          <SquareLogo width={isMobileBreakpoint ? "116" : "146"} />
        </CompanyLogosContainer>
        <CompanyLogosContainer>
          <CBSLogo width={isMobileBreakpoint ? "80" : "116"} />
        </CompanyLogosContainer>
        <CompanyLogosContainer>
          <GreyStarLogo />
        </CompanyLogosContainer>
        <CompanyLogosContainer>
          <TishmanSpeyerLogo width={isMobileBreakpoint ? "136" : "204"} />
        </CompanyLogosContainer>
        <CompanyLogosContainer>
          <CompassLogo width={isMobileBreakpoint ? "108" : "200"} />
        </CompanyLogosContainer>
        <CompanyLogosContainer>
          <BreatherLogo width={isMobileBreakpoint ? "124" : "176"} />
        </CompanyLogosContainer>
        <CompanyLogosContainer>
          <ShiftLogo width={isMobileBreakpoint ? "80" : "100"} />
        </CompanyLogosContainer>
      </div>
      <HorizontalRule />
    </div>
  );
};

export default CompanyLogos;
