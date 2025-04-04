import { Module } from '@nestjs/common';
import { MercadoLivreService } from './mercado-livre/mercado-livre.service';

// basic infra module
@Module({
  providers: [
    MercadoLivreService
  ],
})

export class InfraModule { }
