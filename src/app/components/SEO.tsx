import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const defaultSEO = {
  title: 'Aura Estudio - Arte y Decoración para tu Hogar | Cuadros y Diseño Interior',
  description: 'Descubre arte único y decoración para tu hogar en Aura Estudio. Cuadros, láminas y diseños exclusivos con envíos a todo Chile. Transforma tus espacios con estilo.',
  url: 'https://aura-estudio.cl',
  image: 'https://aura-estudio.cl/assets/app_logo_color.jpeg',
};

export const SEO = ({ title, description, url, image }: SEOProps) => {
  const seo = {
    title: title || defaultSEO.title,
    description: description || defaultSEO.description,
    url: url || defaultSEO.url,
    image: image || defaultSEO.image,
  };

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};
