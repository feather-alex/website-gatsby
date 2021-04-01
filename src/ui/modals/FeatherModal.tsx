/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { BRAND, SHADES, MARGINS, BREAKPOINTS } from "../variables";
import Modal from "react-bootstrap/lib/Modal";
import CloseModalButton from "./CloseModalButton";
import { Z_INDICIES } from "../zIndicies";

interface Props {
  children: React.ReactNode;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  isOpen: boolean;
  isFullscreen?: boolean;
}

const FeatherModal = ({ onClose, isOpen, isFullscreen, children }: Props) => {
  const modalCss = `
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .modal-dialog {
      position: ${isFullscreen ? "fixed" : "relative"};
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background-color: ${
        isFullscreen ? `${SHADES.WHITE};` : "rgba(130, 130, 130, 0.35);"
      }

      .modal-content {
        position: absolute;
        border-radius: 0;
        border: 1px solid ${BRAND.BACKGROUND};
        box-shadow: none;
        background-color: ${BRAND.BACKGROUND};
        padding: 30px 80px;

        ${
          isFullscreen
            ? `top: 0;
          bottom: 0;
          left: 0;
          right: 0;

          @media ${BREAKPOINTS.MOBILE} {
            padding: 16px;
          }
          `
            : `top: 20vh;
          left: 0;
          right: 0;
          width: 562px;
          height: auto;
          margin: auto;

          @media ${BREAKPOINTS.MOBILE} {
            width: unset;
            top: ${MARGINS.MOBILE};
            bottom: ${MARGINS.MOBILE};
            left: ${MARGINS.MOBILE};
            right: ${MARGINS.MOBILE};
            padding: 16px;
          }`
        }
      }
    }

    .fade .modal-dialog {
      transform: translate(0, 0);
      opacity: 0;
      transition: all 0.5s;
    }

    .in .modal-dialog {
      transform: translate(0, 0);
      opacity: 1;
    }
  `;
  return (
    <Modal
      data-cy="modal"
      show={isOpen}
      onHide={onClose}
      css={css`
        ${modalCss}
      `}
    >
      <Modal.Header
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          padding: 0;
          min-height: 50px;
          border-bottom: none;
          z-index: ${Z_INDICIES.MODAL_HEADER};
        `}
      >
        <CloseModalButton
          dataCy="close-modal-button"
          onClose={onClose}
          fullscreenModal={isFullscreen}
        />
      </Modal.Header>
      <Modal.Body
        css={css`
          padding: 0;
          height: 100%;
        `}
      >
        <div
          css={css`
            height: 100%;
            display: flex;
            position: relative;
            flex-direction: column;
            padding: 0;
            margin-top: 40px;
            align-items: center;
            justify-content: center;
            text-align: center;
            border: 1px solid ${BRAND.BACKGROUND};
            overflow-x: hidden;
            z-index: ${Z_INDICIES.MODAL_CONTENT};

            @media ${BREAKPOINTS.MOBILE} {
              margin: 0;
            }
          `}
        >
          {children}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FeatherModal;
