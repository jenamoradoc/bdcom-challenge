import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { Category } from '../../domain/entities/Category';
import { BASE_URL } from '../../lib/constants';

interface DummyJsonProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface DummyJsonCategory {
  slug: string;
  name: string;
  url: string;
}

export class DummyJsonProductRepository implements IProductRepository {
  async search(query: string, limit: number = 20): Promise<Product[]> {
    if (!query) {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);
      const data: DummyJsonProductsResponse = await response.json();
      return data.products;
    }

    // Full-text search first
    const textResponse = await fetch(
      `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      { cache: 'no-store' }
    );
    if (!textResponse.ok) throw new Error(`Failed to fetch products: ${textResponse.statusText}`);
    const textData: DummyJsonProductsResponse = await textResponse.json();

    if (textData.products.length > 0) {
      return textData.products;
    }

    // Fallback: treat query as a category slug
    const categoryResponse = await fetch(
      `${BASE_URL}/products/category/${encodeURIComponent(query)}?limit=${limit}`,
      { cache: 'no-store' }
    );
    if (!categoryResponse.ok) return [];
    const categoryData: DummyJsonProductsResponse = await categoryResponse.json();
    return categoryData.products ?? [];
  }

  async getById(id: number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}: ${response.statusText}`);
    }

    return response.json();
  }

  async getBySkuFromList(sku: string): Promise<Product | null> {
    // DummyJSON text search doesn't support SKU lookups reliably,
    // so we fetch all IDs+SKUs (lightweight) to find the matching ID,
    // then fetch the full product.
    const indexResponse = await fetch(
      `${BASE_URL}/products?limit=194&select=id,sku`,
      { cache: 'no-store' }
    );

    if (!indexResponse.ok) {
      throw new Error(`Failed to fetch product index: ${indexResponse.statusText}`);
    }

    const index: { products: { id: number; sku: string }[] } = await indexResponse.json();
    const entry = index.products.find((p) => p.sku === sku);

    if (!entry) return null;

    return this.getById(entry.id);
  }

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}/products/categories`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data: DummyJsonCategory[] = await response.json();
    return data;
  }
}
