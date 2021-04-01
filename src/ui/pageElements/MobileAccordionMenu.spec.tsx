/** @jsx jsx */
import { jsx } from "@emotion/react";
import { render, fireEvent } from "@testing-library/react";
import MobileAccordionMenu from "./MobileAccordionMenu";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { History } from "history";
import createRootReducer from "../../store/reducer";

describe("<MobileAccordionMenu />", () => {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockStore = createStore(createRootReducer({} as History<any>));

  it("renders the title and body", () => {
    const handleClick = jest.fn();
    const title = "Test Title";
    const body = "Test Body";
    const { getByText } = render(
      <Provider store={mockStore}>
        <MobileAccordionMenu
          isMenuOpen={false}
          title={title}
          onClick={handleClick}
        >
          {body}
        </MobileAccordionMenu>
      </Provider>
    );
    expect(getByText(title)).toBeTruthy();
    expect(getByText(body)).toBeTruthy();
  });

  it("calls the onClick function when clicked", () => {
    const handleClick = jest.fn();
    const title = "Test Title";
    const body = "Test Body";
    const { getByText } = render(
      <Provider store={mockStore}>
        <MobileAccordionMenu
          isMenuOpen={false}
          title={title}
          onClick={handleClick}
        >
          {body}
        </MobileAccordionMenu>
      </Provider>
    );
    const panelTitle = getByText(title).parentElement;
    if (!panelTitle) {
      throw new Error("Could not get panel title element");
    }

    fireEvent.click(panelTitle);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
