/** @jsx jsx */
import { jsx } from '@emotion/core';
import { fireEvent } from '@testing-library/react';
import SSNIssueModal from './SSNIssueModal';
import renderWithRedux from '../../../utils/test-utils';
import { State as GlobalState } from '../../../types/ReduxState';
import { initialState as initialReducerState } from '../../../store/reducer';
import { noop } from '../../../utils/ui-helpers';

describe('<SSNIssueModal />', () => {
  const mockOnDepositSubmission = () => {
    noop;
  };

  it('calls the function to close the no SSN modal', () => {
    const noSSNState: GlobalState = {
      ...initialReducerState,
      app: {
        ...initialReducerState.app,
        overlay: {
          ...initialReducerState.app.overlay,
          isNoSSNOverlayOpen: true
        }
      }
    };
    const { getByText, store } = renderWithRedux(
      <SSNIssueModal onDepositSubmission={mockOnDepositSubmission} />,
      noSSNState
    );

    const button = getByText("No thanks, I'll try again later");

    fireEvent.click(button);

    expect(store.getState().app.overlay.isNoSSNOverlayOpen).toBeFalsy();
  });

  it('calls the function to close the failed SSN modal', () => {
    const noSSNState: GlobalState = {
      ...initialReducerState,
      app: {
        ...initialReducerState.app,
        overlay: {
          ...initialReducerState.app.overlay,
          isFailedSSNOverlayOpen: true
        }
      }
    };
    const { getByText, store } = renderWithRedux(
      <SSNIssueModal onDepositSubmission={mockOnDepositSubmission} />,
      noSSNState
    );

    const button = getByText("No thanks, I'll try again later");

    fireEvent.click(button);

    expect(store.getState().app.overlay.isFailedSSNOverlayOpen).toBeFalsy();
  });
});
