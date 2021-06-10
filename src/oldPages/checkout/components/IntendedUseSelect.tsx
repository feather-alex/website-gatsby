import React, { ChangeEvent, SyntheticEvent, Fragment } from 'react';
import FormValue from '../../../types/FormValue';
import { MenuItem } from '../../../ui/formElements/Dropdown';
import CheckoutInputFieldFormik, { InputContainer, InputWidth, Label } from './CheckoutInputField';
import { CheckoutDropdown } from './CheckoutStyledComponents';

interface Props {
  handleChange: (event: string) => void;
  handleOtherChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: SyntheticEvent<HTMLInputElement, Event>) => void;
  otherState: FormValue<string>;
  currentValue: string | null;
}

const randomOptions = [
  { value: 'residential', label: 'Personal/Residential' },
  { value: 'staging', label: 'Staging' },
  { value: 'office', label: 'Office' }
];

const defaultOption = { value: 'no-response', label: 'Please choose an option' };
const options = randomOptions.concat([{ value: 'other', label: 'Other (fill in the blank)' }]);

const IntendedUsesSelect = ({ handleChange, handleOtherChange, handleBlur, otherState, currentValue }: Props) => {
  const shownOption = options.filter((option) => option.value === currentValue)[0] || defaultOption;

  return (
    <Fragment>
      <InputContainer inputWidth={InputWidth.Full}>
        <Label>How do you intend to use your furniture? (Optional)</Label>

        <CheckoutDropdown
          id="dropdown-intended-use"
          isDefaultStyle={false}
          title={shownOption.label}
          onSelect={handleChange}
        >
          {options.map((option) => (
            <MenuItem eventKey={option.value} key={option.value} data-identifier={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CheckoutDropdown>
      </InputContainer>
      {currentValue === 'other' && (
        <CheckoutInputFieldFormik
          inputWidth={InputWidth.Full}
          identifier="intended-use-other"
          label="Other..."
          type="text"
          value={otherState.value}
          handleChange={handleOtherChange}
          spellCheck={true}
          handleBlur={handleBlur}
        />
      )}
    </Fragment>
  );
};

export default IntendedUsesSelect;
