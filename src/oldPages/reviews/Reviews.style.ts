import { BRAND, FONTS, COLORS } from '../../ui/variables';

const globalStyleString = `
.yotpo-container {
  margin: 0 80px;
}

#yotpo-testimonials-custom-tab {
  padding: 50px 0;
}

.yotpo-modal-content {
  display: flex !important;
}

.yotpo-popup-box-medium.yotpo-modal-bottom-line {
  width: 20% !important;
  border-top: none !important;
  border-bottom: none !important;
  display: flex !important;
  flex-direction: column !important;
  margin: 0 106px 0 0 !important;
}

#yotpo-testimonials .primary-color-btn.yotpo-disabled:hover,
#yotpo-testimonials .primary-color-btn:hover {
  background-color: ${COLORS.STANDARD_BUTTON_HOVER} !important;
}
.yotpo-default-button.primary-color-btn.yotpo-submit,
.yotpo-default-button.primary-color-btn.write-review-button {
  background-color: ${BRAND.PRIMARY} !important;
  color: ${BRAND.PRIMARY_TEXT} !important;
  border-radius: 88px !important;
  font-family: ${FONTS.PRIMARY} !important;
  font-style: normal !important;
  font-weight: 500 !important;
  text-transform: capitalize !important;
  font-size: 18px !important;
  line-height: 28px !important;
  margin-top: 32px !important;
  padding: 16px 40px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.yotpo-bottomline {
  display: flex !important;
  flex-direction: column !important;

  & > a {
    order: -1 !important;
    margin-bottom: 5px !important;
  }
}

.yotpo-icon.yotpo-icon-star.rating-star,
.yotpo-icon.review-star.yotpo-icon-star,
.yotpo-icon.review-star.yotpo-icon-empty-star {
  color: ${BRAND.PRIMARY} !important;
  cursor: pointer;
}

#yotpo-testimonials-site-reviews {
  padding-top: 80px;
  margin-top: -80px;
}

label.y-label.yotpo-review-date {
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 13px !important;
  line-height: 15px !important;
  text-align: right !important;
  letter-spacing: 2.23px !important;
  text-transform: uppercase !important;
  color: ${BRAND.PRIMARY_TEXT} !important;
}

.yotpo-modal-body-wrapper {
  width: 80% !important;
}

.yotpo-main {
  margin-left: 0 !important;
}

.yotpo-review.yotpo-regular-box {
  padding: 38px 0 32px 0 !important;
  border-top: 1px solid ${BRAND.ACCENT} !important;
}

.content-review,
.rest-content-collapsed,
.y-label.yotpo-user-name.yotpo-font-bold {
  font-family: ${FONTS.PRIMARY} !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 16px !important;
  line-height: 19px !important;
}

.yotpo-read-more {
  font-weight: 500 !important;
  color: ${BRAND.PRIMARY_TEXT} !important;
}

.content-title.yotpo-font-bold {
  font-family: ${FONTS.PRIMARY} !important;
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 23px !important;
  line-height: 24px !important;
  color: ${BRAND.PRIMARY_TEXT} !important;
  padding-bottom: 12px !important;
}

.yotpo-review-stars {
  margin-top: 12px !important;
  margin-bottom: 10px !important;
}

.yotpo-label,
.yotpo-review > .yotpo-footer,
.yotpo-popup-box-small.yotpo-nav.yotpo-nav-primary,
.yotpo-icon-profile.yotpo-header-element,
.y-label.yotpo-user-title,
.y-label.product-link {
  display: none !important;
}

.yotpo-footer.yotpo-animation-opacity {
  display: flex !important;

  .socialize-wrapper {
    display: block !important;

    .yotpo-or {
      color: ${BRAND.PRIMARY} !important;
    }
  }

  .connect-wrapper {
    display: flex !important;

    .email-input {
      display: inline-block !important;
    }
  }
}

@media screen and (max-width: 1096px) {
  .yotpo-container {
    margin: 0 40px;
  }
}

@media screen and (max-width: 880px) {
  .yotpo-container {
    margin: 0 20px;
  }
}

@media screen and (max-width: 865px) {
  .yotpo-footer.yotpo-animation-opacity {
    .connect-wrapper {
      flex-direction: column !important;

      .form-element {
        width: 100% !important;
        &.name-input {
          padding-right: 0 !important;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #yotpo-testimonials-custom-tab {
    margin-top: 20px !important;
  }

  .yotpo-modal-content {
    flex-direction: column !important;
  }

  .yotpo-popup-box-medium.yotpo-modal-bottom-line {
    width: 100% !important;
    border: none !important;
    flex-direction: row !important;
    position: relative !important;
    margin: 25px 0 35px !important;
    padding: 0 10px !important;
  }

  .yotpo-default-button.primary-color-btn.write-review-button {
    position: absolute !important;
    right: 10px !important;
    bottom: 0 !important;
  }

  .yotpo-modal-body-wrapper {
    width: 100% !important;
  }
}

@media screen and (max-width: 560px) {
  .yotpo-footer.yotpo-animation-opacity {
    flex-direction: column !important;

    .socialize-wrapper {
      width: 100% !important;
      position: relative !important;
      display: flex !important;
      flex-direction: column !important;

      .yotpo-or {
        margin-top: 0 !important;
        width: auto !important;
        text-align: left !important;
      }
    }

    .connect-wrapper {
      padding-left: 0 !important;
      width: 100% !important;
    }
  }
}

@media screen and (max-width: 500px) {
  .yotpo-container {
    margin: 0 10px;
  }

  .yotpo-popup-box-large {
    padding: 12px 0 5px !important;
  }
}

@media screen and (max-width: 320px) {
  #yotpo-testimonials-custom-tab {
    margin-top: 0 !important;
  }

  .yotpo-popup-box-medium.yotpo-modal-bottom-line {
    flex-direction: column !important;
    position: static !important;
    margin: 15px 0 !important;
  }

  .yotpo-default-button.primary-color-btn.write-review-button {
    position: static !important;
  }
}
`;

export default globalStyleString;
