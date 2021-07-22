import React from "react";
import { COLORS } from "../variables";

interface Props {
  archWallColor?: string;
  archFloorColor?: string;
  archOpeningColor?: string;
  height?: number;
}

const transition = "fill 200ms ease-in-out";

const FeatherArchLogo = ({
  archWallColor = COLORS.POPPY,
  archFloorColor = COLORS.SUMAC,
  archOpeningColor = COLORS.MINT,
  height = 181,
}: Props) => (
  <svg
    height={height}
    viewBox="0 0 104 181"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M86.07 12.695a51.753 51.753 0 00-13.245 17.643 51.643 51.643 0 00-4.681 21.542v89.847L0 180.998V51.88a51.798 51.798 0 018.262-28.05A51.966 51.966 0 0130.413 4.69 52.106 52.106 0 0159.42.539a52.053 52.053 0 0126.65 12.156z"
      style={{ fill: archWallColor, transition }}
    />
    <path
      d="M103.999 51.88V162.34l-35.856-20.611V51.881a51.643 51.643 0 014.681-21.543 51.75 51.75 0 0113.244-17.643l.596.51a51.715 51.715 0 0112.82 17.485 51.599 51.599 0 014.515 21.19z"
      style={{ fill: archOpeningColor, transition }}
    />
    <path
      d="M104 162.342v18.659H0l68.144-39.271L104 162.342z"
      style={{ fill: archFloorColor, transition }}
    />
  </svg>
);

export default FeatherArchLogo;
