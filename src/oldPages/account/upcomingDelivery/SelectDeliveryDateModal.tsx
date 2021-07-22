/** @jsx jsx */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

import Caption from "../../../ui/captions/Caption";
import DayPicker, { DayModifiers } from "react-day-picker";
import FeatherModal from "../../../ui/modals/FeatherModal";
import Header3 from "../../../ui/headers/Header3";
import { SHADES, BREAKPOINTS } from "../../../ui/variables";
import Request, { RequestMethod } from "../../../api/request";
import Button from "../../../ui/buttons/Button";
import { setAccountSubscriptionStartDate } from "../accountOverview/store/account.overview.actions";

const DeliveryDateContainer = styled.div`
  border: 1px solid ${SHADES.SHADE_LIGHTER};
  @media ${BREAKPOINTS.MOBILE} {
    border-left: none;
    border-right: none;
  }
`;

const DeliveryDateCaption = styled(Caption)`
  max-width: 314px;
  margin: 8px 0 28px;
  @media ${BREAKPOINTS.MOBILE} {
    max-width: 268px;
  }
`;

const ConfirmDateButton = styled(Button)`
  margin-top: 28px;
`;

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabledDeliveryDates: any;
  subscriptionId: number;
  isOpen: boolean;
  onClose: () => void;
}

const SelectDeliveryDateModal = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setSelectedDate(undefined);
    };
  }, []);

  const handleDayClick = (day: Date, { selected, disabled }: DayModifiers) => {
    if (disabled) {
      return;
    }

    if (selected) {
      setSelectedDate(undefined);
      return;
    }

    setSelectedDate(day);
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    props.onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setHasError(false);

    if (!selectedDate) {
      setHasError(true);
      return;
    }

    try {
      await Request.send(
        RequestMethod.POST,
        `/account/subscription/${props.subscriptionId}/startDate`,
        undefined,
        {
          startDate: selectedDate,
        },
        true
      );

      dispatch(setAccountSubscriptionStartDate(selectedDate));
      handleClose();
    } catch (e) {
      setHasError(true);
      setLoading(false);
      throw e;
    }
  };

  return (
    <FeatherModal isOpen={props.isOpen} onClose={handleClose}>
      <Header3>Choose Your Delivery Date</Header3>
      <DeliveryDateCaption>
        Choose an available date and we’ll be in touch with your 2-hour arrival
        window.
      </DeliveryDateCaption>
      <DeliveryDateContainer>
        <DayPicker
          onDayClick={handleDayClick}
          selectedDays={selectedDate}
          disabledDays={props.disabledDeliveryDates}
          showOutsideDays={true}
        />
      </DeliveryDateContainer>
      <ConfirmDateButton
        isDisabled={!selectedDate || loading}
        onClick={handleSubmit}
      >
        Confirm Selection
      </ConfirmDateButton>
      {hasError &&
        "There was an error and your selection could not be made, please try again."}
    </FeatherModal>
  );
};

export default SelectDeliveryDateModal;
