import { Injectable } from '@nestjs/common';
import { UserDoesNotExists } from './errors/user-does-not-exists';

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
      throw new UserDoesNotExists();
    }


    return { products }
  }
}