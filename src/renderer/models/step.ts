import { ProductTier } from './product-tier';

export class Step {
  id: number;
  taskId: number;
  title: string;
  productTier: ProductTier;
  infoPath: string;
}
