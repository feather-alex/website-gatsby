/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import { BREAKPOINTS } from '../../../ui/variables';

interface Props {
  placeholder: string;
  onSubmit: (input: string) => void;
  color: string;
  type?: string;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
}

interface State {
  inputValue: string;
}

class BannerInputField extends React.Component<Props, State> {
  readonly state = { inputValue: '' };

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  handleOnSubmit = () => {
    const { inputValue } = this.state;

    this.props.onSubmit(inputValue);
  };

  handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      // enter key is pressed
      this.handleOnSubmit();
    }
  };

  render() {
    const { inputValue } = this.state;
    const { placeholder, color, type, inputMode } = this.props;

    return (
      <div
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          border: 1px solid ${color};

          @media ${BREAKPOINTS.DESKTOP} {
            margin-left: 23px;
          }
        `}
      >
        <input
          css={css`
            position: relative;
            padding: 7px 15px;
            flex: 1;
            outline: 0;
            font-size: 16px;
            background: transparent;
            color: ${color};

            ::placeholder {
              color: ${color};
            }
          `}
          placeholder={placeholder}
          type={type || 'email'}
          inputMode={inputMode || 'email'}
          value={inputValue}
          onChange={this.handleOnChange}
          onKeyUp={this.handleKeyUp}
          spellCheck={false}
        />
        <div
          css={css`
            border-left: 1px solid ${color};
            padding: 7px 15px;
            font-weight: 500;
            cursor: pointer;
          `}
          tabIndex={0}
          role="button"
          onClick={this.handleOnSubmit}
        >
          <Paragraph2 color={color}>Submit</Paragraph2>
        </div>
      </div>
    );
  }
}

export default BannerInputField;
