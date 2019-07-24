import { ProductTier } from './product-tier';

export class Deployment {
  id?: number;
  name: string;
  productTier: ProductTier;
  integrator: string;
  currentPhaseId: number;
  dateCreated: Date;
  dateModified: Date;
  headerImage: string;
  printSignoff: boolean;
}
