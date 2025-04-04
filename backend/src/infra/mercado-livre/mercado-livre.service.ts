// src/infra/mercado-livre/mercado-livre.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MercadoLivreService {
  private readonly baseUrl = process.env.BASE_URL;
  private readonly siteId = process.env.SITE_ID || 'MLB';

  constructor(
  ) { }

  async getProductById(productId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${process.env.ACESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new HttpException('Erro ao buscar produto por ID', HttpStatus.BAD_REQUEST);
    }
  }

  async searchProducts(query: string, token: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/products/search`, {
        headers: {
          Authorization: `Bearer ${process.env.ACESS_TOKEN}`,
        },
        params: {
          site_id: this.siteId,
          q: query,
        },
      });
      return response.data;
    } catch (error) {
      throw new HttpException('Erro ao buscar produtos por termo', HttpStatus.BAD_REQUEST);
    }
  }
}
