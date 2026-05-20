import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

export class GetProductBySkuUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(sku: string): Promise<Product | null> {
    return this.repository.getBySkuFromList(sku);
  }
}
