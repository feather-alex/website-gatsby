/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import FeatherArchLogo from "../logos/FeatherArchLogo";
import { useState, useEffect } from "react";
import { COLORS } from "../variables";

const colorCombos = [
  {
    archWallColor: COLORS.POPPY,
    archFloorColor: COLORS.SUMAC,
    archOpeningColor: COLORS.MINT,
  },
  {
    archWallColor: COLORS.POPPY,
    archFloorColor: COLORS.SUMAC,
    archOpeningColor: COLORS.CITRON,
  },
  {
    archWallColor: COLORS.POPPY,
    archFloorColor: COLORS.MINT,
    archOpeningColor: COLORS.CITRON,
  },
  {
    archWallColor: COLORS.YVES,
    archFloorColor: COLORS.MINT,
    archOpeningColor: COLORS.CITRON,
  },
  {
    archWallColor: COLORS.YVES,
    archFloorColor: COLORS.MINT,
    archOpeningColor: COLORS.LILAC,
  },
  {
    archWallColor: COLORS.YVES,
    archFloorColor: COLORS.BLUSH,
    archOpeningColor: COLORS.LILAC,
  },
  {
    archWallColor: COLORS.BLACKBERRY,
    archFloorColor: COLORS.BLUSH,
    archOpeningColor: COLORS.LILAC,
  },
  {
    archWallColor: COLORS.BLACKBERRY,
    archFloorColor: COLORS.BLUSH,
    archOpeningColor: COLORS.MINT,
  },
  {
    archWallColor: COLORS.BLACKBERRY,
    archFloorColor: COLORS.CITRON,
    archOpeningColor: COLORS.MINT,
  },
  {
    archWallColor: COLORS.SUMAC,
    archFloorColor: COLORS.CITRON,
    archOpeningColor: COLORS.MINT,
  },
  {
    archWallColor: COLORS.SUMAC,
    archFloorColor: COLORS.CITRON,
    archOpeningColor: COLORS.POPPY,
  },
  {
    archWallColor: COLORS.SUMAC,
    archFloorColor: COLORS.CHERRY,
    archOpeningColor: COLORS.POPPY,
  },
  {
    archWallColor: COLORS.BLUSH,
    archFloorColor: COLORS.CHERRY,
    archOpeningColor: COLORS.POPPY,
  },
  {
    archWallColor: COLORS.BLUSH,
    archFloorColor: COLORS.CHERRY,
    archOpeningColor: COLORS.MINT,
  },
  {
    archWallColor: COLORS.BLUSH,
    archFloorColor: COLORS.SUMAC,
    archOpeningColor: COLORS.MINT,
  },
];

const LoadingFeatherArch = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentCombo, setCurrentCombo] = useState(colorCombos[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = (currentIdx + 1) % colorCombos.length;
      setCurrentCombo(colorCombos[nextIdx]);
      setCurrentIdx(nextIdx);
    }, 200);
    return () => clearInterval(interval);
  }, [currentIdx, currentCombo, setCurrentCombo, setCurrentIdx]);

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
      `}
    >
      <div css={css``}>
        <FeatherArchLogo height={88} {...currentCombo} />
      </div>
    </div>
  );
};

export default LoadingFeatherArch;
