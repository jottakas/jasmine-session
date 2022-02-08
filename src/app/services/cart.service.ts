import { EventEmitter, Injectable } from '@angular/core';
import { CartProduct, Product } from '../shared/interfaces';

/**
 * Service used as an in-memory store for the cart;
 * contains products and the way to add/remove them
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts: CartProduct[] = [];
  evtCartChange: EventEmitter<CartProduct[]> = new EventEmitter();

  constructor() {}

  getCartProducts() {
    return this.cartProducts;
  }

  isCartEmpty() {
    return this.cartProducts.length == 0;
  }

  getQuantityInCart(productId: number) {
    const existingCartProduct = this.getProductFromCart(productId);
    return existingCartProduct ? existingCartProduct.quantity : 0;
  }

  private getProductFromCart = (productId: number) =>
    this.cartProducts.find(
      (cartProduct) => cartProduct.product.id === productId
    );

  addSingleProductToCart(productToAdd: Product) {
    const existingCartProduct = this.getProductFromCart(productToAdd.id);

    if (existingCartProduct) {
      existingCartProduct.quantity++;
    } else {
      this.cartProducts.push({ product: productToAdd, quantity: 1 });
    }

    this.evtCartChange.emit(this.cartProducts);
  }

  incrementQuantity(productId: number) {
    const cartProduct = this.getProductFromCart(productId)!;
    cartProduct.quantity++;

    this.evtCartChange.emit(this.cartProducts);
  }

  decrementQuantity(productId: number) {
    const cartProduct = this.getProductFromCart(productId)!;
    cartProduct.quantity--;

    if (cartProduct.quantity === 0) {
      this.removeWholeProductFromCart(cartProduct.product);
    }

    this.evtCartChange.emit(this.cartProducts);
  }

  removeSingleProductFromCart(productToRemove: Product) {
    const existingCartProduct = this.getProductFromCart(productToRemove.id);

    if (existingCartProduct) {
      existingCartProduct.quantity--;

      if (existingCartProduct.quantity === 0) {
        this.removeWholeProductFromCart(productToRemove);
      }
    }

    this.evtCartChange.emit(this.cartProducts);
  }

  private removeWholeProductFromCart(productToRemove: Product) {
    this.cartProducts = this.cartProducts.filter((cartProduct) => {
      cartProduct.product.id !== productToRemove.id;
    });
  }
}
