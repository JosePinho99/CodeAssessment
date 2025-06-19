import {CartItem} from '../../models/cart-item.model';
import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'cart';

  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  private get cart(): CartItem[] {
    return this.cartSubject.value;
  }

  addToCart(item: Omit<CartItem, 'quantity' | 'addedAt'>) {
    const existing = this.cart.find(ci => ci.id === item.id);
    let updated: CartItem[];

    if (existing) {
      updated = this.cart.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci);
    } else {
      updated = [...this.cart, { ...item, quantity: 1, addedAt: new Date() }];
    }

    this.updateCart(updated);
  }

  removeFromCart(productId: number) {
    const updated = this.cart.filter(item => item.id !== productId);
    this.updateCart(updated);
  }

  changeQuantity(productId: number, change: number) {
    const updated = this.cart
      .map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    this.updateCart(updated);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getQuantityByProduct(productId: number): number {
    return this.cart.find(item => item.id === productId)?.quantity || 0;
  }

  private updateCart(updated: CartItem[]) {
    this.cartSubject.next(updated);
    localStorage.setItem(this.CART_KEY, JSON.stringify(updated));
  }

  private loadCart(): CartItem[] {
    const stored = localStorage.getItem(this.CART_KEY);
    return stored ? JSON.parse(stored) : [];
  }
}
