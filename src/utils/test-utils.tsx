import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import createRootReducer, { initialState as reducerInitialState } from '../store/reducer';

const renderWithRedux = (
  component: React.ReactNode,
  initialState = reducerInitialState,
  store = createStore(createRootReducer(createMemoryHistory({ keyLength: 0 })), initialState)
) => {
  return { ...render(<Provider store={store}>{component}</Provider>), store };
};

export default renderWithRedux;
