/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Select from 'react-select';

import googleAPILogo from '../../../assets/logos/google-api/powered_by_google_image.png';
import { BRAND, SHADES } from '../../../ui/variables';
import { InputContainer, InputWidth, Label, Error } from './CheckoutInputField';

const GoogleSelectDropdown = styled(Select)`
  border: 1px solid
    ${({ error, touched, isValid }: { error?: string | null; touched?: boolean; isValid: boolean }) =>
      error && touched && !isValid ? BRAND.ERROR : SHADES.SHADE_LIGHTER};
  div {
    color: ${BRAND.PRIMARY_TEXT};
  }
`;

interface Props {
  identifier: 'googleDeliveryStreetAddress' | 'googleBillingStreetAddress';
  value: string;
  error?: string | null;
  touched?: boolean;
  clearGoogleAddress: (addressType: string) => void;
  handleGoogleAddress: (parsedAddress: {
    autocompleteAddress: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  }) => void;
  handleBlur: (event: React.SyntheticEvent) => void;
  handleGoogleScriptFailed: () => void;
  handleGoogleAddressErrorMessage: (error: string | null, identifier: string) => void;
}

interface State {
  currentValue: null | object;
  predictions: object[];
  isValid: boolean;
}

interface DropdownOption {
  label: string;
  value: string;
  placeId?: string;
  disabled?: boolean;
}

const countries = {
  googleDeliveryStreetAddress: ['us'],
  googleBillingStreetAddress: ['us', 'ca']
};

const customStyle = {
  container: (base: object) => ({
    ...base,
    margin: '10px 0 20px',
    border: '1px solid',
    borderRadius: '3px',
    cursor: 'text'
  }),
  control: () => ({
    paddingLeft: '10px',
    display: 'flex',
    outline: 'none',
    border: 'none',
    minHeight: 46,
    height: 46
  })
};

const componentsOption = {
  DropdownIndicator: null, // removes the DropdownIndicator
  IndicatorSeparator: null // removes the IndicatorSeperator
};

let googleSessionToken: google.maps.places.AutocompleteSessionToken;
let googleAutocompleteService: google.maps.places.AutocompleteService;
let googlePlacesService: google.maps.places.PlacesService;
let isGoogleScriptLoaded = false;

