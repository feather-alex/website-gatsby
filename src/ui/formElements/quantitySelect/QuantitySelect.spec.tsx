/** @jsx jsx */
import { jsx } from "@emotion/core";
import { render, fireEvent } from "@testing-library/react";
import selectEvent from "react-select-event";
import QuantitySelect from "./QuantitySelect";

describe("<QuantitySelect />", () => {
  it("can have a different initial quantity besides 1", async () => {
    const handleChangeMock = jest.fn();
    const { getByText } = render(
      <QuantitySelect handleChange={handleChangeMock} initialQuantity={5} />
    );

    expect(getByText("5")).toBeTruthy();
  });

  it("can change selection from the default", async () => {
    const handleChangeMock = jest.fn();
    const { getByLabelText } = render(
      <QuantitySelect handleChange={handleChangeMock} initialQuantity={1} />
    );

    await selectEvent.select(getByLabelText("Product Quantity Select"), "3");

    expect(handleChangeMock).toHaveBeenCalledTimes(1);
    expect(handleChangeMock).toHaveBeenCalledWith(3);
  });

  it("can remove selection from the default", async () => {
    const handleChangeMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <QuantitySelect handleChange={handleChangeMock} initialQuantity={1} />
    );

    await selectEvent.select(
      getByLabelText("Product Quantity Select"),
      "Remove"
    );

    expect(getByText("0")).toBeTruthy();
    expect(handleChangeMock).toHaveBeenCalledTimes(1);
    expect(handleChangeMock).toHaveBeenCalledWith(0);
  });

  it("can change to custom selections", async () => {
    const handleChangeMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <QuantitySelect handleChange={handleChangeMock} initialQuantity={1} />
    );

    await selectEvent.select(getByLabelText("Product Quantity Select"), "10+");

    fireEvent.change(getByLabelText("Product Quantity"), {
      target: { value: "23" },
    });
    fireEvent.click(getByText("Update"));

    expect(getByText("23")).toBeTruthy();
    expect(handleChangeMock).toHaveBeenCalled();
    expect(handleChangeMock).toHaveBeenCalledWith(23);
  });
});
