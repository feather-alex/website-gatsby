/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Header2 from "../headers/Header2";
import Header3 from "../headers/Header3";
import Paragraph1 from "../paragraphs/Paragraph1";
import Button, { ButtonStyle } from "../buttons/Button";
import { SHADES } from "../variables";

interface Props {
  headerText: string;
  paragraphText: string;
  buttonText: string;
  onClick?: (event: React.MouseEvent) => void;
  to?: string;
  isMobile: boolean;
  isInverted?: boolean;
  isCentered?: boolean;
  dataCy?: string;
}

const SectionWithButton = (props: Props) => {
  const Header = props.isMobile ? Header3 : Header2;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        ${props.isCentered ? "align-items: center;" : ""};
        ${props.isInverted ? `color: ${SHADES.WHITE};` : ""}

        > p {
          margin: 24px 0 44px;
        }
      `}
    >
      <Header>{props.headerText}</Header>
      <Paragraph1>{props.paragraphText}</Paragraph1>
      <Button
        dataCy="button-in-section"
        style={ButtonStyle.PRIMARY_INVERTED}
        data-cy={props.dataCy}
        onClick={props.onClick}
        to={props.to}
      >
        {props.buttonText}
      </Button>
    </div>
  );
};

export default SectionWithButton;
