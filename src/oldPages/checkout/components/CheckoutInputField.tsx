/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { BRAND, BREAKPOINTS, SHADES } from "../../../ui/variables";

export enum InputWidth {
  Full = "full",
  Half = "half",
  Inherit = "inherit",
}

export const Label = styled.div`
  font-size: 12px;
  color: ${BRAND.PRIMARY_TEXT};
  margin-bottom: -5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  margin: 10px 0 20px;
  padding-left: 20px;
  border-radius: 3px;
  border: 1px solid ${SHADES.SHADE_LIGHTER};

  &.error {
    border-color: ${BRAND.ERROR};
  }
`;

export const inputFullStyles = `
  @media ${BREAKPOINTS.DESKTOP} {
    width: 80%;
  }

  @media screen and (min-width: 1050px) {
    width: 60%;
  }

  @media ${BREAKPOINTS.MOBILE} {
    width: 100%;
  }
`;

export const InputContainer = styled.div`
  ${({ inputWidth }: { inputWidth: InputWidth }) => {
    if (inputWidth === InputWidth.Full) {
      return inputFullStyles;
    }
    return inputWidth === InputWidth.Half ? "width: 48%;" : "";
  }}
`;

export const Error = styled.div`
  font-size: 13px;
  color: ${BRAND.ERROR};
  font-weight: 500;
  text-align: right;
  margin-top: -16px;
`;

export interface Props {
  inputWidth: InputWidth;
  autoComplete?: string;
  type: string;
  identifier: string;
  value: string | undefined;
  error?: string;
  touched?: boolean;
  label: string;
  isDisabled?: boolean;
  spellCheck?: boolean;
  isReadOnly?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
}

const CheckoutInputField = ({
  autoComplete,
  type,
  identifier,
  value,
  error,
  touched,
  label,
  isDisabled,
  spellCheck,
  handleChange,
  handleBlur,
  inputWidth,
  isReadOnly,
  placeholder,
  maxLength,
}: Props) => (
  <InputContainer inputWidth={inputWidth}>
    <Label>{label}</Label>

    <Input
      name={identifier}
      type={type}
      spellCheck={spellCheck}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      autoComplete={autoComplete}
      data-identifier={identifier}
      data-cy={`checkout-input-field-${identifier}`}
      disabled={isDisabled}
      className={touched && error ? "error" : ""}
      readOnly={isReadOnly}
      placeholder={placeholder}
      maxLength={maxLength}
    />

    {touched && error && (
      <Error
        data-testid={`errors-${identifier}`}
        data-cy={`checkout-input-field-error-${identifier}`}
      >
        {error}
      </Error>
    )}
  </InputContainer>
);

export default CheckoutInputField;
