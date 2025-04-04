import { Injectable } from '@nestjs/common';
import { ProductDoesNotExists } from './errors/product-not-found';

interface FindProductByIdDataRequest {
  productId: string
}
@Injectable()
export class FindProductById {
  constructor(
    private readonly ml,
  ) { }

  async execute(productData: FindProductByIdDataRequest) {
    const { productId } = productData

    const product = await this.ml.findById(productId)
    if (!product) {
      throw new ProductDoesNotExists();
    }


    return { product }
  }
}