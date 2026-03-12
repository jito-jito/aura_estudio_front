import { Logo } from './Logo';
import { Link, useNavigate, useLocation } from 'react-router';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm shadow-sm" style={{ backgroundColor: '#ffffffa6' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo isDark={true} />
            <h1 className="text-xl md:text-2xl" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
              Aura estudio
            </h1>
          </Link>
          
          <nav className="flex gap-4 md:gap-8" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px' }}>
            <Link 
              to="/productos"
              className="transition-colors hover:text-[#2D5F4C]"
              style={{ color: '#2C2C2C' }}
            >
              Productos
            </Link>
            <button 
              onClick={() => scrollToSection('social')}
              className="transition-colors hover:text-[#2D5F4C]"
              style={{ color: '#2C2C2C' }}
            >
              Redes
            </button>
            <button 
              onClick={() => scrollToSection('footer')}
              className="transition-colors hover:text-[#2D5F4C]"
              style={{ color: '#2C2C2C' }}
            >
              Contacto
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
