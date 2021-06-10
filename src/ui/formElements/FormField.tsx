/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { BRAND } from "../variables";
import EndLine from "../miscellaneous/EndLine";
import { WrappedFieldProps } from "redux-form";
import QuestionIcon from "../icons/QuestionIcon";

export interface Props extends WrappedFieldProps {
  label: string;
  type: string;
  showIcon?: boolean;
  onClickIcon?: () => void;
  className?: string;
}

interface State {
  isFocused: boolean;
}

class FormField extends React.Component<Props, State> {
  public static defaultProps = {
    type: "text",
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isFocused: props.input.value !== "",
    };
  }

  // Needed for the specific use case where there are 2 inputs for the same thing
  // (i.e. zipcode entry) on one page. We need the input to update after it has
  // been mounted, when its value has been updated.
  // Example: the details page with the member/non-member sections
  componentDidUpdate = (prevProps: Props) => {
    if (
      prevProps.input.value !== this.props.input.value &&
      this.props.input.value !== ""
    ) {
      this.setState({ isFocused: true });
    }
  };

  handleOnFocus = () => {
    this.setState({ isFocused: true });
  };

  handleOnBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      this.setState({ isFocused: false });
    }
  };

  render() {
    const { label, type, className } = this.props;
    const { isFocused } = this.state;

    const showError = this.props.meta.error && this.props.meta.touched;

    const formFieldProps = { ...this.props, ...this.props.input };

    return (
      <div
        css={css`
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
        `}
        className={className}
      >
        <span
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <label
            className={`${isFocused ? "focused " : ""} ${
              showError ? " error" : ""
            }`}
            htmlFor={label}
            css={css`
              position: absolute;
              left: 0;
              top: 12px;
              color: ${BRAND.PRIMARY_TEXT};
              font-size: 16px;
              transition: transform 150ms ease-out;

              &.focused {
                transform: translateY(-22px);
                text-transform: uppercase;
                font-size: 10px;
                font-weight: 500;
                letter-spacing: 2px;
              }

              &.error {
                color: ${BRAND.ERROR};
              }
            `}
          >
            {label}
          </label>
          <input
            {...formFieldProps}
            css={css`
              position: relative;
              padding: 6px 0px;
              flex: 1;
              outline: 0;
              font-size: 16px;
              background: transparent;

              &.error {
                color: ${BRAND.ERROR};

                ::placeholder {
                  color: ${BRAND.ERROR};
                }
              }
            `}
            type={type}
            name={label}
            onFocus={(event) => {
              this.handleOnFocus();
              this.props.input.onFocus(event);
            }}
            onBlur={(event) => {
              this.handleOnBlur(event);
              this.props.input.onBlur(event);
            }}
            className={showError ? "error" : ""}
          />

          {this.props.showIcon && (
            <QuestionIcon onClick={this.props.onClickIcon} />
          )}
        </span>

        <EndLine
          color={showError ? BRAND.ERROR : BRAND.PRIMARY_TEXT}
          marginBottom="16px"
        />

        {showError && (
          <div
            css={css`
              text-transform: uppercase;
              font-size: 10px;
              font-weight: 500;
              letter-spacing: 2px;
              color: ${BRAND.ERROR};
              margin-top: -14px;
              text-align: left;
            `}
          >
            {this.props.meta.error}
          </div>
        )}
      </div>
    );
  }
}

export default FormField;
