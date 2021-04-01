/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { SHADES, BRAND } from "../variables";
import QuestionIcon from "../icons/QuestionIcon";
import getOnClickProps from "../../utils/on-click-props";
import { Z_INDICIES } from "../zIndicies";

interface Props {
  isMobileBreakpoint: boolean;
  isIconInverted?: boolean;
  children: React.ReactNode;
}

interface State {
  showPopover: boolean;
}

class Popover extends React.Component<Props, State> {
  public readonly state = { showPopover: false };

  handlePopover = () => {
    if (this.props.isMobileBreakpoint) {
      this.setState((prevState) => ({ showPopover: !prevState.showPopover }));
    }
  };

  handleMouseOver = () => {
    this.setState({ showPopover: true });
  };

  handleMouseOut = () => {
    this.setState({ showPopover: false });
  };

  render() {
    const { isIconInverted, children } = this.props;
    const { showPopover } = this.state;

    return (
      <div
        css={css`
          position: relative;
        `}
        {...getOnClickProps(this.handlePopover)}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <QuestionIcon isInverted={isIconInverted} />
        <div
          css={css`
            display: flex;
            pointer-events: none;
            justify-content: space-between;
            text-align: center;
            background-color: ${SHADES.WHITE};
            padding: 8px;
            position: absolute;
            border: 1px solid ${BRAND.ACCENT};
            min-width: 200px;
            right: -30px;
            transition: all 0.4s ease-in-out;
            ${showPopover
              ? `
              opacity: 1;
              visibility: visible;
              z-index: ${Z_INDICIES.POPOVER};
              top: 43px;`
              : `opacity: 0;
              visibility: hidden;
              top: 10px;
              `}
            :before,
            :after {
              position: absolute;
              z-index: ${Z_INDICIES.POPOVER_PSUEDO_ELEMENTS};
              content: "";
              border-style: solid;
            }

            :before {
              top: -14px;
              right: 16%;
              border-width: 0 10px 14px 10px;
              border-color: transparent transparent ${BRAND.ACCENT} transparent;
            }

            :after {
              top: -12px;
              right: 17%;
              border-width: 0 8px 12px 8px;
              border-color: transparent transparent ${SHADES.WHITE} transparent;
            }
          `}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Popover;
