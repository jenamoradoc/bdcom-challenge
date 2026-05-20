import { Product } from '../entities/Product';
import { Category } from '../entities/Category';

export interface IProductRepository {
  search(query: string, limit?: number): Promise<Product[]>;
  getById(id: number): Promise<Product>;
  getBySkuFromList(sku: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
}
