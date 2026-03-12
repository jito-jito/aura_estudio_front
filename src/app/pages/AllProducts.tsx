import { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import { allProducts, handleMercadoLibreClick, handleWhatsAppClick, ProductCategory } from '../data/products';

export function AllProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  useEffect(() => {
    // Simular carga de datos desde CMS
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  const categories = [
    { id: 'all' as const, label: 'Todos' },
    { id: 'cuadros' as const, label: 'Cuadros' },
    { id: 'alfombras' as const, label: 'Alfombras' },
  ];

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
            Todos los Productos
          </h1>
          <p className="text-lg text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Descubrí toda nuestra colección de arte y decoración
          </p>
        </div>

        {/* Filtros por Categoría */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="px-6 py-3 transition-all duration-300 border-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                backgroundColor: selectedCategory === category.id ? '#2D5F4C' : 'transparent',
                color: selectedCategory === category.id ? '#FFFFFF' : '#2C2C2C',
                borderColor: selectedCategory === category.id ? '#2D5F4C' : '#E5E5E5',
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
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

        {/* Mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-500" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              No hay productos disponibles en esta categoría
            </p>
          </div>
        )}

        {/* Contador de productos */}
        <div className="mt-12 text-center">
          <p className="text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>
      </div>
    </section>
  );
}
