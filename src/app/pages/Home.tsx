import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { TrustBar } from '../components/TrustBar';
import { HeroSkeleton, ProductGridSkeleton } from '../components/SkeletonLoader';
import { allProducts, handleMercadoLibreClick, handleWhatsAppClick } from '../data/products';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular carga de datos desde CMS
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mostrar solo los primeros 6 productos en la home
  const featuredProducts = allProducts.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      {isLoading ? (
        <HeroSkeleton />
      ) : (
        <Hero
          image="https://images.unsplash.com/photo-1764010533326-c6916f3d6252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwZnJhbWVkJTIwd2FsbCUyMGFydHxlbnwxfHx8fDE3NzMwMTgyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          title="Transformá tus espacios con arte único"
          subtitle="Cuadros y decoración para el hogar que reflejan tu estilo"
          ctaText="Ver Colección"
          onCtaClick={() => scrollToSection('catalog')}
        />
      )}

      {/* Product Catalog */}
      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <section id="catalog" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                Productos Destacados
              </h2>
              <p className="text-lg text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                Piezas cuidadosamente seleccionadas para cada ambiente
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  onMercadoLibreClick={() => handleMercadoLibreClick(product.id)}
                  onWhatsAppClick={() => handleWhatsAppClick(product.id)}
                  soldOut={product.soldOut}
                />
              ))}
            </div>

            {/* Ver Más Button */}
            <div className="mt-16 text-center">
              <button
                onClick={() => navigate('/productos')}
                className="inline-flex items-center gap-3 px-8 py-4 text-white transition-all duration-300 hover:opacity-90 group"
                style={{ 
                  backgroundColor: '#2D5F4C',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px'
                }}
              >
                Ver Más Productos
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Trust Bar */}
      <TrustBar />
    </>
  );
}
