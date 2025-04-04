import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { MercadoLivreService } from './infra/mercado-livre/mercado-livre.service';
import { HttpModule } from './presentation/http/http.module';

@Module({
  imports: [HttpModule, InfraModule],
})
export class AppModule { }
