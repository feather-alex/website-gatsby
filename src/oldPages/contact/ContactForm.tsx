/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Form, Field, reduxForm, ConfigProps, InjectedFormProps } from 'redux-form';
import { ContactFormData } from './store/contact.types';
import ReasonForInquiry from './ReasonForInquiry';
import { validateForm } from './store/contact.validator';
import Header2 from '../../ui/headers/Header2';
import FormField from '../../ui/formElements/FormField';
import Button, { ButtonStyle } from '../../ui/buttons/Button';
import TextArea from '../../ui/formElements/TextArea';
import Paragraph1 from '../../ui/paragraphs/Paragraph1';

interface Props {
  displayErrorMessage: boolean;
  isProccessingRequest: boolean;
  displaySuccessMessage: boolean;
  onSubmit: (formValues: ContactFormData) => void;
}

const ContactForm = ({
  displayErrorMessage,
  isProccessingRequest,
  displaySuccessMessage,
  handleSubmit,
  onSubmit
}: Props & InjectedFormProps<ContactFormData, Props>) => (
  <div
    css={css`
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `}
  >
    <Header2>Send us a message</Header2>

    <Form
      onSubmit={handleSubmit(onSubmit)}
      css={css`
        width: 80%;
        max-width: 412px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <Field type="text" name="fullName" label="Full name" component={FormField} />

      <Field type="email" name="emailAddress" label="Email" component={FormField} />

      <Field type="text" name="companyName" label="Company name (optional)" component={FormField} />

      <Field name="reasonForInquiry" component={ReasonForInquiry} />

      <Field
        type="text"
        name="messageBody"
        component={TextArea}
        label="How can we help you?"
        placeholder="Type your answer..."
      />

      {displayErrorMessage && (
        <div>
          <p>Sorry an unexpected error occurred - please try again later.</p>
        </div>
      )}

      {displaySuccessMessage && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin: 28px 0 8px 0;
          `}
        >
          <Header2>Thanks for your message!</Header2>
          <Paragraph1>We will get back to you as fast as we can.</Paragraph1>
        </div>
      )}

      <div
        css={css`
          margin-top: 20px;
        `}
      >
        <Button style={ButtonStyle.SECONDARY} type="submit" isDisabled={isProccessingRequest}>
          Send message {isProccessingRequest && '...'}
        </Button>
      </div>
    </Form>
  </div>
);

const reduxFormConfigProps: ConfigProps<ContactFormData, Props> = {
  form: 'contact',
  validate: validateForm
};

export default reduxForm(reduxFormConfigProps)(ContactForm);
