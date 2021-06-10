/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Select, { Styles, components, ValueType } from "react-select";
import { BRAND, SHADES } from "../../variables";
import { CSSProperties, useState, useEffect } from "react";
import ChevronIcon from "../../icons/small/ChevronIcon";
import CustomInput from "./CustomInput";
import { Z_INDICIES } from "../../zIndicies";

export interface OptionValue {
  label: string;
  value: number;
}

const customStyles: Styles = {
  option: (_: CSSProperties, { label }: OptionValue) => ({
    cursor: "pointer",
    backgroundColor: SHADES.WHITE,
    width: 80,
    padding: label === "0" ? "16px" : "8px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "16px",
    ":hover": {
      backgroundColor: BRAND.ACCENT,
    },
  }),
  container: () => ({
    display: "inline-flex",
    position: "relative",
    height: "fit-content",
  }),
  indicatorsContainer: () => ({
    marginLeft: "4px",
  }),
  control: () => ({
    width: "min-content",
    border: "none",
    borderRadius: 24,
    backgroundColor: "transparent",
    display: "flex",
    padding: "1px 0 0 16px",
    justifyContent: "flex-end",
    alignItems: "center",
    ":hover": {
      cursor: "pointer",
      color: SHADES.SHADE_LIGHT,
      path: {
        stroke: SHADES.SHADE_LIGHT,
      },
    },
  }),
  menu: () => ({
    position: "absolute",
    left: "-19px",
    top: "-9px",
    padding: 0,
    width: "min-content",
    zIndex: Z_INDICIES.QUANTITY_SELECT,
  }),
  menuList: () => ({
    backgroundColor: SHADES.WHITE,
    boxShadow: "0px 4px 16px rgba(51, 51, 51, 0.16)",
  }),
  valueContainer: () => ({
    display: "flex",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  singleValue: () => ({}),
  group: () => ({}),
  groupHeading: () => ({
    paddingTop: "8px",
  }),
};

const options = [
  {
    label: "options",
    options: [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
      { value: 5, label: "5" },
      { value: 6, label: "6" },
      { value: 7, label: "7" },
      { value: 8, label: "8" },
      { value: 9, label: "9" },
      { value: 10, label: "10+" },
    ],
  },
  { label: "remove", options: [{ value: 0, label: "0" }] },
];

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatGroupLabel = ({ label }: any) =>
  label === "remove" ? (
    <hr
      data-cy="remove-product-quantity"
      css={css`
        padding: 0;
        margin: 0;
      `}
    />
  ) : null;

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Option = ({ children, ...props }: any) => (
  <components.Option {...props}>
    {props.label === "0" ? "Remove" : children}
  </components.Option>
);
const DropdownIndicator = () => (
  <div
    data-cy="select-product-quantity"
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  >
    <ChevronIcon />
  </div>
);

const isValueType = (data: unknown): data is OptionValue => {
  return Boolean(
    typeof data === "object" && data && Object.keys(data).includes("label")
  );
};

interface Props {
  handleChange: (quantity: number) => void;
  initialQuantity: number;
}

export default function QuantitySelect({
  handleChange,
  initialQuantity,
}: Props) {
  const [currentOption, setCurrentOption] = useState<ValueType<OptionValue>>({
    value: initialQuantity,
    label: initialQuantity.toString(),
  });

  useEffect(() => {
    setCurrentOption({
      value: initialQuantity,
      label: initialQuantity.toString(),
    });
  }, [initialQuantity]);

  const handleUpdate = (option: ValueType<OptionValue>) => {
    // prevents the prices from updating when going from dropdown to number input
    if (isValueType(option) && option.label !== "10+") {
      handleChange(option.value);
    }
    setCurrentOption(option);
  };

  if (isValueType(currentOption) && currentOption.label === "10+") {
    return (
      <div>
        <CustomInput handleUpdate={handleUpdate} />
        {/* the div below keeps the list item layout stable since <CustomInput/> is not part of the normal layout flow */}
        <div
          css={css`
            width: 40px;
            height: 27px;
          `}
        ></div>
      </div>
    );
  }

  return (
    <Select
      aria-label={"Product Quantity Select"}
      value={currentOption}
      onChange={handleUpdate}
      options={options}
      styles={customStyles}
      isSearchable={false}
      formatGroupLabel={formatGroupLabel}
      components={{ Option, DropdownIndicator }}
    />
  );
}
