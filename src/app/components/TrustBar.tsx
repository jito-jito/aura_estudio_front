import { Truck, CreditCard } from 'lucide-react';

export function TrustBar() {
  return (
    <section className="py-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#2D5F4C]/10 flex items-center justify-center">
              <Truck size={28} className="text-[#2D5F4C]" />
            </div>
            <div>
              <h3 className="text-xl mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                Envíos a todo el país
              </h3>
              <p className="text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                Recibí tu pedido en la puerta de tu casa
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#2D5F4C]/10 flex items-center justify-center">
              <CreditCard size={28} className="text-[#2D5F4C]" />
            </div>
            <div>
              <h3 className="text-xl mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                Cuotas sin interés
              </h3>
              <p className="text-neutral-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                Hasta 12 cuotas en Mercado Libre
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
