/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import SectionWithButton from "../textLockups/SectionWithButton";
import { MARGINS } from "../variables";

interface Props {
  imageUrl: string;
  header: string;
  paragraph: string;
  button: string;
  onClick?: (event: React.MouseEvent) => void;
  to?: string;
  isMobile: boolean;
}

const ImagePreFooter = (props: Props) => {
  return (
    <div
      css={css`
        background-image: url(${props.imageUrl});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        ${props.isMobile
          ? `padding: 90px ${MARGINS.MOBILE};`
          : "padding: 175px 15vw;"}

        > div {
          max-width: 400px;
        }
      `}
    >
      <SectionWithButton
        headerText={props.header}
        paragraphText={props.paragraph}
        buttonText={props.button}
        onClick={props.onClick}
        to={props.to}
        isMobile={props.isMobile}
        isInverted={true}
        isCentered={true}
      />
    </div>
  );
};

export default ImagePreFooter;
