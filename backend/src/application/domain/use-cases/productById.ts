import { Product } from "../model/product"

export type PickerProduct = {
  picker_label: string
}

export type Picker = {
  picker_name: string
  products: PickerProduct[]
}

export type Description = {
  content: string
}

export type ProductById = Omit<Product, "description"> & {
  pickers: Picker[]
  short_description: Description
  permalink: string
  last_updated: string
}
