/** @jsx jsx */
import { Field, Form, reduxForm, InjectedFormProps, ConfigProps } from 'redux-form';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import FormField from '../../../ui/formElements/FormField';
import Button from '../../../ui/buttons/Button';
import Title2 from '../../../ui/titles/Title2';
import { RegisterFormData } from './store/register.types';
import { APIError } from '../../../types/ReduxState';
import { BRAND, SHADES } from '../../../ui/variables';
import { validateEmail, validatePassword, validatePasswordConfirm } from '../auth.validator';
import Header3 from '../../../ui/headers/Header3';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';

const SubmitButton = styled(Button)`
  margin-top: 10px;
`;

const RegistrationForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px 0 0;
  padding: 48px 24px;
  width: 87%;
  max-width: 612px;
  background-color: ${SHADES.WHITE};
`;

const EmailParagraph = styled(Paragraph2)`
  margin: 12px 0 32px;
`;

interface Props {
  isFetching: boolean;
  setupAccountError: APIError | null;
  onSubmit: (formValues: RegisterFormData) => void;
}

export const validate = (values: RegisterFormData) => ({
  email: validateEmail(values.email),
  password: validatePassword(values.password),
  passwordConfirm: validatePasswordConfirm(values.password, values.passwordConfirm)
});

const RegisterForm = (props: Props & InjectedFormProps<RegisterFormData, Props>) => {
  const { isFetching, handleSubmit, onSubmit, invalid, setupAccountError, initialValues } = props;

  return (
    <RegistrationForm onSubmit={handleSubmit(onSubmit)}>
      {initialValues.email ? (
        <React.Fragment>
          <Header3>Create a password for:</Header3>
          <EmailParagraph dataCy="email-value">{initialValues.email}</EmailParagraph>
        </React.Fragment>
      ) : (
        <Field data-cy="email" name="email" label="Enter Your Email" component={FormField} />
      )}
      <Field data-cy="password" name="password" label="Enter Your Password" type="password" component={FormField} />
      <Field
        data-cy="password-confirm"
        name="passwordConfirm"
        label="Confirm password"
        type="password"
        component={FormField}
      />
      {setupAccountError && (
        <Title2 color={BRAND.ERROR}>Something went wrong when trying to register. Please try again.</Title2>
      )}
      {initialValues.email ? (
        <SubmitButton dataCy="submit-button" isDisabled={invalid || isFetching}>
          {isFetching ? 'Creating Password...' : 'Create Password'}
        </SubmitButton>
      ) : (
        <SubmitButton dataCy="submit-button" isDisabled={invalid || isFetching}>
          {isFetching ? 'Setting Up Account...' : 'Set Up Account'}
        </SubmitButton>
      )}
    </RegistrationForm>
  );
};

const reduxFormConfig: ConfigProps<RegisterFormData, Props> = {
  form: 'setupAccount',
  validate
};

export default reduxForm(reduxFormConfig)(RegisterForm);
