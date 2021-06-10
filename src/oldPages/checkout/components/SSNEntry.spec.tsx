/** @jsx jsx */
import { jsx } from '@emotion/core';
import { fireEvent, act } from '@testing-library/react';
import SSNEntry from './SSNEntry';
import { toggleOverlay } from '../../../app/store/overlay/overlay.actions';
import { Overlays } from '../../../app/store/overlay/overlay.types';
import createRootReducer, { initialState as fullInitialState } from '../../../store/reducer';
import renderWithRedux, { createMockStoreAndHistoryWithState } from '../../../utils/test-utils';
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { initialState } from '../store/checkout.reducer';
import { updateSSNInfo } from '../store/checkout.actions';
import { resetErrorsStateValues } from '../store/checkout.actions';

jest.mock('../../../assets/icons/ui-elements/tooltip.svg', () => () => <div />);

describe('<SSNEntry />', () => {
  it('renders correct messaging without ssn not found errors', () => {
    const { store, history } = createMockStoreAndHistoryWithState(fullInitialState);
    store.dispatch = jest.fn();

    const { getByText } = renderWithRedux(
      <ConnectedRouter history={history}>
        <SSNEntry />
      </ConnectedRouter>,
      undefined,
      store
    );

    expect(
      getByText('Unfortunately, we were unable to find your credit score using your provided name and billing address.')
    ).toBeTruthy();
  });

  it('renders correct messaging with ssn not valid error when error comes from the server-side validation', async () => {
    const { store, history } = createMockStoreAndHistoryWithState({
      ...fullInitialState,
      checkout: {
        ...initialState,
        isSSNNotValid: true
      }
    });
    store.dispatch = jest.fn();

    const { findByTestId, getByPlaceholderText } = renderWithRedux(
      <ConnectedRouter history={history}>
        <SSNEntry />
      </ConnectedRouter>,
      undefined,
      store
    );

    fireEvent.blur(getByPlaceholderText('Enter your SSN'));

    const validationErrors = await findByTestId(`errors-ssn`);
    expect(validationErrors.innerHTML).toBe(
      'Invalid SSN Format. Please make sure your number is accurate and contains 9 digits'
    );
  });

  it('renders correct error message for ssn when error comes from client-side validation and SSN has a value', async () => {
    const mockSSN = '00067';
    const { store, history } = createMockStoreAndHistoryWithState(fullInitialState);
    store.dispatch = jest.fn();

    const { getByPlaceholderText, findByTestId } = renderWithRedux(
      <ConnectedRouter history={history}>
        <SSNEntry />
      </ConnectedRouter>,
      undefined,
      store
    );

    fireEvent.blur(getByPlaceholderText('Enter your SSN'));
    fireEvent.change(getByPlaceholderText('Enter your SSN'), { target: { value: mockSSN } });

    const validationErrors = await findByTestId(`errors-ssn`);
    expect(validationErrors.innerHTML).toBe(
      'Invalid SSN Format. Please make sure your number is accurate and contains 9 digits'
    );
  });

  it('renders correct error message for ssn when error comes from client-side validation and SSN is empty', async () => {
    const store = createStore(createRootReducer(createMemoryHistory({ keyLength: 0 })), fullInitialState);
    store.dispatch = jest.fn();

    const { getByPlaceholderText, findByTestId } = renderWithRedux(
      <ConnectedRouter history={createMemoryHistory()}>
        <SSNEntry />
      </ConnectedRouter>,
      undefined,
      store
    );

    fireEvent.blur(getByPlaceholderText('Enter your SSN'));

    const validationErrors = await findByTestId(`errors-ssn`);
    expect(validationErrors.innerHTML).toBe(
      'Invalid SSN Format. Please make sure your number is accurate and contains 9 digits'
    );
  });

  it('renders the correct error message for first name when error comes from client-side validation and first name has more than 250 characters', async () => {
    const mockFirstName =
      'a value that is supposed to be longer than two hundred and fifty characters long so I will just keep typing out characters until I reach that limit. turns out it is a lot of characters, but using the word characters really helps in reaching that length';
    const { store, history } = createMockStoreAndHistoryWithState(fullInitialState);
    store.dispatch = jest.fn();

    const { getByPlaceholderText, findByTestId } = renderWithRedux(
      <ConnectedRouter history={history}>
        <SSNEntry />
      </ConnectedRouter>,
      undefined,
      store
    );

    fireEvent.blur(getByPlaceholderText('Enter your legal first name'));
    fireEvent.change(getByPlaceholderText('Enter your legal first name'), { target: { value: mockFirstName } });

    const validationErrors = await findByTestId(`errors-legalFirstName`);
    expect(validationErrors.innerHTML).toBe('Legal first name is required and must be less than 250 characters');
  });

  it('renders the correct error message for first name when error comes from client-side validation and first name is empty', async () => {
    const { store, history } = createMockStoreAndHistoryWithState(fullInitialState);
    store.dispatch = jest.fn();

    const { getByPlaceholderText, findByTestId } = renderWithRedux(
      <ConnectedRouter history={history}>
        <SSNEntry />
      </ConnectedRouter>,
      undefined,
      store
    );

    // Blur legal first name input
    fireEvent.blur(getByPlaceholderText('Enter your legal first name'));

    const validationErrors = await findByTestId(`errors-legalFirstName`);
    expect(validationErrors.innerHTML).toBe('Legal first name is required and must be less than 250 characters');
  });

  it('renders the correct error message for last name when error comes from client-side validation and last name has a value', async () => {
    const mockLastName =
      'a value that is supposed to be longer than two hundred and fifty characters long so I will just keep typing out characters until I reach that limit. turns out it is a lot of characters, but using the word characters really helps in reaching that length';
    const { store, history } = createMockStoreAndHistoryWithState(fullInitialState);
    store.dispatch = jest.fn();

    const { getByPlaceholderText, findByTestId } = renderWithRedux(
      <ConnectedRouter history={history}>
        <SSNEntry />
      </ConnectedRouter>,
      undefined,
      store
    );

    fireEvent.blur(getByPlaceholderText('Enter your legal last name'));
    fireEvent.change(getByPlaceholderText('Enter your legal last name'), { target: { value: mockLastName } });

    const validationErrors = await findByTestId(`errors-legalLastName`);
    expect(validationErrors.innerHTML).toBe('Legal last name is required and must be less than 250 characters');
  });

  it('renders the correct error message for last name when error comes from client-side validation and last name is empty', async () => {
    const { store, history } = createMockStoreAndHistoryWithState(fullInitialState);
    store.dispatch = jest.fn();

    const { getByPlaceholderText, findByTestId } = renderWithRedux(
      <ConnectedRouter history={history}>
        <SSNEntry />
      </ConnectedRouter>,
      undefined,
      store
    );

    fireEvent.blur(getByPlaceholderText('Enter your legal last name'));

    const validationErrors = await findByTestId(`errors-legalLastName`);
    expect(validationErrors.innerHTML).toBe('Legal last name is required and must be less than 250 characters');
  });

  it('updates on change correctly', async () => {
    const mockSSN = '012345678';
    const mockFirstName = 'foo';
    const mockLastName = 'bar';

    const { store, history } = createMockStoreAndHistoryWithState(fullInitialState);
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const { getByPlaceholderText } = renderWithRedux(
      <ConnectedRouter history={history}>
        <SSNEntry />
      </ConnectedRouter>,
      undefined,
      store
    );

    // The use of async/await quells a weird error around the use of 'act', not sure why  ¯\_(ツ)_/¯.
    await act(async () => {
      await fireEvent.change(getByPlaceholderText('Enter your SSN'), { target: { value: mockSSN } });
      await fireEvent.change(getByPlaceholderText('Enter your legal first name'), { target: { value: mockFirstName } });
      await fireEvent.change(getByPlaceholderText('Enter your legal last name'), { target: { value: mockLastName } });
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      updateSSNInfo({ ssn: mockSSN, legalFirstName: mockFirstName, legalLastName: mockLastName })
    );
  });

  it(`calls the function to open the ssn overlay when the customer doesn't have a SSN`, () => {
    const { store, history } = createMockStoreAndHistoryWithState(fullInitialState);
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const { getByText } = renderWithRedux(
      <ConnectedRouter history={history}>
        <SSNEntry />
      </ConnectedRouter>,
      undefined,
      store
    );

    const button = getByText('Learn more');

    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenCalledWith(resetErrorsStateValues());
    expect(mockDispatch).toHaveBeenCalledWith(toggleOverlay(Overlays.NoSSNOverlay, true));
  });
});
