/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND, BREAKPOINTS } from "../../ui/variables";
import Header3 from "../../ui/headers/Header3";
import ReviewContainer from "./ReviewContainer";
import Button, { ButtonStyle } from "../../ui/buttons/Button";

const LandingReviews = () => {
  return (
    <div
      css={css`
        background-color: ${BRAND.ACCENT};
        padding: 100px 10vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: center;

        @media ${BREAKPOINTS.MOBILE} {
          > div:nth-of-type(1) {
            padding: 0 10vw;
          }
        }

        @media screen and (max-width: 370px) {
          > div:nth-of-type(1) {
            padding: 0 8vw;
          }
        }
      `}
    >
      <Header3>Why New Yorkers go for Feather</Header3>

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          text-align: center;
          margin: 64px 0 80px;
          width: 100%;

          @media ${BREAKPOINTS.MOBILE} {
            flex-direction: column;
            align-items: center;

            > div:nth-of-type(2) {
              margin: 64px 0;
            }
          }
        `}
      >
        <ReviewContainer
          review={`“The furniture is absolutely stunning... and the pieces are such standouts. I'm so happy with my experience”`}
          reviewer="Jerad H., Lower East Side"
        />

        <ReviewContainer
          review={`“Got exactly what I wanted. Delivery was frictionless. Way easier than schlepping furniture all over town.”`}
          reviewer="Adrian P., Greenwich Village"
        />

        <ReviewContainer
          review={`“I’ve been using Feather ever since I moved to NY and they always go above and beyond to take care of me.”`}
          reviewer="Jon M., Crown Heights"
        />
      </div>

      <Button style={ButtonStyle.TERTIARY} to="/reviews">
        Read more reviews
      </Button>
    </div>
  );
};

export default LandingReviews;
