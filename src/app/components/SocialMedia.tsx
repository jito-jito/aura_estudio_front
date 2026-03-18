import { Instagram, Facebook, Mail } from "lucide-react";

interface SocialMediaProps {
  id?: string;
  socialItems?: {
    name: string;
    icon: React.ComponentType<{ size: number; className?: string }>;
    href: string | false;
    color: string;
  }[];
}

const defaultSocialItems = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "#E4405F",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "#1877F2",
    },
    {
      name: "TikTok",
      icon: ({ className, size }: any) => (
        <svg
          width={size || 24}
          height={size || 24}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      href: "#",
      color: "#000000",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:info@auraestudio.com",
      color: "#2D5F4C",
    },
  ];

export function SocialMedia({ id, socialItems }: SocialMediaProps = {}) {
  const socialLinks = socialItems || defaultSocialItems;

  return (
    <section id={id} className="py-20 bg-[#F8F6F3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2
          className="text-4xl mb-4"
          style={{
            fontFamily: "Playfair Display, serif",
            color: "#2C2C2C",
          }}
        >
          Seguinos en nuestras redes
        </h2>
        <p
          className="text-lg text-neutral-600 mb-10"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
          }}
        >
          Inspiración diaria y novedades exclusivas
        </p>

        <div className="flex items-center justify-center gap-6">
          {socialLinks.filter(link => link.href).map((link, index) => (
            <a
              key={index}
              href={link.href as string}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:bg-[#2D5F4C]">
                <link.icon
                  size={28}
                  className={`text-[${link.color}] transition-colors duration-300 group-hover:text-white`}
                />
              </div>
              <span
                className="text-sm"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  color: "#2C2C2C",
                }}
              >
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}