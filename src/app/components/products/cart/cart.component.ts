import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [],
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProducts();
  }
}
