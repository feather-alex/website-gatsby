/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { BRAND } from '../../ui/variables';
import Panel from 'react-bootstrap/lib/Panel';
import Header3 from '../../ui/headers/Header3';
import Title3 from '../../ui/titles/Title3';
import CaratIcon, { Direction } from '../../ui/icons/small/CaratIcon';

interface Props {
  header: string;
  activeKey: React.MouseEvent<string> | string | null;
  children: React.ReactNode;
  nbSelectedFilters?: number;
  sortOption?: string | null;
}

const MobileProductFilterAccordion = ({ header, activeKey, children, nbSelectedFilters, sortOption }: Props) => {
  return (
    <div
      css={css`
        padding: 0;
        .panel {
          border: none;
          border-bottom: 1px solid ${BRAND.ACCENT};
          box-shadow: none;
          .panel-heading,
          .panel-body {
            color: ${BRAND.PRIMARY_TEXT};
            background-color: ${BRAND.BACKGROUND};
            border: none;
            padding: 24px;
            text-align: left;
          }

          .panel-heading + .panel-collapse > .panel-body {
            border-top-color: transparent;
          }
        }
      `}
    >
      <Panel
        eventKey={header}
        css={css`
          margin: 0;
        `}
      >
        <Panel.Heading>
          <Panel.Title
            toggle={true}
            css={css`
              a {
                padding: 0;
                text-decoration: none;
                display: flex;
                flex-direction: row;
                text-align: left;
                align-items: center;
                justify-content: space-between;
                width: 100%;
              }
            `}
          >
            <Header3>{header}</Header3>
            <div
              css={css`
                display: flex;
                align-items: center;
                > p {
                  margin-right: 8px;
                }
              `}
            >
              {nbSelectedFilters && nbSelectedFilters > 0 ? <Title3>{nbSelectedFilters} selected</Title3> : null}
              <Title3>{sortOption}</Title3>
              <CaratIcon direction={activeKey === header ? Direction.Up : Direction.Down} width={12} />
            </div>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible={true}>{children}</Panel.Body>
      </Panel>
    </div>
  );
};

export default MobileProductFilterAccordion;
