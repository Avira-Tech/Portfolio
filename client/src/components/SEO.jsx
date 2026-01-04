import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteTitle = 'Avira Tech - Freelance Web Development & Digital Solutions';
  const siteDescription = 'Avira Tech provides high-quality web development, mobile apps, and digital solutions for modern businesses. Expert in React, Node.js, and Cloud services.';
  const siteKeywords = 'web development, software agency, react, node.js, freelance, digital solutions, mobile apps, seo';
  const siteUrl = 'https://aviratech.com';
  const siteImage = '/logo.png';

  return (
    <Helmet>
      <title>{title ? `${title} | Avira Tech` : siteTitle}</title>
      <meta name="description" content={description || siteDescription} />
      <meta name="keywords" content={keywords || siteKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:image" content={image || siteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || siteUrl} />
      <meta property="twitter:title" content={title || siteTitle} />
      <meta property="twitter:description" content={description || siteDescription} />
      <meta property="twitter:image" content={image || siteImage} />
    </Helmet>
  );
};

export default SEO;
