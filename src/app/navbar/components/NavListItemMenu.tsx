/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Title2 from "../../../ui/titles/Title2";

interface Props {
  handleOnClick?: () => void;
  handleMouseOver?: () => void;
  handleMouseOut?: () => void;
  linkText: string;
  dataCy?: string;
}

const NavListItemMenu = ({
  handleOnClick,
  handleMouseOver,
  handleMouseOut,
  linkText,
  dataCy,
}: Props) => {
  return (
    <li
      data-cy={dataCy}
      css={css`
        display: flex;
        align-items: stretch;
        justify-content: center;
        margin: 0 18px;
        height: 100%;

        p {
          cursor: pointer;
        }
      `}
    >
      <div
        data-cy={dataCy}
        role="button"
        tabIndex={0}
        onClick={handleOnClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Title2 isAnimated={true}>{linkText}</Title2>
      </div>
    </li>
  );
};

export default NavListItemMenu;
