import styled from "@emotion/styled";
import Dropdown from "../../../ui/formElements/Dropdown";
import Header2 from "../../../ui/headers/Header2";
import { BRAND, BREAKPOINTS, SHADES } from "../../../ui/variables";
import { InputContainer } from "./CheckoutInputField";

export const CheckoutPageForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  order: 1;
  margin: 50px 0;

  @media ${BREAKPOINTS.MOBILE} {
    width: 100%;
    order: 2;
    padding: 0 20px;
  }
`;

export const FormHeader = styled(Header2)`
  align-self: flex-start;
  margin-top: 25px;
  margin-bottom: 15px;

  @media ${BREAKPOINTS.DESKTOP} {
    margin-top: 0;
    padding-left: 10%;
  }

  @media screen and (min-width: 1050px) {
    padding-left: 20%;
  }
`;

export const CheckoutDropdown = styled(Dropdown)`
  margin: 10px 0 20px;
  height: 46px;

  .dropdown-toggle {
    display: flex;
    align-items: center;
    background-color: transparent;
    justify-content: space-between;
    height: 46px;
    width: 100%;
    margin: 10px 0;
    padding: 0 20px;
    border-radius: 3px;
    border: 1px solid ${SHADES.SHADE_LIGHTER};
    color: ${BRAND.PRIMARY_TEXT};
    font-size: 16px;
  }
  .dropdown-menu {
    width: 100%;
    margin-top: -10px;
    li > a {
      color: ${BRAND.PRIMARY_TEXT};
      &:hover {
        background-color: #f0f1f4;
      }

      &:focus {
        outline: 0;
        background-color: #dadee4;
      }
    }
  }
`;

export const MultipleInputsLineContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${BREAKPOINTS.DESKTOP} {
    width: 80%;
  }

  @media screen and (min-width: 1050px) {
    width: 60%;
  }
`;

export const CheckoutNextStepButtonContainer = styled.div`
  margin: 32px;
  width: 60%;

  @media ${BREAKPOINTS.MOBILE} {
    width: 100%;
  }
`;

// Keeping for potential use in Customer account
export const DeliveryDateCalendarToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  height: 46px;
  margin: 10px 0 20px;
  padding-left: 20px;
  border-radius: 3px;
  border: 1px solid ${SHADES.SHADE_LIGHTER};
  color: ${BRAND.PRIMARY_TEXT};

  span {
    color: ${BRAND.PRIMARY_TEXT};
  }

  & .error {
    border-color: ${BRAND.ERROR};
  }
`;

export const DeliveryDateCalendarContainer = styled(InputContainer)`
  margin-top: -70px;
  background-color: ${SHADES.WHITE};
  border: 1px solid ${SHADES.SHADE_LIGHTER};
  border-radius: 3px;
  padding: 5px 10px 15px;
  position: relative;
`;
