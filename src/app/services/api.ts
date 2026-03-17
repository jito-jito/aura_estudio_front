/// <reference types="vite/client" />
import { Product, ProductCategory } from '../data/products';

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
        image: item.imagenes && item.imagenes.length > 0 ? item.imagenes[0].url : '',
        category: (item.categoria?.slug || 'cuadros') as ProductCategory,
        soldOut: item.agotado === true || item.stock === 0,
      };
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}
