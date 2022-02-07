import { Injectable } from '@angular/core';
import { CartProduct, Product } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts: CartProduct[] = [];

  constructor() {}

  getCartProducts() {
    return this.cartProducts;
  }

  getQuantityInCart(productId: number) {
    const existingCartProduct = this.getProductFromCart(productId);
    return existingCartProduct ? existingCartProduct.quantity : 0;
  }

  private getProductFromCart = (productId: number) =>
    this.cartProducts.find(
      (cartProduct) => cartProduct.product.id == productId
    );

  addSingleProductToCart(productToAdd: Product) {
    const existingCartProduct = this.getProductFromCart(productToAdd.id);

    if (existingCartProduct) {
      existingCartProduct.quantity++;
    } else {
      this.cartProducts.push({ product: productToAdd, quantity: 1 });
    }
  }

  removeSingleProductFromCart(productToRemove: Product) {
    const existingCartProduct = this.getProductFromCart(productToRemove.id);

    if (existingCartProduct) {
      existingCartProduct.quantity--;

      if (existingCartProduct.quantity === 0) {
        this.removeWholeProductFromCart(productToRemove);
      }
    }
  }

  removeWholeProductFromCart(productToRemove: Product) {
    this.cartProducts = this.cartProducts.filter((cartProduct) => {
      cartProduct.product.id !== productToRemove.id;
    });
  }
}
