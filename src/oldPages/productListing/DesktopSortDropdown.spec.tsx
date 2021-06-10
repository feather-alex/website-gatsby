import React from 'react';
import { render } from '@testing-library/react';
import DesktopSortDropdown from './DesktopSortDropdown';
import { noop } from '../../utils/ui-helpers';
import { FilterType } from './filter.service';
import selectEvent from 'react-select-event';
import { Order } from './DesktopSortDropdown.service';

describe('<DesktopSortDropdown />', () => {
  it('renders recommended by default', () => {
    const { getByText } = render(
      <DesktopSortDropdown
        handleSortOptionClick={noop}
        activeFilters={{
          [FilterType.SORT_BY]: [],
          [FilterType.ORDER]: [],
          [FilterType.BRAND_FILTER]: [],
          [FilterType.SUBCLASS]: [],
          [FilterType.CLASS]: []
        }}
      />
    );

    expect(getByText('Recommended')).toBeTruthy();
  });
  it('renders correct filter from the active filters', () => {
    const { getByText } = render(
      <DesktopSortDropdown
        handleSortOptionClick={noop}
        activeFilters={{
          [FilterType.SORT_BY]: ['price'],
          [FilterType.ORDER]: [Order.ASC],
          [FilterType.BRAND_FILTER]: [],
          [FilterType.SUBCLASS]: [],
          [FilterType.CLASS]: []
        }}
      />
    );

    expect(getByText('Price: Low to High')).toBeTruthy();
  });
  it('gives the correct args to the handler on select', async () => {
    const handler = jest.fn();
    const { getByLabelText } = render(
      <DesktopSortDropdown
        handleSortOptionClick={handler}
        activeFilters={{
          [FilterType.SORT_BY]: [],
          [FilterType.ORDER]: [],
          [FilterType.BRAND_FILTER]: [],
          [FilterType.SUBCLASS]: [],
          [FilterType.CLASS]: []
        }}
      />
    );

    await selectEvent.select(getByLabelText('Sort Order Select'), 'A to Z');

    expect(handler).toHaveBeenCalledWith('title', Order.ASC);
  });
});
