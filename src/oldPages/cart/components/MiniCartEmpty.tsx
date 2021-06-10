/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header3 from '../../../ui/headers/Header3';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';

interface Props {
  closeMiniCart: () => void;
}

const MiniCartEmpty = ({ closeMiniCart }: Props) => {
  return (
    <div
      data-cy="mini-cart-empty"
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 100%;
        width: 100%;
      `}
    >
      <div
        css={css`
          margin-bottom: 10px;
        `}
      >
        <Header3>Your cart looks a little bit light</Header3>
      </div>
      <Button style={ButtonStyle.TEXT} onClick={closeMiniCart}>
        Keep Shopping
      </Button>
    </div>
  );
};

export default MiniCartEmpty;
