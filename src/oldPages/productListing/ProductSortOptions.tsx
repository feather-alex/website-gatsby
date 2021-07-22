/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FilterMap, FilterType } from "./filter.service";
import { BRAND } from "../../ui/variables";
import SelectInput, { InputType } from "../../ui/formElements/SelectInput";
import Title1 from "../../ui/titles/Title1";
import { Z_INDICIES } from "../../ui/zIndicies";

interface Props {
  handleSortOptionClick: (
    sortIdentifier: string,
    direction: string
  ) => () => void;
  activeFilters: FilterMap;
  isMobileBreakpoint?: boolean;
}

enum Order {
  ASC = "a",
  DESC = "d",
}

const ProductSortOptions = ({
  handleSortOptionClick,
  activeFilters,
  isMobileBreakpoint,
}: Props): JSX.Element => {
  const isCheckedDefault = activeFilters[FilterType.SORT_BY].length === 0;
  const isCheckedPriceDesc =
    activeFilters[FilterType.SORT_BY].includes("price") &&
    activeFilters[FilterType.ORDER].includes(Order.DESC);
  const isCheckedPriceAsc =
    activeFilters[FilterType.SORT_BY].includes("price") &&
    activeFilters[FilterType.ORDER].includes(Order.ASC);
  const isCheckedTitle =
    activeFilters[FilterType.SORT_BY].includes("title") &&
    activeFilters[FilterType.ORDER].includes(Order.ASC);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        ${!isMobileBreakpoint &&
        `
      position: absolute;
      padding: 24px;
      top: 48px;
      right: 0;
      width: 288px;
      z-index: ${Z_INDICIES.PRODUCT_LIST_SORT_OPTIONS};
      background-color: ${BRAND.BACKGROUND};
      `}
        > label:not(:last-child) {
          padding-bottom: 16px;
        }
      `}
    >
      <SelectInput
        isChecked={isCheckedDefault}
        onChange={handleSortOptionClick("default", "default")}
        inputType={InputType.Radio}
      >
        <span
          css={css`
            display: inline-block;
          `}
        >
          <Title1
            color={isCheckedDefault ? BRAND.PRIMARY_TEXT : BRAND.SECONDARY_TEXT}
            isBold={isCheckedDefault}
          >
            Default order
          </Title1>
        </span>
      </SelectInput>
      <SelectInput
        isChecked={isCheckedPriceDesc}
        onChange={handleSortOptionClick("price", Order.DESC)}
        inputType={InputType.Radio}
      >
        <span
          css={css`
            display: inline-block;
          `}
        >
          <Title1
            color={
              isCheckedPriceDesc ? BRAND.PRIMARY_TEXT : BRAND.SECONDARY_TEXT
            }
            isBold={isCheckedDefault}
          >
            Highest to lowest price
          </Title1>
        </span>
      </SelectInput>
      <SelectInput
        isChecked={isCheckedPriceAsc}
        onChange={handleSortOptionClick("price", Order.ASC)}
        inputType={InputType.Radio}
      >
        <span
          css={css`
            display: inline-block;
          `}
        >
          <Title1
            color={
              isCheckedPriceAsc ? BRAND.PRIMARY_TEXT : BRAND.SECONDARY_TEXT
            }
            isBold={isCheckedDefault}
          >
            Lowest to highest price
          </Title1>
        </span>
      </SelectInput>
      <SelectInput
        isChecked={isCheckedTitle}
        onChange={handleSortOptionClick("title", Order.ASC)}
        inputType={InputType.Radio}
      >
        <span
          css={css`
            display: inline-block;
          `}
        >
          <Title1
            color={isCheckedTitle ? BRAND.PRIMARY_TEXT : BRAND.SECONDARY_TEXT}
            isBold={isCheckedDefault}
          >
            A to Z
          </Title1>
        </span>
      </SelectInput>
    </div>
  );
};

export default ProductSortOptions;
