/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Paragraph1 from "../paragraphs/Paragraph1";
import { BRAND } from "../variables";

interface Props {
  mainTitle: string;
  featherPrice: number;
}

const ItemCardCenteredDescription = ({ mainTitle, featherPrice }: Props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 32px;
        text-align: center;

        div {
          &:before,
          &:after {
            content: "";
            position: absolute;
            bottom: -3px;
            width: 0;
            height: 1px;
            opacity: 0;
            background-color: ${BRAND.PRIMARY_TEXT};
            transition: all 0.3s linear;
          }

          &:before {
            right: 50%;
          }

          &:after {
            left: 50%;
          }
        }

        &:hover {
          div {
            &:before,
            &:after {
              opacity: 1;
              width: 50%;
            }
          }
        }
      `}
    >
      <div
        css={css`
          position: relative;
          margin-bottom: 8px;
        `}
      >
        <Paragraph1>{mainTitle}</Paragraph1>
      </div>

      <Paragraph1
        color={BRAND.SECONDARY_TEXT}
      >{`$${featherPrice}/mo`}</Paragraph1>
    </div>
  );
};
export default ItemCardCenteredDescription;
