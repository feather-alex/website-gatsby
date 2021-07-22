/** @jsx jsx */
import { useEffect } from "react";
import { jsx, Global, css } from "@emotion/core";

import Analytics from "../../analytics/analytics";
import PAGES from "../../analytics/pages";
import Helmet from "../../components/Helmet";
import Layout from "../../app/Layout";
import globalStyleString from "./Reviews.style";
import Header1 from "../../ui/headers/Header1";
import HeaderContainer from "../../ui/headers/HeaderContainer";

const TITLE = "Reviews of Feather";
const DESCRIPTION =
  "Five-star reviews from hundreds of happy customers. Delivery & assembly within 7 days. Personal service. Help from humans.";

type WindowWithYotpo = Window & typeof globalThis & { yotpo?: object };

const Reviews = () => {
  useEffect(() => {
    Analytics.trackPage(PAGES.REVIEWS);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//staticw2.yotpo.com/WKsxnZRCbChz5o0dFtt4s4OmJUKipUadONUvG31e/widget.js";
    script.async = true;

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
      (window as WindowWithYotpo).yotpo = undefined;
    };
  }, []);

  return (
    <Layout>
      <Helmet
        title={TITLE}
        description={DESCRIPTION}
        imageUrl={`https://img.livefeather.com/pages-new/Reviews/Image.jpg?auto=compress&sat=29&q=100?sharp=10&w=600&dpr=1.5`}
      />
      <HeaderContainer>
        <Header1>We'll let our members take it from here</Header1>
      </HeaderContainer>

      <div className="yotpo-container">
        <div id="yotpo-testimonials-custom-tab" />
        <Global styles={css(globalStyleString)} />
      </div>
    </Layout>
  );
};

export default Reviews;
