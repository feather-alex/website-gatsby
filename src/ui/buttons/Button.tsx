/** @jsx jsx */
/* eslint react/button-has-type: 0 */
import { css, jsx } from "@emotion/core";
import { Link } from "gatsby";
import { COLORS, BRAND, SHADES, FONTS, BREAKPOINTS } from "../variables";

export enum ButtonStyle {
  PRIMARY = "primary",
  PRIMARY_INVERTED = "primary_inverted",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  COMPACT = "compact",
  COMPACT_TERTIARY = "compact_tertiary",
  COMPACT_TEXT = "compact_text",
  TEXT = "text",
  INLINE = "inline",
}

interface Props {
  style?: ButtonStyle;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  to?: string;
  mailto?: string;
  external?: string;
  isDisabled?: boolean;
  isAppearDisabled?: boolean;
  isFullWidth?: boolean;
  type?: "submit" | "button" | "reset";
  dataCy?: string;
  className?: string;
  color?: string;
  isUnderline?: boolean;
}

const backgroundColor = (style: ButtonStyle) => {
  switch (style) {
    case ButtonStyle.PRIMARY: {
      return BRAND.PRIMARY;
    }
    case ButtonStyle.PRIMARY_INVERTED: {
      return SHADES.WHITE;
    }
    case ButtonStyle.SECONDARY: {
      return COLORS.OAT;
    }
    default: {
      return "transparent";
    }
  }
};

const textColor = (style: ButtonStyle) => {
  switch (style) {
    case ButtonStyle.TEXT: {
      return BRAND.PRIMARY;
    }
    case ButtonStyle.COMPACT_TEXT: {
      return SHADES.SHADE_LIGHT;
    }
    default: {
      return BRAND.PRIMARY_TEXT;
    }
  }
};

const hoverStyle = (style: ButtonStyle) => {
  switch (style) {
    case ButtonStyle.PRIMARY: {
      return `
        background-color: ${COLORS.STANDARD_BUTTON_HOVER};
      `;
    }
    case ButtonStyle.PRIMARY_INVERTED: {
      return `
        background-color: ${COLORS.INVERTED_BUTTON_HOVER};
      `;
    }
    case ButtonStyle.SECONDARY: {
      return `
        background-color: ${COLORS.SECONDARY_BUTTON_HOVER};
      `;
    }
    case ButtonStyle.COMPACT_TERTIARY:
    case ButtonStyle.TERTIARY: {
      return `
        background-color: ${COLORS.OAT};
      `;
    }
    case ButtonStyle.COMPACT: {
      return `
        background-color: ${BRAND.PRIMARY};
      `;
    }
    case ButtonStyle.INLINE:
    case ButtonStyle.COMPACT_TEXT:
    case ButtonStyle.TEXT: {
      return `
        &:after {
          opacity: 0;
        }
      `;
    }
    default: {
      return "";
    }
  }
};

const borderStyle = (style: ButtonStyle) => {
  switch (style) {
    case ButtonStyle.INLINE:
    case ButtonStyle.COMPACT_TEXT:
    case ButtonStyle.TEXT: {
      return `
        border: none;
      `;
    }
    case ButtonStyle.COMPACT: {
      return `
        border: none;
        box-shadow: inset 0px 0px 0px 2px ${BRAND.PRIMARY};
        border-radius: 88px;
      `;
    }
    case ButtonStyle.COMPACT_TERTIARY:
    case ButtonStyle.TERTIARY: {
      return `
        border: none;
        box-shadow: inset 0px 0px 0px 2px ${COLORS.OAT};
        border-radius: 88px;
      `;
    }
    default: {
      return `
        border: none;
        border-radius: 88px;
      `;
    }
  }
};

const displayStyle = (style: ButtonStyle, isFullWidth?: boolean) => {
  const defaults = `
    display: flex;
    align-items: center;
    justify-content: center;
    ${isFullWidth ? `width: 100%;` : "width: fit-content;"}
  `;
  switch (style) {
    case ButtonStyle.INLINE:
    case ButtonStyle.COMPACT_TEXT:
    case ButtonStyle.TEXT: {
      return `
        position: relative;
        width: fit-content;
        padding: 0;
      `;
    }
    case ButtonStyle.COMPACT_TERTIARY:
    case ButtonStyle.COMPACT: {
      return `
        ${defaults}
        padding: 8px 24px;
      `;
    }
    default: {
      return `
        ${defaults}
        padding: 16px 40px;
      `;
    }
  }
};

