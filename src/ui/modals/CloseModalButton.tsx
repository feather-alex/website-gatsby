/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import CloseSignIcon from "../icons/CloseSignIcon";
import { BREAKPOINTS } from "../variables";
import { Z_INDICIES } from "../zIndicies";

interface Props {
  onClose: (event: React.MouseEvent) => void;
  fullscreenModal?: boolean;
  dataCy?: string;
}

const CloseModalButton = ({ onClose, fullscreenModal, dataCy }: Props) => (
  <div
    data-cy={dataCy}
    css={css`
      position: absolute;
      z-index: ${Z_INDICIES.MODAL_CLOSE_BUTTON};
      cursor: pointer;

      ${fullscreenModal
        ? `
          top: 39px;
          left: 39px;

          @media ${BREAKPOINTS.MOBILE} {
            top: 30px;
            left: 32px;
          }
          `
        : `
          top: 8px;
          left: 8px;
          padding: 7px;
          `}
    `}
  >
    <CloseSignIcon onClick={onClose} />
  </div>
);

export default CloseModalButton;
