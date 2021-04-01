import { createClient } from 'contentful';

// Initializes the Contentful client that allows us to request our data from
// their Content Delivery API & Preview API
export const contentfulClient = createClient({
  space: `${process.env.CONTENTFUL_SPACE}`,
  accessToken: `${process.env.CONTENTFUL_TOKEN}`,
  environment: 'master',
  host: `${process.env.REACT_APP_FEATHER_ENV === 'production' ? 'cdn.contentful.com' : 'preview.contentful.com'}`
});
