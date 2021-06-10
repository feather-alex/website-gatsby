/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

interface Props {
  isMobile: boolean;
}

const SPACER = ' · ';

// An array of all the NYC Boroughs
const BOROUGHS = ['Queens', 'Brooklyn', 'Bronx', 'Manhattan', 'Staten Island'];

// Number of times to repeat the 5 boroughs
const BOROUGHS_COUNT = 20;

// The width of the space into which the text will render.
// Derived from `(path.getTotalLength() * 5/2)`
// Must be recalculated if path is changed.
// Firefox: applies to <text> textLength
// Chrome/Safari/Edge: applies to <textPath> textLength
const PATH_TEXT_LENGTH = 9278.25;

class LandingMarquee extends React.Component<Props> {
  render() {
    const animateDur = this.props.isMobile ? '15s' : '30s';

    return (
      <div
        css={css`
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          // This prevents animation flicker on mobile, e.g. iPhone X
          // Additionally this will trigger HW acceleration
          transform: translate3d(0, 0, 0);

          svg {
            width: 100%;
            height: 100%;
          }
        `}
      >
        <svg id="border-svg" preserveAspectRatio="none" viewBox="0 0 1000 1000" fontSize="21px">
          <path
            pathLength="1000"
            fill="transparent"
            d="M 925,975 L 75,975 a 50 50 0 0 1 -50,-50 L 25,75 a 50 50 0 0 1 50,-50 L 925,25 a 50 50 0 0 1 50,50 L 975,925 a 50 50 0 0 1 -50,50 Z"
            id="border"
          />
          <text textAnchor="middle" fill="#274D58" textLength={PATH_TEXT_LENGTH}>
            <textPath xlinkHref="#border" lengthAdjust="spacing" startOffset="50%" textLength={PATH_TEXT_LENGTH}>
              {(BOROUGHS.join(SPACER) + SPACER).repeat(BOROUGHS_COUNT)}
              <animate attributeName="startOffset" from="50%" to="100%" dur={animateDur} repeatCount="indefinite" />
            </textPath>
          </text>
        </svg>
      </div>
    );
  }
}

export default LandingMarquee;
