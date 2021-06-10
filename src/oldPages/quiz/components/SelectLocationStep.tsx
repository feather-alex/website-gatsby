/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import QuizActions from './QuizActions';
import { DeliveryArea } from '../../../app/store/entities/entities.types';
import Header3 from '../../../ui/headers/Header3';
import { DeliveryAreaChoice } from '../store/quiz.types';
import Dropdown, { MenuItem } from '../../../ui/formElements/Dropdown';

export interface Props {
  location: DeliveryAreaChoice | null;
  deliveryAreas: DeliveryArea[] | null;
  handleNextStep: (choice: DeliveryAreaChoice) => void;
}

const determineLocationDisplayText = (
  deliveryAreas: DeliveryArea[] | null,
  selectedLocation: DeliveryAreaChoice | null
): string => {
  const defaultLocationDisplay = 'Select your location';
  if (deliveryAreas && selectedLocation) {
    const selectedArea = deliveryAreas.find((area) => area.identifier === selectedLocation);
    return selectedArea
      ? selectedArea.name === 'Los Angeles Area'
        ? 'Los Angeles / Orange County'
        : selectedArea.name
      : defaultLocationDisplay;
  } else {
    return defaultLocationDisplay;
  }
};

const SelectLocationStep = (props: Props) => {
  const { location, deliveryAreas } = props;
  const [selectedLocation, setSelectedLocation] = useState(location);

  const buttonDisabled = !selectedLocation || selectedLocation === DeliveryAreaChoice.All;

  return (
    <div className="quiz-step">
      <div className="quiz-step__question">
        <Header3>Select your location</Header3>
      </div>

      <div className="quiz-step__options">
        <Dropdown
          id="custom-dropdown-select-location"
          dataCy="quiz-select-location"
          onSelect={(selection: DeliveryAreaChoice) => setSelectedLocation(selection)}
          title={determineLocationDisplayText(deliveryAreas, selectedLocation)}
        >
          {deliveryAreas &&
            deliveryAreas.map((area: DeliveryArea) => (
              <MenuItem data-cy="city-list" key={area.identifier} eventKey={area.identifier}>
                {area.name === 'Los Angeles Area' ? 'Los Angeles / Orange County' : area.name}
              </MenuItem>
            ))}
        </Dropdown>
      </div>

      <p className="futura reg-18 change">(you can always change this later)</p>

      <QuizActions
        buttonDisabled={buttonDisabled}
        handleNextStep={() => !buttonDisabled && selectedLocation && props.handleNextStep(selectedLocation)}
      />
    </div>
  );
};

export default SelectLocationStep;
