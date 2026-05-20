export interface Product {
  id: number;
  sku: string;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand?: string;
  discountPercentage?: number;
}
