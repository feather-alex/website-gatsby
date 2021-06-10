/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import HamburgerMenuIcon from '../../../ui/icons/HamburgerMenuIcon';

interface Props {
  onClick: () => void;
}

const HamburgerMenu = ({ onClick }: Props) => (
  <div
    role="button"
    tabIndex={0}
    data-cy="hamburger-menu"
    css={css`
      display: flex;
      height: 100%;
      cursor: pointer;
      padding: 5px;
    `}
    onClick={onClick}
  >
    <HamburgerMenuIcon />
  </div>
);

export default HamburgerMenu;
