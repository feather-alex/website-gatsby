import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import styled from "@emotion/styled";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";
import { BRAND } from "../ui/variables";
import HomepageHeader from "../components/homepage/HomepageHeader";

const HomepageSection = styled.section`
  background-color: ${BRAND.BACKGROUND};
`;

class RootIndex extends React.Component {
  render() {
    // const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const homepageData = get(this, "props.data.contentfulHomepage");

    console.log("homepage data: ", homepageData);
    return (
      <Layout>
        <Helmet
          title={homepageData.meta.title}
          description={homepageData.meta.description.description}
          imageUrl={homepageData.meta.imageUrl}
        />
        <HomepageSection>
          <HomepageHeader
            heroContent={homepageData.hero}
            isMobileBreakpoint={false}
          />
        </HomepageSection>
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
