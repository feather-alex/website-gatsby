/** @jsx jsx */
import { jsx } from "@emotion/react";
import { render, fireEvent } from "@testing-library/react";
import SelectInput, { InputType } from "./SelectInput";

describe("<SelectInput />", () => {
  it("renders the label", () => {
    const handleChange = jest.fn();
    const label = "Test Body";
    const { getByText } = render(
      <SelectInput
        isChecked={false}
        inputType={InputType.Checkbox}
        onChange={handleChange}
      >
        {label}
      </SelectInput>
    );

    expect(getByText(label)).toBeTruthy();
  });

  it("calls the onChange function when clicked", () => {
    const handleChange = jest.fn();
    const label = "Test Body";
    const { getByText } = render(
      <SelectInput
        isChecked={false}
        inputType={InputType.Checkbox}
        onChange={handleChange}
      >
        {label}
      </SelectInput>
    );

    const inputEl = getByText(label);
    fireEvent.click(inputEl);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
