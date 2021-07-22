/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Select, {
  ValueType,
  Styles,
  OptionProps,
  components,
} from "react-select";

import { FilterMap } from "./filter.service";
import {
  getCurrentOption,
  OptionValue,
  isValueType,
  getClickArgs,
  options,
} from "./DesktopSortDropdown.service";
import { SHADES, COLORS, BRAND } from "../../ui/variables";
import { Z_INDICIES } from "../../ui/zIndicies";
import CheckmarkIcon from "../../ui/icons/small/CheckmarkIcon";
import ChevronIcon from "../../ui/icons/small/ChevronIcon";

interface Props {
  handleSortOptionClick: (sortIdentifier: string, direction: string) => void;
  activeFilters: FilterMap;
}

const Option = (props: OptionProps<OptionValue>) =>
  props.isSelected ? (
    <div
      css={css`
        display: flex;
        align-items: center;
        background-color: ${COLORS.MINT};
        color: ${BRAND.PRIMARY_TEXT};
        padding: 8px 16px;
        font-size: 16px;
        line-height: 20px;
      `}
    >
      <CheckmarkIcon
        css={css`
          margin-right: 6px;
        `}
      />
      {props.children}
    </div>
  ) : (
    <components.Option {...props} />
  );

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <ChevronIcon />
  </components.DropdownIndicator>
);

const customStyles: Styles = {
  option: () => ({
    cursor: "pointer",
    backgroundColor: SHADES.WHITE,
    color: BRAND.PRIMARY_TEXT,
    padding: "8px 16px",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "20px",
    transition: "background-color 150ms ease",
    ":hover": {
      backgroundColor: COLORS.CLOUD,
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
    padding: "24px 0",
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
    right: "0px",
    top: "9px",
    width: "240px",
    zIndex: Z_INDICIES.QUANTITY_SELECT,
  }),
  menuList: () => ({
    padding: "8px 0",
    backgroundColor: SHADES.WHITE,
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.08)",
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
  singleValue: () => ({
    width: "max-content",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
  }),
  group: () => ({}),
  groupHeading: () => ({
    paddingTop: "8px",
  }),
};

const DesktopSortDropdown = ({
  handleSortOptionClick,
  activeFilters,
}: Props) => {
  const currentOption = getCurrentOption(activeFilters);

  const handleUpdate = (option: ValueType<OptionValue>) => {
    if (!isValueType(option)) {
      return;
    }
    const args = getClickArgs(option.value);
    handleSortOptionClick(...args);
  };
  return (
    <Select
      aria-label={"Sort Order Select"}
      value={currentOption}
      options={options}
      components={{ Option, DropdownIndicator }}
      onChange={handleUpdate}
      styles={customStyles}
      isSearchable={false}
    />
  );
};

export default DesktopSortDropdown;
