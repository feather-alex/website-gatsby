/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useSelector } from "react-redux";
import { Link } from "gatsby";
import Carousel from "nuka-carousel";

import BaseImage from "../images/BaseImage";
import ArrowButton from "../buttons/ArrowButton";
import { COLORS } from "../variables";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";

interface Props {
  carouselImages: string[];
  to: string;
}

const HEIGHT = 176;
const HEIGHT_PX = "176px";

const renderImage = (index: number, image: string, to: string) => (
  <Link
    key={image}
    to={to}
    css={css`
      display: block;
      height: ${HEIGHT}px;
      background-color: ${COLORS.CLOUD};
      padding: 24px;
      & img {
        object-fit: contain;
      }
    `}
    data-attentive={index === 0 ? "product-image" : undefined}
  >
    <BaseImage imgUrl={image} height={HEIGHT} />
  </Link>
);

const PackageCardCarousel = ({ carouselImages, to }: Props) => {
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  if (carouselImages.length === 0) {
    return null;
  }

  if (
    carouselImages.length < 4 ||
    (isMobileBreakpoint && carouselImages.length < 3)
  ) {
    return (
      <Carousel
        cellSpacing={2}
        height={HEIGHT_PX}
        heightMode="current"
        renderBottomCenterControls={null}
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
        cellAlign="left"
        slidesToShow={carouselImages.length}
      >
        {carouselImages.map((image, index) => renderImage(index, image, to))}
      </Carousel>
    );
  }

  return (
    <Carousel
      cellSpacing={2}
      enableKeyboardControls={true}
      height={HEIGHT_PX}
      heightMode="current"
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
      slidesToShow={isMobileBreakpoint ? 2.5 : 3.3}
    >
      {[...carouselImages, ...carouselImages].map((image, index) =>
        renderImage(index, image, to)
      )}
    </Carousel>
  );
};

export default PackageCardCarousel;
