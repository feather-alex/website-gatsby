import React from 'react';
import { connect } from 'react-redux';
import LandingSplash from './LandingSplash';
import LandingReviews from './LandingReviews';
import TakeTheQuiz from '../../ui/footers/TakeTheQuizPreFooter';
import {
  getIsMobileBreakpoint,
  getWindowHeight,
  getWindowWidth
} from '../../app/store/dimensions/dimensions.selectors';
import { State as GlobalState } from '../../types/ReduxState';
import MobileDecisions from './MobileDecisions';
import { toggleOverlay, ToggleOverlay } from '../../app/store/overlay/overlay.actions';
import Footer from '../../ui/footers/Footer';
import { handleWindowResize, HandleWindowResize } from '../../app/store/dimensions/dimensions.actions';
import Analytics from '../../analytics/analytics';
import PAGES from '../../analytics/pages';

interface Props {
  toggleOverlay: ToggleOverlay;
  handleWindowResize: HandleWindowResize;
  isMobileBreakpoint: boolean;
  windowHeight: number;
  windowWidth: number;
}

class PromoLandingPage extends React.Component<Props> {
  componentDidMount() {
    Analytics.trackPage(PAGES.LANDING_PAGE);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = (event: Event) => {
    const windowObject = event.currentTarget as Window;

    this.props.handleWindowResize(windowObject.innerHeight, windowObject.innerWidth);
  };

  render() {
    const { isMobileBreakpoint } = this.props;
    return (
      <>
        <LandingSplash isMobile={isMobileBreakpoint} />

        {isMobileBreakpoint && <MobileDecisions />}

        <LandingReviews />

        <TakeTheQuiz isMobileBreakpoint={isMobileBreakpoint} />

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  windowHeight: getWindowHeight(state),
  windowWidth: getWindowWidth(state)
});

const mapDispatchToProps = {
  toggleOverlay,
  handleWindowResize
};

export default connect(mapStateToProps, mapDispatchToProps)(PromoLandingPage);
