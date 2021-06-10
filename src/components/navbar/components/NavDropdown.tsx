import styled from '@emotion/styled';
import { BRAND } from '../../../ui/variables';
import { Z_INDICIES } from '../../../ui/zIndicies';

interface NavDropdownProps {
  isVisible: boolean;
  bodyMarginTop: number;
  alignRight?: boolean;
  flexColumn?: boolean;
  grid?: string;
}

const NavDropdown = styled.div`
  position: fixed;
  top: ${(props: NavDropdownProps) => (props.isVisible ? `${props.bodyMarginTop}px` : '-100vh')};
  left: 0;
  right: 0;
  width: 100%;
  height: 256px;
  ${({ grid, flexColumn, alignRight }: NavDropdownProps) =>
    grid
      ? `
  display: inline-grid;
  grid-template-columns: ${grid};
  `
      : `
  display: flex;
  flex-direction: ${flexColumn ? 'column' : 'row'};
  align-items: ${alignRight ? 'flex-end' : 'flex-start'};
  `}
  padding: 0 48px 40px;
  transition: top 450ms ease-in-out;
  background: ${BRAND.BACKGROUND};
  box-shadow: 0px 16px 24px rgba(51, 51, 51, 0.1);
  z-index: ${Z_INDICIES.NAV_DROPDOWN};
`;

export default NavDropdown;
