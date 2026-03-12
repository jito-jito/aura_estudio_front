import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { SocialMedia } from '../components/SocialMedia';

export function Root() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-20"></div>
      
      <Outlet />
      
      {/* Social Media */}
      <SocialMedia id="social" />

      {/* Footer */}
      <footer className="py-16 bg-[#2C2C2C] text-white" id="footer">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Aura estudio
              </h3>
              <p className="text-neutral-400" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                Decoración y arte para tu hogar, con envíos a todo el país.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Enlaces
              </h4>
              <ul className="space-y-2 text-neutral-400" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                <li><button className="hover:text-white transition-colors">Sobre nosotros</button></li>
                <li><button className="hover:text-white transition-colors">Política de envíos</button></li>
                <li><button className="hover:text-white transition-colors">Cambios y devoluciones</button></li>
                <li><button className="hover:text-white transition-colors">Preguntas frecuentes</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Contacto
              </h4>
              <ul className="space-y-2 text-neutral-400" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                <li>WhatsApp: +54 9 11 1234-5678</li>
                <li>Email: info@auraestudio.com</li>
                <li>Instagram: @auraestudio</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-neutral-700 text-center text-neutral-500" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            <p>© 2026 Aura estudio. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
