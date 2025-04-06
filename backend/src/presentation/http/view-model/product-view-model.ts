
export type Image = {
  id: string,
  url: string
}

export type Product = {
  id: string
  name: string
  date_created: string
  description: string
  status: string
  pictures: Image[]
}

export class ProductViewModel {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      name: product.name,
      date_created: product.date_created,
      description: product.description,
      status: product.status,
      pictures: product.pictures
    };
  }
}