const disabledStyle = (style: ButtonStyle) => {
  switch (style) {
    case ButtonStyle.PRIMARY:
    case ButtonStyle.PRIMARY_INVERTED:
    case ButtonStyle.SECONDARY:
    case ButtonStyle.TERTIARY: {
      return `
        background-color: ${BRAND.ACCENT};
        color: ${BRAND.SECONDARY_TEXT};
        &:hover, &:focus, &:active, &:hover:focus {
          background-color: ${BRAND.ACCENT};
          color: ${BRAND.SECONDARY_TEXT};
        }
      `;
    }
    case ButtonStyle.COMPACT_TERTIARY:
    case ButtonStyle.COMPACT: {
      return `
        color: ${BRAND.ACCENT};
        border: none;
        box-shadow: inset 0px 0px 0px 2px ${BRAND.ACCENT};
        &:hover, &:focus, &:active, &:hover:focus {
          color: ${BRAND.ACCENT};
          background-color: ${BRAND.ACCENT};
          box-shadow: inset 0px 0px 0px 2px ${BRAND.ACCENT};
        }
      `;
    }
    case ButtonStyle.INLINE:
    case ButtonStyle.COMPACT_TEXT:
    case ButtonStyle.TEXT: {
      return `
        color: ${BRAND.ACCENT};
        border: none;
        &:hover, &:focus, &:active, &:hover:focus {
          color: ${BRAND.ACCENT};
        }
        &:after {
          background-color: ${BRAND.ACCENT};
        }
      `;
    }
    default: {
      return "";
    }
  }
};

const typeStyle = (style: ButtonStyle) => {
  switch (style) {
    case ButtonStyle.TEXT: {
      return `
        font-size: 18px;
        line-height: 28px;
        font-weight: 700;
      `;
    }
    case ButtonStyle.COMPACT_TERTIARY:
    case ButtonStyle.COMPACT: {
      return `
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
      `;
    }
    case ButtonStyle.COMPACT_TEXT: {
      return `
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
      `;
    }
    case ButtonStyle.INLINE: {
      return "";
    }
    default: {
      return `
        font-size: 18px;
        line-height: 28px;
        font-weight: 500;
        @media ${BREAKPOINTS.MOBILE} {
          font-size: 16px;
          line-height: 19px;
        }
      `;
    }
  }
};

const getCSS = (
  style: ButtonStyle,
  isFullWidth?: boolean,
  isUnderline?: boolean,
  isAppearDisabled?: boolean
) => `
    white-space: nowrap;
    ${displayStyle(style, isFullWidth)}
    ${borderStyle(style)}

    ${typeStyle(style)}
    font-family: ${FONTS.PRIMARY};
    color: ${textColor(style)};
    background-color: ${backgroundColor(style)};
    transition: all 150ms ease;

    @media (hover: hover) {
      &:hover {
        color: ${textColor(style)};
        ${hoverStyle(style)};
        &:focus {
          color: ${textColor(style)};
        }
      }
    }
    &:focus {
      outline: none;
      color: ${textColor(style)};
    }
    &:active {
      color: ${textColor(style)};
      ${hoverStyle(style)}
    }
    &:disabled {
      ${disabledStyle(style)}
    }

    ${
      style === ButtonStyle.COMPACT_TEXT || style === ButtonStyle.INLINE
        ? `
      &:after {
        content: '';
        position: absolute;
        bottom: 2px;
        width: 100%;
        height: 1px;
        opacity: 1;
        background-color: currentcolor;
        left: 0;
        transition: opacity 150ms ease;
      }
    `
        : ""
    }

    ${
      style === ButtonStyle.TEXT && isUnderline
        ? `
      &:after {
        content: '';
        position: absolute;
        bottom: -3px;
        width: 100%;
        height: 2px;
        opacity: 1;
        background-color: currentcolor;
        left: 0;
        transition: opacity 150ms ease;
      }
    `
        : ""
    }

    ${isAppearDisabled ? disabledStyle(style) : ""}
  `;

const getLabelFromChildren = (children: React.ReactNode): string => {
  if (!children) {
    return "";
  } else if (typeof children === "string") {
    return children;
  } else if (Array.isArray(children)) {
    return children.map(getLabelFromChildren).join(" ");
  }
  return "";
};

const Button = ({
  children,
  className,
  color,
  dataCy,
  isDisabled,
  isAppearDisabled,
  isFullWidth,
  mailto,
  external,
  onClick,
  style = ButtonStyle.PRIMARY,
  to,
  isUnderline = true,
  type = "button",
  onKeyDown,
}: Props) => {
  const cssStyles = `
    ${getCSS(style, isFullWidth, isUnderline, isAppearDisabled)}
    ${color ? `color: ${color};` : ""}
  `;

  const label = getLabelFromChildren(children) || "button";

  if (to) {
    return (
      <Link
        data-cy={dataCy}
        to={to}
        onClick={onClick}
        onKeyDown={onKeyDown}
        css={css`
          ${cssStyles}
          ${isDisabled || isAppearDisabled ? disabledStyle(style) : ""}
        `}
        role="button"
        aria-label={label}
        className={className}
      >
        {children}
      </Link>
    );
  }
  if (mailto || external) {
    return (
      <a
        data-cy={dataCy}
        href={mailto ? `mailto:${mailto}` : external}
        onClick={onClick}
        onKeyDown={onKeyDown}
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          ${cssStyles}
          ${isDisabled || isAppearDisabled ? disabledStyle(style) : ""}
        `}
        className={className}
        role="button"
        aria-label={label}
      >
        {children}
      </a>
    );
  }
  if (onClick) {
    return (
      <button
        data-cy={dataCy}
        css={css`
          ${cssStyles}
        `}
        onClick={onClick}
        onKeyDown={onKeyDown}
        disabled={isDisabled}
        type={type}
        className={className}
        aria-label={label}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      data-cy={dataCy}
      css={css`
        ${cssStyles}
      `}
      disabled={isDisabled}
      className={className}
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
};

export default Button;
