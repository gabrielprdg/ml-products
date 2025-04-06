import { FindProductById } from './find-product-by-id';
import { ProductDoesNotExists } from './errors/product-not-found';
import { MercadoLivreService } from '@infra/mercado-livre/mercado-livre.service';

describe('FindProductById Use Case', () => {
  let findProductById: FindProductById;
  let mercadoLivreService: jest.Mocked<MercadoLivreService>;

  beforeEach(() => {
    mercadoLivreService = {
      getProductById: jest.fn()
    } as any;

    findProductById = new FindProductById(mercadoLivreService);
  });

  it('deve retornar o produto quando encontrado', async () => {
    const mockProduct = { id: '123', name: 'Produto Teste' };
    mercadoLivreService.getProductById.mockResolvedValueOnce(mockProduct);

    const result = await findProductById.execute({ productId: '123' });

    expect(result).toEqual({ product: mockProduct });
    expect(mercadoLivreService.getProductById).toHaveBeenCalledWith('123');
  });

  it('deve lançar ProductDoesNotExists quando o produto não for encontrado', async () => {
    mercadoLivreService.getProductById.mockResolvedValueOnce(null);

    await expect(
      findProductById.execute({ productId: 'inexistente' }),
    ).rejects.toThrow(ProductDoesNotExists);

    expect(mercadoLivreService.getProductById).toHaveBeenCalledWith('inexistente');
  });
});
