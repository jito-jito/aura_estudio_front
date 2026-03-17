import ReactMarkdown from "react-markdown";

interface HeroProps {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
  content: string;
}

export function Hero({ image, title, subtitle, ctaText, onCtaClick, content }: HeroProps) {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Elegant living room with framed wall art"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white">
          {/* <h1 className="text-6xl lg:text-7xl mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h1>
          <p className="text-xl lg:text-2xl mb-10 text-white/90" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            {subtitle}
          </p> */}

          <ReactMarkdown
            components={{
              // Mapeamos los tags de Markdown a tus clases de Figma
              h1: ({ node, ...props }) => <h1 className="hero-title text-6xl lg:text-7xl mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }} {...props} />,
              h2: ({ node, ...props }) => <h2 className="hero-title text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }} {...props} />,
              p: ({ node, ...props }) => <p className="text-xl lg:text-2xl mb-10 text-white/90" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }} {...props} />
            }}
          >
            {content}
          </ReactMarkdown>
          <button
            onClick={onCtaClick}
            className="px-10 py-4 text-lg transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              backgroundColor: '#2D5F4C',
              color: 'white',
              borderRadius: '2px'
            }}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
