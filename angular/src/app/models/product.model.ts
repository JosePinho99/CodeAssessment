export interface Product {
  category: string,
  description: string,
  id: number,
  image: string,
  price: number,
  rating: ProductRating,
  title: string
}

export interface ProductRating {
  rate: number,
  count: number
}
