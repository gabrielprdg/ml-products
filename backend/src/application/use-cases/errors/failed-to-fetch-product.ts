export class FailedToFetchProduct extends Error {
  statusCode: number
  constructor() {
    super('Intern error while searching for products by term');
    this.name = 'FailedToFetchProduct';
    this.statusCode = 400
  }
}