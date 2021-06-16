/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Location } from "@reach/router";
import { compose } from "redux";
import { connect } from "react-redux";
import * as qs from "query-string";

import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import {
  getProductDetailsRequest,
  GetProductDetailsRequest,
} from "./store/productDetails/product.actions";
import { State as GlobalState, APIError } from "../../types/ReduxState";
import Analytics from "../../analytics/analytics";
import { DETAILS_PAGE } from "../../analytics/details-page/events";
import {
  productDetailPageViewedPayloadMapping,
  threekitPlayerViewedMapping,
} from "../../analytics/details-page/payload-mappings";
import PAGES from "../../analytics/pages";
import Layout from "../../components/Layout";
import {
  DeliveryAreaIdentifier,
  MembershipState,
} from "../../app/store/plan/plan.types";
import {
  getMembershipState,
  getDeliveryAreaIdentifier,
  getDeliveryZipCode,
  getDeliveryTimelineText,
} from "../../app/store/plan/plan.selectors";
import {
  getProductDetails,
  getIsFetching,
  getError,
} from "./store/productDetails/product.selectors";
import ErrorPage from "../../components/ErrorPage";
import Helmet from "../../components/Helmet";
import Loading from "../../components/Loading";
import {
  FullProductDetails,
  ProductVariant,
  OptionType,
} from "../../types/Product";
import {
  SelectedOptions,
  SelectedOption,
} from "./store/productDetails/product.types";
import { BRAND, SHADES } from "../../ui/variables";
import {
  getInitialSelections,
  getImageSrcArray,
  determineSelectedVariant,
} from "./detailsPage.service";
import DesktopProductImages from "./components/DesktopProductImages";
import DetailsPageInfo from "./DetailsPageInfo";
import Breadcrumb, { CurrentType } from "./components/Breadcrumb";
import TakeTheQuizPreFooter from "../../ui/footers/TakeTheQuizPreFooter";
import MobileImageCarousel from "./components/MobileImageCarousel";
import ProductDetailsInfo from "./components/ProductDetailsInfo";
import ProductPairings from "./components/ProductPairings";
import { queryToList } from "../productListing/filter.service";
import VariableImageFeature from "../../ui/pageElements/VariableImageFeature";
import FeatherFloydLogo from "../../ui/logos/FeatherFloydLogo";
import Header2 from "../../ui/headers/Header2";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import ProductOrPackageNotFound from "./ProductOrPackageNotFoundPage";
import {
  ToggleOverlay,
  toggleOverlay as toggleOverlayAction,
} from "../../app/store/overlay/overlay.actions";
import { Overlays } from "../../app/store/overlay/overlay.types";
// import ThreekitPlayerOverlay from '../../threekit/ThreekitPlayerOverlay';
import { getIs3DOverlayOpen } from "../../app/store/overlay/overlay.selectors";

const FeatherFloydHeader = styled(Header2)`
  max-width: 472px;
  margin: 24px 0 32px;
`;

interface MatchParams {
  productIdentifier: string;
}
interface StateProps {
  productData: FullProductDetails;
  isMobileBreakpoint: boolean;
  membershipState: MembershipState;
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  postalCode: string | null;
  deliveryTimelineText: string;
  isFetching: boolean;
  apiError: APIError | null;
  is3DOverlayOpen: boolean;
}

interface DispatchProps {
  getProductDetailsRequest: GetProductDetailsRequest;
  toggleOverlay: ToggleOverlay;
}

type Props = StateProps & DispatchProps & Location;

interface State {
  selectedOptions: SelectedOptions;
  selectedVariant: ProductVariant | null;
}

class ProductDetailsPage extends React.Component<Props, State> {
  // TODO: We should really drive this off of the query param rather than
  //       React state, so that if someone shares a piece of furniture
  //       their friend and future customer gets the right one.
  public readonly state: Readonly<State> = {
    selectedOptions: {
      [OptionType.Color]: null,
      [OptionType.Material]: null,
      [OptionType.Structure]: null,
    },
    selectedVariant: null,
  };

