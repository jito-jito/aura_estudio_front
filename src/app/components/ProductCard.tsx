import { ShoppingCart, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  soldOut?: boolean;
  onMercadoLibreClick: () => void;
  onWhatsAppClick: () => void;
}

export function ProductCard({ image, title, price, soldOut = false, onMercadoLibreClick, onWhatsAppClick }: ProductCardProps) {
  return (
    <div className="group relative bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="aspect-[3/4] overflow-hidden bg-neutral-100 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
        
        <div className="space-y-3">
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
            Consultar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}