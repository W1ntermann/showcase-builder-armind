import { Helmet } from "react-helmet-async";
import { SEOData } from "@/utils/seo";

interface SEOHeadProps {
  seoData: SEOData;
}

const SEOHead = ({ seoData }: SEOHeadProps) => {
  // Функція для гарантованого HTTPS та www в URL
  const ensureCanonicalUrl = (url: string): string => {
    if (!url) return 'https://www.armind.com.ua/';
    
    // Видаляємо http:// або https://
    let cleanUrl = url
      .replace(/^https?:\/\//, '')
      .replace(/^\/\//, '');
    
    // Видаляємо www, щоб потім додати в стандартному форматі
    if (cleanUrl.startsWith('www.')) {
      cleanUrl = cleanUrl.substring(4);
    }
    
    // Якщо це просто домен без шляху
    if (cleanUrl === 'armind.com.ua') {
      return 'https://www.armind.com.ua/';
    }
    
    // Додаємо www та https
    return `https://www.armind.com.ua${cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`}`;
  };

  const canonicalUrl = ensureCanonicalUrl(seoData.canonical);
  const ogImageUrl = seoData.ogImage 
    ? ensureCanonicalUrl(seoData.ogImage)
    : 'https://www.armind.com.ua/og-image.png';
  
  const ogTitle = seoData.ogTitle || seoData.title;
  const ogDescription = seoData.ogDescription || seoData.description;

  return (
    <Helmet>
      {/* Основні мета-теги */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      
      {/* Keywords */}
      {seoData.keywords && (
        <meta name="keywords" content={seoData.keywords} />
      )}
      
      {/* КРИТИЧНО: Канонічний тег для Google */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph мета-теги */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Армада Індастрі" />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content="uk_UA" />
      <meta property="og:image:alt" content={ogTitle} />
      
      {/* Robots мета-теги */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Viewport та charset */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Армада Індастрі",
          "url": "https://www.armind.com.ua/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.armind.com.ua/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
      
      {/* Structured Data - Organization (тільки для головної сторінки) */}
      {(seoData.canonical === 'https://armind.com.ua/' || 
        seoData.canonical === 'https://www.armind.com.ua/' ||
        seoData.canonical === '/') && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Армада Індастрі",
            "alternateName": "Армінд",
            "url": "https://www.armind.com.ua/",
            "logo": "https://www.armind.com.ua/logo.png",
            "description": "Професійна лазерна обробка металу в Одесі: різка, зварювання, фарбування",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "вул. Миколи Боровського, 28",
              "addressLocality": "Одеса",
              "addressCountry": "UA"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+380-93-423-61-39",
              "contactType": "customer service",
              "email": "armindind@gmail.com",
              "availableLanguage": ["Ukrainian", "Russian"]
            },
            "sameAs": []
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;