import React from "react";
import { SHADES } from "../variables";

const CartIcon = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 4V3c0-1.65-1.35-3-3-3H0v2h4c.55 0 1 .45 1 1v15c0 1.65 1.35 3 3 3h16v-2H8c-.55 0-1-.45-1-1v-1.15l16.49-2.59A2.997 2.997 0 0026 11.3V4H7zm17 7.31c0 .49-.35.91-.83.98L7 14.83V6h17v5.31zM8 23.5c0 .83-.67 1.5-1.5 1.5S5 24.33 5 23.5 5.67 22 6.5 22s1.5.67 1.5 1.5zm16 0c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"
        fill={SHADES.BLACK}
      />
    </svg>
  );
};

export default CartIcon;
