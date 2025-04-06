import { Injectable } from '@nestjs/common';
import { ProductDoesNotExists } from './errors/product-not-found';
import { MercadoLivreService } from '@infra/mercado-livre/mercado-livre.service';

interface FindProductByIdDataRequest {
  productId: string
}
@Injectable()
export class FindProductById {
  constructor(
    private readonly ml: MercadoLivreService,
  ) { }

  async execute(productData: FindProductByIdDataRequest) {
    const { productId } = productData

    const product = await this.ml.getProductById(productId)
    if (!product) {
      throw new ProductDoesNotExists();
    }


    return { product }
  }
}