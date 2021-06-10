/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import FormField from '../../../ui/formElements/FormField';
import React from 'react';
import { Form, Field, reduxForm, InjectedFormProps } from 'redux-form';
import Button from '../../../ui/buttons/Button';
import { ZipcodeFormData } from '../../../components/selectPlan/components/EnterZipcode';
import { validateZipcode } from '../../../app/store/plan/plan.validator';
import { MembershipState, MembershipStateDisplayName } from '../../../app/store/plan/plan.types';
import Title3 from '../../../ui/titles/Title3';

interface Props {
  isFetching: boolean;
  isInDeliveryZone: boolean | null;
  planType: MembershipState;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (formValues: { zipcode: string }, dispatch: Function, props: any) => void;
  handleFocusZipCode: (event: React.FocusEvent<HTMLInputElement>) => void;
  resetZipcode: () => void;
  isMobileBreakpoint: boolean;
}

const validate = (values: ZipcodeFormData) => ({
  zipcode: validateZipcode(values.zipcode)
});

const OVERFLOW_SCREEN = '@media screen and (max-width: 1268px)';

class PlanForm extends React.Component<Props & InjectedFormProps<ZipcodeFormData, Props>> {
  renderButtonText = () => {
    const { isFetching, isInDeliveryZone, planType } = this.props;

    if (isInDeliveryZone === false) {
      return 'Outside Delivery Area';
    } else if (isFetching) {
      return 'Submitting...';
    } else if (isInDeliveryZone) {
      return `Select ${MembershipStateDisplayName[planType]}`;
    } else {
      return 'Enter Zip Code';
    }
  };

  isButtonDisabled = () => {
    const { invalid, isFetching, isInDeliveryZone } = this.props;

    return invalid || isFetching || isInDeliveryZone === false;
  };

  render() {
    const {
      onSubmit,
      handleSubmit,
      resetZipcode,
      isMobileBreakpoint,
      handleFocusZipCode,
      isInDeliveryZone
    } = this.props;

    return (
      <Form
        onSubmit={handleSubmit(onSubmit)}
        css={css`
          display: flex;
          align-items: center;
          ${OVERFLOW_SCREEN} {
            flex-direction: column;
          }
        `}
      >
        <div
          css={css`
            position: relative;
            width: 100%;
            max-width: 412px;
            margin-right: 12px;
            ${OVERFLOW_SCREEN} {
              margin-right: 0;
              max-width: none;
            }
            .form-field {
              ${isMobileBreakpoint && `max-width: none`}
            }
          `}
        >
          <Field
            props={{ disabled: isInDeliveryZone, label: 'Delivery zip code', inputMode: 'numeric' }}
            onFocus={handleFocusZipCode}
            name="zipcode"
            type="tel"
            component={FormField}
            maxLength={5}
            data-cy="delivery-zip-code"
            className="form-field"
          />

          {isInDeliveryZone && (
            <div
              role="button"
              tabIndex={0}
              onClick={resetZipcode}
              css={css`
                position: absolute;
                right: 0;
                bottom: ${isMobileBreakpoint ? 38 : 48}px;
                cursor: pointer;
              `}
            >
              <Title3 isUnderline={true}>Change zip</Title3>
            </div>
          )}
        </div>

        <div
          css={css`
            margin-left: auto;
            ${OVERFLOW_SCREEN} {
              width: 100%;
              margin-left: 0;
            }
          `}
        >
          <Button dataCy="submit-button" type="submit" isDisabled={this.isButtonDisabled()} isFullWidth={true}>
            {this.renderButtonText()}
          </Button>
        </div>
      </Form>
    );
  }
}

export default reduxForm<ZipcodeFormData, Props>({
  form: 'planForm',
  validate
})(PlanForm);
