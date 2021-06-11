/** @jsx jsx */
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { addParameters, AddParameters } from '../reducers/tracking-parameters';
import { getSearchParams } from '../utils/url-parser';
import FreshChatIcon from '../components/FreshChatIcon';
import Navbar from './navbar/Navbar';
import Footer from '../ui/footers/Footer';
import { BRAND } from '../ui/variables';
import { State as GlobalState } from '../types/ReduxState';
import { getBodyMarginTop } from './store/dimensions/dimensions.selectors';

const validUtmKeys = ['gclid', 'ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'irclickid'];

interface Props extends RouteComponentProps {
  bodyMarginTop: number;
  addParameters: AddParameters;
}

class Layout extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const searchParams = getSearchParams(this.props.location.search, 'string', validUtmKeys);

    this.props.addParameters(searchParams);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { bodyMarginTop, children } = this.props;

    return (
      <div
        css={css`
          background-color: ${BRAND.BACKGROUND};
        `}
      >
        <Navbar />
        <div
          css={css`
            margin-top: ${bodyMarginTop}px;
            transition: margin-top 400ms linear;
          `}
        >
          {children}
        </div>
        <Footer />
        <FreshChatIcon />
      </div>
    );
  }
}

const mapState = (state: GlobalState) => ({
  bodyMarginTop: getBodyMarginTop(state)
});

const mapDispatch = {
  addParameters
};

export default compose(withRouter, connect(mapState, mapDispatch))(Layout);
