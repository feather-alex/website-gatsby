/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Title1 from "../titles/Title1";
import Paragraph2 from "../paragraphs/Paragraph2";

interface Props {
  titleText: string;
  paragraphText: string;
  firstOfType?: boolean;
}

const ParagraphWithTitle = ({
  titleText,
  paragraphText,
  firstOfType,
}: Props) => {
  return (
    <div
      css={css`
        > p:first-of-type {
          margin-bottom: 16px;
          ${firstOfType ? "margin-top: 64px;" : "margin-top: 40px;"}
        }
      `}
    >
      <Title1 isBold={true}>{titleText}</Title1>
      <Paragraph2>{paragraphText}</Paragraph2>
    </div>
  );
};

export default ParagraphWithTitle;
