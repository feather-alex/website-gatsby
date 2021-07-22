/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Carousel from "nuka-carousel";
import { useState, useEffect } from "react";
import ArrowButton from "../../../../../ui/buttons/ArrowButton";
import Analytics from "../../../../../analytics/analytics";
import { PACKAGE } from "../../../../../analytics/package/events";
import { packageDetailImageViewedMapping } from "../../../../../analytics/package/payload-mappings";
import BaseImage from "../../../../../ui/images/BaseImage";
import { ImagesUrls } from "../../../detailsPage.service";

interface Props {
  carouselImages: ImagesUrls[];
  windowWidth: number;
}

const DesktopImageCarousel = ({ carouselImages, windowWidth }: Props) => {
  const [slidesToShow, setSlidesToShow] = useState(2.5);

  useEffect(() => {
    if (windowWidth >= 1100) {
      setSlidesToShow(2.5);
    } else if (windowWidth >= 800) {
      setSlidesToShow(1.5);
    } else {
      setSlidesToShow(1);
    }
  }, [windowWidth]);

  if (carouselImages.length === 0) {
    return null;
  }

  return (
    <Carousel
      cellSpacing={10}
      enableKeyboardControls={true}
      height={"512px"}
      heightMode="current"
      beforeSlide={(currentSlideIndex) =>
        Analytics.trackEvent(
          PACKAGE.IMAGE_VIEWED,
          packageDetailImageViewedMapping({
            imageUrl: carouselImages[currentSlideIndex].url,
            imageIndex: currentSlideIndex,
          })
        )
      }
      renderBottomCenterControls={null}
      renderCenterLeftControls={({ previousSlide }) => (
        <ArrowButton prev={true} onClick={previousSlide} />
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <ArrowButton onClick={nextSlide} />
      )}
      cellAlign="left"
      wrapAround={true}
      speed={600}
      easing="easeLinear"
      slidesToShow={slidesToShow}
    >
      {carouselImages.map((image, index) => {
        return (
          <div
            key={index}
            css={css`
              height: 512px;
            `}
            data-attentive={index === 0 ? "product-image" : undefined}
          >
            <BaseImage
              imgUrl={image.url}
              zoomUrl={image.zoomUrl}
              height={512}
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default DesktopImageCarousel;
