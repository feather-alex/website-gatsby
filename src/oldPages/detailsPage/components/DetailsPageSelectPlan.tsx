/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { getIsMobileBreakpoint } from "../../../app/store/dimensions/dimensions.selectors";
import {
  getDeliveryZipCode,
  getIsFetching,
  getIsInDeliveryZone,
} from "../../../app/store/plan/plan.selectors";
import {
  zipcodeSubmit,
  resetZipcode,
} from "../../../app/store/plan/plan.actions";
import DetailsPagePlanOption from "./DetailsPagePlanOption";
import MemberBulletPoints from "../../../components/selectPlan/components/MemberBulletPoints";
import NonMemberBulletPoints from "../../../components/selectPlan/components/NonMemberBulletPoints";
import { ZipcodeFormData } from "../../../components/selectPlan/components/EnterZipcode";
import { MembershipState } from "../../../app/store/plan/plan.types";
import PanelGroup from "react-bootstrap/lib/PanelGroup";

interface Props {
  memberRentalPrice: number;
  nonMemberRentalPrice: number;
  retailPrice: number;
}

const DetailsPageSelectPlan = ({
  memberRentalPrice,
  nonMemberRentalPrice,
  retailPrice,
}: Props) => {
  const dispatch = useDispatch();
  const isInDeliveryZone = useSelector(getIsInDeliveryZone);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const deliveryZipcode = useSelector(getDeliveryZipCode);
  const isFetchingZipcode = useSelector(getIsFetching);

  const handleScrollTop = () => {
    if (isMobileBreakpoint) {
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const handleSubmitOption =
    (membershipState: MembershipState) => (values: ZipcodeFormData) => {
      handleScrollTop();
      dispatch(
        zipcodeSubmit({
          zipcode: values.zipcode,
          shouldShowError: true,
          shouldSelectPlan: membershipState,
        })
      );
    };

  const handleFocusZipCode = () => {
    if (isInDeliveryZone === false) {
      dispatch(resetZipcode());
    }
  };

  const handleResetZipcode = () => {
    dispatch(resetZipcode());
  };

  return (
    <PanelGroup
      css={css`
        width: 100%;
        & > div:last-child {
          margin-top: 8px;
        }
      `}
      accordion={true}
      defaultActiveKey={MembershipState.MEMBER}
      id="panel-group-select-plan"
    >
      <DetailsPagePlanOption
        key={MembershipState.MEMBER}
        retailPrice={retailPrice}
        rentalPrice={memberRentalPrice}
        isMobileBreakpoint={isMobileBreakpoint}
        isFetchingZipcode={isFetchingZipcode}
        handleSubmit={handleSubmitOption(MembershipState.MEMBER)}
        isInDeliveryZone={isInDeliveryZone}
        planType={MembershipState.MEMBER}
        zipcode={deliveryZipcode}
        handleFocusZipCode={handleFocusZipCode}
        resetZipcode={handleResetZipcode}
      >
        <MemberBulletPoints isMobileBreakpoint={isMobileBreakpoint} />
      </DetailsPagePlanOption>

      <DetailsPagePlanOption
        retailPrice={retailPrice}
        rentalPrice={nonMemberRentalPrice}
        isMobileBreakpoint={isMobileBreakpoint}
        isFetchingZipcode={isFetchingZipcode}
        handleSubmit={handleSubmitOption(MembershipState.NON_MEMBER)}
        isInDeliveryZone={isInDeliveryZone}
        planType={MembershipState.NON_MEMBER}
        zipcode={deliveryZipcode}
        handleFocusZipCode={handleFocusZipCode}
        resetZipcode={handleResetZipcode}
      >
        <NonMemberBulletPoints isMobileBreakpoint={isMobileBreakpoint} />
      </DetailsPagePlanOption>
    </PanelGroup>
  );
};

export default DetailsPageSelectPlan;
