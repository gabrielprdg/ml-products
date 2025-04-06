// src/infra/mercado-livre/mercado-livre.service.ts
import { FailedToFetchProduct } from '@application/use-cases/errors/failed-to-fetch-product';
import { FailedToSearchProducts } from '@application/use-cases/errors/failed-to-search-products';
import { Injectable } from '@nestjs/common';
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
          Authorization: `Bearer ${process.env.ML_ACCESS_TOKEN}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new FailedToFetchProduct()
    }
  }

  async findByTerm(query: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/products/search`, {
        headers: {
          Authorization: `Bearer ${process.env.ML_ACCESS_TOKEN}`,
        },
        params: {
          site_id: this.siteId,
          q: query,
        },
      });
      return response.data.results;
    } catch (error) {
      throw new FailedToSearchProducts()
    }
  }
}
