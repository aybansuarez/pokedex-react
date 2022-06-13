import { Helmet } from "react-helmet-async";

function Seo({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="robots" content="noindex" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@aybansuarez" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default Seo;
