/** @jsx jsx */
import { connect } from "react-redux";
import { jsx } from "@emotion/core";
import { State as GlobalState } from "../../../types/ReduxState";
import { Overlays } from "../../store/overlay/overlay.types";
import {
  toggleOverlay as toggleOverlayAction,
  ToggleOverlay,
} from "../../store/overlay/overlay.actions";
import { MembershipState } from "../../store/plan/plan.types";
import { getSelectPlanButtonText } from "../../store/plan/plan.selectors";
import Analytics from "../../../analytics/analytics";
import { NAVBAR } from "../../../analytics/navbar/events";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";

export enum UILocations {
  MobileNav = "mobileNavOverlay",
  Navbar = "navbar",
}

const uiLocationEventMap = {
  [UILocations.MobileNav]: NAVBAR.OVERLAY_CHOOSE_PLAN,
  [UILocations.Navbar]: NAVBAR.CHOOSE_PLAN,
};

interface OwnProps {
  uiLocation: UILocations;
}
interface DispatchProps {
  toggleOverlay: ToggleOverlay;
}
interface StateProps {
  selectPlanButtonText: MembershipState;
}

type Props = OwnProps & DispatchProps & StateProps;

const PlanNavListItem = ({
  toggleOverlay,
  selectPlanButtonText,
  uiLocation,
}: Props) => (
  <Button
    dataCy="nav-bar-plan-selection"
    style={ButtonStyle.COMPACT}
    onClick={() => {
      Analytics.trackEvent(uiLocationEventMap[uiLocation]);
      toggleOverlay(Overlays.PlanSelectionOverlay, true);
    }}
  >
    {selectPlanButtonText}
  </Button>
);

const mapStateToProps = (state: GlobalState) => ({
  selectPlanButtonText: getSelectPlanButtonText(state),
});

const mapDispatchToProps = {
  toggleOverlay: toggleOverlayAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanNavListItem);
