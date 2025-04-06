import { Body, Controller, Get, Param } from '@nestjs/common';
import { FindProductById } from 'src/application/use-cases/find-product-by-id';
import { FindProductsByTerm } from 'src/application/use-cases/find-products-by-term';
import { ProductViewModel } from '../../view-model/product-view-model';

@Controller('product')
export class ProductsController {
  constructor(
    private readonly findProductsByTerm: FindProductsByTerm,
    private readonly findProductsById: FindProductById,
  ) { }

  @Get('search/:term')
  async find(@Param('term') term: string) {
    const { products } = await this.findProductsByTerm.execute({
      term
    });
    return products.map(ProductViewModel.toHTTP);
  }

  @Get('from/:id')
  async findById(@Param('id') productId: string) {
    const { product } = await this.findProductsById.execute({ productId })

    return ProductViewModel.toHTTP(product);
  }

}