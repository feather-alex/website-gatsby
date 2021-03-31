import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import styles from "./blog.module.css";
import Layout from "../components/layout";
// import ArticlePreview from '../components/article-preview'

class LocationPageIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const locations = get(this, "props.data.allContentfulLocationPage.edges");

    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>Locations</div>
          <div className="wrapper">
            <h2 className="section-headline">Recent articles</h2>
            <ul className="article-list">
              {locations.map(({ node }) => {
                return <li key={node.slug}>{node.location}</li>;
              })}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}

export default LocationPageIndex;

export const pageQuery = graphql`
  query LocationPageIndexQuery {
    allContentfulLocationPage {
      edges {
        node {
          location
        }
      }
    }
  }
`;
