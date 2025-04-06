import { MercadoLivreService } from "@infra/mercado-livre/mercado-livre.service";
import { FindProductsByTerm } from "./find-products-by-term";
import { ProductDoesNotExists } from "./errors/product-not-found";


describe('FindProductsByTerm', () => {
  let findProductsByTerm: FindProductsByTerm;
  let mercadoLivreService: MercadoLivreService;

  beforeEach(() => {
    mercadoLivreService = {
      findByTerm: jest.fn(),
    } as unknown as MercadoLivreService;

    findProductsByTerm = new FindProductsByTerm(mercadoLivreService);
  });

  it('deve retornar os produtos quando o termo existir', async () => {
    const mockProducts = [
      { id: 'MLB123', title: 'Produto Teste 1' },
      { id: 'MLB456', title: 'Produto Teste 2' },
    ];

    (mercadoLivreService.findByTerm as jest.Mock).mockResolvedValue(mockProducts);

    const response = await findProductsByTerm.execute({ term: 'nike' });

    expect(response).toEqual({ products: mockProducts });
    expect(mercadoLivreService.findByTerm).toHaveBeenCalledWith('nike');
  });

  it('deve lançar ProductDoesNotExists quando nenhum produto for encontrado', async () => {
    (mercadoLivreService.findByTerm as jest.Mock).mockResolvedValue(null);

    await expect(findProductsByTerm.execute({ term: 'inexistente' }))
      .rejects
      .toThrow(ProductDoesNotExists);

    expect(mercadoLivreService.findByTerm).toHaveBeenCalledWith('inexistente');
  });
});