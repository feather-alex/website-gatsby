/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { BRAND } from "../variables";
import { WrappedFieldProps } from "redux-form";
import QuestionIcon from "../icons/QuestionIcon";

export interface Props extends WrappedFieldProps {
  label: string;
  type: string;
  showIcon?: boolean;
  onClickIcon?: () => void;
}

const TextArea = (props: Props) => {
  const showError = props.meta.error && props.meta.touched;
  const formFieldProps = { ...props, ...props.input };

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 412px;
        height: 120px;
        margin: 30px 0 20px;
        @media (max-width: 768px) {
          margin: 10px 0;
        }
      `}
    >
      <label
        className={`${showError ? " error" : ""}`}
        htmlFor={props.label}
        css={css`
          color: ${BRAND.PRIMARY_TEXT};
          margin-bottom: 3px;
          font-size: 16px;

          &.error {
            color: ${BRAND.ERROR};
          }
        `}
      >
        {props.label}
      </label>
      <textarea
        {...formFieldProps}
        css={css`
          position: relative;
          flex: 1;
          border: 2px solid ${BRAND.PRIMARY_TEXT};
          border-radius: 0;
          color: ${BRAND.PRIMARY_TEXT};
          resize: none;
          height: 116px;
          outline: 0;
          font-size: 16px;
          padding: 16px;
          background: transparent;
          appearance: none;

          &.error {
            color: ${BRAND.ERROR};
            border-color: ${BRAND.ERROR};

            ::placeholder {
              color: ${BRAND.ERROR};
            }
          }
        `}
        name={props.label}
        className={showError ? "error" : ""}
      />

      {props.showIcon && <QuestionIcon onClick={props.onClickIcon} />}

      {showError && (
        <div
          css={css`
            text-transform: uppercase;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 2px;
            color: ${BRAND.ERROR};
            text-align: left;
          `}
        >
          {props.meta.error}
        </div>
      )}
    </div>
  );
};

export default TextArea;
