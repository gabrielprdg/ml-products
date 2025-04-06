import axios from "axios";
import { MercadoLivreService } from "./mercado-livre.service";
import { FailedToFetchProduct } from "@application/use-cases/errors/failed-to-fetch-product";
import { FailedToSearchProducts } from "@application/use-cases/errors/failed-to-search-products";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MercadoLivreService', () => {
  let service: MercadoLivreService;

  beforeEach(() => {
    service = new MercadoLivreService();
  });

  describe('getProductById', () => {
    it('should return product data on success', async () => {
      const mockProduct = { id: '123', title: 'Produto Teste' };
      mockedAxios.get.mockResolvedValueOnce({ data: mockProduct });

      const result = await service.getProductById('123');

      expect(result).toEqual(mockProduct);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.BASE_URL}/products/123`,
        expect.any(Object)
      );
    });

    it('should throw FailedToFetchProduct on error', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Request failed'));

      await expect(service.getProductById('123')).rejects.toThrow(FailedToFetchProduct);
    });
  });

  describe('findByTerm', () => {
    it('should return product results on success', async () => {
      const mockResults = [{ id: '123', title: 'Nike' }];
      mockedAxios.get.mockResolvedValueOnce({ data: { results: mockResults } });

      const result = await service.findByTerm('nike');

      expect(result).toEqual(mockResults);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.BASE_URL}/products/search`,
        expect.objectContaining({
          headers: expect.any(Object),
          params: { site_id: 'MLB', q: 'nike' }
        })
      );
    });

    it('should throw FailedToSearchProducts on error', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Search error'));

      await expect(service.findByTerm('nike')).rejects.toThrow(FailedToSearchProducts);
    });
  });
});
