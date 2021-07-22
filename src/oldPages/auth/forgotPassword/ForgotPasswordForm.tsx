/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { Field, Form, reduxForm, InjectedFormProps } from "redux-form";
import FormField from "../../../ui/formElements/FormField";
import Button from "../../../ui/buttons/Button";
import { validateEmail } from "../auth.validator";
import { ForgotPasswordFormData } from "./store/forgot.password.types";

interface Props {
  isFetching: boolean;
  onSubmit: (formValues: { email: string }) => void;
}

const validate = (values: ForgotPasswordFormData) => ({
  email: validateEmail(values.email),
});

class ForgotPasswordForm extends React.Component<
  Props & InjectedFormProps<ForgotPasswordFormData, Props>
> {
  render() {
    const { isFetching, handleSubmit, onSubmit, invalid } = this.props;

    return (
      <Form
        onSubmit={handleSubmit(onSubmit)}
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 30px 24px 0;
        `}
      >
        <Field name="email" label="Email" component={FormField} />
        <div
          css={css`
            margin-top: 40px;
          `}
        >
          <Button isDisabled={invalid || isFetching}>
            {isFetching ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Form>
    );
  }
}

export default reduxForm<ForgotPasswordFormData, Props>({
  form: "forgotPassword",
  validate,
})(ForgotPasswordForm);
