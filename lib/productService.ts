import axios from "axios";

const API_URL = "http://localhost:5139/api/products"; // URL del backend

export interface ProductVariant {
  id: number;
  modelId: number;
  storage: string;
  ram: string;
  color: string;
  price: number;
  stock: number;
  garantia: string;
  condicion: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  category: string;
  imageUrl: string;
  variants: ProductVariant[];
  price: number;
  specs: string[];
  image: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};
