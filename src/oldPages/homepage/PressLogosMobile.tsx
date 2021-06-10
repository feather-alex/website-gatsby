/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import Header4 from '../../ui/headers/Header4';
import ForbesLogo from '../../ui/logos/pressLogos/ForbesLogo';
import NYTimesLogo from '../../ui/logos/pressLogos/NYTimesLogo';
import Refinery29Logo from '../../ui/logos/pressLogos/Refinery29Logo';
import TechCrunchLogo from '../../ui/logos/pressLogos/TechCrunchLogo';
import VogueLogo from '../../ui/logos/pressLogos/VogueLogo';

const PressLogosMobile = () => {
  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px 0 64px;

        * {
          margin: 32px;
        }
      `}
    >
      <Header4>Making a splash in</Header4>
      <ForbesLogo />
      <VogueLogo />
      <NYTimesLogo />
      <TechCrunchLogo />
      <Refinery29Logo />
    </section>
  );
};

export default PressLogosMobile;
