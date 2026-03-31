import { ShoppingCart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  image: string;
  images?: string[];
  title: string;
  price: string;
  stock?: number;
  soldOut?: boolean;
  onMercadoLibreClick: () => void;
  onWhatsAppClick: () => void;
  customButtonText?: string;
  hideMercadoLibreButton?: boolean;
  shippingTime?: string;
  productUrl?: string;
  frameTypes?: string[];
}

export function ProductCard({ image, images, title, price, stock, soldOut = false, onMercadoLibreClick, onWhatsAppClick, customButtonText, hideMercadoLibreButton = false, shippingTime, productUrl, frameTypes }: ProductCardProps) {
  // Usar el array de images si está disponible, sino usar solo la imagen principal
  const allImages = images && images.length > 0 ? images : [image];
  const hasMultipleImages = allImages.length > 1;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Determinar si el producto está agotado
  const isOutOfStock = soldOut || (stock !== undefined && stock <= 0);
  
  // Estados para manejo de touch/swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchCurrent, setTouchCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (index: number) => {
    if (index === activeImageIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveImageIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleNextImage = () => {
    const nextIndex = (activeImageIndex + 1) % allImages.length;
    handleImageChange(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex = activeImageIndex === 0 ? allImages.length - 1 : activeImageIndex - 1;
    handleImageChange(prevIndex);
  };

  // Touch handlers para mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultipleImages) return;
    setTouchStart(e.touches[0].clientX);
    setTouchCurrent(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!hasMultipleImages || !isDragging) return;
    setTouchCurrent(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!hasMultipleImages || !isDragging) return;
    
    const diff = touchStart - touchCurrent;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swipe left - próxima imagen
        handleNextImage();
      } else {
        // Swipe right - imagen anterior
        handlePrevImage();
      }
    }
    
    setIsDragging(false);
    setTouchStart(0);
    setTouchCurrent(0);
  };

  const getFrameColor = (frameType: string) => {
    const colors: { [key: string]: string } = {
      'blanco': '#FFFFFF',
      'negro': '#000000',
      'madera': '#D2B48C'
    };
    return colors[frameType.toLowerCase()] || '#CCCCCC';
  };

  const getFrameName = (frameType: string) => {
    const names: { [key: string]: string } = {
      'blanco': 'Blanco',
      'negro': 'Negro',
      'madera': 'Madera'
    };
    return names[frameType.toLowerCase()] || frameType;
  };

  return (
    <div className="group relative bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full">
      <div 
        className="aspect-[3/4] overflow-hidden bg-neutral-100 relative group/img cursor-pointer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Contenedor del carousel */}
        <div 
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${activeImageIndex * (100 / allImages.length)}%)`,
            width: `${allImages.length * 100}%`
          }}
        >
          {allImages.map((imageUrl, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-full relative"
              style={{ 
                width: `${100 / allImages.length}%`
              }}
            >
              {/* Fondo difuminado de la imagen */}
              <div 
                className="product-background"
                style={{
                  backgroundImage: `url(${imageUrl})`
                }}
              />
              <img
                src={imageUrl}
                alt={`${title} ${index === 0 ? '' : `vista ${index + 1}`}`}
                className="product-img w-full h-full transition-all duration-500 group-hover:scale-105"
                draggable={false}
              />
            </div>
          ))}
        </div>
        
        {/* Botones de navegación de imágenes */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageChange(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-white/50 ${
                  index === activeImageIndex 
                    ? 'bg-white scale-110 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/80 hover:scale-105'
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
            <div 
              className="text-white text-2xl px-8 py-4 border-2 border-white backdrop-blur-sm"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                fontWeight: 400,
                letterSpacing: '0.1em'
              }}
            >
              AGOTADO
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
          {title}
        </h3>
        <p className="text-2xl mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#2D5F4C' }}>
          {price}
        </p>
        
        {shippingTime && (
          <div className="mb-4 p-3 bg-neutral-50 rounded-md">
            <p className="text-sm text-center text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              {shippingTime}
            </p>
          </div>
        )}
        
        {/* Marcos disponibles */}
        {frameTypes && frameTypes.length > 0 && (
          <div className="mb-6">
            <p className="text-sm mb-3 text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Marcos disponibles:
            </p>
            <div className="flex gap-3 items-center">
              {frameTypes.map((frameType, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-5 h-5 rounded-full border-2"
                    style={{
                      backgroundColor: getFrameColor(frameType),
                      borderColor: frameType.toLowerCase() === 'blanco' ? '#E5E5E5' : 'transparent',
                    }}
                  />
                  <span 
                    className="text-sm text-neutral-600"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    {getFrameName(frameType)}
                  </span>
                </div>
              ))}
            </div>
            <hr className="mt-4 border-neutral-200" />
          </div>
        )}
        
        <div className="space-y-3">
          {!hideMercadoLibreButton && productUrl && !isOutOfStock && (
            <button
              onClick={onMercadoLibreClick}
              className="w-full px-6 py-3 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                backgroundColor: '#2D5F4C',
                color: 'white',
                borderRadius: '2px',
                fontSize: '0.95rem'
              }}
            >
              <ShoppingCart size={18} />
              Comprar en Mercado Libre
            </button>
          )}
          
          <button
            onClick={onWhatsAppClick}
            className="w-full px-6 py-3 flex items-center justify-center gap-2 transition-all duration-300 hover:bg-neutral-50"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              backgroundColor: 'transparent',
              color: '#2D5F4C',
              border: '2px solid #2D5F4C',
              borderRadius: '2px',
              fontSize: '0.95rem'
            }}
          >
            <MessageCircle size={18} />
            {customButtonText || (isOutOfStock ? 'Consultar disponibilidad' : 'Consultar por WhatsApp')}
          </button>
        </div>
      </div>
    </div>
  );
}