/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import FormField from "../../../ui/formElements/FormField";
import React from "react";
import { APIError } from "../../../types/ReduxState";
import { Form, Field, reduxForm, InjectedFormProps } from "redux-form";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import Paragraph2 from "../../../ui/paragraphs/Paragraph2";
import { VerificationFormData } from "./store/verification.types";
import { validateEmail } from "../auth.validator";

export interface Props {
  verificationError: APIError | null;
  isFetching: boolean;
  onSubmit: (values: VerificationFormData) => void;
}

const validate = (values: VerificationFormData) => ({
  email: validateEmail(values.email),
});

class VerificationForm extends React.Component<
  Props & InjectedFormProps<VerificationFormData, Props>
> {
  render() {
    const { handleSubmit, onSubmit, verificationError, invalid, isFetching } =
      this.props;

    return (
      <Form
        onSubmit={handleSubmit(onSubmit)}
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 30px;
        `}
      >
        {verificationError && (
          <div className="login-error">
            <Paragraph2>
              Something unexpected happened. This one is on us. Give it one more
              try
            </Paragraph2>
          </div>
        )}

        <Field name="email" label="Email" component={FormField} />
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
          `}
        >
          <Button type="submit" isDisabled={invalid || isFetching}>
            {isFetching ? "Sending..." : "Resend verification"}
          </Button>
        </div>

        <div
          css={css`
            margin: 15px 0;
          `}
        >
          <Button style={ButtonStyle.TEXT} to="/login">
            Back to login
          </Button>
        </div>
      </Form>
    );
  }
}

export default reduxForm<VerificationFormData, Props>({
  form: "emailVerification",
  validate,
})(VerificationForm);
