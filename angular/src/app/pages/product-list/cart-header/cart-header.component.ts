import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CartService} from '../../../core/services/cart.service';
import {Observable} from 'rxjs';
import {CartItem} from '../../../models/cart-item.model';
import {Product} from '../../../models/product.model';

@Component({
  selector: 'app-cart-header',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    CurrencyPipe,
    FormsModule,
    AsyncPipe,
    ReactiveFormsModule,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './cart-header.component.html',
  styleUrl: './cart-header.component.scss'
})
export class CartHeaderComponent implements OnInit {
  cartOpen: boolean = false;
  constructor(private cartService: CartService) {}

  cart$!: Observable<CartItem[]>;

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
  }

  get totalItems() {
    return this.cartService.getTotalItems();
  }

  get totalPrice() {
    return this.cartService.getTotalPrice();
  }

  changeQuantity(id: number, number: number) {
    this.cartService.changeQuantity(id, number);
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }
}
