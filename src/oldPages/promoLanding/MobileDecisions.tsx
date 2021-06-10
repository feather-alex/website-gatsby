/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { BRAND } from '../../ui/variables';
import SofaSvg from '../../assets/icons/sofa_icon.svg';
import Title1 from '../../ui/titles/Title1';
import Title2 from '../../ui/titles/Title2';

const MobileDecisions = () => {
  return (
    <div
      css={css`
        background-color: ${BRAND.BACKGROUND};
        padding: 56px 34px;
        text-align: center;

        @media screen and (max-width: 320px) {
          padding: 56px 40px;
        }
      `}
    >
      <Title1 isBold={true}>Furniture now. Decisions later.</Title1>

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          margin-top: 34px;

          p {
            width: 60%;
            margin-left: 20px;
          }

          @media screen and (max-width: 320px) {
            text-align: center;

            svg {
              display: none;
            }

            div {
              width: 100%;
            }
          }
        `}
      >
        <SofaSvg />
        <Title2 isBold={true}>
          Stylish furniture with none of the upfront cost, delivered &amp; assembled by our team
        </Title2>
      </div>
    </div>
  );
};

export default MobileDecisions;
