/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Dropdown, MenuItem } from "react-bootstrap";
import { ReasonsForInquiry } from "./store/contact.types";
import { WrappedFieldProps as Props } from "redux-form";
import { BRAND } from "../../ui/variables";
import ArrowIcon, { Direction } from "../../ui/icons/ArrowIcon";

const ReasonForInquiry = ({ input, meta }: Props) => {
  const showError = meta.invalid && meta.touched;
  const primaryColor = showError ? BRAND.ERROR : BRAND.PRIMARY_TEXT;

  return (
    <div
      css={css`
        width: 100%;
        margin: 30px 0 20px;
      `}
    >
      <Dropdown
        onSelect={input.onChange}
        css={css`
          width: 100%;
          border-bottom: 2px solid ${primaryColor};
          display: flex;
          align-items: center;
          color: ${primaryColor};

          // below css needed to remove bootstrap styles
          .dropdown-toggle {
            padding: 0;
            border: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            font-size: 19px;
            background-color: transparent;
          }

          .dropdown-menu {
            width: 100%;
            overflow-x: auto;
            border-radius: 0;
            border: none;
            outline: 1px solid ${BRAND.PRIMARY_TEXT};
            top: 98%;

            li {
              a {
                color: ${BRAND.PRIMARY_TEXT};
                padding: 4px 19px;
                font-size: 16px;

                &:focus {
                  outline: none;
                }
              }
            }
          }
        `}
        key="options"
        id="dropdown-custom-options"
      >
        <Dropdown.Toggle noCaret={true}>
          <span
            css={css`
              color: ${primaryColor};
              font-size: 16px;

              margin-top: 10px;
            `}
          >
            {!input.value.length ? `Choose a reason for inquiry` : input.value}
          </span>
          <ArrowIcon
            color={primaryColor}
            direction={Direction.Down}
            width={15}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.values(ReasonsForInquiry).map(
            (reason: ReasonsForInquiry, index: number) => (
              <MenuItem key={index} eventKey={reason}>
                {reason}
              </MenuItem>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
      {showError && (
        <div
          css={css`
            text-transform: uppercase;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 2px;
            color: ${primaryColor};
            text-align: left;
          `}
        >
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default ReasonForInquiry;
