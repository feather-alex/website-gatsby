/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Link } from "gatsby";

interface Props {
  src: string;
  to?: string;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subText?: any;
  isMobile: boolean;
}

const CoverImage = (props: Props) => {
  const cssStyles = `
    background-image: url('${props.src}');
    background-position: center;
    background-size: cover;
    max-height: ${props.isMobile ? "364px" : "66vh"};
    max-width: 100%;
  `;

  if (props.to) {
    return (
      <Link to={props.to} className="cover-image">
        <img
          alt=""
          src={props.src}
          css={css`
            ${cssStyles}
          `}
        />
        {props.subText}
      </Link>
    );
  } else {
    return (
      <div
        css={css`
          ${cssStyles}
        `}
        className="cover-image"
      />
    );
  }
};

export default CoverImage;
