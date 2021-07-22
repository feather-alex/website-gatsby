/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import FormField from "../../../ui/formElements/FormField";
import { APIError } from "../../../types/ReduxState";
import { Credentials as LoginFormData } from "./store/login.types";
import { Form, Field, reduxForm, InjectedFormProps } from "redux-form";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import Title2 from "../../../ui/titles/Title2";
import { BRAND } from "../../../ui/variables";
import { validateEmail, validatePassword } from "../auth.validator";

export interface OwnProps {
  loginError: APIError | null;
  toggleForgotPasswordModal: () => void;
  isFetching: boolean;
}

type Props = OwnProps & InjectedFormProps<LoginFormData, OwnProps>;

const validate = (values: LoginFormData) => ({
  email: validateEmail(values.email),
  password: validatePassword(values.password),
});

const getErrorMessage = (error: APIError) => {
  if (error.status === 401) {
    return "The email and password combination you entered was invalid";
  }
  if (error.error === "too_many_attempts") {
    return "Your account has been blocked after multiple consecutive login attempts. We've sent you an email with instructions on how to unblock it.";
  }
  return "Something went wrong when trying to log in. Please try again";
};

const LoginForm = ({
  handleSubmit,
  loginError,
  invalid,
  toggleForgotPasswordModal,
  isFetching,
}: Props) => (
  <Form
    onSubmit={handleSubmit}
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 12px 24px 0;
    `}
  >
    <Field data-cy="email" name="email" label="Email" component={FormField} />
    <Field
      name="password"
      type="password"
      label="Password"
      data-cy="password"
      component={FormField}
      showIcon={true}
      onClickIcon={toggleForgotPasswordModal}
    />
    {loginError && (
      <div
        css={css`
          p {
            color: ${BRAND.ERROR};
            max-width: 412px;
            margin: auto;
          }
        `}
      >
        <Title2>{getErrorMessage(loginError)}</Title2>
      </div>
    )}
    <div
      css={css`
        margin-top: 40px;
      `}
    >
      <Button
        dataCy="login-button"
        type="submit"
        isDisabled={invalid || isFetching}
      >
        {isFetching ? "Logging in..." : "Log in"}
      </Button>
    </div>
    <div
      css={css`
        margin: 15px 0;
      `}
    >
      <Button style={ButtonStyle.TEXT} to="/setup-account">
        Activate your account
      </Button>
    </div>
  </Form>
);

export default reduxForm<LoginFormData, OwnProps>({
  form: "loginForm",
  validate,
})(LoginForm);
