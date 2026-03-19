import { ShoppingCart, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  image: string;
  images?: string[];
  title: string;
  price: string;
  soldOut?: boolean;
  onMercadoLibreClick: () => void;
  onWhatsAppClick: () => void;
  customButtonText?: string;
  hideMercadoLibreButton?: boolean;
  shippingTime?: string;
  productUrl?: string;
}

export function ProductCard({ image, images, title, price, soldOut = false, onMercadoLibreClick, onWhatsAppClick, customButtonText, hideMercadoLibreButton = false, shippingTime, productUrl }: ProductCardProps) {
  const hasMultipleImages = images && images.length > 1;

  return (
    <div className="group relative bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full">
      <div className="aspect-[3/4] overflow-hidden bg-neutral-100 relative group/img cursor-pointer">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${hasMultipleImages ? 'group-hover/img:opacity-0 absolute inset-0 z-10' : ''}`}
        />
        {hasMultipleImages && (
          <img
            src={images[1]}
            alt={`${title} vista alternativa`}
            className="w-full h-full object-cover transition-all duration-700 scale-100 opacity-0 group-hover/img:opacity-100 group-hover/img:scale-105 absolute inset-0 z-0"
          />
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span 
              className="text-white text-2xl px-6 py-3 border-2 border-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              AGOTADO
            </span>
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
        
        <div className="space-y-3">
          {!hideMercadoLibreButton && productUrl && (
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
            {customButtonText || 'Consultar por WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  );
}