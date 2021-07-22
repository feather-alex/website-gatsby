/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { format as formatDate, parse } from "date-fns";

import { Availability } from "../../../types/Product";
import { isInStock, backInStockDate } from "../../../utils";
import { COLORS } from "../../../ui/variables";
import Title2 from "../../../ui/titles/Title2";
import { CalendarIcon } from "../../../ui/icons/CalendarIcon";
import { DeliveryAreaIdentifier } from "../../../app/store/plan/plan.types";

const BackInStockContainer = styled.div`
  margin-top: 20px;
  height: 68px;
  background: ${COLORS.SNOW};
  border: 1px solid ${COLORS.GRAY_74};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackInStockTitle = styled(Title2)`
  margin-left: 11px;
`;

interface Props {
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  availability: Availability[] | null;
}

const BackInStockInfo = ({ deliveryAreaIdentifier, availability }: Props) => {
  if (
    !isInStock(deliveryAreaIdentifier, availability) &&
    backInStockDate(deliveryAreaIdentifier, availability)
  ) {
    // stockExpectedDate comes back as a string (YYYY-MM-DD) from the API
    const dateFromApi = backInStockDate(deliveryAreaIdentifier, availability);

    if (dateFromApi) {
      const stockDate = parse(dateFromApi, "yyyy-MM-dd", new Date());
      const formattedStockDate = formatDate(stockDate, "MM/dd/yyyy");

      return (
        <BackInStockContainer>
          <CalendarIcon />
          <BackInStockTitle isBold={true}>
            Expected back in stock on {formattedStockDate}
          </BackInStockTitle>
        </BackInStockContainer>
      );
    }
  }

  return null;
};

export default BackInStockInfo;
