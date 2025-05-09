import { Controller, Get, Param } from '@nestjs/common';
import { FindProductById } from '@application/use-cases/find-product-by-id';
import { FindProductsByTerm } from '@application/use-cases/find-products-by-term';
import { ProductByIdViewModel, ProductsByTermViewModel } from '../../view-model/product-view-model';

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
    return products.map(ProductsByTermViewModel.toHTTP);
  }

  @Get('from/:id')
  async findById(@Param('id') productId: string) {
    const { product } = await this.findProductsById.execute({ productId })

    return ProductByIdViewModel.toHTTP(product);
  }

}