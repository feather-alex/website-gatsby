export const homepageClickLinkPayloadMapping = ({ link }: { link: string }) => ({
  link_clicked: link
});

export const homepageShopByRoomClickedPayloadMapping = ({ room }: { room: string }) => ({
  room
});
