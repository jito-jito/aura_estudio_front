export type ProductCategory = 'cuadros' | 'alfombras';

export interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  soldOut?: boolean;
  category: ProductCategory;
  url_producto_en_tienda?: string;
}

export const allProducts: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1764412009126-ea7812886ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHdhbGwlMjBhcnQlMjBwcmludHxlbnwxfHx8fDE3NzMwMTgyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Abstracción Moderna',
    price: '$12.500',
    category: 'cuadros'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1770146302359-424165946d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYm90YW5pY2FsJTIwcHJpbnR8ZW58MXx8fHwxNzczMDE4MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Botánico Minimal',
    price: '$9.800',
    category: 'cuadros'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1692530943891-589e88b780a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjB3YWxsJTIwYXJ0fGVufDF8fHx8MTc3Mjk1OTM3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Geometría Moderna',
    price: '$11.200',
    soldOut: true,
    category: 'cuadros'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1761635770077-69cccad8069c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25vY2hyb21lJTIwcGhvdG9ncmFwaHklMjBwcmludHxlbnwxfHx8fDE3NzMwMTgyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Fotografía Monocromática',
    price: '$13.900',
    category: 'cuadros'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1687714598440-f40a7dded6dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBhcnQlMjBwcmludHxlbnwxfHx8fDE3NzMwMTgyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Paisaje Contemporáneo',
    price: '$10.500',
    category: 'cuadros'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1717769165971-c81dfab13a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhYnN0cmFjdCUyMHBhaW50aW5nfGVufDF8fHx8MTc3Mjk2NjIzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Pintura Abstracta',
    price: '$14.500',
    category: 'cuadros'
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1560681956-623ecc1abc0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbGluZSUyMGFydCUyMHByaW50fGVufDF8fHx8MTc3MzAxODIwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Arte Lineal Minimalista',
    price: '$8.900',
    category: 'cuadros'
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1718641745451-5341f3d59d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBwaG90b2dyYXBoeSUyMHdhbGwlMjBhcnR8ZW58MXx8fHwxNzczMDE4MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Naturaleza Urbana',
    price: '$12.000',
    category: 'cuadros'
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1764412009126-ea7812886ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHdhbGwlMjBhcnQlMjBwcmludHxlbnwxfHx8fDE3NzMwMTgyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Composición Moderna',
    price: '$11.800',
    category: 'cuadros'
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1601082096597-81455f512d14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBydWd8ZW58MXx8fHwxNzczMjcxMjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Alfombra Minimalista Gris',
    price: '$45.000',
    category: 'alfombras'
  },
  {
    id: '11',
    image: 'https://images.unsplash.com/photo-1631466882094-d4af58ef7025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hvJTIwcnVnfGVufDF8fHx8MTc3MzI3MTI5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Alfombra Boho Beige',
    price: '$38.500',
    category: 'alfombras'
  },
  {
    id: '12',
    image: 'https://images.unsplash.com/photo-1646551723537-cc3b9a840862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBjYXJwZXR8ZW58MXx8fHwxNzczMjcxMjkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Alfombra Geométrica Moderna',
    price: '$52.000',
    category: 'alfombras'
  },
  {
    id: '13',
    image: 'https://images.unsplash.com/photo-1583264739275-656ff57a087f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXV0cmFsJTIwcnVnfGVufDF8fHx8MTc3MzI3MTI5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Alfombra Texturizada Natural',
    price: '$42.000',
    category: 'alfombras'
  },
  {
    id: '14',
    image: 'https://images.unsplash.com/photo-1765802536365-e2267a489a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBydWd8ZW58MXx8fHwxNzczMjcxMjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Alfombra Contemporánea',
    price: '$48.500',
    category: 'alfombras'
  },
  {
    id: '15',
    image: 'https://images.unsplash.com/photo-1745311924749-7e0c89a20ce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2FycGV0fGVufDF8fHx8MTc3MzI3MTI5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Alfombra Minimalista Clara',
    price: '$55.000',
    category: 'alfombras'
  }
];

export const handleMercadoLibreClick = (productId: string, url_producto_en_tienda?: string) => {
  console.log('Mercado Libre click for product:', productId, url_producto_en_tienda);

  if (url_producto_en_tienda) {
    window.open(url_producto_en_tienda, '_blank');
  } else {
    // Fallback if no URL
    console.log('No URL provided for Mercado Libre');
  }
};

export const handleWhatsAppClick = (productId: string, phoneNumber: string) => {
  console.log('WhatsApp click for product:', productId, phoneNumber);
  // In a real app, this would open WhatsApp with a pre-filled message
  // open whatsapp link
  window.open(`https://wa.me/${phoneNumber}?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${productId}`, '_blank');
};