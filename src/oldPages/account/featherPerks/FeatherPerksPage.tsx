/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { useDispatch, useSelector } from "react-redux";
import Analytics from "../../../analytics/analytics";
import PAGES from "../../../analytics/pages";
import Loading from "../../../components/Loading";
import { CONTENTFUL_IDS } from "../../../contentful/contentful.types";
import Header1 from "../../../ui/headers/Header1";
import ErrorPage from "../../../components/ErrorPage";
import { BREAKPOINTS, MARGINS } from "../../../ui/variables";
import useMount from "../../../utils/useMount";
import FeatherPerkCard from "./FeatherPerkCard";
import { getFeatherPerksContent } from "./store/featherPerks.actions";
import {
  getError,
  getIsFetching,
  getPerks,
} from "./store/featherPerks.selectors";

const FeatherPerksContainer = styled.div`
  @media ${BREAKPOINTS.MOBILE} {
    margin: ${MARGINS.MOBILE};
  }
`;

const FeatherPerksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 32%);
  grid-gap: 16px;
  max-width: 930px;
  margin: 32px 0 128px;

  @media ${BREAKPOINTS.MOBILE} {
    grid-template-columns: 100%;
  }
`;

const FeatherPerksPage = () => {
  const dispatch = useDispatch();

  const isFetching = useSelector(getIsFetching);
  const error = useSelector(getError);
  const perks = useSelector(getPerks);

  useMount(() => {
    dispatch(
      getFeatherPerksContent.request({ id: CONTENTFUL_IDS.FEATHER_PERKS })
    );
    Analytics.trackPage(PAGES.ACCOUNT_PERKS);
  });

  if (isFetching) {
    return <Loading />;
  }

  if (error || !perks) {
    return (
      <ErrorPage
        title="Oh no! Something went wrong when loading this content."
        content="Try refreshing the page, but if that doesn't work you can always reach out to us with questions about perks with Feather."
        to="/contact"
        buttonText="Contact Us"
      />
    );
  }

  return (
    perks && (
      <FeatherPerksContainer>
        <Header1>Feather Perks</Header1>
        <FeatherPerksGrid>
          {perks.map((perk) => (
            <FeatherPerkCard
              key={perk.name}
              name={perk.name}
              logo={perk.logo}
              caption={perk.caption}
              discount={perk.discount}
              website={perk.website}
              imageUrl={perk.imageUrl}
            />
          ))}
        </FeatherPerksGrid>
      </FeatherPerksContainer>
    )
  );
};

export default FeatherPerksPage;
