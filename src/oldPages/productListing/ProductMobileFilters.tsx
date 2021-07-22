/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import ProductFilterOption from "./ProductFilterOption";
import { FilterType, getFilters, createQuery } from "./filter.service";
import { Meta } from "../../types/ReduxState";
import React, { useState } from "react";
import ProductCategoryOption from "./ProductCategoryOption";
import ProductSortOptions from "./ProductSortOptions";
import { useHistory } from "react-router";
import ProductFilterAccordion from "./MobileProductFilterAccordion";
import { BRAND } from "../../ui/variables";
import { PanelGroup } from "react-bootstrap";
import { ProductCategories } from "../../utils/productCategories";
import { IdName } from "../../types/Product";

interface Props {
  productMeta: Meta;
}

const productCategories: IdName[] = [
  { identifier: "", name: "All Furniture" },
  { name: ProductCategories.LivingRoom, identifier: "living-room" },
  { name: ProductCategories.Bedroom, identifier: "bedroom" },
  { name: ProductCategories.Dining, identifier: "dining-room" },
  { name: ProductCategories.HomeOffice, identifier: "home-office" },
  { name: ProductCategories.Decor, identifier: "decor" },
  { name: ProductCategories.Lighting, identifier: "lighting" },
  { name: ProductCategories.Outdoor, identifier: "outdoor" },
];

const ProductMobileFilters = ({ productMeta }: Props): JSX.Element | null => {
  const history = useHistory();
  const { location } = history;
  const activeFilters = getFilters(history.location);

  const [openFilters, setOpenFilters] =
    useState<React.MouseEvent<string> | null>(null);
  const [sortOption, setSortOptions] = useState<string | null>();

  const handleSortOptionClick = React.useCallback(
    (sortIdentifier: string, sortDirection: string) => () => {
      let sortOpt = null;

      if (sortIdentifier === "price") {
        sortOpt =
          sortDirection === "d" ? "High to low price" : "Low to high price";
      } else if (sortIdentifier === "title") {
        sortOpt = "A to Z";
      } else if (sortIdentifier === "default") {
        sortOpt = null;
      }

      setSortOptions(sortOpt);

      if (sortIdentifier === "default") {
        history.replace(location.pathname);
      } else {
        const partialQuery = createQuery({
          identifier: sortIdentifier,
          filterType: FilterType.SORT_BY,
          locationSearch: location.search,
          replace: true,
        });
        const newQuery = createQuery({
          identifier: sortDirection,
          filterType: FilterType.ORDER,
          locationSearch: partialQuery,
          replace: true,
        });

        history.replace(`${location.pathname}?${newQuery}`);
      }
    },
    [history, location]
  );

  const handleOpenFilters = React.useCallback(
    (activeKey: React.MouseEvent<string>) => {
      setOpenFilters(activeKey);
    },
    []
  );

  return (
    <PanelGroup
      accordion={true}
      activeKey={openFilters}
      id="panel-group-faq-page"
      onSelect={handleOpenFilters}
      css={css`
        border-top: 1px solid ${BRAND.ACCENT};
        padding-bottom: 160px;
      `}
    >
      {/* TODO: Update once API is ready with new categories */}
      <ProductFilterAccordion header="Category" activeKey={openFilters}>
        {productCategories.map((option) => (
          <ProductCategoryOption key={option.identifier} option={option} />
        ))}
      </ProductFilterAccordion>
      <ProductFilterAccordion
        header="Item type"
        nbSelectedFilters={activeFilters[FilterType.SUBCLASS].length}
        activeKey={openFilters}
      >
        {productMeta.availableFilters.subclasses.map((option) => (
          <ProductFilterOption
            key={option.identifier}
            option={option}
            filterType={FilterType.SUBCLASS}
          />
        ))}
      </ProductFilterAccordion>
      <ProductFilterAccordion
        header="Brand"
        nbSelectedFilters={activeFilters[FilterType.BRAND_FILTER].length}
        activeKey={openFilters}
      >
        {productMeta.availableFilters.brands.map((option) => (
          <ProductFilterOption
            key={option.identifier}
            option={option}
            filterType={FilterType.BRAND_FILTER}
          />
        ))}
      </ProductFilterAccordion>
      <ProductFilterAccordion
        header="Sorting"
        sortOption={sortOption}
        activeKey={openFilters}
      >
        <ProductSortOptions
          handleSortOptionClick={handleSortOptionClick}
          activeFilters={activeFilters}
          isMobileBreakpoint={true}
        />
      </ProductFilterAccordion>
    </PanelGroup>
  );
};

export default ProductMobileFilters;
