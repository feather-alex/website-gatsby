/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Paragraph1 from "../paragraphs/Paragraph1";
import { BRAND } from "../variables";
import { MembershipState } from "../../app/store/plan/plan.types";

interface Props {
  mainTitle: string;
  featherPrice: number;
  isMobileBreakpoint: boolean;
  shouldShowFromPrice?: boolean;
  membershipState: MembershipState;
}

const ItemCardPLPDescription = ({
  mainTitle,
  featherPrice,
  isMobileBreakpoint,
  shouldShowFromPrice,
  membershipState,
}: Props) => {
  return (
    <div
      data-cy="product-card-description"
      css={css`
        width: 100%;
        margin-top: ${isMobileBreakpoint ? "16px" : "32px"};
        margin-bottom: ${isMobileBreakpoint ? "24px" : "40px"};
      `}
    >
      <div
        css={css`
          text-align: center;
        `}
      >
        <Paragraph1>{mainTitle}</Paragraph1>

        <Paragraph1 color={BRAND.SECONDARY_TEXT}>
          {`${
            membershipState === MembershipState.NONE || shouldShowFromPrice
              ? "from "
              : ""
          }$${featherPrice}/mo`}
        </Paragraph1>
      </div>
    </div>
  );
};
export default ItemCardPLPDescription;
