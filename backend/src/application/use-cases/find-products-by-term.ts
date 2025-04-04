import { Injectable } from '@nestjs/common';
import { ProductDoesNotExists } from './errors/product-not-found';

interface FindProductsDataRequest {
  term: string
}
@Injectable()
export class FindProductsByTerm {
  constructor(
    private readonly ml,
  ) { }

  async execute(productData: FindProductsDataRequest) {
    const { term } = productData

    const products = await this.ml.findByTerm(term)
    if (!products) {
      throw new ProductDoesNotExists();
    }


    return { products }
  }
}