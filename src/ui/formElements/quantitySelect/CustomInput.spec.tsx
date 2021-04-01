/** @jsx jsx */
import { jsx } from "@emotion/react";
import { render, fireEvent } from "@testing-library/react";
import CustomInput from "./CustomInput";

describe("<CustomInput />", () => {
  describe("with mouse", () => {
    it("fires update on click with inputted number", () => {
      const handleUpdateMock = jest.fn();
      const { getByLabelText, getByText } = render(
        <CustomInput handleUpdate={handleUpdateMock} />
      );

      fireEvent.change(getByLabelText("Product Quantity"), {
        target: { value: "23" },
      });
      fireEvent.click(getByText("Update"));

      expect(handleUpdateMock).toHaveBeenCalledTimes(1);
      expect(handleUpdateMock).toHaveBeenCalledWith({ label: "23", value: 23 });
    });

    it("doesn't update when the input is empty", () => {
      const handleUpdateMock = jest.fn();
      const { getByLabelText, getByText } = render(
        <CustomInput handleUpdate={handleUpdateMock} />
      );

      fireEvent.click(getByText("Update"));

      expect(
        (getByLabelText("Product Quantity") as HTMLInputElement).value
      ).toBe("");
      expect(handleUpdateMock).not.toHaveBeenCalled();
    });
  });

  describe("with keyboard", () => {
    it("fires update on enter with inputted number", () => {
      const handleUpdateMock = jest.fn();
      const { getByLabelText } = render(
        <CustomInput handleUpdate={handleUpdateMock} />
      );

      const inputEl = getByLabelText("Product Quantity");
      fireEvent.change(inputEl, { target: { value: "23" } });
      fireEvent.keyDown(inputEl, { key: "Enter" });

      expect(handleUpdateMock).toHaveBeenCalledTimes(1);
      expect(handleUpdateMock).toHaveBeenCalledWith({ label: "23", value: 23 });
    });

    it("fires update on tab with inputted number", () => {
      const handleUpdateMock = jest.fn();
      const { getByLabelText, getByText } = render(
        <CustomInput handleUpdate={handleUpdateMock} />
      );

      const inputEl = getByLabelText("Product Quantity");
      fireEvent.change(inputEl, { target: { value: "23" } });
      fireEvent.keyDown(getByText("Update"), { key: "Tab" });

      expect(handleUpdateMock).toHaveBeenCalledTimes(1);
      expect(handleUpdateMock).toHaveBeenCalledWith({ label: "23", value: 23 });
    });

    it("doesn't update when the input is empty", () => {
      const handleUpdateMock = jest.fn();
      const { getByLabelText } = render(
        <CustomInput handleUpdate={handleUpdateMock} />
      );
      const inputEl = getByLabelText("Product Quantity") as HTMLInputElement;

      fireEvent.keyDown(inputEl, { key: "Enter" });

      expect(inputEl.value).toBe("");
      expect(handleUpdateMock).not.toHaveBeenCalled();
    });
  });
});
