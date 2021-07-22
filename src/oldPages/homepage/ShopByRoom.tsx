/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { ContentfulImage, ShopByRoom } from "../../contentful/contentful.types";
import ColorBorder, { ColorBorderArray } from "../../ui/borders/ColorBorder";
import Header1 from "../../ui/headers/Header1";
import ResponsiveImage from "../../ui/images/ResponsiveImage";
import Bold from "../../ui/paragraphs/Bold";
import Paragraph1 from "../../ui/paragraphs/Paragraph1";
import { GRID_BREAKPOINTS } from "../../ui/variables";
import Analytics from "../../analytics/analytics";
import { HOMEPAGE } from "../../analytics/homepage/events";
import { homepageShopByRoomClickedPayloadMapping } from "../../analytics/homepage/payload-mappings";

const RoomName = styled(Paragraph1)`
  margin: 16px 0;
  text-align: center;
`;
interface RoomCardProps {
  colorSet: [string, string];
  name: string;
  image: ContentfulImage;
  url: string;
}

const RoomCard = ({ colorSet, name, image, url }: RoomCardProps) => {
  const trackCTAClick = () => {
    Analytics.trackEvent(
      HOMEPAGE.SHOP_BY_ROOM,
      homepageShopByRoomClickedPayloadMapping({ room: name })
    );
  };

  return (
    <ColorBorder color={colorSet} withAnimation={true}>
      <Link to={url} onClick={trackCTAClick}>
        <ResponsiveImage src={image.url} width={152} height={120} />
        <Bold>
          <RoomName>{name}</RoomName>
        </Bold>
      </Link>
    </ColorBorder>
  );
};

const ShopByRoomSection = styled.section`
  margin: 48px 0 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShopByRoomHeader = styled(Header1)`
  margin-bottom: 40px;
`;

const RoomsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 20vw);
  column-gap: 24px;

  @media ${GRID_BREAKPOINTS.TABLET} {
    grid-template-columns: repeat(4, 22vw);
    column-gap: 16px;
  }

  @media ${GRID_BREAKPOINTS.MOBILE} {
    grid-template-columns: repeat(2, 45vw);
    column-gap: 8px;
    row-gap: 16px;
  }
`;

const ShopByRoom = ({ shopByRoom }: { shopByRoom: ShopByRoom }) => (
  <ShopByRoomSection>
    <ShopByRoomHeader>{shopByRoom.title}</ShopByRoomHeader>
    <RoomsContainer>
      {shopByRoom.rooms.map((room, index) => (
        <RoomCard
          key={room.name}
          {...room}
          colorSet={ColorBorderArray[index % ColorBorderArray.length]}
        />
      ))}
    </RoomsContainer>
  </ShopByRoomSection>
);

export default ShopByRoom;
