/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import ResponsiveImage from '../../../ui/images/ResponsiveImage';
import { BRAND, SHADES } from '../../../ui/variables';
import { DETAILS_PAGE } from '../../../analytics/details-page/events';
import {
  productDetailImageViewedMapping,
  threekitPlayerViewedMapping
} from '../../../analytics/details-page/payload-mappings';
import Analytics from '../../../analytics/analytics';
import BaseImage from '../../../ui/images/BaseImage';
import { ProductVariant } from '../../../types/Product';
import { ImagesUrls } from '../detailsPage.service';
import ThreeDIcon from '../../../ui/icons/ThreeDIcon';
import ThreekitPlayer from '../../../threekit/ThreekitPlayer';

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 74px;
  height: 74px;
  margin: 0 4px 8px;
  cursor: pointer;
  border-radius: 50%;

  ${({ isSelected }: { isSelected: boolean }) =>
    isSelected
      ? `border: 2px solid ${BRAND.PRIMARY_TEXT};`
      : `&:hover {
      border: 2px solid ${SHADES.SHADE_LIGHT};
    }`}
`;

const Thumbnail = styled.div`
  height: 64px;
  width: 64px;
  border: 1px solid ${SHADES.SHADE_LIGHTER};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* this div below is necessary for accurate spacing between the main and bottom images */
/* position and size needed to work visually with the ThreekitPlayer */
const CurrentImageContainer = styled.div`
  position: relative;
  height: 0;
  padding-bottom: calc((500 / 747) * 100%);
`;

const SwatchVerticalDivider = styled.div`
  position: relative;
  top: 4px;
  width: 1px;
  height: 64px;
  background-color: ${BRAND.ACCENT};
  margin: 0 16px;
`;

interface Props {
  selectedVariant: ProductVariant | null;
  imagesUrls: ImagesUrls[];
  threekitAssetId: string | null;
  currentProductIdentifier: string;
}

interface State {
  selectedMainImages: ImagesUrls;
  currentMainImages: ImagesUrls;
  showThreekitPlayer: boolean;
}

class ProductImages extends React.Component<Props, State> {
  public readonly state: Readonly<State> = {
    selectedMainImages: this.props.imagesUrls[0],
    currentMainImages: this.props.imagesUrls[0],
    showThreekitPlayer: false
  };

  componentDidUpdate(prevProps: Props) {
    const { selectedVariant, imagesUrls } = this.props;
    const { selectedVariant: prevSelectedVariant } = prevProps;

    if (selectedVariant && prevSelectedVariant && selectedVariant.identifier !== prevSelectedVariant.identifier) {
      const newSelectedMainImages = imagesUrls.find((imageUrls) => imageUrls.url === selectedVariant.mainImage.desktop);
      this.setState({
        selectedMainImages: newSelectedMainImages
      });
    }

    // Temporary hard-coded solution for akepa dresser and nightstand
    if (
      selectedVariant !== prevSelectedVariant &&
      selectedVariant &&
      selectedVariant.identifier.includes('akepa-color')
    ) {
      this.setState({
        currentMainImages: selectedVariant.mainImage.desktop
          ? { ...this.props.imagesUrls[0], url: selectedVariant.mainImage.desktop }
          : this.props.imagesUrls[0]
      });
    }
  }

  handleMainImageSelection = (urls: ImagesUrls, index: number) => () => {
    this.setState({
      selectedMainImages: urls,
      currentMainImages: urls,
      showThreekitPlayer: false
    });
    Analytics.trackEvent(
      DETAILS_PAGE.PRODUCT_IMAGE_SELECTED,
      productDetailImageViewedMapping({ imageUrl: urls.url, imageIndex: index })
    );
  };

  handleAdditionalImageMouseOver = (urls: ImagesUrls, index: number) => () => {
    if (!this.state.showThreekitPlayer) {
      this.setState({ currentMainImages: urls });
      Analytics.trackEvent(
        DETAILS_PAGE.PRODUCT_IMAGE_VIEWED,
        productDetailImageViewedMapping({ imageUrl: urls.url, imageIndex: index })
      );
    }
  };

  handleAdditionalImageMouseOut = () => {
    this.setState((prevState) => ({ currentMainImages: prevState.selectedMainImages }));
  };

  renderAdditionalImages = () => {
    const { imagesUrls } = this.props;
    const { selectedMainImages, showThreekitPlayer } = this.state;

    return imagesUrls.map((imageUrls, index) => (
      <ThumbnailContainer
        key={imageUrls.url}
        isSelected={!showThreekitPlayer && imageUrls.url === selectedMainImages.url}
      >
        <Thumbnail
          data-attentive={index === 0 ? 'product-image' : undefined}
          tabIndex={0}
          role="button"
          onClick={this.handleMainImageSelection(imageUrls, index)}
          onMouseOver={this.handleAdditionalImageMouseOver(imageUrls, index)}
          onMouseOut={this.handleAdditionalImageMouseOut}
        >
          <BaseImage imgUrl={imageUrls.url} width={600} isRounded={true} />
        </Thumbnail>
      </ThumbnailContainer>
    ));
  };

  handleClickThreekit = () => {
    this.setState({ showThreekitPlayer: true });

    const { currentProductIdentifier, selectedVariant } = this.props;
    Analytics.trackEvent(
      DETAILS_PAGE.THREEKIT_VIEWED,
      threekitPlayerViewedMapping({
        productIdentifier: currentProductIdentifier,
        variant: selectedVariant
      })
    );
  };

  renderThreekitIcon = () => {
    const { showThreekitPlayer } = this.state;

    return (
      <ThumbnailContainer isSelected={showThreekitPlayer}>
        <Thumbnail tabIndex={0} role="button" onClick={this.handleClickThreekit}>
          <ThreeDIcon color={showThreekitPlayer ? BRAND.PRIMARY_TEXT : SHADES.SHADE_LIGHT} />
        </Thumbnail>
      </ThumbnailContainer>
    );
  };

  render() {
    const { currentMainImages, showThreekitPlayer } = this.state;
    const { threekitAssetId, selectedVariant } = this.props;

    return (
      <section
        css={css`
          width: 50%;
          margin-left: 48px;
          /* Temporary fix to prevent overflow at this width. */
          @media screen and (max-width: 950px) {
            margin-left: 0;
          }
        `}
      >
        <CurrentImageContainer>
          {!showThreekitPlayer && (
            <ResponsiveImage src={currentMainImages.url} zoomUrl={currentMainImages.zoomUrl} width={747} height={500} />
          )}

          {/* Player needs to be mounted in order to load */}
          {threekitAssetId && (
            <ThreekitPlayer
              width={747}
              height={500}
              isVisible={showThreekitPlayer}
              assetId={threekitAssetId}
              selectedVariantIdentifier={selectedVariant ? selectedVariant.identifier : ''}
            />
          )}
        </CurrentImageContainer>
        <div
          css={css`
            display: flex;
            justify-content: center;
            margin-top: 24px;
            flex-wrap: wrap;
          `}
        >
          {this.renderAdditionalImages()}
          {threekitAssetId && (
            <div
              css={css`
                display: flex;
                flex-wrap: nowrap;
              `}
            >
              <SwatchVerticalDivider key="3d-divider" />
              {this.renderThreekitIcon()}
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default ProductImages;
