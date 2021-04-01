/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { BRAND, SHADES, COLORS } from "../variables";

export enum InputType {
  Checkbox = "checkbox",
  Radio = "radio",
}

const Label = styled.label`
  display: flex;
  position: relative;
  padding-left: 15px;
  cursor: pointer;
`;

interface InputProps {
  error: boolean | undefined;
}

const inputErrorStyles = css`
  border-color: ${BRAND.ERROR};

  span {
    background-color: ${BRAND.ERROR};
    opacity: 0.5;
  }
`;

const Input = styled.input<InputProps>`
  opacity: 0;
  margin-right: 10px;

  &:checked + div {
    border-color: ${COLORS.MINT};

    span {
      background-color: ${COLORS.MINT};
    }

    span:after {
      display: inline;
    }
  }

  &:not(:checked) + div {
    ${({ error }) => error && inputErrorStyles}
  }
`;

const CheckboxWrapper = styled.div`
  position: absolute;
  top: 2px;
  left: 0;
  height: 16px;
  width: 16px;
  border-radius: 2px;
  border: 2px solid ${SHADES.SHADE_LIGHTER};
`;

const radioStyle = css`
  left: 2px;
  top: 2px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  border: 2px solid ${BRAND.PRIMARY_TEXT};
  background-color: ${BRAND.PRIMARY_TEXT};
`;

const checkboxStyle = css`
  top: 50%;
  left: 50%;
  height: 11px;
  width: 9px;
  /* stroke is set to 'black' because svg data url does not support hex code */
  background-image: url("data:image/svg+xml, %3Csvg viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4L3.66667 8L9 1' stroke='black' stroke-width='2' /%3E%3C/svg%3E");
  background-position: center;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  bottom: 1px;
`;

interface CheckboxProps {
  inputType: InputType;
}

const Checkbox = styled.span<CheckboxProps>`
  display: block;
  height: 100%;
  width: 100%;
  background-color: "transparent";
  opacity: 1;

  ${({ inputType }) => inputType === InputType.Radio && "border-radius: 50%;"}

  &:after {
    content: "";
    display: none;
    position: absolute;
    top: 0;
    ${({ inputType }) =>
      inputType === InputType.Radio ? radioStyle : checkboxStyle}
  }
`;

export interface Props {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: string | JSX.Element;
  inputType: InputType;
  className?: string;
  dataCy?: string;
  error?: boolean;
}

const SelectInput = ({
  isChecked,
  onChange,
  children,
  inputType,
  className,
  dataCy,
  error,
}: Props) => {
  return (
    <Label className={className}>
      <Input
        type={inputType}
        onChange={onChange}
        checked={isChecked}
        error={error}
      />
      <CheckboxWrapper>
        <Checkbox data-cy={dataCy} inputType={inputType} />
      </CheckboxWrapper>
      {children}
    </Label>
  );
};

export default SelectInput;
