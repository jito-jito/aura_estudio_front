import { useState } from 'react';
import { Logo } from './Logo';
import { Link, useNavigate, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  name?: string;
}

export function Header({ name }: HeaderProps) {
  const appName = name || "Aura estudio";

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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm shadow-sm" style={{ backgroundColor: '#ffffffa6' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 header-mobile-wrapper">
        {/* Desktop & Mobile Top Bar Container */}
        <div className="flex items-center justify-between max-[480px]:flex-col max-[480px]:gap-4 relative">

          <Link to="/" className="flex flex-col items-center gap-2 max-[480px]:py-2 sm:flex-row sm:gap-3 z-10">
            <Logo isDark={true} />
            <h1 className="text-xl md:text-2xl" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
              {name}
            </h1>
          </Link>

          {/* Hamburger Menu Toggle (Mobile Only) */}
          <button
            className="hidden max-[480px]:block absolute top-1/2 right-0 -translate-y-1/2 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} color="#2C2C2C" /> : <Menu size={24} color="#2C2C2C" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="flex gap-4 md:gap-8 max-[480px]:hidden" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px' }}>
            <Link
              to="/productos"
              className="app-link transition-colors hover:text-[#2D5F4C]"
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

        {/* Mobile Dropdown Navigation */}
        <div
          className={`overflow-hidden transition-all duration-300 max-[480px]:block hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="flex flex-col items-center gap-4 pb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '16px' }}>
            <Link
              to="/productos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="transition-colors hover:text-[#2D5F4C]"
              style={{ color: '#2C2C2C' }}
            >
              Productos
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection('social');
              }}
              className="transition-colors hover:text-[#2D5F4C]"
              style={{ color: '#2C2C2C' }}
            >
              Redes
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToSection('footer');
              }}
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
