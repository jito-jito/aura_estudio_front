import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import { handleMercadoLibreClick, handleWhatsAppClick, Product } from '../data/products';
import { fetchProducts, fetchCategories, Category, PaginationMeta } from '../services/api';

export function AllProducts() {
  const { cmsData } = useOutletContext<{ cmsData: any }>();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);

  console.log('cms data', cmsData)
  
  // Cargar categorías una sola vez
  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  // Cargar productos cuando cambie la categoría o página
  useEffect(() => {
    async function loadProducts() {
      setLoadingProducts(true);
      try {
        const response = await fetchProducts(currentPage, 9, selectedCategory);
        setProducts(response.products);
        setPaginationMeta(response.meta.pagination);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoadingProducts(false);
      }
    }

    if (!isLoading) {
      loadProducts();
    }
  }, [selectedCategory, currentPage, isLoading]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayCategories = categories.length > 1
    ? [{ id: 'all', slug: 'all', label: 'Todos' }, ...categories]
    : categories;

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  const renderPagination = () => {
    if (!paginationMeta || paginationMeta.pageCount <= 1) return null;

    const { page, pageCount } = paginationMeta;
    const pages = [];
    
    // Show max 5 page numbers
    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(pageCount, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-12">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform hover:scale-105 active:scale-95 hover:bg-neutral-50"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            backgroundColor: 'transparent',
            color: '#2C2C2C',
            borderColor: '#E5E5E5',
          }}
        >
          ←
        </button>
        
        {/* Page numbers */}
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className="px-4 py-2 border-2 transition-all duration-300 min-w-[40px] cursor-pointer transform hover:scale-105 active:scale-95"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              backgroundColor: pageNumber === page ? '#2D5F4C' : 'transparent',
              color: pageNumber === page ? '#FFFFFF' : '#2C2C2C',
              borderColor: pageNumber === page ? '#2D5F4C' : '#E5E5E5',
            }}
          >
            {pageNumber}
          </button>
        ))}
        
        {/* Next button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pageCount}
          className="px-4 py-2 border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform hover:scale-105 active:scale-95 hover:bg-neutral-50"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            backgroundColor: 'transparent',
            color: '#2C2C2C',
            borderColor: '#E5E5E5',
          }}
        >
          →
        </button>
      </div>
    );
  };

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
                onClick={() => handleCategoryChange(category.slug)}
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
          {loadingProducts ? (
            <ProductGridSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
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
                    frameTypes={product.frameTypes}
                  />
                ))}
              </div>

              {/* Mensaje si no hay productos */}
              {products.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-neutral-500" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                    No hay productos disponibles en esta categoría
                  </p>
                </div>
              )}

              {/* Paginación */}
              {renderPagination()}

              {/* Contador de productos */}
              {paginationMeta && (
                <div className="mt-8 text-center">
                  <p className="text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                    Mostrando {products.length} de {paginationMeta.total} {paginationMeta.total === 1 ? 'producto' : 'productos'}
                    {paginationMeta.pageCount > 1 && (
                      <span className="ml-2">
                        (Página {paginationMeta.page} de {paginationMeta.pageCount})
                      </span>
                    )}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
  );
}
