/** @jsx jsx */
import { useEffect, useRef, useState } from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import Subheader2 from "../../../ui/subheaders/Subheader2";
import Caption from "../../../ui/captions/Caption";
import ArrowButton from "../../../ui/buttons/ArrowButton";
import { BRAND, BREAKPOINTS } from "../../../ui/variables";
import FixedSizeImage from "../../../ui/images/FixedSizeImage";
import { ProductRecommendation } from "../store/cart.types";
import { upsellItemClickedPayloadMapping } from "../../../analytics/cart/payload-mappings";
import Analytics from "../../../analytics/analytics";
import { CART } from "../../../analytics/cart/events";
import { Z_INDICIES } from "../../../ui/zIndicies";
import { APIError } from "../../../types/ReduxState";
import useMount from "../../../utils/useMount";

const Container = styled.div`
  max-width: 1440px;
  padding: 40px 0;
  display: flex;
  align-items: center;
  margin: auto;

  @media screen and (max-width: 1193px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media ${BREAKPOINTS.MOBILE} {
    align-items: center;
  }
`;

const Heading = styled.div`
  max-width: 330px;
  min-width: 270px;
  margin-right: 48px;

  @media screen and (max-width: 1193px) {
    margin-bottom: 16px;
  }

  @media ${BREAKPOINTS.MOBILE} {
    width: 100%;
    text-align: center;
    margin-right: 0;
  }
`;

const Pagination = styled(Caption)`
  @media ${BREAKPOINTS.MOBILE} {
    display: none;
  }
`;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 704px;

  @media ${BREAKPOINTS.MOBILE} {
    display: none;
  }
`;

const productWidth = 160;
const maxProducts = 5;
const minProducts = 4;

const Products = styled.div`
  min-width: ${productWidth * minProducts}px;
  max-width: ${productWidth * maxProducts}px;
  display: flex;
  overflow: hidden;
`;

const Image = styled.div`
  width: 128px;
  height: 128px;
  transition: transform 200ms ease;
`;

const Product = styled(Link)`
  width: ${productWidth}px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: ${Z_INDICIES.UPSELL_PRODUCT_CARD_LINK};

  &:hover ${Image} {
    transform: scale(1.1);
  }
`;

const Price = styled(Caption)`
  text-align: center;
  margin-top: 16px;
`;

const Swipe = styled.div`
  display: none;
  overflow-x: scroll;
  scrollbar-width: none;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${BREAKPOINTS.MOBILE} {
    display: flex;
  }

  a {
    margin-right: 27px;
  }

  a:first-of-type {
    margin-left: 40px;
  }

  a:last-of-type {
    padding-right: 40px;
  }
`;

interface Props {
  products: ProductRecommendation[];
  loading: boolean;
  error: APIError | null;
  rentalLength: number | null;
  className?: string;
  cartUuid: string;
}

const CartRecommendations = ({
  products,
  rentalLength,
  className,
  loading,
  error,
  cartUuid,
}: Props) => {
  const [displayCount, setDisplayCount] = useState<number>(5);
  const [activePage, setActivePage] = useState<number>(1);
  const productsRef = useRef<HTMLDivElement>(null);

  const calculateDisplayCount = () => {
    if (!productsRef.current || productsRef.current.offsetWidth === 0) return;

    const navigationWidth = 64;
    const maxCarouselWidth = 800;
    const productsContainerWidth =
      productsRef.current.offsetWidth - navigationWidth;

    const width =
      productsContainerWidth > maxCarouselWidth
        ? maxCarouselWidth
        : productsContainerWidth;
    const newCount = Math.floor(width / productWidth);
    setDisplayCount(newCount);
  };

  useEffect(() => {
    const pageCount = Math.ceil(products.length / displayCount);

    if (pageCount !== 0 && pageCount < activePage) {
      setActivePage(pageCount);
    }
  }, [displayCount, activePage, products]);

  useMount(() => {
    window.addEventListener("resize", calculateDisplayCount);

    return () => {
      window.removeEventListener("resize", calculateDisplayCount);
    };
  });

  useEffect(() => {
    calculateDisplayCount();
  }, [productsRef]);

  if (error || loading || (loading === false && products.length === 0)) {
    return null;
  }

  // remove 1 as 0 is the true "first page" when slicing
  const offset = activePage === 1 ? 0 : (activePage - 1) * displayCount;
  const activeProducts = products.slice(offset, displayCount + offset);
  const pageCount = Math.ceil(products.length / displayCount);
  const hasMultiplePages = pageCount > 1;

  const handlePrevPage = () => {
    // if on the first page, go to the last page
    const newActivePage = activePage === 1 ? pageCount : activePage - 1;
    setActivePage(newActivePage);
  };

  const handleNextPage = () => {
    // if on the last page, go to the first
    const newActivePage = activePage === pageCount ? 1 : activePage + 1;
    setActivePage(newActivePage);
  };

  const handleAnalytics = (clickedProductIdentifier: string) => () => {
    Analytics.trackEvent(
      CART.UPSELL_ITEM_CLICK,
      upsellItemClickedPayloadMapping({ cartUuid, clickedProductIdentifier })
    );
  };

  return (
    <Container className={className}>
      <Heading>
        <Subheader2
          css={css`
            margin-bottom: 8px;
          `}
        >
          Popular items inspired by your cart. Picked just for you.
        </Subheader2>
        {hasMultiplePages && (
          <Pagination color={BRAND.SECONDARY_TEXT}>
            Page {activePage} of {pageCount}
          </Pagination>
        )}
      </Heading>

      <Carousel ref={productsRef}>
        {hasMultiplePages && (
          <ArrowButton prev={true} onClick={handlePrevPage} />
        )}
        <Products>
          {activeProducts.map((product) => (
            <Product
              key={product.identifier}
              to={`/products/${product.identifier}`}
              onClick={handleAnalytics(product.identifier)}
            >
              <Image>
                <FixedSizeImage
                  src={
                    product.listingImage.mobile ||
                    product.listingImage.desktop ||
                    ""
                  }
                  width={128}
                  height={128}
                />
              </Image>
              {rentalLength && (
                <Price color={BRAND.SECONDARY_TEXT}>
                  ${product.rentalPrices[rentalLength]}/mo
                </Price>
              )}
            </Product>
          ))}
        </Products>
        {hasMultiplePages && (
          <ArrowButton next={true} onClick={handleNextPage} />
        )}
      </Carousel>

      <Swipe>
        {products.map((product) => (
          <Product
            key={product.identifier}
            to={`/products/${product.identifier}`}
            onClick={handleAnalytics(product.identifier)}
          >
            <FixedSizeImage
              src={
                product.listingImage.mobile ||
                product.listingImage.desktop ||
                ""
              }
              width={104}
              height={104}
            />
            {rentalLength && (
              <Price color={BRAND.SECONDARY_TEXT}>
                ${product.rentalPrices[rentalLength]}/mo
              </Price>
            )}
          </Product>
        ))}
      </Swipe>
    </Container>
  );
};

export default CartRecommendations;
