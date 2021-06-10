/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NavLink as RouterNavLink, match } from 'react-router-dom';
import { BRAND } from '../../../ui/variables';
import { Location } from 'history';
import NavLink from './NavLink';

interface Props {
  imageUrl: string;
  imageAlt: string;
  linkText: string;
  to: string;
  onClick: () => void;
  isActive?: (match: match, location: Location) => boolean;
  exact?: boolean;
  isFullWidth?: boolean;
}

const NavImageLink = ({
  imageUrl,
  imageAlt,
  linkText,
  to,
  onClick,
  isActive,
  exact = false,
  isFullWidth = false
}: Props) => (
  <div
    css={css`
      ${isFullWidth ? 'width: 100%;' : ''}
      a.active {
        h6 {
          &:before,
          &:after {
            content: '';
            position: absolute;
            bottom: -1px;
            height: 1px;
            width: 50%;
            opacity: 1;
            background-color: ${BRAND.PRIMARY_TEXT};
          }
        }
      }
    `}
  >
    <RouterNavLink to={to} onClick={onClick} exact={exact} isActive={isActive} activeClassName="active">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: start;
          margin: 0 25px;
          cursor: pointer;

          &:hover {
            h6 {
              &:before,
              &:after {
                opacity: 1;
                width: 50%;
              }
            }
          }

          h6 {
            position: relative;
            &:before,
            &:after {
              content: '';
              position: absolute;
              bottom: -1px;
              width: 0px;
              height: 1px;
              transition: all 0.3s linear;
              opacity: 0;
              background-color: ${BRAND.PRIMARY_TEXT};
            }

            &:before {
              right: 50%;
            }

            &:after {
              left: 50%;
            }
          }
        `}
      >
        <div
          css={css`
            width: ${isFullWidth ? '100%' : '214px'};
            ${isFullWidth ? '' : 'height: 141px;'}
            margin-bottom: 16px;
          `}
        >
          <img
            css={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
            `}
            src={`${imageUrl}?auto=format,compress&w=500&cs=srgb`}
            srcSet={`
            ${imageUrl}?auto=format,compress&w=500&cs=srgb 1x,
            ${imageUrl}?auto=format,compress&w=500&cs=srgb&dpr=2 2x
          `}
            alt={imageAlt}
          />
        </div>
        <NavLink label={linkText} withArrow={true} to={to} onClick={onClick} />
      </div>
    </RouterNavLink>
  </div>
);

export default NavImageLink;
