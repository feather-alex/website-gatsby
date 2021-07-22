import { FilterType, FilterMap } from "./filter.service";

export interface OptionValue {
  value: string;
  label: string;
}

export enum Order {
  ASC = "a",
  DESC = "d",
}

export const options = [
  { value: "default", label: "Recommended" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "a-z", label: "A to Z" },
];

export const getCurrentOption = (activeFilters: FilterMap) => {
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

  if (isCheckedDefault) {
    return options[0];
  }
  if (isCheckedPriceAsc) {
    return options[2];
  }
  if (isCheckedPriceDesc) {
    return options[1];
  }
  if (isCheckedTitle) {
    return options[3];
  }
  return options[0];
};

export const isValueType = (data: unknown): data is OptionValue => {
  return Boolean(
    typeof data === "object" && data && Object.keys(data).includes("label")
  );
};

export const getClickArgs = (value: string): [string, string] => {
  switch (value) {
    case "price-high": {
      return ["price", Order.DESC];
    }
    case "price-low": {
      return ["price", Order.ASC];
    }
    case "a-z": {
      return ["title", Order.ASC];
    }
    default: {
      return ["default", "default"];
    }
  }
};