// load GoogleScript and instantiate Google's API library onload
export function loadGoogleScript(handleGoogleScriptFailed: () => void) {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&language=en&libraries=places`;

  if (!process.env.GOOGLE_API_KEY) {
    return handleGoogleScriptFailed();
  }

  script.onload = () => {
    const mockMap = document.createElement('div'); // the api needs a map in order to work
    googlePlacesService = new google.maps.places.PlacesService(mockMap);
    googleSessionToken = new google.maps.places.AutocompleteSessionToken();
    googleAutocompleteService = new google.maps.places.AutocompleteService();
  };
  script.onerror = () => {
    handleGoogleScriptFailed();
  };
  document.body.appendChild(script);
  isGoogleScriptLoaded = true;
}

class CheckoutGoogleInputField extends React.Component<Props, State> {
  private isComponentMounted = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentValue: { label: this.props.value },
      predictions: [],
      isValid: false
    };

    if (!isGoogleScriptLoaded) {
      loadGoogleScript(this.props.handleGoogleScriptFailed);
    }
  }

  componentDidMount() {
    this.isComponentMounted = true;
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  parseAddressFromComponents = (addressComponents: google.maps.GeocoderAddressComponent[]) => {
    let streetNumber = '';
    let streetName = '';
    let city = '';
    let state = '';
    let zipCode = '';

    // address component types can be found here: https://developers.google.com/maps/documentation/places/web-service/supported_types
    addressComponents.forEach((addressComponent) => {
      if (addressComponent.types.includes('postal_code')) {
        zipCode = addressComponent.short_name;
      } else if (addressComponent.types.includes('administrative_area_level_1')) {
        state = addressComponent.short_name;
      } else if (addressComponent.types.includes('locality') || addressComponent.types.includes('sublocality')) {
        city = addressComponent.short_name;
      } else if (addressComponent.types.includes('route')) {
        streetName = addressComponent.short_name;
      } else if (addressComponent.types.includes('street_number')) {
        streetNumber = addressComponent.short_name;
      }
    });

    return {
      streetAddress: `${streetNumber} ${streetName}`,
      city,
      state,
      zipCode
    };
  };

  // searchAndPopulateAddress makes request to google API and populate the dropdown list
  // this prevent search queries to start without a street number
  // this will prevent searching for place names, such as 'Battery Park City' & 'FDR Drive'
  searchAndPopulateAddress = (inputValue: string) => {
    const { handleGoogleAddressErrorMessage } = this.props;
    const regex = /[^0-9]/; // check if value is not a number

    if (inputValue[0] === ' ') {
      inputValue = inputValue.trimLeft();
    }

    if (inputValue.length === 0) {
      return handleGoogleAddressErrorMessage('*required', this.props.identifier);
    } else if (regex.test(inputValue[0])) {
      handleGoogleAddressErrorMessage('*address must start with a number', this.props.identifier);
      // this will clear the predictions array if the user enters an address without a street number
      return this.setState({ predictions: [] });
    }

    // if valid input then remove any error message and get data from Google
    handleGoogleAddressErrorMessage(null, this.props.identifier);
    googleAutocompleteService.getPlacePredictions(
      {
        input: inputValue,
        types: ['address'],
        sessionToken: googleSessionToken,
        componentRestrictions: { country: countries[this.props.identifier] }
      },
      (args: google.maps.places.AutocompletePrediction[]) => {
        if (!args || !this.isComponentMounted) {
          return;
        }
        const predictions: object[] = [];
        args.forEach((address) => {
          predictions.push({
            label: address.description,
            value: address.description, // do not remove or react-select will act wonky
            placeId: address.place_id
          });
        });
        predictions.push({
          label: <img src={googleAPILogo} height="15px" alt="" />,
          disabled: true
        });

        this.setState({ predictions });
      }
    );
  };

  // make request to google API to get full address with zip code
  handleSelectedDropDown = (selectedOption: DropdownOption) => {
    if (!selectedOption.placeId) {
      return;
    }
    this.setState({ currentValue: { label: selectedOption.value }, isValid: true });
    const request = {
      placeId: selectedOption.placeId,
      fields: ['address_components'],
      sessionToken: googleSessionToken
    };
    googlePlacesService.getDetails(request, (args: google.maps.places.PlaceResult) => {
      if (!args.address_components || !this.isComponentMounted) {
        return;
      }
      this.props.handleGoogleAddress({
        autocompleteAddress: selectedOption.value,
        ...this.parseAddressFromComponents(args.address_components)
      });
    });
  };

  handleFocus = () => {
    this.props.clearGoogleAddress(this.props.identifier);
    this.setState({ currentValue: null, isValid: false });
  };

  render() {
    const { error, touched, identifier, handleBlur } = this.props;
    const { currentValue, predictions, isValid } = this.state;

    return (
      <InputContainer
        inputWidth={InputWidth.Full}
        role="button"
        tabIndex={0}
        data-identifier={identifier}
        onBlur={handleBlur}
        id={identifier}
      >
        <Label>Address</Label>
        <form autoComplete="none">
          <GoogleSelectDropdown
            error={error}
            touched={touched}
            isValid={isValid}
            id={identifier}
            placeholder=""
            styles={customStyle}
            blurInputOnSelect={true}
            filterOption={() => true} // turn off the library's default filtering to show all results
            onFocus={this.handleFocus}
            backspaceRemovesValue={true}
            noOptionsMessage={() => null} // do not display a message when there are no results
            components={componentsOption} // can be used to hide specific components
            value={currentValue}
            options={predictions}
            onChange={this.handleSelectedDropDown}
            onInputChange={this.searchAndPopulateAddress}
            isOptionDisabled={(option: DropdownOption) => option.disabled === true}
          />
        </form>
        {error && touched && !isValid ? <Error>{error}</Error> : null}
      </InputContainer>
    );
  }
}

export default CheckoutGoogleInputField;
