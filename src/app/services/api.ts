/// <reference types="vite/client" />
import { Product, ProductCategory } from '../data/products';

export interface Category {
  id: string; // documentId
  slug: string;
  label: string; // nombre
}

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

// Local interface for Strapi product structure (simplified)
interface StrapiProduct {
  id: number;
  documentId: string;
  nombre: string;
  precio: number;
  agotado: boolean | null;
  stock: number;
  categoria: {
    slug: string;
  };
  imagenes: Array<{
    url: string;
  }>;
  url_producto_en_tienda?: string;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/productos?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const json = await response.json();
    const data: StrapiProduct[] = json.data;

    if (!data) return [];

    return data.map((item) => {
      // Format price to something like "$54.990"
      const formattedPrice = '$' + item.precio.toLocaleString('es-AR');
      
      return {
        id: item.documentId,
        title: item.nombre,
        price: formattedPrice,
        image: item.imagenes && item.imagenes.length > 0 ? item.imagenes[0].url : item.url_producto_en_tienda || '',
        images: item.imagenes ? item.imagenes.map(img => img.url) : [],
        category: (item.categoria?.slug || 'cuadros') as ProductCategory,
        soldOut: item.agotado === true || item.stock === 0,
        url_producto_en_tienda: item.url_producto_en_tienda,
      };
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

interface StrapiCategory {
  id: number;
  documentId: string;
  slug: string;
  nombre: string;
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/categories?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const json = await response.json();
    const data: StrapiCategory[] = json.data;

    if (!data) return [];

    return data.map((item) => ({
      id: item.documentId,
      slug: item.slug,
      label: item.nombre,
    }));
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

interface PresaleData {
  products: Product[];
  contactButtonText: string;
  contactNumber: string;
  shippingTime: string;
}

interface StrapiPresaleResponse {
  data: {
    id: number;
    documentId: string;
    texto_boton_contacto: string;
    numero_de_contacto: string;
    texto_tiempo_de_despacho: string;
    productos: StrapiProduct[];
  };
}

export async function fetchPresaleProducts(): Promise<PresaleData> {
  try {
    const response = await fetch(`${API_URL}/productos-en-preventa?populate[productos][populate]=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching presale products: ${response.statusText}`);
    }

    const json: StrapiPresaleResponse = await response.json();
    const data = json.data;

    if (!data) return { products: [], contactButtonText: 'Contactanos', contactNumber: '+56935805401', shippingTime: '' };

    const products = data.productos ? data.productos.map((item) => {
      // Format price to something like "$54.990"
      const formattedPrice = '$' + item.precio.toLocaleString('es-AR');
      
      return {
        id: item.documentId,
        title: item.nombre,
        price: formattedPrice,
        image: item.imagenes && item.imagenes.length > 0 ? item.imagenes[0].url : item.url_producto_en_tienda || '',
        images: item.imagenes ? item.imagenes.map(img => img.url) : [],
        category: (item.categoria?.slug || 'cuadros') as ProductCategory,
        soldOut: item.agotado === true || item.stock === 0,
        url_producto_en_tienda: item.url_producto_en_tienda,
      };
    }) : [];

    return {
      products,
      contactButtonText: data.texto_boton_contacto || 'Contactanos',
      contactNumber: data.numero_de_contacto || '+56935805401',
      shippingTime: data.texto_tiempo_de_despacho || '',
    };
  } catch (error) {
    console.error('Failed to fetch presale products:', error);
    return { products: [], contactButtonText: 'Contactanos', contactNumber: '+56935805401', shippingTime: '' };
  }
}

