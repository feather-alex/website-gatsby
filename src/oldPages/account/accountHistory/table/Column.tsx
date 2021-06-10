/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { BRAND } from '../../../../ui/variables';

interface Props {
  value: string | JSX.Element;
  width: string;
  textAlign: string;
  dataCy?: string;
}

export const Column = ({ value, width, textAlign, dataCy }: Props) => {
  return (
    <div
      data-cy={dataCy}
      css={css`
        padding: 10px;
        width: ${width};
        text-align: ${textAlign};
        border: 1px solid ${BRAND.ACCENT};
      `}
    >
      {value}
    </div>
  );
};
