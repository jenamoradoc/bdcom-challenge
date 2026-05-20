import { DummyJsonProductRepository } from './DummyJsonProductRepository';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

export function getProductRepository(): IProductRepository {
  return new DummyJsonProductRepository();
}
