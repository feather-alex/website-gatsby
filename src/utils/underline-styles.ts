import { BRAND } from "../ui/variables";

export const underlineStyle = `
&:after {
  content: '';
  position: absolute;
  bottom: -1px;
  width: 100%;
  height: 1px;
  opacity: 1;
  left: 0;
  background-color: ${BRAND.PRIMARY_TEXT};
}
`;

export const animatedUnderlineStyle = `
&:before,
&:after {
  content: '';
  position: absolute;
  bottom: -1px;
  width: 0px;
  height: 1px;
  transition: all 0.3s linear;
  opacity: 0;
  left: 0;
  background-color: ${BRAND.PRIMARY_TEXT};
}

&:hover:before,
&:hover:after {
  opacity: 1;
  width: 100%;
}`;
