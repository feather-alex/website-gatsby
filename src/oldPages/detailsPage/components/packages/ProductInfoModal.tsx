/** @jsx jsx */
import { Overlays } from "../../../../app/store/overlay/overlay.types";
import React from "react";
import { css, jsx } from "@emotion/core";
import Modal from "react-bootstrap/lib/Modal";
import { PkgItem } from "../../../../types/Package";
import { Link } from "react-router-dom";
import CloseSignIcon from "../../../../ui/icons/CloseSignIcon";
import BaseImage from "../../../../ui/images/BaseImage";

export interface Props {
  pkgItem: PkgItem;
  toggleOverlay: (overlay: Overlays, isOpen: boolean) => void;
  isProductInfoOverlayOpen: boolean;
  isMobileDevice: boolean;
}

export default class ProductInfoModal extends React.Component<Props> {
  closeOverlay = () => {
    this.props.toggleOverlay(Overlays.ProductInfoOverlay, false);
  };

  render() {
    const { pkgItem, isMobileDevice, isProductInfoOverlayOpen } = this.props;

    const currentDevice = isMobileDevice ? "mobile" : "desktop";
    const d = pkgItem.dimensions;
    const imageSrc = pkgItem.image[currentDevice];

    return (
      <Modal
        className="product-info-modal-container"
        show={isProductInfoOverlayOpen}
        onHide={this.closeOverlay}
      >
        <Modal.Body className="product-info-modal">
          <div className="close-modal">
            <CloseSignIcon onClick={this.closeOverlay} />
          </div>
          <div className="product-images">
            <div
              css={css`
                & img {
                  object-fit: contain;
                }
              `}
              className="product-images-carousel"
            >
              {imageSrc && (
                <BaseImage
                  imgUrl={imageSrc}
                  width={this.props.isMobileDevice ? 300 : 600}
                />
              )}
            </div>
          </div>

          <div className="product-specs-modal">
            <div className="brand eyebrow">{pkgItem.brand.name}</div>
            <h4 className="name">{pkgItem.title}</h4>
            <p className="description">
              {pkgItem.description}&nbsp;
              <Link
                css={css`
                  text-decoration: underline;
                `}
                to={`/products/${pkgItem.identifier}`}
                target="_blank"
              >
                Full product details
              </Link>
            </p>
            <div className="product-specs-details">
              {d && d.width && (
                <p>
                  <span className="futura reg-14">Width </span>
                  <span className="futura reg-18">{d.width}</span>
                </p>
              )}
              {d && d.height && (
                <p>
                  <span className="futura reg-14">Height</span>
                  <span className="futura reg-18">{d.height}</span>
                </p>
              )}
              {d && d.length && (
                <p>
                  <span className="futura reg-14">Depth</span>
                  <span className="futura reg-18">{d.length}</span>
                </p>
              )}
              {d && d.weight && (
                <p>
                  <span className="futura reg-14">Weight</span>
                  <span className="futura reg-18">{d.weight}</span>
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
