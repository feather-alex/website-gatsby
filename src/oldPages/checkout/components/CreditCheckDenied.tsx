/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Layout from "../../../app/Layout";
import Header2 from "../../../ui/headers/Header2";
import Paragraph1 from "../../../ui/paragraphs/Paragraph1";
import { BRAND, SHADES, BREAKPOINTS } from "../../../ui/variables";

const CreditCheckDenied = () => (
  <Layout>
    <div
      data-cy="credit-denied-message"
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

          p {
            margin-top: 30px;
          }
        `}
      >
        <Paragraph1>
          Thank you for your interest in Feather. Unfortunately, your credit
          score does not meet our minimum requirement; we’re unable to confirm
          your plan at this time and your card has not been charged. We
          apologize for the inconvenience!
        </Paragraph1>
        <Paragraph1>
          You’ll receive a letter with further information from our credit
          reporting agency, Experian, within 30 days. We’re happy to evaluate
          another credit application for you in the future should your score
          change. If you think this was an error, you can contact Experian
          directly{" "}
          <a
            href="https://www.experian.com/contact/personal-services-contacts.html"
            target="_blank"
            rel="noopener noreferrer"
            css={css`
              text-decoration: underline;
            `}
          >
            here
          </a>
          .
        </Paragraph1>
        <p
          css={css`
            margin-top: 55px;
            color: ${SHADES.SHADE_LIGHT};
          `}
        >
          Please note that the soft credit check that was run will not affect
          your credit score
        </p>
      </div>
    </div>
  </Layout>
);

export default CreditCheckDenied;
