/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import DropdownIcon from "../../assets/icons/ui-elements/dropdown_arrow.svg";
import CaratIcon, { Direction } from "../icons/small/CaratIcon";
import { BRAND, SHADES } from "../variables";
import BootstrapDropdown from "react-bootstrap/lib/Dropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";
export { MenuItem };

export interface Props {
  id: string;
  className?: string;
  title: string;
  isDefaultStyle?: boolean;
  dataCy?: string;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: any;
  children: React.ReactNode;
}

const Dropdown = ({
  id,
  className,
  onSelect,
  isDefaultStyle = true,
  dataCy,
  title,
  children,
}: Props) => {
  return (
    <BootstrapDropdown
      id={id}
      className={className}
      data-cy={dataCy}
      onSelect={onSelect}
      css={
        isDefaultStyle &&
        css`
          display: flex;
          border: 1px solid ${BRAND.PRIMARY_TEXT};
          align-items: center;
          color: ${BRAND.PRIMARY_TEXT};
          height: 46px; // really 44px, the top & bottom border take up 1px
          width: 272px;
          padding: 0 16px;

          // below css needed to remove bootstrap styles
          .dropdown-toggle {
            font-size: 16px;
            padding: 0;
            border: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            background-color: ${BRAND.BACKGROUND};
          }

          .dropdown-menu {
            padding: 0;
            background-color: ${BRAND.BACKGROUND};
            width: 100%;
            border-radius: 0;
            border: none;
            outline: 1px solid ${SHADES.BLACK};

            top: 98%;
          }

          li {
            height: 44px;

            a {
              color: ${BRAND.PRIMARY_TEXT};
              line-height: 1.2;
              font-size: 16px;
              height: 100%;
              padding: 12px 16px;

              &:focus {
                outline: none;
              }

              &:hover {
                background-color: ${BRAND.ACCENT};
              }
            }
          }
        `
      }
    >
      <BootstrapDropdown.Toggle noCaret={true}>
        <span
          css={css`
            color: ${BRAND.PRIMARY_TEXT};
          `}
        >
          {title}
        </span>
        {isDefaultStyle ? (
          <CaratIcon direction={Direction.Down} />
        ) : (
          <DropdownIcon />
        )}
      </BootstrapDropdown.Toggle>
      <BootstrapDropdown.Menu>{children}</BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
};

export default Dropdown;
