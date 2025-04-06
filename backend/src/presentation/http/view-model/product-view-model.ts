import { Product } from "src/application/domain/model/product";
import { ProductById } from "src/application/domain/use-cases/productById";

export class ProductsByTermViewModel {
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


export class ProductByIdViewModel {
  static toHTTP(product: ProductById) {
    return {
      id: product.id,
      name: product.name,
      date_created: product.date_created,
      description: product.short_description,
      status: product.status,
      pictures: product.pictures,
      permalink: product.permalink,
      pickers: product.pickers,
      last_updated: product.last_updated
    };
  }
}

