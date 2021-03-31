import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";

class RootIndex extends React.Component {
  render() {
    // const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const homepageData = get(this, "props.data.contentfulHomepage");

    console.log("homepage data: ", homepageData);
    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={"Homepage"} />
          {/* {homepageData.map((data) => (
            <div>{data}</div>
          ))} */}
        </div>
      </Layout>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query HomePageQuery {
    contentfulHomepage(homepageSections: { elemMatch: { paragraph: {} } }) {
      meta {
        title
        description {
          description
        }
        imageUrl
      }
      hero {
        desktopImage {
          title
          description
          file {
            url
          }
        }
        mobileImage {
          title
          description
          file {
            url
          }
        }
        header1
        header2
        paragraph
        cta {
          label
          style
          url
          urlType
        }
      }
      shopByRoom {
        rooms {
          name
          url
          image {
            title
            description
            file {
              url
            }
          }
        }
      }
      textLockup {
        title
        body
      }
      homepageSections {
        header
        cta {
          label
          style
          url
          urlType
        }
        imageUrl
        imagePosition
        isVertical
        paragraph {
          paragraph
        }
      }
    }
  }
`;
