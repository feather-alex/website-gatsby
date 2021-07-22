/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Title1 from "../titles/Title1";
import { Link } from "gatsby";
import { COLORS } from "../variables";
import ArrowIcon, { Direction } from "../icons/ArrowIcon";
import getOnClickProps from "../../utils/on-click-props";

const Container = styled.div`
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ withBorder }: { withBorder: boolean }) =>
    withBorder
      ? `
    height: 70px;
    background-color: ${COLORS.CLOUD};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  `
      : `height: 50px;`}
  padding-right: 19px;
  margin-bottom: 10px;
`;

const Image = styled.div`
  height: 100%;
  width: 80px;
  background-image: url("${({ url }: { url: string }) => url}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 8px 0 0 8px;
`;

const LinkName = styled(Title1)`
  flex: 1;
  padding-left: 16px;
  ${({ shouldUnderline }: { shouldUnderline: boolean }) =>
    shouldUnderline && `text-decoration: underline;`}
`;

interface ComponentProps {
  name: string;
  withArrow: boolean;
  onClick: () => void;
  imageUrl?: string;
}

const LinkComponent = ({
  name,
  imageUrl,
  onClick,
  withArrow,
}: ComponentProps) => (
  <Container
    {...getOnClickProps(onClick)}
    withBorder={withArrow}
    data-cy={`nav-${name.toLowerCase().split(" ").join("-")}`}
  >
    {imageUrl && <Image url={imageUrl} />}
    <LinkName isBold={true} shouldUnderline={!withArrow}>
      {name}
    </LinkName>
    {withArrow && <ArrowIcon direction={Direction.Right} width={12} />}
  </Container>
);

interface Props {
  name: string;
  withArrow: boolean;
  onClick: () => void;
  imageUrl?: string;
  to?: string;
}

const MobileNavLink = ({ name, imageUrl, onClick, withArrow, to }: Props) => {
  if (to) {
    return (
      <Link to={to}>
        <LinkComponent
          name={name}
          imageUrl={imageUrl}
          onClick={onClick}
          withArrow={withArrow}
        />
      </Link>
    );
  } else {
    return (
      <LinkComponent
        name={name}
        imageUrl={imageUrl}
        onClick={onClick}
        withArrow={withArrow}
      />
    );
  }
};

export default MobileNavLink;
