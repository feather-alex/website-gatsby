import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SSNNotFoundMessage from "./SSNNotFoundMessage";
import { toggleOverlay } from "../../../app/store/overlay/overlay.actions";
import { Overlays } from "../../../app/store/overlay/overlay.types";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({ useDispatch: () => mockDispatch }));

describe("<SSNNotFoundMessage />", () => {
  beforeEach(() => mockDispatch.mockClear());

  it("renders correct messaging for ssn not found error", () => {
    const { getByText } = render(<SSNNotFoundMessage />);

    expect(
      getByText(
        /Uh oh! We're still having trouble finding your records. Please reenter your Social Security Number and double-check your legal name for any typos./
      )
    ).toBeTruthy();
  });

  it(`it calls the function to open the ssn overlay when the customer's SSN wasn't found`, () => {
    const { getAllByText } = render(<SSNNotFoundMessage />);

    const button = getAllByText("Learn more")[0];

    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      toggleOverlay(Overlays.FailedSSNOverlay, true)
    );
  });
});
