import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { TrustBar } from '../components/TrustBar';
import { HeroSkeleton, ProductGridSkeleton } from '../components/SkeletonLoader';
import { handleMercadoLibreClick, handleWhatsAppClick, Product } from '../data/products';
import { fetchProducts } from '../services/api';
import { ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // 1. Recibimos el context del Root
  const { cmsData } = useOutletContext<{ cmsData: any }>();

  // 2. Manejo de loading basado en si existe data
  // const isLoading = !cmsData;


  // Mapeo de datos del CMS (Strapi)
  // Nota: hero_contenido parece venir en formato de bloques o markdown según tu JSON
  const heroTitle = cmsData?.hero_contenido?.split('\n')[0].replace('## ', '') || "Transformá tus espacios con arte único";
  const heroSubtitle = cmsData?.hero_contenido?.split('\n')[1] || "Cuadros y decoración para el hogar que reflejan tu estilo";

  const heroRawContent = cmsData?.hero_contenido || "## Cargando...";
  const heroImage = cmsData?.hero_imagen?.url || "https://images.unsplash.com/..."; // URL por defecto
  const heroBtnText = cmsData?.hero_texto_boton || "Ver Colección";

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products for Home:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mostrar solo los primeros 6 productos en la home
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      {isLoading ? (
        <HeroSkeleton />
      ) : (
        <Hero
          image={heroImage}
          title={heroTitle}
          subtitle={heroSubtitle}
          content={heroRawContent}
          ctaText={heroBtnText}
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
                  onMercadoLibreClick={() => handleMercadoLibreClick(product.id, product.url_producto_en_tienda)}
                  onWhatsAppClick={() => handleWhatsAppClick(product.id, cmsData.whatsapp)}
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
