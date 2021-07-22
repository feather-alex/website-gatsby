/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import Header4 from "../../ui/headers/Header4";
import ABCNewsLogo from "../../ui/logos/pressLogos/ABCNewsLogo";
import ArchDigestLogo from "../../ui/logos/pressLogos/ArchDigestLogo";
import CBSLogo from "../../ui/logos/pressLogos/CBSLogo";
import ForbesLogo from "../../ui/logos/pressLogos/ForbesLogo";
import NYTimesLogo from "../../ui/logos/pressLogos/NYTimesLogo";
import Refinery29Logo from "../../ui/logos/pressLogos/Refinery29Logo";
import TechCrunchLogo from "../../ui/logos/pressLogos/TechCrunchLogo";
import VogueLogo from "../../ui/logos/pressLogos/VogueLogo";
import WashPostLogo from "../../ui/logos/pressLogos/WashPostLogo";
import WSJLogo from "../../ui/logos/pressLogos/WSJLogo";
import { SHADES } from "../../ui/variables";

const LogoRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: space-between;
  margin: 32px auto;

  *:not(:last-child) {
    margin-right: 32px;
  }
`;

const PressLogosDesktop = () => {
  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 64px 0;
        background-color: ${SHADES.WHITE};
      `}
    >
      <Header4>Making a splash in</Header4>

      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 48px;
        `}
      >
        <LogoRow>
          <ForbesLogo />
          <VogueLogo />
          <NYTimesLogo />
          <TechCrunchLogo />
          <Refinery29Logo />
        </LogoRow>
        <LogoRow>
          <CBSLogo />
          <WashPostLogo />
          <ArchDigestLogo />
          <WSJLogo />
          <ABCNewsLogo />
        </LogoRow>
      </div>
    </section>
  );
};

export default PressLogosDesktop;
