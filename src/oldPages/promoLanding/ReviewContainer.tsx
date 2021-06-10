/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Paragraph1 from '../../ui/paragraphs/Paragraph1';
import StarIcon from '../../ui/icons/FiveStarIcon';
import Title2 from '../../ui/titles/Title2';

interface Props {
  review: string;
  reviewer: string;
  width?: string;
}

const ReviewContainer = (props: Props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 20px;
        max-width: 325px;
      `}
    >
      <StarIcon
        css={css`
          height: 21px;
        `}
      />

      <div
        css={css`
          margin: 15px 0 30px;
        `}
      >
        <Paragraph1>{props.review}</Paragraph1>
      </div>

      <Title2 isBold={true}>{`\u2014 ${props.reviewer}`}</Title2>
    </div>
  );
};

export default ReviewContainer;
