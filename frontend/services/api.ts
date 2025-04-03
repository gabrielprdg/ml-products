import axios from 'axios'

export const api = axios.create({
  baseURL: `https://api.mercadolibre.com/products/search?site_id=MLB&q=camiseta`
})

