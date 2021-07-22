/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND, SHADES } from "../../../ui/variables";
import Title1 from "../../../ui/titles/Title1";
import Title3 from "../../../ui/titles/Title3";
import PlanForm from "./PlanForm";
import { ZipcodeFormData } from "../../../components/selectPlan/components/EnterZipcode";
import { MembershipState } from "../../../app/store/plan/plan.types";
import { Panel } from "react-bootstrap";

interface Props {
  children: JSX.Element;
  rentalPrice: number;
  retailPrice: number;
  isMobileBreakpoint: boolean;
  isFetchingZipcode: boolean;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: (
    values: ZipcodeFormData,
    dispatch: Function,
    props: any
  ) => void;
  isInDeliveryZone: boolean | null;
  planType: MembershipState;
  zipcode: string | null;
  handleFocusZipCode: (event: React.FocusEvent<HTMLInputElement>) => void;
  resetZipcode: () => void;
}

const DetailsPagePlanOption = ({
  zipcode,
  planType,
  children,
  rentalPrice,
  retailPrice,
  resetZipcode,
  handleSubmit,
  isInDeliveryZone,
  isFetchingZipcode,
  isMobileBreakpoint,
  handleFocusZipCode,
}: Props) => (
  <div
    css={css`
      .panel {
        border: 1px solid ${SHADES.SHADE_LIGHTER};
        padding: 0;
        box-shadow: none;
        border-radius: 0;
        background-color: transparent;

        .panel-heading + .panel-collapse > .panel-body {
          border-top-color: transparent;
        }

        .panel-heading {
          color: ${BRAND.PRIMARY_TEXT};
          border: none;
          padding: 0;
          background-color: transparent;
        }

        .panel-body {
          background-color: transparent;
        }

        .panel-body a {
          text-decoration: underline;
          font-weight: 500;
        }
      }
    `}
  >
    <Panel eventKey={planType}>
      <Panel.Heading>
        <Panel.Title
          toggle={true}
          css={css`
            a {
              padding: 16px;
              text-decoration: none;
              display: flex;
              text-align: left;
              align-items: center;
              width: 100%;
              color: ${BRAND.PRIMARY_TEXT};
              justify-content: space-between;
            }
          `}
        >
          <Title1 dataCy="plan-type" isBold={true}>
            {planType === MembershipState.MEMBER
              ? "Annual Member"
              : "Short-Term Plan"}
          </Title1>
          <div
            css={css`
              text-align: right;
            `}
          >
            <Title1>{`$${rentalPrice}/mo`}</Title1>
            <Title3
              color={BRAND.SECONDARY_TEXT}
            >{`Retail: $${retailPrice.toLocaleString()}`}</Title3>
          </div>
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body
        collapsible={true}
        css={css`
          font-size: 16px;
          padding: 0 16px 16px;
          text-align: left;
          color: ${BRAND.PRIMARY_TEXT};
        `}
      >
        {children}
        <PlanForm
          onSubmit={handleSubmit}
          isFetching={isFetchingZipcode}
          isInDeliveryZone={isInDeliveryZone}
          planType={planType}
          initialValues={{ zipcode: zipcode || undefined }}
          enableReinitialize={true}
          resetZipcode={resetZipcode}
          handleFocusZipCode={handleFocusZipCode}
          isMobileBreakpoint={isMobileBreakpoint}
        />
      </Panel.Body>
    </Panel>
  </div>
);

export default DetailsPagePlanOption;
