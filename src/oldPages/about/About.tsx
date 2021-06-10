/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Layout from '../../app/Layout';
import Analytics from '../../analytics/analytics';
import PAGES from '../../analytics/pages';
import HashLinkId from '../../components/HashLinkId';
import Helmet from '../../components/Helmet';
import { BREAKPOINTS, COLORS } from '../../ui/variables';
import JobsAtFeather from './JobsAtFeather';
import useMount from '../../utils/useMount';
import Header1 from '../../ui/headers/Header1';
import BaseImage from '../../ui/images/BaseImage';
import { useSelector } from 'react-redux';
import { getIsMobileBreakpoint } from '../../app/store/dimensions/dimensions.selectors';
import Header3 from '../../ui/headers/Header3';
import Subheader2 from '../../ui/subheaders/Subheader2';
import Paragraph1 from '../../ui/paragraphs/Paragraph1';
import ImageWithText from '../../ui/pageElements/ImageWithText';
import Header2 from '../../ui/headers/Header2';

const TITLE = 'About Feather';
const DESCRIPTION = `Feather is a flexible, affordable, and sustainable way to get beautiful
  furniture, without the commitment. Learn about our team & careers.`;
const IMAGE_CAREERS = 'https://img.livefeather.com/pages-new/About/office2.jpg';
const IMAGE_HERO = 'https://img.livefeather.com/pages-new/About/about-hero.png';

const Spacer = styled.div`
  padding: 64px;
`;

const getParagraphText = (headerText: string, paragraphText: string) => (
  <div
    css={css`
      width: 100%;
      & p {
        padding: 16px 0 0;
      }
    `}
  >
    <Header3>{headerText}</Header3>
    <Paragraph1>{paragraphText}</Paragraph1>
  </div>
);

const About = () => {
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const Header = isMobileBreakpoint ? Header3 : Header1;
  useMount(() => {
    Analytics.trackPage(PAGES.ABOUT);
  });

  return (
    <Layout>
      <Helmet
        title={TITLE}
        description={DESCRIPTION}
        imageUrl={`https://img.livefeather.com/pages-new/About/Image.png?fm=jpg&w=600&auto=compress&sat=35&q=90&sharp=20&dpr=1.2`}
      />
      <header
        css={css`
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: ${isMobileBreakpoint ? 210 : 518}px;
          & h1,
          h3 {
            max-width: ${isMobileBreakpoint ? 237 : 704}px;
            text-align: center;
            z-index: 1;
          }
          & img {
            position: absolute;
          }
        `}
      >
        <BaseImage imgUrl={IMAGE_HERO} />
        <Header>Keeping Furniture in Homes and out of Landfills</Header>
      </header>
      <section
        css={css`
          background: ${COLORS.CLOUD};
          display: flex;
          justify-content: center;
          ${isMobileBreakpoint
            ? ''
            : `
          & h6 {
            text-align: center;
            max-width: 1111px;
          }
          `}
          padding: ${isMobileBreakpoint ? '64px 24px 80px' : '134px 32px'};
        `}
      >
        <Subheader2>
          Feather launched in 2017 with a simple concept—furniture that fits the way we live today. City renters move on
          average every 1-2 years. Tastes evolve, living arrangements change, budgets fluctuate, and many can’t afford
          or don’t want to commit to quality furniture so they end up resorting to cheaper alternatives that aren’t
          built to last. As a result, 20 billion pounds of furniture end up in landfills annually (that’s about the same
          amount of plastic that ends up in the oceans every year). This pattern isn’t sustainable.
          <br />
          <br />
          We believe furniture shouldn’t involve so much compromise. Affordable and well-made. Convenient and
          sustainable. Smart and stylish. These things are all possible with Feather. We built a more responsible
          approach to furniture, one that’s grounded in rental, reuse, and refurbishment. There’s still a lot of work to
          be done, but we’re proud to be offering a more circular approach and helping a new generation of renters
          create homes they love even when life is in motion.
        </Subheader2>
      </section>
      <section
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          & h2 {
            text-align: center;
            max-width: 712px;
            padding: ${isMobileBreakpoint ? '0 24px' : '0 32px'};
          }
          & > p {
            text-align: center;
            max-width: 776px;
            padding: ${isMobileBreakpoint ? '24px' : '32px 32px 56px'};
          }
          padding: ${isMobileBreakpoint ? '88px 0 24px' : '88px 0 196px'};
        `}
      >
        <Header2>Our Standards</Header2>
        <Paragraph1>
          We take immense pride in our work, in the quality of our product, and the excellence of the Feather
          experience. These are the ground rules that guide our processes, our partnerships, and help us operate a
          revolutionary and responsible business.
        </Paragraph1>
        <ImageWithText
          isMobileBreakpoint={isMobileBreakpoint}
          paragraphText={getParagraphText(
            '1. Feather furniture is built to last',
            'Our products meet the highest standards of durability and are resilient enough for homes with kids, pets, couch surfers, and everyone in between. Plus, most of our pieces are built with performance fabrics and constructed from a component part design system making them easy to clean and refurbish. This helps ensure that our furniture can be reused, redeployed, and remain out of landfills. '
          )}
          imageUrl="https://img.livefeather.com/pages-new/About/built-to-last.png"
        />
        {!isMobileBreakpoint && <Spacer />}
        <ImageWithText
          isMobileBreakpoint={isMobileBreakpoint}
          paragraphText={getParagraphText(
            '2. Feather furniture is responsibly cleaned and cared for',
            'Our strict refurbishment process allows us to guarantee the quality of every gently used item that arrives in your home. Upon pickup, we sanitize our furniture in professional facilities using non-toxic cleaning agents and processes that neutralize any bacteria and odor. From there, our team members oversee all repairs and personally inspect each item before signing off on redeployment. When furniture can no longer meet our rigorous standard for customer satisfaction, we retire it through charity channels.'
          )}
          imageUrl="https://img.livefeather.com/pages-new/About/cared-for.png"
          imageSide="left"
        />
        {!isMobileBreakpoint && <Spacer />}
        <ImageWithText
          isMobileBreakpoint={isMobileBreakpoint}
          paragraphText={getParagraphText(
            '3. Feather furniture is working towards a better future',
            'As a furniture company we feel a keen sense of responsibility for the toll that our industry has historically taken on the environment, particularly when it comes to logging and deforestation. In an effort to pave a more sustainable path forward, we’re proud to offer completely carbon-neutral deliveries in our service areas. Additionally, through a partnership with Pachama®, we actively support reforestation efforts in areas that produce FSC certified wood (a material that you’ll find in many of our products.) By responsibly replenishing our supply chain, we get even closer to becoming a truly circular business.'
          )}
          imageUrl="https://img.livefeather.com/pages-new/About/better-future.png"
        />
      </section>
      <section>
        <HashLinkId id="careers" />

        <JobsAtFeather imageUrl={IMAGE_CAREERS} />

        {/* Below div needed for layout */}
        <div
          css={css`
            height: 100px;
            width: 100%;

            @media ${BREAKPOINTS.MOBILE} {
              display: none;
            }
          `}
        />
      </section>
    </Layout>
  );
};

export default About;
