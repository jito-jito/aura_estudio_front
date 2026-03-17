import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { SocialMedia } from '../components/SocialMedia';
import { useEffect, useState } from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';

export function Root() {
  // --- Lógica del MVP ---
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = (import.meta as any).env.VITE_API_TOKEN;
        const baseUrl = (import.meta as any).env.VITE_API_URL;

        const response = await fetch(`${baseUrl}/aura-estudio-landing?populate=*`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        setCmsData(result.data);
      } catch (error) {
        console.error("Error cargando data de Strapi:", error);
      }
    };

    fetchData();
  }, []);

  // Valores por defecto mientras carga para no romper el layout de Figma
  const empresaNombre = cmsData?.nombre_empresa || "Aura estudio";
  const empresaEmail = cmsData?.email || "info@auraestudio.com";
  const empresaWhatsapp = cmsData?.whatsapp || "+56935805401";
  const empresaIg = cmsData?.instagram || "@auraestudio";

  const socialItems = [
    {
      name: "Instagram",
      icon: Instagram,
      href: `${empresaIg}` || false,
      color: "#E4405F",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: cmsData?.facebook || false,
      color: "#1877F2",
    },
    {
      name: "TikTok",
      icon: () => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      href: cmsData?.tiktok || false,
      color: "#000000",
    },
    // {
    //   name: "Email",
    //   icon: Mail,
    //   href: `mailto:${empresaEmail}` || false,
    //   color: "#2D5F4C",
    // },
  ]

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header name={cmsData?.nombre_empresa} />

      {/* Spacer for fixed header */}
      <div className="header-spacer"></div>

      <Outlet context={{ cmsData }} />

      {/* Social Media */}
      <SocialMedia id="social" socialItems={socialItems} />

      {/* Footer */}
      <footer className="py-16 bg-[#2C2C2C] text-white" id="footer">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid g  rid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Aura estudio
              </h3>
              <p className="text-neutral-400" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                Decoración y arte para tu hogar, con envíos a todo el país.
              </p>
            </div>

            {/* <div>
              <h4 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Enlaces
              </h4>
              <ul className="space-y-2 text-neutral-400" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                <li><button className="hover:text-white transition-colors">Sobre nosotros</button></li>
                <li><button className="hover:text-white transition-colors">Política de envíos</button></li>
                <li><button className="hover:text-white transition-colors">Cambios y devoluciones</button></li>
                <li><button className="hover:text-white transition-colors">Preguntas frecuentes</button></li>
              </ul>
            </div> */}
            <div>

            </div>

            <div>
              <h4 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Contacto
              </h4>
              <ul className="space-y-2 text-neutral-400" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                <li>WhatsApp: {empresaWhatsapp}</li>
                <li>Email: {empresaEmail}</li>
                <li>Instagram: {empresaIg}</li>
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
