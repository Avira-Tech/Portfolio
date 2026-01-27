import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  noIndex = false,
  type = 'website'
}) => {
  const siteTitle = 'Avira Tech - Professional Web Development Services | Portfolio & Business Websites';
  const siteDescription = 'Avira Tech is a top-rated web development agency. Expert in creating stunning portfolios, business websites, and professional websites. Specializing in React, Node.js, and full-stack development. Get a high-ranking, SEO-optimized website today!';
  const siteKeywords = 'web development, website development, portfolio, portfolio website, business website, professional website, react development, node.js development, full stack developer, freelance web developer, digital solutions, mobile apps, seo optimization, aviratech, avira tech, web design, ecommerce development, responsive website, modern website, custom website, website builder, landing page design, website redesign, web agency, it company, software development, app development, wordpress development, nextjs development, expressjs, mongodb, typescript, javascript development, frontend developer, backend developer, website maintenance, website hosting, cheap website, affordable website, best website developer, top web developer, professional web design, corporate website, startup website, small business website, ecommerce website, portfolio for designers, portfolio for developers, creative portfolio, personal portfolio, agency portfolio, photography portfolio, architecture portfolio, design portfolio';
  const siteUrl = 'https://aviratech.co.in';
  const siteImage = 'https://aviratech.co.in/og-image.jpg';

  // Generate full structured data for rich search results
  const generateStructuredData = () => {
    return (
      <>
        {/* WebSite Schema with Search Action */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Avira Tech",
            "url": siteUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${siteUrl}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            },
            "description": siteDescription,
            "keywords": siteKeywords,
            "inLanguage": "en-US",
            "about": {
              "@type": "Thing",
              "name": "Web Development",
              "description": "Professional web development services"
            }
          }, null, 2)}
        </script>
        
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            "name": "Avira Tech",
            "url": siteUrl,
            "logo": `${siteUrl}/logo.png`,
            "image": `${siteUrl}/logo.png`,
            "description": "Professional web development agency specializing in portfolios, business websites, and full-stack development using React, Node.js, and modern technologies.",
            "foundingDate": "2023",
            "founder": {
              "@type": "Person",
              "name": "Avira Tech Team"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN",
              "addressRegion": "India"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "English",
              "email": "contact@aviratech.co.in",
              "telephone": "+91-XXXXXXXXXX"
            },
            "sameAs": [
              "https://www.facebook.com/aviratech",
              "https://www.twitter.com/aviratech",
              "https://www.linkedin.com/company/aviratech",
              "https://www.instagram.com/aviratech",
              "https://github.com/aviratech"
            ],
            "areaServed": {
              "@type": "Place",
              "name": "Worldwide"
            },
            "priceRange": "$$$",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
            "currenciesAccepted": "USD, INR"
          }, null, 2)}
        </script>

        {/* LocalBusiness / WebDesignAgency Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebDesignAgency",
            "@id": `${siteUrl}/#business`,
            "name": "Avira Tech",
            "url": siteUrl,
            "telephone": "+91-XXXXXXXXXX",
            "email": "contact@aviratech.co.in",
            "description": "Professional web design and development services for businesses. Specializing in portfolios, business websites, e-commerce sites, and custom web applications.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN",
              "addressLocality": "India",
              "addressRegion": "India"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "20.5937",
              "longitude": "78.9629"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            "priceRange": "$$$",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "currenciesAccepted": "USD, INR",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Web Development Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Custom web development using React, Node.js, and modern frameworks"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Portfolio Design",
                    "description": "Professional portfolio website design"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Business Website",
                    "description": "Complete business website solutions"
                  }
                }
              ]
            }
          }, null, 2)}
        </script>

        {/* Services ItemList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "Service",
                "position": 1,
                "name": "Web Development",
                "description": "Custom web development using React, Node.js, and modern frameworks for high-performance websites and applications. Expert in building responsive, fast-loading websites.",
                "provider": { "@type": "Organization", "name": "Avira Tech" },
                "url": `${siteUrl}/services/web-development`
              },
              {
                "@type": "Service",
                "position": 2,
                "name": "Portfolio Website Design",
                "description": "Professional portfolio website design that showcases your work and attracts potential clients. Perfect for designers, developers, photographers, and creative professionals.",
                "provider": { "@type": "Organization", "name": "Avira Tech" },
                "url": `${siteUrl}/services/portfolio-design`
              },
              {
                "@type": "Service",
                "position": 3,
                "name": "Business Website Development",
                "description": "Complete business website solutions including design, development, and SEO optimization. Establish your online presence with a professional business website.",
                "provider": { "@type": "Organization", "name": "Avira Tech" },
                "url": `${siteUrl}/services/business-website`
              },
              {
                "@type": "Service",
                "position": 4,
                "name": "E-commerce Development",
                "description": "Full-featured e-commerce websites with secure payment integration, inventory management, and user-friendly shopping experience.",
                "provider": { "@type": "Organization", "name": "Avira Tech" },
                "url": `${siteUrl}/services/ecommerce-development`
              },
              {
                "@type": "Service",
                "position": 5,
                "name": "SEO Optimization Services",
                "description": "Complete SEO services to improve your website's ranking on search engines like Google, Bing, and Yahoo. Get more organic traffic and leads.",
                "provider": { "@type": "Organization", "name": "Avira Tech" },
                "url": `${siteUrl}/services/seo-optimization`
              },
              {
                "@type": "Service",
                "position": 6,
                "name": "Mobile App Development",
                "description": "Native and cross-platform mobile application development for iOS and Android. Build engaging mobile experiences for your users.",
                "provider": { "@type": "Organization", "name": "Avira Tech" },
                "url": `${siteUrl}/services/mobile-app-development`
              },
              {
                "@type": "Service",
                "position": 7,
                "name": "Website Maintenance",
                "description": "Ongoing website maintenance, updates, and support services to keep your website running smoothly and securely.",
                "provider": { "@type": "Organization", "name": "Avira Tech" },
                "url": `${siteUrl}/services/website-maintenance`
              },
              {
                "@type": "Service",
                "position": 8,
                "name": "Custom Web Application Development",
                "description": "Tailor-made web applications built with your specific business requirements using React, Node.js, and cloud technologies.",
                "provider": { "@type": "Organization", "name": "Avira Tech" },
                "url": `${siteUrl}/services/web-application`
              }
            ]
          }, null, 2)}
        </script>

        {/* Review/AggregateRating Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            "name": "Avira Tech",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "50",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Satisfied Client" },
                "datePublished": "2024-01-15",
                "reviewBody": "Excellent web development services! Avira Tech created a stunning portfolio website for my business. Highly recommended!",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Business Owner" },
                "datePublished": "2024-01-10",
                "reviewBody": "Professional team delivered our business website on time with great SEO results. Our online presence improved significantly!",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              }
            ]
          }, null, 2)}
        </script>

        {/* FAQ Schema for Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services does Avira Tech offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Avira Tech offers professional web development services including portfolio websites, business websites, e-commerce development, SEO optimization, mobile app development, and custom web applications using React, Node.js, and modern technologies."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to build a website?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The timeline varies based on project complexity. A simple portfolio website typically takes 1-2 weeks, while a complex business or e-commerce website may take 4-8 weeks. We provide detailed timelines during the project planning phase."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide SEO services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We offer comprehensive SEO services including on-page optimization, technical SEO, keyword research, content optimization, and link building to help your website rank higher in search engine results."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a professional website cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our pricing varies based on your requirements. We offer affordable packages starting from ₹15,000 for simple portfolio websites to custom solutions for larger projects. Contact us for a personalized quote."
                }
              },
              {
                "@type": "Question",
                "name": "Do you create responsive websites?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! All our websites are fully responsive and mobile-friendly, ensuring they look great and function perfectly on all devices including desktops, tablets, and smartphones."
                }
              },
              {
                "@type": "Question",
                "name": "What technologies do you use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We use modern technologies including React, Node.js, Express.js, MongoDB, TypeScript, and various other frameworks and tools to build high-performance, scalable web applications."
                }
              }
            ]
          }, null, 2)}
        </script>
      </>
    );
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title ? `${title} | Avira Tech` : siteTitle}</title>
      <meta name="description" content={description || siteDescription} />
      <meta name="keywords" content={keywords || siteKeywords} />
      <meta name="author" content="Avira Tech" />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={url || siteUrl} />
      
      {/* Geographic and Language Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="language" content="English" />
      <meta name="distribution" content="Global" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:image" content={image || siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || 'Avira Tech - Web Development Services'} />
      <meta property="og:site_name" content="Avira Tech" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@aviratech" />
      <meta name="twitter:creator" content="@aviratech" />
      <meta name="twitter:url" content={url || siteUrl} />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || siteDescription} />
      <meta name="twitter:image" content={image || siteImage} />
      <meta name="twitter:image:alt" content={title || 'Avira Tech Web Development Services'} />

      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      
      {/* Generate all structured data */}
      {generateStructuredData()}
    </Helmet>
  );
};

export default SEO;
