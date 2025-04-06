export class ProductDoesNotExists extends Error {
  statusCode: number
  constructor() {
    super('Product does not exists');
    this.name = 'ProductDoesNotExists';
    this.statusCode = 409
  }
}
