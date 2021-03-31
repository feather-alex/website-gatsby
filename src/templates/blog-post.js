import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
// import Img from "gatsby-image";
import Layout from "../components/layout";

// import heroStyles from "../components/hero.module.css";

class LocationPageTemplate extends React.Component {
  render() {
    const location = get(this.props, "data.contentfulLocationPage");
    // const siteTitle = get(this.props, "data.site.siteMetadata.title");
    console.log("location: ", location);
    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={`${location.meta} | ${siteTitle}`} />
          {/* <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid}
            />
          </div> */}
          {/* <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: "block",
              }}
            >
              {post.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div> */}
        </div>
      </Layout>
    );
  }
}

export default LocationPageTemplate;

export const pageQuery = graphql`
  query LocationPageByLocation($location: String!) {
    contentfulLocationPage(location: { eq: $location }) {
      location
    }
  }
`;
