import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../models/product.model';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  getProducts(category: string) {
    return this.http.get<Product[]>("https://fakestoreapi.com/products").pipe(
      map(products => {
        if (!category) {
          return products;
        }
        return products.filter(product => product?.category === category)
    }));
  }

  getCategories() {
    return this.http.get<string[]>("https://fakestoreapi.com/products/categories");
  }
}
