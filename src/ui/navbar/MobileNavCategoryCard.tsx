/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { COLORS } from "../variables";
import Caption from "../captions/Caption";
import { Link } from "gatsby";
import getOnClickProps from "../../utils/on-click-props";

const Container = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Image = styled.div`
  height: 100px;
  width: 100%;
  background-color: ${COLORS.CLOUD};
  background-image: url('${({ url }: { url: string }) => url}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: 8px;
`;

interface Props {
  name: string;
  imageUrl: string;
  to: string;
  isFullscreen: boolean;
  onClick: () => void;
}

const MobileNavCategoryCard = ({ name, imageUrl, to, onClick }: Props) => (
  <Link to={to}>
    <Container {...getOnClickProps(onClick)}>
      <Image url={imageUrl} />
      <Caption>{name}</Caption>
    </Container>
  </Link>
);

export default MobileNavCategoryCard;
