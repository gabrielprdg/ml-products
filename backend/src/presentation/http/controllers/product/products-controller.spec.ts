import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { FindProductsByTerm } from '@application/use-cases/find-products-by-term';
import { FindProductById } from '@application/use-cases/find-product-by-id';

describe('ProductsController (unit)', () => {
  let controller: ProductsController;
  let findProductsByTerm: FindProductsByTerm;
  let findProductById: FindProductById;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: FindProductsByTerm,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindProductById,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get(ProductsController);
    findProductsByTerm = moduleRef.get(FindProductsByTerm);
    findProductById = moduleRef.get(FindProductById);
  });

  it('deve chamar FindProductsByTerm com o termo correto', async () => {
    const term = 'tenis';
    const mockExecute = jest.spyOn(findProductsByTerm, 'execute').mockResolvedValue({
      products: [],
    });

    await controller.find(term);

    expect(mockExecute).toHaveBeenCalledWith({ term });
  });

  it('deve chamar FindProductById com o ID correto', async () => {
    const productId = 'abc123';
    const mockExecute = jest.spyOn(findProductById, 'execute').mockResolvedValue({
      product: {},
    });

    await controller.findById(productId);

    expect(mockExecute).toHaveBeenCalledWith({ productId });
  });
});
