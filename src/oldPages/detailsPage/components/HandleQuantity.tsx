/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import MinusSignIcon from '../../../ui/icons/MinusSignIcon';
import PlusSignIcon from '../../../ui/icons/PlusSignIcon';
import { SHADES } from '../../../ui/variables';

interface Props {
  quantity: number;
  handleAddQuantity: () => void;
  handleRemoveQuantity: () => void;
}

const UnstyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const HandleQuantity = ({ quantity, handleAddQuantity, handleRemoveQuantity }: Props) => (
  <div
    css={css`
      flex: 1;
      height: 51px;
      padding: 0 16px;
      border-right: 1px solid ${SHADES.SHADE_LIGHTER};
      border-bottom: 1px solid ${SHADES.SHADE_LIGHTER};
      border-left: 1px solid ${SHADES.SHADE_LIGHTER};
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}
  >
    <UnstyledButton data-cy="minus">
      <MinusSignIcon onClick={handleRemoveQuantity} />
    </UnstyledButton>
    <input
      css={css`
        width: 40px;
        text-align: center;
        font-size: 16px;
        line-height: 24px;
        background-color: transparent;
      `}
      type="text"
      value={quantity}
      readOnly={true}
    />
    <UnstyledButton data-cy="plus">
      <PlusSignIcon onClick={handleAddQuantity} />
    </UnstyledButton>
  </div>
);

export default HandleQuantity;
