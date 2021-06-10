import React from 'react';

export interface Props {
  choice?: string;
  checked?: boolean;
  handleSelect?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const RoundCheckbox = (props: Props) => {
  const handleClick = props.handleSelect
    ? props.handleSelect
    : (event: React.MouseEvent<HTMLInputElement>) => event.stopPropagation();

  return (
    <label className="round-checkbox-container">
      <input type="checkbox" onClick={handleClick} checked={props.checked} data-choice={props.choice} />
      <span data-cy="quiz-checkmark" className={`checkmark ${props.checked ? ` checked` : ``}`} />
    </label>
  );
};

export default RoundCheckbox;
