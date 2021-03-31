const Promise = require("bluebird");
// const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  // const { createPage } = actions;

  return new Promise((resolve, reject) => {
    // const locationPage = path.resolve("./src/templates/location-page.js");
    resolve(
      graphql(
        `
          {
            allContentfulLocationPage {
              edges {
                node {
                  location
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        console.log("location page content: ", result.data);

        // const locationPages = result.data.allContentfulLocationPage.edges;
        // locationPages.forEach((page) => {
        //   createPage({
        //     path: `/location/${page.node.slug}/`,
        //     component: locationPage,
        //     context: {
        //       slug: post.node.slug,
        //     },
        //   });
        // });
      })
    );
  });
};
