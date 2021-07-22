/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

import { State as GlobalState, Meta } from "../../types/ReduxState";
import { connect } from "react-redux";
import Header3 from "../../ui/headers/Header3";
import { BRAND, FONTS } from "../../ui/variables";
import { FilterType, getFilters } from "./filter.service";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import { getDeliveryAreaIdentifier } from "../../app/store/plan/plan.selectors";
import { getProductListMeta } from "./store/productList.selectors";
import ProductFilterOption from "./ProductFilterOption";
import { NavLink, useHistory } from "react-router-dom";
import Title from "../../ui/titles/Title";
import ProductFilterAccordion from "./ProductFilterAccordion";
import Title1 from "../../ui/titles/Title1";
import { ProductCategories } from "../../utils/productCategories";
import { DeliveryAreaIdentifier } from "../../app/store/plan/plan.types";

const HorizontalRule = styled.div`
  height: 1px;
  width: 285px;
  margin: 24px 0;
  background-color: ${BRAND.ACCENT};
`;

interface NavLinkData {
  text: string;
  to: string;
}

interface ConnectedProps {
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  isMobileBreakpoint: boolean;
  productMeta: Meta;
}

type Props = ConnectedProps;

const shopByCategoryNavLinks: NavLinkData[] = [
  { text: ProductCategories.LivingRoom, to: "/products/living-room" },
  { text: ProductCategories.Bedroom, to: "/products/bedroom" },
  { text: ProductCategories.Dining, to: "/products/dining-room" },
  { text: ProductCategories.HomeOffice, to: "/products/home-office" },
  { text: ProductCategories.Decor, to: "/products/decor" },
  { text: ProductCategories.Lighting, to: "/products/lighting" },
  { text: ProductCategories.Outdoor, to: "/products/outdoor" },
];

const ProductFilters = ({ productMeta }: Props): JSX.Element | null => {
  const { location } = useHistory();
  const activeFilters = getFilters(location);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <HorizontalRule
        css={css`
          margin-top: 5px;
        `}
      />
      <ProductFilterAccordion
        header="Item Type"
        numSelectedFilters={activeFilters[FilterType.SUBCLASS].length}
      >
        {productMeta.availableFilters.subclasses.map((option) => (
          <ProductFilterOption
            key={option.identifier}
            option={option}
            filterType={FilterType.SUBCLASS}
          />
        ))}
      </ProductFilterAccordion>

      <HorizontalRule />
      <ProductFilterAccordion
        header="Brand"
        numSelectedFilters={activeFilters[FilterType.BRAND_FILTER].length}
      >
        {productMeta.availableFilters.brands.map((option) => (
          <ProductFilterOption
            key={option.identifier}
            option={option}
            filterType={FilterType.BRAND_FILTER}
          />
        ))}
      </ProductFilterAccordion>

      <HorizontalRule />
      <Header3>Shop by category</Header3>
      <section
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        {shopByCategoryNavLinks.map((link) => {
          const isActive = location.pathname.endsWith(link.to);
          return (
            <div
              key={link.to}
              css={css`
                padding-top: 20px;
              `}
            >
              <NavLink to={link.to} activeClassName="active">
                <Title1 isAnimated={!isActive} isUnderline={isActive}>
                  {link.text}
                </Title1>
              </NavLink>
            </div>
          );
        })}
      </section>
      <HorizontalRule />
      <NavLink
        exact={true}
        to="/products"
        activeStyle={{ visibility: "hidden" }}
        css={css`
          margin-bottom: 32px; /* space when its close to the footer */
        `}
      >
        <Title
          fontSize={19}
          lineHeight={20}
          isBold={true}
          isUnderline={true}
          css={css`
            font-family: ${FONTS.PRIMARY};
          `}
        >
          Or, browse all furniture
        </Title>
      </NavLink>
    </div>
  );
};

const mapStateToProps = (state: GlobalState): ConnectedProps => ({
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  productMeta: getProductListMeta(state),
});

export default connect(mapStateToProps)(ProductFilters);
