/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartItem } from '../store/cart.types';
import { OutOfStock } from './OutOfStock';
import FixedSizeImage from '../../../ui/images/FixedSizeImage';
import { removeCartItem } from '../store/cart.actions';
import { BREAKPOINTS, SHADES } from '../../../ui/variables';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import Caption from '../../../ui/captions/Caption';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';

const ItemPrice = styled(Paragraph2)`
  text-align: right;
  margin-left: 12px;
  @media ${BREAKPOINTS.MOBILE} {
    order: -1;
    margin-left: 0;
  }
`;

const CartPageProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${SHADES.SHADE_LIGHTER};
  padding: 15px 0;

  @media ${BREAKPOINTS.MOBILE} {
    padding: 15px 24px 15px 8px;
  }
`;

const Product = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
`;

const ProductInfo = styled.div`
  margin-left: 18px;
`;

const RemoveButtonAndItemPrice = styled.div`
  width: auto;
  margin-left: 12px;
  max-width: 180px;
  height: 100%;
  display: flex;

  @media ${BREAKPOINTS.MOBILE} {
    flex-direction: column;
    align-items: flex-end;
  }
`;

interface Props {
  product: CartItem;
  isItemUnavailable: boolean;
  isMobileBreakpoint: boolean;
}

const CartProduct = ({ product, isItemUnavailable, isMobileBreakpoint }: Props) => {
  const dispatch = useDispatch();
  const packagesOrProducts = product.type === 'bundle' ? 'packages' : 'products';
  return (
    <CartPageProduct>
      <Product>
        <Link to={`/${packagesOrProducts}/${product.identifier}`}>
          <FixedSizeImage src={product.image.mobile || product.image.desktop || ''} width={80} height={80} />
        </Link>

        <ProductInfo>
          <Link to={`/${packagesOrProducts}/${product.identifier}`}>
            <Paragraph2>{product.title}</Paragraph2>
            <Caption color={SHADES.SHADE_LIGHT}>
              {product.type !== 'bundle' && !product.variantName.length ? 'One Size' : product.variantName}
            </Caption>
          </Link>

          {isItemUnavailable && isMobileBreakpoint && <OutOfStock isMobileBreakPoint={true} isCartPage={true} />}
        </ProductInfo>
      </Product>
      <RemoveButtonAndItemPrice>
        <Button style={ButtonStyle.COMPACT_TEXT} onClick={() => dispatch(removeCartItem(product))}>
          Remove
        </Button>
        <ItemPrice>
          ${product.quantity * product.rentalPrices[product.rentalLength]}/mo
          {isItemUnavailable && !isMobileBreakpoint && <OutOfStock isMobileBreakPoint={false} isCartPage={true} />}
        </ItemPrice>
      </RemoveButtonAndItemPrice>
    </CartPageProduct>
  );
};

export default CartProduct;