  componentDidMount() {
    this.loadProductDetails();

    Analytics.trackPage(PAGES.PRODUCT_DETAILS);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const {
      productData,
      membershipState,
      postalCode,
      deliveryAreaIdentifier,
      location,
    } = this.props;

    // Product details request from componentDidMount has successfully completed
    if (
      this.props.productData.identifier !== "" &&
      (this.props.productData.identifier !== prevProps.productData.identifier ||
        // If the data was refreshed without the identifier changing
        (prevProps.isFetching &&
          this.props.isFetching !== prevProps.isFetching))
    ) {
      const initialVariantIdentifier = queryToList(
        qs.parse(location.search)["variant"]
      )[0];
      const { selectedOptions, selectedVariant } = getInitialSelections(
        productData,
        initialVariantIdentifier
      );

      if (this.props.productData.variants.length === 1) {
        this.props.history.replace(
          `/products/${this.props.productData.identifier}`
        );
      }

      this.setState({ selectedOptions, selectedVariant });

      if (selectedVariant) {
        Analytics.trackEvent(
          DETAILS_PAGE.VIEW_PRODUCT,
          productDetailPageViewedPayloadMapping({
            productData,
            selectedVariant,
            membershipState,
            postal: postalCode ? postalCode : "",
            deliveryAreaIdentifier:
              deliveryAreaIdentifier || DeliveryAreaIdentifier.All,
          })
        );
      }
    }

    // We clicked on a product from the YouMayAlsoLike section
    if (
      this.props.match.params.productIdentifier !==
      prevProps.match.params.productIdentifier
    ) {
      window.scrollTo(0, 0);
      this.loadProductDetails();
    } else if (
      // if we changed our selected variant, re-write the URL and track the event
      this.state.selectedVariant &&
      this.state.selectedVariant.identifier !==
        prevState.selectedVariant?.identifier &&
      this.props.productData.variants.length > 1
    ) {
      this.props.history.replace(
        `/products/${this.props.productData.identifier}?variant=${this.state.selectedVariant.identifier}`
      );

      // Make sure we fire the tracking event only after changing the initial selection
      if (prevState.selectedVariant) {
        Analytics.trackEvent(
          DETAILS_PAGE.VIEW_PRODUCT,
          productDetailPageViewedPayloadMapping({
            productData,
            selectedVariant: this.state.selectedVariant,
            membershipState,
            postal: postalCode ? postalCode : "",
            deliveryAreaIdentifier:
              deliveryAreaIdentifier || DeliveryAreaIdentifier.All,
          })
        );
      }
    }
  }

  loadProductDetails = () => {
    const { productIdentifier } = this.props.match.params;
    this.props.getProductDetailsRequest({ productIdentifier });
  };

  handleOptionSelect = (optionType: OptionType) => (
    selection: SelectedOption
  ) => {
    this.setState((prevState, prevProps) => {
      const newSelectedOptions = {
        ...prevState.selectedOptions,
        [optionType]: {
          identifier: selection.identifier,
          name: selection.name,
        },
      };

      let newSelectedVariant = determineSelectedVariant(
        newSelectedOptions,
        prevProps.productData.variants
      );

      // if we don't find a match with these options, don't fret we just need to find
      // the first variant which contains the latest option selection
      if (!newSelectedVariant) {
        const firstVariantWithSelection = prevProps.productData.variants.find(
          (variant) =>
            variant.options.some(
              (option) =>
                option.type === optionType &&
                option.valueIdentifier === selection.identifier
            )
        );
        if (firstVariantWithSelection) {
          // set the selected options to the options of the selected variant
          firstVariantWithSelection.options.map((option) => {
            newSelectedOptions[option.type] = {
              identifier: option.valueIdentifier,
              name: option.valueName,
            };
          });
          newSelectedVariant = firstVariantWithSelection;
        }
      }

      return {
        selectedOptions: newSelectedOptions,
        selectedVariant: newSelectedVariant,
      };
    });
  };

  handleOpen3DModal = () => {
    const { selectedVariant } = this.state;
    const { productData, toggleOverlay } = this.props;

    toggleOverlay(Overlays.ThreeDOverlayOpen, true);

    Analytics.trackEvent(
      DETAILS_PAGE.THREEKIT_VIEWED,
      threekitPlayerViewedMapping({
        productIdentifier: productData.identifier,
        variant: selectedVariant,
      })
    );
  };

