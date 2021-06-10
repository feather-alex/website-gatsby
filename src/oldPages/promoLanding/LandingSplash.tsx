/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header1 from '../../ui/headers/Header1';
import Paragraph1 from '../../ui/paragraphs/Paragraph1';
import Button, { ButtonStyle } from '../../ui/buttons/Button';
import { BRAND, BREAKPOINTS, SHADES } from '../../ui/variables';
import FeatherLogo from '../../ui/logos/FeatherWordMarkLogo';
import CoverImage from '../../ui/images/CoverImage';
import Title2 from '../../ui/titles/Title2';
import Title3 from '../../ui/titles/Title3';
import LandingMarquee from './LandingMarquee';
import { Z_INDICIES } from '../../ui/zIndicies';

interface Props {
  isMobile: boolean;
}

const LandingSplash = (props: Props) => {
  const coverImageSubText = props.isMobile ? (
    <div className="cover-image-subtext">
      <Title3>Akepa nightstand</Title3>
      <Title3>starting at $12/mo</Title3>
    </div>
  ) : (
    <div className="cover-image-subtext">
      <Title2 isBold={true}>Akepa nightstand</Title2>
      <Title2 isBold={true}>starting at $12/mo</Title2>
    </div>
  );

  return (
    <div
      css={css`
        display: flex;
        height: 100vh;
        width: 100vw;

        @media ${BREAKPOINTS.MOBILE} {
          flex-direction: column;
          height: unset;
        }
      `}
    >
      <div
        className="landing-splash"
        css={css`
          background: ${BRAND.BACKGROUND};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 50%;
          height: 100%;
          position: relative;
          z-index: ${Z_INDICIES.LANDING_SPLASH};

          .cover-image {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 40px;
            position: relative;
            z-index: ${Z_INDICIES.LANDING_SPLASH_IMAGE};

            .cover-image-subtext {
              display: flex;
              justify-content: space-between;
              width: 100%;
            }
          }

          @media ${BREAKPOINTS.MOBILE} {
            order: 2;
            width: 100%;
            min-height: 553px;
            padding: 20% 7%;

            .cover-image {
              padding: 10px;
            }
          }
        `}
      >
        <LandingMarquee isMobile={props.isMobile} />

        <CoverImage
          to="/products/akepa-nightstand"
          src="https://img.livefeather.com/pages-new/Landing/AkepaNightstand.png?auto=compress&sat=18&q=15&w=700&dpr=1.8"
          subText={coverImageSubText}
          isMobile={props.isMobile}
        />
      </div>

      <div
        css={css`
          background: ${BRAND.PRIMARY};
          padding: 58px 6vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          color: white;
          flex: 50%;
          height: 100%;

          @media ${BREAKPOINTS.MOBILE} {
            order: 1;
            width: 100%;
            min-height: 481px;
            padding: 80px 27px;
          }
        `}
      >
        <FeatherLogo to="/" isInverted={true} />

        <div
          css={css`
            div:first-of-type {
              margin-bottom: 24px;
            }

            @media ${BREAKPOINTS.MOBILE} {
              div:first-of-type {
                margin-bottom: 15px;
              }
            }
          `}
        >
          {props.isMobile ? (
            <Header1 color={SHADES.WHITE}>$50 off your first month</Header1>
          ) : (
            <Header1 color={SHADES.WHITE}>
              Get $50 off your first month with code <span style={{ textDecoration: 'underline' }}>NYC</span>
            </Header1>
          )}

          {props.isMobile ? (
            <Paragraph1 color={SHADES.WHITE}>
              Use code <span style={{ textDecoration: 'underline' }}>NYC</span> at checkout
            </Paragraph1>
          ) : (
            <Paragraph1 color={SHADES.WHITE}>
              <span style={{ fontWeight: 500 }}>Furniture now, decisions later:</span> stylish furniture with none of
              the upfront cost, delivered &amp; assembled by our team
            </Paragraph1>
          )}
        </div>

        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            div {
              margin-top: 23px;
            }
          `}
        >
          <Button to="/how-it-works" style={ButtonStyle.PRIMARY_INVERTED}>
            Learn more
          </Button>

          {!props.isMobile && (
            // TODO Consult design here
            <Button style={ButtonStyle.TEXT} to="/style-quiz" color={SHADES.WHITE}>
              Take our style quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingSplash;
