export class FailedToSearchProducts extends Error {
  statusCode: number
  constructor() {
    super('Intern error while searching for products by term');
    this.name = 'FailedToSearchProduct';
    this.statusCode = 400
  }
}