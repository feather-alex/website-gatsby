/** @jsx jsx */
import styled from "@emotion/styled";
import React from "react";
import { jsx } from "@emotion/react";
import { BRAND, SHADES } from "../variables";
import EndLine from "../miscellaneous/EndLine";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 412px;
  margin: 30px 0 20px;
  @media (max-width: 768px) {
    margin: 10px 0;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

const InputFlexContainer = styled.span`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  position: relative;
  padding: 6px 0px;
  flex: 1;
  outline: 0;
  font-size: 16px;
  background: transparent;
  ::placeholder {
    color: ${SHADES.SHADE_LIGHT};
  }

  &.error {
    color: ${BRAND.ERROR};

    ::placeholder {
      color: ${BRAND.ERROR};
    }
  }
`;

const Error = styled.div`
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  color: ${BRAND.ERROR};
  margin-top: -14px;
  text-align: left;
`;

export interface Props {
  value: string;
  type: string;
  showIcon?: boolean;
  onClickIcon?: () => void;
  className?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  id: string;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  maxLength?: number;
}

// Temporarily labeled "formik" as we continue to refactor out bootstrap forms
const FormikField = ({
  id,
  type,
  placeholder,
  className,
  value,
  handleChange,
  handleBlur,
  error,
  touched,
  maxLength,
}: Props) => {
  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event);
  };

  const showError = error && touched;

  return (
    <Container className={className}>
      <InputFlexContainer>
        <Input
          type={type}
          name={id}
          placeholder={placeholder}
          id={id}
          value={value}
          maxLength={maxLength}
          onBlur={handleOnBlur}
          onChange={handleChange}
          className={showError ? "error" : ""}
        />
      </InputFlexContainer>

      <EndLine
        color={showError ? BRAND.ERROR : BRAND.PRIMARY_TEXT}
        marginBottom="16px"
      />

      {showError && <Error>{error}</Error>}
    </Container>
  );
};

export default FormikField;
