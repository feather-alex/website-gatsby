/** @jsx jsx **/
import { css, jsx } from '@emotion/core';
import AccountMenu, { DisplayMode } from '../../../pages/account/AccountMenu';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import NavDropdown from './NavDropdown';

interface Props {
  isVisible: boolean;
  bodyMarginTop: number;
  isAuthenticated: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
}

const AccountDropdown = ({ isVisible, bodyMarginTop, isAuthenticated, handleMouseOver, handleMouseOut }: Props) => (
  <NavDropdown
    isVisible={isVisible}
    bodyMarginTop={bodyMarginTop}
    alignRight={true}
    flexColumn={true}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
  >
    {isAuthenticated ? (
      <AccountMenu displayMode={DisplayMode.Navbar} />
    ) : (
      <div
        data-cy="nav-account-dropdown"
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          width: 215px;
          text-align: right;
        `}
      >
        <div
          css={css`
            margin-bottom: 28px;
          `}
        >
          <Paragraph2>Current customers can manage their Feather account online</Paragraph2>
        </div>
        <div
          css={css`
            a {
              margin-bottom: 8px;
            }
          `}
        >
          <Button to="/login" isFullWidth={true}>
            Log in
          </Button>
          <Button style={ButtonStyle.TERTIARY} to="/setup-account">
            Activate account
          </Button>
        </div>
      </div>
    )}
  </NavDropdown>
);

export default AccountDropdown;
