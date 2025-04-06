import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { ProductsController } from './controllers/product/products.controller';
import { FindProductById } from '@application/use-cases/find-product-by-id';
import { FindProductsByTerm } from '@application/use-cases/find-products-by-term';
import { MercadoLivreService } from 'src/infra/mercado-livre/mercado-livre.service';


@Module({
  imports: [InfraModule],
  controllers: [ProductsController],
  providers: [
    FindProductById,
    FindProductsByTerm,
    MercadoLivreService
  ],
})
export class HttpModule { }
