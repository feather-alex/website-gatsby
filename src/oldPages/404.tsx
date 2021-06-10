import FourOhFourCon from '../components/ErrorPage';
import React from 'react';
import Analytics from '../analytics/analytics';
import Layout from '../app/Layout';
import PAGES from '../analytics/pages';

class FourOhFour extends React.Component {
  componentDidMount() {
    Analytics.trackPage(PAGES.ERROR);
  }
  render() {
    const content =
      'Looks like something broke. Head back to our homepage or send' + ' us a chat message to see how we can help.';

    return (
      <Layout>
        <FourOhFourCon title="Page not found" content={content} />
      </Layout>
    );
  }
}

export default FourOhFour;
