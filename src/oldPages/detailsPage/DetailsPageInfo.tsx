/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { MembershipState } from "../../app/store/plan/plan.types";
import { PackageVariant, PkgItem } from "../../types/Package";
import {
  ProductOption,
  ProductBrand,
  IdName,
  ProductVariant,
  Image,
  OptionType,
  Availability,
} from "../../types/Product";
import Title1 from "../../ui/titles/Title1";
import AddToCart from "./components/AddToCart";
import DetailsPageSelectPlan from "./components/DetailsPageSelectPlan";
import ProductInfo from "./components/ProductInfo";
import {
  SelectedOptions,
  SelectedOption,
} from "./store/productDetails/product.types";
import Header1 from "../../ui/headers/Header1";
import { COLORS, SHADES, BREAKPOINTS } from "../../ui/variables";
import FeatherFloydLogo from "../../ui/logos/FeatherFloydLogo";
import ArrowRightBold from "../../ui/icons/ArrowRightBold";
import { Z_INDICIES } from "../../ui/zIndicies";
import { getCustomDetails } from "./detailsPage.service";

const FeatherFloydTag = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  height: 28px;
  width: 132px;
  background-color: ${COLORS.OAT};
  padding: 0 12px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    width: 152px;
    svg {
      margin-left: 0;
    }
  }
  @media ${BREAKPOINTS.MOBILE} {
    margin: 0 auto 32px;
  }
`;

const FeatherFloydLogoContainer = styled.div`
  background-color: ${COLORS.OAT};
  display: flex;
  align-items: center;
  z-index: ${Z_INDICIES.INLINE_BOOST};
`;

const FeatherFloydArrow = styled(ArrowRightBold)`
  margin-left: -24px;
  transition: all 150ms ease;
`;

export interface Option {
  // e.g size: king / identifier: valueIdentifier
  [identifier: string]: string;
}

interface Props {
  title: string;
  identifier: string;
  brand?: ProductBrand;
  mainImage: Image;
  categories: IdName[];
  options?: ProductOption[];
  variants?: ProductVariant[] | PackageVariant[];
  availability: Availability[] | null;
  selectedOptions: SelectedOptions;
  selectedVariant: ProductVariant | PackageVariant | null;
  selectedItems?: PkgItem[];
  selectedItemsQuantity?: { [id: string]: number };
  handleSelectedItemsQuantity?: (
    identifier: string
  ) => (itemsQuantity: number) => void;
  handleOptionSelect?: (
    optionType: OptionType
  ) => (selection: SelectedOption) => void;
  handleResetPackage?: () => void;
  packageHasChanged?: boolean;
  memberRentalPrice: number;
  nonMemberRentalPrice: number;
  retailPrice: number;
  isPackage?: boolean;
  membershipState: MembershipState;
  isMobileBreakpoint: boolean;
  description?: string;
  isQuizResults?: boolean;
  deliveryTimelineText: string;
}

const DetailsPageInfo = ({
  title,
  brand,
  options,
  variants,
  isPackage = false,
  identifier,
  categories,
  retailPrice,
  description,
  availability,
  mainImage,
  selectedItems,
  selectedItemsQuantity,
  handleSelectedItemsQuantity,
  handleResetPackage,
  packageHasChanged,
  selectedOptions,
  selectedVariant,
  memberRentalPrice,
  isMobileBreakpoint,
  handleOptionSelect,
  membershipState,
  nonMemberRentalPrice,
  isQuizResults,
  deliveryTimelineText,
}: Props) => {
  return (
    <div
      css={css`
        ${isMobileBreakpoint ? "margin: 0 24px;" : "width: 100%;"}
      `}
    >
      {brand && brand.identifier === "floyd" && (
        <FeatherFloydTag to="/floyd">
          <FeatherFloydLogoContainer>
            <FeatherFloydLogo
              width={108}
              color={isMobileBreakpoint ? SHADES.SHADE_DARK : SHADES.BLACK}
            />
          </FeatherFloydLogoContainer>
          <FeatherFloydArrow color={SHADES.BLACK} />
        </FeatherFloydTag>
      )}
      <Header1 dataAttentive="product-name">{title}</Header1>
      <div
        css={css`
          margin: 30px 0 16px;
        `}
      >
        <Title1 isBold={true}>How you're renting:</Title1>
      </div>
      {membershipState === MembershipState.NONE ? (
        <DetailsPageSelectPlan
          retailPrice={retailPrice}
          memberRentalPrice={memberRentalPrice}
          nonMemberRentalPrice={nonMemberRentalPrice}
        />
      ) : (
        <AddToCart
          isPackage={isPackage}
          identifier={identifier}
          title={title}
          brand={brand}
          options={options}
          variants={variants}
          retailPrice={retailPrice}
          memberRentalPrice={memberRentalPrice}
          nonMemberRentalPrice={nonMemberRentalPrice}
          availability={availability}
          mainImage={mainImage}
          categories={categories}
          selectedItems={selectedItems}
          selectedItemsQuantity={selectedItemsQuantity}
          handleSelectedItemsQuantity={handleSelectedItemsQuantity}
          handleResetPackage={handleResetPackage}
          packageHasChanged={packageHasChanged}
          selectedOptions={selectedOptions}
          selectedVariant={selectedVariant}
          handleOptionSelect={handleOptionSelect}
          isQuizResults={isQuizResults}
        />
      )}
      <ProductInfo
        description={description}
        isMobileBreakpoint={isMobileBreakpoint}
        customDetails={getCustomDetails(categories, identifier)}
        deliveryTimelineText={deliveryTimelineText}
      />
    </div>
  );
};

export default DetailsPageInfo;
