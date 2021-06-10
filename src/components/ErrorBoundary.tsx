/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import Report from '../errorReporter';
import Button from '../ui/buttons/Button';
import { history } from '../store/history';

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<{}, State> {
  public readonly state: Readonly<State> = {
    hasError: false
  };

  componentDidCatch(error: Error) {
    // Forward received error to Error Reporter
    Report.captureException(error);

    this.setState({
      hasError: true
    });
  }

  goHomeAndRefresh = () => {
    history.push('/');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page body">
          <div className="text">
            <h1>Sorry, something went wrong.</h1>
            <div role="button" tabIndex={0} className="refresh" onClick={() => window.location.reload()}>
              Click here to refresh the page
            </div>
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                margin-top: 30px;
              `}
            >
              <Button onClick={this.goHomeAndRefresh}>Go to homepage</Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