  render() {
    const {
      isMobileBreakpoint,
      membershipState,
      productData,
      isFetching,
      apiError,
      deliveryAreaIdentifier,
      deliveryTimelineText,
    } = this.props;

    const { selectedOptions, selectedVariant } = this.state;

    if (apiError) {
      // if it is a 404 on a product render a specific error page
      if (apiError.status === 404) {
        return <ProductOrPackageNotFound />;
      } else {
        return (
          <ErrorPage
            title={`${apiError.status} ${apiError.error}`}
            content={apiError.message}
          />
        );
      }
    }

    if (isFetching || selectedVariant === null) {
      return (
        <Layout>
          <Loading />
        </Layout>
      );
    }

    // if the product has loaded and there are no variants
    // it is because they have all been disabled, and as such
    // we should read this case like a 404
    if (productData.variants.length === 0) {
      return <ProductOrPackageNotFound />;
    }

    const carouselImages = getImageSrcArray(
      isMobileBreakpoint,
      selectedVariant.mainImage,
      selectedVariant.otherImages,
      selectedVariant.detailImages,
      selectedVariant.sceneImages
    );

    return (
      <Layout>
        <Helmet
          title={productData.title}
          brand={productData.brand.name}
          description={productData.description}
          identifier={productData.identifier}
          imageUrl={
            `${selectedVariant.mainImage.desktop}?auto=format&bg=f8f8f8&q=80` ||
            undefined
          }
          pageUrl={`https://www.livefeather.com/products/${productData.identifier}`}
          price={selectedVariant.rentalPrices[12].toString() || undefined}
          product={true}
          availability={
            (selectedVariant &&
            selectedVariant.availability.find(
              (stock) => stock.deliveryArea === deliveryAreaIdentifier
            )
              ? "in stock"
              : "out of stock") || undefined
          }
        />
        {productData["3dAssetId"] && (
          <ThreekitPlayerOverlay
            assetId={productData["3dAssetId"]}
            selectedVariantIdentifier={selectedVariant.identifier}
          />
        )}

        <Breadcrumb
          type={CurrentType.Product}
          category={productData.categories[0]}
          title={productData.title}
          isMobileBreakpoint={isMobileBreakpoint}
        />
        <div>
          <section
            css={css`
              background-color: ${BRAND.BACKGROUND};
              overflow: hidden;
              display: flex;
              padding: ${isMobileBreakpoint ? `0 0 80px` : `0 0 112px`};
              ${isMobileBreakpoint && `flex-direction: column;`}
            `}
          >
            {isMobileBreakpoint ? (
              <div
                css={css`
                  padding-bottom: 48px;
                `}
              >
                <MobileImageCarousel
                  carouselImages={carouselImages}
                  threekitAssetId={productData["3dAssetId"]}
                  open3DModal={this.handleOpen3DModal}
                />
              </div>
            ) : (
              <DesktopProductImages
                key={carouselImages[0].url}
                imagesUrls={carouselImages}
                currentProductIdentifier={productData.identifier}
                selectedVariant={selectedVariant}
                threekitAssetId={productData["3dAssetId"]}
              />
            )}

            {selectedVariant && selectedOptions && (
              <div
                css={css`
                  ${isMobileBreakpoint
                    ? `width: 100%;`
                    : `
                  width: 50%;
                  align-self: center;
                  padding: 0 96px 0 72px;
                  @media screen and (max-width: 1190px) {
                    padding: 0 8vw;
                  }
                  @media screen and (max-width: 1060px) {
                    padding: 0 6vw;
                  }
                  @media screen and (max-width: 950px) {
                    padding: 0 4vw;
                  }
                  @media screen and (max-width: 860px) {
                    padding: 0 2vw;
                  }
                  @media screen and (max-width: 790px) {
                    padding: 0 4px;
                  }
                  `}
                `}
              >
                <DetailsPageInfo
                  title={productData.title}
                  identifier={productData.identifier}
                  brand={productData.brand}
                  mainImage={selectedVariant.mainImage}
                  categories={productData.categories}
                  options={productData.options}
                  variants={productData.variants}
                  availability={selectedVariant.availability}
                  selectedOptions={selectedOptions}
                  selectedVariant={selectedVariant}
                  handleOptionSelect={this.handleOptionSelect}
                  memberRentalPrice={selectedVariant.rentalPrices[12]}
                  nonMemberRentalPrice={selectedVariant.rentalPrices[3]}
                  retailPrice={selectedVariant.retailPrice}
                  membershipState={membershipState}
                  isMobileBreakpoint={isMobileBreakpoint}
                  deliveryTimelineText={deliveryTimelineText}
                />
              </div>
            )}
          </section>
          {selectedVariant && (
            <ProductDetailsInfo
              brand={productData.brand}
              description={productData.description}
              dimensions={selectedVariant.dimensions}
              materials={productData.materials}
            />
          )}
          <ProductPairings
            productIdentifiers={[productData.identifier]}
            categoryIdentifier={productData.categories[0].identifier}
          />
          {productData.brand.identifier === "floyd" ? (
            <VariableImageFeature
              image={{
                src: isMobileBreakpoint
                  ? "https://img.livefeather.com/pages-new/Floyd/floyd-plp-mobile.png"
                  : "https://img.livefeather.com/pages-new/Floyd/floyd-plp-desktop.png",
                alt: "Floyd bed in condo",
              }}
              imageWidthPercentage={65}
            >
              <FeatherFloydLogo width={144} color={SHADES.WHITE} />
              <FeatherFloydHeader color={SHADES.WHITE}>
                Floyd Furniture Meets Feather Flexibility
              </FeatherFloydHeader>
              <Button style={ButtonStyle.PRIMARY_INVERTED} to="/floyd">
                Learn More
              </Button>
            </VariableImageFeature>
          ) : (
            <TakeTheQuizPreFooter isMobileBreakpoint={isMobileBreakpoint} />
          )}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  productData: getProductDetails(state),
  isFetching: getIsFetching(state),
  apiError: getError(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  membershipState: getMembershipState(state),
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state),
  postalCode: getDeliveryZipCode(state),
  deliveryTimelineText: getDeliveryTimelineText(state),
  is3DOverlayOpen: getIs3DOverlayOpen(state),
});

const mapDispatchToProps: DispatchProps = {
  getProductDetailsRequest,
  toggleOverlay: toggleOverlayAction,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ProductDetailsPage);
