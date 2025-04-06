export type Image = {
  id: string
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