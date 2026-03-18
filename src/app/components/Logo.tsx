interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export function Logo({ className = "", isDark = false }: LogoProps) {
  const primaryColor = isDark ? "#2C2C2C" : "#FFFFFF";
  const accentColor = "#2D5F4C";

  return (
    // <svg 
    //   width="48" 
    //   height="48" 
    //   viewBox="0 0 48 48" 
    //   fill="none" 
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={className}
    // >
    //   {/* Outer circle */}
    //   <circle 
    //     cx="24" 
    //     cy="24" 
    //     r="22" 
    //     stroke={primaryColor} 
    //     strokeWidth="1.5" 
    //     fill="none"
    //   />

    //   {/* Inner decorative elements - abstract minimalist design */}
    //   <path 
    //     d="M24 12 L24 20" 
    //     stroke={accentColor} 
    //     strokeWidth="2" 
    //     strokeLinecap="round"
    //   />

    //   {/* Abstract arc */}
    //   <path 
    //     d="M14 24 Q24 18, 34 24" 
    //     stroke={primaryColor} 
    //     strokeWidth="1.5" 
    //     fill="none"
    //     strokeLinecap="round"
    //   />

    //   {/* Center accent dot */}
    //   <circle 
    //     cx="24" 
    //     cy="28" 
    //     r="3" 
    //     fill={accentColor}
    //   />

    //   {/* Lower decorative line */}
    //   <path 
    //     d="M16 34 L32 34" 
    //     stroke={primaryColor} 
    //     strokeWidth="1.5" 
    //     strokeLinecap="round"
    //   />

    //   {/* Small accent circles on sides */}
    //   <circle cx="12" cy="24" r="1.5" fill={accentColor} opacity="0.6" />
    //   <circle cx="36" cy="24" r="1.5" fill={accentColor} opacity="0.6" />
    // </svg>
    <img
      src="/assets/app_logo.png" alt="Aura Estudio Logo" className={className}
      style={{
        width: '30px',
        height: '30px'
      }}
    />
  );
}
