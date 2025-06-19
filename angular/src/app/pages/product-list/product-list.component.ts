import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../core/services/products.service';
import {Product} from '../../models/product.model';
import {AsyncPipe,  NgForOf, NgIf} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {finalize, Observable, of, startWith, switchMap, tap} from 'rxjs';
import {CartService} from '../../core/services/cart.service';
import {CartHeaderComponent} from './cart-header/cart-header.component';
import {SkeletonDirective} from '../../core/directives/loading.directive';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    AsyncPipe,
    ReactiveFormsModule,
    NgIf,
    CartHeaderComponent,
    SkeletonDirective
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  constructor(private productsService: ProductsService, public cartService: CartService) {}

  skeletonItems = Array(5).fill({});

  categoryControl: FormControl<string> = new FormControl<string>('',{ nonNullable: true });
  products$: Observable<Product[]> = of();
  categories$: Observable<string[]> = of();
  loading: boolean = true;


  ngOnInit() {
    this.categories$ = this.productsService.getCategories();
    this.products$ = this.categoryControl.valueChanges.pipe(
      startWith(''),
      tap(() => this.loading = true),
      switchMap(category =>
        this.productsService.getProducts(category).pipe(
          finalize(() =>  this.loading = false)
        )
      )
    );
  }

  getCartQuantity(id: number) {
    return this.cartService.getQuantityByProduct(id);
  }

  changeQuantity(id: number, number: number) {
    this.cartService.changeQuantity(id, number);
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id)
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
