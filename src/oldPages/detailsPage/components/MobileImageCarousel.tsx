/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Carousel from "nuka-carousel";
import Analytics from "../../../analytics/analytics";
import { PACKAGE } from "../../../analytics/package/events";
import { packageDetailImageViewedMapping } from "../../../analytics/package/payload-mappings";
import { DETAILS_PAGE } from "../../../analytics/details-page/events";
import { productDetailImageViewedMapping } from "../../../analytics/details-page/payload-mappings";
import ResponsiveImage from "../../../ui/images/ResponsiveImage";
import { ImagesUrls } from "../detailsPage.service";
import { useSelector } from "react-redux";
import { getWindowWidth } from "../../../app/store/dimensions/dimensions.selectors";
import ArrowButton from "../../../ui/buttons/ArrowButton";
import { SHADES } from "../../../ui/variables";
import Mobile3DIcon from "../../../ui/icons/Mobile3DIcon";

const CarouselSlide = styled.div`
  height: 336px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${SHADES.WHITE};
`;
interface Props {
  carouselImages: ImagesUrls[];
  isPackage?: boolean;
  open3DModal?: () => void;
  threekitAssetId?: string | null;
}

const MobileImageCarousel = ({
  carouselImages,
  open3DModal,
  threekitAssetId,
  isPackage = false,
}: Props) => {
  const windowWidth = useSelector(getWindowWidth);

  if (carouselImages.length === 0) {
    return null;
  }

  return (
    <Carousel
      cellAlign="center"
      easing="easeSinOut"
      edgeEasing="easeSinOut"
      wrapAround={true}
      dragging={false}
      speed={150}
      beforeSlide={(currentSlideIndex: number) => {
        // We want to make sure we do not fire those events
        // on the 3D slide which is added after all the images
        if (currentSlideIndex !== carouselImages.length) {
          if (isPackage) {
            Analytics.trackEvent(
              PACKAGE.IMAGE_VIEWED,
              packageDetailImageViewedMapping({
                imageUrl: carouselImages[currentSlideIndex].url,
                imageIndex: currentSlideIndex,
              })
            );
          } else {
            Analytics.trackEvent(
              DETAILS_PAGE.PRODUCT_IMAGE_VIEWED,
              productDetailImageViewedMapping({
                imageUrl: carouselImages[currentSlideIndex].url,
                imageIndex: currentSlideIndex,
              })
            );
          }
        }
      }}
      css={css`
        .active .paging-dot {
          fill: ${SHADES.SHADE_LIGHT};
        }

        .paging-dot {
          fill: transparent;
          opacity: 1;
          height: 12px;
          width: 12px;
          circle {
            stroke: ${SHADES.SHADE_LIGHT};
            stroke-width: 2;
            cx: 6;
            cy: 6;
          }
        }

        .slider-control-bottomcenter > ul {
          top: 33px !important;
        }
      `}
      initialSlideHeight={336}
      renderBottomCenterControls={isPackage ? null : undefined}
      renderCenterLeftControls={({ previousSlide }) =>
        isPackage ? <ArrowButton prev={true} onClick={previousSlide} /> : null
      }
      renderCenterRightControls={({ nextSlide }) =>
        isPackage ? <ArrowButton onClick={nextSlide} /> : null
      }
      slidesToShow={1}
      swiping={true}
    >
      {carouselImages.map((image, index) => (
        <CarouselSlide
          key={index}
          data-attentive={index === 0 ? "product-image" : undefined}
        >
          <ResponsiveImage
            src={image.url}
            zoomUrl={image.zoomUrl}
            height={336}
            width={windowWidth}
            objectFit="contain"
          />
        </CarouselSlide>
      ))}
      {threekitAssetId && (
        <CarouselSlide onClick={open3DModal}>
          <Mobile3DIcon />
        </CarouselSlide>
      )}
    </Carousel>
  );
};

export default MobileImageCarousel;
