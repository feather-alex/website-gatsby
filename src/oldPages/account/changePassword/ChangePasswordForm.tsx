/** @jsx jsx */
import { Field, Form, reduxForm, InjectedFormProps, ConfigProps } from 'redux-form';
import { jsx, css } from '@emotion/core';
import FormField from '../../../ui/formElements/FormField';
import Button from '../../../ui/buttons/Button';
import Title2 from '../../../ui/titles/Title2';
import { ChangePasswordData } from './store/change.password.types';
import { APIError } from '../../../types/ReduxState';
import { BRAND } from '../../../ui/variables';
import { validatePassword, validatePasswordConfirm } from '../../auth/auth.validator';

interface Props {
  isFetching: boolean;
  changePasswordError: APIError | null;
  onSubmit: (formValues: ChangePasswordData) => void;
  isMobileBreakpoint: boolean;
}

export const validate = (values: ChangePasswordData) => ({
  currentPassword: validatePassword(values.currentPassword),
  newPassword: validatePassword(values.newPassword),
  confirmPassword: validatePasswordConfirm(values.newPassword, values.confirmPassword)
});

const ChangePassword = (props: Props & InjectedFormProps<ChangePasswordData, Props>) => {
  const { isFetching, handleSubmit, onSubmit, invalid, changePasswordError, isMobileBreakpoint } = props;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      css={css`
        display: flex;
        flex-direction: column;
        ${isMobileBreakpoint ? `margin-top: 40px;` : `margin-top: 20px;`}
      `}
    >
      <Field name="currentPassword" label="Current password" type="password" component={FormField} />
      <Field name="newPassword" label="New password" type="password" component={FormField} />
      <Field name="confirmPassword" label="Confirm password" type="password" component={FormField} />
      {changePasswordError && (
        <div
          css={css`
            color: ${BRAND.ERROR};
          `}
        >
          <Title2>
            {changePasswordError.status === 403
              ? 'The current password you entered is incorrect. Please try again.'
              : 'Something went wrong when trying to change your password. Please try again.'}
          </Title2>
        </div>
      )}
      <div
        css={css`
          width: 100%;
          margin-top: 20px;
          ${isMobileBreakpoint && `display: flex; justify-content: center;`}
        `}
      >
        <Button isDisabled={invalid || isFetching}>{isFetching ? 'Submitting...' : 'Submit'}</Button>
      </div>
    </Form>
  );
};

const reduxFormConfig: ConfigProps<ChangePasswordData, Props> = {
  form: 'changePassword',
  validate
};

export default reduxForm(reduxFormConfig)(ChangePassword);
