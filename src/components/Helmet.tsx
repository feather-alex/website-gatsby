import React from "react";
import { Helmet } from "react-helmet";

export interface Props {
  title: string;
  description: string;
  imageUrl?: string;
  product?: boolean;
  pageUrl?: string;
  brand?: string;
  availability?: string;
  price?: string;
  identifier?: string;
  script?: string;
  script2?: string;
}

class HelmetCon extends React.Component<Props> {
  render() {
    const defaultTitle = "Welcome to Furniture Freedom";
    const defaultImage =
      "https://img.livefeather.com/pages/homepage/feather-homepage-social.jpg?auto=compress";
    const defaultDescription = `${defaultTitle}. Get access to quality furniture at a low monthly price with the option to renew, swap, buy, or return it.`;

    const {
      title,
      description,
      imageUrl,
      product,
      pageUrl,
      brand,
      availability,
      price,
      identifier,
      script,
      script2,
    } = this.props;

    return (
      <Helmet
        defaultTitle={defaultTitle}
        titleTemplate="Feather | %s"
        defer={false}
      >
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          property="og:description"
          content={`${description || defaultDescription}`}
        />
        <meta
          property="og:title"
          content={`Feather | ${title || defaultTitle}`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image" content={imageUrl || defaultImage} />

        {script && <script src={script} />}
        {script2 && <script src={script2} />}

        {/* only show following tags on product or package details page */}
        {product && <meta property="og:url" content={pageUrl} />}
        {product && (
          <meta property="product:brand" content={brand || "Feather"} />
        )}
        {product && (
          <meta
            property="product:availability"
            content={availability || "in stock"}
          />
        )}
        {product && <meta property="product:condition" content="new" />}
        {product && <meta property="product:price:amount" content={price} />}
        {product && <meta property="product:price:currency" content="USD" />}
        {product && (
          <meta property="product:retailer_item_id" content={identifier} />
        )}
      </Helmet>
    );
  }
}

export default HelmetCon;
