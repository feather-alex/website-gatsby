import React from 'react';
import renderWithRedux from '../../utils/test-utils';
import CurrentFurniturePage from './CurrentFurniturePage';
import { stateWithPurchased, stateWithoutPurchased } from './account.fixtures';

jest.mock('../../assets/images/minus-cursor-1x.png', () => {
  return '';
});
jest.mock('../../assets/images/minus-cursor-2x.png', () => {
  return '';
});
jest.mock('../../assets/images/plus-cursor-1x.png', () => {
  return '';
});
jest.mock('../../assets/images/plus-cursor-2x.png', () => {
  return '';
});

jest.mock('../../utils/use-intersection-observer', () => {
  return jest.fn();
});

describe('<CurrentFurniturePage />', () => {
  it('renders with Current rentals and Purchased Items', () => {
    const { getByText } = renderWithRedux(<CurrentFurniturePage />, stateWithPurchased);

    expect(getByText('Varick coffee table')).toBeTruthy();
    expect(getByText('Purchased Couch')).toBeTruthy();
  });

  it('renders with Current rentals without Purchased Items', () => {
    const { getByText, queryByText } = renderWithRedux(<CurrentFurniturePage />, stateWithoutPurchased);

    expect(getByText('Varick coffee table')).toBeTruthy();
    expect(queryByText('Purchased Couch')).toBeNull();
    expect(queryByText('Purchased')).toBeNull();
  });
});
