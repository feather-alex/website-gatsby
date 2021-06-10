import { ContactFormData } from './contact.types';
import { validateForm } from './contact.validator';

describe('Contact Form Validator', () => {
  let formValues: ContactFormData;

  beforeEach(() => {
    formValues = {
      fullName: '',
      companyName: '',
      messageBody: '',
      emailAddress: '',
      // TODO: Fix this the next time the file is edited.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reasonForInquiry: '' as any
    };
  });

  it('Should require all fields aside from companyName', () => {
    const required = '*required';

    const validated = validateForm(formValues);

    expect(validated.fullName).toEqual(required);
    expect(validated.messageBody).toEqual(required);
    expect(validated.emailAddress).toEqual(required);
    expect(validated.reasonForInquiry).toEqual(required);
  });

  it('Should provide an error message for invalid email addresses', () => {
    formValues.emailAddress = 'abc123';

    const validated = validateForm(formValues);

    expect(validated.emailAddress).toEqual('*invalid email');
  });

  it('Should provide an error message for a message body fewer than 10 characters', () => {
    formValues.messageBody = 'abc123';

    const validated = validateForm(formValues);

    expect(validated.messageBody).toEqual('*must be more than 10 characters');
  });

  it('Should provide an error message for a message body greater than 2,000 characters', () => {
    let twoK = '1234567890';
    for (let i = 0; i < 201; i++) {
      twoK = `${twoK}1234567890`;
    }
    formValues.messageBody = twoK;

    const validated = validateForm(formValues);

    expect(validated.messageBody).toEqual('*must be fewer than 2,000 characters');
  });
});
