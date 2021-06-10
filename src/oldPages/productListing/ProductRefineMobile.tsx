/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductFilterButtons from './ProductFilterButtons';
import Button, { ButtonStyle } from '../../ui/buttons/Button';
import ArrowIcon, { Direction } from '../../ui/icons/ArrowIcon';
import { BRAND as BRAND_COLORS, COLORS, BREAKPOINTS } from '../../ui/variables';
import ProductMobileFilters from './ProductMobileFilters';
import { Meta } from '../../types/ReduxState';
import { getIsMobileProductFiltersOpen } from '../../app/store/overlay/overlay.selectors';
import { toggleOverlay } from '../../app/store/overlay/overlay.actions';
import { Overlays } from '../../app/store/overlay/overlay.types';
import { getSelectPlanButtonText } from '../../app/store/plan/plan.selectors';
import CloseSignIcon from '../../ui/icons/CloseSignIcon';
import Analytics from '../../analytics/analytics';
import { PRODUCT_CATEGORY } from '../../analytics/product-category/events';
import Title1 from '../../ui/titles/Title1';
import { getBodyMarginTop } from '../../app/store/dimensions/dimensions.selectors';
import { useHistory } from 'react-router';
import Paragraph1 from '../../ui/paragraphs/Paragraph1';
import { Z_INDICIES } from '../../ui/zIndicies';
import useMount from '../../utils/useMount';
import { productHeaderHeight } from './ProductHeader';

const RefineFurnitureButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: ${COLORS.CLOUD};
  border: none;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  transition: box-shadow 200ms linear;
  box-shadow: ${({ isBoxShadowActive }: { isBoxShadowActive: boolean }) =>
    isBoxShadowActive ? `0px 4px 8px rgba(0, 0, 0, 0.08)` : 'none'};

  @media ${BREAKPOINTS.MOBILE} {
    font-size: 16px;
    line-height: 19px;
  }
`;

interface Props {
  filterNameMap: {
    [id: string]: string;
  };
  filterTypeMap?: {
    [category: string]: string;
  };
  productMeta: Meta;
}

const ProductRefineMobile = ({ filterNameMap, productMeta }: Props) => {
  const [isShadowVisible, setIsShadowVisible] = useState(false);
  const bodyMarginTop = useSelector(getBodyMarginTop);
  const isMobileProductFiltersOpen = useSelector(getIsMobileProductFiltersOpen);
  const dispatch = useDispatch();
  const history = useHistory();

  const selectPlanButtonText = useSelector(getSelectPlanButtonText);
  const handleSelectPlanClick = React.useCallback(() => {
    Analytics.trackEvent(PRODUCT_CATEGORY.MOBILE_CHOOSE_PLAN);
    dispatch(toggleOverlay(Overlays.PlanSelectionOverlay, true));
  }, [dispatch]);

  const handleRefineClick = React.useCallback(() => {
    dispatch(toggleOverlay(Overlays.MobileProductFilters, true));
  }, [dispatch]);

  const handleClose = React.useCallback(() => {
    dispatch(toggleOverlay(Overlays.MobileProductFilters, false));
  }, [dispatch]);

  const handleClearClick = React.useCallback(() => {
    Analytics.trackEvent(PRODUCT_CATEGORY.FILTER_CLEAR);
    history.replace(history.location.pathname);
    handleClose();
  }, [history, handleClose]);

  const handleScroll = () => setIsShadowVisible(window.scrollY > productHeaderHeight);

  useMount(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <Fragment>
      <div
        css={css`
          position: sticky;
          top: ${bodyMarginTop}px;
          z-index: ${Z_INDICIES.PRODUCT_LIST_MOBILE_REFINE};
          padding-bottom: 16px;
          transition: top 400ms linear;
        `}
      >
        <RefineFurnitureButton type="button" onClick={handleRefineClick} isBoxShadowActive={isShadowVisible}>
          <Paragraph1
            css={css`
              margin-right: 8px;
            `}
          >
            Refine Furniture
          </Paragraph1>
          <ArrowIcon width={12} direction={Direction.Down} />
        </RefineFurnitureButton>
      </div>
      <div
        css={css`
          width: 100%;
          padding: 0 24px 16px;
        `}
      >
        <ProductFilterButtons filterNameMap={filterNameMap} />
        <Button style={ButtonStyle.TERTIARY} onClick={handleSelectPlanClick} isFullWidth={true}>
          {selectPlanButtonText}
        </Button>
      </div>

      {isMobileProductFiltersOpen && (
        <div
          css={css`
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: ${BRAND_COLORS.BACKGROUND};
            z-index: ${Z_INDICIES.PRODUCT_LIST_MOBILE_REFINE_OVERLAY};
            overflow-y: auto;
          `}
        >
          <div
            css={css`
              position: sticky;
              top: 0;
              z-index: ${Z_INDICIES.PRODUCT_LIST_MOBILE_REFINE_OVERLAY_CONTENT};
              padding: 16px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: linear-gradient(0deg, hsla(0, 0%, 100%, 0) 0, ${BRAND_COLORS.BACKGROUND} 40%);
            `}
          >
            <div
              css={css`
                position: absolute;
                left: 16px;
              `}
            >
              <CloseSignIcon size={14} onClick={handleClose} />
            </div>
            <Title1>Refine all furniture by</Title1>
          </div>

          <ProductMobileFilters productMeta={productMeta} />

          <div
            css={css`
              position: fixed;
              bottom: 114px;
              background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0, ${BRAND_COLORS.BACKGROUND} 70%);
              height: 63px;
              width: 100%;
            `}
          />
          <div
            css={css`
              position: fixed;
              bottom: 0;
              padding-bottom: 24px;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              background: ${BRAND_COLORS.BACKGROUND};
              > button {
                margin-top: 20px;
              }
            `}
          >
            <Button style={ButtonStyle.SECONDARY} onClick={handleClose}>
              Apply
            </Button>
            <Button style={ButtonStyle.TEXT} onClick={handleClearClick}>
              Or, clear all
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductRefineMobile;
