import React from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import Header2 from "../../ui/headers/Header2";
import { BREAKPOINTS, SHADES } from "../../ui/variables";
import { getWindowWidth } from "../../app/store/dimensions/dimensions.selectors";
import VariableImageFeature from "../../ui/pageElements/VariableImageFeature";
import FeatherFloydLogo from "../../ui/logos/FeatherFloydLogo";
import Button, { ButtonStyle } from "../../ui/buttons/Button";

const FeatherFloydFeature = styled(VariableImageFeature)`
  margin: 144px 0;
  @media ${BREAKPOINTS.MOBILE} {
    margin: 0 0 128px;
  }
`;

const FeatherFloydHeader = styled(Header2)`
  max-width: 472px;
  margin: 24px 0 32px;
`;

const FeatherFloyd = () => {
  const isFloydCustomBreakpoint = useSelector(getWindowWidth) < 1148;
  return (
    <FeatherFloydFeature
      image={{
        src: isFloydCustomBreakpoint
          ? "https://img.livefeather.com/pages-new/Homepage/floyd-homepage-mobile.png"
          : "https://img.livefeather.com/pages-new/Homepage/floyd-homepage-desktop.png",
        alt: "Floyd Furniture",
      }}
      imageWidthPercentage={65}
    >
      <FeatherFloydLogo width={144} color={SHADES.WHITE} />
      <FeatherFloydHeader color={SHADES.WHITE}>
        Floyd Furniture Meets Feather Flexibility
      </FeatherFloydHeader>
      <Button
        style={ButtonStyle.PRIMARY_INVERTED}
        // onClick={trackCTAClick(AnalyticsEventKey.floydCTA)}
        to="/products?brands=floyd"
      >
        Explore Floyd Furniture
      </Button>
    </FeatherFloydFeature>
  );
};

export default FeatherFloyd;
