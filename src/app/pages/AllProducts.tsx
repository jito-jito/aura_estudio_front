import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import { handleMercadoLibreClick, handleWhatsAppClick, Product } from '../data/products';
import { fetchProducts, fetchCategories, Category } from '../services/api';

export function AllProducts() {
  const { cmsData } = useOutletContext<{ cmsData: any }>();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  console.log('cms data', cmsData)
  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error loading data for AllProducts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const displayCategories = categories.length > 1
    ? [{ id: 'all', slug: 'all', label: 'Todos' }, ...categories]
    : categories;

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
            Descubre toda nuestra colección de arte y decoración
          </p>
        </div>

        {/* Filtros por Categoría */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {displayCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className="px-6 py-3 transition-all duration-300 border-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                backgroundColor: selectedCategory === category.slug ? '#2D5F4C' : 'transparent',
                color: selectedCategory === category.slug ? '#FFFFFF' : '#2C2C2C',
                borderColor: selectedCategory === category.slug ? '#2D5F4C' : '#E5E5E5',
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
              images={product.images}
              title={product.title}
              price={product.price}
              onMercadoLibreClick={() => handleMercadoLibreClick(product.id, product.url_producto_en_tienda)}
              onWhatsAppClick={() => handleWhatsAppClick(product.title, cmsData.whatsapp)}
              soldOut={product.soldOut}
              productUrl={product.url_producto_en_tienda}
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
