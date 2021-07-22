/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Layout from "../../../app/Layout";
import Header2 from "../../../ui/headers/Header2";
import Paragraph1 from "../../../ui/paragraphs/Paragraph1";
import { BRAND, BREAKPOINTS } from "../../../ui/variables";

const Paragraph = styled(Paragraph1)`
  margin-top: 30px;
`;

const OFACCheckFailed = () => (
  <Layout>
    <div
      data-cy="ofac-check-failed-message"
      css={css`
        width: 100vw;
        background-color: ${BRAND.BACKGROUND};
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 140px 0 120px;
        @media ${BREAKPOINTS.MOBILE} {
          padding: 100px 0 80px;
        }
      `}
    >
      <Header2>We're sorry</Header2>
      <div
        css={css`
          max-width: 635px;
          text-align: center;

          @media ${BREAKPOINTS.MOBILE} {
            max-width: 90vw;
          }
        `}
      >
        <Paragraph>
          We are unable to further process your order as your name has been
          identified on a U.S Department of Treasury’s Office of Foreign Assets
          Control sanctions list.
        </Paragraph>
        <Paragraph>
          If you have any questions, please contact the U.S. Department of
          Treasury’s Office of Foreign Assets Control directly for further
          information{" "}
          <a
            href="https://www.treasury.gov/about/organizational-structure/offices/Pages/Office-of-Foreign-Assets-Control.aspx#fragment-7"
            target="_blank"
            rel="noopener noreferrer"
            css={css`
              text-decoration: underline;
            `}
          >
            here
          </a>
          .
        </Paragraph>
      </div>
    </div>
  </Layout>
);

export default OFACCheckFailed;
