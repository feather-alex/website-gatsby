/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { connect } from "react-redux";

import { State as GlobalState } from "../../../types/ReduxState";
import FeatherModal from "../../../ui/modals/FeatherModal";
import ResponsiveImage from "../../../ui/images/ResponsiveImage";
import Header3 from "../../../ui/headers/Header3";
import Paragraph2 from "../../../ui/paragraphs/Paragraph2";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import { BRAND } from "../../../ui/variables";
import { getIsMobileBreakpoint } from "../../../app/store/dimensions/dimensions.selectors";
import { getIsMembershipSelectedOverlayOpen } from "../../../app/store/overlay/overlay.selectors";
import { Overlays } from "../../../app/store/overlay/overlay.types";
import {
  toggleOverlay,
  ToggleOverlay,
} from "../../../app/store/overlay/overlay.actions";

interface StateProps {
  isMobileBreakpoint: boolean;
  isOpen: boolean;
}

interface DispatchProps {
  toggleOverlay: ToggleOverlay;
}

type Props = StateProps & DispatchProps;

class MembershipSelectedOverlay extends React.Component<Props> {
  handleCloseOverlay = () => {
    this.props.toggleOverlay(Overlays.MembershipSelectedOverlay, false);
  };

  render() {
    const { isMobileBreakpoint, isOpen } = this.props;

    return (
      <FeatherModal
        onClose={this.handleCloseOverlay}
        isOpen={isOpen}
        isFullscreen={true}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {!isMobileBreakpoint && (
            <div
              css={css`
                height: 100%;
                width: 50%;
              `}
            >
              <ResponsiveImage
                src="https://img.livefeather.com/pages-new/Membership%20Overlay/membership.png"
                width={430}
                height={496}
                queryParams={{
                  sat: 10,
                  sharp: 5,
                }}
              />
            </div>
          )}

          <div
            css={css`
              ${isMobileBreakpoint
                ? "width: 100%;"
                : "width: 50%; padding: 40px 80px;"}
            `}
          >
            <Header3>{`You've selected Feather${
              isMobileBreakpoint ? "" : " Annual"
            }\xa0Membership`}</Header3>
            <div
              css={css`
                margin: 20px 0 30px;
              `}
            >
              <Paragraph2>
                By joining Feather for the next 12 months, you’ll be able to add
                furniture to your cart at reduced prices.
              </Paragraph2>
              <div
                css={css`
                  margin: 15px 0;
                `}
              >
                <Paragraph2>
                  If you eventually decide to purchase any of your items, all
                  monthly furniture payments go toward buyout. If not, you can
                  swap or return items—our team handles all pickups, deliveries,
                  and assemblies.
                </Paragraph2>
              </div>
              <Paragraph2>
                You get free delivery and assembly to start, plus your first
                furniture change is free with Membership.
              </Paragraph2>
            </div>

            <div
              css={css`
                display: flex;
                justify-content: center;
              `}
            >
              <Button onClick={this.handleCloseOverlay}>
                Continue shopping
              </Button>
            </div>
            <div
              role="button"
              tabIndex={0}
              css={css`
                margin-top: 15px;
              `}
              onClick={this.handleCloseOverlay}
            >
              <Button
                style={ButtonStyle.TEXT}
                to="/cart"
                color={BRAND.SECONDARY_TEXT}
              >
                Checkout to finalize your membership
              </Button>
            </div>
          </div>
        </div>
      </FeatherModal>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  isOpen: getIsMembershipSelectedOverlayOpen(state),
});

const mapDispatchToProps: DispatchProps = {
  toggleOverlay,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipSelectedOverlay);
