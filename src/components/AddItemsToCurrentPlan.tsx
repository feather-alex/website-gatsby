/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Overlays } from "../app/store/overlay/overlay.types";
import {
  toggleOverlay,
  ToggleOverlay,
} from "../app/store/overlay/overlay.actions";
import { getIsAddItemsToCurrentPlanOverlayOpen } from "../app/store/overlay/overlay.selectors";
import { State as GlobalState } from "../types/ReduxState";
import FeatherModal from "../ui/modals/FeatherModal";
import { connect } from "react-redux";
import Paragraph2 from "../ui/paragraphs/Paragraph2";
import Header3 from "../ui/headers/Header3";
import Button from "../ui/buttons/Button";
import { FONTS } from "../ui/variables";

export interface Props {
  isOpen: boolean;
  toggleOverlay: ToggleOverlay;
}

const AddItemsToCurrentPlanModal = (props: Props) => {
  const closeOverlay = () => {
    props.toggleOverlay(Overlays.AddItemsToCurrentPlanOverlay, false);
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <FeatherModal isOpen={props.isOpen} onClose={closeOverlay}>
      <div>
        <div
          css={css`
            margin: 20px auto 0;
            max-width: 336px;
            text-align: center;
          `}
        >
          <Header3>Contact us to add an item to your current plan!</Header3>
        </div>
        <div
          css={css`
            max-width: 343px;
            text-align: center;
            margin: 15px auto 40px;
          `}
        >
          <Paragraph2>
            To add an item to your membership, contact your account manager who
            will get it set up for you!
          </Paragraph2>
        </div>
        <div
          css={css`
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            width: 100%;
          `}
        >
          <Button mailto="hello@livefeather.com">
            Email your account manager
          </Button>
        </div>
        <a
          css={css`
            font-size: 19px;
            font-family: ${FONTS.PRIMARY};
          `}
          href="tel:3473528599"
        >
          347.352.8599
        </a>
      </div>
    </FeatherModal>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  isOpen: getIsAddItemsToCurrentPlanOverlayOpen(state),
});

const mapDispatchToProps = {
  toggleOverlay,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItemsToCurrentPlanModal);
