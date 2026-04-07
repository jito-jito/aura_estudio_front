import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import { handleMercadoLibreClick, Product } from '../data/products';
import { fetchPresaleProducts } from '../services/api';

// Custom WhatsApp handler for presale products
const handleWhatsAppClickPresale = (productName: string, phoneNumber: string) => {
  const presaleMessage = `Hola, estoy interesado en el producto en preventa: ${productName}`;
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(presaleMessage)}`, '_blank');
};

import { SEO } from '../components/SEO';

export function Presale() {
  const { cmsData } = useOutletContext<{ cmsData: any }>();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [contactButtonText, setContactButtonText] = useState('Contactanos');
  const [contactNumber, setContactNumber] = useState('+56935805401');
  const [shippingTime, setShippingTime] = useState('');


  useEffect(() => {
    async function loadData() {
      try {
        const presaleData = await fetchPresaleProducts();
        setProducts(presaleData.products);
        setContactButtonText(presaleData.contactButtonText);
        setContactNumber(presaleData.contactNumber);
        setShippingTime(presaleData.shippingTime);
      } catch (error) {
        console.error('Error loading presale data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <>
        <SEO
          title="Preventa Exclusiva | Aura Estudio"
          description="Asegura tus piezas de arte y decoración antes que nadie con nuestra preventa exclusiva."
        />
        <ProductGridSkeleton />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Preventa Exclusiva | Aura Estudio"
        description="Asegura tus piezas de arte y decoración antes que nadie con nuestra preventa exclusiva."
      />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
              Preventa
            </h1>
            <p className="text-lg text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              Descubre nuestros productos en preventa exclusivos
            </p>
          </div>

          {/* Productos en Preventa */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="relative">
                {/* Etiqueta de Preventa */}
                <div className="absolute top-4 left-4 z-10 bg-[#2D5F4C] text-white px-3 py-1 text-sm font-medium rounded-md">
                  PREVENTA
                </div>
                <ProductCard
                  image={product.image}
                  images={product.images}
                  title={product.title}
                  price={product.price}
                  onMercadoLibreClick={() => handleMercadoLibreClick(product.id, product.url_producto_en_tienda)}
                  onWhatsAppClick={() => handleWhatsAppClickPresale(product.title, contactNumber)}
                  soldOut={product.soldOut}
                  customButtonText={contactButtonText}
                  hideMercadoLibreButton={true}
                  shippingTime={shippingTime}
                  productUrl={product.url_producto_en_tienda}
                  frameTypes={product.frameTypes}
                />
              </div>
            ))}
          </div>

          {/* Mensaje si no hay productos en preventa */}
          {products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-neutral-500" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                No hay productos en preventa disponibles en este momento
              </p>
            </div>
          )}

          {/* Contador de productos */}
          {products.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                Mostrando {products.length} {products.length === 1 ? 'producto' : 'productos'} en preventa
              </p>
            </div>
          )}

          {/* Información adicional sobre preventa */}
          {products.length > 0 && (
            <div className="mt-16 p-8 bg-neutral-50 rounded-lg">
              <h3 className="text-2xl mb-4 text-center" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                ¿Qué es una preventa?
              </h3>
              <p className="text-center text-neutral-600 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                Los productos en preventa están disponibles para reservar antes de su lanzamiento oficial.
                Contáctanos para asegurar tu producto.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}